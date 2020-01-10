<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <!--定义一个插槽，放置里面的东西，不需要定义名字，使用默认的插槽即可-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType:{ //设置为3的时候，才会执行滚动监听
        type:Number,
        default:0,
      },
      pullUpload:{ //触底控制
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    mounted(){
      //实例化对象
      this.scroll = new Bscroll(this.$refs.wrapper,{
        pullUpLoad:true,
        pullDownRefresh:true,
        probeType:this.probeType,
        click:true,
        tap:true
      })

      this.scroll.on('pullingUp',()=>{
        console.log(111);
        this.$emit('loadMore');
      })

      //设置滚动监听
      if(this.probeType == 2 || this.probeType == 3){
        this.scroll.on('scroll',(position)=>{
          //把拿到的坐标x,y地址向外发送 {x:89,y:342}
          this.$emit('pageScrollEvent',position)
        })
      }

      this.scroll.on('pullingDown', () => {
        console.log('处理下拉刷新操作')
        setTimeout(() => {
          console.log('asfsaf')
// 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
          this.scroll.finishPullDown()
        }, 1000)
      })
      //上拉触底事件
      // if(this.pullUpload){
      //   this.scroll.on('pullingUp',()=>{
      //     console.log(111);
      //     this.$emit('loadMore');
      //   })
      // }

    },
    methods:{
      //滚动到顶部
      scrollTo(x,y,time = 5000){
        this.scroll.scrollTo(x,y,time)
      },
      refresh(){ //重新刷新计算高度
        this.scroll && this.scroll.refresh();
      },
      finishPullUp(){ //告诉scroll 滚动监听完成
        console.log('已通知');
        this.scroll && this.scroll.finishPullUp();
      },
      getScrollY(){ //获取当前位置的y值
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
