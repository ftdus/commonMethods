/*
 * @Author: Alvin
 * @Date: 2018-12-16 12:15:22
 * @Last Modified by: Alvin
 * @Last Modified time: 2018-12-16 12:15:22
 * 实例工具库
 */
// 浏览器兼容storage
let supportStorage = function () {
  let flag = false
  if (!window.storage) {
    throw new Error("浏览器不支持localStorage")
  } else {
    flag = true
  }
  return flag
}
// 工具类
class Util {
  /**
   * 替换字符串中所有得字符串
   * @param {*全局替换字符串} str
   * @param {*目标字符串} targetStr
   * @param {*要替换得新字符串} newStr
   */
  replaceStr (str, targetStr, newStr) {
    str = Util.isString(str) ? str : str.toString()
    let reRegExp = new RegExp(targetStr, "g")
    return str.replace(reRegExp, newStr)
  }
  /**
   *
   * @param {*storage名} name
   * @param {*storage值} value
   * @param {*类型 session/local} type
   */
  setStorage (name, value, type = "local") {
    let storage
    if (supportStorage) {
      let _value = JSON.stringify(value)
      if (type === 'local') {
        storage = window.localStorage
      } else {
        storage = window.sessionStorage
      }

      storage.setItem(name, _value)
    }
  }
  getStorage = (name, type = "local") => {
    let storage
    if (type === 'local') {
      storage = window.localStorage
    } else {
      storage = window.sessionStorage
    }
    return JSON.parse(storage.getItem(name))
  }
  removeStorage = (name, type = "local") => {
    let storage
    if (type === 'local') {
      storage = window.localStorage
    } else {
      storage = window.sessionStorage
    }
    return storage.removeItem(name)
  }
  clearStorage = (type = "local") => {
    let storage
    if (type === 'local') {
      storage = window.localStorage
    } else {
      storage = window.sessionStorage
    }
    return storage.clear()
  }
  /**
   * 获取IE历览器版本 火狐获取可能有点儿问题
   * 返回number类型当前大浏览器的大版本号
   */
  getIeVersion () {
    const browser = navigator.appName
    const bVersion = navigator.appVersion
    const version = bVersion.split(';')
    const trim_version = version[1] ? version[1].replace(/[ ]/g, '') : ''
    if (browser === 'Microsoft Internet Explorer') {
      return parseInt(trim_version.substr(4, 1))
    } else {
      return 0
    }
  }
  /**
   * 绑定事件
   * @param {*} element
   * @param {*} eType
   * @param {*} handle
   * @param {*} bol
   */
  addEvent (element, eType, handle, bol = true) {
    if (element.addEventListener) {
      element.addEventListener(eType, handle, bol)
    } else if (element.attachEvent) {
      element.attachEvent(eType, handle, bol)
    } else {
      element["on" + eType] = null
    }
  }
}

/**
 * 函数防抖动
 * @param {*执行函数} fn
 * @param {*时间间隔} wait
 */
Util._debance = function (fn, wait) {
  let timer = null
  return function () {
    let _this = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, wait)
  }
}
/**
 * 节流函数
 * @param {*要执行的函数} fn
 * @param {*等待时间} wait
 */
Util._throttle = function (fn, wait) {
  let _lastTime = null
  return function () {
    let _nowTime = new Date()
    if (_nowTime - _lastTime > wait || !_lastTime) {
      fn()
      _lastTime = _nowTime
    }
  }
}
/**
 * @param {*要获取的url参数，无论是hash还是search值}
 */
Util.GetQueryString = function(name){
  var after = window.location.hash.split("?")[1]||window.location.search.split("?")[1];
  if(after){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = after.match(reg);
    if(r != null){
      return  decodeURIComponent(r[2]);
    }
    else{
      return null;
    }
  }
}
/**
 * 计算字符串长度
 * @param {*将要计算的字符串}
 * @param {*是否区分中英文}
 * 中文默认长度为2，英文默认为1
 */
Util.charLength = function (c,type=true) {
  c = c || '';
  var b = 0;
  for (var a = 0; a < c.length; a++) {
    if(type){
      if ((c.charCodeAt(a) >= 0) && (c.charCodeAt(a) <= 255)) {
          b++
      } else {
          b += 2
      }
    }else{
      b++
    }
  }
  return b
}
/**
 * @param {*格式化的金额}
 */
Util.moneyFormat = function (num) {
  num = num + "";
  var re = /(-?\d+)(\d{3})/;
  if(!re.test(num)) throw new Error ('The argument is not of type number')
  num = num.replace(re, "$1,$2");
  return num;
}
// 判断浏览版本
// isFF
Util.isFF=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return UA && UA.match(/firefox\/(\d+)/)
}
// isPhantomJS
Util.isPhantomJS=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return UA && /phantomjs/.test(UA)
}
// isChrome
Util.isChrome=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return UA && /chrome\/\d+/.test(UA) && !isEdge
}
// isIOS
Util.isIOS=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
}
// isAndroid
Util.isAndroid=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
}
// isEdge
Util.isEdge=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return UA && UA && UA.indexOf('edge/') > 0
}
// isIE
Util.isIE=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return UA && /msie|trident/.test(UA)
}
// isIE9
Util.isIE9=function () {
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  return UA && UA.indexOf('msie 9.0') > 0
}
export default new Util()
