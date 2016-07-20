/**
 * Created by liljay on 2016/7/16.
 */
const forEach = require('lodash/forEach')
/*
* 获取左侧侧边栏菜单列表
* */
export const getSlider = state => {
  return state.slider
}

/*
* 获取面包屑菜单列表
* */
function loopSubMenu (menus, breads, active) {
  let isHit = 0
  forEach(menus, (menu) => {
    if (isHit) return
    breads.push({
      name: menu.name,
      title: menu.title
    })
    if (menu.name === active) {
      isHit = 1
    } else {
      let subMenus = menu.sub
      if (subMenus && subMenus.length > 0) {
        let isHit = loopSubMenu(subMenus, breads, active)
        !isHit && breads.pop()
      } else {
        breads.pop()
      }
    }
  })
  return isHit
}
export const getBreadCrumb = (state) => {
  let slider = state.slider
  let menus = slider.menus
  let active = slider.active
  let breads = []
  loopSubMenu(menus, breads, active)
  return {
    menus: breads,
    active: active
  }
}

/*
* 是否登录
* */
export const isLogin = (state) => {
  return state.auth.login
}
