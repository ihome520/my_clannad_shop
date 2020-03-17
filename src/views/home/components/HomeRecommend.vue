<template>
  <div class="recommend">
    <van-tabs ref="tabs" @click="tabClick" v-model="active" swipeable>
      <van-tab :class="{'sticky_top':stickyTop}"
               v-for="(item,index) in recom_categorys"
               :key="index" :name="item.id"
               :title="item.category_name">

        <div class="goods-box">
          <template v-if="goodsList.length > 0">
            <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
              <router-link :to="/goods/ + item.id">
                <img :src="item.thumb" @load="imgLoad"/>

                  <div class="goods_name">{{ item.goods_name | cutString(item.goods_name)}}</div>
                  <div class="price">￥{{ item.price }}</div>
              </router-link>
            </div>
          </template>
          <template v-else>
            <!--<div class="no-data">
              <p>没有数据...</p>
            </div>-->
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
        stickyTop:false //是否在顶部固定
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
  .sticky_top{
    height: calc(100vh - 142px);
  }
  .goods-box {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    .goods-item {
      width: 48%;
      padding: 2px;

      img {
        width: 100%;
      }

      .goods_name{
        font-size: 16px;
        color: #606060;
      }

      .price {
        font-size: 16px;
        color: red;
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
    font-size: 14px;
  }
</style>
