import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './infrastructure/router'
import store from './infrastructure/store'
import App from './router_views/App'
import 'bootstrap/dist/js/bootstrap'
import './styles/style.scss'

import setLocales from './infrastructure/i18n'
setLocales(Vue)

// setup vuex-router-sync so that route state are sync with vuex
import { sync } from 'vuex-router-sync'
sync(store, router)

import { setNetworkErrorHandler } from './infrastructure/api_client'
setNetworkErrorHandler(function(error){
  console.log('NETWORK ERROR: ', error)
  console.log(Vue['t']('alert.network_error'))
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
