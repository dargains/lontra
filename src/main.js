import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fb from './firebase'
import './assets/reset.css'

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
