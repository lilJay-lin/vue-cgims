<template>
  <div class="widget-box"  slot="widget">
    <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
      <h5>{{title}}</h5>
    </div>
    <div class="widget-content" :class="{nopadding: notPadding}">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: String,
    notPadding: {
      type: Boolean,
      default: 0
    }
  }
}
</script>
