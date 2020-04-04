<template>
  <div class="order_confirm">
    <van-nav-bar fixed title="订单确认" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="content">
      <user-address :user_address="user_address" @change_address="change_address"/>
      <order-info @changeExpress="changeExpress" @computed_total_price="computed_total_price" @setRemarks="setRemarks" :cart_list="cart_list"/>
      <div class="coupons_select">
        <span>选择优惠券</span>
        <span @click="showCoupons">点击选择</span>
      </div>
    </div>

    <coupons ref="coupons" class="coupons_box"/>
    <van-goods-action class="goods_action">
      <div class="total_price" slot="default">
        合计：<span>￥{{ total_price }} 元</span>
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
        remark: '',//备注
      }
    },
    watch: {},
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
            console.log(res);
            this.user_address = res.data.user_address;
            this.cart_list = res.data.cart_list;
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
        this.express_type = express_type;
      },
      /**
       * 获取计算的价格
       */
      computed_total_price(price) {
        this.total_price = price;
      },
      setRemarks(remarks) {
        this.remark = remarks;
      },
      //显示可用优惠券
      showCoupons() {
        this.$refs.coupons.coupons_ctrl = true;
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
          express_type: this.express_type
        }).then(res => {
          console.log(res);
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
