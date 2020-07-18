<template>
  <div class="navigation">
    <router-link to="/"
                 class="navigation__logo router-link">

      <img class="navigation__logo__image"
           src='../../assets/img/Kształt 1.png'
           alt="logo" />

    </router-link>
    <router-link to="/"
                 class="router-link navigation__link">

      <app-icon icon="home"
                :prop-class="currentPath === '/' ? 'navigation__link--active' : ''" />

    </router-link>
    <router-link to="/checkout"
                 class="router-link navigation__link navigation__link--position-relative">

      <app-icon icon="basket"
                :prop-class="currentPath === '/checkout' ? 'navigation__link--active' : ''" />

      <div v-show="numberOfCartItems > 0"
           class="navigation__link__cart-badge__wrapper">

        <p class="navigation__link__cart-badge">{{numberOfCartItems}}</p>
      </div>
    </router-link>
    <router-link to="/search"
                 class="router-link navigation__link">

      <app-icon icon="search"
                :prop-class="currentPath === '/search' ? 'navigation__link--active' : ''" />

    </router-link>

    <router-link v-if="!this.$store.state.loginStore.isLogged"
                 to="/sign-in"
                 class="router-link navigation__link">

      <app-icon icon="login"
                :prop-class="currentPath === '/sign-in' ? 'navigation__link--active' : ''" />

    </router-link>

    <div v-else
         @click="signOut"
         class="navigation__link">

      <router-link to="/"
                   class="router-link">

        <app-icon icon="logout"
                  prop-class="navigation__link__login-item" />

      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppIcon      from '../app-icon/app-icon.component.vue';

export default {
  name: 'navigation',
  components: {
    AppIcon,
  },
  computed: {
    ...mapState([ 'currentPath' ]),
    numberOfCartItems() {
      let numberOfItems = 0;
      this.$store.state.checkoutStore.cart.forEach((item) => {
        numberOfItems += parseFloat(item.amount);
      });
      return numberOfItems;
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('signUserOff');
    },
  },
};
</script>

<style scoped lang="scss">

.navigation {
  display: flex;
  flex-direction: column;
  justify-items: start;
  background-color: $white;
  box-shadow: 0 0 10px 0 $box-shadow-color;
  z-index: 100;
  min-height: 100vh;

  &__logo {
    align-self: center;
    margin-top: 3rem;
    margin-bottom: 12rem;
    height: auto;

    &::after {
      content: '.';
      margin-left: -5px;
      font-size: 3rem;
      color: $blue-200;
    }

    &__image {
      width: 4.2rem;
      height: 4.2rem;
    }
  }

  &__link {
    height: auto;
    align-self: center;
    margin: 5rem 0;

    &__login-item {
      height: 2.8rem;

      &:hover {
        fill: $primary;
      }
    }

    &--position-relative {
      position: relative;
    }

    &--active {
      fill: $primary;
    }

    &__cart-badge {
      color: $white;
      font-weight: bold;

      &__wrapper {
        position: absolute;
        top: -2rem;
        right: -2rem;
        border: 1px $primary solid;
        border-radius: 2rem;
        width: 2.7rem;
        height: 2.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $primary;
      }
    }

    &__icon {
      width: 2.6rem;
      height: 2.6rem;

      &:hover {
        fill: $primary;
      }
    }
  }

  .active {
    color: $primary;
  }
}

.router-link {
  text-decoration: none;
}
</style>
