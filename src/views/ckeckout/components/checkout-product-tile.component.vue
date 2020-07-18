<template>
  <div class="checkout-product-tile">
    <div class="checkout-product-tile__content"
         @click="goToProduct">

      <div class="content__section">
        <img :src="image"
             alt="product"
             class="content__section--img">

      </div>
      <div class="content__section">
        <div class="content__section--description">
          <h3 class="content__section--description__title">

            {{product.title}}
          </h3>
          <p class="content__section--description__content">

            {{product.description}}
          </p>
        </div>
      </div>
      <div class="content__section content__section--quantity">
        <span class="quantity-btn"
              @click.stop="setAmount(SUBTRACT)">

          <span>-</span>
        </span>
        <p>{{itemAmount}}</p>
        <span class="quantity-btn"
              @click.stop="setAmount(ADD)"
              :class="{ 'hide': itemAmount === product.quantity }">

          <span>+</span>
        </span>
      </div>
      <p class="content__section content__section--price">

        {{`$${product.price}`}}
      </p>
    </div>
    <p class="checkout-product-tile__close-btn"
       @click="removeFromCart(product.id)">

      &#215;
    </p>
  </div>
</template>

<script>
import { mapActions }    from 'vuex';
import debounce          from 'debounce';
import { ADD, SUBTRACT } from '@/helpers/variables';

export default {
  name: 'checkout',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      itemAmount: null,
      ADD,
      SUBTRACT,
    };
  },
  methods: {
    goToProduct() {
      this.$router.push({ path: `/products/${this.product.categories}/${this.product.id}` });
    },
    ...mapActions([ 'removeFromCart' ]),
    setAmountDebounced: debounce(function (action, amount, productRemoved = false) {
      this.$store.dispatch('setAmount',
        {
          id: this.product.id, amount, action, productRemoved,
        });
    }, 500),
    setAmount(action) {
      switch (action) {
        case this.ADD: {
          if (this.itemAmount === this.product.quantity) {
            return;
          }

          this.itemAmount += 1;
          this.setAmountDebounced(action, this.itemAmount);
          break;
        }

        case this.SUBTRACT: {
          if (this.itemAmount === 1) {
            this.$store.commit('removeFromCart', this.product.id);
            this.setAmountDebounced(action, null, true);
          } else {
            this.itemAmount -= 1;
            this.setAmountDebounced(action, this.itemAmount);
          }

          break;
        }

        default: {
          break;
        }
      }
    },
  },
  created() {
    this.itemAmount = this.product.amount;
  },
  computed: {
    image() {
      return this.product.picture
        ? `${this.product.picture}.png`
        : 'https://wanowi.com/public/uploads/products/list/product-default.jpg';
    },
  },
};
</script>

<style scoped lang="scss">

@mixin multiLineEllipsis($lineHeight: 1.2em, $lineCount: 1, $bgColor: white) {
  overflow: hidden;
  position: relative;
  line-height: 1.3em;
  max-height: $lineHeight * $lineCount;
  text-align: justify;
  padding-right: 1.3em;
  &:before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1.3em;
    height: 1em;
    margin-top: 0.2em;
    background: $bgColor;
  }
}

.checkout-product-tile {
  position: relative;
  background-color: $white;
  cursor: pointer;
  max-width: 350rem;

  &:hover {
    box-shadow: 1rem 1rem 1rem 0 $box-shadow-color;
  }

  &__close-btn {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 3rem;
    padding: 0 1rem 1rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 20rem auto 10rem 15rem;
    height: 100%;

    .content__section {
      display: flex;
      align-items: center;
      width: 100%;

      &--quantity {
        font-size: 2.5rem;
        justify-self: flex-end;
        width: fit-content;

        & > p {
          font-size: 3rem;
          margin: 0 1rem;
        }

        .quantity-btn > span {
          font-size: 2.5rem;
          cursor: pointer;
          width: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          height: 3rem;
          border: 1px $grey-400 solid;

          &:hover {
            background-color: $grey-200;
          }
        }
      }

      &--img {
        max-height: 100%;
        max-width: 100%;
        width: auto;
        height: auto;
      }

      &--price {
        color: $primary;
        font-weight: bold;
        letter-spacing: .45rem;
        font-size: 2.8rem;
        padding-right: 3rem;
        padding-left: 2rem;
        max-width: fit-content;
        min-width: auto;
        justify-self: flex-end;
      }

      &--description {
        padding-top: 4rem;
        padding-left: 2rem;
        padding-right: 2rem;
        height: 100%;
        overflow-y: hidden;

        &__title {
          font-size: 3rem;
          text-transform: uppercase;
          font-weight: 300;
          color: $black;
          letter-spacing: .75px;
        }

        &__content {
          margin-top: 1rem;
          color: $grey-400;
          letter-spacing: .45rem;
          font-weight: 300;
          @include multiLineEllipsis($lineHeight: 1.25em, $lineCount: 3, $bgColor: white);
        }
      }
    }
  }
}

.hide {
  opacity: 0;
}
</style>
