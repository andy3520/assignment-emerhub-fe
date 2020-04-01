import Vue from 'vue'
import App from './App'
import VueFuse from 'vue-fuse';
import VTooltip from 'v-tooltip'

import '@/assets/css/tailwind.scss'
import router from '@/router';

Vue.use(VTooltip)
Vue.use(VueFuse)
VTooltip.options.popover.defaultPlacement = 'right-start'
VTooltip.options.defaultPlacement = 'right-start'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')