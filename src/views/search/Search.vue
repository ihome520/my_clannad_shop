<template>
  <div class="search">
    <van-search v-model="searchKeyWord" class="search_bar" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div class="goods">
      <scroll class="container" ref="scroll" @loadMore="loadMore" v-show="goods_list.length">
        <div class="goods_item_box">
          <div class="goods_item" v-for="(item,index) in goods_list" :key="index">
            <router-link :to="/goods/ + item.id">
            <div class="img">
              <img :src="item.thumb" @load="imgLoad"/>
            </div>
            <div class="goods_name">{{ item.goods_name }}</div>
            <div class="price">￥{{ item.price }}</div>
            </router-link>
          </div>
        </div>
        <div class="not_data" v-show="not_data">
          ———— ☆ ~ 已经到底了哦 ~ ☆ ————
        </div>
      </scroll>
      <div class="not_result" v-show="!goods_list.length">
        ———— ☆ ~ 噢欧，没有找到 ~ ☆ ————
      </div>
    </div>
  </div>
</template>

<script>
  import {HttpRequest} from "api/api";
  import Scroll from 'components/scroll/Scroll'

  export default {
    name: "Search",
    components: {
      Scroll
    },
    props: {},
    data() {
      return {
        searchKeyWord: '',
        goods_list: [],
        next_page: 2,
        not_data: false,
      }
    },
    watch: {
      goods_list: {
        /**
         * 截取商品名字字符串
         * @param newValue
         * @param oldValue
         */
        handler(newValue, oldValue) {
          newValue.forEach((item, index) => {
            if (item.goods_name.length > 16) {
              newValue[index].goods_name = item.goods_name.slice(0, 16) + '...';
            }
          })
        },
        deep: true
      }
    },
    methods: {
      async getSearchGoods() {
        this.$toast.loading('加载中...');
        await HttpRequest('/search/searchGoods', 'get', {
          keyword: this.searchKeyWord
        }).then(res => {

          this.goods_list = res.data.data;

          if (res.data.current_page == res.data.last_page && res.data.data.length > 0) {
            this.not_data = true;
          }

          this.$toast.clear()
        })
      },
      onSearch() {
        this.not_data = false;
        this.next_page = 2;
        this.goods_list = [];

        this.getSearchGoods();
      },
      async loadMore() {
        if (!this.not_data) {
          this.$toast.loading('加载中...');

          await HttpRequest('/search/searchGoods', 'get', {
            keyword: this.searchKeyWord,
            page: this.next_page
          }).then(res => {
            if (res.data.current_page == res.data.last_page) {
              this.not_data = true;
            } else {
              this.next_page = res.data.current_page + 1;
            }

            this.goods_list.push(...res.data.data);

            this.$refs.scroll.finishPullUp();
          }).catch(err => {
            this.$refs.scroll.finishPullUp();
          })
        } else {
          this.$refs.scroll.finishPullUp();
        }
      },
      imgLoad() {
        this.$refs['scroll'].refresh();
      }
    },
    created() {
      this.searchKeyWord = this.$route.query.keyword;

      this.getSearchGoods();
    },

  }

</script>

<style scoped lang="less">
  .search_bar {
    border-bottom: #cccccc 5px solid;
  }

  .goods {
    height: 100vh;
    position: relative;
    top: 0;
    background-color: #cccccc;

    .container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 56px;
      width: 100%;
      overflow: hidden;

      .goods_item_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .goods_item {
        width: 47%;
        background-color: #fff;
        padding: 2%;
        box-sizing: border-box;
        margin-bottom: 2%;
        border-radius: 5px;

        .img {
          width: 100%;

          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }

        .goods_name {
          font-size: 18px;
          color: #606060;
        }

        .price {
          font-size: 16px;
          color: red;
          text-align: center;
        }
      }

      .goods_item:nth-child(odd) {
        margin-left: 2%;
      }

      .goods_item:nth-child(even) {
        margin-right: 2%;
      }
    }

    .not_data {
      font-size: 16px;
      color: #fff;
      padding: 2%;
      background-color: #cccccc;
      text-align: center;
    }

    .not_result {
      font-size: 16px;
      color: #cccccc;
      padding: 2%;
      height: 100%;
      background-color: #fff;
      text-align: center;
    }
  }
</style>
