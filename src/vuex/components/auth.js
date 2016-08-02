/**
 * Created by linxiaojie on 2016/7/19.
 */
import {AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_PERMISSION} from 'my_vuex/mutations/mutation-types'
let forEach = require('lodash/forEach')
const state = {
  login: false,
  name: '',
  permission: {
    roleManager: false,
    userManager: false,
    orderManager: false,
    orderView: false,
    userOrderManager: false,
    workmanManager: false,
    analysisManager: false
  }
}

const mutations = {
  [AUTH_LOGIN_SUCCESS]: (state, obj) => {
    forEach(obj, (val, key) => {
      state[key] = val
    })
  },
  [AUTH_PERMISSION]: (state, obj) => {
    forEach(obj, (val, key) => {
      state.permission[key] = val
    })
  },
  [AUTH_LOGOUT]: (state) => {
    forEach(state.permission, (val, key) => {
      state[key] = false
    })
    state.name = ''
  }
}

export default {
  state,
  mutations
}
