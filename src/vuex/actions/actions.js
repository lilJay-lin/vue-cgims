/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTIVE_MENU, TOGGLE_DIALOG} from './../mutations/mutation-types'

/*
* 设置当前active菜单
* */
export const setActiveMenu = ({dispatch}, url) => {
  dispatch(SET_ACTIVE_MENU, url)
}

/*
* 展示or隐藏弹窗
* */
export const toggleDialog = ({dispatch}, obj) => {
  dispatch(TOGGLE_DIALOG, obj)
}
