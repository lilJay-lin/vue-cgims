/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTIVE_MENU, SET_SLIDER, SET_MENU_OPEN} from '../mutations/mutation-types'
/*
  close: 是否关闭菜单，默认打开
  link: 菜单路径
  name: 菜单name用来匹配当前聚焦的菜单，对应的是router配置的路由name
  多个链接指向同一个菜单的方法：
* 1. 所有指定链接name存放入contains
* 2. router定义所有链接name和菜单的name一致
* */
const state = {
  menus: [],
  active: '/'
}

const mutations = {
  [SET_SLIDER]: (state, menus) => {
    state.menus = menus
  },
  [SET_ACTIVE_MENU]: (state, url) => {
    state.active = url
  },
  [SET_MENU_OPEN]: (state, {idx, close}) => {
    state.menus[idx].close = close
  }
}

export default {
  mutations,
  state
}
