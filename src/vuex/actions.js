/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTIVE_MENU} from './mutation-types'

/*
* 设置当前active菜单
* */
export const setActiveMenu = ({dispatch}, url) => {
  dispatch(SET_ACTIVE_MENU, url)
}
