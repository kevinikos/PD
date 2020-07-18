<template>
  <div class="checkout" :class="{'single-grid-area': isCartEmpty}">
    <div v-if="!isCartEmpty"
         class="checkout__cart-items">

      <h1 class="cart-items__title">Your order:</h1>
      <div class="cart-items__list">
        <product-tile v-for="product in cart"
                      :key="product.id"
                      class="single-product-item"
                      :product="product" />

      </div>
      <h2 class="cart-items__total">
        total:
        <span class="cart-items__total--thin-font">

            ${{getTotal()}}
          </span>
      </h2>
    </div>
    <div v-else
         class="checkout__empty-cart">

      <p class="empty-cart__message">Your cart is empty</p>
    </div>
    <form class="checkout__payment-form"
          v-if="!isCartEmpty"
          @submit.prevent="onSubmit">

      <h1 class="payment-form__title">Payment details:</h1>

      <input placeholder="Name"
             v-model="userName"
             type="text"
             class="payment-form__input"
             autocomplete="nope" />

      <input placeholder="Last Name"
             v-model="userLastName"
             type="text"
             class="payment-form__input"
             autocomplete="nope" />

      <input placeholder="E-mail"
             v-model="userEmail"
             type="email"
             class="payment-form__input"
             autocomplete="nope" />

      <input placeholder="Address"
             v-model="userAddress"
             type="text"
             class="payment-form__input"
             autocomplete="nope" />

      <button class="payment-form__button"
              type="submit">

        checkout
      </button>
    </form>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import ProductTile   from './components/checkout-product-tile.component.vue';

export default {
  name: 'checkout',
  components: {
    ProductTile,
  },
  data() {
    return {
      userName: '',
      userLastName: '',
      userEmail: '',
      userAddress: '',
    };
  },
  computed: {
    cart() {
      return this.$store.state.checkoutStore.cart;
    },
    isCartEmpty() {
      return this.$store.state.checkoutStore.cart.length <= 0;
    },
  },
  methods: {
    getTotal() {
      let total = 0;
      this.$store.state.checkoutStore.cart.forEach((item) => {
        total += (parseFloat(item.price) * parseFloat(item.amount));
      });
      return total;
    },
    onSubmit() {
      this.userAddress = '';
      this.userLastName = '';
      this.userEmail = '';
      this.userName = '';
    },
  },
  beforeRouteEnter(to, from, next) {
    if (firebase.auth().currentUser !== null) {
      next();
    } else {
      next('/sign-in');
    }
  },
};
</script>

<style scoped lang="scss">
.checkout {
  padding: 8rem;
  background-color: $grey-100;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__empty-cart {
    display: flex;
    align-items: center;
    justify-content: center;

    .empty-cart {
      &__message {
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

  &__cart-items {
    max-width: fit-content;

    .cart-items {

      &__title {
        font-size: 7.2rem;
        letter-spacing: 1.8px;
        color: $black;
        font-weight: 300;
      }

      &__list {
        margin-top: 10rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 20rem;
        grid-gap: 3rem;
      }

      &__total {
        margin-top: 6rem;
        text-transform: capitalize;
        font-size: 7.2rem;
        letter-spacing: 1.8px;
        color: $black;
        font-weight: normal;

        &--thin-font {
          font-weight: 300;
          font-size: 7.2rem;
          margin-left: 1rem;
        }
      }
    }
  }

  &__payment-form {
    display: flex;
    flex-direction: column;
    max-width: 90rem;
    padding-left: 10rem;

    .payment-form {
      &__title {
        font-size: 7.2rem;
        letter-spacing: 1.8px;
        color: $black;
        font-weight: 300;
        margin-bottom: 10rem;
      }

      &__input {
        height: 6rem;
        min-width: 50rem;
        width: 100%;
        font-size: 3rem;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px black solid;
        margin-bottom: 5rem;
        background-color: transparent;

        &:focus {
          outline: none;
        }

      }

      &__button {
        font-size: 3rem;
        width: 100%;
        cursor: pointer;
        background-color: $primary;
        border-radius: 5rem;
        border: none;
        color: $white;
        padding: 1rem;
        margin-top: 3rem;
        text-transform: uppercase;

        &:focus {
          outline: none;
        }
      }
    }
  }
}

.single-grid-area {
  grid-template-columns: 1fr;
}

@media screen and (min-height: 360px) and (min-width: 200px) and (max-width: 1300px) {
  .checkout {
    grid-template-columns: 1fr;

    &__cart-items {
      margin-right: auto;
      margin-left: auto;
    }

    &__payment-form {
      margin-top: 10rem;
      margin-right: auto;
      margin-left: auto;
      padding: 0;
    }
  }

  .single-product-item {
    width: 70vw;
  }

}
</style>
