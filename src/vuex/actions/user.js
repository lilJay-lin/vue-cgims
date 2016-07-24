/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_USE, CHECK_ALL_USER, CHECK_USER, DELETE_USER, RECEIVE_USER_DETAIL,
  DELETE_USER_REL_ROLE, ADD_USER_REL_ROLE, DELETE_USER_REL_SLAVE, ADD_USER_REL_SLAVE, SET_USER_MODE} from 'my_vuex/mutations/user'
/*
* 获取用户列表
* */
let baseUrl = '/user'
export const searchUser = ({dispatch}, {searchKeyword = '', curPage = 1}) => {
  let url = baseUrl + '?searchKeyword=' + window.encodeURIComponent(searchKeyword) + '&curPage=' + curPage
  Server.request({
    url,
    method: 'get'
  }).then((res) => {
    let list = res.result.datas.map((user) => {
      user.checked = false
      return user
    })
    dispatch(RECEIVE_USE, {
      searchKeyword,
      list,
      pageInfo: {
        curPage: parseInt(res.curPage, 10),
        pageSize: parseInt(res.pageSize, 10),
        totalPage: parseInt(res.totalPage, 10),
        total: parseInt(res.total, 10)
      }
    })
  })
}

/*
* 获取指定用户
* */
export const showUserDetail = ({dispatch}, id) => {
  let url = baseUrl + '/' + id
  Server.request({
    method: 'get',
    url
  }).then((res) => {
    dispatch(RECEIVE_USER_DETAIL, res.result.data)
  })
}
export const clearUserDetail = ({dispatch}) => {
  dispatch(RECEIVE_USER_DETAIL, {roles: [], slaves: []})
}

/*
* 选择用户
* */
export const checkUser = ({dispatch}, checked, id) => {
  if (id === '') {
    dispatch(CHECK_ALL_USER, checked)
  } else {
    dispatch(CHECK_USER, {checked, id})
  }
}

/*
* 删除用户
* */
export const deleteUser = ({state, dispatch}, id) => {
  let url = baseUrl + '/batch'
  let ids = []
  let users = state.user
  if (id === undefined) {
    users.list.forEach((user) => {
      if (user.checked) {
        ids.push(user.id)
      }
    })
  } else {
    ids.push(id)
  }
  dispatch(DELETE_USER, ids)
  Server.request({
    url,
    method: 'post',
    data: {
      ids: ids.join(',')
    }
  }).then((res) => {
    searchUser({dispatch}, {searchKeyword: users.searchKeyword, curPage: users.pageInfo.curPage})
  })
}

/*
 * 删除关联的权限
 * */
export const deleteRelRole = ({dispatch}, roleId) => {
  dispatch(DELETE_USER_REL_ROLE, roleId)
}

/*
 * 添加关联权限
 * */
export const addRelRole = ({dispatch}, role) => {
  dispatch(ADD_USER_REL_ROLE, role)
}

/*
 * 删除关联的用户
 * */
export const deleteRelSlave = ({dispatch}, slaveId) => {
  dispatch(DELETE_USER_REL_SLAVE, slaveId)
}

/*
 * 添加关联用户
 * */
export const addRelSlave = ({dispatch}, slave) => {
  dispatch(ADD_USER_REL_SLAVE, slave)
}

/*
 * 保存角色
 * */
export const saveUser = ({state, dispatch}, user, newUser) => {
  let url = baseUrl
  /*
   dispatch(SAVE_ROLE, newUser)
   */
  let roles = user.roles.map((role) => { return role.id }) || []
  let slaves = user.slaves.map((slave) => { return slave.id }) || []
  newUser['roleIds'] = roles.join(',')
  newUser['slaveIds'] = slaves.join(',')
  Server.request({
    method: 'post',
    url,
    data: newUser
  })
}

export const setUserMode = ({dispatch}, type) => {
  dispatch(SET_USER_MODE, type || 'query')
}
