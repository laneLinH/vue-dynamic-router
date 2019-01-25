// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from './store'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import http from '@/utils/HttpUtils'
import {$dealTableDate,$typeOf,$deepClone,$formatDate ,contactObj} from '@/utils/tools'
import 'element-ui/lib/theme-chalk/index.css'
// import dynamicTable from '@/components/dynamicTable'
// import dynamicModal from '@/components/dynamicModal'
// import dynamicForm from '@/components/dynamicForm'
// import dynamicButton from '@/components/dynamicButton'
import {
  dynamicTable,
  dynamicModal,
  dynamicForm,
  dynamicButton
} from '@/components'
// console.log(dynamicTable)

Vue.use(dynamicButton)
Vue.use(dynamicModal)
Vue.use(dynamicForm)
Vue.use(dynamicTable)

Vue.prototype.$dynamicBus=new Vue()
Vue.use(ElementUI);
Vue.use(http)

Vue.prototype.$typeOf = $typeOf
Vue.prototype.$deepCopy = $deepClone
Vue.prototype.$formatDate = $formatDate
Vue.prototype.$dealTableDate = $dealTableDate

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
