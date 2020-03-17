<template>
  <div class="user_info">
    <div class="header">
      <div class="user">
        <img :src="user_info.thumb" class="thumb"/>
        <div class="header_right">
          <div class="user_name">
            <span>{{ user_info.nick_name }}</span>
            <van-tag round type="success">购物达人</van-tag>
          </div>
          <div class="tel">账户余额：￥{{ user_info.balance }}</div>
          <div class="tel">Tel: {{ user_info.tel }}</div>
        </div>
      </div>

      <ul class="other">
        <router-link to="/">
          <li>
            <span>45</span>
            <span>收藏夹</span>
          </li>
        </router-link>
        <router-link to="/">
          <li>
            <span>45</span>
            <span>足迹</span>
          </li>
        </router-link>
        <router-link to="/">
          <li>
            <span>45</span>
            <span>优惠券</span>
          </li>
        </router-link>
        <router-link to="/">
          <li>
            <span>45</span>
            <span>红包</span>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    components: {},
    props: {
      user_info:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data() {
      return {}
    },
    watch: {},
    filter: {},
    methods: {},
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped lang="less">
  .user_info {
    padding: 2%;
  }

  .header {
    display: flex;
    flex-direction: column;
    border: #d6d9da 1px solid;
    border-radius: 5px;
    padding: 10px;
    background-color: #b5ec9e;

    .user {
      display: flex;

      .thumb{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: #e0a1b9 3px dashed;
      }

      .header_right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;

        .user_name {
          font-size: 22px;
        }

        .tel {
          font-size: 16px;
        }
      }
    }


    .other {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-top: 10px;

      li {
        display: flex;
        flex-direction: column;

        span:nth-child(1) {
          font-size: 22px;
          color: #606060;
        }

        span:nth-child(2) {
          font-size: 14px;
          margin-top: 5px;
          color: #000;
        }

      }
    }
  }
</style>
