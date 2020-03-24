<template>
  <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Find a company
    </h3>
    <div class="mt-2 text-sm leading-5 text-gray-500">
      <form
        action="#"
        method="POST"
        class="mt-3"
        v-on:submit.prevent="onSubmit"
      > 
        <div class="flex mt-2">
          <div class="mr-4">Show results from:</div>
          <div v-for="(country, index) in countryData" :key="index" class="mr-4">
            <input 
              v-model="selectedCountries" 
              :value="country"
              type="checkbox"
              :id="country" 
              class="mr-1" 
            />
            <label :for="country">{{country}}</label>
          </div>
        </div>
        <div class="sm:flex mt-2">
          <vue-fuse 
            :list="legalKeyRemovedList"
            :keys="indexKeys"
            :threshold="1.0"
            :max-pattern-length="255"
            input-change-event-name="updateQueryString"
            event-name="fuzzySearchCompany"
            type="text" 
            aria-label="text"
            class="appearance-none block w-full pl-3 pr-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1"
            placeholder="Start typing to find a company"
          />
          <button
            type="submit"
            class="inline-flex justify-center md:mr-0 mt-3 w-full px-3 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900 transition duration-150 ease-in-out sm:mt-0 sm:ml-1 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
          >
            Find
          </button>
        </div>
        <div v-if="error" class="my-4 text-lg text-center text-red-500">{{ error }}</div>
      </form>
      <div v-if="loading" class="loading flex justify-center items-center">
        <img class="w-10 h-10" src="@/assets/img/rounded-blocks.gif" alt="loading">
      </div>
      <ListResults v-else class="relative mt-4 min-h-40" :company-list="companyDisplayList"/>
    </div>
  </div>
</template>

<script>
import ListResults from "./ListResults.vue";
import Storage from '../services/storage';
const Cache = new Storage(EXPIRE_TIME);

const EXPIRE_TIME = 48 * 60; // 1 day
const CACHE_TOP_COMPANY = 'TOP_COMPANY' // Cache key

const COUNTRY = ["Indonesia", "Vietnam", "The Philippines"];
const IND = COUNTRY[0];
const VN = COUNTRY[1];
const PHP = COUNTRY[2];

const PAGE_SIZE = 6;
const BASE_URL = "https://infallible-noyce-0bac48.netlify.com/.netlify/functions/server";
const DEFAULT_ERROR_MESSAGE = 'Something wrong happened';

const INDEX_KEYS = ["name", "brand"];
const LEGAL_ENTITY_KEYS = /(pt|llc|limited|plc|company|corporation|tbk|lp|llp|lllp|corp|pllc|inc)[.\s]{0,}/ig;

export default {
  name: "SearchBar",
  components: {
    ListResults,
  },
  watch: {
    selectedCountries(select) {
      console.log("selectedCountries -> select", select)
      if (!select || select.length === 0) {
        setTimeout(() => { // Fix last check box not checked
          this.selectedCountries = COUNTRY; 
        })
      }
      
      if (this.queryString.trim().length === 0) {
        this.sortByTopCompany()
        return
      }

      this.companyDisplayList = this.remapLegalEntity(this.latestResult)
    }
  },
  computed: {
    // fuzzy search data
    legalKeyRemovedList() {
      let remapList = this.rawCompanyList
      if (!remapList || !remapList.length) {
        remapList = this.topCompanyList
      }

      return remapList.map(company => {
        const name = company.name.replace(this.legalEntityKeys, "")
        const brand = company.brand.replace(this.legalEntityKeys, "")

        return Object.assign({}, company, { name, brand }) 
      })
    }
  },
  data() {
    return {
      countryData: COUNTRY,
      selectedCountries: COUNTRY,
      indexKeys: INDEX_KEYS,
      legalEntityKeys: LEGAL_ENTITY_KEYS,

      companyDisplayList: [],
      topCompanyList: [],
      rawCompanyList: [],
      latestResult: [],

      queryString: "",
      error: "",
      loading: false
    };
  },
  created() {
    this.fetchTopCompany();

    this.$on('fuzzySearchCompany', result => {
      if (!result.length) {
        this.companyDisplayList = this.rawCompanyList.length ? this.companyDisplayList : this.topCompanyList
        return
      }

      const remapedLegalEntityAndFilteredResult = this.remapLegalEntity(result)
      
      this.latestResult = remapedLegalEntityAndFilteredResult;
      this.companyDisplayList = remapedLegalEntityAndFilteredResult;
    })

    this.$on('updateQueryString', query => {
      if(this.queryString.trim().length < 2 && query.trim().length === 2) {
        const cachedResult = Cache.getItem(query)

        if (cachedResult) {
          this.rawCompanyList = JSON.parse(cachedResult)
          return
        }

        this.loading = true;
        
        this.fetchRawData()
          .then(rawCompanyData => {
            this.rawCompanyList = rawCompanyData
            Cache.setItem(query.toLowerCase(), JSON.stringify(rawCompanyData), EXPIRE_TIME)
          })
          .catch(err => {
            this.error = DEFAULT_ERROR_MESSAGE
            this.loading = false;
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          })
      }

      this.queryString = query
    })
  },
  methods: {
    fetchTopCompany() {
      const cacheTopCompany = Cache.getItem(CACHE_TOP_COMPANY)

      if(cacheTopCompany) {
        this.topCompanyList = JSON.parse(cacheTopCompany)
        this.sortByTopCompany()
        return
      }

      this.loading = true;

      fetch(`${BASE_URL}/top-company`)
        .then(res => res.json())
        .then(topComanyData => {
          this.topCompanyList = topComanyData
          this.sortByTopCompany()
          Cache.setItem(CACHE_TOP_COMPANY, JSON.stringify(topComanyData), EXPIRE_TIME)
        })
        .catch(err => {
          this.error = DEFAULT_ERROR_MESSAGE
          this.loading = false;
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        })
    },

    sortByTopCompany() {
      let clonedTopCompanyList = [...this.topCompanyList]
      if(!clonedTopCompanyList || !clonedTopCompanyList.length) return
      // const selectedCountries = this.selectedCountries.length ? this.selectedCountries : COUNTRY; // Not select any country
      const COUNTRY_SIZE = ~~(PAGE_SIZE / this.selectedCountries.length);
      let topIND = [],
          topVN = [],
          topPHP = [];

      clonedTopCompanyList = clonedTopCompanyList.filter(comp => this.selectedCountries.indexOf(comp.country) > -1)
                         .sort((a,b) => b.view - a.view)

      if(this.selectedCountries.indexOf(IND) > -1) {
        topIND = clonedTopCompanyList.filter(comp => comp.country === IND)
                          .sort((a,b) => b.view - a.view)
                          .slice(0, COUNTRY_SIZE)
        clonedTopCompanyList = clonedTopCompanyList.filter(comp => {
          return topIND.find(indComp => indComp.id === comp.id) === undefined;
        })
      }

      if(this.selectedCountries.indexOf(VN) > -1) {
        topVN = clonedTopCompanyList.filter(comp => comp.country === VN)
                          .sort((a,b) => b.view - a.view)
                          .slice(0, COUNTRY_SIZE)
        clonedTopCompanyList = clonedTopCompanyList.filter(comp => {
          return topVN.find(vnComp => vnComp.id === comp.id) === undefined;
        })
      }

      if(this.selectedCountries.indexOf(PHP) > -1) {
        topPHP = clonedTopCompanyList.filter(comp => comp.country === PHP)
                          .sort((a,b) => b.view - a.view)
                          .slice(0, COUNTRY_SIZE)
        clonedTopCompanyList = clonedTopCompanyList.filter(comp => {
          return topPHP.find(phpComp => phpComp.id === comp.id) === undefined;
        })
      }

      this.companyDisplayList = [...topIND, ...topVN, ...topPHP, ...clonedTopCompanyList]
    },

    fetchRawData() {
      return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/company`)
          .then(res => res.json())
          .then(rawCompanyData => resolve(rawCompanyData))
          .catch(err => reject(err))
      })
    },

    remapLegalEntity(companyList) {
      const companyListCountryFiltered = companyList.filter(comp => this.selectedCountries.indexOf(comp.country) > -1)

      return companyListCountryFiltered.map(comp => {
        const { name, brand } = this.rawCompanyList.find(rawComp => rawComp.id === comp.id) || this.topCompanyList.find(rawComp => rawComp.id === comp.id)

        return Object.assign({}, comp, { name, brand })
      })
    }
  }
};
</script>
<style scoped>
.loading {
  min-height: 34.375rem;
}
</style>