<template>
  <div class="go-up" @click="goUp"></div>
</template>
<script type="text/ecmascript-6">
  export default{
    methods: {
      goUp: () => {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
