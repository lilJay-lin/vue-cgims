/**
 * Created by linxiaojie on 2016/7/19.
 */
let qwest = require('qwest')

/*
* 默认配置
* */
qwest.base = 'http://localhost:8080'
qwest.setDefaultDataType('json')

export default {
  request: ({
    url,
    method = 'get',
    data = null,
    options = null,
    before = function () {}
  }) => {
    return qwest[method](url, data, options, before)
  }
}
