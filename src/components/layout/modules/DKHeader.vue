<template>
  <a-layout-header class="dk-header">
    <a-icon
      class="trigger"
      :type="$store.getters.collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="change"
    />
    <!--面包屑导航-->
    <div class="BreadList">
      <Breadcrumb :breadList="breadList" />
    </div>
    <!--右侧信息-->
    <div class="sys-hd-r mr5">
      <div class="mr15">{{ avatarValue }}</div>
      <a-dropdown :overlayClassName="overlay">
        <a-avatar
          shape="circle"
          size="large"
          icon="user"
          :style="{ backgroundColor: color, verticalAlign: 'middle' }"
        >{{ avatarValue }}</a-avatar>
        <a-menu slot="overlay">
          <!-- <a-menu-item
            key="3"
            @click="exit_to_app"
          >{{$t("logout")}}</a-menu-item> -->
          <a-menu-item
            key="4"
          >{{userName}}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DKHeader',
  computed: {
    ...mapGetters(['device', 'language']),
    overlay: function () {
      return this.device === 'mobile' ? 'sys-lg-dpd-open' : ''
    }
  },
  data () {
    return {
      avatarValue: '',
      color: '#1890FF',
      active: '',
      breadList: [],
      isOpenInput: false,
      // 用户名
      userName: ''
    }
  },
  created () {
    /* 获得面包屑导航值 */
    this.$bus.on('breadList', breadList => {
      this.breadList = breadList
    })
    this.getUserName()
    // this.$get('/user/getPrincipal').then(res => {
    //   this.avatarValue = res.username
    //   this.$store.commit('app/updateUsername', res.username)
    // })
  },
  methods: {
    /* 点击收缩按钮 */
    change () {
      this.$store.dispatch('app/updateCollapsed')
      // 更新logo
      this.$bus.emit('type', this.$store.getters.collapsed)
    },
    /* 退出登录 */
    exit_to_app () {
      try {
        this.$Cookies.remove('token')
        this.$router.push('/')
        this.$router.push({ path: '/login' })
      } catch (e) {
        throw new Error(e)
      }
    },
    /* 获取登录用户信息 */
    getUserName () {
      this.$get('/authority/getUserNAme').then(res => {
        if (res.code === 200) {
          this.userName = res.data.userName
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    // language(newVal) {
    // }
  }
}
</script>
<style>
  .ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-item,
  .ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-submenu
  > .ant-menu-submenu-title,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
    padding-right: 17px !important;
    padding-left: 21px !important;
  }
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: #2c3a51;
  }
</style>
<style lang="less" scoped>
  @import url("./../../../assets/css/color.less");
  .trigger {
    cursor: pointer;
    font-size: 16px;
  }
  .BreadList {
    position: absolute;
    margin-left: 30px;
  }
  .ant-breadcrumb {
    margin-top: 0px;
    padding: 10px 0;
    font-size: 16px;
  }
  .dk-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-left: 1px solid #efefef;
    background: #fff !important;
    height: 64px !important;
  /*z-index: 999;*/
  .sys-hd-r {
    display: flex;
    align-items: center;
  .language {
  img {
    display: inline-block;
    cursor: pointer;
    margin-top: -6px;
  &:hover,
  &:visited {
     color: @default;
   }
  &.active {
     color: @default;
   }
  }
  }
  .sys-noti {
    cursor: pointer;
  .anticon-notification {
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 18px;
  }
  }
  }
  .anticon-menu-fold {
    padding: 20px 20px 20px 0;
  }
  }
  .search-box {
  /deep/.search-icon {
    cursor: pointer;
    font-size: 16px;
  }
  .search-input {
    width: 210px;
    height: 32px;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    outline: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s,
    height 0s ease 0s;
  &.close {
     width: 0;
   }
  }
  }
</style>
