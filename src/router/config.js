/**
 * Created by liljay on 2016/7/17.
 */
import Admin from 'src/Admin.vue'
import Login from 'src/Login.vue'
import SearchUser from 'components/user/SearchUser.vue'
import AddUser from 'components/user/AddUser.vue'
import SearchRole from 'components/role/SearchRole.vue'
import AddRole from 'components/role/AddRole.vue'
import Statistic from 'components/statistic/Statistic.vue'
import SearchWorker from 'components/worker/SearchWorker.vue'
import AddWorker from 'components/worker/AddWorker.vue'
import SearchOrder from 'components/order/SearchOrder.vue'
import AddOrder from 'components/order/AddOrder.vue'
import store from 'my_vuex/store'
import {setMenuActive} from '../vuex/actions'

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
        '/users': {
          component: SearchUser
        },
        '/users/add': {
          component: AddUser
        },
        '/roles': {
          component: SearchRole
        },
        '/roles/add': {
          component: AddRole
        },
        '/workers': {
          component: SearchWorker
        },
        '/workers/add': {
          component: AddWorker
        },
        '/statistic': {
          component: Statistic
        },
        '/orders': {
          component: SearchOrder
        },
        '/orders/add': {
          component: AddOrder
        },
        '/orders/user': {
          component: SearchOrder
        },
        '/orders/user/add': {
          component: AddOrder
        }
      }
    },
    '/login': {
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
    setMenuActive(store, transition.to.path)
    transition.next()
  })
}
