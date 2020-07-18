<template>
  <div class="products">

    <div class="products__header">
      <h1 class="header__title">products</h1>
      <h4 class="header__category">
        {{currentCategory}}
      </h4>
    </div>

    <div v-if="categoryProducts.length === 0"
         class="products__no-results">

      <h2>no products in this category</h2>
    </div>

    <div v-else
         class="products__product-list">

      <product-tile :key="product.id"
                    class="product-list__item"
                    :product="product"
                    v-for="product in categoryProducts.slice(0, numberOfDisplayedProducts)"
                    @click.native="goToProduct(product)" />

    </div>

    <div class="products__button-wrapper">
      <button class="products__button"
              :class="{'products__button--hidden' : !isMore }"
              @click="showMoreProducts">

        show more products
      </button>
    </div>
  </div>
</template>

<script>
import productTile                         from '@/components/s-product-tile/s-product-tile.component.vue';
import store                               from '../../store/store';
import { ALL_CATEGORIES, PRODUCT_DETAILS } from '@/helpers/variables';

export default {
  name: 'products',
  components: {
    productTile,
  },
  data() {
    return {
      currentCategory: this.$router.currentRoute.params.category
        ? this.$router.currentRoute.params.category
        : ALL_CATEGORIES,
      categoryProducts: [],
      numberOfDisplayedProducts: 6,
    };
  },
  methods: {
    showMoreProducts() {
      const DEFAULT_NUMBER_OF_ITEMS = 6;
      if (this.categoryProducts.length >= (this.numberOfDisplayedProducts
        + DEFAULT_NUMBER_OF_ITEMS)) {
        this.numberOfDisplayedProducts += DEFAULT_NUMBER_OF_ITEMS;
        return;
      }
      if (this.categoryProducts.length < (this.numberOfDisplayedProducts
        + DEFAULT_NUMBER_OF_ITEMS)) {
        this.numberOfDisplayedProducts = this.categoryProducts.length;
      }
    },
    goToProduct(product) {
      this.$router.push({
        name: PRODUCT_DETAILS,
        params: {
          category: product.categories,
          productId: product.id,
        },
      });
    },
  },
  computed: {
    isMore() {
      return this.categoryProducts.length > this.numberOfDisplayedProducts;
    },
  },
  created() {
    store.commit('filterProducts', this.currentCategory);
    this.categoryProducts = store.state.productsStore.filteredProducts;
  },
  async beforeRouteEnter(to, from, next) {
    const route = to.params.category ? to.params.category : ALL_CATEGORIES;
    if (store.state.products.length === 0) {
      await store.dispatch('fetchProducts');
    }
    store.commit('filterProducts', route);
    await store.dispatch('getCartItems');
    next();
  },
};
</script>

<style scoped lang="scss">
.products {
  background-color: $grey-100;
  padding: 6rem 20rem 7rem 15rem;
  display: grid;
  grid-template-rows: 20rem 1fr 4rem;
  min-height: 100vh;


  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 6rem;

    .header {

      &__title {
        text-transform: uppercase;
        font-weight: 300;
        color: $black;
        font-size: 7.2rem;
        letter-spacing: 1.8px;
      }

      &__category {
        letter-spacing: 4.5px;
        color: $grey-300;
        text-transform: uppercase;
        margin-left: 2rem;
      }
    }
  }

  &__product-list {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
    grid-gap: 5rem;
    padding-bottom: 3rem;
    justify-content: center;

    .product-list {

      &__item {
        max-height: 45rem;
      }
    }
  }

  &__button-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  &__button {
    border: none;
    text-transform: uppercase;
    background-color: unset;
    cursor: pointer;
    color: $primary;

    &:focus {
      outline: none;
    }

    &:hover {
      text-decoration: underline;
    }

    &--hidden {
      display: none;
    }
  }

  &__no-results {
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
      color: $black;
      text-transform: uppercase;
      font-weight: bolder;
      font-size: 8rem;
      opacity: 0.3;
      padding-bottom: 10rem;
      text-align: center;
    }
  }
}
</style>
