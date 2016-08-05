<template>
  <div class="widget-box"  slot="widget">
    <div class="widget-title"><span class="icon"><i :class="icon"></i></span>
      <h5>{{title}}</h5>
    </div>
    <div class="widget-content" :class="{nopadding: padding}">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: String,
    padding: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: 'icon-th'
    }
  }
}
</script>
