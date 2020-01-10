<template>
  <div class="recommend">
    <van-tabs ref="tabs" @click="tabClick" v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in recom_categorys" :key="index" :name="item.id" :title="item.category_name">

        <div class="goods-box">
          <template v-if="goodsList.length > 0">
            <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
              <img :src="item.thumb" @load="imgLoad"/>
              <div>
                <span>{{ item.goods_name }}</span>
                <div class="price">￥{{ item.price }}</div>
                <i></i>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-data">
              <p>没有数据...</p>
            </div>
          </template>

        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recom_categorys: {
        type: Array,
        default() {
          return [];
        }
      },
      goodsList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        active: 0,
      }
    },
    methods: {
      tabClick(id, title) {
        //向外触发事件
        this.$emit('tabChange', id);
      },
      imgLoad(){
        this.$emit('imgLoad');
      },
      tabResize(){
        console.log('重置');
        this.$refs['tabs'].resize;
      }
    }
  }
</script>

<style scoped lang="less">
  .goods-box {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50px;

    .goods-item {
      width: 48%;
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

  .no-data{
    text-align: center;
    margin: 0 auto;
    height: 215px;
  }
</style>
