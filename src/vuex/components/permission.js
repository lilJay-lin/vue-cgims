/**
 * Created by linxiaojie on 2016/7/19.
 */
import {RECEIVE_PERMISSION} from 'my_vuex/mutations/permission'
/*
import {RECEIVE_PERMISSION, CHECK_ALL_PERMISSION, CHECK_PERMISSION, DELETE_PERMISSION, RECEIVE_PERMISSION_DETAIL} from 'my_vuex/mutations/permission'
*/
const state = {
  searchKeyword: '',
  checkAll: false,
  detail: {},
  list: [],
  pageInfo: {
    curPage: 1,
    pageSize: 10,
    totalPage: 0,
    total: 0
  }
}
/*
const findIndex = require('lodash/findIndex')
*/
const mutations = {
  [RECEIVE_PERMISSION]: (state, {list, pageInfo, searchKeyword}) => {
    state.searchKeyword = searchKeyword
    state.list = list
    state.pageInfo = pageInfo
    console.log(list)
  }
  /*
  [CHECK_ALL_PERMISSION]: (state, checked) => {
    state.checkAll = checked
    state.list = state.list.map((permission) => {
      permission.checked = checked
      return permission
    })
  },
  [CHECK_PERMISSION]: (state, {checked, id}) => {
    let idx = findIndex(state.list, {id})
    if (~idx) {
      let permission = state.list[idx]
      permission.checked = checked
      state.list[idx] = permission
    }
  },
  [DELETE_PERMISSION]: (state, ids) => {
    state.list = state.list.filter((permission) => {
      return ids.indexOf(permission.id) === -1
    })
  },
  [RECEIVE_PERMISSION_DETAIL]: (state, permission) => {
    state.detail = permission
  }
  */
}

export default {
  state,
  mutations
}
