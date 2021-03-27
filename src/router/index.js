import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this,to)
}

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/layout'),
      redirect: '/home',
      children: [
        // 充电调度系统主页
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/Home')
        },
        // 充电调度系统404报错页面
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/exceptions/404')
        },
        // 充电调度系统500报错页面
        {
            path: '/500',
            name: '500',
            component: () => import('@/views/exceptions/500')
        },
        // 充电桩配置
        {
          path: '/chargingPileConfig',
          name: 'chargingPileConfig',
          component: () => import('@/views/chargingPileConfig/ChargingPileConfig')
        },
        // 充电汽车配置
        {
          path: '/chargingCarConfig',
          name: 'chargingCarConfig',
          component: () => import('@/views/chargingCarConfig/ChargingCarConfig')
        },
        // 充电汽车行驶地图配置
        {
          path: '/mapConfig',
          name: 'mapConfig',
          component: () => import('@/views/mapConfig/MapConfig')
        },
        // 充电汽车调度分析
        {
            path: '/chargingCarScheduling',
            name: 'chargingCarScheduling',
            component: () => import('@/views/chargingCarScheduling/ChargingCarScheduling')
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ],
  // 当跳到新的页面的时候 自动跳到该页面的顶部
  scrollBehavior: () => ({ y: 0 }) 
})