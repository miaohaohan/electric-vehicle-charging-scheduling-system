import { mapGetters } from 'vuex'
import MenuLists from '../../../assets/jsons/menuLists'
// 混合minxins
export default {
  computed: {
    ...mapGetters(['menuPath', 'language'])
  },
  data () {
    return {
      menuLists: [],
      // 聚焦菜单
      activeMenu: ''
    }
  },
  methods: {
    /* 改变目录 */
    changeMenu (menu, key1, key2) {
      let tagMenu = menu
      // 存储面包屑导航菜单
      const breadList = []
      let path = menu.key
      // 面包屑导航赋值一级菜单
      breadList.push({
        title: menu.menuName
      })
      // 若当前点击目录存在子目录
      if (menu.children !== undefined) {
        for (let i = 0; i < menu.children.length; i++) {
          const childItem = menu.children[i]
          if (key1 === childItem.key) {
            // 面包屑导航赋值二级菜单
            breadList.push({
              title: childItem.menuName
            })
            tagMenu = childItem
            path = childItem.key
            // 若点击目录的子目录存在子目录
            if (childItem.children !== undefined) {
              for (let j = 0; j < childItem.children.length; j++) {
                const child2Item = childItem.children[j]
                // 面包屑导航赋值三级菜单
                if (key2 === child2Item.key) {
                  breadList.push({
                    title: child2Item.menuName
                  })
                  tagMenu = childItem
                  path = child2Item.key
                }
              }
            }
          }
        }
      }
      if (tagMenu.path) {
        let tag = { title: tagMenu.menuName, key: tagMenu.key, url: tagMenu.url, breadList: breadList, path: tagMenu.path }
        this.$bus.$emit('addTag', tag)
        // 改变面包屑导航值
        this.$bus.emit('breadList', breadList)
        // 更新app/updateMenu
        this.$store.dispatch('app/updateMenu', path)
      }
      try {
        let dom = document
          .getElementsByClassName('ly-ctn-menu')[0]
          .getElementsByClassName('ant-menu-submenu')
        for (let c = 0; c < dom.length; c++) {
          let className = dom[c].getAttribute('class')
          className = className.replace('ant-menu-submenu-open', '')
        }
      } catch (e) {
        throw new Error('查询菜单错误')
      }
    },
  },
  watch: {
    menuPath (newVal) {
      this.activeMenu = newVal
    },
    language (newVal) {
      this.menuLists = MenuLists[newVal] ? MenuLists[newVal]['menu'] : []
    }
  },
  created () {
    //this.activeMenu = 'home'
    this.menuLists = MenuLists[this.language] ? MenuLists[this.language].menu : []
    this.activeMenu = this.menuPath.replace('/', '')
  }
}
