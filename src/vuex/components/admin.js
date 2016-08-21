/**
 * Created by liljay on 2016/8/6.
 */
import {TOGGLE_DIALOG} from 'my_vuex/mutations/mutation-types'
const forEach = require('lodash/forEach')
const state = {
  dialog: {
    title: '提示',
    content: '',
    hasSuccessBtn: false,
    hasCloseBtn: false,
    show: false,
    auto: true,
    success: () => {},
    close: () => {}
  }
}

const mutations = {
  [TOGGLE_DIALOG]: (state, obj) => {
    state.dialog.show = false
    state.dialog.auto = true
    state.dialog.hasSuccessBtn = false
    state.dialog.hasCloseBtn = false
    state.dialog.success = () => {}
    state.dialog.close = () => {}
    forEach(obj, (val, key) => {
      state.dialog[key] = val
    })
  }
}

export default {
  state,
  mutations
}
