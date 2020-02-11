<template>
  <div class="order_detail">
    <van-nav-bar fixed title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="order_status">
      <van-icon size="30" v-show="status == 0" name="pending-payment" />
      <van-icon size="30" v-show="status == 1" name="paid" />
      <van-icon size="30" v-show="status == 2" name="logistics" />
      <van-icon size="30" v-show="status == 3" name="star-o" />
      <van-icon size="30" v-show="status == 4" name="flower-o" />
      <van-icon size="30" v-show="status > 4" name="smile-o" />
      <div>
        <span v-show="status == 0">等待买家付款</span>
        <span v-show="status == 1">等待卖家发货</span>
        <span v-show="status == 2">等待买家确认收货</span>
        <span v-show="status == 3">交易已完成</span>
        <span v-show="status == 4">已评价订单</span>
        <span v-show="status == 5">已申请售后</span>
        <span v-show="status == 6">售后处理中</span>
        <span v-show="status == 7">售后处理完成</span>
      </div>
    </div>
    <div class="address">
      <div class="address_left">
        <van-icon size="46" name="location" />
      </div>
      <div class="address_right">
        <div>
          {{ area + address }}
        </div>
        <div>
          <van-icon name="manager" />
          {{ username }}
          <van-icon name="phone" />
          {{ tel }}
        </div>
      </div>
    </div>
    <div class="order">
      <div class="merchant_name">
        <van-icon name="shop-o" size="20" />
        <div>将军府冠捷旗舰店</div>
      </div>
      <order-goods-list :goods_list="order_info" class="goods_list"/>
      <div class="order_detail">
        <div class="order_sn">订单号：{{ order_sn }}</div>
        <div class="goods_total">
          <span>商品总数：</span>
          <span>x {{ goods_total }}(件)</span>
        </div>
        <div class="price_total">
          <span>商品总价(含运费)：</span>
          <span>{{ price_total }}元</span>
        </div>
        <div class="express_total">
          <span>运费总额：</span>
          <span>{{ express_price }}元</span>
        </div>
        <div>
          <span>订单备注：</span>
          <span>{{ remark ? remark : '无' }}</span>
        </div>
        <div class="created_at">
          <span>订单下单时间：</span>
          <span>{{ created_at }}</span>
        </div>
        <div class="pay_time" v-show="status > 0">
          <span>订单付款时间：</span>
          <span>{{ pay_time }}</span>
        </div>
        <div class="send_time" v-show="status > 1">
          <span>订单发货时间：</span>
          <span>{{ send_time }}</span>
        </div>
        <div class="confirm_time" v-show="status > 2">
          <span>确认收货时间：</span>
          <span>{{ confirm_time }}</span>
        </div>
        <div class="comment_time" v-show="status > 3">
          <span>订单评价时间：</span>
          <span>{{ comment_time }}</span>
        </div>
        <div class="after_serve_time" v-show="status > 4">
          <span>售后申请时间：</span>
          <span>{{ after_serve_time }}</span>
        </div>
      </div>
    </div>
    <div class="footer" v-show="status != 1 && status < 5">
      <van-button plain v-show="status == 0" type="info" size="small" @click="orderPayClick(order_sn)">付款</van-button>
      <van-button plain v-show="status == 0 || status == 4" type="info" size="small" @click="delOrder(order_sn)">删除订单</van-button>
      <van-button plain v-show="status == 2" type="info" size="small">确认收货</van-button>
      <van-button plain v-show="status == 3" type="info" size="small">去评价</van-button>
      <van-button plain v-show="status == 4" type="info" size="small">申请售后</van-button>
    </div>
  </div>
</template>

<script>
  import {AuthRequest} from "api/api";
  import OrderGoodsList from "components/orderGoodsList/OrderGoodsList";

  export default {
    name: "OrderDetail",
    components: {
      OrderGoodsList
    },
    props: {},
    data() {
      return {
        order_sn:this.$route.params.order_sn,
        status: 1,
        express_price: 0.00,
        goods_total: 1,
        price_total: 36.00,
        pay_time: "2020-02-10 16:48:16",
        created_at: "2020-02-10 16:48:16",
        send_time: null,
        confirm_time: null,
        comment_time: null,
        after_serve_time: null,
        county_id: "210204000000",
        address: "东京都雪之小镇128号",
        username: "水濑名雪",
        tel: "19950008856",
        remark: null,
        area: "中国辽宁省大连市沙河口区",
        order_info: []
      }
    },
    watch: {},
    methods: {
      onClickLeft(){
        this.$router.go(-1)
      },
      //点击了支付按钮
      orderPayClick(order_sn){
        this.$router.push('/order_pay?order_sn=' + order_sn);
      },
      delOrder(order_sn){
        this.$dialog.confirm({
          title: '确认删除该订单？',
        }).then(() => {
          AuthRequest('/order/destroy', 'get', {order_sn:order_sn}).then(res => {
            this.$toast(res.msg);

            if (res.code == 200) {
              let index = this.order_list.findIndex(item => {
                return item.order_sn == order_sn
              })

              this.order_list.splice(index, 1);
            }
          })
        }).catch(err => {
          //取消不作处理
        })
      },
      getOrderDetail(){
        AuthRequest('/order/show','get',{
          order_sn:this.order_sn
        }).then(res=>{
          this.status = res.data.status;
          this.express_price = res.data.express_price;
          this.goods_total = res.data.goods_total;
          this.price_total = res.data.price_total;
          this.pay_time = res.data.pay_time;
          this.created_at = res.data.created_at;
          this.send_time = res.data.send_time;
          this.confirm_time = res.data.confirm_time;
          this.comment_time = res.data.comment_time;
          this.after_serve_time = res.data.after_serve_time;
          this.county_id = res.data.county_id;
          this.address = res.data.address;
          this.username = res.data.username;
          this.tel = res.data.tel;
          this.remark = res.data.remark;
          this.area = res.data.area;
          this.order_info = res.data.order_info;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
      this.getOrderDetail()
    },
  }

</script>

<style scoped lang="less">
  .order_status{
    margin-top: 46px;
    display: flex;
    justify-content: center;
    padding: 3%;
    font-size: 20px;
    align-items: center;
    color: #22c504;

    div{
      margin-left: 10px;
    }
  }

  .address{
    display: flex;
    font-size: 16px;

    padding: 2%;
    background-color: #fff;

    .address_right{
      padding-left: 5px;

      div:nth-child(2){
        margin-top: 5px;
      }
    }

    border-bottom: #cccccc 1px solid;
  }

  .order{
    background-color: #fff;
    .merchant_name{
      font-size: 18px;
      padding: 2% 2% 0 2%;
      color: #868686;
      display: flex;
      align-items: center;
    }

    .goods_list{
      padding: 2%;
    }

    .order_detail{
      background-color: #fff;
      font-size: 16px;
      padding: 0 2% 2% 2%;

      > div{
        padding-bottom: 5px;
      }
    }
    padding-bottom: 46px;
  }

  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background-color: #e8e8e8;
    box-sizing: border-box;
    height: 46px;
    padding: 2% 0 2%;

    button{
      margin-right: 2%;
      font-size: 16px;
    }
  }
</style>
