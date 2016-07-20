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
import {isLogin} from 'my_vuex/getters/getters'
import {setActiveMenu} from 'my_vuex/actions'

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
          component: SearchUser
        },
        '/user/add': {
          component: AddUser
        },
        '/roles': {
          component: SearchRole
        },
        '/roles/add': {
          component: AddRole
        },
        '/worker': {
          component: SearchWorker
        },
        '/worker/add': {
          component: AddWorker
        },
        '/statistic': {
          component: Statistic
        },
        '/order': {
          component: SearchOrder
        },
        '/order/add': {
          component: AddOrder
        },
        '/order/user': {
          component: SearchOrder
        },
        '/order/user/add': {
          component: AddOrder
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
    if (!isLogin(store.state) && transition.to.path !== loginUrl) {
      transition.redirect(loginUrl)
      return
    }
    setActiveMenu(store, transition.to.path)
    transition.next()
  })
}
