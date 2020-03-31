import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/PageLogin'
import Checkout from '@/views/PageCheckout'
import PageSingleCompany from '@/views/PageSingleCompany';

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: configRoutes()
})

function configRoutes() {
  return [
    { path: '/', component: Home },
    { path: '/product/:countryCode_id_systemId', component: PageSingleCompany },
    { path: '/login', component: Login },
    { path: '/checkout', component: Checkout },
  ]
} 