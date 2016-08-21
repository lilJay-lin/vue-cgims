/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTIVE_MENU, TOGGLE_DIALOG, SET_REGION} from './../mutations/mutation-types'
const forEach = require('lodash/forEach')
const clone = require('lodash/cloneDeep')
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

/*
* 获取地区
* */
export const setRegion = ({dispatch}) => {
  dispatch(SET_REGION, window.__PROVINCES__)
}

/*
 * 获取指定排序地区
 * */
export const setOrderRegion = ({dispatch}) => {
  let provinces = (window.__PROVINCE_NAMES__ || '').split(',')
  let region = {}
  if (provinces.length > 0) {
    let allRegion = clone(window.__PROVINCES__)
    forEach(provinces, (val) => {
      region[val] = allRegion[val]
    })
  }
  dispatch(SET_REGION, region)
}
