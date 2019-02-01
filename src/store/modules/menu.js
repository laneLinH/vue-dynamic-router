import {getMenuList} from '@/service/menu'
import {Message} from 'element-ui'
import comp from '@/router/components'
const menus={
  state:{
      menuList:null,
      routes:[],
      isLoadRoute:true
  },
  mutations:{
      setMenus(state,data){
         state.menuList=data
      },
    setRoutes(state,data){
        state.routes=data
    },
    setIsLoadRoute(state,data){
        state.isLoadRoute=data
    }
  },
  actions:{
      getMenuList({state,commit}){
        let menuList=[
          {
            name: '干部管理',
            path:'manageCadres',
            children: [
              {name: '归档申请', path: 'ApplicationArchive'},
              {name: '档案管理', path: 'ManageArchive'}
            ]
          },
          {
            name: '系统管理',
            path:'systemManage',
            children: [
              {name: '账户管理', path: 'ManageAccount'},
              {name: '组织管理', path: 'ManageOrganization'}
            ]
          },
          {
            name: 'testpage',
            path:'test',
            children: [
              {name: '账户管理', path: 'test'},
            ]
          }
        ]
        let dealMenuList=(list)=>{
          if(list.hasOwnProperty('children')){
            list.children.forEach((m,n)=>{
              m['pathUrl']='/'+list.path+'/'+m.path
            })
          }else{
            list.forEach((m,n)=>{
              dealMenuList(m)
            })
          }
        }
        dealMenuList(menuList)
        commit('setMenus',menuList)
      },
      configRoute({state,commit}){
        let accountRoutes=[]
        let dealRouter=(list,id)=>{
              if(list.hasOwnProperty('children')){
                let childroutes=[]
                list.children.forEach((m,n)=>{
                  let route={
                    path:m.path,
                    name:m.name,
                    meta:{title:m.name},
                    component:() => import('@/page/main'+m.pathUrl),
                    children:[]
                  }
                  childroutes.push(route)
                })
                accountRoutes[id].children=childroutes
              }else{
                list.forEach((m,n)=>{
                  let route={
                    path:'/'+m.path,
                    name:m.name,
                    meta:{title:m.name},
                    component:comp.defualts,
                    hidden:true,
                    children:[]
                  }

                  accountRoutes.push(route)
                  dealRouter(m,n)
                })
              }
          }
        dealRouter(state.menuList)
        accountRoutes.push(
          // {
          //   path:'/CadreManages',
          //   name:'阿萨德',
          //   meta:{title:'cadreManage'},
          //   component:() => import('@/layout/Defualt'),
          //   hidden:true,
          //   children:[
          //     {
          //       path:'ApplicationArchive',
          //       name:'阿萨德',
          //       meta:{title:'ApplicationArchive'},
          //       component:() => import('@/page/main/cadreManage/ApplicationArchive'),
          //       children:[]
          //     }
          //   ]
          // },
          )
        commit('setRoutes',accountRoutes)
      }
  }
}

export default menus
