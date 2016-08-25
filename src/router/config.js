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
import Forbidden from 'components/Forbidden.vue'
import store from 'my_vuex/store'
import {isLogin} from 'my_vuex/getters/auth'
import {setActiveMenu} from 'my_vuex/actions/slider'
import {resolveLogin} from 'my_vuex/actions/auth'

const LOGIN_ROUTER_NAME = 'login'
export default (router) => {
  router.map({
    '/admin': {
      component: Admin,
      subRoutes: {
        '/': {
          component: {
            template: ''
          }
        },
        '/user': {
          name: 'searchUser',
          component: SearchUser
        },
        '/user/add': {
          name: 'addUser',
          component: EditUser
        },
        '/user/self': {
          name: 'editUser',
          component: EditUser
        },
        '/user/:id': {
          name: 'editUser',
          component: EditUser
        },
        '/role': {
          name: 'searchRole',
          component: SearchRole
        },
        '/role/add': {
          name: 'addRole',
          component: EditRole
        },
        '/role/:id': {
          name: 'editRole',
          component: EditRole
        },
        '/worker': {
          name: 'searchWorker',
          component: SearchWorker
        },
        '/worker/add': {
          name: 'addWorker',
          component: EditWorker
        },
        '/worker/:id': {
          name: 'editWorker',
          component: EditWorker
        },
        '/statistic': {
          name: 'startStatistic',
          component: Statistic
        },
        '/order': {
          name: 'searchOrder',
          component: SearchOrder
        },
        '/order/add': {
          name: 'addOrder',
          component: EditOrder
        },
        '/order/:id': {
          name: 'editOrder',
          component: EditOrder
        },
        '/user/order': {
          name: 'searchUserOrder',
          component: SearchOrder
        },
        '/user/order/add': {
          name: 'addUserOrder',
          component: EditOrder
        },
        '/user/order/:id': {
          name: 'editUserOrder',
          component: EditOrder
        },
        '/forbidden': {
          name: 'forbidden',
          component: Forbidden
        }
      }
    },
    '/login': {
      name: LOGIN_ROUTER_NAME,
      component: Login
    }
  })
  router.redirect({
    '*': '/admin'
  })

  /*
  *  全局路由权限控制，无权限跳转至forbidden
  */
  router.beforeEach((transition) => {
    let login = isLogin(store.state)
    if (!login && window.__LOGIN_USER__) {
      resolveLogin(store, window.__LOGIN_USER__)
      login = isLogin(store.state)
    }
    let toName = transition.to.name
    if (toName === LOGIN_ROUTER_NAME) {
      if (login) {
        transition.redirect('/admin')
        return
      }
    } else if (!login) {
      transition.redirect('/login')
      return
    }
    let menuRelPermission = store.state.slider.menuRelPermission
    if (menuRelPermission.hasOwnProperty(toName) && !menuRelPermission[toName]) {
      transition.redirect('/admin/forbidden')
    }
    transition.next()
  })

  router.afterEach(({to: {name}}) => {
    setActiveMenu(store, name)
  })
}
