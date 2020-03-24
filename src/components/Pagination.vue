<template>
  <div
    class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
  >
    <div class="w-0 flex-1 flex">
      <a
        class="-mt-px border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
        @click="changePage(currentPage > 0 ? currentPage - 1 : currentPage)"
      >
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Previous
      </a>
    </div>
    <div class="hidden md:flex">
      <template 
          v-for="page in pageButtons"
      >
      <span
          v-if="page === 'less' || page === 'more'"
          :key="page"
          class="page-content inline-flex"
        >
          ...
        </span>
        <span
            v-else
            :key="page"
            class="page-content inline-flex"
            :class="{'active': page - 1 === currentPage}"
            :tabindex="page"
            @click="changePage(page - 1)"
          >
            {{ page }}
          </span>
      </template>
    </div>
    <div class="w-0 flex-1 flex justify-end">
      <a
        class="-mt-px border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
        @click="changePage(currentPage < pageCount - 1 ? currentPage + 1 : currentPage)"
      >
        Next
        <svg
          class="ml-3 h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pageLimit: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pageButtons() {
      const from = Math.max(
        Math.min(
          this.currentPage - Math.round(this.pageLimit/2) + 1,
          this.pageCount + 1 - this.pageLimit
        ), 1
      )
      const to = Math.min(from + this.pageLimit - 1, this.pageCount)
      
      return this.range(from, to + 1).map(page => {
        if (page === from && from > 1) {
          return 'less'
        }
        
        if (page === to && to < this.pageCount) {
          return 'more'
        }

        return page
      })
    },
  },
  data() {
    return {
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    range(start, count) {
      return Array.from(Array(count - start).keys())
                  .map(val => val + start)
    }
  }
}
</script>
<style lang="scss" scoped>
.page-content {
  @apply cursor-pointer -mt-px border-t-2 border-transparent pt-4 px-4 items-center text-sm leading-5 font-medium text-gray-500 transition ease-in-out duration-150;

  &:hover {
    @apply text-gray-700 border-gray-300;
  }

  &:focus {
    @apply  outline-none text-gray-700 border-gray-400;
  }

  &.active {
    @apply border-blue-500 text-blue-600;

    &:focus {
      @apply text-blue-800 border-blue-700;
    }
  }
}
</style>
