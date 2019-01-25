

import {contactObj} from '@/utils/tools'
const dynamicVx={
  state:{
    optData:[],
    isReloadTable:false,
  },
  mutations:{
    setOptData(state,data){
        state.rowData=data
    },
    setisReloadTable(state,data){
      state.rowData=data
    }
  },
  actions:{
    setOptData ({ state, commit }, data) {
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
      console.log(state.optData)
      commit('setOptData',state.optData)
    },
    setisReloadTable ({ state, commit }, data) {
      commit('setisReloadTable',data)
    },
  }
}
export default dynamicVx
