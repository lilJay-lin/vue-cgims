<template>
  <div class="content">
    <div class="content-header">
      <bread-crumb :menus="breads.menus" :active="breads.active"></bread-crumb>
      <h1>{{title}}</h1>
    </div>
    <div class="content-container">
      <hr/>
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BreadCrumb from 'components/BreadCrumb'
export default {
  props: {
    breads: {
      type: Object
    },
    title: {
      type: String
    }
  },
  components: {
    BreadCrumb
  }
}
</script>
