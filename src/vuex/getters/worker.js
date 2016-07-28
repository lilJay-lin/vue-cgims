/**
 * Created by linxiaojie on 2016/7/20.
 */
/*
* 获取用户列表
* */
export const getWorkers = (state) => {
  return {
    search: state.worker.search,
    list: state.worker.list,
    pageInfo: state.worker.pageInfo
  }
}

export const getDetailWorker = (state) => {
  return state.worker.detail
}

export const getCheckAll = (state) => {
  return state.worker.checkAll
}

export const getUIOptions = (state) => {
  return state.worker.ui.mode
}
