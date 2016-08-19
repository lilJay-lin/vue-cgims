/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_ORDER, CHECK_ALL_ORDER, CHECK_ORDER, DELETE_ORDER, RECEIVE_ORDER_DETAIL, SET_ORDER_PERSONAL, SET_ORDER_MODE, UPDATE_ORDER_DESCRIPTION, SET_ORDER} from 'my_vuex/mutations/order'
import {trim, dateFormat} from 'src/util/util'
import {toggleDialog} from 'my_vuex/actions/actions'
let forEach = require('lodash/forEach')
let clone = require('lodash/cloneDeep')
const getBaseUrl = (state, id) => {
  return state.order.ui.personal ? '/user/' + id + '/order' : '/order'
}
export const setOrders = ({dispatch}, obj = {
  list: [],
  pageInfo: {
    curPage: 1,
    pageSize: 10,
    totalPage: 0,
    total: 0
  }}) => {
  dispatch(RECEIVE_ORDER, obj)
}
/*
 * 获取订单列表
 * */
export const searchOrder = ({dispatch, state}, {search = {
  searchKeyword: '',
  orderStatus: '',
  serviceType: '',
  creatorId: '',
  beginTime: '',
  endTime: '',
  url: ''
}, curPage = 1}) => {
  let searchKeyword = search.searchKeyword || ''
  let orderStatus = search.orderStatus || ''
  let serviceType = search.serviceType || ''
  let creatorId = search.creatorId || ''
  let beginTime = search.beginTime || ''
  let endTime = search.endTime || ''
  let url = (search.url || getBaseUrl(state, creatorId)) + '?searchKeyword=' + window.encodeURIComponent(searchKeyword) +
  '&orderStatus=' + window.encodeURIComponent(orderStatus) +
  '&serviceType=' + window.encodeURIComponent(serviceType) +
  '&beginTime=' + window.encodeURIComponent(beginTime) +
  '&endTime=' + window.encodeURIComponent(endTime) +
  '&curPage=' + curPage
  url += state.order.ui.personal ? '' : '&creatorId=' + window.encodeURIComponent(creatorId)
  delete search.url
  return Server.request({
    url,
    method: 'get'
  }).then((res) => {
    let result = res.result
    let list = result.datas.map((order) => {
      order.isChecked = false
      order.createDate = order.createDate && dateFormat(order.createDate)
      order.completeDate = order.completeDate && dateFormat(order.completeDate)
      order.user = order.user || {id: ''}
      order.workman = order.workman || {}
      return order
    })
    setOrders({dispatch}, {
      search: search,
      list,
      pageInfo: {
        curPage: parseInt(result.curPage, 10),
        pageSize: parseInt(result.pageSize, 10),
        totalPage: parseInt(result.totalPage, 10),
        total: parseInt(result.total, 10)
      }
    })
  }, () => {
    setOrders({dispatch}, {search})
  })
}
/*
 * 获取指定订单
 * */
const getImages = (str) => {
  return str ? str.split(',') : []
}
export const showOrderDetail = ({dispatch, state}, id, creatorId) => {
  let url = getBaseUrl(state, creatorId) + '/' + id
  return Server.request({
    method: 'get',
    url
  }).then((res) => {
    let order = res.result
    order.repairImgs = getImages(order.repairImgs)
    order.logisticsImgs = getImages(order.logisticsImgs)
    order.productImgs = getImages(order.productImgs)
    order.checked = !!order.checked
    order.createDate = order.createDate && dateFormat(order.createDate)
    order.completeDate = order.completeDate && dateFormat(order.completeDate)
    order.user = order.user || {name: ''}
    order.workman = order.workman || {}
    dispatch(RECEIVE_ORDER_DETAIL, res.result)
  })
}
export const clearOrderDetail = ({dispatch}) => {
  dispatch(RECEIVE_ORDER_DETAIL, {
    orderNumber: '',
    orderStatus: '未收未付',
    serviceType: '配送安装',
    customerName: '',
    customerPhoneNum: '',
    customerTel: '',
    customerAddress: '',
    productInfo: '',
    logisticsInfo: '',
    repairInfo: '',
    profit: '',
    servicePrice: '',
    orderPrice: '',
    checked: false,
    checkInfo: '',
    shopInfo: '',
    qq: '',
    priceChangeReason: '',
    judgeReason: '',
    description: '',
    createDate: '',
    completeDate: '',
    judgment: 0,
    repairImgs: [],
    logisticsImgs: [],
    productImgs: [],
    workman: {},
    user: {name: ''}
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
export const dealOrder = ({state, dispatch}, {id, action, orderStatus, creatorId}) => {
  let url = getBaseUrl(state, creatorId) + '/batch'
  let ids = []
  let orders = state.order
  let data = {
    action
  }
  if (id === undefined) {
    orders.list.forEach((order) => {
      if (order.isChecked) {
        ids.push(order.id)
      }
    })
  } else {
    ids.push(id)
  }
  if (action === 'update') {
    data.orderStatus = orderStatus
  }
  data.ids = ids.join(',')
  Server.request({
    url,
    method: 'post',
    data
  }).then((res) => {
    action === 'delete' && dispatch(DELETE_ORDER, ids)
    searchOrder({dispatch, state}, {search: orders.search, curPage: orders.pageInfo.curPage})
  })
}

/*
* 保存师傅
* */
export const saveOrder = ({state, dispatch}, order) => {
  let newOrder = clone(order || state.order.detail) || {}
  forEach(['repairImgs', 'logisticsImgs', 'productImgs'], (key) => {
    let arr = (newOrder[key] || []).filter((src) => {
      return src && src !== 'error' && src !== 'loading'
    })
    newOrder[key] = arr.join(',')
  })
  newOrder.creatorId = newOrder.user && newOrder.user.id
  newOrder.workmanId = newOrder.workman && newOrder.workman.id
  delete newOrder.isChecked
  delete newOrder.workman
  return save({state, dispatch}, newOrder)
}
const save = ({state, dispatch}, order) => {
  let id = order.id
  let creatorId = state.order.ui.personal ? (order.creatorId || state.auth.id) : ''
  let url = getBaseUrl(state, creatorId) + (id ? '/' + id : '')
  delete order.user
  trim(order)
  return Server.request({
    method: 'post',
    url,
    data: order
  }).then(() => {
    toggleDialog({state, dispatch}, {
      show: true,
      content: '订单保存成功',
      hasSuccessBtn: false,
      hasCloseBtn: false
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
      newOrder.creatorId = newOrder.user && newOrder.user.id || ''
      newOrder.workmanId = newOrder.workman && newOrder.workman.id || ''
      delete newOrder.isChecked
      delete newOrder.workman
      newOrder.description = description
      return save({state, dispatch}, newOrder).then((res) => {
        dispatch(UPDATE_ORDER_DESCRIPTION, {idx, description})
      }).then(() => {
        searchOrder({dispatch, state}, {search: state.order.search, curPage: state.order.pageInfo.curPage})
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
export const dealOrderImage = ({state, dispatch}, {key, src, type, idx}) => {
  let arr = clone(state.order.detail[key] || [])
  if (type === 'del') {
    arr.splice(src, 1, '')
  } else {
    arr[idx] = src
  }
  let obj = {}
  obj[key] = arr
  dispatch(SET_ORDER, obj)
}
/*
export const querySlaves = ({dispatch}) => {
  Server.request({
    method: 'get',
    url: '/user/self'
  }).then((res) => {
    dispatch(AUTH_SLAVES, res.result.slaves)
  })
}
*/
