import Vue from 'vue'
import Components from './components'
import routes from './router'
import Router from 'vue-router'
import store from "@/store";
Vue.use(Router)


const rtObj=new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes
})

let urlCache=null
rtObj.beforeEach((to,from,next)=>{
  if(to.redirectedFrom){
    urlCache=to.redirectedFrom
  }else{
    document.title=to.meta.title;
  }

  if(store.getters.accountName){
    if(!store.getters.routes.length){
      store.dispatch('getMenuList')
      store.dispatch('configRoute')
      rtObj.addRoutes(store.getters.routes)
      if(urlCache){
        next(urlCache)
      }  else{
        next({ ...to, replace: true })
      }
    }else{
      next()
    }
  }else{
    if(to.path==='/login'){
      next()
    }else{
      next('/login')
    }
  }
  if(to.meta.title && !urlCache){
    document.title=to.meta.title;
  }
})


export default rtObj
