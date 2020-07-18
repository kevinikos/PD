import store              from '../../../store/store';
import { ALL_CATEGORIES } from '@/helpers/variables';

export default {
  state: {
    filteredProducts: [],
  },
  mutations: {
    filterProducts: (state, category) => {
      if (category !== ALL_CATEGORIES) {
        state.filteredProducts = store.state.products
          .filter(product => product.categories === category);
      } else {
        state.filteredProducts = store.state.products;
      }
    },
  },
};
