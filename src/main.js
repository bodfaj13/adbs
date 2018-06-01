// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from '@/store/store'
// import {ClientTable} from 'vue-tables-2'
import Datatable from 'vue2-datatable-component'

Vue.config.productionTip = false
// global filter
Vue.filter('toLowercase', function (value) {
  return value.toLowerCase()
})
// Vue.use(ClientTable)
Vue.use(Datatable)

sync(store, router)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
