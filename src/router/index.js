import Vue from 'vue';
import Router from 'vue-router';

const MainContainer = () => import('@/container/MainContainer');

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  // base: 'wordpress54',
  routes: configRoutes()
})

function configRoutes() {
  return [
    {
      path: '/',
      name: "Index",
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home')
        },
        {
          path: ':country/:companyName/:id',
          name: 'ComapnyDetail',
          component: () => import('@/views/PageSingleCompany')
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/PageLogin'),
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/PageCheckout'),
        },
        {
          path: 'thankyou',
          name: 'Thankyou',
          component: () => import('@/views/Thankyou'),
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/About'),
        },
        {
          path: 'sample_report',
          name: 'Sample',
          component: () => import('@/views/Sample'),
        },
        { path: "*", component: () => import('@/views/NotFound') }
      ]
    },
  ]
} 