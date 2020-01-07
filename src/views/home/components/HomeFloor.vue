<template>
  <div class="home-floor">
    <!--楼层推荐分类商品-->
    <div class="floor-item">
      <div class="title">
        <span>服饰鞋帽</span>
        <span>查看更多...</span>
        <i></i>
      </div>
      <div class="goods">
        <div class="goods-item">
          <router-link to="">
            <img src="" alt=""/>
            <div>
              <span class="title">夏季男休闲西服纯棉透气吸汗服饰</span>
              <span>￥99.00元</span>
              <span class="tag"></span>
            </div>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeFloor",
    props:'',
    data(){
      return {
        goodsList:[
          {
            image:'',
            title:'',
            price:'',
            tag:'',
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
