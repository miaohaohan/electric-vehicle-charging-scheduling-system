import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/vue-i18n'

// 引入解决兄弟事件传递插件vue-bus
import VueBus from 'vue-bus'
Vue.use(VueBus)

// 公用less的引入
import './assets/css/common.less'
// 引入ant-design-vue样式
import 'ant-design-vue/dist/antd.css'
// 引入ant-design-vue组件
import ant from 'ant-design-vue'
Vue.use(ant)

// 请求全局引入
import { get, post, put, del, blobStream, blobDownload, pBlobDownload, realUrl } from './config/request'
// 封装的axios请求方法
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$delete = del
Vue.prototype.$blobStream = blobStream
Vue.prototype.$blobDownload = blobDownload
Vue.prototype.$pBlobDownload = pBlobDownload

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
