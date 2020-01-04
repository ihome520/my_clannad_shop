import Vue from 'vue'
import Vuex from 'vuex'

//引入vue的基本模块
import State from './state'
import Actions from './actions'
import Mutations from './mutations'
import Getters from './getters'

//引入modules
// import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: State,
  mutations: Mutations,
  actions:Actions,
  getters:Getters,
  modules:{
    // user
  }
})
