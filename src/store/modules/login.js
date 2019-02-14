import service from "@/utils/HttpUtils";
import api from '@/api'
const logins={
  state:{
    isFirstLoad:false,
    accountName:sessionStorage.getItem('accountName'),
    orgname:sessionStorage.getItem('orgname'),
    role:sessionStorage.getItem('role'),
    lastime:sessionStorage.getItem('lastime'),
  },
  mutations:{
    setAccount(state,data){
      state.accountName=data.accountName
      state.orgname=data.orgname
      state.role=data.role
      state.lastime=data.lastime
      sessionStorage.setItem('accountName',data.accountName)
      sessionStorage.setItem('orgname',data.orgname)
      sessionStorage.setItem('role',data.role)
      sessionStorage.setItem('lastime',data.lastime)
    },
    clearAccount(state,data){
      state.accountName=null
      state.orgname=null
      state.role=null
        state.lastime=null
      sessionStorage.clear()
      location.reload()
    }
  },
  actions:{
    loginIn ({ state, commit }, data) {
         return new Promise((resolve, reject)=>{
           service.http.post(api.sysAccount_cadrelogin,data).then((res)=>{
                 if(res.success){
                   commit('setAccount',res.data)
                   resolve(res)
                 }else{
                   service.http.handleError(res.msg)
                   resolve(res)
                 }
               },error=>{
                  service.http.handleError(error.msg)
                 reject(error)
               })
           })
    },
    loginOut({ state, commit }){
      // service.http.post('/sysAccount/logout',data).then((res)=>{
      //
      // })
          commit('clearAccount')
    }
  }
}
export default logins
