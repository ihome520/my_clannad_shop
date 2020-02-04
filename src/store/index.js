import Vue from 'vue'
import Vuex from 'vuex'

//引入vue的基本模块
import State from './state'
import Actions from './actions'
import Mutations from './mutations'
import Getters from './getters'
import createPersistedState from 'vuex-persistedstate'
//引入modules
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()], //载入存储拓展 用于存储vuex的数据 防止刷新丢失
  state: State,
  mutations: Mutations,
  actions:Actions,
  getters:Getters,
  modules:{
    user
  }
})
