<template>
  <div class="goods_attr">
    <div class="product_spec_title">产品规格：</div>
    <div class="spec_category" v-for="(item,spec_index) in goods_spec" :key="spec_index">
      <span class="spec_title">{{ item.spec_name }}：</span>
      <ul class="spec">
        <li class="spec_item" v-for="(spec,item_index) in item.spec_items" :key="item_index" @click="specBtn(spec.id,spec_index,item.spec_id,item_index)"
            :class="[selectIndex[spec_index] == item_index ? 'item_selected':'',]"
        >{{spec.value}}
        </li>
      </ul>
    </div>
    <div class="bay_num">
      <span>购买数量：</span>
      <van-stepper v-model="goods_num" @change="changeGoodsNumber" min="1" max="5000" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsAttr",
    components: {},
    props: {
      goods_spec:{
        type:Array,
        default(){
          return []
        }
      },
      goods_inventory:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
       /* goods_spec: [
          {
            "goods_id": 76,
            "spec_id": 1,
            "spec_name": "颜色",
            "spec_value_id": "1,10",
            "spec_items": [
              {
                "id": 1,
                "value": "红色"
              },
              {
                "id": 10,
                "value": "绿色"
              }
            ]
          },
          {
            "goods_id": 76,
            "spec_id": 6,
            "spec_name": "容量",
            "spec_value_id": "14,13",
            "spec_items": [
              {
                "id": 13,
                "value": "128GB"
              },
              {
                "id": 14,
                "value": "256GB"
              }
            ]
          },
          {
            "goods_id": 76,
            "spec_id": 7,
            "spec_name": "网络类型",
            "spec_value_id": "15",
            "spec_items": [
              {
                "id": 15,
                "value": "移动4G"
              }
            ]
          }
        ],
        goods_inventory: [
          {
            "sku_list": "1,13,15",
            "inventory": 0,
            "price": "19.00"
          },
          {
            "sku_list": "1,14,15",
            "inventory": 29,
            "price": "28.00"
          },
          {
            "sku_list": "10,13,15",
            "inventory": 20,
            "price": "37.00"
          },
          {
            "sku_list": "10,14,15",
            "inventory": 0,
            "price": "46.00"
          }
        ],*/
        choose_spec: [],
        selectIndex: {},//选中的下标
        goods_num:1,//初始化产品的数量
      }
    },
    mounted() {

    },
    methods: {
      specBtn(spec_id, spec_index, parent_spec_id, item_index) {
        //选中
        if (this.choose_spec[spec_index] != spec_id) {
          this.choose_spec[spec_index] = spec_id;
          this.selectIndex[spec_index] = item_index;


        } else { //再次按下，不选中
          this.choose_spec[spec_index] = "";
          this.selectIndex[spec_index] = -1;

          // let index = this.choose_spec.findIndex((item,index)=>{
          //   return item == spec_id;
          // })
          //
          // if(index != undefined){
          //   this.choose_spec.splice(index,1);
          // }
        }

        //点击后，将数据传给外面，让外面进行判断选中的数据
        this.$emit('changeSelectSpec',{
          choose_spec: this.choose_spec,
          goods_num: this.goods_num
        })


        this.$forceUpdate(); //重绘
      },
      changeGoodsNumber(){
        this.$emit('changeGoodsNumber',this.goods_num)
      }
    }
  }

</script>

<style scoped lang="less">
  .bay_num{
    display: flex;
    padding-top: 5px;

    span{
      line-height: 25px;
    }
  }
  .goods_attr{
    border-bottom: #e8e8e8 10px solid;
    padding: 5px;
    font-size: 14px;
  }

  .item_selected {
    background-color: #ffd7b4;
  }

  .product_spec_title{
    padding: 3px;
    border-bottom: #aea699 1px solid;
  }

  .spec_category{
    display: flex;
    padding: 2px;

    .spec_title{
      padding: 5px 5px 0px 0px;
      line-height: 25px;
    }

    .spec{
      display: flex;
      flex-wrap: wrap;
    }

    .spec .spec_item{
      margin: 5px 5px 0px;
      padding: 4px 6px;
      border-radius: 10%;
      border: #d8d8d8 1px solid;
    }
  }
</style>
