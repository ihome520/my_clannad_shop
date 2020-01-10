<template>
  <ul class="child-category">
    <li :class="[ activeChildIndex == item.id ? 'active-child' : '' ]" class="child-cate-item" v-for="(item,index) in children" :key="index"
        @click="childClick(item.id)">
      {{ item.category_name }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "ChildCategory",
    data(){
      return {
        activeChildIndex:1,
        children: [
          {
            id: 1,
            category_name: '裙子'
          },
          {
            id: 2,
            category_name: '蓝牙耳机'
          },
          {
            id: 10,
            category_name: '平板电脑'
          },
          {
            id: 3,
            category_name: '连衣裙'
          },
          {
            id: 4,
            category_name: '卫衣'
          },
          {
            id: 5,
            category_name: '相机包'
          },
          {
            id: 6,
            category_name: '节庆饰品'
          },
          {
            id: 7,
            category_name: '帘艺隔断'
          },
          {
            id: 8,
            category_name: '镜头附件'
          },
          {
            id: 9,
            category_name: '电风扇'
          },
        ],
      }
    },
    methods: {
      childClick(category_id) {
        this.activeChildIndex = category_id;
        console.log(category_id);
        // this.$emit('childClick',category_id)
      },
    }
  }
</script>

<style scoped lang="less">
  .child-category {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;

    .child-cate-item {
      margin: 5px;
      padding: 3px 5px;
      font-size: 14px;
    }

    .active-child {
      background-color: aquamarine;
      border-radius: 20%;
    }
  }
</style>
