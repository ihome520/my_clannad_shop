<template>
  <div class="home">
    <!--search-->
    <search class="search_bar" maxlength="20"/>
    <!--<div class='container' v-infinite-scroll="loadMore"
         infinite-scroll-distance="50"
         infinite-scroll-immediate-check="false">
      <home-swiper :banner="banner"/>
      &lt;!&ndash;主分类&ndash;&gt;
      <home-category :category="category"/>
      &lt;!&ndash;秒杀专场 待准备&ndash;&gt;
      &lt;!&ndash;楼层推荐&ndash;&gt;
      &lt;!&ndash;<home-floor/>&ndash;&gt;

      &lt;!&ndash;首页推荐&ndash;&gt;
      <home-recommend :recom_categorys="recom_categorys" :goods-list="goodsList" @tabChange="tabChange"/>
      <div class="no-data" v-show="noData">
        &#45;&#45; 没有更多了 &#45;&#45;
      </div>
    </div>-->

    <div class="main-page-wrapper">
      <view-scroll :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore">
        <home-swiper :banner="banner"/>
        <van-notice-bar :text="nofify_text" left-icon="volume-o" />
        <!--主分类-->
        <home-category :category="category"/>
        <!--秒杀专场 待准备-->
        <!--楼层推荐-->
        <!--<home-floor/>-->

        <!--首页推荐-->
        <home-recommend ref="recom" :recom_categorys="recom_categorys" :goods-list="goodsList" @tabChange="tabChange"/>
        <div class="no-data" v-show="noData">
          -- 没有更多了 --
        </div>
      </view-scroll>
    </div>
  </div>
</template>

<script>
  import HomeCategory from './components/HomeCategory'
  import HomeRecommend from './components/HomeRecommend'
  import HomeSwiper from './components/HomeSwiper'

  import ViewScroll from 'components/viewScroll/ViewScroll'
  import Search from 'components/search/Search'

  import {HttpRequest} from 'api/api'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeCategory,
      HomeRecommend,
      ViewScroll,
      Search
    },
    data() {
      return {
        banner: [],
        category: [],
        currentCategory: 0, //当前分类的id
        cur_page: 1,//当前页
        recom_categorys: [],
        goodsList: [],
        noData: false,
        enableLoadMore: true,
        nofify_text:'按照风格，系列批量下载，有六种配色风格，需要付费，98美元无线下载。免费下载只有三个系列，网站会将下载地址发到你的邮箱',
      }
    },
    mounted() {
      this.getHomeInfo();
    },
    watch: {
      recom_categorys(newData, oldData) {
        newData ? this.currentCategory = newData['0'].id : 0;
        if (this.currentCategory) {
          this.getHomeGoods(this.currentCategory);//有数据到时候去获取首页的数据
        }
      }
    },
    methods: {
      onLoadMore(done) {
        setTimeout(()=>{
          if(!this.enableLoadMore) {
            return
          }
          console.log('load...');
          this.getMoreGoods();
          // done();
        }, 200)
      },
      //*********-*********************-*
      //事件监听类
      tabChange(id) { //推荐分类栏的数据获取
        this.goodsList = [];
        this.noData = false;
        this.enableLoadMore = true;
        this.cur_page = 1;
        this.currentCategory = id;
        this.getHomeGoods(id);
      },
      getHomeInfo() { //首页的基本信息
        HttpRequest('/home/index').then(res => {
          this.banner = res.data.banner;
          this.category = res.data.category;
          this.recom_categorys = res.data.recom_categorys;
        })
      },
      getHomeGoods(category_id) { //首页的商品信息
        HttpRequest('/home/goods', 'get', {
          category_id: category_id
        }).then(res => {
          if (res.data.data.length > 0) {
            this.goodsList = res.data.data;
          }else{
            this.noData = true
            this.enableLoadMore = false
          }
        })
      },
      //加载更多
      async getMoreGoods() {
        if (!this.noData) {
          this.$toast('加载中...');
          await HttpRequest('/home/goods', 'get', {
            'page': this.cur_page + 1,
            'category_id': this.currentCategory
          }).then(res => {
            if (res.data.current_page == res.data.last_page) {
              this.noData = true;
              this.enableLoadMore = false
            }

            if (res.data.data.length > 0) {
              this.cur_page = res.data.current_page;
              this.goodsList.push(...res.data.data);
            } else {
              this.noData = true;
            }

          })
        }
      }
    }
  }
</script>

<style scoped>
  .home{
    height: 100vh;
  }

  .search_bar >>> div{
    font-size: 16px;
  }

  .main-page-wrapper {
    position: relative;
    display: flex;
    height: 100%;
    -webkit-box-orient: vertical;
    flex-direction: column;
  }

  .no-data {
    text-align: center;
    position: relative;
    bottom: 30px;
    color: #c2d0d0;
    font-size: 14px;
  }

</style>
