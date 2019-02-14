// import {getMenuList} from '@/service/menu'
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
            permission:[1,2],
            children: [
              {name: '档案管理', path: 'manageArchive',permission:[1,2]},
              {name: '审核', path: 'applicationArchive',permission:[1]}
            ]
          },
          {
            name: '系统管理',
            path:'systemManage',
            permission:[1],
            children: [
              {name: '账户管理', path: 'manageAccount', permission:[1]},
              {name: '组织管理', path: 'manageOrganization', permission:[1]}
            ]
          }
        ]
        let role=sessionStorage.getItem('role')
        let tempary=[]
        let dealMenuList=(list,id)=>{
          if(list.hasOwnProperty('children')){
              let child=[]
                list.children.forEach((v)=>{
                    if(v.permission.includes(parseInt(role))) {
                        v['pathUrl'] = '/' + list.path + '/' + v.path
                        child.push(v)
                    }
                })
              if(child.length){
                  tempary[id].children=child
              }
          }else{
            list.forEach((m,n)=>{
                if(m.permission.includes(parseInt(role))) {
                    tempary.push(m)
                }
              dealMenuList(m,n)
            })
          }
        }
        dealMenuList(menuList)
        commit('setMenus',tempary)
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
                        meta:{title:m.name,permission:m.permission},
                        component:() => import('@/page/main'+m.pathUrl),
                        children:[]
                    }
                    childroutes.push(route)
                })
                accountRoutes[id].children=childroutes
              }else{
                list.forEach((m,n)=>{
                  let route = {
                      path: '/' + m.path,
                      name: m.name,
                      meta: {title: m.name, permission: m.permission || null},
                      component: comp.defualts,
                      hidden: true,
                      children: []
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
          // console.log(accountRoutes)
        commit('setRoutes',accountRoutes)
      }
  }
}

export default menus
