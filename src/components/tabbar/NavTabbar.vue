<template>
  <van-tabbar v-model="active">
    <van-tabbar-item replace class="nav_bar_item" v-for="(item,index) in tabbar" :key="index" :to="item.path"
                     :icon="item.icon">{{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant' //引入vantUI库

  export default {
    name: "NavTabbar",
    components: {
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        active: 0,
        tabbar: [
          {
            name: '首页',
            path: '/home',
            icon: 'wap-home-o',
            pathName: 'home',
          },
          {
            name: '分类',
            path: '/category',
            icon: 'apps-o',
            pathName: 'category',
          },
          {
            name: '购物车',
            path: '/cart',
            icon: 'shopping-cart-o',
            pathName: 'cart',
          },
          {
            name: '我的',
            path: '/user',
            icon: 'manager-o',
            pathName: 'user',
          }
        ]
      }
    },
    watch: {
      '$route' (to, from) {// 对路由变化作出响应
        this.setActive();
      }
    },
    created(){

      // console.log(path);
      // this.setActive(path);//设置导航的选中状态
    },
    methods:{
      setActive(){
        let path = window.location.href.split("#/")[1];

        let index = this.tabbar.findIndex(res=>{
          return res.pathName == path;
        })

        // console.log(index);
        // console.log(path);
        if(index != -1){
          this.active = index;
        }

        // const href = window.location.href.split("#/")[1];
        // for(let i=0;i<4;i++){
        //   if(href==this.tabbar[i]){
        //     this.active=i;
        //   }
        // }
      }
    }
  }
</script>

<style scoped>
  .nav_bar_item{
    font-size: 16px;
  }
</style>
