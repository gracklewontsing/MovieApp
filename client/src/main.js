import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSwal from 'vue-swal';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

const base = axios.create({
  baseURL: "http://localhost:8080"
});

//Vue.use(Moment);
Vue.prototype.$http = base;
Vue.use(VueSwal);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.prototype.moment = moment


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//