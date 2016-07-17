<template>
  <div class="breadcrumb">
    <a v-link="'admin'" class="tip-bottom" ><i class="icon-home"></i>首页</a>
    <template v-for="menu in menus">
      <a href="javascript:void(0);" :class="{'tip-bottom': menu.name !== active,current: menu.name === active}" >
        {{menu.title}}
      </a>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    menus: {
      type: Array
    },
    active: {
      type: String,
      default: '/'
    }
  }
}
</script>
