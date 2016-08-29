<template>
  <div class="breadcrumb">
    <a v-link="'admin'" class="tip-bottom" ><i class="icon-home"></i>首页</a>
    <template v-for="menu in breads.menus">
      <a href="javascript:void(0);" :class="{'tip-bottom': menu.name !== breads.active,current: menu.name === breads.active}" >
        {{menu.title}}
      </a>
    </template>
  </div>
</template>
<script>
import {getBreadCrumb} from 'my_vuex/getters/breadCrumb'
export default {
  vuex: {
    getters: {
      breads: getBreadCrumb
    }
  }
}
</script>
