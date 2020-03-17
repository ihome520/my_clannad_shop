/**
 *  公共方法库
 */
import {Toast} from 'vant'
import router from '@/router'

/**
 * 检查是否已经登录
 * @param redirect 默认跳到
 * @returns {boolean}
 */
const checkLogin = (redirect = true) => {
  //先判断用户是否已经登录
  if (!localStorage.getItem('userToken')) {
    Toast('请先登录后再操作');
    //将要返回的地址存入路由
    let path = router.app._route.fullPath;

    console.log(router);

    if (redirect) {
      setTimeout(() => {
        router.push({
          path: '/login',
          query: {redirect: path}
        });
      }, 1000)
    } else {
      setTimeout(() => {
        router.push({
          path: '/login',
        });
      }, 1000)
    }
    return false;
  } else {
    return true;
  }
}
const toDecimal = (x) => {
    let f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(x * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
}

/**
 * 时间字符串转时间戳
 * @param date 时间字符串 2015-03-05 17:59:00
 * @returns {number}
 * @constructor
 */
const strToTime = (date) => {
  date = date.substring(0,19);
  date = date.replace(/-/g,'/');
  return new Date(date).getTime() / 1000;
}

/**
 * 裁剪字符串
 * @param str 字符串
 * @param start 字符串
 * @param cutLength 裁剪的长度
 * @param exts 尾部添加字符串
 * @returns {string}
 */
const cutString = (str,start = 0,cutLength = 16 , exts = '...')=>{
  if(str.length > cutLength){
    return str.substring(start,cutLength) + exts;
  }else{
    return str;
  }
}

export default {
  checkLogin,
  toDecimal,
  strToTime,
  cutString
}
