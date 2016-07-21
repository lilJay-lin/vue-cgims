/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from 'src/api/server.js'
import {RECEIVE_USE, CHECK_ALL_USER, CHECK_USER, DELETE_USER} from 'my_vuex/mutations/user'
/*
* 获取用户列表
* */
let baseUrl = '/user'
export const searchUser = ({dispatch}, {searchKeyword = '', curPage = 1}) => {
  let url = baseUrl + '?searchKeyword=' + searchKeyword + '&curPage=' + curPage
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
        curPage: res.curPage,
        pageSize: res.pageSize,
        totalPage: res.totalPage,
        total: res.total
      }
    })
  })
}

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
    ids = users.list.map((user) => {
      if (user.checked) {
        return user.id
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
