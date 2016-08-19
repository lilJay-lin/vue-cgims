/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_ROLE, CHECK_ALL_ROLE, CHECK_ROLE, DELETE_ROLE, RECEIVE_ROLE_DETAIL,
  DELETE_ROLE_REL_PERMISSION, ADD_ROLE_REL_PERMISSION, SET_ROLE_MODE} from 'my_vuex/mutations/role'
import {trim} from 'src/util/util'
import {toggleDialog} from 'my_vuex/actions/actions'
/*
 * 获取权限列表
 * */
let baseUrl = '/role'
export const searchRole = ({dispatch}, {searchKeyword = '', curPage = 1}) => {
  let url = baseUrl + '?searchKeyword=' + window.encodeURIComponent(searchKeyword) + '&curPage=' + curPage
  return Server.request({
    url,
    method: 'get'
  }).then((res) => {
    let result = res.result
    let list = res.result.datas.map((role) => {
      role.checked = false
      return role
    })
    dispatch(RECEIVE_ROLE, {
      searchKeyword,
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
 * 获取指定权限
 * */
export const showRoleDetail = ({dispatch}, id) => {
  let url = baseUrl + '/' + id
  Server.request({
    method: 'get',
    url
  }).then((res) => {
    dispatch(RECEIVE_ROLE_DETAIL, res.result)
  })
}
export const clearRoleDetail = ({dispatch}) => {
  dispatch(RECEIVE_ROLE_DETAIL, {
    id: '',
    name: '',
    description: '',
    permissions: []
  })
}

/*
 * 选择权限
 * */
export const checkRole = ({dispatch}, checked, id) => {
  if (id === '') {
    dispatch(CHECK_ALL_ROLE, checked)
  } else {
    dispatch(CHECK_ROLE, {checked, id})
  }
}

/*
 * 删除权限
 * */
export const deleteRole = ({state, dispatch}, id) => {
  let url = baseUrl + '/batch'
  let ids = []
  let roles = state.role
  if (id === undefined) {
    roles.list.forEach((role) => {
      if (role.checked) {
        ids.push(role.id)
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
    dispatch(DELETE_ROLE, ids)
    searchRole({dispatch}, {searchKeyword: roles.searchKeyword, curPage: roles.pageInfo.curPage})
  })
}

/*
* 删除关联的权限
* */
export const deleteRelPermission = ({dispatch}, permissoinId) => {
  dispatch(DELETE_ROLE_REL_PERMISSION, permissoinId)
}

/*
* 添加关联权限
* */
export const addRelPermission = ({dispatch}, permission) => {
  dispatch(ADD_ROLE_REL_PERMISSION, permission)
}

/*
* 保存角色
* */
export const saveRole = ({state, dispatch}, role, newRole) => {
  let id = role.id ? '/' + role.id : ''
  let url = baseUrl + id
  /*
  dispatch(SAVE_ROLE, newRole)
  */
  let permissions = role.permissions.map((permission) => {
    return permission.id
  }) || []
  newRole['permissionIds'] = permissions.join(',')
  trim(newRole)
  return Server.request({
    method: 'post',
    url,
    data: newRole
  }).then(() => {
    toggleDialog({state, dispatch}, {
      show: true,
      content: '角色保存成功'
    })
  })
}

export const setRoleMode = ({dispatch}, type) => {
  dispatch(SET_ROLE_MODE, type || 'query')
}
