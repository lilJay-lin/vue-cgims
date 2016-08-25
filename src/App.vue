<template>
  <div id="app">
    <router-view></router-view>
  </div>
  <dialog></dialog>
</template>

<script>
import store from './vuex/store'
import Dialog from 'src/components/Dialog.vue'
import {toggleDialog} from './vuex/actions/dialog'
export default {
  components: {
    Dialog
  },
  methods: {
    onDialogClose: function () {
      this.toggleDialog({
        show: false
      })
    }
  },
  vuex: {
    actions: {
      toggleDialog
    }
  },
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
