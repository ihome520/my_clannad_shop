<template>
  <div class="goods_price">
    <div class="price">
      <span class="left">￥{{ goods_price }}</span>
      <span class="right">
        <van-icon name="star-o" />
        <div>收藏</div>
      </span>
    </div>
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
      }
    },
    data(){
      return {
        goods_title:'',
        goods_price:'9.99-999.99',
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
          this.goods_price = prices.shift() + '~' + prices.pop();
        },
        deep:true
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
