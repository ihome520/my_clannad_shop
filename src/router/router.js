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
    path:'/buy_goods', //立即下单后的跳转页面
    name:'buy_goods',
    component:() => import('views/buy_goods/BuyGoods.vue'),
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
      fullScreen:true
    }
  },
  {
    path:'/user_addr_list', //用户地址列表
    name:'user_addr_list',
    component:() => import('views/user_addr_list/UserAddrList.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/user_addr_add', //用户地址添加
    name:'user_addr_add',
    component:() => import('views/user_addr_add/UserAddrAdd.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/user_addr_edit/:id', //用户地址修改
    name:'user_addr_edit',
    component:() => import('views/user_addr_edit/UserAddrEdit.vue'),
    meta:{
      requireAuth: true,
      fullScreen:true
    }
  },
  {
    path:'/register', //用户注册
    name:'register',
    component:() => import('views/register/Register.vue'),
    meta:{
      fullScreen:true
    }
  },
  {
    path:'/seckill', //秒杀商品列表页列表
    name:'seckill',
    component:() => import('views/sec_kill/SecKill.vue'),
    meta:{
      fullScreen:true
    }
  },
  {
    path:'/seckill_goods', //秒杀商品列表页列表
    name:'seckill_goods',
    component:() => import('views/seckill_goods/SecKillGoods.vue'),
    meta:{
      fullScreen:true
    }
  },
  {
    path:'/seckill_confirm', //秒杀商品确认订单页
    name:'seckill_confirm',
    component:() => import('views/seckill_confirm/SeckillConfirm.vue'),
    meta:{
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
