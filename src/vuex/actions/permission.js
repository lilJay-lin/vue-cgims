/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_PERMISSION} from 'my_vuex/mutations/permission'
import {noFound} from 'my_vuex/actions/actions'
/*
import {RECEIVE_PERMISSION, CHECK_ALL_PERMISSION, CHECK_PERMISSION, DELETE_PERMISSION, RECEIVE_PERMISSION_DETAIL} from 'my_vuex/mutations/permission'
*/
/*
 * 获取用户列表
 * */
let baseUrl = '/permission'
export const searchPermission = ({state, dispatch}, {searchKeyword = '', curPage = 1}, act = 0) => {
  let url = baseUrl + '?searchKeyword=' + window.encodeURIComponent(searchKeyword) + '&curPage=' + curPage
  Server.request({
    url,
    method: 'get'
  }).then((res) => {
    /*
    let list = res.result.datas.map((permission) => {
      permission.checked = false
      return permission
    })
    */
    let result = res.result
    dispatch(RECEIVE_PERMISSION, {
      searchKeyword,
      list: result.datas,
      pageInfo: {
        curPage: parseInt(result.curPage, 10),
        pageSize: parseInt(result.pageSize, 10),
        totalPage: parseInt(result.totalPage, 10),
        total: parseInt(result.total, 10)
      }
    })
    noFound({dispatch, state}, result.datas, act)
  })
}

/*
 * 获取指定用户
 * */
/*
 export const showPermissionDetail = ({dispatch}, id) => {
  let url = baseUrl + '/' + id
  Server.request({
    method: 'get',
    url
  }).then((res) => {
    dispatch(RECEIVE_PERMISSION_DETAIL, res.result)
  })
}*/

/*
 * 选择用户
 * */
/*
export const checkPermission = ({dispatch}, checked, id) => {
  if (id === '') {
    dispatch(CHECK_ALL_PERMISSION, checked)
  } else {
    dispatch(CHECK_PERMISSION, {checked, id})
  }
}
*/

/*
 * 删除用户
 * */
/*
export const deletePermission = ({state, dispatch}, id) => {
  let url = baseUrl + '/batch'
  let ids = []
  let permissions = state.permission
  if (id === undefined) {
    permissions.list.forEach((permission) => {
      if (permission.checked) {
        ids.push(permission.id)
      }
    })
  } else {
    ids.push(id)
  }
  dispatch(DELETE_PERMISSION, ids)
  Server.request({
    url,
    method: 'post',
    data: {
      ids: ids.join(',')
    }
  }).then((res) => {
    searchPermission({dispatch}, {searchKeyword: permissions.searchKeyword, curPage: permissions.pageInfo.curPage})
  })
}
*/
