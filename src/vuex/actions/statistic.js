/**
 * Created by liljay on 2016/7/26.
 */
import {SET_SEARCH, RECEIVE_VALUE, REQUEST_STATE} from 'my_vuex/mutations/statistic'
import Server from 'src/api/server.js'

let baseUrl = '/analysis'
export const setSearch = ({dispatch}, search) => {
  search.searchType && dispatch(RECEIVE_VALUE, '')
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
  dispatch(REQUEST_STATE, false)
  return Server.request({
    method: 'get',
    url
  }).then((res) => {
    dispatch(RECEIVE_VALUE, search.searchType === 'profitMargin' ? (new window.Number(res.result * 100)).toFixed(2) : res.result)
    dispatch(REQUEST_STATE, true)
  }, () => {
    dispatch(REQUEST_STATE, true)
  })
}
