import axios from 'axios';
import Qs from 'qs'
import store from '@/store'
import {Toast} from 'vant'
import router from '@/router'

const instance = axios.create();

// instance.defaults.baseURL = 'https://wx.17hxg.com/api';
instance.defaults.baseURL = 'http://www.66.com/api';
instance.defaults.timeout = 30000;
// instance.defaults.withCredentials = true // 允许携带cookie
// instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前加载图片
  // Toast.loading({
  //   message: '加载中...',
  //   duration:0,
  //   forbidClick: true
  // })

  return config;
}, function (error) {
  // 对请求错误做些什么
  // this.$toast.clear();
  console.log(error);
  console.log( typeof error);
  if(error.indexOf('timeout') != -1){
    console.log('请求超时');
  }else{
    console.log('not find');
  }
  return Promise.reject(error);
});


//普通请求处理请求数据
const HttpRequest = (url, method = 'get', params = {}, file = false) => {
  let config = {
    url: url,
    method: method, // default
  }

  if (method == 'get') {
    config.params = params;
  } else if (method == 'post') {
    config.data = Qs.stringify(params);
  }

  if (file) { //表示要上传文件
    config.headers = {
      'Content-Type': 'multipart/form-data',
    }
  }

  return instance.request(config);
}

/**
 * auth请求 需要token认证的
 * @param url 地址
 * @param method 方法 默认get
 * @param params 参数
 * @param file 是否上传文件
 * @returns {*}
 * @constructor
 */
const AuthRequest = (url, method = 'get', params = {}, file = false) => {
  let headers = {
    Authorization: 'Bearer ' + localStorage.getItem('userToken')
  }

  if (file && method == 'post') { //表示要上传文件
    headers = {
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      'Content-Type': 'multipart/form-data',
    }
  }

  let config = {
    url: url,
    method: method, // default
    headers
  }

  if (method == 'get') {
    config.params = params;
  } else if (method == 'post' && !file) {
    config.data = Qs.stringify(params);
  }else if (method == 'post' && file){ //上传文件时，不可加入这个QS
    config.data = params;
  }

  return instance.request(config);
}


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  //判断响应头中有没有新token
  // console.log(response);
  if(response.headers.authorization){
    let tokenArr = response.headers.authorization.split(" ");
    // console.log('替换前的token---' + localStorage.getItem('userToken'));
    localStorage.setItem('userToken',tokenArr[1]);
    // console.log('替换后的token---' + localStorage.getItem('userToken'));
  }

  switch (response.data.code) {
    case 200: //请求成功
      return response.data;
      break;

    case 204: //退出
      localStorage.removeItem('userToken');
      Toast({
        message: '退出成功，正在跳转',
        duration: 1500
      })

      setTimeout(() => {
        router.replace({
          path:'/home',
        });
      }, 1500)
      break;

    case 401: // 未认证
      localStorage.removeItem('userToken');
      Toast({
        message: '登录已经过期，请重新登录账号',
        duration: 1500
      })

      setTimeout(() => {
        router.replace({
          path:'/login',
        });
      }, 1500)
      break;

    case 403: // 403 权限不足
      Toast(response.data.msg);
      break;

    case 429: // 429 请求频繁
      Toast(response.data.msg);
      break;

    case 500: //服务器内部错误
      Toast(response.data.msg);
      break;

    default:
      return response.data;
  }

  // return response;
}, function (error) {
  // 对响应错误做点什么
  console.log(error);
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        Toast('错误请求');
        break;
      case 401:
        Toast('未授权，请重新登录');
        break;
      case 403:
        Toast('拒绝访问');
        break;
      case 404:
        Toast('请求错误,未找到该资源');
        break;
      case 405:
        Toast('请求方法未允许');
        break;
      case 408:
        Toast('请求超时');
        break;
      case 429:
        Toast('您点太快啦，请稍等一下哦~');
        break;
      case 500:
        Toast('服务器端出错');
        break;
      case 501:
        Toast('网络未实现');
        break;
      case 502:
        Toast('网络错误');
        break;
      case 503:
        Toast('服务不可用');
        break;
      case 504:
        Toast('网络超时');
        break;
      case 505:
        Toast('http版本不支持该请求');
        break;
      default:
        Toast('网络请求失败');
    }
  }else{
    Toast('网络请求超时，请重试');
    console.log(error);
    return Promise.reject(error);
  }
});

export {
  HttpRequest,
  AuthRequest
}
