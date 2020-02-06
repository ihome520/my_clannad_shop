import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import 'amfe-flexible/index.js'

//导入核心公共方法
import utils from './lib/utils'

FastClick.attach(document.body);//移动端300ms延时解决

import {
  Button, Toast, Dialog, Tag, Tabbar, TabbarItem, Icon,
  Swipe, SwipeItem, Search, Lazyload, Loading, Tab, Tabs, TreeSelect,Checkbox,CheckboxGroup,
  Grid, GridItem,NavBar,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton,SwipeCell,SubmitBar
} from 'vant' //引入vantUI库

Vue.use(Button).use(Toast).use(Dialog).use(Tag)
  .use(Tabbar).use(TabbarItem).use(Icon).use(Swipe).use(SwipeItem)
  .use(Search).use(Lazyload).use(Loading).use(Tab).use(Tabs).use(TreeSelect)
  .use(Grid).use(GridItem).use(NavBar).use(Stepper).use(GoodsAction).use(GoodsActionButton)
  .use(GoodsActionIcon).use(Checkbox).use(CheckboxGroup).use(SwipeCell).use(SubmitBar); //引用组件


//挂载组件
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.prototype.$utils = utils //核心公共方法

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
