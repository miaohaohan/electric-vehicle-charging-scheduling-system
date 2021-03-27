/**
 * @Author weibf
 * @Date 2019/6/18
 * @Desc 根据屏幕自适应大小
 */
import store from '@/store'
const { body } = document

// 以bootstrap的标准标记是否是手机: 992
const WIDTH = 992

export default {
  beforeMount () {
    window.addEventListener('resize', this.dy_resize_listener)
  },
  mounted () {
    if (this.isMobile()) {
      store.dispatch('app/updateDevice', 'mobile')
    } else {
      store.dispatch('app/updateDevice', 'pc')
    }
  },
  methods: {
    isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    dy_resize_listener () {
      let isMobile = this.isMobile()

      if (!document.hidden) {
        if (isMobile) {
          store.dispatch('app/updateDevice', 'mobile')
        } else {
          store.dispatch('app/updateDevice', 'pc')
        }
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.dy_resize_listener)
  }
}
