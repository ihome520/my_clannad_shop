<template>
  <div class="user">
    <van-nav-bar title="用户个人中心">
      <van-icon class="setting_icon" name="setting-o" slot="right" />
    </van-nav-bar>
    <user-info :user_info="user_info"/>
    <my-orders :order_info="order_info"/>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";
  import UserInfo from "./components/UserInfo";
  import MyOrders from "./components/MyOrders";

  export default {
    name: "User",
    components:{
      UserInfo,
      MyOrders
    },
    data(){
      return {
        user_info:{},
        order_info:{}
      }
    },
    mounted(){
      this.getUserInfo();
    },
    methods:{
      //检查是否有token，如果没有，表示没有登录
      getUserInfo(){

        AuthRequest('/user/index').then(res=>{
          if(res.code != 200){
            this.$toast(res.msg);
            setTimeout(()=>{
              this.$route.replace('/home');
            },1500)
          }else{
            this.user_info = res.data.user_info;
            this.order_info = res.data.order_info;
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .setting_icon{
    touch-action: none;
  }
</style>
