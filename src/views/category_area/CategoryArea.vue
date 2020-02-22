<template>
  <div class="category_area">
    <div>
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template slot="title">
            <input class="search_keyword_input" v-model="keyword" type="text" placeholder="请输入搜索的内容"/>
        </template>

        <van-icon name="search" @click="searchGoods" slot="right" />
      </van-nav-bar>
    </div>

    <div class="search">
      <van-dropdown-menu>
        <van-dropdown-item v-model="orderByDefault" @change="sortClick" title="排序" :options="orderByOptions" />

        <!--<van-dropdown-item title="分类" ref="item">
              <ul class="banner_filter">
                <li>全部</li>
                <li class="li_active">手机</li>
                <li>家用电器</li>
                <li>冰箱</li>
                <li>洗衣机</li>
                <li>洗碗机</li>
                <li>路由器</li>
                <li>汽车配件</li>
                <li>魔女斗篷</li>
                <li>跑跑卡丁车</li>
                <li>衣服鞋帽</li>
                <li>皮鞋箱包</li>
              </ul>
        </van-dropdown-item>
        <van-dropdown-item title="品牌" ref="item">
          <ul class="banner_filter">
            <li>全部</li>
            <li>手机</li>
            <li>电视</li>
            <li class="li_active">家用电器</li>
            <li>冰箱</li>
            <li>洗衣机</li>
            <li>洗碗机</li>
            <li>路由器</li>
            <li>汽车配件</li>
            <li>魔女斗篷</li>
            <li>跑跑卡丁车</li>
            <li>衣服鞋帽</li>
            <li>皮鞋箱包</li>
          </ul>
        </van-dropdown-item>-->

        <van-dropdown-item title="筛选" ref="filter_item">
          <div class="search_container">

            <div class="category">
              <div class="search_title">分类</div>
              <ul class="banner_filter">
                <li :class="[default_category_id == category_id ? 'li_active':'']" @click="changeCategory(default_category_id)">全部</li>
                <li :class="[item.id == category_id ? 'li_active':'']" v-for="(item,index) in categoryList" :key="index" @click="changeCategory(item.id)">{{ item.category_name }}</li>
              </ul>
            </div>

            <div class="brand">
              <div class="search_title">品牌</div>
              <ul class="banner_filter">
                <li :class="[brand_id == 0 ? 'li_active':'']" @click="changeBrand(0)">全部</li>
                <li :class="[item.id == brand_id ? 'li_active':'']" v-for="(item,index) in brandList" :key="index" @click="changeBrand(item.id)">{{ item.brand_name }}</li>
              </ul>
            </div>

            <div class="price">
              <div class="search_title">价格</div>
              <ul class="banner_filter">
                <li :class="[price == '' ? 'li_active' : '']" @click="changePrice('','')">全部</li>
                <li :class="[item['0'] + ',' + item['1'] == price ? 'li_active':'']" v-for="(item,index) in priceList" :key="index" @click="changePrice(item['0'],item['1'])">{{ item[0] + '-' + item['1'] }}</li>
              </ul>
            </div>
            <div class="attrs">

              <div class="attr_item" v-for="(item,spec_index) in filter_attr_data" :key="spec_index">
                <div class="search_title">{{ item.spec_name }}</div>
                <ul class="banner_filter">
                  <template v-for="(spec,item_index) in item.spec_item">
                    <template v-if="item_index == 0">
                      <li :class="[filter_arr[spec_index] == 0 ? 'li_active' : '']" @click="changeAttr(spec.id,'all')">全部</li>
                      <li :class="[filter_arr[spec_index] == spec.id ? 'li_active' : '']" @click="changeAttr(spec.id)">{{ spec.value }}</li>
                    </template>
                    <template v-else>
                      <li :class="[filter_arr[spec_index] == spec.id ? 'li_active' : '']" @click="changeAttr(spec.id)">{{ spec.value }}</li>
                    </template>
                  </template>
                </ul>
              </div>

             <!-- <div class="attr_item">
                <div class="search_title">配置</div>
                <ul class="banner_filter">
                  <li>64G</li>
                  <li>128G</li>
                  <li>256G</li>
                  <li>512G</li>
                  <li>1T</li>
                </ul>
              </div>
              <div class="attr_item">
                <div class="search_title">屏幕大小</div>
                <ul class="banner_filter">
                  <li>14寸</li>
                  <li>16寸</li>
                </ul>
              </div>
              <div class="attr_item">
                <div class="search_title">显卡类型</div>
                <ul class="banner_filter">
                  <li>ATI</li>
                  <li>NIVICATE</li>
                  <li>INTEL</li>
                </ul>
              </div>
              <div class="attr_item">
                <div class="search_title">网络制式</div>
                <ul class="banner_filter">
                  <li>4G</li>
                  <li>5G</li>
                  <li>3G</li>
                  <li>双模</li>
                </ul>
              </div>-->
            </div>
          </div>
          <van-button block type="info" class="search_confirm" @click="searchConfirm">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <div class="bar"></div>

    <div class="content">
      <scroll class="container" ref="scroll" @loadMore="loadMore" v-show="goods_list.length">
        <div class="goods_item_box">
          <div class="goods_item" v-for="(item,index) in goods_list" :key="index">
            <router-link :to="/goods/ + item.id">
              <div class="thumb">
                <img :src="item.thumb" @load="imgLoad"/>
              </div>
              <div class="goods_name">{{ item.goods_name }}</div>
              <div class="goods_price">￥{{ item.price }}</div>
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

  import Scroll from "components/scroll/Scroll";

  export default {
    name: "CategoryArea",
    components: {
      Scroll
    },
    data() {
      return {
        keyword:'',
        orderByDefault:0, //默认排序
        orderByOptions:[
          {text:'价格升序',value:0},
          {text:'价格降序',value:1},
          {text:'销量最多',value:2},
          {text:'新品上市',value:3},
        ],
        goods_list:[

        ],
        not_data:false,
        category_id:0,
        default_category_id:0,//默认的分类id 这个分类id是页面加载的时候从URI里面获取的
        brand_id:0,
        filter_attr:'', //用于过滤的字符串
        next_page:2,
        categoryList:[],
        brandList:[],
        price:'', //价格的筛选字段
        priceList:[], //价格的筛选字段
        filter_attr_data:[],//属性的筛选字段
        filter_arr:[],
        filter_arr_kv:[],
      }
    },
    watch: {
      filter_attr_data:{
        handler(newValue,oldValue){
          this.filter_arr = new Array(newValue.length).fill(0);
          //做成一个键值对
          newValue.forEach(item=>{
            let arr = [];
            item.spec_item.forEach(spec =>{
              arr.push(spec.id)
            })
            this.filter_arr_kv.push(arr);
          })
        },
        deep:true
      }
    },
    methods: {
      onClickLeft(){
        this.$router.push('/home');
      },
      sortClick(value){
        this.searchConfirm();
      },
      /**
       * 筛选确定
       */
      searchConfirm(){
        this.$toast.loading('加载中...');

        this.not_data = false;
        this.goods_list = [];
        this.next_page = 2;
        // this.orderByDefault = 0;

        let data = {
          category_id:this.category_id,
          brand_id:this.brand_id,
          price:this.price,
          filter_attr:this.filter_arr.join(),
          orderBy:this.orderByDefault,
          keyword:this.keyword,
        }

        HttpRequest('/search/filterGoods','get',data).then(res=>{
          console.log(res);
          if(res.code != 200){
            this.$toast(res.msg);
            this.$toast.clear();
            return false;
          }else{
            this.$toast.clear();
            if(res.data.current_page == res.data.last_page){
              this.not_data = true;
            }else {
              this.next_page = res.data.current_page + 1;
            }

            this.goods_list = res.data.data;
          }
        })

        this.$refs.filter_item.toggle(false);
      },
      imgLoad(){
        this.$refs.scroll.refresh()
      },
      //上拉加载更多
      loadMore(){
        if(!this.not_data){
          this.$toast.loading('加载中...');

          let data = {
            category_id:this.category_id,
            brand_id:this.brand_id,
            price:this.price,
            filter_attr:this.filter_arr.join(),
            orderBy:this.orderByDefault,
            keyword:this.keyword,
            page:this.next_page,
          }

          HttpRequest('/search/filterGoods','get',data).then(res=>{
            console.log(res);
            if(res.code != 200){
              this.$toast(res.msg);
              this.$toast.clear();
              return false;
            }else{
              this.$toast.clear();
              if(res.data.current_page == res.data.last_page){
                this.not_data = true;
              }else {
                this.next_page = res.data.current_page + 1;
              }

              this.goods_list.push(...res.data.data);
              this.$refs.scroll.finishPullUp();
            }
          })
        }else{
          this.$refs.scroll.finishPullUp();
        }
      },
      searchGoods(){
        console.log('搜索goods');
        this.not_data = false;
      },
      //更改分类
      changeCategory(id){
        this.category_id = id;
      },
      //更改品牌
      changeBrand(id){
        this.brand_id = id;
      },
      //更改价格
      changePrice(min_price,max_price){
        if(min_price && max_price){
          this.price = min_price + ',' + max_price;
        }else{
          this.price = '';
        }
      },
      changeAttr(value_id,select_type=""){
        let index = this.filter_arr_kv.findIndex((item) => {

          let finded = item.includes(value_id);

          if(finded){
            return true;
          }
        })

        if(select_type != 'all'){
          this.filter_arr.splice(index,1,value_id);
        }else{
          this.filter_arr.splice(index,1,0);
        }

        this.$forceUpdate()
      },
      //根据分类搜索产品
      categorySearch(){
        this.$toast.loading('加载中...');
        HttpRequest('/search/search','get',{category_id:this.category_id}).then(res=>{
            console.log(res);
            if(res.code != 200){
              this.$toast(res.msg);
              this.$toast.clear();
              return false;
            }else{
              this.$toast.clear();

              this.goods_list = res.data.goodsList.data;
              this.categoryList = res.data.categoryList;
              this.brandList = res.data.brandList;
              this.priceList = res.data.priceList;
              this.filter_attr_data = res.data.filter_attr_data;

              if(res.data.goodsList.current_page == res.data.goodsList.last_page){
                this.not_data = true;
              }
            }
        })
      },
      //根据关键词搜索产品
      keywordSearch(){

      }
    },
    created() {
      console.log(this.$route);
      // 页面加载时，通过keyword和分类id进行2个接口的请求区分

      this.category_id = this.$route.query.category_id ? this.$route.query.category_id : 0;
      this.default_category_id = this.$route.query.category_id ? this.$route.query.category_id : 0;
      this.keyword = this.$route.query.keyword ? this.$route.query.keyword : '';

      if(this.category_id){
        this.categorySearch();
      }else if(this.keyword){
        this.keywordSearch();
      }else{
        this.$toast('缺少必要的搜索条件');

        setTimeout(()=>{
          this.$router.replace('/home'); //跳转进首页
        },1000)
      }
    },
  }

</script>

<style scoped lang="less">
  .banner_filter{
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 5px;

    li{
      box-sizing: border-box;
      margin: 0 10px 8px;
      padding: 1%;
    }

    .li_active {
      border: #cccccc 1px solid;
      background-color: #cccccc;
      border-radius: 3px;
    }
  }

  .search_container{
    font-size: 14px;
    padding: 2%;

    .search_title{
      font-weight: bold;
      font-size: 16px;
    }
  }

  /*.search_confirm{
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
  }*/

  .search_keyword_input{
    border: none;
  }
  .content{
    height: calc(100vh - 96px);
    background-color: #ccc;
    .container{
      position: absolute;
      top: 94px;
      left: 0;
      width: 100%;
      bottom: 0;
      overflow: hidden;

      .goods_item_box{
        display: flex;
        justify-content: space-between;
        padding: 1%;
        flex-wrap: wrap;

        .goods_item{
          padding: 2%;
          border-radius: 5px;
          background-color: #fff;
          width: 44%;
          margin-bottom: 2%;

          .thumb{
            width: 100%;

            img{
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }

          .goods_name{
            font-size: 16px;
            color: #606060;
          }

          .goods_price{
            font-size: 14px;
            color: red;
            text-align: center;
          }
        }

        .goods_item:nth-child(odd){
          margin-left: 1%;
        }

        .goods_item:nth-child(even){
          margin-right: 1%;
        }
      }

      .not_data{
        font-size: 14px;
        color: #fff;
        padding: 2%;
        text-align: center;
      }
    }

    .not_result{
      font-size: 16px;
      background-color: #fff;
      color: #cccccc;
      height: 100%;
      padding-top: 2%;
      box-sizing: border-box;
      text-align: center;
    }
  }
</style>
