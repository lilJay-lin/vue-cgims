/**
 * Created by linxiaojie on 2016/7/19.
 */
import {RECEIVE_ROLE, CHECK_ALL_ROLE, CHECK_ROLE, DELETE_ROLE, RECEIVE_ROLE_DETAIL,
  DELETE_ROLE_REL_PERMISSION, ADD_ROLE_REL_PERMISSION, SET_ROLE_MODE} from 'my_vuex/mutations/role'
const state = {
  ui: {
    mode: 'query'
  },
  searchKeyword: '',
  checkAll: false,
  detail: {
    permissions: []
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
  [RECEIVE_ROLE]: (state, {list, pageInfo, searchKeyword}) => {
    state.searchKeyword = searchKeyword
    state.list = list
    state.pageInfo = pageInfo
  },
  [CHECK_ALL_ROLE]: (state, checked) => {
    state.checkAll = checked
    state.list = state.list.map((role) => {
      role.checked = checked
      return role
    })
  },
  [CHECK_ROLE]: (state, {checked, id}) => {
    let idx = findIndex(state.list, {id})
    if (~idx) {
      let role = state.list[idx]
      role.checked = checked
      state.list[idx] = role
    }
  },
  [DELETE_ROLE]: (state, ids) => {
    state.list = state.list.filter((role) => {
      return ids.indexOf(role.id) === -1
    })
  },
  [RECEIVE_ROLE_DETAIL]: (state, role) => {
    state.detail = role
  },
  [DELETE_ROLE_REL_PERMISSION]: (state, permissoinId) => {
    let permissions = state.detail.permissions
    let idx = findIndex(permissions, {id: permissoinId})
    ~idx && permissions.splice(idx, 1)
  },
  [ADD_ROLE_REL_PERMISSION]: (state, permission) => {
    let permissions = state.detail.permissions
    let idx = findIndex(permissions, {id: permission.id})
    idx === -1 && permissions.push(permission)
  },
  [SET_ROLE_MODE]: (state, type) => {
    state.ui.mode = type
  }
/*
[SAVE_ROLE]: (state, newRole) => {
    let roles = state.list
    let idx = findIndex(roles, {id: newRole.id})
    if (~idx) {
      let role = clone(roles[idx])
      forEach(newRole, (val, key) => {
        role[key] = val
      })
      roles.splice(idx, 1, role)
    }
  }
  */
}

export default {
  state,
  mutations
}
