/**
 * Created by linxiaojie on 2016/7/19.
 */
import {RECEIVE_WORKER, CHECK_ALL_WORKER, CHECK_WORKER, DELETE_WORKER, RECEIVE_WORKER_DETAIL, SET_WORKER_MODE, SET_WORKER} from 'my_vuex/mutations/worker'
const state = {
  ui: {
    mode: 'query'
  },
  search: {
    searchKeyword: '',
    region: '',
    server_type: '服务'
  },
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
const findIndex = require('lodash/findIndex')
const forEach = require('lodash/forEach')
const mutations = {
  [RECEIVE_WORKER]: (state, {list, pageInfo, search}) => {
    state.search = search
    state.list = list
    state.pageInfo = pageInfo
  },
  [CHECK_ALL_WORKER]: (state, checked) => {
    state.checkAll = checked
    state.list = state.list.map((worker) => {
      worker.checked = checked
      return worker
    })
  },
  [CHECK_WORKER]: (state, {checked, id}) => {
    let idx = findIndex(state.list, {id})
    if (~idx) {
      let worker = state.list[idx]
      worker.checked = checked
      state.list[idx] = worker
    }
  },
  [DELETE_WORKER]: (state, ids) => {
    state.list = state.list.filter((worker) => {
      return ids.indexOf(worker.id) === -1
    })
  },
  [RECEIVE_WORKER_DETAIL]: (state, worker) => {
    state.detail = worker
  },
  [SET_WORKER_MODE]: (state, type) => {
    state.ui.mode = type
  },
  [SET_WORKER]: (state, map) => {
    forEach(map, (val, key) => {
      state.detail[key] = val
    })
  }
}

export default {
  state,
  mutations
}
