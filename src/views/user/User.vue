<template>
  <div class="user">
    <van-nav-bar title="用户个人中心">
      <van-icon class="setting_icon" name="setting-o" slot="right" />
    </van-nav-bar>
    <user-info/>
    <my-orders/>
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

      }
    },
    mounted(){
      this.getUserInfo();
    },
    methods:{
      //检查是否有token，如果没有，表示没有登录
      getUserInfo(){
        // let token = this.$store.state.user.token;
        //
        // if(!token){ //未登录
        //   this.$router.replace('/login');
        // }
        console.log(this.$router.currentRoute);
      }
    }
  }
</script>

<style scoped lang="less">
  .setting_icon{
    touch-action: none;
  }
</style>
