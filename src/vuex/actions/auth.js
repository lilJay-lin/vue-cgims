/**
 * Created by liljay on 2016/7/31.
 */
import {AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_PERMISSION} from 'my_vuex/mutations/mutation-types'
import Server from 'src/api/server.js'
let forEach = require('lodash/forEach')
let baseUrl = '/user'
/*
 * 登录
 * */
export const login = (store, {loginName, password}) => {
  let url = baseUrl + '/login'
  Server.request({
    method: 'post',
    url,
    data: {
      loginName,
      password
    }
  }).then((res) => {
    resolveLogin(store, res.result)
  })
}
export const resolveLogin = ({dispatch}, json) => {
  let {userId, userName, permissionCodes} = json
  let obj = {
    login: true,
    name: userName,
    id: userId
  }
  dispatch(AUTH_LOGIN_SUCCESS, obj)
  setPermission({dispatch}, permissionCodes)
}
export const setPermission = ({dispatch}, permissionCodes) => {
  if (permissionCodes) {
    let arr = permissionCodes.split(',')
    let obj = {}
    forEach(arr, (val) => {
      obj[val.trim()] = true
    })
    dispatch(AUTH_PERMISSION, obj)
  }
}
/*
* 退出
* */
export const logout = ({dispatch}) => {
  window.__LOGIN_USER__ = null
  dispatch(AUTH_LOGOUT)
}
