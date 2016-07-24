/**
 * Created by linxiaojie on 2016/7/19.
 */
import {RECEIVE_USE, CHECK_ALL_USER, CHECK_USER, DELETE_USER, RECEIVE_USER_DETAIL,
  DELETE_USER_REL_ROLE, ADD_USER_REL_ROLE, DELETE_USER_REL_SLAVE, ADD_USER_REL_SLAVE, SET_USER_MODE} from 'my_vuex/mutations/user'
const state = {
  ui: {
    mode: 'query'
  },
  searchKeyword: '',
  checkAll: false,
  detail: {
    roles: [],
    slaves: []
  },
  list: [],
  pageInfo: {
    curPage: 1,
    pageSize: 10,
    totalPage: 0,
    total: 0
  }
}
const findIndex = require('lodash/findIndex')
const mutations = {
  [RECEIVE_USE]: (state, {list, pageInfo, searchKeyword}) => {
    state.searchKeyword = searchKeyword
    state.list = list
    state.pageInfo = pageInfo
  },
  [CHECK_ALL_USER]: (state, checked) => {
    state.checkAll = checked
    state.list = state.list.map((user) => {
      user.checked = checked
      return user
    })
  },
  [CHECK_USER]: (state, {checked, id}) => {
    let idx = findIndex(state.list, {id})
    if (~idx) {
      let user = state.list[idx]
      user.checked = checked
      state.list[idx] = user
    }
  },
  [DELETE_USER]: (state, ids) => {
    state.list = state.list.filter((user) => {
      return ids.indexOf(user.id) === -1
    })
  },
  [RECEIVE_USER_DETAIL]: (state, user) => {
    state.detail = user
  },
  [DELETE_USER_REL_ROLE]: (state, roleId) => {
    let roles = state.detail.roles
    let idx = findIndex(roles, {id: roleId})
    ~idx && roles.splice(idx, 1)
  },
  [ADD_USER_REL_ROLE]: (state, role) => {
    let roles = state.detail.roles
    let idx = findIndex(roles, {id: role.id})
    idx === -1 && roles.push(role)
  },
  [DELETE_USER_REL_SLAVE]: (state, slaveId) => {
    let slaves = state.detail.slaves
    let idx = findIndex(slaves, {id: slaveId})
    ~idx && slaves.splice(idx, 1)
  },
  [ADD_USER_REL_SLAVE]: (state, slave) => {
    let slaves = state.detail.slaves
    let idx = findIndex(slaves, {id: slave.id})
    idx === -1 && slaves.push(slave)
  },
  [SET_USER_MODE]: (state, type) => {
    state.ui.mode = type
  }
}

export default {
  state,
  mutations
}
