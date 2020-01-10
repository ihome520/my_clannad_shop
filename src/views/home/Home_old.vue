<template>
  <div class="home">
    <!--search-->
    <van-search v-model="searchKeyWord" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>


    <div class="parent-dom">
      <!--<vuescroll ref="vs" :ops="ops"-->
                 <!--@refresh-start="handleRS"-->
                 <!--@refresh-before-deactivate="handleRBD"-->
                 <!--@load-before-deactivate="pageLoadEnd"-->
                 <!--@load-start="pageLoadStart"-->
      <!--&gt;-->
      <vuescroll :refreshStart='refreshStart'
                 :loadStart='loadStart'
                 :noData='noData'>
        <div class="child-dom">
          <home-swiper :banner="banner"/>
          <!--主分类-->
          <home-category :category="category"/>
          <!--秒杀专场 待准备-->
          <!--楼层推荐-->
          <!--<home-floor/>-->

          <!--首页推荐-->
          <home-recommend :recom_categorys="recom_categorys" :goods-list="goodsList" @tabChange="tabChange"/>
        </div>
      </vuescroll>
    </div>
  </div>
</template>

<script>
  import HomeCategory from './components/HomeCategory'
  import HomeRecommend from './components/HomeRecommend'
  import HomeSwiper from './components/HomeSwiper'

  // import vuescroll from 'vuescroll';

  import vuescroll from 'components/scroll/Scroll'

  import {HttpRequest} from 'api/api'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeCategory,
      HomeRecommend,
      vuescroll
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
        noData:false, //判断是否数据全部加载完成 true为全部加载完
        ops: {
          vuescroll: {
            pushLoad: {
              mode: 'slide',
              enable: true,
              auto: true,
              autoLoadDistance: 100
            },
          },
        }
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
      // 刷新开始
      refreshStart(done){
        console.log('kais');
        setTimeout(()=>{
          // 这里写 ajax 业务请求，在数据请求到后执行 done() 关闭动画
          done()
        },1600)
      },
      // 加载开始
      loadStart(done){
        console.log('ls');
        setTimeout(()=>{
          // 这里写 ajax 业务请求，在数据请求到后执行 done() 关闭动画
          done()
        },1600)
      },
      pageLoadStart(vm, loadDom, done){

        console.log('kai');
      },
      pageLoadEnd(vm, loadDom, done){
        console.log('end');
      },
      // 刷新开始
      // vsInstance vm===this
      // refreshDom === 刷新dom
      handleRS(vsInstance, refreshDom, done) {
        if(this.refreshStart){
          this.refreshStart(done)
        }else{
          this.setDone(done)
        }
      },
      // 刷新完之后
      handleRBD(vm, loadDom, done) {
        if(this.refreshDeactivate){
          this.refreshDeactivate(done)
        }else{
          setTimeout(()=>{
            this.setDone(done)
          },600)
        }
      },
      //*********-*********************-*
      //事件监听类
      tabChange(id) { //推荐分类栏的数据获取
        this.goodsList = [];
        this.cur_page = 1;
        this.currentCategory = id;
        this.getHomeGoods(id);
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
          }
        })
      },
      //加载更多
      getMoreGoods() {
        console.log('more');
        HttpRequest('/home/goods', 'get', {
          'page': this.cur_page + 1,
          'category_id': this.currentCategory
        }).then(res => {
          // if(res.data.current_page != res.data.last_page){
          //   this.cur_page += 1;
          // }

          if (res.data.data.length > 0) {
            this.cur_page = res.data.current_page;
            this.goodsList.push(...res.data.data);
          } else {
            this.$toast('没有更多了...')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .child-dom{
    height: 100%;
    width: 100%;
  }
  .child-dom{
    height: 100%;
    width: 100%;
  }
</style>
