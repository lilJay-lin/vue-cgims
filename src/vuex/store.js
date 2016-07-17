/**
 * Created by liljay on 2016/7/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import slider from './components/slider'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    slider
  }
})
