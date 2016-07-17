<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store'
export default {
  replace: false,
  store
}
</script>
<style>
  #app{
    width: 100%;
    height: 100%;
  }
</style>
