<template>
  <div class="app">
    <navigation />
    <router-view :key="this.$route.fullPath" />
    <app-menu />
    <login-status :key="`${this.$route.fullPath}_status`" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as firebase  from 'firebase';
import navigation     from '@/components/navigation/navigation.component.vue';
import appMenu        from '@/components/app-menu/app-menu.component.vue';
import loginStatus    from '@/components/login-status/login-status.component.vue';

export default {
  name: 'App',
  components: {
    appMenu,
    navigation,
    loginStatus,
  },
  methods: {
    ...mapActions(
      [
        'fetchCategories',
        'fetchProducts',
        'fetchFavorites',
        'getCartItems',
      ],
    ),
  },
  async created() {
    await this.fetchCategories();
    await this.fetchProducts();
    await this.fetchFavorites();
    await this.getCartItems();
    this.$store.commit('setIsLogged', firebase.auth().currentUser !== null);
  },
};
</script>

<style lang="scss">

.app {
  width: auto;
  display: grid;
  grid-template-columns: 7.7rem auto;
  grid-template-rows: auto;
  position: relative;
}

html {
  font-size: 0.9vmin;
}

* {
  padding: 0;
  margin: 0;
  font-size: 1.8rem;
  box-sizing: border-box;
  font-family: Lato;
}

</style>
