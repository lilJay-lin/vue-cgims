/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTIVE_MENU, SET_SLIDER} from '../mutations/mutation-types'
/*
  close: 是否关闭菜单，默认打开
  link: 菜单路径
  name: 菜单name用来匹配当前聚焦的菜单，对应的是router配置的路由name
  多个链接指向同一个菜单的方法：
* 1. 所有指定链接name存放入contains
* 2. router定义所有链接name和菜单的name一致
* */
const state = {
  menus: [
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
  ],
  active: '/'
}

const mutations = {
  [SET_SLIDER]: (state, menus) => {
    state.menus = menus
  },
  [SET_ACTIVE_MENU]: (state, url) => {
    state.active = url
  }
}

export default {
  mutations,
  state
}
