import axios from 'axios';
import Qs from 'qs'
import store from '@/store'
import {Toast} from 'vant'
import router from '@/router'

const instance = axios.create();

instance.defaults.baseURL = 'https://wx.17hxg.com/api';
instance.defaults.timeout = 3000;

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
const HttpRequest = (url,method = 'get',params = {},file = false) => {
  let config = {
    url:url,
    method: 'get', // default
  }

  if(method == 'get'){
      config.params = params;
  }else if(method == 'post'){
    config.data = qs.stringify(params);
  }

  if(file){ //表示要上传文件
    config.headers = {
      'Content-Type': 'multipart/form-data',
    }
  }

  return instance.request(config);
}


const AuthRequest = (url,method = 'get',params = {},file = false) => {
  let headers = {
    Authrization:'Bearer ' + store.getters.getToken,
  }

  if(file && method == 'post'){ //表示要上传文件
    headers = {
      Authrization:'Bearer ' + store.getters.getToken,
      'Content-Type': 'multipart/form-data',
    }
  }

  let config = {
    url:url,
    method: 'get', // default
    headers
  }

  if(method == 'get'){
    config.params = params;
  }else if(method == 'post'){
    config.data = Qs.stringify(params);
  }

  return instance.request(config);
}


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  //判断响应头中是否有新的token
  // Toast.clear();
  // console.log(response.data.code);

  switch (response.data.code){
    case 401:
      Toast({
        message:'请先登录',
        duration:1500
      })

      setTimeout(()=>{
        router.replace('/login');
      },1500)
      break;

    case 403:
      Toast({
        message:'访问权限不足',
      })
      break;

    case 200:
      return response.data;
    default:

  }



  // return response;
}, function (error) {
  // 对响应错误做点什么
  // Toast.clear();
  return Promise.reject(error);
});

export {
  HttpRequest,
  AuthRequest
}
