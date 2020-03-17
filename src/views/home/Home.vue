<template>
  <div class="home">
    <!--search-->
    <search class="search_bar" maxlength="20"/>
    <div class="content">
      <scroll class="container" ref="scroll" probe-type="2" @pageScrollEvent="pageScrollEvent" @loadMore="getMoreGoods">
        <home-swiper :banner="banner"/>
        <van-notice-bar :text="nofify_text" left-icon="volume-o" />
        <!--主分类-->
        <home-category :category="category"/>
        <!--秒杀专场 待准备-->
        <home-sec-kill/>
        <!--楼层推荐-->
        <!--<home-floor/>-->

        <!--首页推荐-->
        <home-recommend ref="recom" :class="{'in_top':in_top}" :recom_categorys="recom_categorys" :goods-list="goodsList" @tabChange="tabChange"/>
        <div class="no-data" v-show="noData">———— ☆ ~ 已经到底了哦 ~ ☆ ————</div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import HomeCategory from './components/HomeCategory'
  import HomeRecommend from './components/HomeRecommend'
  import HomeSwiper from './components/HomeSwiper'
  import HomeSecKill from "./components/HomeSecKill";
  import Scroll from 'components/scroll/Scroll'
  import Search from 'components/search/Search'

  import {HttpRequest} from 'api/api'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeCategory,
      HomeRecommend,
      HomeSecKill,
      Scroll,
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
        in_top:true,
        nofify_text:'按照风格，系列批量下载，有六种配色风格，需要付费，98美元无线下载。免费下载只有三个系列，网站会将下载地址发到你的邮箱',
        isFirstEnter:true,
        scrollY:0,
      }
    },
    activated() {
      //如果不是从其他页面返回，或者是第一次进入的时候，就获取最新的数据
      if(!this.$route.meta.isBack || this.isFirstEnter){
        this.goodsList = [];
        this.noData = false;
        this.cur_page = 1;
        this.$refs.recom.active = 0;
        this.in_top = true;
        this.getHomeInfo();
        this.$refs.scroll.refresh();
      }
      this.isFirstEnter = false;
      this.$route.meta.isBack = false;
      this.$refs.scroll.scrollTo(0,this.scrollY,500);
    },
    beforeRouteLeave(to, form, next) {
      this.scrollY = this.$refs.scroll.getScrollY();
      next()
    },
    beforeRouteEnter(to,from,next){
      if(from.name == 'goods' && to.name == 'home'){
        to.meta.isBack = true;
        next()
      }else{
        next()
      }
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
      //*********-*********************-*
      //事件监听类
      async tabChange(id) { //推荐分类栏的数据获取
        this.goodsList = [];
        this.noData = false;
        this.cur_page = 1;
        this.currentCategory = id;
        this.in_top = true;
        await this.getHomeGoods(id);
      },
      imgLoad(){
        this.$refs.scroll.refresh();
      },
      getHomeInfo() { //首页的基本信息
        HttpRequest('/home/index').then(res => {
          this.banner = res.data.banner;
          this.category = res.data.category;
          this.recom_categorys = res.data.recom_categorys;
        })
      },
      async getHomeGoods(category_id) { //首页的商品信息
        await HttpRequest('/home/goods', 'get', {
          category_id: category_id
        }).then(res => {
          if (res.data.data.length > 0) {
            this.goodsList = res.data.data;
          }else{
            this.noData = true
          }
          this.$refs.scroll.refresh();
        }).catch(err=>{
          this.$refs.scroll.finishPullUp();
        })
      },
      //加载更多
      async getMoreGoods() {
        if (!this.noData) {
          this.$toast.loading({
            message:'加载中...'
          })
          await HttpRequest('/home/goods', 'get', {
            'page': this.cur_page + 1,
            'category_id': this.currentCategory
          }).then(res => {
            if (res.data.current_page == res.data.last_page) {
              this.noData = true;
            }

            this.$toast.clear()

            if (res.data.data.length > 0) {
              this.cur_page = res.data.current_page;
              this.goodsList.push(...res.data.data);
            } else {
              this.noData = true;
            }

            this.$refs.scroll.finishPullUp();
          }).catch(err=>{
            this.$toast.clear()
            this.$refs.scroll.finishPullUp();
          })
        }else{
          this.$refs.scroll.finishPullUp();
        }
      },
      pageScrollEvent(position){
        if(Math.abs(position.y) > 1){
          this.in_top = false;
        }else{
          this.in_top = true;
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

  .in_top >>> .van-tabs__content{
    height: calc(100vh - 142px);
  }

  .content {
    height: calc(100vh - 100px);
  }

  .content .container{
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 50px;
    width: 100%;
    overflow: hidden;
  }

  .no-data {
    text-align: center;
    bottom: 30px;
    color: #c2d0d0;
    padding: 2%;
    font-size: 14px;
  }

</style>
