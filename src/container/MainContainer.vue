<template>
  <div class="relative min-h-screen max-w-full overflow-hidden bg-gray-100">
    <NavBar />
    <main class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style>
</style>