<template>
  <div class="goods_attr">
    <form>

      <div v-for="(item,index) in goods_spec" :key="index">
        <span>{{ item.spec_name }}：</span>

        <label v-for="(spec,item_index) in item.spec_items" :key="item_index">
          <input @click="getIntervel" :disabled="ipt_ctl" type="radio" :name="'attr['+item.spec_id+']'" :value="spec.id" v-model="choose_spec['attr_' + item.spec_id]"/>{{spec.value}}
        </label>
      </div>

      <!--<div>
        <span>内存：</span>
        <label><input type="radio" name="attr[2]" value="3" @click="addAttr(3)"/>3G</label>
        <label><input type="radio" name="attr[2]" value="6" @click="addAttr(4)"/>6G</label>
      </div>
      <div>
        <span>颜色：</span>
        <label><input type="radio" name="attr[3]" value="5" @click="addAttr(5)"/>移动4G</label>
        <label><input type="radio" name="attr[3]" value="7" @click="addAttr(6)"/>全网通</label>
      </div>-->
    </form>
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
        choose_spec: {},
        ipt_ctl:false,
        dicarer: [
          {
            spec: "1,13,15",
            val: 1,
          },
          {
            spec: "1,14,15",
            val: 0,
          },
          {
            spec: "10,13,15",
            val: 1,
          },
          {
            spec: "10,14,15",
            val: 1,
          }
        ]
      }
    },
    mounted() {
      let specs = {}
      this.goods_spec.forEach(item => {
        item.spec_items.forEach((spec, tindex) => {
          if (tindex == 0) {
            specs['attr_' + item.spec_id] = spec.id;
          }
        })
      })

      this.choose_spec = specs

    },
    watch: {
      /*goods_spec(newData) {
        let specs = []
        newData.forEach(item => {
          item.spec_items.forEach(spec => {
            var arr = [];
            arr['attr_' + spec.id] = spec.id;
            specs.push(arr);
          })
        })
      }*/
      choose_spec: {
        handler(newData, oldVal) {
          let ids = Object.values(newData).join();
          console.log(ids);
          let kucun = 0;
          this.dicarer.forEach((item, index) => {
            if (item.spec == ids) {
              kucun = item.val;
            }
          })

          console.log(kucun); //获得当时的库存
        },
        deep: true //true 深度监听
      }
    },
    filter: {},
    methods: {
      getIntervel() {
        console.log();
      }
    }
  }

</script>

<style scoped lang="less">

</style>
