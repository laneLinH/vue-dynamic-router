// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from './store'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import http from '@/utils/HttpUtils'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api'
import {OPRATE_HISTORY,APP_STATE} from '@/utils/dict'
import * as filters from './filters'
import '../packages/dynamicPackge.umd'
import '../packages/dynamicPackge.css'
Vue.use(dynamicPackge.default.install)
// import {install} from '@/components'
// Vue.use(install);

Vue.use(ElementUI);
Vue.use(http)
Vue.config.productionTip = false;
// console.log(window.location.origin+'/cad')
Vue.prototype.$src=process.env.VUE_APP_IMG_SRC
// Vue.prototype.$src=window.location.origin+'/cad'
Vue.prototype.$api=api
Vue.prototype.$OPRATE_HISTORY=OPRATE_HISTORY
Vue.prototype.$APP_STATE=APP_STATE
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
