<template>
  <div class="search">
    <div class="search__content">
      <form @submit.prevent="search"
            class="search__form">

        <div class="search__form__wrapper">

          <input class="search__form__input"
                 spellcheck="false"
                 type="text"
                 v-model="searchValue">

          <button type="button"
                  class="search__form__button"
                  @click="clearSearch">

            &#215;
          </button>
        </div>
        <div class="search__form__info">
          Type product that you are looking for
        </div>
      </form>
      <div class="search__item-list">
        <product-tile v-for="product in this.$store.state.searchStore.searchResults"
                      :product="product"
                      :key="product.id"
                      @click.native="goToProduct(product.categories, product.id)" />

      </div>
      <div class="search__results-counter"
           :class="{'search__results-counter--hide': !resultsNumber}">

        {{resultsNumber}} searched results
      </div>
      <div class="search__no-results"
           :class="{'search__no-results--show': (resultsNumber === 0 && alreadySearched)}">

        there is no such product in our store
      </div>
    </div>
  </div>
</template>

<script>
import ProductTile from '@/components/s-product-tile/s-product-tile.component.vue';

export default {
  name: 'search',
  components: {
    ProductTile,
  },
  data() {
    return {
      searchValue: '',
      alreadySearched: false,
    };
  },
  computed: {
    resultsNumber() {
      return this.$store.state.searchStore.searchResults.length;
    },
  },
  methods: {
    search() {
      this.$store.dispatch('searchForProducts', this.searchValue.toLowerCase().trim());
      this.alreadySearched = true;
    },
    clearSearch() {
      this.searchValue = '';
      this.$store.commit('setResults', []);
      this.alreadySearched = false;
    },
    goToProduct(category, id) {
      this.$router.push({ path: `/products/${category}/${id}` });
    },
  },
  created() {
    this.clearSearch();
  },
};
</script>

<style scoped lang="scss">
.search {
  min-height: 100vh;

  &__no-results {
    display: none;
    color: $black;
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 5rem;
    opacity: 0.3;
    padding-bottom: 10rem;
    text-align: center;

    &--show {
      display: block;
    }

  }

  &__content {
    min-height: 100vh;
    padding: 25rem 20rem 20rem 20rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &::after {
      content: '';
      background: url("../../assets/img/photo-1449247709967-d4461a6a6103.png");
      background-size: cover;
      background-position-x: center;
      background-position-y: center;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: fixed;
      z-index: -1;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    margin-bottom: 20rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 100rem;

    &__wrapper {
      position: relative;
    }


    &__input {
      height: 17rem;
      width: 100%;
      border: none;
      font-size: 14rem;
      text-transform: uppercase;
      font-weight: 200;
      color: $black;
      letter-spacing: 3.5px;
      background-color: transparent;
      padding-right: 10rem;

      &:focus {
        outline: none;
      }
    }

    &__button {
      position: absolute;
      right: 2rem;
      bottom: 3.5rem;
      background-color: transparent;
      border: none;
      font-size: 10rem;
      padding-left: 1rem;
      color: $grey-300;
      font-weight: 300;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }

    &__info {
      width: 100%;
      border-top: 1px solid $grey-300;
      font-size: 3.6rem;
      color: $grey-300;
      letter-spacing: 0.9px;
      font-weight: 300;
      padding-top: 3rem;
    }
  }

  &__item-list {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
    grid-gap: 5rem;
  }

  &__results-counter {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 0.75px;
    color: $black;
    margin-top: 4rem;

    &--hide {
      display: none;
    }
  }
}

</style>
