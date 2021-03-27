<template>
  <a-breadcrumb>
    <template v-for="(page, pageIndex) in breadList">
      <a-breadcrumb-item :key="pageIndex">
        <router-link :to="page.router" v-if="page.router">
          {{page.title}}
        </router-link>
        <span v-else>{{page.title}}</span>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>  
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.ant-breadcrumb {
  margin-top: -10px;
  padding: 10px 0;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.5px;
  color:#666666;
  > span.notNow {
    display: inline-block;
    cursor: pointer;
    a {
      color: #666666 !important;
      text-decoration: none;
    }
  }
  > span.dy-dd {
    color: #666666;
  }
  > .now-breadcrumb {
    display: inline-block;
    cursor: default;
    color: #ccc !important;
  }
}
</style>