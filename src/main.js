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
import * as filters from './filters'
// import '../packages/dynamicPackge.umd'
// import '../packages/dynamicPackge.css'
// Vue.use(dynamicPackge.default.install)
import {install} from '@/components'
Vue.use(install);

Vue.use(ElementUI);
Vue.use(http)
Vue.config.productionTip = false;
Vue.prototype.$src=process.env.VUE_APP_IMG_SRC
Vue.prototype.$api=api
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
