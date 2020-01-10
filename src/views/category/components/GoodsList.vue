<template>
  <div class="goods-list">
    <div class="order-area">
      <span :class="[{'order-active':orderIndex == item.id},'order-area-item']"
            v-for="(item,index) in order"
            :key="index"
            @click="orderClick(item.id)"
      >{{ item.name }}</span>
    </div>

    <div class="goods-box">
      <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
        <img :src="item.thumb" @load="imgLoad"/>
        <div>
          <span>{{ item.goods_name }}</span>
          <div class="price">￥{{ item.price }}</div>
          <i></i>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsList",
    props:{
      goodsList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        orderIndex: 1,
        order: [
          {
            id: 1,
            name: '新品'
          },
          {
            id: 2,
            name: '价格'
          },
          {
            id: 3,
            name: '综合'
          }
        ],
      }
    },
    methods: {
      orderClick(index) {
        this.orderIndex = index;
      },
      imgLoad() {
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped lang="less">
  .order-area {
    padding: 8px 10px 8px;
    background-color: #fafafa;

    .order-area-item {
      margin-left: 20px;
    }

    .order-active {
      color: red;
    }

  }

  .goods-box {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50px;

    .goods-item {
      width: 47%;
      padding: 2px;

      img {
        width: 100%;
      }

      .price {
        text-align: center;
      }
    }

    .goods-item:nth-child(even) {
      margin-right: 3px;
    }

    .goods-item:nth-child(odd) {
      margin-left: 3px;
    }
  }
</style>
