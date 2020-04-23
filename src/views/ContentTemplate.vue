<template>
  <div class="relative mx-auto px-4 sm:px-6 lg:px-8">
    <template v-if="!loading">
      <h1 class="text-2xl font-bold mt-4 text-gray-900 text-center">{{ title }}</h1>
      <div class="mt-10" v-html="htmlContent"></div>
    </template>
    <template v-else>
      <content-loader :speed="1">
        <rect x="0" y="0" height="20px" width="100%" />
        <rect x="0" y="30" height="10px" width="100%" />
        <rect x="0" y="45" height="10px" width="100%" />
        <rect x="0" y="60" height="10px" width="100%" />
        <rect x="0" y="75" height="10px" width="100%" />
        <rect x="0" y="90" height="10px" width="100%" />
      </content-loader>
    </template>
    <div
      class="hidden my-2 text-blue-600 underline list-disc list-inside ml-4 text-2xl font-bold mt-4 list-decimal my-2 ml-4 list-inside"
    />
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  name: "About",
  components: {
    ContentLoader
  },
  props: ["fetchURL"],
  data() {
    return {
      title: "",
      htmlContent: "",
      loading: false
    };
  },
  async created() {
    try {
      this.loading = true;
      const options = {
        method: "GET",
        crossDomain: true
      };
      const response = await fetch(this.fetchURL, options);
      const { title, content } = await response.json();
      this.title = title.rendered;
      this.htmlContent = content.rendered;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style>
</style>