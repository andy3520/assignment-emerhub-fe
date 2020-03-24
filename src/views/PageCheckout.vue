<template>
  <div class="flex justify-between flex-col-reverse md:flex-row">
    <form class="md:mr-4">
      <div>
        <div>
          <div>
            <h2 class="text-xl leading-6 font-medium text-gray-900">
              Billing details
            </h2>
          </div>
        </div>
        <div class="mt-4 border-t border-gray-200">
          <div class="mt-6 grid grid-cols-1 row-gap-4 col-gap-4 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label
                for="first_name"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Name on card
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="first_name"
                  class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
                        <div class="sm:col-span-4">
              <label
                for="first_name"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Address
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="first_name"
                  class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Country / Region
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <select
                  id="country"
                  class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="zip"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                ZIP / Postal
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="zip"
                  class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8">
          <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Payment details
            </h2>
          </div>
          <div>
            <div>
              <fieldset>
                <legend
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Card Details
                </legend>
                <div class="mt-1 bg-white rounded-md shadow-sm">
                  <div>
                    <input
                      aria-label="Card number"
                      class="form-input relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      placeholder="Card number"
                    />
                  </div>
                  <div class="-mt-px flex">
                    <div class="w-1/2 flex-1 min-w-0">
                      <input
                        aria-label="Card expiration date"
                        class="form-input relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div class="-ml-px flex-1 min-w-0">
                      <input
                        aria-label="Card CVC"
                        class="form-input relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-200 pt-5">
        <div class="flex justify-end">
          <span class="inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >
              Place Order
            </button>
          </span>
        </div>
      </div>
    </form>
    <div class="flex-1 lg:ml-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <h2 class="text-xl mb-2 px-4 sm:px-6 mt-4">Order details</h2>
        <ul class="border-t border-gray-200">
          <li>
            <a
              href="#"
              class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div class="px-4 py-4 flex items-center sm:px-6">
                <div
                  class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <div
                      class="text-sm leading-5 font-medium text-blue-600 truncate"
                    >
                      Back End Developer
                    </div>
                    <div class="mt-2 flex">
                      <div
                        class="flex items-center text-sm leading-5 text-gray-500"
                      >
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>
                          Closing on
                          <time datetime="2020-01-07">January 7, 2020</time>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div class="px-4 py-4 flex items-center sm:px-6">
                <div
                  class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <div
                      class="text-sm leading-5 font-medium text-blue-600 truncate"
                    >
                      Back End Developer
                    </div>
                    <div class="mt-2 flex">
                      <div
                        class="flex items-center text-sm leading-5 text-gray-500"
                      >
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>
                          Closing on
                          <time datetime="2020-01-07">January 7, 2020</time>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div class="px-4 py-4 flex items-center sm:px-6">
                <div
                  class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
                >
                  <div>
                    <div
                      class="text-sm leading-5 font-medium text-blue-600 truncate"
                    >
                      Back End Developer
                    </div>
                    <div class="mt-2 flex">
                      <div
                        class="flex items-center text-sm leading-5 text-gray-500"
                      >
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>
                          Closing on
                          <time datetime="2020-01-07">January 7, 2020</time>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div class="border-t border-gray-200 mt-2 py-2 px-4 sm:px-6 flex justify-end">
            <div class="text-xl">Total sum</div>
            <div class="text-xl font-medium ml-2">$150</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HeroHome from '@/components/HeroHome.vue'

export default {
  props: ["companyName"],
  components: {},
};
</script>
