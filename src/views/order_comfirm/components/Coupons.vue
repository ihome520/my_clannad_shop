<template>
  <div class="coupons" v-show="coupons_ctrl">
    <van-nav-bar fixed title="可用优惠券" right-text="返回" right-arrow @click-right="onClickLeft"/>
    <div class="content">
      <div class="not_use">
        <span @click="selectCoupon(0)">不使用优惠券</span>
      </div>
      <!-- 优惠券类型 店铺满减 店铺折扣 全程通用满减 折扣 免邮  -->

      <div class="coupon_list">
        <!--全场满减-->
        <van-radio-group v-model="coupons_index">
            <div class="all_dec" v-for="(item,index) in coupons" :key="index">
              <div class="all_dec_left">
                <span>{{ coupon_type[item.coupon_type] }}</span>
              </div>
              <div class="all_dec_right">
                <div class="all_dec_right_top">
                  <span v-if="item.coupon_type != 6">{{item.coupon.coupon_name}}</span>
                  <span v-if="item.coupon_type == 6">购买指定商品减{{ item.dec_price }}元</span>
                </div>
                <div class="all_dec_right_bottom">
                  <span>有效状态： 有效</span>
                  <van-radio :name="item.id" @click="selectCoupon(item.id)">使用</van-radio>
                </div>
              </div>
            </div>
        </van-radio-group>

        <!--<div class="all_dec">
          <div class="all_dec_left">
            <span>{{ abd }}</span>
          </div>
          <div class="all_dec_right">
            <div class="all_dec_right_top">
              <span>全场满1000 减 100全场满1000 减 100全场满1000 减 100全场满1000 减 100全场满1000 减 100</span>
            </div>
            <div class="all_dec_right_bottom">
              <span>使用状态： 未使用</span>
              <van-checkbox v-model="is_checked">复选框</van-checkbox>
            </div>
          </div>
        </div>-->
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: "Coupons",
    components: {},
    props: {
      coupons:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        is_checked: true,
        coupons_ctrl: false,
        coupons_index: [],
        coupon_type:[0,'满减','折扣','满减','折扣','包邮','指定']
      }
    },
    filters: {},
    watch: {
      coupons:{
        handler(newValue,oldValue){
          newValue.forEach(item => {
            this.coupons_index.push(item.id);
          })
        }
      }
    },
    methods: {
      onClickLeft() {
        this.coupons_ctrl = false
      },
      selectCoupon(user_coupon_id){
        if(user_coupon_id == '0'){
          this.coupons_index = 0;
        }
        this.$emit('selectCoupon',user_coupon_id);
        this.coupons_ctrl = false;
      }
    },
    created() {

    },
    mounted() {

    }
  }
</script>

<style scoped lang="less">
  .content {
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    background: #eaeaea;

    .not_use{
      font-size: 16px;
      display: flex;
      color: red;
      justify-content: flex-end;
      padding: 1%;
      border-bottom: #9e9e9e 1px solid;
      background-color: #fff;
    }

    .coupon_list {
      padding: 2%;

      /*全场通用满减*/

      .all_dec {
        display: flex;
        background-color: #fff;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 5px;
        box-sizing: border-box;

        .all_dec_left {
          width: 20%;
          display: flex;
          text-align: center;
          flex-direction: column;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
        }

        .all_dec_right {
          width: 80%;
          display: flex;
          flex-direction: column;
          flex-grow: 1;

          .all_dec_right_top {
            font-size: 16px;
          }

          .all_dec_right_bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 15px;
          }

        }
      }
    }
  }
</style>
