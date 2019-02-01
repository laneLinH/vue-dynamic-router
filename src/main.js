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

import '../packages/dynamicPackge.umd'
import '../packages/dynamicPackge.css'
Vue.use(dynamicPackge.default.install)
Vue.use(ElementUI,{size: 'small'});
Vue.use(http)
Vue.config.productionTip = false;
Vue.prototype.$src=process.env.VUE_APP_SRC
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
