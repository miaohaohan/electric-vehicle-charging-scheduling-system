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
        // 充电桩信息管理
        {
          path: '/chargingPileInformationConfig',
          name: 'chargingPileInformationConfig',
          component: () => import('@/views/chargingPileConfig/ChargingPileInformationConfig')
        },
        // 充电桩设置管理
        {
          path: '/chargingPileSetUpConfig',
          name: 'chargingPileSetUpConfig',
          component: () => import('@/views/chargingPileConfig/ChargingPileSetUpConfig')
        },
        // 充电汽车信息管理
        {
          path: '/chargingCarInformationConfig',
          name: 'chargingCarInformationConfig',
          component: () => import('@/views/chargingCarConfig/ChargingCarInformationConfig')
        },
        // 充电汽车设置管理
        {
          path: '/chargingCarSetUpConfig',
          name: 'chargingCarSetUpConfig',
          component: () => import('@/views/chargingCarConfig/ChargingCarSetUpConfig')
        },
        // 充电汽车行驶地图配置
        {
          path: '/mapConfig',
          name: 'mapConfig',
          component: () => import('@/views/mapConfig/MapConfig')
        },
        // 充电汽车模拟调度
        {
          path: '/chargingCarDispatch',
          name: 'chargingCarDispatch',
          component: () => import('@/views/chargingCarDispatch/ChargingCarDispatch')
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