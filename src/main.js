import Vue from 'vue'
import App from './App'
import VueFuse from 'vue-fuse';
import VTooltip from 'v-tooltip'
import FormGroup from '@/components/FormGroup';
import FormLabel from '@/components/FormLabel';
import FormInput from '@/components/FormInput';
import FormSelect from "./components/FormSelect";
import VModal from 'vue-js-modal'

import '@/assets/css/tailwind.scss'
import router from '@/router';

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json";

extend("phone", {
  validate(value) {
    let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return pattern.test(value);
  },
  message: "This {_field_} field must be a valid 10 digits phone number"
});

extend("url", {
  validate(value) {
    let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return pattern.test(value);
  },
  message: "This {_field_} field must be a valid url"
});

// Validation Rules
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});

Vue.directive("disable-all", {
  // When all the children of the parent component have been updated
  componentUpdated: function (el, binding) {
    if (!binding.value) return;
    const tags = ["input", "button", "textarea", "select"];
    tags.forEach(tagName => {
      const nodes = el.getElementsByTagName(tagName);
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
        nodes[i].tabIndex = -1;
      }
    });
  }
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("form-input", FormInput);
Vue.component("form-label", FormLabel);
Vue.component("form-group", FormGroup);
Vue.component("form-select", FormSelect);

Vue.use(VTooltip)
Vue.use(VueFuse)
Vue.use(VModal)
VTooltip.options.popover.defaultPlacement = 'right-start'
VTooltip.options.defaultPlacement = 'right-start'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')