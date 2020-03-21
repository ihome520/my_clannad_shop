<template>
  <div>
    <van-nav-bar fixed title="订单列表" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <van-tabs v-model="active" @click="tabClick" class="tabs">
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待发货" name="1"></van-tab>
      <van-tab title="待收货" name="2"></van-tab>
      <van-tab title="待评价" name="3"></van-tab>
      <van-tab title="售后" name="4"></van-tab>
    </van-tabs>

      <div class="order_list_box" v-show="order_list.length">
        <scroll class="container" ref="scroll" @loadMore="loadMore">
          <div class="order_list_item" v-for="(item,index) in order_list" :key="index">
            <div class="list_box">
              <div class="header">
                <div class="merchant_name">
                  <div><van-icon name="shop-o" size="20" />将军府冠捷旗舰店</div>
                  <div v-show="order_status == 'all'">【{{ order_status_kv[item.status] }}】</div>
                </div>
                <div class="order_sn">
                  <span>订单号: {{ item.order_sn }}</span>
                  <span>{{ item.created_at }}</span>
                </div>
              </div>
              <div class="content">
                <order-goods-list  @imgLoad="imgLoad" :goods_list="item.order_info"/>
                <div class="order_info">
                  <span>共 {{ item.goods_total }}件商品</span>
                  <span>共计：{{ item.price_total }}元</span>
                  <span>(含快递费: {{ item.express_price }}元)</span>
                </div>
              </div>
              <div class="footer">
                <template v-if="item.status == '0'">
                  <van-button plain size="small" type="primary" @click="orderPayClick(item.order_sn)">付款</van-button>
                  <van-button plain size="small" type="danger" v-if="item.order_type != 2" @click="delOrder(item.order_sn)">删除订单</van-button>
                </template>
                <template v-else-if="item.status == '2'">
                  <van-button plain size="small" type="warning">查看物流</van-button>
                  <van-button plain size="small" type="primary">确认收货</van-button>
                </template>
                <template v-else-if="item.status == '3'">
                  <van-button plain size="small" type="warning">查看物流</van-button>
                  <van-button plain size="small" type="primary">去评价</van-button>
                </template>
                <template v-else-if="item.status == '4'">
                  <van-button plain size="small" type="warning">查看物流</van-button>
                  <van-button plain size="small" type="default">申请售后</van-button>
                  <van-button plain size="small" type="danger">删除订单</van-button>
                </template>
                <van-button plain size="small" type="info" @click="showDetail(item.order_sn)">查看详情</van-button>
              </div>
            </div>
          </div>
          <div v-show="not_data" class="not_data">
            <div>—— 没有更多了 ——</div>
          </div>
        </scroll>
      </div>
      <div class="not_order" v-show="!order_list.length">
        <div>—— 没有该类订单 ——</div>
      </div>

  </div>
</template>

<script>
  import {AuthRequest} from "api/api";
  import OrderGoodsList from "components/orderGoodsList/OrderGoodsList";
  import Scroll from "components/scroll/Scroll";

  export default {
    name: "OrderList",
    components: {
      Scroll,
      OrderGoodsList
    },
    props: {},
    data() {
      return {
        order_list:[],
        active: 0,
        order_status: 'all',
        next_page: 2,
        not_data:false,
        isFirstEnter:true,//第一次进入页面
        scrollY:0,
        order_status_kv:['未付款','待发货','待收货','已确认','已评价','已申请售后','售后处理中','售后处理完成'],
      }
    },
    watch: {
      order_status(newValue){
        newValue == 'all' ? this.active = 0 : this.active = newValue
      }
    },
    filter: {},
    methods: {
      onClickLeft() {
        this.$router.replace('/user');
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
      /**
       * 查看详情
       * @param order_sn
       */
      showDetail(order_sn){
        this.$router.push('/order_detail/' + order_sn);
      },
      tabClick(type,name){
        this.order_status = type;
        this.next_page = 2;
        this.order_list = [];
        this.not_data = false;

        this.getOrderList();
        // this.$router.replace('/order_list/' + type);
        // this.$router.go(0);
      },
      async getOrderList() {
        this.$toast.loading({
          message:'加载中...'
        })
        await AuthRequest('/order/index', 'get', {
          page: 1,
          order_status:this.order_status
        }).then(res => {

          this.order_list = res.data.data

          //如果是最后一页，就显示没有下来了
          if(res.data.current_page == res.data.last_page){
              this.not_data = true;
          }

          this.$toast.clear()
        }).catch(err=>{
          this.$toast.clear()
        })
      },
      async loadMore(){
        if(!this.not_data){
          this.$toast.loading({
            message:'加载中...'
          })
          await AuthRequest('/order/index', 'get', {
            page: this.next_page,
            order_status:this.order_status
          }).then(res => {
            this.order_list.push(...res.data.data);

            //如果是最后一页，就显示没有下来了
            if(res.data.current_page == res.data.last_page){
              this.not_data = true;
            }else{
              this.next_page = res.data.current_page + 1;//计算下一页
            }

            this.$toast.clear();
            this.$refs.scroll.finishPullUp();
          }).catch(err=>{
            this.$toast.clear();
            this.$refs.scroll.finishPullUp();
          })
        }else{
          this.$refs.scroll.finishPullUp();
        }
      },
      imgLoad(){
        this.$refs['scroll'].refresh();
      }
    },
    activated() {
      //如果不是从其他页面返回，或者是第一次进入的时候，就获取最新的数据
      if(!this.$route.meta.isBack || this.isFirstEnter){
        this.scrollY = 0;
        this.next_page = 2;
        this.order_list = [];
        this.not_data = false;

        this.active = this.$route.params.type
        if(this.$route.params.type != 'all'){ //如果不是所有的情况下，就改变类型
          this.order_status = this.$route.params.type;
        }

        this.getOrderList();
      }
      this.isFirstEnter = false;
      this.$route.meta.isBack = false;
      this.$refs.scroll.scrollTo(0,this.scrollY,1000);
    },
    beforeRouteLeave(to, form, next) {
      this.scrollY = this.$refs.scroll.getScrollY();
      next()
    },
    beforeRouteEnter(to,from,next){
      //从付款或者查看详情页面回来的时候
      if((from.name == 'order_detail' || from.name == 'order_pay') && to.name == 'order_list'){
        to.meta.isBack = true;
        next()
      }else{
        next()
      }
    },
  }

</script>

<style scoped lang="less">
  .tabs {
    padding-top: 45px;
    padding-bottom: 5px;
    background-color: #cccccc;
  }

  .order_list_box {
    height: calc(100vh - 95px);
    position: relative;
    top: 0;

    .container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      background-color: #cccccc;

      .order_list_item {
        padding: 0 2% 2% 2%;

        .list_box {
          padding: 2%;
          background-color: #fff;
          border-radius: 5px;

          .header {
            display: flex;
            font-size: 16px;
            flex-direction: column;
            padding-bottom: 10px;

            .merchant_name{
              display: flex;
              align-items: center;
              padding-bottom: 5px;
              color: #868686;
              justify-content: space-between;
            }

            .order_sn{
              display: flex;
              justify-content: space-between;
            }
          }

          .content {

            .order_info {
              display: flex;
              font-size: 16px;
              justify-content: flex-end;
              padding-bottom: 10px;
              padding-top: 5px;
            }
          }

          .footer {
            display: flex;
            justify-content: flex-end;

            button {
              font-size: 16px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  .not_order {
    padding: 5% 0;
    font-size: 16px;
    text-align: center;
    color: #bfbfbf;
  }

  .not_data{
    padding: 5% 0 ;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
</style>
