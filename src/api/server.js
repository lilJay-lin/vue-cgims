/**
 * Created by linxiaojie on 2016/7/19.
 */
import store from 'my_vuex/store'
import {toggleDialog} from 'my_vuex/actions/actions'
let qwest = require('qwest')

/*
 * 默认配置
 * */
qwest.base = window.__BASE_PATH__ || '/'
qwest.setDefaultOptions({
  responseType: 'json'
})
const error = (msg) => {
  toggleDialog(store, {
    content: msg,
    show: true,
    auto: true,
    hasSuccessBtn: false,
    hasCloseBtn: false
  })
}
export default {
  request: ({
    url,
    method = 'get',
    data = null,
    options = null,
    before = function () {}
    }) => {
    return qwest[method](url, data, options, before).then((xhr, res) => {
      return new Promise((resolve, reject) => {
        if (res.status === 1) {
          resolve(res)
        } else {
          error(res.msg)
          reject(res)
        }
      })
    }).catch((e, xhr, res) => {
      let message = res.message || '操作失败，请稍后重试'
      error(message)
      return Promise.reject({message: message, status: '-404', result: null})
    })
  }
}
