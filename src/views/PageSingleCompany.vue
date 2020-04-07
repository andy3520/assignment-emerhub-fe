<template>
  <div class="px-4 sm:px-6">
    <div class="md:flex md:items-center md:justify-between mb-4">
      <div class="flex-1 min-w-0">
        <h1
          v-if="!loading"
          class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
        >{{ company.name }}</h1>
        <div v-else class="h-10 max-w-full overflow-hidden">
          <content-loader :speed="1">
            <rect x="0" y="0" height="100%" width="30%" />
          </content-loader>
        </div>
      </div>
    </div>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="flex justify-between px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mr-6">Company Information</h3>
        <v-popover placement="bottom" trigger="hover focus">
          <h4
            class="flex font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out cursor-pointer"
          >
            What's included in the report?
            <svg
              class="flex-shrink-0 ml-1 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z"
              />
            </svg>
          </h4>
          <template slot="popover">
            <report-tool-tip />
          </template>
        </v-popover>
      </div>
      <div>
        <dl>
          <template v-if="loading">
            <div
              v-for="pleaceholder in 3"
              :key="pleaceholder"
              class="odd:bg-gray-100 hover:bg-gray-200 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt>
                <div class="h-5 max-w-full overflow-hidden">
                  <content-loader :speed="1">
                    <rect x="0" y="0" height="100%" width="100%" />
                  </content-loader>
                </div>
              </dt>
              <dd class="sm:mt-0 sm:col-span-2">
                <div class="h-5 max-w-full overflow-hidden">
                  <content-loader :speed="1">
                    <rect x="0" y="0" height="100%" width="100%" />
                  </content-loader>
                </div>
              </dd>
            </div>
          </template>
          <template v-else v-for="key of Object.keys(company)">
            <div
              v-if="!hiddenField.includes(key) && company[key] && company[key] !== 'NULL'"
              :key="key"
              class="odd:bg-gray-100 hover:bg-gray-200 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm leading-5 font-medium text-gray-500">{{ remapKeyName(key) }}</dt>
              <dd
                class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
              >{{ remapCompanyData(key, company[key]) }}</dd>
            </div>
          </template>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt
              class="text-sm leading-5 font-medium text-gray-500"
            >Reports available for purchase (will be delivere in one working day)</dt>
            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <div v-if="loading" class="h-10 max-w-full overflow-hidden">
                <content-loader :speed="1">
                  <rect x="0" y="0" height="100%" width="100%" />
                </content-loader>
              </div>
              <ul v-else class="border border-gray-200 rounded-md">
                <li
                  v-for="(opt , index) in options"
                  :key="opt.value"
                  @click="!opt.standard ? updateOption(opt.value) : null"
                  class="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5 hover:bg-gray-100"
                  :class="{'border-t border-gray-300': index !== 0, 'bg-gray-100': opt.value === selectedOptions }"
                >
                  <div class="w-0 flex-1 flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      :id="opt.value"
                      :value="opt.value"
                      v-model="selectedOptions"
                      :disabled="opt.standard"
                    />
                    <span class="ml-2 flex-1 w-0 truncate inline-flex">
                      <v-popover placement="right-start" trigger="hover focus">
                        <span class="inline-flex">
                          {{ opt.text }}
                          <svg
                            class="ml-2 flex-shrink-0 w-4 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z"
                            />
                          </svg>
                        </span>
                        <template slot="popover">
                          <div
                            class="text-sm rounded bg-black opacity-75 text-white px-2 py-1"
                          >{{ opt.info }}</div>
                        </template>
                      </v-popover>
                    </span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      class="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                    >
                      <strong>${{ opt.price }}</strong>
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <div v-if="!loading" class="bg-white px-4 pb-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt></dt>
            <dd class="mt-1 sm:mt-0 sm:col-span-2 text-right">
              <span class="shadow-sm rounded-md">
                <button
                  type="button"
                  @click="updateCartAndCheckout"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700 transition duration-150 ease-in-out"
                >Purchase report</button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { COUNTRIES } from "@/assets/value/country";
import { REPORT_TYPES } from "@/assets/value/report";
import { indexInCart, getCart, setCart } from "@/services/cart";
import { getCompanyDetail } from "@/services/company";

import { ContentLoader } from "vue-content-loader";
import ReportToolTip from "@/components/ReportToolTip";
const HIDDEN_FIELD = ["id", "systemId"];

export default {
  components: { ReportToolTip, ContentLoader },
  data() {
    return {
      localCart: [],
      company: {},
      countries: COUNTRIES,
      hiddenField: HIDDEN_FIELD,
      options: REPORT_TYPES,
      selectedOptions: ["standard"],
      loading: false
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return value;
      return value[0].toUpperCase() + value.slice(1);
    }
  },
  async created() {
    try {
      const systemId = this.$route.params.systemId + "";
      this.loading = true;
      const [detail] = await getCompanyDetail(systemId);
      this.company = detail;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
  mounted() {
    this.localCart = getCart();
  },
  methods: {
    updateOption(val) {
      if (this.selectedOptions.includes(val)) {
        this.selectedOptions = this.selectedOptions.filter(opt => opt !== val);
        return;
      }

      this.selectedOptions.push(val);
    },
    updateCartAndCheckout() {
      const { systemId, name } = this.company;
      if (indexInCart(systemId) > -1) {
        this.localCart.map(company => {
          if (company.systemId === systemId) {
            company.options = this.selectedOptions;
          }
        });
      } else {
        this.localCart.push({
          systemId,
          name,
          options: this.selectedOptions
        });
      }

      setCart(this.localCart);
      this.$router.push({ name: "Checkout" });
    },
    remapKeyName(key) {
      switch (key) {
        case "name":
          return "Enterprise Name";
        case "city":
          return "Location";
        case "countryCode":
          return "Country";
        case "bnNumber":
          return "BN Number";
        case "tbnNumber":
          return "TBN Number";
        default:
          return key[0].toUpperCase() + key.slice(1);
      }
    },
    remapCompanyData(key, value) {
      switch (key) {
        case "countryCode":
          return this.countries.find(c => c.code === value).text || value;
        default:
          return value;
      }
    }
  }
};
</script>

<style lang="scss"></style>