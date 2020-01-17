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
    props:{
      children:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        activeChildIndex:0,
      }
    },
    methods: {
      childClick(category_id) {
        this.activeChildIndex = category_id;
        this.$emit('childClick',category_id)
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
