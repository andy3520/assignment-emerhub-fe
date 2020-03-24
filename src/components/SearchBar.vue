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
        <div class="sm:flex mt-2">
          <input
            v-model="companyQuery"
            aria-label="text"
            class="appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1"
            placeholder="Start typing to find a company"
          />
          <button
            v-on:click="companyQuery = !companyQuery"
            type="submit"
            class="inline-flex justify-center md:mr-0 mt-3 w-full px-3 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900 transition duration-150 ease-in-out sm:mt-0 sm:ml-1 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
          >
            Find
          </button>
        </div>
        <div class="flex mt-2">
          <div class="mr-4">Show results from:</div>
          <div class="mr-4">
            <input type="checkbox" class="mr-1" checked />Indonesia
          </div>
          <div class="mr-4">
            <input type="checkbox" class="mr-1" checked />Vietnam
          </div>
          <div class="mr-4">
            <input type="checkbox" class="mr-1" checked />The Philippines
          </div>
        </div>
      </form>
      <ListResults class="mt-4" v-show="companyQuery" />
    </div>
  </div>
</template>

<script>
import ListResults from "./ListResults.vue";

export default {
  name: "SearchBar",
  data: function() {
    return {
      isOpen: false,
      companyQuery: "",
    };
  },
  components: {
    ListResults,
  },
};
</script>
