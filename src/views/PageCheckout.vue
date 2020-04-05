<template>
  <div class="flex justify-between flex-col-reverse xl:flex-row px-4 sm:px-0">
    <ValidationObserver tag="form" ref="billingForm" class="md:mr-4 flex-1 flex-col mt-10 xl:mt-0">
      <div>
        <h2 class="text-xl leading-6 font-medium text-gray-900">Billing details</h2>
        <div class="mt-4 border-t border-gray-200">
          <div class="mt-6 grid grid-cols-1 row-gap-4 col-gap-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <form-group
                input-class="mt-1"
                rules="min:3|max:255"
                :value="user.name"
                placeholder="Cardholder's name"
                @input="updateName"
              >Name on card</form-group>
            </div>
            <div class="sm:col-span-3">
              <form-group
                input-class="mt-1"
                v-model="user.email"
                type="email"
                placeholder="Reciever's email"
                rules="email"
              >Email</form-group>
            </div>
            <div class="sm:col-span-3">
              <form-label>Country / Region</form-label>
              <div class="mt-1 rounded-md">
                <form-select
                  name="Country/Region"
                  v-model="user.country"
                  :options="countryDictionary"
                ></form-select>
              </div>
            </div>
            <div class="sm:col-span-6">
              <form-group
                input-class="mt-1"
                :optional="true"
                v-model="user.address"
                placeholder="Address"
              >Address</form-group>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8">
          <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">Payment details</h2>
          </div>
          <div>
            <div id="card-element">
              <!-- A Stripe Element will be inserted here. -->
            </div>

            <!-- Used to display form errors. -->
            <div class="mt-1 text-red-500 text-sm" role="alert">{{ cardErrors }}</div>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-200 pt-5">
        <div class="flex justify-center lg:justify-end">
          <span class="w-full inline-flex rounded-md shadow-sm">
            <button
              @click="placeOrder"
              type="button"
              class="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >Place Order</button>
          </span>
        </div>
      </div>
    </ValidationObserver>

    <!-- Order list -->
    <div class="flex flex-col xl:ml-8">
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
          <li v-for="comp in localCart" :key="comp.systemId" class="pt-4 last:pb-4">
            <div
              class="block focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              :class="{ 'opacity-50': !isInPayList(comp.systemId) }"
            >
              <div class="px-4 flex items-center sm:px-6">
                <div class="w-full flex flex-col items-stretch justify-center">
                  <div class="w-full text-sm leading-5 font-medium text-blue-600 truncate">
                    <label>
                      <input
                        type="checkbox"
                        class="mr-1 opacity-100"
                        v-model="payList"
                        :value="comp.systemId"
                      />
                      {{ comp.name }}
                    </label>
                  </div>
                  <div
                    v-for="opt in options"
                    :key="opt.value"
                    class="hover:bg-gray-200 ml-5 sm:flex sm:flex-wrap justify-between text-gray-500 text-sm font-medium"
                  >
                    <label class="block w-full">
                      <v-popover
                        class="w-full v-popover--block"
                        placement="top"
                        trigger="hover focus"
                      >
                        <div class="flex flex-wrap md:flex-no-wrap items-center justify-between">
                          <div class="w-full flex items-center">
                            <input
                              type="checkbox"
                              :id="opt.value"
                              :value="opt.value"
                              v-model="comp.options"
                              :disabled="opt.standard || !isInPayList(comp.systemId)"
                            />
                            <span class="ml-2">{{ opt.text }}</span>
                            <div class="ml-auto block md:hidden">${{ opt.price }}</div>
                          </div>
                          <div class="ml-4 md:block hidden">${{ opt.price }}</div>
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
          <div class="text-xl text-right flex-1">
            Total sum
            <span class="font-medium">${{ totalOrder }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCart, setCart } from "@/services/cart";
import { REPORT_TYPES } from "@/assets/value/report";
import { COUNTRY_DICTIONARY } from "@/assets/value/country";
import { loadStripe } from "@stripe/stripe-js";
import { createIntent } from "@/services/checkout";

const priceMap = Object.fromEntries(
  REPORT_TYPES.map(option => [option.value, option.price])
);

const STRIPE_PUBLIC_KEY = "pk_test_oPnsyrSiZ3w8BU9dRxOL75DT00b8nlcyza";
const STRIPE_CARD_ID = "#card-element";
const STRIPE_CARD_STYLE = {
  base: {
    color: "#000",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontSmoothing: "antialiased",
    fontSize: "14px",
    "::placeholder": {
      color: "#9fa6b2",
      opacity: 1
    }
  },
  invalid: {
    color: "#f05252",
    iconColor: "#f05252"
  }
};

export default {
  name: "Checkout",
  components: {},
  data() {
    return {
      countryDictionary: [
        { text: "Select a country/region", value: "" },
        ...COUNTRY_DICTIONARY
      ],
      localCart: [],
      payList: [],
      options: REPORT_TYPES,
      user: {
        name: "",
        address: "",
        email: "",
        country: ""
      },
      tripe: null,
      card: null,
      cardErrors: null
    };
  },
  computed: {
    totalOrder() {
      if (!this.payList || !this.payList.length) return 0;
      let total = 0;
      this.localCart
        .filter(comp => this.payList.includes(comp.systemId))
        .forEach(comp => {
          comp.options.forEach(opt => {
            total += priceMap[opt];
          });
        });

      return total;
    },
    amount() {
      return this.totalOrder * 100;
    }
  },
  filters: {
    uppercase: function(value) {
      if (!value) return value;
      return value.toUpperCase();
    }
  },
  async mounted() {
    await this.createStripeCard();
    this.localCart = getCart();
    this.payList = this.localCart.map(c => c.systemId);
  },
  methods: {
    updateName(val) {
      this.user.name = val.toUpperCase();
    },
    updateCart() {
      setCart(this.localCart);
    },
    isInPayList(systemId) {
      return this.payList.includes(systemId);
    },
    async createStripeCard() {
      this.stripe = await loadStripe(STRIPE_PUBLIC_KEY);
      this.card = this.stripe
        .elements()
        .create("card", { style: STRIPE_CARD_STYLE });
      this.card.mount(STRIPE_CARD_ID);

      this.card.addEventListener("change", event => {
        if (event.error) {
          this.cardErrors = event.error.message;
        } else {
          this.cardErrors = "";
        }
      });
    },
    async placeOrder() {
      const order = this.payList.map(systemId => {
        return this.localCart.find(c => c.systemId === systemId);
      });

      const paymentIntent = await createIntent(this.user, this.amount, order);
      console.log("placeOrder -> paymentIntent", paymentIntent);

      const isUserValid = await this.$refs.billingForm.validate();

      console.log("placeOrder -> isUserValid", isUserValid);
      if (!isUserValid) {
        return;
      }
      const confirmCardPayment = await this.stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.user.name,
              email: this.user.email,
              address: {
                country: this.user.country,
                line1: this.user.address,
                postal_code: this.card.address_zip
              }
            }
          }
        }
      );

      alert(confirmCardPayment.paymentIntent.status);
    }
  }
};
</script>
<style lang="scss" scoped>
.StripeElement {
  height: 2.5rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d2d6dc;
  @apply appearance-none bg-white rounded-md;
}

.StripeElement--focus {
  box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
  border-color: #a4cafe;
}

.StripeElement--invalid {
  border-color: #f05252;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>