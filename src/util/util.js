/**
 * Created by liljay on 2016/8/5.
 */
let forEach = require('lodash/forEach')
export const trim = (obj) => {
  forEach(obj, (val, key) => {
    if (typeof val === 'string') {
      obj[key] = val.trim()
    }
  })
}

export const dateFormat = (minutes) => {
  if (!minutes && /\d+/.test(minutes)) {
    return ''
  }
  let d = new Date()
  d.setTime(minutes)
  let y = d.getFullYear()
  let m = d.getMonth() + 1
  let day = d.getDate()
  return y + '-' + repeat(m, 2) + '-' + repeat(day, 2)
}

export const repeat = (val, len) => {
  val = val + ''
  return (new Array(len - val.length + 1)).join('0') + val
}

export const isUndefined = (val) => {
  return val === undefined
}
