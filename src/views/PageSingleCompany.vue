<template>
  <div class="px-4 sm:px-6">
    <div class="md:flex md:items-center md:justify-between mb-4">
      <div class="flex-1 min-w-0">
        <h1
          class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
        >{{ company.name }}</h1>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <span class="shadow-sm rounded-md">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700 transition duration-150 ease-in-out"
          >Purchase report</button>
        </span>
      </div>
    </div>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="flex px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mr-6">Company Information</h3>
        <v-popover offset="20" placement="right-start" trigger="hover">
          <h4
            class="flex font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
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
          <template v-for="key of Object.keys(company)">
            <div
              v-if="!hiddenField.includes(key) && company[key] && company[key] !== 'NULL'"
              :key="key"
              class="odd:bg-gray-50 hover:bg-gray-200 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
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
              <ul class="border border-gray-200 rounded-md">
                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                  <div class="w-0 flex-1 flex items-center">
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span
                      class="ml-2 flex-1 w-0 truncate"
                    >Current shareholders and Board of Directors</span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      class="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                    >
                      <strong>$50</strong> Add to cart
                    </a>
                  </div>
                </li>
                <li
                  class="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5"
                >
                  <div class="w-0 flex-1 flex items-center">
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span
                      class="ml-2 flex-1 w-0 truncate"
                    >All revisions to the shareholders and Board of Directors</span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      class="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                    >
                      <strong>$250</strong> Add to cart
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { COUNTRIES } from "@/assets/value/country";
import ReportToolTip from "@/components/ReportToolTip";
const HIDDEN_FIELD = ["id", "viewCount", "brandName"];

export default {
  components: { ReportToolTip },
  data() {
    return {
      company: {},
      countries: COUNTRIES,
      hiddenField: HIDDEN_FIELD
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return value;
      return value[0].toUpperCase() + value.slice(1);
    }
  },
  mounted() {
    this.company = JSON.parse(this.$route.query.company);
  },
  methods: {
    remapKeyName(key) {
      switch (key) {
        case "name":
          return "Enterprise Name";
        case "city":
          return "Location";
        case "bn" || "tbn":
          return key.toUpperCase() + " Number";
        case "countryCode":
          return "Country";
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

<style lang="scss">
.tooltip {
  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
