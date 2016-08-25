/**
 * Created by liljay on 2016/8/6.
 */
import {TOGGLE_DIALOG, RESET_DIALOG} from 'my_vuex/mutations/mutation-types'
const forEach = require('lodash/forEach')
const state = {
  title: '提示',
  content: '提示内容',
  hasSuccessBtn: false,
  hasCloseBtn: false,
  show: false,
  auto: true,
  closeText: '取消',
  successText: '确定',
  duration: '1000',
  success: () => {},
  close: () => {}
}

const mutations = {
  [RESET_DIALOG]: (state, obj) => {
    state.title = '提示'
    state.content = '提示内容'
    state.hasSuccessBtn = false
    state.hasCloseBtn = false
    state.show = false
    state.auto = true
    state.closeText = '取消'
    state.successText = '确定'
    state.duration = '1000'
    state.success = () => {}
    state.close = () => {}
  },
  [TOGGLE_DIALOG]: (state, obj) => {
    forEach(obj, (val, key) => {
      state[key] = val
    })
  }
}

export default {
  state,
  mutations
}
