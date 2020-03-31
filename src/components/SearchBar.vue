<template>
  <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Find a company</h3>
    <div class="mt-2 text-sm leading-5 text-gray-500">
      <form class="mt-3">
        <div class="flex mt-2">
          <div class="mr-4">Show results from:</div>
          <div v-for="country in countries" :key="country.code" class="mr-4">
            <input
              v-model="selectedCountries"
              :value="country.code"
              type="checkbox"
              :id="country.code"
              class="mr-1"
            />
            <label :for="country.code">{{country.text}}</label>
          </div>
        </div>
        <div class="sm:flex mt-2">
          <vue-fuse
            :list="legalKeyRemovedCompanies"
            :keys="indexKeys"
            :threshold="1.0"
            :max-pattern-length="255"
            input-change-event-name="updateQueryString"
            event-name="fuzzySearchCompany"
            type="text"
            aria-label="text"
            class="appearance-none block w-full p-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1"
            placeholder="Start typing to find a company"
          />
          <button
            type="button"
            class="inline-flex justify-center md:mr-0 mt-3 w-full px-3 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900 transition duration-150 ease-in-out sm:mt-0 sm:ml-1 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
          >Find</button>
        </div>
        <div v-if="error" class="my-4 text-lg text-center text-red-500">{{ error }}</div>
      </form>
      <div v-if="loading" class="loading flex justify-center items-center">
        <img class="w-10 h-10" src="@/assets/img/rounded-blocks.gif" alt="loading" />
      </div>
      <ListResults v-else class="relative mt-4 min-h-40" :companies="displayCompanies" />
    </div>
  </div>
</template>

<script>
import { COUNTRIES } from "@/assets/value/country";
import {
  getTopCompanies,
  getCompanyByQuery,
  DEFAULT_PAGE_SIZE
} from "@/services/company";
import ListResults from "./ListResults.vue";

const COUNTRY_CODE = COUNTRIES.map(country => country.code);
const IDN = COUNTRY_CODE[0];
const VN = COUNTRY_CODE[1];
const PH = COUNTRY_CODE[2];

const DEFAULT_ERROR_MESSAGE = "Something wrong happened";
const FUZZ_INDEX_KEYS = ["name", "brandName"];
const LEGAL_ENTITY_KEYS = /(pt|llc|limited|plc|company|corporation|tbk|lp|llp|lllp|corp|pllc|inc)[.\s]{0,}/gi;

export default {
  name: "SearchBar",
  components: {
    ListResults
  },
  data() {
    return {
      countries: COUNTRIES,
      selectedCountries: COUNTRY_CODE,
      indexKeys: FUZZ_INDEX_KEYS,
      legalEntityKeys: LEGAL_ENTITY_KEYS,

      displayCompanies: [], // Use to show company list result
      topCompanies: [], // Use to save top company list at runtime
      rawCompanyList: [], // Save fresh fetch data
      latestResult: [], // Save fuzzy latest result use to filter by country

      queryString: "",
      error: "",
      loading: false
    };
  },
  watch: {
    selectedCountries(select) {
      if (!select || select.length === 0) {
        setTimeout(() => {
          this.selectedCountries = COUNTRY_CODE;
        });
      }

      if (this.queryString.trim().length === 0) {
        this.sortTopCompanies();
        return;
      }

      this.displayCompanies = this.remapLegalEntity(this.latestResult);
    }
  },
  computed: {
    legalKeyRemovedCompanies() {
      let companyData = this.rawCompanyList;
      if (!companyData || !companyData.length) {
        companyData = this.topCompanies;
      }

      return companyData.map(company => {
        const name = company.name.replace(this.legalEntityKeys, "");
        const brandName = company.brandName.replace(this.legalEntityKeys, "");

        return Object.assign({}, company, { name, brandName });
      });
    }
  },
  created: async function() {
    localStorage.clear(); // just for test
    await this.displayTopCompanies();

    this.$on("fuzzySearchCompany", result => {
      if (!result.length) {
        // If result from fuzzy is empty shows top company list
        this.displayCompanies = this.rawCompanyList.length
          ? this.displayCompanies
          : this.topCompanies;
        return;
      }
      const remapedLegalEntityAndFilteredResult = this.remapLegalEntity(result);
      this.latestResult = remapedLegalEntityAndFilteredResult;
      this.displayCompanies = remapedLegalEntityAndFilteredResult;
    });

    this.$on("updateQueryString", async function(query) {
      if (this.queryString.trim().length < 2 && query.trim().length === 2) {
        await this.displayFuzzySearchResult(query);
      }
      this.queryString = query;
    });
  },
  methods: {
    displayTopCompanies: async function() {
      try {
        this.loading = true;
        this.topCompanies = await getTopCompanies();
        this.sortTopCompanies();
      } catch (error) {
        console.log(error);
        this.error = DEFAULT_ERROR_MESSAGE;
      } finally {
        this.loading = false;
      }
    },

    displayFuzzySearchResult: async function(query) {
      try {
        this.loading = true;
        this.rawCompanyList = await getCompanyByQuery(query);
      } catch (error) {
        console.log(error);
        this.error = DEFAULT_ERROR_MESSAGE;
      } finally {
        this.loading = false;
      }
    },

    remapLegalEntity(companies) {
      const countryfilteredCompanies = companies.filter(
        comp => this.selectedCountries.indexOf(comp.countryCode) > -1
      );

      return countryfilteredCompanies.map(comp => {
        const { name, brandName } =
          this.rawCompanyList.find(rawComp => rawComp.id === comp.id) ||
          this.topCompanies.find(rawComp => rawComp.id === comp.id);

        return Object.assign({}, comp, { name, brandName });
      });
    },

    sortTopCompanies() {
      let clonedTopCompanies = [...this.topCompanies];
      if (!clonedTopCompanies || !clonedTopCompanies.length) return;

      const eachCountryNum = ~~(
        DEFAULT_PAGE_SIZE / this.selectedCountries.length
      );

      let topIDN = [],
        topVN = [],
        topPH = [];

      clonedTopCompanies = clonedTopCompanies
        .filter(comp => this.selectedCountries.indexOf(comp.countryCode) > -1)
        .sort((a, b) => b.viewCount - a.viewCount);

      if (this.selectedCountries.indexOf(IDN) > -1) {
        topIDN = clonedTopCompanies
          .filter(comp => comp.countryCode === IDN)
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, eachCountryNum);
        clonedTopCompanies = clonedTopCompanies.filter(comp => {
          return topIDN.find(indComp => indComp.id === comp.id) === undefined;
        });
      }

      if (this.selectedCountries.indexOf(VN) > -1) {
        topVN = clonedTopCompanies
          .filter(comp => comp.countryCode === VN)
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, eachCountryNum);
        clonedTopCompanies = clonedTopCompanies.filter(comp => {
          return topVN.find(vnComp => vnComp.id === comp.id) === undefined;
        });
      }

      if (this.selectedCountries.indexOf(PH) > -1) {
        topPH = clonedTopCompanies
          .filter(comp => comp.countryCode === PH)
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, eachCountryNum);
        clonedTopCompanies = clonedTopCompanies.filter(comp => {
          return topPH.find(phComp => phComp.id === comp.id) === undefined;
        });
      }

      this.$set(this, "displayCompanies", [
        ...topIDN,
        ...topVN,
        ...topPH,
        ...clonedTopCompanies
      ]);
    }
  }
};
</script>
<style scoped>
.loading {
  min-height: 34.375rem;
}
</style>