import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'

FastClick.attach(document.body);//移动端300ms延时解决

import {Button, ImagePreview, Toast, Dialog, Popup, Tabbar, TabbarItem} from 'vant' //引入vantUI库

Vue.use(Button).use(ImagePreview).use(Toast).use(Dialog).use(Popup).use(Tabbar).use(TabbarItem); //引用组件

//挂载组件
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.prototype.$imagePreview = ImagePreview

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
