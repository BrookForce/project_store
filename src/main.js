import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5NWs_McrHx6z5l7cwhKAc2Y6RVx81YyA",
  authDomain: "projectstore-9459e.firebaseapp.com",
  projectId: "projectstore-9459e",
  storageBucket: "projectstore-9459e.appspot.com",
  messagingSenderId: "909237399622",
  appId: "1:909237399622:web:c569522b4546d4a3229a47"
};

initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')