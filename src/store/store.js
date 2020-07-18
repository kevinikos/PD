import Vue           from 'vue';
import Vuex          from 'vuex';
import productsStore from '../views/products/store/products.store';
import checkoutStore from '../views/ckeckout/store/checkout.store';
import searchStore   from '../views/search/search.store';
import loginStore    from '../views/sign-up/login.store';
import {
  fetchProducts,
  fetchCategories,
  fetchFavorites,
  setFavorites,
  setProducts,
}                    from '@/services/api.services';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    checkoutStore,
    productsStore,
    searchStore,
    loginStore,
  },
  state: {
    categories: [],
    products: [],
    currentPath: '',
    userFavorites: [],
  },
  mutations: {
    setCategories: (state, newCategories) => (state.categories = newCategories),
    setProducts: (state, newProducts) => (state.products = newProducts),
    setCurrentPath: (state, path) => {
      state.currentPath = path;
    },
    setFavorites: (state, favorites) => {
      state.userFavorites = favorites;
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await fetchCategories();
        commit('setCategories', response.data.categories);
      } catch (e) {
        throw Error;
      }
    },
    async fetchProducts({ commit }) {
      try {
        const response = await fetchProducts();
        commit('setProducts', response.data.products);
      } catch (e) {
        throw Error;
      }
    },
    async fetchFavorites({ commit }) {
      try {
        const { data } = await fetchFavorites();
        commit('setFavorites', data.favorites);
      } catch (e) {
        throw Error;
      }
    },
    async setFavorites({ commit }, payload) {
      try {
        await setFavorites(payload);
        commit('setFavorites', payload);
      } catch (e) {
        throw Error;
      }
    },
    async setProducts({ commit }, payload) {
      try {
        await setProducts(payload);
        commit('setProducts', payload);
      } catch (e) {
        throw Error;
      }
    },
  },
});
