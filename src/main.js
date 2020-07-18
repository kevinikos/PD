import Vue           from 'vue';
import * as firebase from 'firebase';
import App           from './App.vue';
import router        from './router';
import store         from './store/store';

Vue.config.productionTip = false;

let app = '';

firebase.initializeApp({
  apiKey: 'AIzaSyBP3Vy3e8OGxBXS1JSuQ9p176Gf5GiuxUo',
  authDomain: 'olios-shop.firebaseapp.com',
  databaseURL: 'https://olios-shop.firebaseio.com',
  projectId: 'olios-shop',
  storageBucket: 'olios-shop.appspot.com',
  messagingSenderId: '558412836547',
  appId: '1:558412836547:web:e49d1a49edc96a322ffc76',
});

router.beforeEach((to, from, next) => {
  store.commit('setCurrentPath', to.path);
  next();
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
