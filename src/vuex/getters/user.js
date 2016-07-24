/**
 * Created by linxiaojie on 2016/7/20.
 */
/*
* 获取用户列表
* */
export const getUsers = (state) => {
  return {
    searchKeyword: state.user.searchKeyword,
    list: state.user.list,
    pageInfo: state.user.pageInfo
  }
}

export const getDetailUser = (state) => {
  return state.user.detail
}

export const getCheckAll = (state) => {
  return state.user.checkAll
}

export const getUIOptions = (state) => {
  return state.user.ui.mode
}
