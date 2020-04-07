<template>
  <div class="bg-white">
    <div
      class="max-w-screen-xl mx-auto rounded-lg shadow-md text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
    >
      <h1
        class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >404 PAGE NOT FOUND</h1>
      <h3
        class="mt-5 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500"
      >The request resource is not found.</h3>
      <div class="mt-8 flex justify-center">
        <div class="inline-flex rounded-md shadow">
          <button
            @click="goToHome"
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >Redirect to home in {{ second }}...</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Thankyou",
  data() {
    return {
      second: 15,
      timer: null
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) {
        this.goToHome();
        return;
      }
      this.second -= 1;
    }, 1000);
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
      clearTimeout(this.timer);
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style>
</style>