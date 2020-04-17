<template>
  <div
    class="flex justify-between flex-col-reverse xl:flex-row px-4 sm:px-0"
    :class="{'opacity-50': paymentLoading }"
  >
    <ValidationObserver tag="form" ref="billingForm" class="md:mr-4 flex-1 flex-col mt-10 xl:mt-0">
      <div>
        <h2 class="text-xl leading-6 font-medium text-gray-900">Billing details</h2>
        <div class="mt-4 border-t border-gray-200">
          <div class="mt-6 grid grid-cols-1 row-gap-4 col-gap-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <form-group
                :disabled="paymentLoading"
                input-class="mt-1"
                rules="min:3|max:255"
                :value="user.name"
                placeholder="Cardholder's name"
                @input="updateName"
              >Name on card</form-group>
            </div>
            <div class="sm:col-span-3">
              <form-group
                :disabled="paymentLoading"
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
                  :disabled="paymentLoading"
                  name="Country/Region"
                  v-model="user.country"
                  :options="countryDictionary"
                ></form-select>
              </div>
            </div>
            <div class="sm:col-span-3">
              <form-group
                :disabled="paymentLoading"
                input-class="mt-1"
                v-model="user.zip"
                type="text"
                rules="numeric"
                :optional="true"
                placeholder="Zip code"
              >Zip code</form-group>
            </div>
            <!-- <div class="sm:col-span-6">
              <form-group
                input-class="mt-1"
                :optional="true"
                v-model="user.address"
                placeholder="Address"
              >Address</form-group>
            </div>-->
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
              :class="{ 'hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700': !paymentLoading }"
              class="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 transition duration-150 ease-in-out"
            >
              <span v-if="!paymentLoading">Place Order</span>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="margin: auto; background: transparent; display: block; shape-rendering: auto;"
                width="20"
                height="20"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="12"
                  r="35"
                  stroke-dasharray="164.93361431346415 56.97787143782138"
                  transform="rotate(252.301 50 50)"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  />
                </circle>
              </svg>
            </button>
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
                        :disabled="paymentLoading"
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
                              :disabled="opt.standard || !isInPayList(comp.systemId) || paymentLoading"
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
    <modal name="error" width="80%" height="auto" :maxWidth="400" :adaptive="true">
      <div class="bg-white px-4 pt-5 pb-4 overflow-hidden sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              class="h-6 w-6 text-red-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ error.title }}</h3>
            <div class="mt-2">
              <p class="text-base leading-5 text-gray-500">{{ error.message }}</p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <span class="flex w-full rounded-md shadow-sm">
            <button
              @click="hideError"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >Go back to checkout</button>
          </span>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { getCart, setCart } from "@/services/cart";
import { REPORT_TYPES } from "@/assets/value/report";
import { COUNTRY_DICTIONARY } from "@/assets/value/country";
import { loadStripe } from "@stripe/stripe-js";
import { createIntent, postDataToWordpress } from "@/services/checkout";

const PRICE_MAP = Object.fromEntries(
  REPORT_TYPES.map(option => [option.value, option.price])
);

const STRIPE_PUBLIC_KEY = "pk_test_VWr2CtOHNhSt6Otvd5ahu2v9";
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
        // address: "",
        email: "",
        country: "",
        zip: ""
      },
      error: {
        title: "",
        message: ""
      },
      tripe: null,
      card: null,
      cardErrors: null,
      paymentLoading: false,
      priceMap: PRICE_MAP
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
            total += this.priceMap[opt];
          });
        });

      return total;
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
        .create("card", { hidePostalCode: true, style: STRIPE_CARD_STYLE });
      this.card.mount(STRIPE_CARD_ID);

      this.card.addEventListener("change", event => {
        if (event.error) {
          this.cardErrors = event.error.message;
        } else {
          this.cardErrors = "";
        }
      });
    },
    showError(
      message = "Unable make payment. Please try other payment method or contact customer support",
      title = "Payment fail"
    ) {
      this.error.message = message;
      this.error.title = title;
      this.$modal.show("error");
    },
    hideError() {
      this.error.message = "";
      this.error.title = "";
      this.$modal.hide("error");
    },
    async placeOrder() {
      if (this.paymentLoading) return;

      this.paymentLoading = true;
      const isUserValid = await this.$refs.billingForm.validate();
      // Billing form is not valid
      if (!isUserValid) {
        this.paymentLoading = false;
        return;
      }
      // Empty card or deselect all company
      if (!this.payList || !this.payList.length) {
        this.showError("Please select at least 1 company", "Empty order");
        this.paymentLoading = false;
        return;
      }
      const order = this.payList.map(systemId => {
        return this.localCart.find(c => c.systemId === systemId);
      });

      const mapOrder = order.map(({ systemId, options }) => {
        const mapOpts = options.map(
          opt => `${systemId}_${opt === "standard" ? "SR" : "ER"}`
        );
        return mapOpts.join();
      });
      const stringOrder = mapOrder.join();
      const stripeAmount = this.totalOrder * 100;

      if (this.user.zip) {
        await this.card.update({ value: { postalCode: this.user.zip } });
      }

      const payment = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.card,
        billing_details: {
          name: this.user.name,
          email: this.user.email,
          address: {
            country: this.user.country,
            postal_code: this.user.zip
          }
        }
      });

      // Payment detail invalid
      if (payment.error) {
        this.card.focus();
        this.paymentLoading = false;
        return;
      }
      const { billing_details } = payment.paymentMethod;
      try {
        const intent = await createIntent(this.user, stripeAmount, stringOrder);
        if (!intent || !intent.client_secret) {
          this.showError();
          return;
        }

        const confirmCardPayment = await this.stripe.confirmCardPayment(
          intent.client_secret,
          {
            payment_method: {
              card: this.card,
              billing_details
            }
          }
        );
        if (!confirmCardPayment || confirmCardPayment.error) {
          const message =
            confirmCardPayment.error.message ||
            "Unable make payment. Please try other payment method or contact customer support";
          this.showError(message);
          return;
        }
        if (
          !confirmCardPayment.paymentIntent ||
          !confirmCardPayment.paymentIntent.status ||
          confirmCardPayment.paymentIntent.status !== "succeeded"
        ) {
          this.showError();
          return;
        }

        // Post data to wordpress
        try {
          await this.processAndSendDataToWordpress(order, this.user, intent.id);
        } catch (error) {
          console.log(error);
        }
        // Post data to wordpress end

        this.localCart = this.localCart.filter(c => {
          return !this.payList.includes(c.systemId);
        });
        this.updateCart();
        this.$router.push({ path: `/thankyou?name=${this.user.name}` });
      } catch (error) {
        this.showError();
      } finally {
        this.paymentLoading = false;
      }
    },

    async processAndSendDataToWordpress(order, user, intentId) {
      if (!order || !user || !intentId) return;

      const wpOrder = order.map(({ id, systemId, name, options }) => {
        let amount = 0;
        const stringOptions = options
          .map(opt => {
            amount += this.priceMap[opt];
            return opt === "standard" ? "SR" : "ER";
          })
          .join();

        return {
          companyName: name,
          companyId: id,
          systemId,
          quantity: 1,
          options: stringOptions,
          amount: amount + ""
        };
      });

      const { country, email, name, zip } = user;

      const { text: countryName } = this.countryDictionary.find(
        item => item.value === country
      );

      const wpUser = {
        name,
        email,
        country: countryName,
        address: "",
        zipcode: +zip
      };

      return await postDataToWordpress(intentId, wpUser, wpOrder);
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