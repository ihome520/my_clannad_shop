<template>
  <div class="order_detail">
    订单号： {{ order_sn }}
  </div>
</template>

<script>
  export default {
    name: "OrderDetail",
    components: {},
    props: {},
    data() {
      return {
        order_sn:this.$route.params.order_sn
      }
    },
    watch: {},
    filter: {},
    methods: {},
    created() {

    },
    mounted() {

    }
  }

</script>

<style scoped lang="less">

</style>
