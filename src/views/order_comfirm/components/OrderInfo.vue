<template>
  <div class="order_info">
    <div class="container">
      <div class="goods_item" v-for="(item,index) in cart_list" :key="index">
        <div class="product_img">
          <img :src="item.thumb" alt=""/>
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

      <div class="express_info">
        <div class="express_type">
          <span>配送方式:</span>
          <span @click="selectExpress">{{ express_value }} ></span>
        </div>
        <div class="remark">
          <label>
            <span>留言：</span>
            <input type="text" maxlength="40" v-model="remarks" placeholder="选填，给卖家留言"/>
          </label>
        </div>
        <div class="total">
          <span>共 {{ total_goods }} 件</span>
          共计：<span class="total_price">￥{{ goods_total_price }}元</span>
        </div>
      </div>

      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="expressList"
          @cancel="showPicker = false"
          @confirm="onConfrimExpress"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderInfo",
    components: {},
    props: {
      cart_list:{
        type:Array,
        default(){
          return []
        }
      },
      goods_total_price:0,
      total_goods:0,
    },
    data() {
      return {
        remarks:'',//订单留言
        showPicker: false,
        expressList: ['快递配送', '自提'],
        expressListKv:[1,2],
        express_value:'快递配送',
        express_type:1,
        express_price:8.00,//暂定快递费写死状态，8元
      }
    },
    watch: {
      remarks(newValue){
        this.$emit('setRemarks',newValue);
      }
    },
    methods: {
      selectExpress(){
        this.showPicker = true;
      },
      /**
       * 确认选择快递
       * @param value
       * @param index
       */
      onConfrimExpress(value,index){
        this.showPicker = false;
        this.express_value = value;//显示配送方式名称
        this.express_type = this.expressListKv[index];
        this.$emit('changeExpress',this.expressListKv[index]);
      },

    },
  }

</script>

<style scoped lang="less">
  .order_info{
    padding: 0 2%;

    .container{
      padding: 5px;
      border-radius: 5px;
      background-color: #fff;

      .goods_item{
        padding-bottom: 5px;
        display: flex;

        .product_img{
          width: 20%;

          /*border: #d8d8d8 2px solid;*/

          img{
            width: 100%;
            border-radius: 5px;
          }
        }

        .product_param{
          flex-grow:1;
          width: 50%;
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


    }
  }

  .express_info{
    font-size: 16px;
    margin-top: 10px;
    color: #888888;

    .express_type{
      display: flex;
      justify-content: space-between;
      padding: 5px;
    }

    .remark{
      box-sizing: border-box;
      padding: 5px;

      input{
        border: none;
        border-bottom: #aea699 1px solid;
        width: 85%
      }
    }

    .total{
      padding: 5px;
      font-size: 16px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span:nth-child(1){
        margin-right: 5px;
        font-size: 14px;
      }

      .total_price{
        color: red;
      }
    }
  }
</style>
