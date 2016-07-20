/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from '../../api/server.js'
import {RECEIVE_USE, CHECK_ALL_USER, CHECK_USER} from 'my_vuex/mutations/user'
/*
* 获取用户列表
* */
let baseUrl = '/user'
export const searchUser = ({dispatch}, {searchKeyword = '', curPage = 1}) => {
  let url = baseUrl + '?searchKeyword=' + searchKeyword + '&curPage=' + curPage
  console.log(url)
  Server.request({
    url,
    method: 'get'
  }).then((xhr, res) => {
    if (res.success === 1) {
      let list = res.result.datas.map((user) => {
        user.checked = false
        return user
      })
      dispatch(RECEIVE_USE, {
        list: list,
        pageInfo: {
          curPage: res.curPage,
          pageSize: res.pageSize,
          totalPage: res.totalPage,
          total: res.total
        }
      })
    }
  })
}

export const checkUser = ({dispatch}, checked, id) => {
  if (id === '') {
    dispatch(CHECK_ALL_USER, checked)
  } else {
    dispatch(CHECK_USER, {checked, id})
  }
}
