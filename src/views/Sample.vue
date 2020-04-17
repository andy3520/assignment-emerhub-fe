<template>
  <ContentTemplate :fetchURL="fetchURL" />
</template>

<script>
import ContentTemplate from "./ContentTemplate";

export default {
  components: {
    ContentTemplate
  },
  data() {
    return {
      fetchURL: "https://registry.emerhub.com/wp-json/wp/v2/pages/537955"
    };
  }
};
</script>

<style>
</style>