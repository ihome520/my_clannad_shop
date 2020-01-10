<template>
  <div class="category">
    <search/>
    <van-tree-select
      height="100vh"
      :items="items"
      :main-active-index.sync="activeIndex"
    >

        <template slot="content">
          <div class="category-goods">
            <scroll class="container" ref="scroll" @loadMore="loadMore">
              <child-category @childClick.navtive="childClick"/>
              <goods-list @imgLoad="imgLoad" :goods-list="goodsList" />
              <!--<div class="no-data" v-show="noData">
                &#45;&#45; 没有更多了 &#45;&#45;
              </div>

              <div class="on-bottom">
                &#45;&#45; 到底啦 &#45;&#45;
              </div>-->
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
        items: [{text: '分组 1'}, {text: '分组 2'}],
        noData: true,

        goodsList: [
          {
            id: 1,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          },
          {
            id: 2,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          },
          {
            id: 3,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          },
          {
            id: 4,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          },
          {
            id: 5,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          },
          {
            id: 6,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          },
          {
            id: 7,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          },
          {
            id: 7,
            goods_name: '夏季新款男士纯棉短袖T恤吸汗透气男装',
            thumb: 'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price: 99.99
          }
        ]
      }
    },
    mounted(){
      this.$refs['scroll'].refresh();
    },
    methods: {
      childClick(e){
        console.log(11234);
        console.log(e);
      },
      // childClick(category_id) {
      //   this.activeChildIndex = category_id;
      //   console.log(category_id);
      // },
      // orderClick(index) {
      //   this.orderIndex = index;
      // },
      imgLoad(){
        console.log('sss');
        this.$refs['scroll'].refresh();
      },
      loadMore(){
        console.log('loadmore');
        this.$refs.scroll.finishPullUp();
      },

    }
  }
</script>

<style scoped lang="less">
  .category-goods{
    height: 100vh;
    position: relative;
  }
  .container {
    position: absolute;
    overflow: hidden;
    top: 1px;
    bottom: 50px;
    left: 0;
    right: 0;
  }

  .no-data {
    text-align: center;
    position: relative;
    bottom: 50px;
    color: #c2d0d0;
  }

  .on-bottom{
    height: 100vh;
  }
</style>
