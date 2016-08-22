/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_WORKER, CHECK_ALL_WORKER, CHECK_WORKER, DELETE_WORKER, RECEIVE_WORKER_DETAIL, SET_WORKER_MODE, SET_WORKER} from 'my_vuex/mutations/worker'
import {trim, dateFormat} from 'src/util/util'
import {toggleDialog} from 'my_vuex/actions/dialog'
/*
 * 获取师傅列表
 * */
let baseUrl = '/workman'
let forEach = require('lodash/forEach')
let clone = require('lodash/cloneDeep')
export const searchWorker = ({dispatch}, {search = {
  searchKeyword: '',
  region: '',
  serverType: ''
}, curPage = 1}) => {
  let regions = (search.region || '').split('/')
  let url = baseUrl + '?searchKeyword=' + window.encodeURIComponent(search.searchKeyword || '') +
    '&province=' + window.encodeURIComponent(regions[0] || '') +
    '&city=' + window.encodeURIComponent(regions[1] || '') +
    '&area=' + window.encodeURIComponent(regions[2] || '') +
    '&serviceType=' + window.encodeURIComponent(search.serverType || '') +
    '&curPage=' + curPage
  Server.request({
    url,
    method: 'get'
  }).then((res) => {
    let result = res.result
    let list = result.datas.map((worker) => {
      worker.checked = false
      worker.score = worker.score && (new window.Number(worker.score)).toFixed(2) || 0
      return worker
    })
    dispatch(RECEIVE_WORKER, {
      search,
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
export const setWorkers = ({dispatch}, obj = {
  list: [],
  pageInfo: {
    curPage: 1,
    pageSize: 10,
    totalPage: 0,
    total: 0
  }}) => {
  dispatch(RECEIVE_WORKER, obj)
}
/*
 * 获取指定师傅
 * */
/*
 * 服务项目拆分字段
 * */
let serviceItems = [
  {label: '家具类', name: 'furnitureType'},
  {label: '灯具类', name: 'lightType'},
  {label: '卫浴类', name: 'stoolType'},
  {label: '门窗五金类', name: 'metalsType'},
  {label: '家电类', name: 'householdType'}
]
export const showWorkerDetail = ({dispatch}, id) => {
  let url = baseUrl + '/' + id
  return Server.request({
    method: 'get',
    url
  }).then((res) => {
    let worker = res.result
    if (worker) {
      worker.receiveType = worker.receiveType && parseInt(worker.receiveType, 10)
      worker.birthday = worker.birthday && dateFormat(worker.birthday) || ''
      worker.tonnage = worker.tonnage && (new window.Number(worker.tonnage)).toFixed(2) || 0.00
      worker.serviceType = (worker.serviceType || '').replace(/,$/, '')
      worker.serviceArea = (worker.serviceArea || '').replace(/,$/, '')
      let itemsValue = worker.serviceItems
      if (itemsValue) {
        let items = JSON.parse(itemsValue)
        forEach(serviceItems, (obj) => {
          let label = obj.label
          let name = obj.name
          /*
          * 家电 or 门窗五金原来命名错误做兼容
          * */
          let val = items[label] || items[label.replace('类', '')]
          worker[name] = val ? val.replace(/,$/, '').split(',') : []
        })
      }
    }
    dispatch(RECEIVE_WORKER_DETAIL, worker)
    return true
  })
}
export const clearWorkerDetail = ({dispatch}) => {
  dispatch(RECEIVE_WORKER_DETAIL, {
    workmanNumber: '',
    name: '',
    phoneNum: '',
    qq: '',
    alipayAccount: '',
    bank: '',
    cardNum: '',
    birthday: '',
    receiveType: 0,
    servicePrice: 0,
    orderPrice: 0,
    province: '',
    city: '',
    area: '',
    headImg: '',
    address: '',
    truckNum: '',
    tonnage: '',
    teamPeopleNum: '',
    willingPickAddress: '',
    alipayAccountName: '',
    bankCardName: '',
    logistics: '',
    strength: '',
    cooperateTimes: 0,
    score: 0,
    idCardFace: '',
    idCardBack: '',
    'serviceType': '',
    serviceArea: '',
    'furnitureType': [],
    'stoolType': [],
    'lightType': [],
    'metalsType': [],
    'householdType': [],
    description: ''
  }
  )
}

/*
 * 选择师傅
 * */
export const checkWorker = ({dispatch}, checked, id) => {
  if (id === '') {
    dispatch(CHECK_ALL_WORKER, checked)
  } else {
    dispatch(CHECK_WORKER, {checked, id})
  }
}

/*
 * 删除师傅
 * */
export const deleteWorker = ({state, dispatch}, id) => {
  let url = baseUrl + '/batch'
  let ids = []
  let workers = state.worker
  if (id === undefined) {
    workers.list.forEach((worker) => {
      if (worker.checked) {
        ids.push(worker.id)
      }
    })
  } else {
    ids.push(id)
  }
  Server.request({
    url,
    method: 'post',
    data: {
      ids: ids.join(',')
    }
  }).then((res) => {
    dispatch(DELETE_WORKER, ids)
    searchWorker({dispatch}, {search: workers.search, curPage: workers.pageInfo.curPage})
  })
}

/*
* 保存师傅
* */
export const saveWorker = ({state, dispatch}) => {
  let worker = clone(state.worker.detail || {})
  let url = baseUrl + (worker.id ? '/' + worker.id : '')
  let items = {}
  forEach(serviceItems, (obj, idx) => {
    let name = obj.name
    items[obj.label] = (worker[name] && worker[name].join(',') || '').replace(/,$/, '')
    delete worker[name]
  })
  forEach(['idCardFace', 'idCardBack', 'headImg'], (key) => {
    let src = worker[key]
    worker[key] = src === 'loading' ? '' : src
  })
  worker.city === '' && (worker.serviceArea = '')
  worker['serviceItems'] = JSON.stringify(items)
  worker.cardNum = worker.cardNum && (worker.cardNum.replace(/([^\d])+/g, ''))
  if (worker.receiveType === 0) {
    worker.bank = ''
    worker.cardNum = ''
    worker.bankCardName = ''
  } else {
    worker.alipayAccount = ''
    worker.alipayAccountName = ''
  }
  /*
  dispatch(SAVE_WORKER, newWorker)
  */
  trim(worker)
  return Server.request({
    method: 'post',
    url,
    data: worker
  }).then(() => {
    toggleDialog({state, dispatch}, {
      show: true,
      content: '师傅保存成功'
    })
  })
}

/*
* 设置师傅内容
* */
export const setWorker = ({state, dispatch}, map) => {
  dispatch(SET_WORKER, map)
}

export const setWorkerMode = ({dispatch}, type) => {
  dispatch(SET_WORKER_MODE, type || 'query')
}
