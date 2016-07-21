/**
 * Created by linxiaojie on 2016/7/19.
 */
import {RECEIVE_USE, CHECK_ALL_USER, CHECK_USER, DELETE_USER} from 'my_vuex/mutations/user'
const state = {
  searchKeyword: '',
  checkAll: false,
  details: {},
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
  }
}

export default {
  state,
  mutations
}
