import {contactObj} from './tools'
const dynamicVx={
  state:{
    optData:[],
    singleRowData:null,
    isReloadTable:false,
  },
  mutations:{
    setOptData(state,data){
      if(!state.optData.length){
        let kl={}
        kl['name']=data.pageNameFlg
        kl['data']=data.data
        state.optData.push(kl)
      }else{
        for(let tp of state.optData){
          if(tp.name===data.pageNameFlg){
            if(Object.keys(data.data).length){
              tp.data=contactObj(data.data,tp.data)
            }else{
              tp.data={}
            }
          }else{
            let kl={}
            kl['name']=data.pageNameFlg
            kl['data']=data.data
            state.optData.push(kl)
          }
        }
      }
    },
    setisReloadTable(state,data){
      state.isReloadTable=data
    },
    getRowData(state,pageNameFlg){
      for(let k of state.optData){
        if(k.name===pageNameFlg){
          state.singleRowData=k.data['rowData']||null
          return false
        }
      }
    }
  },
  actions:{
    setOptData ({ state, commit }, data) {
      commit('setOptData',data)
    },
    setisReloadTable ({ state, commit }, data) {
      commit('setisReloadTable',data)
    },
    getRowData({ state, commit }, pageNameFlg){
      commit('getRowData',pageNameFlg)
    }
  }
}
export default dynamicVx
