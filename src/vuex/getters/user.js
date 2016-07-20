/**
 * Created by linxiaojie on 2016/7/20.
 */
import Server from '../../api/server.js'
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
    console.log(JSON.stringify(res))
  })
}
