/**
 * Created by liljay on 2016/7/26.
 */
import {SET_SEARCH, RECIEVE_VALUE} from 'my_vuex/mutations/statistic'
const forEach = require('lodash/forEach')
const state = {
  search: {
    creatorId: '不限',
    serviceType: '不限',
    beginTime: '',
    endTime: '',
    searchType: 'orderCount'
  },
  value: ''
}

const mutations = {
  [SET_SEARCH]: (state, search) => {
    forEach(search, (val, key) => {
      state.search[key] = val
    })
  },
  [RECIEVE_VALUE]: (state, value) => {
    state.value = value
  }
}

export default {
  state,
  mutations
}
