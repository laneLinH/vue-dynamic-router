import service from "@/utils/HttpUtils";
const logins={
  state:{
    isFirstLoad:false,
    accountName:sessionStorage.getItem('accountName'),
    orgname:sessionStorage.getItem('orgname'),
    role:sessionStorage.getItem('role'),
  },
  mutations:{
    setAccount(state,data){
      state.accountName=data.accountName
      state.orgname=data.orgname
      state.role=data.role
      sessionStorage.setItem('accountName',data.accountName)
      sessionStorage.setItem('orgname',data.orgname)
      sessionStorage.setItem('role',data.role)
    },
    clearAccount(state,data){
      state.accountName=null
      state.orgname=null
      state.role=null
      sessionStorage.clear()
      location.reload()
    }
  },
  actions:{
    loginIn ({ state, commit }, data) {
         return new Promise((resolve, reject)=>{
           service.http.post('/sysAccount/cadrelogin',data).then((res)=>{
                 if(res.code===200){
                   commit('setAccount',{accountName:data.accountName,orgname:res.data.orgname,role:res.data.role})
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
