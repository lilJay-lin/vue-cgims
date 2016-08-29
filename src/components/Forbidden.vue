<template>
  <Content :breads="breads" :title="title">
    <Widget :title="title">
      <error :message="'无权限访问'" :url="'/admin'" :btn-text="'返回首页'"></error>
    </Widget>
  </Content>
</template>
<script>

  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Error from 'components/Error'
  export default {
    props: {
      title: {
        type: String,
        default: '错误'
      }
    },
    components: {
      Content,
      Widget,
      Error
    },
    vuex: {
      getters: {
        breads: getBreadCrumb
      }
    }
  }
</script>
