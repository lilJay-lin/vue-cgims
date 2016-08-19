import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import config from './router/config'
import {setRouter} from './router/routerHelper'

Vue.use(VueRouter)

var router = new VueRouter()

config(router)
setRouter(router)
/* eslint-disable no-new */
/*
new Vue({
  el: 'body',
  store,
  components: { App }
})
*/
/*
document.cookie = 'permissionCodes=analysisManager, userManager, orderManager, orderView, userOrderManager, workmanManager, analysisManager'
*/
router.start(App, 'body')
