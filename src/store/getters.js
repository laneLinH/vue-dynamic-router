const getters = {
  accountName: state => state.login.accountName,
  role: state => state.login.role,
  orgname: state => state.login.orgname,
  routes: state => state.menu.routes
  }
export default getters
