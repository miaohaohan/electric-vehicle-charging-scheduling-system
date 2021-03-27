<template>
  <a-layout-content class="sys_container">
    <keep-alive :include="tagList">
      <router-view class="mb10 content">
      </router-view>
    </keep-alive>
    <DKFooter class="footer" />
  </a-layout-content>
</template>

<script>
import DKFooter from './DKFooter'
export default {
  name: 'DKContent',
  components: {
    DKFooter
  },
  data () {
    return {
      tagList: []
    }
  },
  methods: {
    // 获取浏览器尺寸
    getWindowSize () {
      sessionStorage.setItem('offsetHeight', document.body.offsetHeight + '')
      sessionStorage.setItem('offsetWidth', document.body.offsetWidth + '')
    },
    timestamp () {
      return Date.parse(new Date())
    }
  },
  created () {
    this.$bus.on('addKeepLive', tagName => {
      let isExist = this.tagList.some(item => {
        return tagName === item
      })
      if (!isExist) {
        this.tagList.push(tagName)
      }
    })
    this.$bus.on('removeKeepLive', tagName => {
      let moveIndex = -1
      let isExist = this.tagList.some((item, index) => {
        let isExist = tagName === item
        if (isExist) {
          moveIndex = index
        }
        return isExist
      })
      if (isExist && moveIndex !== -1) {
        this.tagList.splice(moveIndex, 1)
      }
    })
    // 检测浏览器尺寸变化
    window.addEventListener('resize', this.getWindowSize)
    this.getWindowSize()
  },
  beforeDestroy () {
    this.$bus.off('addKeepLive')
  },
  destroyed () {
    window.removeEventListener('resize', this.getWindowSize)
  }
}
</script>

<style lang='less' scoped>
  @import url('../../../assets/css/color.less');
  .sys_container {
    position: relative;
    overflow: auto;
  }

  /*定义滚动条高宽及背景
   高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: #f5f5f5;
  }
  /*定义滚动条轨道
   内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px @default;
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块
   内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px @default;
    background-color: #555;
  }
</style>
