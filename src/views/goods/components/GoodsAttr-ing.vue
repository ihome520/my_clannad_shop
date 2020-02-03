<template>
  <div class="goods_attr">

    <div v-for="(item,spec_index) in goods_spec" :key="spec_index">
      <span>{{ item.spec_name }}：</span>

      <ul v-for="(spec,item_index) in item.spec_items" :key="item_index">
        <li @click="specBtn(spec.id,spec_index,item.spec_id,item_index)"
            :class="[selectIndex[spec_index] == item_index ? 'item_selected':'',
          spec.isShow ? 'dont_select':''

          ]"
        >{{spec.value}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: "GoodsAttr",
    components: {},
    props: {},
    data() {
      return {
        goods_spec: [
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
        ],
        choose_spec: [],
        inventoryKv: {},
        selectIndex: {},//选中的下标
        selectParentSpecIndex: {},
        dontSelectId: [],//不可以选中的id
      }
    },
    mounted() {
      //做一个键值对
      this.goods_inventory.forEach(item => {
        this.inventoryKv[item.sku_list] = item;
      })

      // let specs = {}
      // this.goods_spec.forEach(item => {
      //   item.spec_items.forEach((spec, tindex) => {
      //     if (tindex == 0) {
      //       specs['attr_' + item.spec_id] = spec.id;
      //     }
      //   })
      // })
      //
      // this.choose_spec = specs

    },
    methods: {
      specBtn(spec_id, spec_index, parent_spec_id, item_index) {
        //选中
        if (this.choose_spec[spec_index] != spec_id) {
          this.choose_spec[spec_index] = spec_id;
          this.selectIndex[spec_index] = item_index;
          this.selectParentSpecIndex[spec_index] = parent_spec_id;
        } else { //再次按下，不选中
          this.choose_spec[spec_index] = "";
          this.selectIndex[spec_index] = -1;
          this.selectParentSpecIndex[spec_index] = '';

          let index = this.choose_spec.findIndex((item,index)=>{
            return item == spec_id;
          })

          this.choose_spec.splice(index,1);

          if(this.choose_spec.length < 1){
            this.goods_spec.forEach((item, spec_index) => {
              item.spec_items.forEach((spec, value_index) => {
                  this.goods_spec[spec_index].spec_items[value_index].isShow = false;
              })
            })
            this.dontSelectId = [];
          }
        }
        this.$forceUpdate(); //重绘

        // this.checkComb();
      },
      //检查组合
      checkComb() {
        let len = this.goods_spec.length; //获得规格的长度，表示有多少种规格
        let goods_spec = this.goods_spec;
        console.log('长度：' + len);
        let combs = [];
        let readSpecId = [];
        let tmp = [];
        let flag = 1;

        this.choose_spec.forEach((item,index) => {
          let select_spec_id = this.selectParentSpecIndex[index];
          console.log('dafenleiid==' + select_spec_id);
          combs.push(this.choose_spec[index]);
          readSpecId.push(select_spec_id);

          let func = (select_spec_id) => {
            //再循环所有的规格
            /*this.goods_spec.forEach((spec,i)=>{
              //判断现在循环的规格是否是一件选中的，如果不是 则循环规格子项
              if(spec.spec_id != select_spec_id && !readSpecId.includes(spec.spec_id)){
                // for (let item in spec.spec_items){
                //   combs.push(spec.spec_items[item].id);
                //
                //   if(combs.length != len){ //规格还不满当前商品所有规格选项
                //     func(select_spec_id);
                //   }else{
                //     console.log('满足3个');
                //     console.log(combs);
                //   }
                // }
                console.log('循环前：' + i);
                console.log(combs);

                readSpecId.push(spec.spec_id);

                spec.spec_items.forEach((item)=>{
                  console.log(flag);
                  if(flag == 1){
                    tmp = combs;
                    flag = 2;
                  }else{
                    console.log('flag= ====2');
                    console.log(tmp);
                  }
                  combs.push(item.id);

                  // if(combs.length != len){
                  //   console.log('递归前：');
                  //   console.log(combs);
                  //   console.log(tmp);
                  //   return false;
                  //   // func(spec.spec_id)
                  // }else {
                  //   console.log('满足3个');
                  //   console.log(combs);
                  //
                  //   // readSpecId = [];
                  //   // combs = [];
                  //   // combs.push(this.choose_spec[index]);
                  //   console.log('tmp:=====');
                  //   console.log(tmp);
                  //   // combs = tmp;
                  //   return false;
                  // }
                })
              }else{
                console.log('fff');
              }

              return false;
            })*/

            for (let i in goods_spec) {
              if (goods_spec[i].spec_id != select_spec_id && !readSpecId.includes(goods_spec[i].spec_id)) {
                readSpecId.push(goods_spec[i].spec_id);
                console.log(readSpecId);
                let spec_items = goods_spec[i].spec_items;

                for (let item in spec_items) {
                  if (combs.length != len) {
                    if(flag == 1){
                        tmp = combs;
                        flag = 2;
                        console.log(tmp);
                    }

                    combs.push(spec_items[item].id);
                    this.dontSelectId.push(spec_items[item].id);
                    func(goods_spec[i].spec_id);
                  } else {
                    console.log('3个完成');
                    console.log(combs);

                    //判断库存是否可以选
                    this.checkSelect(combs);

                    combs = tmp;
                    console.log(combs);
                    flag = 1;
                  }
                }
              }
            }
          }

          console.log(select_spec_id);
          func(select_spec_id);
        })
      },
      checkSelect(combs) {
        if (combs.length == 3) {
          if (this.inventoryKv[combs].inventory == 0) {
            console.log('满足');
            this.goods_spec.forEach((item, spec_index) => {
              item.spec_items.forEach((spec, value_index) => {
                if (this.dontSelectId.includes(spec.id)) {
                  this.goods_spec[spec_index].spec_items[value_index].isShow = true;
                }
              })
            })
            this.dontSelectId = [];
          }
        }
        this.$forceUpdate(); //重绘

      }
    }
  }

</script>

<style scoped lang="less">
  .item_selected {
    background-color: #22d2e3;
  }

  .dont_select {
    background-color: red;
    pointer-events: none;
  }
</style>
