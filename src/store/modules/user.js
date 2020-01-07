export default {
  state:{
    token:'sss',
  },
  actions:{

  },
  mutations:{

  },
  getters:{
    /**
     * 获取token
     * @param state
     * @param getters
     * @param rootState
     */
    getToken(state,getters,rootState){
      return state.token;
    }
  }
}
