<template>
  <div class="recommend">
    <van-tabs @click="tabClick" v-model="active">
      <van-tab  v-for="(item,index) in categorys" :key="index" :name="item.id" :title="item.category_name">
        <div class="goods-box">
          <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
            <img :src="item.image" alt=""/>
            <div>
              <span>{{ item.goods_name }}</span>
              <div class="price">￥{{ item.price }}</div>
              <i></i>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    data(){
      return {
        active:0,
        categorys:[
          {
            id:1,
            category_name:'手机'
          },
          {
            id:2,
            category_name:'电脑'
          },
          {
            id:3,
            category_name:'音响'
          },
          {
            id:4,
            category_name:'男装'
          },
          {
            id:5,
            category_name:'女装'
          },
          {
            id:6,
            category_name:'配件'
          },
          {
            id:7,
            category_name:'鞋帽'
          },
        ],
        goodsList:[
          {
            id:1,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          },
          {
            id:2,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          },
          {
            id:3,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          },
          {
            id:4,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          },
          {
            id:5,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          },
          {
            id:6,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          },
          {
            id:7,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          },
          {
            id:7,
            goods_name:'夏季新款男士纯棉短袖T恤吸汗透气男装',
            image:'https://s2.ax1x.com/2020/01/06/lsbp4K.jpg',
            price:99.99
          }
        ]
      }
    },
    methods:{
      tabClick(name,title){
        console.log(name);
        console.log(title);
      }
    }
  }
</script>

<style scoped lang="less">
  .goods-box{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 50px;

    .goods-item{
      width: 48%;
      padding: 2px;

      img{
        width: 100%;
      }

      .price{
        text-align: center;
      }
    }

    .goods-item:nth-child(even){
      margin-right: 3px;
    }

    .goods-item:nth-child(odd){
      margin-left: 3px;
    }
  }
</style>
