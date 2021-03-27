// 获取默认的菜单列表
import MenuList from '@/assets/jsons/menuLists'
// 导入vue的国际化组件
import i18n from '@/i18n/vue-i18n'

const state = {
  // 页面初始化
  init: false,
  // 设备类型
  device: 'pc',
  // 按钮是否缩放
  collapsed: false,
  // 页面设置
  setting: false,
  // 菜单路径
  menuPath: localStorage.getItem('menuPath') 
    ? localStorage.getItem('menuPath')
    : MenuList.ZH.menu && MenuList.ZH.menu.length > 0 ? MenuList.ZH.menu[0] : '/home',
  language: localStorage.getItem('language')
    ? localStorage.getItem('language')
    : 'ZH'
}

const mutations = {
  UPDATE_COLLAPSED : (state, action) => {
    state.collapsed = action || !state.collapsed
  },
  UPDATE_DEVICE: (state, device) => {
    state.device = device
  },
  UPDATE_SETTING: (state, status) => {
    state.setting = status
  },
  UPDATE_MENU: (state, menuPath) => {
    state.menuPath = menuPath
    localStorage.setItem('menuPath', menuPath)
  },
  UPDATE_LANGUAGE: (state, language) => {
    state.language = language
    localStorage.setItem('language', language)
    i18n.locale = localStorage.getItem('language')
      ? localStorage.getItem('language').toLocaleLowerCase()
      : 'zh'
  }
}

const actions = {
  updateCollapsed ({ commit }, action) {
    commit('UPDATE_COLLAPSED', action)
  },
  updateDevice ({ commit }, action) {
    commit('UPDATE_DEVICE', action)
  },
  updateSetting ({ commit }, action) {
    commit('UPDATE_SETTING', action)
  },
  updateMunu ({ commit }, action) {
    commit('UPDATE_MENU', action)
  },
  updateLanguage ({ commit }, action) {
    commit('UPDATE_LANGUAGE', action)
  },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }