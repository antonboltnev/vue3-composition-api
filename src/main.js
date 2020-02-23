import Vue from 'vue'
import App from './App.vue'
import store from "./vuex/store"
import router from "./router/router"
import './assets/styles.scss'
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
