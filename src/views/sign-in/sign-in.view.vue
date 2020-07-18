<template>
  <div class="sign-in">
    <form @submit.prevent="signIn"
          class="sign-in__form">

      <label class="sign-in__label"
             for="email">

        Mail:
      </label>
      <input placeholder="Enter an email"
             v-model="email"
             id="email"
             type="email"
             class="sign-in__input"
             autocomplete="off" />

      <label class="sign-in__label"
             for="password">

        Password:
      </label>
      <input placeholder="Enter a password"
             v-model="password"
             id="password"
             type="password"
             class="sign-in__input"
             autocomplete="off">

      <button class="sign-in__button"
              type="submit">

        Sign in
      </button>
    </form>

    <router-link to="/sign-up"
                 class="sign-in__link">

      You don't have an account yet? Create one!
    </router-link>

    <p class="sign-in__error-message">{{errorMsg}}</p>

  </div>
</template>

<script>

export default {
  name: 'sign-in.view',
  components: {},
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch('signUserIn', {
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    errorMsg() {
      return this.$store.state.loginStore.errorMsg;
    },
  },
  created() {
    this.$store.commit('setErrorMsg', '');
  },
};
</script>

<style scoped lang="scss">

.sign-in {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $grey-100;

  &__form {
    display: flex;
    flex-direction: column;
    max-width: 100rem;
  }

  &__label {
    font-size: 4rem;
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

    &:focus {
      outline: none;
    }
  }

  &__link {
    font-size: 3rem;
    color: $black;
    text-decoration: none;
    margin-top: 6rem;

    &:hover {
      color: $primary;
      text-decoration: underline;
    }
  }

  &__error-message {
    font-size: 3rem;
    color: red;
    margin-top: 1rem;
    min-height: 8rem;
    max-width: 80rem;
    text-align: center;
  }
}

</style>
