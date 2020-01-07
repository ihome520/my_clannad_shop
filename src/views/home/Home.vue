<template>
  <div class="home">
    <!--search-->
    <van-search
      v-model="searchKeyWord"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!--swiper-->
    <van-swipe :autoplay="3000" :height="200">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <img v-lazy="item.image" />
      </van-swipe-item>
    </van-swipe>
    <!--主分类-->
    <home-category :category="category"/>
    <!--秒杀专场 待准备-->
    <!--楼层推荐-->
    <!--<home-floor/>-->

    <!--首页推荐-->
    <home-recommend/>
  </div>
</template>

<script>
  import HomeCategory from './components/HomeCategory'
  import HomeRecommend from './components/HomeRecommend'
  // import HomeFloor from './components/HomeFloor'

  import {HttpRequest} from 'api/api'

  export default {
    name: "Home",
    components:{
      HomeCategory,
      HomeRecommend
      // HomeFloor
    },
    data(){
      return {
        searchKeyWord:'',
        banner:[],
        category:[]
      }
    },
    mounted(){
      this.getHomeInfo();
    },
    methods:{
      onSearch(){
        if(this.searchKeyWord){
          this.$toast(this.searchKeyWord)
        }else{
          this.$toast('请输入要搜索的内容')
        }
      },
      getHomeInfo(){
        HttpRequest('/home/index').then(res=>{
          console.log(res);
          this.banner = res.data.banner;
          this.category = res.data.category;
        })
      }
    }
  }
</script>

<style scoped>

</style>
