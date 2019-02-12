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

      for(let tms of state.optData){
          if(tms.data['rowData']){
              if(data.pageNameFlg===tms.name){
                  state.singleRowData=tms.data['rowData'][0]||null
                  return;
              }
          }
      }
    },
    setisReloadTable(state,data){
      state.isReloadTable=data
    },
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
