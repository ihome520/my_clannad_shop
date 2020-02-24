<template>
  <div class="setting">
    <van-nav-bar fixed title="设置" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="content">
      <div class="user">
        <div class="user_item">
          <router-link to="/user_data">
            <div>个人资料</div>
          </router-link>
        </div>
        <div class="user_item">
          <router-link to="/pswd_change">
            <div>密码修改</div>
          </router-link>
        </div>
        <div class="user_item">
          <router-link to="/user_addr_list">
            <div>收货地址</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="logout">
      <van-button type="warning" @click="logout">退出</van-button>
    </div>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";

  export default {
    name: "Setting",
    components: {},
    props: {},
    data() {
      return {}
    },
    watch: {},
    filter: {},
    methods: {
      onClickLeft() {
        this.$router.replace('/user');
      },
      logout(){
        AuthRequest('/login/logout').catch(err=>{
          console.log(err);
        });
      }
    },
    created() {

    },
  }

</script>

<style scoped lang="less">
  .content {
    margin-top: 46px;
    font-size: 18px;

    a {
      color: #606060;

      div{
        padding: 3%;
      }
    }

    .user_item {
      border-bottom: #d8d8d8 1px solid;
    }

  }

  .logout{
    padding: 5%;

    button{
      width: 100%;
      font-size: 16px;
    }
  }
</style>
