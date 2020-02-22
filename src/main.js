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
  Button, Toast, Dialog, Tag, Tabbar, TabbarItem, Icon,Popup,
  Swipe, SwipeItem, Search, Lazyload, Picker, Tab, Tabs, TreeSelect,Checkbox,CheckboxGroup,
  NavBar,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton,SwipeCell,SubmitBar,NoticeBar,
  PasswordInput, NumberKeyboard,Field,DropdownMenu,DropdownItem

} from 'vant' //引入vantUI库

Vue.use(Button).use(Toast).use(Dialog).use(Tag).use(Popup)
  .use(Tabbar).use(TabbarItem).use(Icon).use(Swipe).use(SwipeItem)
  .use(Search).use(Lazyload).use(Picker).use(Tab).use(Tabs).use(TreeSelect)
  .use(NavBar).use(Stepper).use(GoodsAction).use(GoodsActionButton)
  .use(GoodsActionIcon).use(Checkbox).use(CheckboxGroup).use(SwipeCell).use(SubmitBar).use(NoticeBar)
  .use(PasswordInput).use(NumberKeyboard).use(Field).use(DropdownMenu).use(DropdownItem); //引用组件


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
