<template>
  <div class="sign-up">
    <form @submit.prevent="signUser"
          @input="checkPasswordEquality"
          class="sign-up__form">

      <label class="sign-up__label">Mail: </label>
      <input placeholder="Enter an email"
             v-model="email"
             type="email"
             class="sign-up__input sign-up__input--high-mb "
             autocomplete="off">

      <label class="sign-up__label">Password: </label>
      <input placeholder="Enter a password"
             v-model="password"
             type="password"
             class="sign-up__input"
             autocomplete="off">

      <p class="warning-message">
        {{!correctPasswordLength && password.length > 0 ? 'Password is to short!' : ''}}
      </p>

      <label class="sign-up__label">Confirm Password: </label>
      <input placeholder="Confirm the password"
             v-model="confirmPassword"
             type="password"
             class="sign-up__input"
             autocomplete="off">

      <p class="warning-message">
        {{correctPasswordLength && !equalPasswords
            && confirmPassword.length > 0 ? 'Passwords are not equal!' : ''}}
      </p>

      <button type="submit" class="sign-up__btn">Sign up</button>
    </form>

    <p class="sign-up__error-message">{{errorMsg}}</p>
  </div>
</template>

<script>

export default {
  name: 'login',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      equalPasswords: false,
    };
  },
  computed: {
    correctPasswordLength() {
      return this.password.length >= 6;
    },
    errorMsg() {
      return this.$store.state.loginStore.errorMsg;
    },
  },
  methods: {
    checkPasswordEquality() {
      this.equalPasswords = this.password === this.confirmPassword;
    },
    signUser() {
      if (this.equalPasswords && this.correctPasswordLength) {
        this.$store.dispatch('signUserUp', {
          email: this.email,
          password: this.password,
        });
      } else {
        this.$store.commit('setErrorMsg',
          'Provided data is not correct.');
      }
    },
  },
  created() {
    this.$store.commit('setErrorMsg', '');
  },
};
</script>

<style scoped lang="scss">

.sign-up {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $grey-100;


  &__form {
    display: flex;
    flex-direction: column;
    max-width: 100rem;
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
    margin-bottom: 2rem;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &--high-mb {
      margin-bottom: 5rem;
    }
  }

  &__label {
    font-size: 4rem;
  }

  &__btn {
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

  &__error-message {
    font-size: 3rem;
    color: red;
    margin-top: 2rem;
    min-height: 8rem;
    max-width: 80rem;
    text-align: center;
  }

  .warning-message {
    font-size: 2.5rem;
    color: red;
    min-height: 3rem;
  }
}

</style>
