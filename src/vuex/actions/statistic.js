/**
 * Created by liljay on 2016/7/26.
 */
import {SET_SEARCH, RECIEVE_VALUE} from 'my_vuex/mutations/statistic'
import Server from 'src/api/server.js'

let baseUrl = '/analysis'
export const setSearch = ({dispatch}, search) => {
  dispatch(SET_SEARCH, search)
}
const encodeURIComponent = (val) => {
  return window.encodeURIComponent(val)
}
export const startStatistic = ({state: {statistic: {search}}, dispatch}) => {
  let url = baseUrl + '/' + encodeURIComponent(search.searchType) +
      '?creatorId=' + encodeURIComponent(search.creatorId) +
      '&serviceType=' + encodeURIComponent(search.serviceType) +
      '&beginTime=' + encodeURIComponent(search.beginTime) +
      '&endTime=' + encodeURIComponent(search.endTime)
  Server.request({
    method: 'get',
    url
  }).then((res) => {
    dispatch(RECIEVE_VALUE, res.result)
  })
}
