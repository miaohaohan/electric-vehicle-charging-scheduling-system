<template>
  <a-layout-sider
    :trigger="null"
    collapsible
    theme="light"
    v-model="$store.getters.collapsed"
    class="dk_sider"
    :class="{ pcSider: !collapsed }"
    width="160"
    collapsedWidth="55"
  >
    <div class="dk_header_logo">
      <!--左侧logo-->
      <!--<img src="@/assets/images/main/Expand_logo.png" >-->
      <div style="display: inline-block;">
        <img src="@/assets/images/main/logo.png" style="float: left;">
        <span style="font-size: 14px;line-height:28px;float: left;margin-left: 8px;" v-if="showTip">充电行为模拟</span>
      </div>
    </div>
    <a-menu
      class="ly-ctn-menu"
      :theme="themeConfig.color"
      mode="inline"
      :defaultSelectedKeys="[activeMenu]"
      :selectedKeys="[activeMenu]"
      :inlineIndent="10"
    >
      <template v-for="menu in menuLists">
        <!--无二级目录-->
        <a-menu-item
          :key="menu.key"
          v-if="isNull(menu.children)"
          @click="changeMenu(menu)"
          :title="menu.menuName"
        >
          <router-link :to="menu.path">
            <a-icon :type="menu.icon" />
            <span>{{ menu.menuName }}</span>
          </router-link>
        </a-menu-item>
        <!--有二级节点-->
        <a-sub-menu
          :key="menu.key"
          v-else
        >
          <span
            slot="title"
            @click="changeMenu(menu)"
            :title="menu.menuName"
          >
            <a-icon :type="menu.icon" />
            <span>{{ menu.menuName }}</span>
          </span>
          <template v-for="childItem in menu.children">
            <!--无三级目录-->
            <a-menu-item
              :key="childItem.key"
              v-if="isNull(childItem.children)"
              @click="changeMenu(menu,childItem.key)"
              :title="childItem.menuName"
            > 
              <router-link :to="childItem.path">
                {{childItem.menuName}}
              </router-link>
            </a-menu-item>
            <!--有三级目录-->
            <a-sub-menu
              :key="childItem.key"
              v-else
            >
              <span
                slot="title"
                @click="changeMenu(menu,childItem.key)"
                :title="childItem.menuName"
              >
                <span>{{ childItem.menuName }}</span>
              </span>
              <template v-for="child2Item in childItem.children">
                <a-menu-item
                  v-if="child2Item.key"
                  :key="child2Item.key"
                  @click="changeMenu(menu,childItem.key,child2Item.key)"
                  :title="child2Item.menuName"
                >
                  <router-link :to="child2Item.path">
                    {{child2Item.menuName}}
                  </router-link>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
import DKSider from '../minxins/DKSider'
// import logoImg1 from './../../../assets/images/main/Expand_logo.png'
// import logoImg2 from './../../../assets/images/main/logo.png'
export default {
  name: 'DKSider',
  props: {},
  mixins: [DKSider],
  computed: {
    ...mapGetters(['collapsed', 'menuVal'])
  },
  data () {
    return {
      themeConfig: {
        color: 'dark'
      },
      // logoImg: logoImg2,
      showTip: true
    }
  },
  methods: {
    // 字符串判空
    isNull (str) {
      if (str != null && str !== undefined && str !== '') {
        return false
      } else {
        return true
      }
    },
  },
  created: function () {
    // 菜单收缩切换logo
    this.$bus.on('type', type => {
      if (type) {
        this.showTip = false
      } else {
        this.showTip = true
      }
    })
  }
}
</script>
<style>
  .ant-layout-sider-children{
    overflow-y: auto;
  }
  .ant-menu-dark .ant-menu-item, .ant-menu-dark .ant-menu-item-group-title, .ant-menu-dark .ant-menu-item > a {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
</style>
<style lang="less" scoped>
  .ant-menu-inline-collapsed {
    width: 55px;
  }
  .dk_sider {
    height: 100vh;
    /*box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);*/
    background: #001529;
  &.pcSider {
     flex: 0 0 140px !important;
     width: 140px !important;
     max-width: 140px !important;
   }
  .dk_header_logo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 64px;
    color: #fff;
    font-size: 22px;
  }
  .ly-ctn-menu {
    height: calc(100vh - 64px);
  }
  }
</style>
