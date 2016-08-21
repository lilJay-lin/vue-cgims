/**
 * Created by linxiaojie on 2016/7/19.
 */
import {AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_PERMISSION, AUTH_SLAVES} from 'my_vuex/mutations/mutation-types'
let forEach = require('lodash/forEach')
const state = {
  login: false,
  name: '',
  id: '',
  slaves: [],
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
  [AUTH_SLAVES]: (state, slaves) => {
    state.slaves = slaves
  },
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
    state.id = ''
    state.name = ''
    state.login = false
    state.slaves = []
    forEach(state.permission, (val, key) => {
      state.permission[key] = false
    })
  }
}

export default {
  state,
  mutations
}
