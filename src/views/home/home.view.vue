<template>
  <div class="home">
    <div class="home__header">
      <h1 class="header__brand">olios</h1>
      <h3 class="header__description">
        newest furniture shop
      </h3>
      <s-button class="header__button"
                @click.native="onMoreButtonClick">

        view more
      </s-button>
    </div>
  </div>
</template>

<script>
import SButton from '@/components/s-button/s-button.component.vue';

export default {
  name: 'home',
  components: {
    SButton,
  },
  methods: {
    onMoreButtonClick() {
      this.$router.push({ path: 'products' });
    },
  },
};
</script>

<style scoped
       lang="scss">

.home {
  height: 100vh;

  &::after {
    content: '';
    background: url("../../assets/img/photo-1449247709967-d4461a6a6103.png");
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: fixed;
    z-index: -1;
  }

  &__header {
    text-transform: uppercase;
    margin-top: 8rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .header {

    &__brand {
      font-weight: 200;
      font-size: 22rem;
      letter-spacing: 5.5px;
      user-select: none;
    }

    &__description {
      font-weight: 300;
      letter-spacing: 0.9px;
      font-size: 3.6rem;
      user-select: none;
    }

    &__button {
      margin-top: 5rem;
      width: 25rem;
      user-select: none;

      &:focus {
        outline: none;
      }
    }
  }
}

</style>
