/**
 * Created by linxiaojie on 2016/7/20.
 */
/*
* 获取用户列表
* */
export const getOrders = (state) => {
  return {
    search: state.order.search,
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
export const getOrderStatus = (state) => {
  return ['未收未付', '已收未付', '未收需付', '已收需付', '未收未完', '未收完成', '已收未完', '已收完成', '未收失败', '已收待退']
}
export const getBaseUrl = (state) => {
  return state.order.ui.personal ? '/user/' + state.auth.id + '/order' : '/order'
}
/*
export const getAddOrderStatus = (state) => {
  let newStatus = state.order.ui.personal ? allOrderStatus.slice(0, 4) : allOrderStatus.slice(0, 8)
  return newStatus
}*/

export const hasCheck = (state) => {
  return state.order.list.some((order) => {
    return order.checked
  })
}

export const getSlaves = (state) => {
  return state.auth.slaves
}
