<template>
  <div class="app-menu"
       :class="{'app-menu--show': isMenuVisible}">

    <div @click="toggleMenu"
         class="app-menu__button">

      <div v-if="!isMenuVisible">
        <app-icon icon="menu-burger"
                  prop-class="app-menu__icon" />

      </div>
      <div v-else>
        <app-icon icon="menu-close"
                  prop-class="app-menu__icon" />

      </div>
    </div>
    <div class="app-menu__content">

      <router-link :to="`/products/${category.value}`"
                   v-for="category in categories"
                   :key="category.value"
                   class="content__item">

        {{category.value}}
      </router-link>

      <router-link to="/products"
                   class="content__item content__item--show-all-link">

        <p>show all products</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppIcon      from '../app-icon/app-icon.component.vue';

export default {
  name: 'app-menu',
  components: {
    AppIcon,
  },
  data() {
    return {
      isMenuVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
  computed: {
    ...mapState([ 'categories' ]),
  },
};

</script>

<style scoped lang="scss">

.app-menu {
  position: fixed;
  right: -$side-menu-width;
  top: 0;
  width: $side-menu-width;
  max-width: 50rem;
  background-color: $white;
  z-index: 5;
  transition: all ease-in-out 0.3s;

  &__button {
    position: fixed;
    right: 5.7rem;
    top: 8.7rem;
    background-color: $white;
    width: 8rem;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5rem;
    cursor: pointer;
    box-shadow: 0 0 2.5rem 0 $box-shadow-color;
    z-index: 7;

    &:hover {
      background-color: darken($white, 8);
    }
  }

  &__icon {
    fill: $primary;
    width: 4rem;
    height: 3rem;
  }

  &__content {
    padding: 0 3rem;
    height: 100vh;
    background-color: $white;
    box-shadow: 0 0 2.5rem 0 $box-shadow-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 4.5px;
    position: relative;

    .content {


      &__item {
        margin: 3rem 0;
        color: $grey-300;
        text-decoration: none;
        position: relative;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;

        &:after {
          position: absolute;
          bottom: -1rem;
          left: 0;
          right: 0;
          content: '';
          width: 0;
          height: 0;
          border: 1px solid $primary;
          transform: translateX(-100%);
          opacity: 0;

        }

        &--show-all-link {
          text-align: center;
          position: absolute;
          bottom: 2%;
          left: 50%;
          transform: translateX(-50%);

          &:hover:after {
            width: 96% !important;
          }
        }

        &:hover {
          color: $primary;

          &:after {
            opacity: 1;
            width: 92%;
            transform: translateX(1%);
            transition: width .2s ease;
          }
        }

        &--underline {
          margin-left: 5rem;
          margin-top: 1rem;
          width: 16rem;
          height: 1px;
          border: $primary 1px solid;
        }
      }
    }
  }

  &--show {
    transform: translateX(-$side-menu-width);
  }
}
</style>
