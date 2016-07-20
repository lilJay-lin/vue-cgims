/**
 * Created by linxiaojie on 2016/7/19.
 * 获取dom属性
 */
const forEach = require('lodash/forEach')
const isString = require('lodash/isString')
const cssStyle = (el) => {
  if (window.getComputedStyle) {
    return el.ownerDocument.defaultView.getComputedStyle(el, null)
  } else {
    return el.currentStyle
  }
}
let cssPrefixes = ['Webkit', 'moz', 'o', 'ms']
const cssProperty = (prop, style) => {
  if (style[prop]) return prop
  let className = prop.substr(0, 1).toUpperCase() + prop.substr(1)
  let newProp = prop
  forEach(cssPrefixes, (prefix) => {
    prop = prefix + className
    if (style[prop] !== undefined) {
      newProp = prop
    }
  })
  return newProp
}

/*
* @param prop{String|Object}: String时为样式设置，Object为赋值
* */
export const css = (el, props) => {
  if (el && el.nodeType !== 1) {
    return ''
  }
  if (arguments.length < 2) {
    throw new Error('必须传入两个参数')
  }
  let style = el.style
  if (isString(props)) {
    return cssStyle(el)[props]
  } else {
    forEach(props, function (value, prop) {
      prop = cssProperty(prop, style)
      style[prop] = value
    })
  }
}

