<template>
  <div class="goods_price">
    <!--<div class="price">
      <span class="left" v-show="!select_goods_price">￥{{ goods_price }}</span>
      <span class="left" v-show="select_goods_price">￥{{ select_goods_price }}</span>
      <span class="right">
        <van-count-down :time="down_time" format="DD 天 HH 时 mm 分 ss 秒" />
      </span>
    </div>
    -->

    <div class="container">
      <div class="goods_price_show">
        <span>￥{{ seckill.seckill_price }}</span>
        <span>￥{{ seckill.price }}</span>
      </div>
      <div class="down_time">
        <div>距本次秒杀结束还剩</div>
        <van-count-down @finish="onfinish" :time="down_time">
          <template v-slot="timeData">
            <span class="item">{{ timeData.days }}天</span>
            <span class="item">{{ timeData.hours }}时</span>
            <span class="item">{{ timeData.minutes }}分</span>
            <span class="item">{{ timeData.seconds }}秒</span>
          </template>
        </van-count-down>
      </div>
    </div>

    <div class="title">
      {{ goods_title }}
    </div>

  </div>
</template>

<script>
  export default {
    name: "GoodsPrice",
    components: {},
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      },//夏季新款男士纯棉透气吸汗Polo格子衬衫T恤打底衫
      seckill:{
        type:Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        down_time: 60,
        goods_title: '',
        goods_price: '9.99-999.99',
        flag:1,//结束标识 页面加载的时候会触发一次结束 这里要分开触发
      }
    },
    watch: {
      goods: {
        handler(newValue, oldValue) {
          this.goods_title = newValue.goods_name
        },
        deep: true
      },
      seckill: {
        handler(newValue,oldValue){
            let timestamp = parseInt(new Date().getTime() / 1000);    // 当前时间戳
            this.down_time = (this.$utils.strToTime(newValue.end_time) - timestamp) * 1000;
        },
        deep:true
      }
    },
    methods: {
      onfinish(){
        if(this.flag == 1){
          this.$emit('onfinished',this.flag);
          this.flag = 2;
        }else{
          this.$emit('onfinished',this.flag);
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .goods_price {
    padding: 5px 10px 5px 5px;
    border-bottom: #e8e8e8 solid 10px;

    .price {
      display: flex;
      justify-content: space-between;

      .left {
        font-size: 26px;
        line-height: 30px;
        color: red;
      }

      .right {
        text-align: center;
        font-size: 10px;
      }
    }
  }

  .container {
    display: flex;
    align-items: center;

    .goods_price_show {
      width: 50%;
      font-weight: bold;

      span:nth-child(1) {
        font-size: 18px;
        color: red;
      }

      span:nth-child(2) {
        font-size: 16px;
        text-decoration: line-through;
        padding-left: 5px;
        box-sizing: border-box;
      }
    }

    .down_time{
      width: 50%;
      text-align: right;

      div{
        font-size: 13px;
      }

      .item {
        display: inline-block;
        margin-right: 2px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #000;
        padding: 0 2px;
      }
    }

  }

  .title {
    padding: 5px;
    font-size: 15px;
  }



</style>
