/**
 * Created by liljay on 2016/8/22.
 */
import {TOGGLE_DIALOG, RESET_DIALOG} from './../mutations/mutation-types'

/*
 * 展示or隐藏弹窗
 * */
export const toggleDialog = ({dispatch}, obj) => {
  obj && obj.show && dispatch(RESET_DIALOG)
  dispatch(TOGGLE_DIALOG, obj)
}
