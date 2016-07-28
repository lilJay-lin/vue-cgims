/**
 * Created by linxiaojie on 2016/7/20.
 */
/*
* 获取用户列表
* */
export const getRoles = (state) => {
  return {
    searchKeyword: state.role.searchKeyword,
    list: state.role.list,
    pageInfo: state.role.pageInfo
  }
}

export const getDetailRole = (state) => {
  return state.role.detail
}

export const getCheckAll = (state) => {
  return state.role.checkAll
}

export const getUIOptions = (state) => {
  return state.role.ui.mode
}
