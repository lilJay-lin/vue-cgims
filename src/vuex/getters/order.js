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

export const getDetailOrder = (state) => {
  return state.order.detail
}

export const getCheckAll = (state) => {
  return state.order.checkAll
}

export const getUIOptions = (state) => {
  return state.order.ui.mode
}
export const isPersonal = (state) => {
  return state.order.ui.personal
}
let allOrderStatus = ['未收未付', '未收需付', '已收未付', '已收需付', '未收未完', '未收完成', '已收未完', '已收完成', '未收失败', '已收失败']
export const getOrderStatus = (state) => {
  return state.order.ui.personal ? ['未收未付', '未收需付', '已收未付', '已收需付', '未收失败', '已收失败'] : allOrderStatus
}
export const getQueryOrderStatus = (state) => {
  return state.order.ui.personal ? ['未收未付', '未收需付', '已收未付', '已收需付'] : allOrderStatus
}
export const getBaseUrl = (state) => {
  return state.order.ui.personal ? '/user/' + state.auth.id + '/order' : '/order'
}
