<template>
  <div class="category">
    <van-nav-bar title="分类大全" fixed/>
    <van-tree-select
      class="tree_select"
      height="100vh - 50px"
      :items="category"
      :main-active-index="category.id"
      :main-active-index.sync="activeIndex"
      @click-nav="navCLick"
    >

      <template slot="content">
        <div class="category-goods">
          <scroll class="container" ref="scroll" @loadMore="loadMore">
            <child-category ref="child_category" :children="children" @childClick="childClick"/>
            <goods-list ref="goods_list" @imgLoad="imgLoad" :goods-list="goodsList" @orderGoods="orderGoods"/>
            <div class="no-data" v-show="noData">
              -- 没有更多了 --
            </div>
          </scroll>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
  import ChildCategory from './components/ChildCategory'
  import GoodsList from './components/GoodsList'
  import Search from 'components/search/Search'
  import Scroll from 'components/scroll/Scroll'

  import {HttpRequest} from "api/api";

  export default {
    name: "Category",
    components: {
      ChildCategory,
      GoodsList,
      Search,
      Scroll
    },
    data() {
      return {
        activeIndex: 0,
        category: [],
        categoryIdsKv: [],//键值对数组 对应分类的每一个标签
        noData: false,
        children: [],
        goodsList:[],
        currCategoryId: 0,//当前选中的id
        nextPage: 2,//下一页
        isLoading:false,//上拉加载状态
        sort:'created_at',
        order_by:'desc',
        isFirstEnter:true,
        scrollY:0,
      }
    },
    watch: {
      // categoryIdsKv(newData) {
      //   console.log(111);
        // this.currCategoryId = newData['0'] ? newData['0'] : 0;
        // if (this.currCategoryId) { //如果有大分类数据回来，就请求子分类
        //   this.getChildCategory(this.currCategoryId) //获得子分类
        //   this.getGoods({
        //     category_id:this.currCategoryId
        //   }) //获得商品
        // }
      // }
    },
    activated() {
      // this.$refs['scroll'].refresh();
      //先获取所有分类
      if(!this.$route.meta.isBack || this.isFirstEnter){
        this.goodsList = [];
        this.noData = false;
        this.nextPage = 2;
        this.activeIndex = 0;
        this.isLoading = false;//关闭加载状态
        this.getAllCategory();
      }
      this.isFirstEnter = false;
      this.$route.meta.isBack = false;
      this.$refs.scroll.scrollTo(0,this.scrollY,100);
    },
    beforeRouteLeave(to, form, next) {
      this.scrollY = this.$refs.scroll.getScrollY();
      next()
    },
    beforeRouteEnter(to,from,next){
      if(from.name == 'goods' && to.name == 'category'){
        to.meta.isBack = true;
        next()
      }else{
        next()
      }
    },
    methods: {
      /**
       * 排序事件监听
       */
      orderGoods(order_type){
        this.noData = false;
        this.isLoading = false;//关闭加载状态
        this.nextPage = 2;

        switch (order_type) {
          case 'time_desc':
                this.sort = 'created_at';
                this.order_by = 'desc';
            break;
          case 'price_desc':
              this.sort = 'price';
              this.order_by = 'desc';
            break;
          case 'price_asc':
              this.sort = 'price';
              this.order_by = 'asc';
            break;
          case 'sort_asc':
              this.sort = 'sort';
              this.order_by = 'asc';
            break;
          case 'sort_desc':
              this.sort = 'sort';
              this.order_by = 'desc';
            break;
          default:
        }

        let params = {
          category_id:this.currCategoryId,
          sort:this.sort,
          order_by:this.order_by
        }

        this.getGoods(params);

      },
      /**
       * 子分类点击
       */
      childClick(category_id) {

        this.noData = false;
        this.isLoading = false;//关闭加载状态
        this.nextPage = 2;
        this.currCategoryId = category_id;
        this.getGoods({
          category_id:category_id
        });
      },
      /**
       * 图片加载监听，完成刷新scroll
       */
      imgLoad() {
        this.$refs['scroll'].refresh();
      },
      /**
       * 加载更多
       */
      async loadMore() {
        if(this.isLoading == false){
          if(this.noData == false){ //有数据的时候才加载
            this.isLoading = true; //把加载状态设置为true 防止重复加载
            this.$toast.loading({
              message:'加载中...'
            })
            await HttpRequest('category/goods','get',{
                category_id:this.currCategoryId,
                page:this.nextPage,
                sort:this.sort,
                order_by:this.order_by
              }).then(res=>{
                this.goodsList.push(...res.data.data);
                if(res.data.current_page == res.data.last_page){ //最后一页了，没数据了，就设置成没有数据
                  this.noData = true; //加载完成后，把无数据状态设置为true
                  this.nextPage = 2; //复原下一页 用于其他分类的加载
                }
                this.nextPage += 1; //加载成功后，下一页往下加
                this.isLoading = false;//关闭加载状态
                this.$toast.clear();//关闭提示
              }).catch(res=>{
                this.$toast.clear();
                this.isLoading = false;
              })
          }
          this.$refs.scroll.finishPullUp();
        }
      },
      /**
       * 获得所有大分类
       */
      getAllCategory() {
        this.$toast.loading('加载中');
        HttpRequest('category/categorys').then(res => {
          this.category = res.data.categorys;

          this.categoryIdsKv = [];
          //做成一个键值对，对应每一个分类数据
          res.data.categorys.forEach(item => {
            this.categoryIdsKv.push(item.id);
          })

          this.currCategoryId = this.categoryIdsKv['0'] ? this.categoryIdsKv['0'] : 0;
          if (this.currCategoryId) { //如果有大分类数据回来，就请求子分类
            this.getChildCategory(this.currCategoryId) //获得子分类
            this.getGoods({
              category_id:this.currCategoryId
            }) //获得商品
          }
          this.$toast.clear()
        }).catch(err=>{
          this.$toast.clear()
        })
      },
      /**
       * 左侧导航大分类点击
       */
      navCLick(index) {
        this.noData = false;
        let currCategoryId = this.categoryIdsKv[index];
        //获取分类下的子分类
        this.getChildCategory(currCategoryId);
        //把当前分类指向选择的分类
        this.currCategoryId =  currCategoryId;
        //获得商品
        this.getGoods({
          category_id: currCategoryId,
        });

        this.$refs['child_category'].activeChildIndex = 0;
        this.$refs['goods_list'].orderIndex = 0;

        //复原排序
        this.sort='created_at';
        this.order_by='desc';
      },
      /**
       * 获得分类下的子分类
       * @param id
       */
      getChildCategory(id) {
        HttpRequest('/category/getChildCategory', 'get', {
          id: id
        }).then(res => {
          this.children = res.data;
        })
      },
      /**
       * 获得商品
       * @param params 对象参数
       */
      getGoods(params) {
        this.$toast.loading('加载中');
        HttpRequest('category/goods', 'get', params).then(res => {
          this.goodsList = res.data.data;

          if(res.data.current_page == res.data.last_page){
            this.noData = true;
          }
          this.$toast.clear()
        }).catch(err=>{
          this.$toast.clear()
        })
      }
    }
  }
</script>

<style scoped>
  .tree_select{
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
    left: 0;
  }
  .category-goods {
    height: calc(100vh - 46px);
    position: relative;
  }

  .container {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
  }

  .no-data {
    text-align: center;
    bottom: 50px;
    color: #c2d0d0;
    padding: 2%;
    box-sizing: border-box;
  }
</style>
