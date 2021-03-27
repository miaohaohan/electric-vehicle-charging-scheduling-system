<template>
  <a-result status="500" title="500" sub-title="对不起，服务器出错了。">
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
  name: 'Exception500',
  components: {
  }
}
</script>

<style lang="less" scoped></style>
