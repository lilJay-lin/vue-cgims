<template>
  <div id="app">
    <router-view></router-view>
  </div>
  <dialog :success = 'dialog.success' :close="dialog.close" :title="dialog.title" :content="dialog.content" :has-success-btn="dialog.hasSuccessBtn"
          :has-close-btn="dialog.hasCloseBtn" :show="dialog.show" :auto="dialog.auto" @dialog-close="onDialogClose">
  </dialog>
</template>

<script>
import store from './vuex/store'
import Dialog from 'src/components/Dialog.vue'
import {getDialog} from './vuex/getters/getters'
import {toggleDialog} from './vuex/actions/actions'
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
    getters: {
      dialog: getDialog
    },
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
