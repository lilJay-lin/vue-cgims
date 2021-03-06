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
  return Server.request({
    method: 'post',
    url,
    data: {
      loginName,
      password
    }
  }).then((res) => {
/*
toggleDialog(store, {
      content: '登录成功',
      show: true,
      auto: true
    })
    */
    resolveLogin(store, res.result)
  })
}
export const resolveLogin = ({dispatch, state}, json) => {
  let {userId, userName, permissionCodes, slaveNames, slaveIds} = json
  let slaves = []
  let names = slaveNames && slaveNames.split(',') || []
  let ids = slaveIds && slaveIds.split(',') || []
  forEach(ids, (val, idx) => {
    slaves.push({
      name: names[idx],
      id: val
    })
  })
  let obj = {
    login: true,
    name: userName,
    id: userId,
    slaves
  }
  dispatch(AUTH_LOGIN_SUCCESS, obj)
  setPermission({dispatch}, permissionCodes)
/*
showUserDetail({dispatch}, {id: userId}).then(() => {
    console.log(state.user.detail)
  })
  */
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
export const logout = (store) => {
  clearAuth(store)
  let url = '/user/logout'
  Server.request({
    url,
    method: 'post'
  })
}

/*
* 清楚登录信息
* */
export const clearAuth = ({dispatch}) => {
  window.__LOGIN_USER__ = null
  dispatch(AUTH_LOGOUT)
}
