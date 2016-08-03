/**
 * Created by liljay on 2016/7/16.
 */
const forEach = require('lodash/forEach')
const clone = require('lodash/cloneDeep')
/*
* 获取左侧侧边栏菜单列表
 'statistics': 'roleManager',
 'user': 'userManager',
 'role': 'orderManager/roleManager',
 'order': 'orderView',
 'user-order': 'userOrderManager',
 'worker': 'workmanManager'
 1/p_role_manager
 2/p_user_manager
 3/p_order_manager
 4/p_order_view
 5/p_user_order_manager
 6/p_workman_manager
 7/p_analysis_manager
* */
let menuRelPermission = {
  'statistics': 'analysisManager',
  'user': 'userManager',
  'role': 'roleManager/userManager',
  'order': 'orderManager/orderView',
  'user-order': 'userOrderManager',
  'worker': 'orderManager/orderView/workmanManager/userOrderManager'
}
/*
* 新增权限过滤
* */
let subMenuRelPermission = {
  '/admin/user/add': 'userManager',
  '/admin/role/add': 'roleManager',
  '/admin/order/add': 'orderManager',
  '/admin/user/order/add': 'userOrderManager',
  '/admin/worker/add': 'workmanManager'
}
const filterMenus = (menus, permission, relPermission) => {
  let len = menus.length
  while (len) {
    let i = len - 1
    let name = menus[i].name
    let hasPermission = false
    if (relPermission[name]) {
      let pArr = relPermission[name].split('/')
      if (pArr.length > 0) {
        forEach(pArr, (val) => {
          if (!hasPermission) {
            hasPermission = permission[val]
          }
        })
      }
      if (!hasPermission) {
        menus.splice(i, 1)
      } else {
        let subMenus = menus[i].sub
        subMenus && filterMenus(subMenus, permission, subMenuRelPermission)
      }
    }
    len--
  }
}
export const getSlider = state => {
  let permission = state.auth.permission
  let slider = clone(state.slider)
  let menus = slider.menus
  filterMenus(menus, permission, menuRelPermission)
  return slider
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
    if (menu.name === active || menu.contains && ~menu.contains.indexOf(active)) {
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

/*
* 获取区域
* */
export const getRegion = (state) => {
  return state.region.region[0]
}
