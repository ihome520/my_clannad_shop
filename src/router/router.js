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
    component: () => import('views/cart/Cart.vue')
  },
  {
    path: '/user',
    name:'user',
    component: () => import('views/user/User.vue')
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
    path: '*',
    component: () => import('views/errors/NotFound.vue'),
    meta:{
      fullScreen:true
    }
  },
]
