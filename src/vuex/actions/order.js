/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_ORDER, CHECK_ALL_ORDER, CHECK_ORDER, DELETE_ORDER, RECEIVE_ORDER_DETAIL, SET_ORDER_PERSONAL, SET_ORDER_MODE, UPDATE_ORDER_DESCRIPTION, SET_ORDER} from 'my_vuex/mutations/order'
import {getBaseUrl} from 'my_vuex/getters/order'
import {trim} from 'src/util/util'
import {toggleDialog} from 'my_vuex/actions/actions'
let forEach = require('lodash/forEach')
let clone = require('lodash/cloneDeep')
/*
 * 获取订单列表
 * */
export const searchOrder = ({dispatch, state}, {search = {
  searchKeyword: '',
  orderStatus: '',
  serviceType: '',
  creatorId: '',
  beginTime: '',
  endTime: ''
}, curPage = 1}) => {
  let url = getBaseUrl(state) + '?searchKeyword=' + window.encodeURIComponent(search.searchKeyword) +
    '&orderStatus=' + window.encodeURIComponent(search.orderStatus) +
    '&serviceType=' + window.encodeURIComponent(search.serviceType) +
    '&creatorId=' + window.encodeURIComponent(search.creatorId) +
    '&beginTime=' + window.encodeURIComponent(search.beginTime) +
    '&endTime=' + window.encodeURIComponent(search.endTime) +
    '&curPage=' + curPage
  return Server.request({
    url,
    method: 'get'
  }).then((res) => {
    let result = res.result
    let list = result.datas.map((order) => {
      order.checked = false
      return order
    })
    dispatch(RECEIVE_ORDER, {
      list,
      pageInfo: {
        curPage: parseInt(result.curPage, 10),
        pageSize: parseInt(result.pageSize, 10),
        totalPage: parseInt(result.totalPage, 10),
        total: parseInt(result.total, 10)
      }
    })
  })
}
/*
 * 获取指定订单
 * */
const getImages = (str) => {
  return str ? str.split(',') : []
}
export const showOrderDetail = ({dispatch, state}, id) => {
  let url = getBaseUrl(state) + '/' + id
  return Server.request({
    method: 'get',
    url
  }).then((res) => {
    let order = res.result
    order.repairImgs = getImages(order.repairImgs)
    order.logisticsImgs = getImages(order.logisticsImgs)
    order.productImgs = getImages(order.productImgs)
    order.isChecked = order.isChecked && parseInt(order.isChecked)
    dispatch(RECEIVE_ORDER_DETAIL, res.result)
  })
}
export const clearOrderDetail = ({dispatch}) => {
  dispatch(RECEIVE_ORDER_DETAIL, {
    repairImgs: [],
    logisticsImgs: [],
    productImgs: [],
    workman: {}
  })
}

/*
 * 选择订单
 * */
export const checkOrder = ({dispatch}, checked, id) => {
  if (id === '') {
    dispatch(CHECK_ALL_ORDER, checked)
  } else {
    dispatch(CHECK_ORDER, {checked, id})
  }
}

/*
 * 删除订单
 * */
export const dealOrder = ({state, dispatch}, {id, action, orderStatus}) => {
  let url = getBaseUrl(state) + '/batch'
  let ids = []
  let orders = state.order
  let data = {
    action
  }
  if (id === undefined) {
    orders.list.forEach((order) => {
      if (order.checked) {
        ids.push(order.id)
      }
    })
  } else {
    ids.push(id)
  }
  if (action === 'delete') {
    dispatch(DELETE_ORDER, ids)
  } else {
    data.orderStatus = window.encodeURIComponent(orderStatus)
  }
  data.ids = ids.join(',')
  Server.request({
    url,
    method: 'post',
    data
  }).then((res) => {
    searchOrder({dispatch}, {searchKeyword: orders.searchKeyword, curPage: orders.pageInfo.curPage})
  })
}

/*
* 保存师傅
* */
export const saveOrder = ({state, dispatch}) => {
  let newOrder = clone(state.order.detail) || {}
  let url = getBaseUrl(state) + (newOrder.id ? '/' + newOrder.id : '')
  forEach(['repairImgs', 'logisticsImgs', 'productImgs'], (key) => {
    newOrder[key] = newOrder[key].join(',')
  })
  delete newOrder.workman
  trim(newOrder)
  return Server.request({
    method: 'post',
    url,
    data: newOrder
  }).then(() => {
    toggleDialog({state, dispatch}, {
      show: true,
      content: '订单保存成功'
    })
  })
}

export const setOrderMode = ({dispatch}, type) => {
  dispatch(SET_ORDER_MODE, type || 'query')
}

export const setOrderPersonal = ({dispatch}, personal) => {
  dispatch(SET_ORDER_PERSONAL, personal)
}

export const updateOrderComment = ({dispatch, state}, {id, description}) => {
  let orders = state.order.list
  forEach(orders, (order, idx) => {
    if (order.id === id) {
      let newOrder = clone(order)
      newOrder.description = description
      saveOrder({dispatch, state}, newOrder).then((res) => {
        dispatch(UPDATE_ORDER_DESCRIPTION, {idx, description})
      })
    }
  })
}

/*
 * 设置师傅内容
 * */
export const setOrder = ({state, dispatch}, map) => {
  dispatch(SET_ORDER, map)
}
export const dealOrderImage = ({state, dispatch}, {key, src, type}) => {
  let arr = clone(state.order.detail[key] || [])
  console.log(arr)
  if (type === 'del') {
    arr.splice(src, 1)
  } else {
    arr.push(src)
  }
  let obj = {}
  obj[key] = arr
  dispatch(SET_ORDER, obj)
}
