<template>
  <div class="my_coupons">
    <van-nav-bar fixed title="我的优惠券" left-text="返回" left-arrow @click-left="onClickLeft"/>

    <van-tabs v-model="active" @click="tabClick" class="tabs">
      <van-tab title="未使用" name="1"></van-tab>
      <van-tab title="已使用" name="2"></van-tab>
      <van-tab title="已过期" name="3"></van-tab>
    </van-tabs>

    <div class="coupons_list_box"  v-show="coupon_list.length">
      <scroll class="container" ref="scroll" @loadMore="loadMore">
        <div class="coupons_item" v-for="(item,index) in coupon_list" :key="index">
          <div class="coupon_box">
            <div class="box_left">
              <!--优惠券类型 1.店铺满减 2.店铺折扣 3.通用满减 4.通用折扣 5.免邮 6.指定商品-->
              <span v-if="item.coupon_type == 1 || item.coupon_type == 3">满减</span>
              <span v-if="item.coupon_type == 2 || item.coupon_type == 4">折扣</span>
              <span v-if="item.coupon_type == 5">免邮</span>
              <span v-if="item.coupon_type == 6">商品</span>
            </div>
            <div class="box_center">
              <div>SN: {{ item.coupon_sn }}</div>
              <template v-if="item.coupon_type == 1 || item.coupon_type == 3">
                <div class="coupon_name">满{{item.use_price}}减{{ item.dec_price }}元</div>
              </template>

              <template v-if="item.coupon_type == 2 || item.coupon_type == 4">
                <div class="coupon_name">满{{item.use_price}}打{{ item.discount / 10 }}折</div>
              </template>

              <div class="coupon_name" v-if="item.coupon_type == 5">抵扣商品邮费</div>
              <div class="coupon_name" v-if="item.coupon_type == 6">购买{{ item.goods_name }}满{{ item.goods_number }}件减{{ item.dec_price }}元</div>
              <div class="effective_time">有效期：{{item.start_time}} ~ {{item.end_time}}</div>
              <div class="status">
                <span>
                  <span v-if="item.coupon_type == 2 || item.coupon_type == 1">{{ item.shop_name }}</span>
                </span>
                <span>状态：{{ coupon_status[item.status]}}</span>
              </div>
            </div>
            <div class="box_right">
              <router-link to="/" v-if="item.status == 1">
                去使用
              </router-link>
            </div>
          </div>
        </div>

        <!--<div class="coupons_item">
          <div class="coupon_box">
            <div class="box_left">
              <span>减</span>
            </div>
            <div class="box_center">
              <div>SN:4984619841616468</div>
              <div class="coupon_name">全程满1000减50元</div>
              <div class="effective_time">有效期：2020-05-01 00:00:00 ~ 2020-05-10 23:59:59</div>
              <div class="status">
                <span></span>
                <span>状态：未使用</span>
              </div>
            </div>
            <div class="box_right">
              <router-link to="/">
                去使用
              </router-link>
            </div>
          </div>
        </div>-->

        <div class="not_more" v-show="not_data">
          <div>——— 已经到底了 ———</div>
        </div>
      </scroll>
    </div>

    <div class="not_coupons" v-show="!coupon_list.length">
      <span>——— 没有这类优惠券 ———</span>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/scroll/Scroll";
  import {AuthRequest} from "api/api";

  export default {
    name: "MyCoupons",
    components: {
      Scroll
    },
    data() {
      return {
        active: 0,
        not_data:true,
        status:1,//默认显示未使用的
        coupon_list:[],
        next_page:2,
        coupon_status:[0,'未使用','已使用','已过期'],
      }
    },
    watch: {},
    filter: {},
    methods: {
      onClickLeft() {
        this.$router.replace('/user');
      },
      tabClick(type,name){
        this.status = type;
        this.next_page = 2;
        this.coupon_list = [];
        this.not_data = false;

        this.getCouponList();
      },
      loadMore(){
        if(!this.not_data){
          this.$toast.loading({
            message:'加载中...'
          })

          AuthRequest('/coupons/index','get',{
            page:this.next_page,
            status:this.status
          }).then(res=>{
            if(res.code != 200){
              this.$toast(res.msg);
              this.$refs.scroll.finishPullUp();
            }else{
              this.coupon_list.push(...res.data.data);

              if(res.data.current_page == res.data.last_page){
                this.not_data = true;
              }else{
                this.next_page = res.data.current_page + 1;
              }

              this.$toast.clear();
              this.$refs.scroll.finishPullUp();
            }
          }).catch(err=>{
            this.$refs.scroll.finishPullUp();
          })
        }else{
          this.$refs.scroll.finishPullUp();
        }
      },
      getCouponList(){
        this.$toast.loading({
          message:'加载中...'
        })

        AuthRequest('/coupons/index','get',{
          page:1,
          status:this.status
        }).then(res => {
          if(res.code != 200){
            this.$toast(res.msg);
          }else{
            this.coupon_list = res.data.data;

            if(res.data.current_page == res.data.last_page){
              this.not_data = true;
            }

            this.$toast.clear();
          }
        })
      }
    },
    created() {
      this.getCouponList();
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less">
  .tabs{
    padding-top: 45px;
    padding-bottom: 5px;
    background-color: #ccc;
  }

  .coupons_list_box{
    height: calc(100vh - 95px);
    position: relative;
    top: 0;
    background-color: #ccc;

    .container{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background-color: #ccc;
      overflow: hidden;

      .coupons_item{
        padding: 0 2% 2% 2%;

        .coupon_box{
          display: flex;
          padding: 2%;
          border: #1c8fd2 1px solid;
          background-color: #fff;
          border-radius: 5px;

          .box_left{
            width: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
          }

          .box_center{
            width: 65%;
            font-size: 14px;

            .status{
              display: flex;
              justify-content: space-between;
              span:nth-child(1){

              }
            }
          }

          .box_right{
            width: 20%;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }

      .not_more{
        padding: 2%;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .not_coupons{
    height: 100%;
    background-color: #fff;
    color: #000;
    text-align: center;
    font-size: 16px;
    padding: 2%;
  }
</style>
