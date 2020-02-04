import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import {Toast} from 'vant'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    //判断该路由是否需要登录权限
    if (localStorage.getItem('userToken')) {
      //如果token存在，则继续
      next();
    } else {
      Toast('请先登录后再操作');
      setTimeout(()=>{
        next({
          path: '/login', query: {redirect: to.fullPath}
          //将跳转的路由path作为参数，登录成功后跳转到该路由}) 
        })
      },800)
    }
  }else{
    next();
  }
})


export default router
