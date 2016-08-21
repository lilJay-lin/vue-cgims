/**
 * Created by liljay on 2016/7/31.
 */
export const getAuth = (state) => {
  return state.auth
}

/*
 * 是否登录
 * */
export const isLogin = (state) => {
  return state.auth.login
}

/*
* 获取登录用户权限
* */
export const getPermission = (state) => {
  return state.auth.permission
}
