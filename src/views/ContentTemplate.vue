<template>
  <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
    <template v-if="!loading">
      <h1
        class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 text-center"
      >{{ title }}</h1>
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
      const response = await fetch(this.fetchURL);
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