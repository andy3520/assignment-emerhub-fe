<template>
  <div class="fixed inset-x-0 bottom-0">
    <div class="bg-blue-800 shadow-xl">
      <div class="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-end flex-wrap">
          <div class="w-auto flex items-center mr-4">
            <p class="ml-3 font-medium text-white truncate self-center">
              <span class="inline">
                You have
                <strong>{{this.$parent.itemsInCart }} report(s)</strong> in the cart
              </span>
            </p>
          </div>
          <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto self-center">
            <span class="inline-flex rounded-md shadow-sm">
              <button
                @click="submit()"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blue-900 bg-white hover:bg-blue-100 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-100 transition ease-in-out duration-150"
              >
                Go to checkout
                <svg
                  class="ml-3 -mr-1 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationAddCart",
  data: function() {
    return {
      isOpen: false
    };
  },
  components: {},
  methods: {
    submit() {
      //if you want to send any data into server before redirection then you can do it here
      this.$router.push({ name: "Checkout" });
    }
  }
};
</script>