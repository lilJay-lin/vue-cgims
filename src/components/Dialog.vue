<template>
  <div>
    <div class="modal"  v-if="dialog.show" transition="show"  @click="hideDialog($event, 'close')">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="hideDialog"><span>×</span></button>
            <h4 class="modal-title">{{dialog.title}}</h4>
          </div>
          <div class="modal-body">
            <p>{{dialog.content}}</p>
          </div>
          <div class="modal-footer" v-if="dialog.hasSuccessBtn || dialog.hasCloseBtn">
            <button type="button" class="btn btn-default" v-if="dialog.hasCloseBtn" @click="onCloseHandle">{{dialog.closeText}}</button>
            <button type="button" class="btn btn-primary" v-if="dialog.hasSuccessBtn" @click="onSuccessHandle">{{dialog.successText}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop"  v-if="show" @click="hideDialog($event, 'close')" transition="show"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import {getDialog} from 'my_vuex/getters/dialog'
import {toggleDialog} from 'my_vuex/actions/dialog'
let hideTimeout = null
export default{
/*
    props: {
    title: {
      type: String,
      default: '提示'
    },
    closeText: {
      type: String,
      default: '取消'
    },
    successText: {
      type: String,
      default: '确定'
    },
    content: {
      type: String,
      default: ''
    },
    hasSuccessBtn: {
      type: Boolean,
      default: false
    },
    hasCloseBtn: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 1300
    },
    success: {
      type: Function,
      default: () => {
        return null
      }
    },
    close: {
      type: Function,
      default: () => {
        return null
      }
    }
  },*/
  methods: {
    onCloseHandle: function () {
      let vm = this
      vm.dialog.close()
      vm.hideDialog()
    },
    onSuccessHandle: function () {
      let vm = this
      vm.dialog.success()
      vm.hideDialog()
    },
    hideDialog: function (e, type) {
      if (type && e.target !== e.currentTarget) {
        return
      }
      this.toggleDialog({
        show: false
      })
    },
    autoHide: function () {
      let vm = this
      let dialog = vm.dialog
      dialog.show && dialog.auto && (
        hideTimeout && window.clearTimeout(hideTimeout),
        hideTimeout = setTimeout(function () {
          vm.hideDialog()
        }, dialog.duration)
      )
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
  ready: function () {
    this.autoHide()
  },
  watch: {
    'dialog.show': function (val, oldValue) {
      this.autoHide()
    }
  }
}
</script>
