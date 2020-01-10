<template>
  <div class="home">
    <!--search-->
    <van-search v-model="searchKeyWord" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

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

      <scroll class="container" ref="scroll" @loadMore="loadMore"
              :probe-type="3"
              @pageScrollEvent="pageScrollEvent">
        <home-swiper :banner="banner"/>
        <!--主分类-->
        <home-category :category="category"/>
        <!--秒杀专场 待准备-->
        <!--楼层推荐-->
        <!--<home-floor/>-->

        <!--首页推荐-->
        <home-recommend ref="recom" :recom_categorys="recom_categorys" :goods-list="goodsList" @tabChange="tabChange" @imgLoad="imgLoad"/>
        <div class="no-data" v-show="noData">
          -- 没有更多了 --
        </div>
      </scroll>
  </div>
</template>

<script>
  import HomeCategory from './components/HomeCategory'
  import HomeRecommend from './components/HomeRecommend'
  import HomeSwiper from './components/HomeSwiper'

  import Scroll from 'components/scroll/Scroll'

  import {HttpRequest} from 'api/api'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeCategory,
      HomeRecommend,
      Scroll
      // HomeFloor
    },
    data() {
      return {
        searchKeyWord: '',
        banner: [],
        category: [],
        currentCategory: 0, //当前分类的id
        cur_page: 1,//当前页
        recom_categorys: [],
        goodsList: [],
        noData: false,
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
      pageScrollEvent(position){
        // console.log(position);
      },
      imgLoad(){
        this.$refs['scroll'].refresh();
        this.$refs['recom'].tabResize();
      },
      loadMore(){
        console.log('loadmore');
        this.getMoreGoods();
      },
      //*********-*********************-*
      //事件监听类
      tabChange(id) { //推荐分类栏的数据获取
        this.goodsList = [];
        this.noData = false;
        this.cur_page = 1;
        this.currentCategory = id;
        this.getHomeGoods(id);

        this.$refs['scroll'].refresh();
      },
      /**********************************************************************************/
      onSearch() { //搜索
        if (this.searchKeyWord) {
          //执行搜索
          this.$toast(this.searchKeyWord)
        } else {
          this.$toast('请输入要搜索的内容')
        }
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
          }
        })
      },
      //加载更多
      getMoreGoods() {
        if (!this.noData) {
          this.$toast('加载中...');
          HttpRequest('/home/goods', 'get', {
            'page': this.cur_page + 1,
            'category_id': this.currentCategory
          }).then(res => {
            if (res.data.current_page == res.data.last_page) {
              this.noData = true;
            }

            if (res.data.data.length > 0) {
              this.cur_page = res.data.current_page;
              this.goodsList.push(...res.data.data);
            } else {
              this.noData = true;
            }

            //触底事件完成后通知插件
            this.$refs.scroll.finishPullUp();
          })
        }

        this.$refs.scroll.finishPullUp();

      }
    }
  }
</script>

<style scoped>
  .home{
    height: 100vh;
  }
  .container {
    position: absolute;
    overflow: hidden;
    top: 54px;
    bottom: 50px;
    left: 0;
    right: 0;
  }

  /*.container{
    height: calc(100% - 104px);
    overflow: hidden;
  }*/

  .no-data {
    text-align: center;
    position: relative;
    bottom: 50px;
    color: #c2d0d0;
  }

</style>
