<template>
  <div class="flex justify-between flex-col-reverse md:flex-row px-4 sm:px-0">
    <form class="md:mr-4 flex flex-col">
      <div>
        <h2 class="text-xl leading-6 font-medium text-gray-900">Billing details</h2>
        <div class="mt-4 border-t border-gray-200">
          <div class="mt-6 grid grid-cols-1 row-gap-4 col-gap-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label
                for="first_name"
                class="block text-sm font-medium leading-5 text-gray-700"
              >Name on card</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="first_name"
                  class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div class="sm:col-span-6">
              <label
                for="first_name"
                class="block text-sm font-medium leading-5 text-gray-700"
              >Address</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="first_name"
                  class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium leading-5 text-gray-700"
              >Country / Region</label>
              <div class="mt-1 rounded-md shadow-sm">
                <select
                  id="country"
                  class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="zip"
                class="block text-sm font-medium leading-5 text-gray-700"
              >ZIP / Postal</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="zip"
                  class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8">
          <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">Payment details</h2>
          </div>
          <div>
            <div>
              <fieldset>
                <legend class="block text-sm font-medium leading-5 text-gray-700">Card Details</legend>
                <div class="mt-1 bg-white rounded-md shadow-sm">
                  <div>
                    <input
                      aria-label="Card number"
                      class="form-input relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      placeholder="Card number"
                    />
                  </div>
                  <div class="-mt-px flex">
                    <div class="w-1/2 flex-1 min-w-0">
                      <input
                        aria-label="Card expiration date"
                        class="form-input relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div class="-ml-px flex-1 min-w-0">
                      <input
                        aria-label="Card CVC"
                        class="form-input relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-200 pt-5">
        <div class="flex justify-end">
          <span class="inline-flex rounded-md shadow-sm">
            <button
              :disabled="!payList || !payList.length"
              class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >Place Order</button>
          </span>
        </div>
      </div>
    </form>
    <div class="max-w-md lg:ml-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <h2 class="text-xl mb-2 px-4 sm:px-6 mt-4">Order details</h2>
        <ul class="border-t border-gray-200">
          <li class="sm:min-w-xs text-center p-3" v-if="!localCart || !localCart.length">
            Your cart is empty
            <router-link
              class="ml-1 font-bold uppercase text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out cursor-pointer"
              :to="{name: 'Home'}"
            >Find a company</router-link>
          </li>
          <li v-for="comp in localCart" :key="comp.id" class="pt-4 last:pb-4">
            <div
              class="block focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              :class="{ 'opacity-50': !isInPayList(comp.id) }"
            >
              <div class="px-4 flex items-center sm:px-6">
                <div class="min-w-0 flex-wrap flex-1 sm:flex sm:items-center sm:justify-between">
                  <div class="w-full text-sm leading-5 font-medium text-blue-600 truncate">
                    <label>
                      <input
                        type="checkbox"
                        class="mr-1 opacity-100"
                        v-model="payList"
                        :value="comp.id"
                      />
                      {{ comp.name }}
                    </label>
                  </div>
                  <div
                    v-for="opt in options"
                    :key="opt.value"
                    class="hover:bg-gray-200 ml-5 sm:flex sm:flex-wrap justify-between text-gray-500 text-sm font-medium"
                  >
                    <label>
                      <v-popover placement="top" trigger="hover focus">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center">
                            <input
                              type="checkbox"
                              :id="opt.value"
                              :value="opt.value"
                              v-model="comp.options"
                              :disabled="opt.standard || !isInPayList(comp.id)"
                            />
                            <span class="max-w-xs ml-2 truncate">{{ opt.text }}</span>
                          </div>
                          <div class="ml-4">${{ opt.price }}</div>
                        </div>
                        <template slot="popover">
                          <div
                            class="text-sm rounded bg-black opacity-75 text-white px-2 py-1"
                          >{{ opt.info }}</div>
                        </template>
                      </v-popover>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="border-t border-gray-200 py-2 px-4 sm:px-6 flex items-center">
          <span class="inline-flex rounded-md shadow-sm">
            <button
              :disabled="!payList || !payList.length"
              class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >Place Order</button>
          </span>
          <div class="text-xl text-right flex-1">
            Total sum
            <span class="font-medium">${{ totalOrder }}</span>
          </div>
        </div>
      </div>
      <div>
        Test payment
        <card
          class="stripe-card"
          :class="{ complete }"
          stripe="pk_test_oPnsyrSiZ3w8BU9dRxOL75DT00b8nlcyza"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />
        <button class="pay-with-stripe" @click="pay" :disabled="!complete">Pay with credit card</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCart, setCart } from "@/services/cart";
import { REPORT_TYPES } from "@/assets/value/report";
import { Card, createToken } from "vue-stripe-elements-plus";

const stripeKey = "pk_test_oPnsyrSiZ3w8BU9dRxOL75DT00b8nlcyza";
const priceMap = Object.fromEntries(
  REPORT_TYPES.map(option => [option.value, option.price])
);

export default {
  name: "Checkout",
  components: {
    Card
  },
  data() {
    return {
      localCart: [],
      payList: [],
      billingData: {},
      options: REPORT_TYPES,
      complete: false,
      paymentIntent: null,
      stripeOptions: {}
    };
  },
  computed: {
    totalOrder() {
      if (!this.payList || !this.payList.length) return 0;
      let total = 0;
      this.localCart
        .filter(comp => this.payList.includes(comp.id))
        .forEach(comp => {
          comp.options.forEach(opt => {
            total += priceMap[opt];
          });
        });

      return total;
    }
  },
  mounted() {
    this.localCart = getCart();
    this.payList = this.localCart.map(c => c.id);
  },
  methods: {
    pay() {
      createToken().then(data => console.log(data.token));
    },
    updateCart() {
      setCart(this.localCart);
    },
    isInPayList(id) {
      return this.payList.includes(id);
    }
  }
};
</script>
<style lang="scss" scoped>
.stripe-card {
  @apply font-sans;
}
</style>