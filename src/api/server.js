/**
 * Created by linxiaojie on 2016/7/19.
 */
let qwest = require('qwest')

/*
 * 默认配置
 * */
qwest.base = window.__BASE_PATH__ || '/'
qwest.setDefaultOptions({
  responseType: 'json'
})
export default {
  request: ({
    url,
    method = 'get',
    data = null,
    options = null,
    before = function () {}
    }) => {
    return qwest[method](url, data, options, before).then((xhr, res) => {
      return new Promise((resolve, reject) => {
        if (res.status === 1) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  }
}
