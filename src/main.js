// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Ajax from './util/ajax'
import router from './router'

Vue.config.productionTip = false

Vue.use(Ajax, {
  baseURL: 'http://localhost:9898/'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
