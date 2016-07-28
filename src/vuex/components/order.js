/**
 * Created by linxiaojie on 2016/7/19.
 */
import {RECEIVE_ORDER, CHECK_ALL_ORDER, CHECK_ORDER, DELETE_ORDER, RECEIVE_ORDER_DETAIL,
  DELETE_ORDER_REL_WORKER, ADD_ORDER_REL_WORKER, SET_ORDER_MODE, UPDATE_ORDER_DESCRIPTION} from 'my_vuex/mutations/order'
const state = {
  ui: {
    mode: 'query'
  },
  checkAll: false,
  detail: {
    workers: []
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
  [RECEIVE_ORDER]: (state, {list, pageInfo}) => {
    state.list = list
    state.pageInfo = pageInfo
  },
  [CHECK_ALL_ORDER]: (state, checked) => {
    state.checkAll = checked
    state.list = state.list.map((order) => {
      order.checked = checked
      return order
    })
  },
  [CHECK_ORDER]: (state, {checked, id}) => {
    let idx = findIndex(state.list, {id})
    if (~idx) {
      let order = state.list[idx]
      order.checked = checked
      state.list[idx] = order
    }
  },
  [DELETE_ORDER]: (state, ids) => {
    state.list = state.list.filter((order) => {
      return ids.indexOf(order.id) === -1
    })
  },
  [RECEIVE_ORDER_DETAIL]: (state, order) => {
    state.detail = order
  },
  [DELETE_ORDER_REL_WORKER]: (state, workerId) => {
    let workers = state.detail.workers
    let idx = findIndex(workers, {id: workerId})
    ~idx && workers.splice(idx, 1)
  },
  [ADD_ORDER_REL_WORKER]: (state, permission) => {
    let workers = state.detail.workers
    let idx = findIndex(workers, {id: permission.id})
    idx === -1 && workers.push(permission)
  },
  [SET_ORDER_MODE]: (state, type) => {
    state.ui.mode = type
  },
  [UPDATE_ORDER_DESCRIPTION]: (state, {description, idx}) => {
    state.list[idx].description = description
  }
  /*
   [SAVE_ORDER]: (state, newRole) => {
   let orders = state.list
   let idx = findIndex(orders, {id: newRole.id})
   if (~idx) {
   let order = clone(orders[idx])
   forEach(newRole, (val, key) => {
   order[key] = val
   })
   orders.splice(idx, 1, order)
   }
   }
   */
}

export default {
  state,
  mutations
}
