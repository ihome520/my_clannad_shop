<template>
  <div class="order_goods_list">
    <div class="goods_item" v-for="(item,index) in goods_list" :key="index">
      <div class="product_img">
        <img :src="item.thumb" @load="imgLoad"/>
      </div>
      <div class="product_param">
        <div class="goods_name">
          {{ item.goods_name }}
        </div>
        <div class="param">
          <div v-for="(sku,index) in item.sku_info" :key="index">{{ sku.spec_name }}：{{ sku.value }}</div>
        </div>
      </div>
      <div>
        <div class="price">￥{{ item.price }}</div>
        <div class="number">x {{ item.number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderGoodsList",
    components: {},
    props: {
      goods_list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {}
    },
    watch: {},
    filter: {},
    methods: {
      /**
       * 触发图片加载事件
       */
      imgLoad(){
        this.$toast.loading({
          message:'加载中...'
        })
        this.$emit('imgLoad');
        this.$toast.clear();
      }
    },
  }

</script>

<style scoped lang="less">
  .goods_item{
    padding-bottom: 5px;
    display: flex;

    .product_img{
      width: 100px;
      height: 100px;

      /*border: #d8d8d8 2px solid;*/

      img{
        width: 100%;
        border-radius: 5px;
      }
    }

    .product_param{
      flex-grow:1;
      padding:0 5px;

      .goods_name{
        font-size: 16px;
        padding-bottom: 5px;
      }

      .param{
        font-size: 14px;
        color: #606060;
      }
    }

    .price{
      font-size: 15px;
    }

    .number{
      font-size: 14px;
      color: #808080;
      float: right;
    }
  }
</style>
