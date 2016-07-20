/**
 * Created by linxiaojie on 2016/7/20.
 */
/*
* 获取用户列表
* */
export const getUsers = (state) => {
  return {
    list: state.user.list,
    pageInfo: state.user.pageInfo
  }
}

export const getCheckAll = (state) => {
  return state.user.checkAll
}
