<template>
  <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
    <div class="relative">
      <h1
        class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >Company profiles in Indonesia, Vietnam and the Philippines</h1>
      <p class="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
        We have shareholding information of over 10M companies registered in
        Southeast Asia. The only register to deliver the reports directly from
        the government databases.
      </p>
    </div>

    <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-top">
      <div class="relative">
        <h4
          class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9"
        >Purchase private company reports in Southeast Asia</h4>
        <p class="mt-3 text-lg leading-7 text-gray-500">
          Purchasing company profiles is very simple. Add the reports you are
          interested in to the cart. Complete the payment. Receive the reports
          to your email in one working day (except for the Philippines which
          takes up to one week).
        </p>

        <ul class="mt-10">
          <li>
            <div class="flex">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"
                >
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg leading-6 font-medium text-gray-900">Capital table</h5>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Get to know the names of the shareholders and how much of the
                  shares they own.
                </p>
              </div>
            </div>
          </li>
          <li class="mt-10">
            <div class="flex">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"
                >
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg leading-6 font-medium text-gray-900">Board of Directors</h5>
                <p
                  class="mt-2 text-base leading-6 text-gray-500"
                >Who are the board members as per Articles of Association.</p>
              </div>
            </div>
          </li>
          <li class="mt-10">
            <div class="flex">
              <div class="flex-shrink-0">
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"
                >
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg leading-6 font-medium text-gray-900">Historical data</h5>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Purchase additional reports to get the complete information
                  about the changes to the Articles of Association.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-10 -mx-4 relative lg:mt-0">
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Home",
  components: {
    SearchBar
  }
};
</script>
