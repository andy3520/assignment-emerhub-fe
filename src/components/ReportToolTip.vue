<template>
  <div>
    <h3
      class="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:leading-9 sm:truncate"
    >Information included in report:</h3>
    <ul class="mt-5 px-3">
      <li class="flex mt-1 text-sm leading-5 text-gray-900" v-for="item in data" :key="item">
        <svg
          class="flex-shrink-0 h-5 w-4 text-green-500 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
const INFO = [
  "Name and domicile",
  "Business activities",
  "Number and date of estabilishment",
  "Minister's Decree of company ratification",
  "Contact details of shareholders, members of board of directors and board of commissioners"
];
export default {
  props: {
    data: {
      type: Array,
      default: () => INFO
    }
  }
};
</script>

<style>
</style>