<template>
  <div class="goods_price">

    <div class="price">
      <span class="left" v-show="!select_goods_price">￥{{ goods_price }}</span>
      <span class="left" v-show="select_goods_price">￥{{ select_goods_price }}</span>
      <span class="right">
        <van-icon name="star-o" />
        <div>收藏</div>
      </span>
    </div>
    <div class="seckill_title" v-show="Object.keys(this.seckill_info).length">{{ seckill_title }}</div>
    <div class="title">
      {{ goods_title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsPrice",
    components:{

    },
    props:{
      goods:{
        type:Object,
        default(){
          return {}
        }
      },//夏季新款男士纯棉透气吸汗Polo格子衬衫T恤打底衫
      goods_inventory:{
        type: Array,
        default() {
          return [];
        }
      },
      seckill_info:{
        type:Object,
        default(){
          return {};
        }
      },
      select_goods_price:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        goods_title:'',
        goods_price:'9.99-999.99',
        seckill_title:'今日9:00 - 11:00限时秒杀79.00元，敬请期待'
      }
    },
    watch:{
      goods: {
        handler(newValue, oldValue) {
          this.goods_title = newValue.goods_name
        },
        deep:true
      },
      goods_inventory:{
        handler(newValue, oldValue) {
          //处理最高价和最低价
          let prices = [];
          newValue.forEach(res=>{
            prices.push(res.price);
          })

          prices.sort();//排序
          //取最高和最低价格 低-》高

          let last_price = prices.shift();
          let top_price = prices.pop();

          if(last_price != top_price){
            this.goods_price = last_price + '~' + top_price;
          }else{
            this.goods_price = top_price;
          }
        },
        deep:true
      },
      seckill_info:{
        handler(newValue,oldValue){
          if(Object.keys(newValue).length > 0){
            this.seckill_title = '今日' + newValue['start_time'] + ' - ' + newValue['end_time'] + ' 限时秒杀'+ newValue['seckill_price'] +'元，敬请期待';
          }
        }
      }
    },
    filter:{

    },
    methods:{

    }
  }
</script>

<style scoped lang="less">
  .goods_price{
    padding: 5px 10px 5px 5px;
    border-bottom: #e8e8e8 solid 10px;

    .seckill_title{
      font-size: 0.4rem;
      background: #ff0000;
      color: yellow;
      margin: 0.1rem;
      padding: 0.1rem;
      border-radius: .1rem;
    }

    .price{
      display: flex;
      justify-content: space-between;

      .left{
        font-size: 26px;
        line-height: 30px;
        color: red;
      }

      .right{
        text-align: center;
        font-size: 10px;
      }
    }
  }

  .title{
    padding: 5px;
    font-size: 15px;
  }

</style>
