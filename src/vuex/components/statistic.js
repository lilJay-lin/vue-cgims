/**
 * Created by liljay on 2016/7/26.
 */
import {SET_SEARCH, RECEIVE_VALUE, REQUEST_STATE} from 'my_vuex/mutations/statistic'
const forEach = require('lodash/forEach')
const state = {
  search: {
    creatorId: '',
    serviceType: '',
    beginTime: '',
    endTime: '',
    searchType: 'orderCount'
  },
  value: '',
  state: true
}

const mutations = {
  [SET_SEARCH]: (state, search) => {
    forEach(search, (val, key) => {
      state.search[key] = val
    })
  },
  [RECEIVE_VALUE]: (state, value) => {
    state.value = value
  },
  [REQUEST_STATE]: (state, value) => {
    state.state = value
  }
}

export default {
  state,
  mutations
}
