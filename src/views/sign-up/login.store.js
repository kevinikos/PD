import * as firebase from 'firebase';
import router        from '../../router';

export default {
  state: {
    errorMsg: '',
    isLogged: false,
  },
  actions: {
    signUserUp({ commit }, userCredentials) {
      firebase.auth()
        .createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
        .then(() => router.push('/checkout'))
        .then(() => commit('setIsLogged', true))
        .catch(e => commit('setErrorMsg', e.message));
    },
    signUserIn({ commit }, userCredentials) {
      firebase.auth().signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
        .then(() => router.push('/checkout'))
        .then(() => commit('setIsLogged', true))
        .catch(e => commit('setErrorMsg', e.message));
    },
    signUserOff({ commit }) {
      firebase.auth().signOut()
        .then(() => commit('setIsLogged', false))
        .catch(e => commit('setErrorMsg', e.message));
    },
  },
  mutations: {
    setErrorMsg(state, msg) {
      state.errorMsg = msg;
    },
    setIsLogged(state, payload) {
      state.isLogged = payload;
    },
  },
};
