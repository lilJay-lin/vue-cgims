/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_WORKER, CHECK_ALL_WORKER, CHECK_WORKER, DELETE_WORKER, RECEIVE_WORKER_DETAIL, SET_WORKER_MODE, SET_WORKER} from 'my_vuex/mutations/worker'
/*
 * 获取师傅列表
 * */
let baseUrl = '/worker'
let forEach = require('lodash/forEach')
let clone = require('lodash/cloneDeep')
export const searchWorker = ({dispatch}, {search = {
  searchKeyword: '',
  region: '',
  server_type: '服务'
}, curPage = 1}) => {
  let regions = search.region.split('/')
  let url = baseUrl + '?searchKeyword=' + window.encodeURIComponent(search.searchKeyword) +
    '&province=' + window.encodeURIComponent(regions[0] || '') +
    '&city=' + window.encodeURIComponent(regions[1] || '') +
    '&area=' + window.encodeURIComponent(regions[2] || '') +
    '&serviceType=' + window.encodeURIComponent(search.server_type) +
    '&curPage=' + curPage
  Server.request({
    url,
    method: 'get'
  }).then((res) => {
    let result = res.result
    let list = result.datas.map((worker) => {
      worker.checked = false
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
/*
 * 获取指定师傅
 * */
/*
 * 服务项目拆分字段
 * */
let serviceItems = ['furniture_type', 'stool_type', 'light_type', 'metals_type', 'household_type']
export const showWorkerDetail = ({dispatch}, id) => {
  let url = baseUrl + '/' + id
  return Server.request({
    method: 'get',
    url
  }).then((res) => {
    let worker = res.result
    if (worker) {
      worker.receive_type = worker.receive_type && parseInt(worker.receive_type, 10)
      let serviceItems = worker.service_items
      if (serviceItems) {
        let items = JSON.parse(serviceItems)
        forEach(items, (val, key) => {
          worker[key] = val
        })
      }
    }
    dispatch(RECEIVE_WORKER_DETAIL, worker)
  })
}
export const clearWorkerDetail = ({dispatch}) => {
  dispatch(RECEIVE_WORKER_DETAIL, {})
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
  dispatch(DELETE_WORKER, ids)
  Server.request({
    url,
    method: 'post',
    data: {
      ids: ids.join(',')
    }
  }).then((res) => {
    searchWorker({dispatch}, {search: workers.search, curPage: workers.pageInfo.curPage})
  })
}

/*
* 保存师傅
* */
export const saveWorker = ({state, dispatch}) => {
  let url = baseUrl
  let worker = clone(state.worker.detail || {})
  let items = {}
  forEach(serviceItems, (val, idx) => {
    items[val] = worker[val]
    delete worker[val]
  })
  worker['service_items'] = JSON.stringify(items)
  /*
  dispatch(SAVE_WORKER, newWorker)
  */
  Server.request({
    method: 'post',
    url,
    data: worker
  }).then((res) => {
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
