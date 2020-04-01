<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul class="mb-8">
      <li class="border-t border-gray-200" v-for="company in paginatedCompnanies" :key="company.id">
        <a
          class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
        >
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div>
                <router-link :to="companyLink(company)">
                  <h3
                    class="text-sm leading-5 font-medium text-blue-600 truncate"
                  >{{ company.name }}</h3>
                </router-link>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="flex flex-0 flex-wrap info-wrapper">
                    <div
                      v-if="company.countryCode"
                      class="mr-6 flex items-center text-sm leading-5 text-gray-500"
                    >
                      <svg
                        class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771"
                        />
                      </svg>
                      {{ countryName(company.countryCode) }}
                    </div>
                    <div
                      v-if="company.city && company.city != 'NULL'"
                      class="mt-2 mr-6 flex items-center text-sm leading-5 text-gray-500 sm:mt-0"
                    >
                      <svg
                        class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z"
                        />
                      </svg>
                      {{ company.city }}
                    </div>
                    <div
                      v-if="company.viewCount + ''"
                      class="mt-2 mr-6 flex items-center text-sm leading-5 text-gray-500 sm:mt-0"
                    >
                      <svg
                        class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zm-9.9-1.42a6 6 0 0 0 8.48 0L20.38 12l-4.24-4.24a6 6 0 0 0-8.48 0L3.4 12l4.25 4.24zM11.9 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                        />
                      </svg>
                      {{ company.viewCount }}
                    </div>
                    <div
                      v-if="company.brandName"
                      class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0"
                    >
                      <svg
                        class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM20 12l-8-8H7a3 3 0 0 0-3 3v5l8 8 8-8zM7 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                        />
                      </svg>
                      {{ brandName(company.brandName) }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-2 flex flex-col">
                <span class="inline-flex rounded-md shadow-sm">
                  <button
                    @click="toggleCart(company)"
                    type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                    v-bind:class="[isAdded(company.id) ? 'bg-green-600 hover:bg-green-500 transition ease-in-out duration-150' : 'bg-blue-600 hover:bg-blue-500']"
                  >
                    <svg
                      class="-ml-1 mr-2 h-4 w-4 hiddden md:block"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        v-show="!isAdded(company.id)"
                        d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                      />
                      <path
                        v-show="isAdded(company.id)"
                        d="M19 0h-14c-2.762 0-5 2.239-5 5v14c0 2.761 2.238 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"
                      />
                    </svg>
                    Add
                    <span v-show="isAdded(company.id)">ed</span>
                    <span class="hidden md:inline-block md:ml-1">to cart</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <Pagination
      v-if="totalCompanyPage > 1"
      :page-count="totalCompanyPage"
      :current-page="currentPage"
      :page-limit="6"
      @changePage="changePage"
      class="pb-6 px-4 sm:px-6"
    />
    <NotificationAddCart v-show="itemsInCart" :value="itemsInCart" />
  </div>
</template>

<script>
import { DEFAULT_PAGE_SIZE } from "@/services/company";
import { COUNTRIES } from "@/assets/value/country";
import { getCart, toggleItem, indexInCart } from "@/services/cart";
import NotificationAddCart from "./NotificationAddCart.vue";
import Pagination from "./Pagination.vue";

export default {
  name: "ListResults",
  components: {
    NotificationAddCart,
    Pagination
  },
  props: {
    companies: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      countries: COUNTRIES,
      localCart: [],
      currentPage: 0,
      pageSize: DEFAULT_PAGE_SIZE
    };
  },
  watch: {
    companies() {
      this.currentPage = 0;
    }
  },
  computed: {
    itemsInCart() {
      return this.localCart.length;
    },
    totalCompany() {
      if (!this.companies || !this.companies.length) return 0;

      return this.companies.length;
    },
    totalCompanyPage() {
      if (!this.totalCompany) return 0;
      return Math.ceil(this.totalCompany / this.pageSize);
    },
    paginatedCompnanies() {
      if (!this.totalCompany) return this.companies;
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;

      return this.companies.slice(start, end);
    }
  },
  mounted() {
    this.localCart = getCart();
  },
  methods: {
    toggleCart(company) {
      if (indexInCart(company.id) === -1) {
        this.$router.push({
          path: this.companyLink(company)
        });
      }

      const { id, name } = company;
      this.localCart = toggleItem({
        id,
        name,
        options: ["standard"]
      });
    },
    isAdded(id) {
      return indexInCart(id) > -1;
    },
    countryName(code) {
      const { text } = this.countries.find(country => country.code === code);
      return text;
    },
    brandName(brandName) {
      return brandName.replace(/brand-/, "");
    },
    companyLink(company) {
      const { countryCode, id, systemId } = company;
      const letterCode = countryCode.toLowerCase().slice(0, 1);
      const systemIdOpts = systemId ? `_${systemId}` : "";
      return `/product/${letterCode}_${id}${systemIdOpts}`;
    },
    changePage(page) {
      this.currentPage = page;
    }
  }
};
</script>
<style scoped>
.info-wrapper {
  max-width: 18.75rem;
}
</style>