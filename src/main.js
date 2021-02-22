import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import less from 'less'
// Vue.use(less)



import fastclick from 'fastclick'


// import './common/stylus'
fastclick.attach(document.body)



axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
