/**
 * Created by liljay on 2016/7/17.
 */
import Admin from 'src/Admin.vue'
import Login from 'src/Login.vue'
import SearchUser from 'components/user/SearchUser.vue'
import EditUser from 'components/user/EditUser.vue'
import SearchRole from 'components/role/SearchRole.vue'
import EditRole from 'components/role/EditRole.vue'
import Statistic from 'components/statistic/Statistic.vue'
import SearchWorker from 'components/worker/SearchWorker.vue'
import EditWorker from 'components/worker/EditWorker.vue'
import SearchOrder from 'components/order/SearchOrder.vue'
import EditOrder from 'components/order/EditOrder.vue'
import store from 'my_vuex/store'
import {isLogin} from 'my_vuex/getters/auth'
import {setActiveMenu} from 'my_vuex/actions/actions'
import {resolveLogin} from 'my_vuex/actions/auth'

let loginUrl = '/login'
export default (router) => {
  router.map({
    '/admin': {
      component: Admin,
      subRoutes: {
        '/': {
          component: {
            template: '<p>this is default view</p>'
          }
        },
        '/user': {
          name: '/admin/user',
          component: SearchUser
        },
        '/user/add': {
          name: '/admin/user/add',
          component: EditUser
        },
        '/user/self': {
          name: '/admin/user/self',
          component: EditUser
        },
        '/user/:id': {
          name: '/admin/user/:id',
          component: EditUser
        },
        '/role': {
          name: '/admin/role',
          component: SearchRole
        },
        '/role/add': {
          name: '/admin/role/add',
          component: EditRole
        },
        '/role/:id': {
          name: '/admin/role/:id',
          component: EditRole
        },
        '/worker': {
          name: '/admin/worker',
          component: SearchWorker
        },
        '/worker/add': {
          name: '/admin/worker/add',
          component: EditWorker
        },
        '/worker/:id': {
          name: '/admin/worker/:id',
          component: EditWorker
        },
        '/statistic': {
          name: '/admin/statistic',
          component: Statistic
        },
        '/order': {
          name: '/admin/order',
          component: SearchOrder
        },
        '/order/add': {
          name: '/admin/order/add',
          component: EditOrder
        },
        '/order/:id': {
          name: '/admin/order/:id',
          component: EditOrder
        },
        '/user/order': {
          name: '/admin/user/order',
          component: SearchOrder
        },
        '/user/order/add': {
          name: '/admin/user/order/add',
          component: EditOrder
        },
        '/user/order/:id': {
          name: '/admin/user/order/:id',
          component: EditOrder
        },
        '/forbidden': {
          name: '/admin/forbidden',
          component: {
            template: '<p>没有权限访问</p>'
          }
        }
      }
    },
    [loginUrl]: {
      component: Login
    }
  })
  router.redirect({
    '*': '/admin'
  })

  /*
  *  全局路由权限控制，无权限跳转至forbidden
  */
  router.beforeEach(function (transition) {
    let login = isLogin(store.state)
    if (!login && window.__LOGIN_USER__) {
      resolveLogin(store, window.__LOGIN_USER__)
      login = isLogin(store.state)
    }
    let toPath = transition.to.path
    if (~toPath.indexOf(loginUrl)) {
      if (login) {
        transition.redirect('/admin')
      }
    } else if (!login) {
      transition.redirect(loginUrl)
      return
    }
    let to = transition.to
    setActiveMenu(store, to.name)
    transition.next()
  })
}
