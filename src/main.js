import Vue from 'vue'
import App from './App'
import '@/assets/css/tailwind.css'
import VueRouter from 'vue-router'
import VueFuse from 'vue-fuse';

import Home from './views/Home'
import PageSingleCompany from './views/PageSingleCompany'
import Login from './views/PageLogin'
import Checkout from './views/PageCheckout'



Vue.use(VueRouter)
Vue.use(VueFuse)

Vue.config.productionTip = false


const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/co/:country_id_system', component: PageSingleCompany  },
    { path: '/login', component: Login  },
    { path: '/checkout', component: Checkout  },

  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')