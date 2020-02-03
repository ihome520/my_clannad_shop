<template>
  <div class="goods">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <goods-swiper :album="goods_album"/>
    <goods-price :goods="goods" :goods_inventory="goods_inventory"/>
    <goods-attr :goods_spec="goods_spec" :goods_inventory="goods_inventory" @changeSelectSpec="changeSelectSpec"/>
    <goods-detail :content="goods.description"/>
    <goods-buy :disabled_buy="disabled_buy" @addToCart="addToCart" @buyGoods="buyGoods"/>
  </div>
</template>

<script>
  import GoodsSwiper from "./components/GoodsSwiper";
  import GoodsPrice from "./components/GoodsPrice";
  import GoodsAttr from "./components/GoodsAttr";
  import GoodsDetail from "./components/GoodsDetail";
  import GoodsBuy from "./components/GoodsBuy";

  import { HttpRequest } from "../../api/api";

  export default {
    name: "Goods",
    components:{
      GoodsSwiper,
      GoodsPrice,
      GoodsAttr,
      GoodsDetail,
      GoodsBuy
    },
    data(){
      return {
        goods_album: [],
        goods_id:0,
        goods:{
          type:Object,
          default(){
            return {}
          }
        },
        goods_spec:[],
        goods_inventory:[],
        inventoryKv:{},//库存键值对
        disabled_buy:false,//是否可以购买，当库存不足时，不可购买
        choose_spec:[],
        goods_num:1,
      }
    },
    watch:{
      goods_inventory:{
        handler(newData){
          //做一个键值对
          newData.forEach(item => {
            this.inventoryKv[item.sku_list] = item;
          })
        },
        deep:true
      },
    },
    mounted(){
      console.log(this.$route);
      this.getGoodsInfo();
    },
    methods:{
      onClickLeft(){
        this.$router.back(-1);
      },
      /**
       * 选中的属性
       * @param skuData
       */
      changeSelectSpec(skuData){
        console.log(skuData);
        this.choose_spec = skuData.choose_spec; //已经选中的sku
        this.goods_num = skuData.goods_num;//商品数量

        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if(filterSpec.length == this.goods_spec.length){
          let stock = this.inventoryKv[this.choose_spec].inventory;
          console.log('lkuc---',stock);
          if(stock < 1){
            this.disabled_buy = true; //无货，不可购买
            this.$toast({
              message: '该规格库存不足'
            })
          }else{
            this.disabled_buy = false;
          }
        }else{
          this.disabled_buy = false;
        }
      },
      /**
       * 加购
       */
      addToCart(){
        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if(filterSpec.length != this.goods_spec.length){
          this.$toast('请选择完整的商品规格');
        }
      },
      /**
       * 直接购买
       */
      buyGoods(){
        let filterSpec = this.choose_spec.filter(res => {
          return res != '';
        })
        if(filterSpec.length != this.goods_spec.length){
          this.$toast('请选择完整的商品规格');
        }
      },
      getGoodsInfo(){
        HttpRequest('/goods/show/' + this.$route.params.id).then(res=>{
          if(res.code == 404){
            this.$toast({
              message:res.msg,
            })

            setTimeout(()=>{
              this.$router.back(-1);
            },1000)

            setTimeout(()=>{
              location.reload();
            },2000)

            return false;
          }

          console.log(res);
          this.goods_album = res.data.goods_album;
          this.goods = res.data.goods;
          this.goods_spec = res.data.goods_spec;
          this.goods_inventory = res.data.goods_inventory;

        })
      }
    }
  }
</script>

<style scoped>

</style>
