<template>
  <div class="goods-list">
    <div class="order-area">
      <span :class="[{'order-active':orderIndex == index},'order-area-item']"
            v-for="(item,index) in order"
            :key="index"
            @click="orderClick(index)"
      >{{ item.name }}</span>
    </div>

    <div class="goods-box">
      <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
        <router-link :to="'/goods/' + item.id">
          <img :src="item.thumb" @load="imgLoad"/>
          <div>
            <span class="goods_name">{{ item.goods_name }}</span>
            <div class="price">￥{{ item.price }}</div>
            <i></i>
          </div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsList",
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        orderIndex: 0,
        order: [
          {
            id: 1,
            name: '新品'
          },
          {
            id: 2,
            name: '价格↓'
          },
          {
            id: 3,
            name: '默认排序↓'
          }
        ],
      }
    },
    methods: {
      orderClick(index) {
        this.orderIndex = index;
        switch (index) {
          case 0:
            this.$emit('orderGoods', 'time_desc')
            break;
          case 1:
            if (this.order[index].name == '价格↓') {
              this.$emit('orderGoods', 'price_asc')
              this.order[index].name = '价格↑'
            } else {
              this.$emit('orderGoods', 'price_desc')
              this.order[index].name = '价格↓'
            }
            break;
          case 2:
            if (this.order[index].name == '默认排序↓') {
              this.$emit('orderGoods', 'sort_asc')
              this.order[index].name = '默认排序↑'
            } else {
              this.$emit('orderGoods', 'sort_desc')
              this.order[index].name = '默认排序↓'
            }
        }

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
    padding-bottom: 50px;

    .goods-item {
      width: 47%;
      padding: 2px;

      img {
        width: 100%;
      }

      .goods_name{
        color: #606060;
      }

      .price {
        text-align: center;
        color: red;
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
