<template>
  <div class="myTags">
    <a-tabs hideAdd
            v-model="activeKey"
            type="editable-card"
            @edit="onEdit"
            @tabClick="tabClick"
            size="small"
    >
      <a-tab-pane
        v-for="item in panes"
        :key="item.key"
        :closable="item.closable"
      >
            <span slot="tab">
              <i class="f_dot" :class="{'dot_activeKey': activeKey === item.key}"></i>
              {{ item.title }}
            </span>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// import Cookies from 'js-cookie'
export default {
  name: 'DKTab',
  data () {
    return {
      activeKey: 'home',
      panes: [
        { title: '首页', key: 'home', path: '/home', closable: false, breadList: [{title: '首页'}] },
      ],
      iframeUrl: ''

    }
  },
  created () {
    this.$bus.on('addTag', tag => {
      let isExist = this.panes.some((item) => {
        return tag.key === item.key
      })
      if (!isExist) {
        this.panes.push(tag)
        this.$bus.emit('addKeepLive', tag.key)

        // 将所有打开的tab页放入session中
        // sessionStorage.setItem('sessionTab', JSON.stringify(this.panes))
      }
      // 改变tab页选中值
      this.activeKey = tag.key
      // 将当前选中的tab页放入session中
      // sessionStorage.setItem('sessionActiveTab', this.activeKey)
    })
    this.$bus.on('removeTag', targetKey => {
      this.remove(targetKey)
    })
  },
  methods: {
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    // 点击tab页
    tabClick (activeKey) {
      this.activeKey = activeKey
      let tag = this.panes.filter(item => {
        return item.key === activeKey
      })
      // 改变面包屑导航值
      this.$bus.emit('breadList', tag[0].breadList)
      // 点击tab页也需要addTag
      this.$bus.emit('addTag', tag[0])
      // 改变左侧menu选中值activeMenu
      this.$store.dispatch('app/updateMenu', tag[0].key)
      // content模块需要缓存的页面路由对应的key
      this.$bus.emit('addKeepLive', activeKey)
      // 跳转至该页面
      this.$router.push(tag[0].path)
      // 将当前选中的tab页放入session中
      // sessionStorage.setItem('sessionActiveTab', this.activeKey)
    },
    // 关闭tab页
    remove (targetKey) {
      let activeKey = this.activeKey
      let lastIndex
      // 找到删除的tab页的前一个tab页的key值
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      // 获得过滤掉删除的tab页剩下的tab
      const panes = this.panes.filter(pane => pane.key !== targetKey)
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.panes = panes
      this.activeKey = activeKey
      // 获取需要展示的tab页的信息tag
      let tag = this.panes.filter(item => {
        return item.key === activeKey
      })
      if (tag && tag.length > 0) {
        // 删除content模块需要缓存的页面路由对应的key
        this.$bus.emit('removeKeepLive', targetKey)
        // content模块需要缓存的页面路由对应的key
        this.$bus.emit('addKeepLive', tag[0].key)
        // 改变面包屑导航值
        this.$bus.emit('breadList', tag[0].breadList)
        // 改变左侧menu选中值activeMenu
        this.$store.dispatch('app/updateMenu', tag[0].key)
        // 改变当前展示的tab页
        this.$bus.emit('addTag', tag[0])
        // 跳转至该页面
        this.$router.push(tag[0].path)
      }
    }
  },
  mounted () {
    // 初始化tab页
    // this.tabClick('home')
  },
  beforeDestroy () {
    // this.$bus.off('addTag')
    this.$bus.off('removeTag')
  }
}
</script>
<style>
  .ant-tabs-bar{
    margin: 0;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    height: 40px !important;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    line-height: 38px !important;
  }
</style>
<style scoped>
  .myTags{
    padding: 5px 0px 0px 15px;
    background-color: #fff;
    /*border: 1px solid #f0f2f5;*/
    margin-top: 2px;
    height: 40px;
  }
  .dot_activeKey {
    margin-top:-2px;
    background:#1890ff !important;
    width:8px;
    height:8px;
    line-height:8px;
    display:inline-block;
    vertical-align:baseline;
    border-radius: 4px;
  }
  .f_dot{
    margin-top:-2px;
    width:8px;
    height:8px;
    line-height:8px;
    display:inline-block;
    vertical-align:baseline;
    border-radius: 4px;
  }
</style>
