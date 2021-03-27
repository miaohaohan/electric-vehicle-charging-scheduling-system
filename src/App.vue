<template>
   <div id="app">
  <!--缓存页面-->
    <keep-alive>
      <a-config-provider :locale="locale">
        <router-view v-if="$route.meta.keepAlive"/>
      </a-config-provider>
    </keep-alive>
    <!--不缓存页面-->
    <a-config-provider :locale="locale">
      <router-view v-if="!$route.meta.keepAlive"/>
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'App',
  data () {
    return {
      locale : zhCN
    }
  },
  components: {
  }
}
</script>