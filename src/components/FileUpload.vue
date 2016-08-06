<template>
  <div class="uploader-identity">
      <span class="btn" :class="classObject">
        {{title}}
        <input type="file" :disabled="disabled" @change="onUploadFile"/>
      </span>
  </div>
</template>
<script type="text/ecmascript-6">
  import Server from 'src/api/server.js'
  let forEach = require('lodash/forEach')
  let isFunction = require('lodash/isFunction')
  export default {
    props: {
      classObject: {
        type: Object,
        default: () => {
          return {
            'btn-success': true
          }
        }
      },
      title: {
        type: String,
        default: () => {
          return '文件上传'
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      filter: {
        type: [Array, Function],
        default: () => {
          return ['image']
        }
      },
      filterMsg: {
        type: String,
        default: () => {
          return '只允许上传图片'
        }
      },
      files: {
        type: Array,
        default: () => {
          return []
        }
      },
      url: {
        type: String,
        default: ''
      }
    },
    methods: {
      onUploadFile: function (e) {
        let vm = this
        let filter = vm.filter
        let file = e.target.files[0]
        let val = 1
        let idx = vm.files.length
        if (isFunction(filter)) {
          val = filter(file)
        } else {
          forEach(filter, (type) => {
            val = ~file.type.indexOf(type) ? 1 : 0
          })
        }
        vm.files.push(file)
        val ? (vm.uploadFile(file, idx), vm.readAsDataURL(file, idx)) : vm.$dispatch('file-upload-error', vm.filterMsg)
      },
      readAsDataURL: function (file, idx) {
        let vm = this
        let fileReader = new window.FileReader()
        fileReader.onload = (e) => {
          vm.$dispatch('file-upload-review', e.target.result, idx)
        }
        fileReader.readAsDataURL(file)
      },
      uploadFile: function (file, idx) {
        let vm = this
        let url = vm.url
        if (url) {
          let formData = new window.FormData()
          formData.append('theFile', file)
          vm.$dispatch('file-upload-loading', 'loading', idx)
          Server.request({
            url,
            method: 'post',
            data: formData
          }).then((res) => {
            vm.$dispatch('file-upload-success', 'assets/img/upload_error.png', idx)
          }, (res) => {
            vm.$dispatch('file-upload-success', 'assets/img/upload_error.png', idx)
          })
        }
      }
    }
  }
</script>
