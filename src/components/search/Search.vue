<template>
  <van-search v-model="searchKeyWord" placeholder="请输入搜索关键词" maxlength="20" show-action shape="round" @search="onSearch">
    <div slot="action" @click="onSearch">搜索</div>
  </van-search>
</template>

<script>
  export default {
    name: "Search",
    data(){
      return {
        searchKeyWord: '',
      }
    },
    methods:{
      onSearch() { //搜索
        if (this.searchKeyWord) {
          //执行搜索
          this.$router.push({
            path:'/search',
            query:{keyword:this.searchKeyWord}
          });
        } else {
          this.$toast('请输入要搜索的内容')
        }
      },
    }

  }
</script>

<style scoped>

</style>
