<template>
  <div class="uploader-identity">
      <span class="btn" :class="classObject">
        {{title}}
        <input type="file" :multiple="multiple" :disabled="disabled" @change="onUploadFile"/>
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
      multiple: {
        type: Boolean,
        default: false
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
        let files = e.target.files
        let val = 1
        vm.files.splice(0)
        forEach(files, (file, idx) => {
          vm.files.push(file)
          if (!val) {
            return
          }
          if (isFunction(filter)) {
            val = filter(file)
          } else {
            forEach(filter, (type) => {
              val = ~file.type.indexOf(type) ? 1 : 0
            })
          }
        })
        val ? (this.readAsDataURL(), vm.uploadFile(vm.files)) : window.alert(vm.filterMsg)
      },
      readAsDataURL: function () {
        let vm = this
        let files = vm.files
        let results = []
        let len = files.length
        forEach(files, (file) => {
          let fileReader = new window.FileReader()
          fileReader.onload = (e) => {
            results.push(e.target.result)
            if (results.length === len) {
              vm.$dispatch('file-upload-review', results)
            }
          }
          fileReader.readAsDataURL(file)
        })
      },
      uploadFile: function (files) {
        let vm = this
        let url = vm.url
        if (url) {
          let formData = new window.FormData()
          /*
           * TODO: 目前按大只佬要求，一次性只上传一张，所有暂时取files[0], 后面公共组件改files,这样传到后台是数组，后台做相应修改
           *
           * */
          formData.append('theFile', files[0])
          Server.request({
            url,
            method: 'post',
            data: formData
          }).then((res) => {
            vm.$dispatch('file-upload-success', 'assets/img/avatar.jpg')
          })
        }
      }
    }
  }
</script>
