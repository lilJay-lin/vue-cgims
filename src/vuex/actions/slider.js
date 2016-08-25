/**
 * Created by liljay on 2016/8/23.
 */
import {SET_SLIDER, SET_MENU_OPEN, SET_ACTIVE_MENU, SET_MENU_REL_PERMISSION} from '../mutations/mutation-types'
import {isUndefined} from 'src/util/util'
import {menuRelPermission} from 'my_vuex/config'
const forEach = require('lodash/forEach')
const clone = require('lodash/cloneDeep')
/*
 * 菜单关联权限
 * permission: 用户拥有的权限，key-map,eg: {roleManager: true, orderManager: false}
 * */
export const setMenuRelPermission = ({dispatch, state}, permission) => {
  let relPermission = menuRelPermission
  forEach(relPermission, (val, key) => {
    let hasPermission = false
    let pArr = val.split('/')
    if (pArr.length > 0) {
      forEach(pArr, (val) => {
        if (!hasPermission) {
          hasPermission = permission[val]
          return false
        }
      })
    }
    hasPermission === true ? relPermission[key] = true : relPermission[key] = false
  })
  dispatch(SET_MENU_REL_PERMISSION, relPermission)
}
const filterMenus = (menus, relPermission) => {
  let len = menus.length
  while (len) {
    let i = len - 1
    let menu = menus[i]
    forEach(menu.sub, (sub, idx) => {
      !relPermission[sub.name] && menu.sub.splice(idx, 1)
    })
    menu.sub.length === 0 && menus.splice(i, 1)
    len--
  }
}
const fixMenus = (menus) => {
  forEach(menus, (menu) => {
    let close = menu.close
    menu.close = isUndefined(close) ? false : close
    menu.sub = isUndefined(menu.sub) ? [] : menu.sub
    forEach(menu.sub, (sub) => {
      sub.active = isUndefined(sub.active) ? false : sub.active
      sub.contains = isUndefined(sub.contains) ? [] : sub.contains
    })
  })
  return menus
}

export const setMenus = ({dispatch, state}) => {
  let menus = [
    {
      name: 'statistics',
      title: '统计管理',
      sub: [
        {
          name: 'startStatistic',
          link: '/admin/statistic',
          title: '订单统计'
        }
      ]
    },
    {
      name: 'user',
      title: '用户管理',
      close: true,
      sub: [
        {
          name: 'searchUser',
          link: '/admin/user',
          contains: ['editUser'],
          title: '搜索用户'
        },
        {
          name: 'addUser',
          link: '/admin/user/add',
          title: '添加用户'
        }
      ]
    },
    {
      name: 'role',
      title: '角色管理',
      close: true,
      sub: [
        {
          name: 'searchRole',
          link: '/admin/role',
          contains: ['editRole'],
          title: '搜索角色'
        },
        {
          name: 'addRole',
          link: '/admin/role/add',
          title: '添加角色'
        }
      ]
    },
    {
      name: 'order',
      title: '订单管理',
      sub: [
        {
          name: 'searchOrder',
          link: '/admin/order',
          contains: ['editOrder'],
          title: '搜索订单'
        },
        {
          name: 'addOrder',
          link: '/admin/order/add',
          title: '添加订单'
        }
      ]
    },
    {
      name: 'user-order',
      title: '个人订单管理',
      sub: [
        {
          name: 'searchUserOrder',
          link: '/admin/user/order',
          contains: ['editUserOrder'],
          title: '搜索订单'
        },
        {
          name: 'addUserOrder',
          link: '/admin/user/order/add',
          title: '添加订单'
        }
      ]
    },
    {
      name: 'worker',
      title: '师傅管理',
      sub: [
        {
          name: 'searchWorker',
          link: '/admin/worker',
          contains: ['editWorker'],
          title: '搜索师傅'
        },
        {
          name: 'addWorker',
          link: '/admin/worker/add',
          title: '添加师傅'
        }
      ]
    }
  ]
  let menuRelPermission = state.slider.menuRelPermission
  filterMenus(menus, menuRelPermission)
  dispatch(SET_SLIDER, setActive(fixMenus(menus), state.slider.active))
}

export const setMenuOpen = ({dispatch, state}, mutation) => {
  dispatch(SET_MENU_OPEN, mutation)
}

const setActive = (menus, active) => {
  forEach(menus, (menu, idx) => {
    let subs = menu.sub
    if (subs && subs.length > 0) {
      forEach(subs, (sub) => {
        let isActive = sub.name === active || sub.contains && ~sub.contains.indexOf(active)
        if (isActive) {
          sub.active = true
          menu.close = false
        } else {
          sub.active = false
        }
      })
    }
  })
  return menus
}

/*
 * 设置当前active菜单
 * */
export const setActiveMenu = ({dispatch, state}, url) => {
  dispatch(SET_ACTIVE_MENU, url)
  let active = url
  let menus = clone(state.slider.menus)
  dispatch(SET_SLIDER, setActive(menus, active))
}

