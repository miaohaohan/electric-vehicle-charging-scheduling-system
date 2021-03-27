<template>
  <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在。">
    <template #extra>
      <router-link to="/home">
      <a-button type="primary">
        返回首页
      </a-button>
      </router-link>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception404',
  components: {
  }
}
</script>

<style lang="less" scoped></style>
