import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import config from './router/config'

Vue.use(VueRouter)

var router = new VueRouter()

config(router)

/* eslint-disable no-new */
/*
new Vue({
  el: 'body',
  store,
  components: { App }
})
*/

router.start(App, 'body')
