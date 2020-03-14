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
      <van-goods-action-button :loading="sumbiting" class="submit_btn" type="danger" text="提交订单" @click="sumbitOrder" />
    </van-goods-action>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";
  import UserAddress from "components/UserAddress/UserAddress";
  import OrderInfo from "./components/OrderInfo";

  export default {
    name: "BuyGoods",
    components: {
      UserAddress,
      OrderInfo
    },
    props: {},
    data() {
      return {
        sku_list:this.$route.query.sku_list,
        goods_id:this.$route.query.goods_id,
        goods_num:this.$route.query.goods_num,
        user_address: [],
        sumbiting:false,//提交状态
        cart_list:[],
        user_addr_id:0,//当前选中的地址id
        express_type:1,//快递配送类型 1是快递 2是自提
        total_price:0,
        remark:'',//备注
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
    mounted() {
      this.getConfirmInfo();
    },
    methods: {
      getConfirmInfo(){
        let data ={
          sku_list:this.sku_list,
          goods_id:this.goods_id,
          goods_num:this.goods_num,
        }
        AuthRequest('/order/buy_goods','post',data).then(res=>{
          if(res.code != 200){
            this.$toast(res.msg);

            setTimeout(()=>{
              this.$router.back();
            },1500)
          }else{
            //订单确认页
            console.log(res);
            this.user_address = res.data.user_address;
            this.cart_list = res.data.cart_list;
          }
        })
      },
      onClickLeft(){
        this.$router.back();
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
        this.remark = remarks;
      },
      /**
       * 提交订单
       */
      sumbitOrder(){
        this.sumbiting = true;
        AuthRequest('/order/createOrder','post',{
          user_addr_id:this.user_addr_id,
          goods_id:this.goods_id,
          sku_list:this.sku_list,
          goods_num:this.goods_num,
          remark:this.remark,
          express_type:this.express_type
        }).then(res=>{
          console.log(res);
          if(res.code != 200){
            this.sumbiting = false
            this.$toast(res.msg);
          }else{
            //跳转到支付页面
            this.$router.replace({
              path:'/order_pay',
              query:{order_sn:res.data.order_sn}
            })
          }
        }).catch(err=>{
          this.sumbiting = false
        })
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
