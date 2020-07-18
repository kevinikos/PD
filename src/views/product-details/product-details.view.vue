<template>
  <div class="product-details">
    <div class="product-details__image-container">
      <div class="image-container__heart-icon-container">
        <p class="heart-icon-container__favorites-number">{{likes}}</p>
        <app-icon :icon="isFavorite() ? 'heart-filled' : 'heart-empty'"
                  class="heart-icon-container__icon"
                  @click.native="toggleFavorites" />

      </div>
      <img :src="product.picture
             ? `${product.picture}.png`
             : 'https://wanowi.com/public/uploads/products/list/product-default.jpg'"
           alt="product"
           class="image-container__image">

    </div>

    <div class="product-details__info">

      <div class="info__header">
        <h2 class="header__title">products</h2>
        <h4 class="header__category">{{this.$route.params.category}}</h4>
      </div>

      <div class="info__main-content">
        <h1 class="main-content__product-title">{{product.title}}</h1>
        <h3 class="main-content__product-description">{{product.description}}</h3>
      </div>

      <div class="info__cart-actions-container">

        <div class="cart-actions-container__cost">
          <p class="cost__label">cost</p>
          <p class="cost__value">${{product.price}}</p>
        </div>

        <div class="cart-actions-container__quantity">
          <p class="quantity__label">quantity</p>

          <div class="quantity__inner">
            <span class="quantity__button"
                  :class="{'hidden': amount === 0 }"
                  @click="decreaseAmount(product.id)">

              <span>-</span>
            </span>

            <p class="quantity__value">{{ amount }}</p>

            <span class="quantity__button"
                  :class="{'hidden': !maxAmount || amount === maxAmount }"
                  @click="increaseAmount(product.id)">

            <span>+</span>
          </span>
          </div>

        </div>
        <button class="cart-actions-container__add-button"
                :class="{'disabled': !maxAmount}"
                @click="addToCart()">

          add to card
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import appIcon from '@/components/app-icon/app-icon.component.vue';
import Store   from '../../store/store';

export default {
  name: 'product-details',
  components: {
    appIcon,
  },
  data() {
    return {
      product: {},
      amount: 0,
      maxAmount: null,
      likes: null,
      numberOfItemsInCart: null,
    };
  },
  methods: {
    increaseAmount() {
      if (this.amount < this.maxAmount) {
        this.amount += 1;
      }
    },
    decreaseAmount() {
      if (this.amount > 0) {
        this.amount -= 1;
      }
    },
    addToCart() {
      this.$store.dispatch('addToCart',
        {
          item: this.product,
          amount: this.numberOfItemsInCart + this.amount,
        });
      this.maxAmount -= this.amount;

      this.numberOfItemsInCart += this.amount;
      this.amount = 0;
    },
    async toggleFavorites() {
      let favorites = [];
      const { products } = this.$store.state;
      const index = products
        .findIndex(product => Number(product.id) === Number(this.$route.params.productId));

      if (this.isFavorite()) {
        this.$store.state.userFavorites
          .forEach((identifier) => {
            if (identifier !== this.product.id) {
              favorites.push(identifier);
            }
          });
        products[ index ].likes -= 1;
        this.likes -= 1;
      } else {
        favorites = [ ...this.$store.state.userFavorites, this.product.id ];
        products[ index ].likes += 1;
        this.likes += 1;
      }

      await this.$store.dispatch('setProducts', products);
      await this.$store.dispatch('setFavorites', favorites);
    },
    isFavorite() {
      return this.$store.state.userFavorites.some(index => index === this.product.id);
    },
  },
  created() {
    this.product = this.$store.state.products
      .find(item => item.id === Number(this.$route.params.productId));

    const productInCart = this.$store.state.checkoutStore.cart
      .find(item => item.id === this.product.id);

    this.numberOfItemsInCart = productInCart ? productInCart.amount : 0;
    this.maxAmount = this.product.quantity - this.numberOfItemsInCart;
    this.likes = this.product.likes;
  },

  async beforeRouteEnter(from, to, next) {
    if (Store.state.products.length === 0) {
      try {
        await Store.dispatch('fetchProducts');
        await Store.dispatch('fetchFavorites');
        await Store.dispatch('getCartItems');
        next();
      } catch (e) {
        throw Error;
      }
    } else {
      next();
    }
  },
};
</script>

<style scoped lang="scss">
.product-details {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 40% auto;


  &__image-container {
    background-color: $white;
    box-shadow: 0 0 20px 0 $box-shadow-color;
    z-index: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0 3rem;


    .image-container {
      &__heart-icon-container {
        position: absolute;
        top: 10rem;
        right: 10rem;
        display: flex;
        z-index: 100;

        .heart-icon-container {
          &__favorites-number {
            font-size: 3rem;
            margin-right: 1rem;
          }

          &__icon {
            width: 4rem;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      &__image {
        margin-top: 50vh;
        transform: translateY(-50%);
        max-height: 50vh;
        max-width: 100%;
        width: auto;
        height: auto;
      }
    }
  }

  &__info {
    background-color: $grey-100;
    padding: 10rem;


    .info {
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
            font-size: 4rem;
            letter-spacing: 0.18rem;
          }

          &__category {
            letter-spacing: 0.45rem;
            color: $grey-300;
            text-transform: uppercase;
            margin-left: 2rem;
            font-size: 1.5rem;
            margin-right: 8rem;
          }
        }
      }

      &__main-content {
        margin-top: 15rem;
        margin-bottom: 5rem;

        .main-content {
          &__product-title {
            text-transform: uppercase;
            font-weight: 300;
            color: $black;
            font-size: 6rem;
            letter-spacing: 0.18rem;
            margin-bottom: 3rem;
          }

          &__product-description {
            max-width: 100rem;
            color: $grey-400;
            letter-spacing: .45rem;
            font-weight: 300;
            line-height: 2em;
          }
        }
      }

      &__cart-actions-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 70rem;

        .cart-actions-container {
          &__cost {
            min-width: 5rem;

            .cost {
              &__label {
                font-size: 2rem;
                font-weight: 300;
                margin-bottom: 1rem;
                text-transform: uppercase;
              }

              &__value {
                font-size: 5rem;
                color: $primary;
                font-weight: bold;
              }
            }
          }

          &__quantity {
            width: fit-content;
            height: 10rem;


            .quantity {
              &__label {
                font-size: 2rem;
                font-weight: 300;
                margin-bottom: 2.5rem;
                text-transform: uppercase;
                align-self: flex-start;
              }

              &__inner {
                display: flex;
                align-self: center;
                align-items: center;
                justify-content: center;
              }

              &__button > span {
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

              &__value {
                font-size: 3rem;
                margin: 0 1rem;
              }
            }
          }

          &__add-button {
            font-size: 2.5rem;
            text-transform: uppercase;
            height: fit-content;
            cursor: pointer;
            background-color: $primary;
            border-radius: 5rem;
            border: none;
            color: $white;
            padding: 1.3rem;
            margin-top: 3rem;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
}

.hidden span {
  opacity: 0;
  cursor: unset !important;
}

.disabled {
  &:hover {
    cursor: not-allowed !important;
  }
}

</style>
