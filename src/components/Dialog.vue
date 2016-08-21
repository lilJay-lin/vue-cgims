<template>
  <div>
    <div class="modal"  v-if="show" transition="show"  @click="hideDialog($event, 'close')">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="hideDialog"><span>×</span></button>
            <h4 class="modal-title">{{title}}</h4>
          </div>
          <div class="modal-body">
            <p>{{content}}</p>
          </div>
          <div class="modal-footer" v-if="hasSuccessBtn || hasCloseBtn">
            <button type="button" class="btn btn-default" v-if="hasCloseBtn" @click="onCloseHandle">{{closeText}}</button>
            <button type="button" class="btn btn-primary" v-if="hasSuccessBtn" @click="onSuccessHandle">{{successText}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop"  v-if="show" @click="hideDialog($event, 'close')" transition="show"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
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
  },
  methods: {
    onCloseHandle: function () {
      this.$dispatch('dialog-cancel')
      this.close && this.close()
      this.hideDialog()
    },
    onSuccessHandle: function () {
      this.$dispatch('dialog-success')
      this.success && this.success()
      this.hideDialog()
    },
    hideDialog: function (e, type) {
      if (type && e.target !== e.currentTarget) {
        return
      }
      this.$dispatch('dialog-close')
    },
    autoHide: function () {
      let vm = this
      vm.show && vm.auto && setTimeout(function () {
        vm.hideDialog()
      }, vm.duration)
    }
  },
  ready: function () {
    this.autoHide()
  },
  watch: {
    'show': function (val, oldValue) {
      this.autoHide()
    }
  }
}
</script>
