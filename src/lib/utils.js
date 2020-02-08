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

export default {
  checkLogin,
  toDecimal
}
