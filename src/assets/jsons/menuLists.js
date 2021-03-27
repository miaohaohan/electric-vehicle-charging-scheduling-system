export default {
  ZH: {
    menu: [
      {
        key: 'home',
        menuName: '首页',
        icon: 'home',
        isHasChild: false,
        path: '/home'
      },
      {
        key: 'chargingPileConfig',
        menuName: '充电桩配置',
        isHasChild: true,
        children: [
          {
            key: 'chargingPileInformationConfig',
            menuName: '充电桩信息管理',
            isHasChild: false,
            path: '/chargingPileInformationConfig'
          },
          {
            key: 'chargingPileSetUpConfig',
            menuName: '充电桩设置管理',
            isHasChild: false,
            path: '/chargingPileSetUpConfig'
          }
        ],
        // path: '/chargingPileConfig'
      },
      {
        key: 'chargingCarConfig',
        menuName: '充电汽车配置',
        isHasChild: true,
        children: [
          {
            key: 'chargingCarInformationConfig',
            menuName: '充电汽车信息管理',
            isHasChild: false,
            path: '/chargingCarInformationConfig'
          },
          {
            key: 'chargingCarSetUpConfig',
            menuName: '充电汽车设置管理',
            isHasChild: false,
            path: '/chargingCarSetUpConfig'
          }
        ]
        // path: '/chargingCarConfig'
      },
      {
        key: 'mapConfig',
        menuName: '行驶地图配置',
        isHasChild: false,
        path: '/mapConfig'
      },
      {
        key: 'chargingCarDispatch',
        menuName: '充电汽车调度模拟',
        isHasChild: false,
        path: '/chargingCarDispatch'
      }
    ]
  }
}