/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTION_MENU} from '../mutation-types'
const state = {
  menus: [
    {
      name: 'statistics',
      title: '统计管理',
      sub: [
        {
          name: '/admin/statistic',
          title: '订单统计'
        }
      ]
    },
    {
      name: 'users',
      title: '用户管理',
      sub: [
        {
          name: '/admin/users',
          title: '搜索用户'
        },
        {
          name: '/admin/users/add',
          title: '添加用户'
        }
      ]
    },
    {
      name: 'orders',
      title: '订单管理',
      sub: [
        {
          name: '/admin/orders',
          title: '搜索订单'
        },
        {
          name: '/admin/orders/add',
          title: '添加订单'
        }
      ]
    },
    {
      name: 'user-orders',
      title: '个人订单管理',
      sub: [
        {
          name: '/admin/orders/user',
          title: '搜索订单'
        },
        {
          name: '/admin/orders/user/add',
          title: '添加订单'
        }
      ]
    },
    {
      name: 'workers',
      title: '师傅管理',
      sub: [
        {
          name: '/admin/workers',
          title: '搜索师傅'
        },
        {
          name: '/admin/workers/add',
          title: '添加师傅'
        }
      ]
    }
  ],
  active: '/'
}

const mutations = {
  [SET_ACTION_MENU]: (state, url) => {
    state.active = url
  }
}

export default {
  mutations,
  state
}
