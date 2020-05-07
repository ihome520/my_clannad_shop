<template>
  <div class="order_confirm">
    <van-nav-bar fixed title="订单确认" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="content">
      <user-address :user_address="user_address" @change_address="change_address"/>
      <order-info :goods_total_price="goods_total_price" @changeExpress="changeExpress" :total_goods="total_goods" @setRemarks="setRemarks" :cart_list="cart_list"/>
      <div class="coupons_select">
        <span>选择优惠券</span>
        <span @click="showCoupons">{{ coupon_name }}</span>
      </div>
    </div>
    <coupons ref="coupons" @selectCoupon="selectCoupon" :coupons="coupons" class="coupons_box"/>
    <van-goods-action class="goods_action">
      <div class="total_price" slot="default">
        合计：<span>￥{{ total_price }} 元 (含运费 {{express_price}} 元)</span>
      </div>
      <van-goods-action-button :loading="sumbiting" class="submit_btn" type="danger" text="提交订单" @click="sumbitOrder"/>
    </van-goods-action>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";
  import UserAddress from "components/UserAddress/UserAddress";
  import OrderInfo from "./components/OrderInfo";
  import Coupons from "./components/Coupons";

  export default {
    name: "OrderConfirm",
    components: {
      UserAddress,
      OrderInfo,
      Coupons
    },
    props: {},
    data() {
      return {
        cart_ids: 0,
        user_address: [],
        sumbiting: false,//提交状态
        cart_list: [],
        coupons: [],
        user_addr_id: 0,//当前选中的地址id
        express_type: 1,//快递配送类型 1是快递 2是自提
        total_price: 0,
        express_price:0,
        free_express_price:false,//是否为免邮
        coupon_price: 0,//优惠券金额
        remark: '',//备注
        user_coupon_id: 0,
        coupon_name: '点击选择',
        goods_total_price:0,
        total_goods:0,
        coupon_type:0,//优惠券类型，用于判断是否是包邮券，如果选择了自提，那么将不消耗此优惠券。
      }
    },
    watch: {
      cart_list:{
        handler(newValue){
          this.calcGoods(newValue); //计算价格
        },
        deep:true
      },
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'background-color:#eaeaea')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    },
    created() {
      this.cart_ids = this.$route.query.cart_ids
    },
    mounted() {
      this.getConfirmInfo();
    },
    methods: {
      getConfirmInfo() {
        let cd = this.cart_ids
        AuthRequest('/cart/settlement', 'post', {cart_ids: cd}).then(res => {
          if (res.code != 200) {
            this.$toast(res.msg);

            this.$router.replace('/cart'); //发生错误，调回购物车页面
          } else {
            //订单确认页
            this.user_address = res.data.user_address;
            this.cart_list = res.data.cart_list;
            this.coupons = res.data.can_use_coupons;//获得可使用的优惠券列表
          }
        })
      },
      onClickLeft() {
        this.$router.replace('/cart');
      },
      /**
       * 改变配送地址
       * @param address_id
       */
      change_address(address_id) {
        this.user_addr_id = address_id;
      },
      //改变配送方式
      changeExpress(express_type) {
        if(express_type == 2){
          if(this.coupon_type == 5){
            this.user_coupon_id = 0;
            this.$refs['coupons'].coupons_index = 0;
            this.coupon_type = 0;
            this.coupon_name = '点击选择';
          }
        }
        this.express_type = express_type;
        // this.$forceUpdate(); //重绘
        this.calcGoods();//重新计算价格
      },
      //设置备注
      setRemarks(remarks) {
        this.remark = remarks;
      },
      //显示可用优惠券
      showCoupons() {
        this.$refs.coupons.coupons_ctrl = true;
      },
      //选择优惠券后
      selectCoupon(user_coupon_id) {
        if (user_coupon_id != '0') {
          this.free_express_price = false; //默认是不免邮

          this.coupons.forEach(item => {
            if (item.id == user_coupon_id) {
              this.coupon_type = item.coupon_type;
              //优惠券类型 1.店铺满减 2.店铺折扣 3.通用满减 4.通用折扣 5.免邮 6.指定商品
              if(item.coupon_type == 1 || item.coupon_type == 3 || item.coupon_type == 6){
                this.coupon_name = item.coupon.coupon_name + '(-' + item.dec_price + '元)';
                this.coupon_price = item.dec_price;//优惠金额
                this.user_coupon_id = user_coupon_id;

                return ;
              }else if(item.coupon_type == 2){

              }else if(item.coupon_type == 4){
                let dec_price =this.goods_total_price - this.goods_total_price * (item.discount / 100);
                dec_price = this.$utils.toDecimal(dec_price);

                this.coupon_name = item.coupon.coupon_name + '(-' + dec_price + '元)';
                this.coupon_price = dec_price;

                this.user_coupon_id = user_coupon_id;

                return ;
              }else if(item.coupon_type == 5){
                if(this.express_type == 2){
                  this.$toast('当前订单不需要邮费，无法使用该优惠券');
                  this.$refs['coupons'].coupons_index = 0;

                  // this.$forceUpdate(); //重绘
                  return ;
                }else{
                  this.free_express_price = true;
                  this.coupon_name = item.coupon.coupon_name;
                  this.coupon_price = 0;

                  this.user_coupon_id = user_coupon_id;
                }
              }
            }
          })
        } else {
          this.coupon_name = '点击选择';
          this.coupon_price = 0;//优惠金额
          this.user_coupon_id = 0;
        }

        this.calcGoods();//重新计算价格
      },
      /**
       * 计算价格
       * @param cart_list
       */
      calcGoods(){
        this.total_price = this.goods_total_price;

        if(!this.goods_total_price){
          this.cart_list.forEach(item=>{
            this.goods_total_price += parseFloat(item.price) * item.number;
            this.total_goods += item.number;
          })
          this.goods_total_price = this.$utils.toDecimal(this.goods_total_price);//保存2位小数，且保留0.00位数
          this.total_price = this.goods_total_price;
        }

        if(this.free_express_price){ //免邮
          this.express_price = 0.00;
        }else if(this.express_type == 1){
          this.express_price = 8.00;
          this.total_price =  parseFloat(this.total_price) + parseFloat(this.express_price);
        }else{
          this.express_price = 0.00;
        }

        //计算
        if(this.user_coupon_id){
          this.total_price -= parseFloat(this.coupon_price);
        }

        this.total_price = this.$utils.toDecimal(this.total_price);//保存2位小数，且保留0.00位数
      },
      /**
       * 提交订单
       */
      sumbitOrder() {
        this.sumbiting = true;
        AuthRequest('/cart/confirmOrder', 'post', {
          user_addr_id: this.user_addr_id,
          cart_ids: this.cart_ids,
          remark: this.remark,
          express_type: this.express_type,
          coupon_id:this.user_coupon_id,
        }).then(res => {
          if (res.code != 200) {
            this.sumbiting = false
            this.$toast(res.msg);
          } else {
            //跳转到支付页面
            this.$router.replace({
              path: '/order_pay',
              query: {order_sn: res.data.order_sn}
            })
          }
        }).catch(err => {
          this.sumbiting = false
        })
      }
    },
  }
</script>

<style scoped lang="less">

  .coupons_select {
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 2%;
    font-size: 16px;
    margin: 2%;
    box-sizing: border-box;
  }

  .coupons_box {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
  }

  .content {
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 55px;
    overflow: auto;
    width: 100%;
  }

  .total_price {
    font-size: 16px;

    span {
      color: red;
    }
  }

  .goods_action {
    display: flex;
    justify-content: flex-end;

    .submit_btn {
      max-width: 30%;
    }
  }


</style>
