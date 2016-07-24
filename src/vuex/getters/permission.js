/**
 * Created by linxiaojie on 2016/7/20.
 */
/*
* 获取用户列表
* */
export const getPermissions = (state) => {
  return {
    list: state.permission.list,
    pageInfo: state.permission.pageInfo
  }
}

/*
export const getDetailPermission = (state) => {
  return state.permission.detail
}

export const getCheckAll = (state) => {
  return state.permission.checkAll
}
*/
