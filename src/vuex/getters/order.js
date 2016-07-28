/**
 * Created by linxiaojie on 2016/7/20.
 */
/*
* 获取用户列表
* */
export const getOrders = (state) => {
  return {
    list: state.order.list,
    pageInfo: state.order.pageInfo
  }
}

export const getDetailRole = (state) => {
  return state.order.detail
}

export const getCheckAll = (state) => {
  return state.order.checkAll
}

export const getUIOptions = (state) => {
  return state.order.ui.mode
}
