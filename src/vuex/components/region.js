/**
 * Created by liljay on 2016/7/24.
 */
import {SET_REGION} from 'my_vuex/mutations/mutation-types'
const state = {
  region: {}
}

const mutations = {
  [SET_REGION]: (state, obj) => {
    state.region = obj
  }
}

export default {
  state,
  mutations
}
