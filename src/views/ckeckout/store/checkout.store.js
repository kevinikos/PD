import * as Services from '../../../services/api.services';

export default {
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, payload) {
      if (payload.item.amount === 0) {
        return;
      }

      if (state.cart.find(product => product.id === payload.item.id)) {
        const index = state.cart.findIndex(product => product.id === payload.item.id);

        if (state.cart[ index ].amount >= state.cart[ index ].quantity) {
          return;
        }
        state.cart[ index ].amount = payload.amount;
      } else if (!payload.item.amount) {
        const newItem = {
          ...payload.item,
          amount: payload.amount,
        };
        state.cart = [ ...state.cart, newItem ];
      } else {
        state.cart = [ ...state.cart, payload.item ];
      }
    },

    setAmount(state, payload) {
      const index = state.cart.findIndex(product => product.id === payload.id);
      state.cart[ index ].amount = payload.amount;
    },
    removeFromCart(state, id) {
      const index = state.cart.findIndex(product => product.id === id);
      state.cart.splice(index, 1);
    },
    setCartItems(state, payload) {
      state.cart = payload;
    },
  },
  actions: {
    async setCartItems({ state }) {
      try {
        await Services.setCartItems(state.cart);
      } catch (e) {
        throw Error;
      }
    },
    async getCartItems({ commit }) {
      try {
        const response = await Services.fetchCartItems();
        commit('setCartItems', response.data.cartItems);
      } catch (e) {
        throw Error;
      }
    },

    async setAmount({ commit, dispatch }, payload) {
      if (!payload.productRemoved) {
        commit('setAmount', payload);
      }
      await dispatch('setCartItems');
    },
    async removeFromCart({ commit, dispatch }, payload) {
      commit('removeFromCart', payload);
      await dispatch('setCartItems');
    },
    async addToCart({ commit, dispatch }, payload) {
      commit('addToCart', payload);
      await dispatch('setCartItems');
    },
  },
  getters: {
    inCart: state => id => state.cart.find(item => item.id === id),
  },
};
