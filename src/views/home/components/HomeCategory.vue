<template>
  <div class="category">
    <div class="category-item" v-for="(item,index) in category" :key="index">
      <router-link :to="/category/ + item.id">
        <img :src="item.image" alt=""/>
        <div>{{ item.category_name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        type: Array,
        default() {
          return []
        }
      }
    },
    name: "HomeCategory"
  }
</script>

<style scoped lang='less'>
  .category {
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: 5px;
    padding: 5px 0 10px;
    border-bottom: 5px solid #eaeaea;
    flex-wrap: wrap;

    .category-item {
      width: 25%;

      img {
        width: 70px;
        height: 70px;
        margin-bottom: 5px;
      }
    }
  }
</style>
