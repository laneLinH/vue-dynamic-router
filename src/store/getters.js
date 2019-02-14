const getters = {
  accountName: state => state.login.accountName,
  role: state => state.login.role,
  orgname: state => state.login.orgname,
  routes: state => state.menu.routes,
    lastime:state=>state.login.lastime
  }
export default getters
