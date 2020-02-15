export default [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name:'home',
    component: () => import('views/home/Home.vue'),
    meta:{
      fullScreen:false,
    }
  },
  {
    path: '/category',
    name:'category',
    component: () => import('views/category/Category.vue')
  },
  {
    path: '/cart',
    name:'cart',
    component: () => import('views/cart/Cart.vue'),
    meta:{
      requireAuth: true
    }
  },
  {
    path: '/user',
    name:'user',
    component: () => import('views/user/User.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/goods/:id',
    name:'user',
    component: () => import('views/goods/Goods.vue'),
    meta:{
      fullScreen:true,
    }
  },
  {
    path:'/login',
    name:'login',
    component: () => import('views/login/Login.vue'),
    meta:{
      fullScreen:true
    }
  },
  {
    path:'/order_confirm',
    name:'order_confirm',
    component:() => import('views/order_comfirm/OrderConfirm.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/order_pay',
    name:'order_pay',
    component:() => import('views/order_pay/OrderPay.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/order_list/:type',
    name:'order_list',
    component:() => import('views/order_list/OrderList.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/order_detail/:order_sn',
    name:'order_detail',
    component:() => import('views/order_detail/OrderDetail.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/setting',
    name:'setting',
    component:() => import('views/setting/Setting.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/user_data',
    name:'user_data',
    component:() => import('views/user_data/UserData.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/pswd_change', //密码修改 发送验证码页
    name:'pswd_change',
    component:() => import('views/pswd_change/PswdChange.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/set_password/:verify_str', //密码修改 修改密码页
    name:'set_password',
    component:() => import('views/set_password/SetPassWord.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/wx_login_auth', //微信登录授权验证页
    name:'wx_login_auth',
    component:() => import('views/wx_login_auth/WxLoginAuth.vue'),
    meta:{
      fullScreen:true
    }
  },
  {
    path:'/search', //搜索页面
    name:'search',
    component:() => import('views/search/Search.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path: '*',
    component: () => import('views/errors/NotFound.vue'),
    meta:{
      fullScreen:true
    }
  },
]
