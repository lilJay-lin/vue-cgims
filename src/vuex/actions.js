/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTION_MENU} from './mutation-types'

export const setMenuActive = ({dispatch}, url) => {
  dispatch(SET_ACTION_MENU, url)
}
