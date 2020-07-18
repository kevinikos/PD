import Vue            from 'vue';
import Router         from 'vue-router';
import Home           from './views/home/home.view.vue';
import Products       from './views/products/products.view.vue';
import Search         from './views/search/search.view.vue';
import Checkout       from './views/ckeckout/checkout.view.vue';
import ProductDetails from './views/product-details/product-details.view.vue';
import SignUp         from './views/sign-up/sign-up.view.vue';
import SignIn         from './views/sign-in/sign-in.view.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/products/:category/:productId',
      name: 'product-details',
      component: ProductDetails,
    },
    {
      path: '/products/:category',
      name: 'products',
      component: Products,
    },
    {
      path: '/products',
      name: 'all-products',
      component: Products,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
  ],
});
