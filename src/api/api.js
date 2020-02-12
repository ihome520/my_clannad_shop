import axios from 'axios';
import Qs from 'qs'
import store from '@/store'
import {Toast} from 'vant'
import router from '@/router'

const instance = axios.create();

instance.defaults.baseURL = 'https://wx.17hxg.com/api';
// instance.defaults.baseURL = 'http://www.66.com/index.php/api';
instance.defaults.timeout = 30000;

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
  console.log(response);
  if(response.headers.authorization){
    let tokenArr = response.headers.authorization.split(" ");
    console.log('替换前的token---' + localStorage.getItem('userToken'));
    localStorage.setItem('userToken',tokenArr[1]);
    console.log('替换后的token---' + localStorage.getItem('userToken'));
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

    case 500: //服务器内部错误
      Toast(response.data.msg);
      break;

    default:
      return response.data;
  }

  // return response;
}, function (error) {
  // 对响应错误做点什么
  // Toast.clear();
  console.log(error);
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = `连接错误${error.response.status}`;
    }
  }
  console.log(error);
  return Promise.reject(error);
});

export {
  HttpRequest,
  AuthRequest
}
