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
  } else if (method == 'post') {
    config.data = Qs.stringify(params);
  }

  return instance.request(config);
}


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  //判断响应头中有没有新token
  console.log(response);
  if(response.headers.Authrization){
    let tokenArr = response.headers.Authrization.split(" ");
    localStorage.setItem('userToken',tokenArr[1]);
  }

  switch (response.data.code) {
    case 200: //请求成功
      return response.data;
      break;

    case 204: //退出
      router.replace('/home');
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
  return Promise.reject(error);
});

export {
  HttpRequest,
  AuthRequest
}
