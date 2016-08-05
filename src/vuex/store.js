/**
 * Created by liljay on 2016/7/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import slider from 'my_vuex/components/slider'
import auth from 'my_vuex/components/auth'
import user from 'my_vuex/components/user'
import role from 'my_vuex/components/role'
import worker from 'my_vuex/components/worker'
import order from 'my_vuex/components/order'
import region from 'my_vuex/components/region'
import permission from 'my_vuex/components/permission'
import statistic from 'my_vuex/components/statistic'
import admin from 'my_vuex/components/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    slider,
    auth,
    user,
    role,
    permission,
    worker,
    region,
    order,
    statistic,
    admin
  },
  plugins: [createLogger()]
})
