<template>
  <nav class="bg-white shadow-sm relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" exact>
              <img src="@/assets/logo.png" alt="Emerhub logo" class="w-40" />
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex" id="desktopNav">
            <router-link to="/" class="desktop-nav-item" exact>Find a company</router-link>
            <router-link to="/about" class="ml-8 desktop-nav-item" exact>About Emerhub Registry</router-link>
            <router-link to="/sample_report" class="ml-8 desktop-nav-item" exact>Sample reports</router-link>
          </div>
        </div>
        <!-- <div v-on:click="isOpen = !isOpen" class="hidden sm:ml-6 sm:flex sm:items-center">
          <button
            class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div class="ml-3 relative" v-on:click="isOpen = !isOpen">
            <div>
              <button
                @click="isOpen = !isOpen"
                class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt
                />
              </button>
            </div>
            <div
              v-show="isOpen"
              x-transition:enter="transition ease-out duration-200"
              x-transition:enter-start="transform opacity-0 scale-95"
              x-transition:enter-end="transform opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-75"
              x-transition:leave-start="transform opacity-100 scale-100"
              x-transition:leave-end="transform opacity-0 scale-95"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
            >
              <div class="py-1 rounded-md bg-white shadow-xs">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                >Your Profile</a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                >Settings</a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                >Sign out</a>
              </div>
            </div>
          </div>
        </div>-->
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            @click="open = !open"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                class="inline-flex"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                class="hidden"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div :class="{ block: open, hidden: !open }" id="phoneNav">
      <div class="pt-2 pb-3">
        <router-link exact to="/" class="phone-nav-item">Find a company</router-link>
        <router-link exact to="/about" class="mt-1 phone-nav-item">About Emerhub Registry</router-link>
        <router-link exact to="/sample_report" class="mt-1 phone-nav-item">Sample reports</router-link>
      </div>
      <!-- <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
            <div class="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
          </div>
        </div>
        <div class="mt-3" v-show="isOpen">
          <a
            href="#"
            class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
          >Your Profile</a>
          <a
            href="#"
            class="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
          >{{ isOpen }}</a>
          <a
            href="#"
            class="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
          >Sign out</a>
        </div>
      </div>-->
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data: function() {
    return {
      open: false,
      isOpen: false
    };
  },
  props: {
    msg: String
  }
};
</script>
<style lang="scss" scoped>
#desktopNav {
  .router-link-exact-active,
  .active {
    @apply border-blue-500 text-gray-900 font-bold;
  }
}

#phoneNav {
  .router-link-exact-active,
  .active {
    @apply border-blue-500 text-blue-700 bg-blue-50;

    &:focus {
      @apply text-blue-800 bg-blue-100 border-blue-700;
    }
  }
}

.desktop-nav-item {
  @apply border-b-2 border-transparent inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out;

  &:hover {
    @apply text-gray-700 border-gray-300;
  }

  &:focus {
    @apply outline-none text-gray-700 border-gray-300;
  }
}

.phone-nav-item {
  @apply block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 transition duration-150 ease-in-out;
  &:hover {
    @apply text-gray-800 bg-gray-50 border-gray-300;
  }

  &:focus {
    @apply outline-none text-gray-800 bg-gray-50 border-gray-300;
  }
}
</style>