<template>
  <div class="my_orders">
    <div class="container">
      <div class="header">
        <span>我的订单</span>
        <router-link to="/order_list/all">
          查看更多 >>>
        </router-link>
      </div>
      <ul class="servers">
        <router-link to="/order_list/0">
          <li>
            <van-icon size="45" :info="order_info.not_pay" color="#000" name="credit-pay"/>
            <span>待付款</span>
          </li>
        </router-link>
        <router-link to="/order_list/1">
          <li>
            <van-icon size="45" :info="order_info.not_send" color="#000" name="paid"/>
            <span>待发货</span>
          </li>
        </router-link>
        <router-link to="/order_list/2">
          <li>
            <van-icon size="45" :info="order_info.already_send" color="#000" name="logistics"/>
            <span>待收货</span>
          </li>
        </router-link>
        <router-link to="/order_list/3">
          <li>
            <van-icon size="45" :info="order_info.not_comment" color="#000" name="other-pay"/>
            <span>待评价</span>
          </li>
        </router-link>
        <router-link to="/order_list/4">
          <li>
            <van-icon size="45" :info="order_info.after_server" color="#000" name="flower-o"/>
            <span>售后</span>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyOrders",
    components: {},
    props: {
      order_info:{
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
  .my_orders{
    padding: 0 2%;

    .container{
      border: #aea699 1px solid;
      background-color: #faffef;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      padding: 8px 5px;

      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding:3px 10px;

        span {
          flex-grow: 1;
          font-size: 14px;
        }

        a{
          color: #aea699;
        }
      }

      .servers{
        display: flex;
        justify-content: space-around;
        text-align: center;
        margin-top: 10px;

        li {
          display: flex;
          flex-direction: column;
          font-size: 16px;

          span{
            color: #606060;
          }
        }
      }

    }
  }
</style>
