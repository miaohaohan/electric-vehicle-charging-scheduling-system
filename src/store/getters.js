const getters = {
  // 存储当前设备是pc还是mobile
  device: state => state.app.device,
  // 存储菜单的缩放值
  collapsed: state => state.app.collapsed,
  // 存储设置的值
  setting: state => state.app.setting,
  // 存储菜单的值
  menuPath: state => state.app.menuPath,
  // 存放当前语言
  language: state => state.app.language
}

export default getters