/**
 * Created by linxiaojie on 2016/7/19.
 */
import store from 'my_vuex/store'
import {toggleDialog} from 'my_vuex/actions/dialog'
import {clearAuth} from 'my_vuex/actions/auth'
import {getRouter} from '../router/routerHelper'
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
    let promise = new Promise((resolve, reject) => {
      qwest[method](url, data, options, before).then((xhr, res) => {
        if (res.status === 1) {
          resolve(res)
        } else if (res.status === -2) {
          error('请重新登录')
          clearAuth(store)
          let router = getRouter()
          router.go('/login')
          resolve(res)
        } else {
          error(res.msg)
          reject(res)
        }
      }).catch((e, xhr, res) => {
        let message = res && res.msg || '操作失败，请稍后重试'
        error(message)
        reject({msg: message, status: res && res.status || -404, result: null})
      })
    })
    return promise
  }
}
