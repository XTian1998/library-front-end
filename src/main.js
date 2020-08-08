import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/assets/css/global.css'

Vue.filter('dateFormat', function(originVal) {
  let dt = new Date(originVal)

  let y = dt.getFullYear()
  let m = (dt.getMonth() + 1 + '').padStart(2, '0')
  let d = (dt.getDate() + '').padStart(2, '0')
  let hh = (dt.getHours() + '').padStart(2, '0')
  let mm = (dt.getMinutes() + '').padStart(2, '0')
  let ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
