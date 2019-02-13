import Components from "./components";

const routes=[

  {
    path:'/login',
    component:Components.login,
    meta:{
      title:'登录'
    }
  },
  {
    path: '*',
    redirect:'/login'
  }
]
export default routes
