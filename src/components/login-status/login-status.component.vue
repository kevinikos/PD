<template>
  <p class="login-status">
    {{this.$store.state.loginStore.isLogged ? `Logged as: ${userEmail}` : ''}}
  </p>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'login-status.component',
  computed: {
    userEmail() {
      if (firebase.auth().currentUser !== null) {
        return firebase.auth().currentUser.email;
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.login-status {
  position: fixed;
  top: 3rem;
  right: 3rem;
  color: $grey-400;
}
</style>
