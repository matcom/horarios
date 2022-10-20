import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';
import store from './store';
import router from './router';
import './assets/vendor/jquery/jquery.min';
import './assets/vendor/bootstrap/js/bootstrap.bundle.min';
import './assets/vendor/jquery-easing/jquery.easing.min';
import './assets/js/sb-admin-2.min';
import vSelect from 'vue-select'


Vue.config.productionTip = false;
Vue.component('v-select', vSelect)

new Vue({
  store,
  router,
  render: h => h(App),
})
  .$mount('#app');

Vue.use(Notifications);
