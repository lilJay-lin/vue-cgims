/**
 * Created by liljay on 2016/7/16.
 */
import {SET_ACTIVE_MENU} from '../mutations/mutation-types'
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
      name: 'user',
      title: '用户管理',
      sub: [
        {
          name: '/admin/user',
          title: '搜索用户'
        },
        {
          name: '/admin/user/add',
          title: '添加用户'
        }
      ]
    },
    {
      name: 'order',
      title: '订单管理',
      sub: [
        {
          name: '/admin/order',
          title: '搜索订单'
        },
        {
          name: '/admin/order/add',
          title: '添加订单'
        }
      ]
    },
    {
      name: 'user-order',
      title: '个人订单管理',
      sub: [
        {
          name: '/admin/order/user',
          title: '搜索订单'
        },
        {
          name: '/admin/order/user/add',
          title: '添加订单'
        }
      ]
    },
    {
      name: 'worker',
      title: '师傅管理',
      sub: [
        {
          name: '/admin/worker',
          title: '搜索师傅'
        },
        {
          name: '/admin/worker/add',
          title: '添加师傅'
        }
      ]
    }
  ],
  active: '/'
}

const mutations = {
  [SET_ACTIVE_MENU]: (state, url) => {
    state.active = url
  }
}

export default {
  mutations,
  state
}
