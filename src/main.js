import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import store from './store/index.js'
import Element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$http = axios
Vue.use(Element)
Vue.config.productionTip = false
global.API_PROXY = 'https://bird.ioliu.cn/v1/?url=' 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
