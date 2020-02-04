export default {
  state:{
    token:'',
  },
  actions:{
    setLoginStatus(context,token){
      context.commit('SET_LOGIN',token);
    }
  },
  mutations:{
    SET_LOGIN(state,token){
      state.token = token;
    }
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
