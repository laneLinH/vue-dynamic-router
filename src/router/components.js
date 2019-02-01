const defualts = () => import('@/layout/Defualt')
const login =()=> import(/* webpackChunkName: "login" */ '@/page/login')
const notfound =()=> import(/* webpackChunkName: "notfound" */ '@/page/error/notfound')
export default{
  defualts,
  login,
  notfound
}
