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
    path: '*',
    component: () => import('views/errors/NotFound.vue'),
    meta:{
      fullScreen:true
    }
  },
]
