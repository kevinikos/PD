<template>
  <div class="product-tile__wrapper">
    <div class="product-tile">
      <div class="product-tile__image-wrapper">
        <img class="product-tile__image"
             :src="product.picture
             ? `${product.picture}.png`
             : 'https://wanowi.com/public/uploads/products/list/product-default.jpg'"
             alt="product">

      </div>
      <div class="product-tile__description">
        <p class="description__title">

          {{product.title}}
        </p>
        <p class="description__content">

          {{product.description}}
        </p>
        <p class="description__price">

          {{`$${product.price}`}}
        </p>
      </div>
    </div>
    <button @click.stop="addToCart()"
            class="product-tile__btn"
            :class="{ 'product-tile__btn--disabled': product.quantity === 0 || !checkIfCanOrderMore() }">

      {{getButtonText()}}
    </button>
    <span class="product-tile__info">
      {{this.howManyInCart > 0 ? `In Cart: ${howManyInCart}` : ''}}
    </span>
  </div>
</template>

<script>
import debounce from 'debounce';

export default {
  name: 's-product-tile',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      howManyInCart: 0,
      maxAmount: null,
    };
  },
  computed: {
    inCart: {
      get() {
        return this.$store.getters.inCart(this.product.id);
      },
    },
  },
  methods: {
    addToCartDebounced: debounce(function () {
      this.$store.dispatch('addToCart', { item: this.product, amount: this.howManyInCart });
    }, 500),
    addToCart() {
      if (this.product.quantity > 0 && this.howManyInCart < this.product.quantity) {
        this.howManyInCart += 1;
        this.addToCartDebounced();
      }
    },
    checkIfCanOrderMore() {
      return this.howManyInCart < this.product.quantity;
    },
    getButtonText() {
      if (this.product.quantity > 0 && this.checkIfCanOrderMore()) {
        return 'add to cart';
      }
      if (this.product.quantity <= 0) {
        return 'out of stock';
      }
      if (this.product.quantity > 0 && !this.checkIfCanOrderMore()) {
        return 'all in cart';
      }
      return 'add to cart';
    },
  },
  created() {
    if (this.inCart) {
      const index = this.$store.state.checkoutStore.cart
        .findIndex(product => product.id === this.product.id);
      this.howManyInCart = this.$store.state.checkoutStore.cart[ index ].amount;
    }
  },
};
</script>

<style scoped lang="scss">

.product-tile {
  background-color: $white;
  max-height: 45rem;
  height: 45rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 1fr;

  cursor: pointer;
  padding: 1rem;

  &__wrapper {
    position: relative;
    overflow: hidden;

    &:hover {
      box-shadow: 1rem 1rem 1rem 0 $box-shadow-color;
    }
  }

  &__btn {
    position: absolute;
    top: 0;
    right: 0;
    text-transform: uppercase;
    background: $primary;
    color: $white;
    border: none;
    border-radius: 0 0 0 1rem;
    padding: 1rem;
    cursor: pointer;

    &:hover {
      background-color: darken($primary, 20);
    }

    &:focus {
      outline: none;
    }

    &--disabled {
      background-color: lighten(darkred, 8);
      cursor: unset;
      color: $white;

      &:hover {
        background-color: lighten(darkred, 8);
      }

      &:focus {
        outline: none;
      }
    }
  }

  &__info {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 3rem;
    padding: 1rem;
    color: $grey-400;
  }

  &__image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 27rem;
  }

  &__image {
    max-height: 100%;
    max-width: 100%;
  }

  &__description {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    padding: 1rem 5rem;

    .description {
      &__title {
        font-size: 3rem;
        text-transform: uppercase;
        font-weight: 300;
        color: $black;
        letter-spacing: 0.75px;
      }

      &__content {
        margin-top: 1rem;
        margin-bottom: 2rem;
        color: $grey-400;
        letter-spacing: 4.5px;
        font-weight: 300;
        max-height: 3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        display: block;
        overflow: hidden;
      }

      &__price {
        color: $primary;
        font-weight: bold;
        letter-spacing: 4.5px;
        margin-bottom: 2rem;
      }
    }
  }
}

</style>
