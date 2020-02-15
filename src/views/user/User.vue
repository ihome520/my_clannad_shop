<template>
  <div class="user">
    <van-nav-bar title="用户个人中心">
      <van-icon class="setting_icon" size="20" name="setting-o" @click="toSetting" slot="right" />
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
      toSetting(){
        this.$router.replace('/setting');//进入设置
      },
      //检查是否有token，如果没有，表示没有登录
      getUserInfo(){
        AuthRequest('/user/index').then(res=>{
          if(res.code != 200){
            this.$toast(res.msg);

            //不存在或者锁定的情况 要删除本地token
            localStorage.removeItem('userToken');

            setTimeout(()=>{
              this.$router.replace('/home');
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
