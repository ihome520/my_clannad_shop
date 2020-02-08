<template>
  <div class="order_confirm">
    <van-nav-bar fixed title="订单确认" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="content">
      <user-address :user_address="user_address" @change_address="change_address"/>
      <order-info @changeExpress="changeExpress" @computed_total_price="computed_total_price" @setRemarks="setRemarks" :cart_list="cart_list"/>
    </div>
    <van-goods-action class="goods_action">
      <div class="total_price" slot="default">
        合计：<span>￥{{ total_price }} 元</span>
      </div>
      <van-goods-action-button class="submit_btn" type="danger" text="提交订单" @click="sumbitOrder" />
    </van-goods-action>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";
  import UserAddress from "./components/UserAddress";
  import OrderInfo from "./components/OrderInfo";

  export default {
    name: "OrderConfirm",
    components: {
      UserAddress,
      OrderInfo
    },
    props: {},
    data() {
      return {
        cart_ids: 0,
        user_address: [],
        cart_list:[],
        user_addr_id:0,//当前选中的地址id
        express_type:1,//快递配送类型 1是快递 2是自提
        total_price:0,
        remarks:'',//备注
      }
    },
    watch: {

    },
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background-color:#eaeaea')
    },
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    },
    created() {
      this.cart_ids = this.$route.query.cart_ids
    },
    mounted() {
      this.getConfirmInfo();
    },
    methods: {
      getConfirmInfo(){
        let cd = this.cart_ids
        AuthRequest('/cart/settlement','post',{cart_ids:cd}).then(res=>{
          if(res.code != 200){
            this.$toast(res.msg);

            this.$router.replace('/cart'); //发生错误，调回购物车页面
          }else{
            //订单确认页
            console.log(res);
            this.user_address = res.data.user_address;
            this.cart_list = res.data.cart_list;
          }
        })
      },
      onClickLeft(){
        this.$router.replace('/cart');
      },
      /**
       * 改变配送地址
       * @param address_id
       */
      change_address(address_id){
        this.user_addr_id = address_id;
      },
      //改变配送方式
      changeExpress(express_type){
        this.express_type = express_type;
      },
      /**
       * 获取计算的价格
       */
      computed_total_price(price){
        this.total_price = price;
      },
      setRemarks(remarks){
        this.remarks = remarks;
      },
      sumbitOrder(){

      }
    },

  }

</script>

<style scoped lang="less">
  .content{
    position:absolute;
    left: 0;
    top: 50px;
    bottom: 55px;
    overflow: auto;
    width: 100%;
  }
 .total_price{
   font-size: 16px;

   span{
     color: red;
   }
 }

 .goods_action{
   display: flex;
   justify-content: flex-end;

   .submit_btn{
     max-width: 30%;
   }
 }



</style>
