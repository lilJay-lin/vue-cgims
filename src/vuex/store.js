/**
 * Created by liljay on 2016/7/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import slider from 'my_vuex/components/slider'
import auth from 'my_vuex/components/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    slider,
    auth
  },
  plugins: [createLogger()]
})
