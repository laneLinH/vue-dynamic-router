const tarNav={
  state:{
    tarNavList:[]
  },
  mutations:{
    setTarNav(state,data){
      state.tarNavList=data
    }
  }
  ,
  actions:{
    setTarNav({state,commit},data){
      let isHas=false
       isHas= state.tarNavList.some(m=>{
         return m.path===data.fullPath
       })
      if(!isHas){
        state.tarNavList.push({
          title: data.meta.title,
          path: data.fullPath,
          name: data.matched[1].name
        })
      }
      commit('setTarNav',state.tarNavList)
    },
    clearTarNav({state,commit},data){
      state.tarNavList.map(m=>m.name!==data.name)
      commit('setTarNav',state.tarNavList)
    }
  }
}

export default tarNav
