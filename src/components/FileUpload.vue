<template>
  <div class="uploader-identity">
      <span class="btn" :class="classObject">
        {{title}}
        <input type="file" :name="name" :disabled="disabled" :multiple="multiple" @change="onUploadFile"/>
      </span>
  </div>
</template>
<script type="text/ecmascript-6">
  import Server from 'src/api/server.js'
  const forEach = require('lodash/forEach')
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
      multiple: {
        type: Boolean,
        default: false
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
        type: Function,
        default: (file) => {
          let name = file.name
          let type = file.type
          type = !type && name.substring(name.lastIndexOf('.') + 1) || type
          return /png|jpg|jpeg|gif/.test(type)
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
      name: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      }
    },
    methods: {
      onUploadFile: function (e) {
        let vm = this
        let files = e.target.files
        let val = 1
        let idx = vm.files.length
        forEach(files, (file) => {
          if (val) {
            val = vm.filter(file)
          }
        })
        val ? (vm.uploadFile(files, idx)/*, vm.readAsDataURL(file, idx)*/, vm.files.concat(files)) : vm.$dispatch('file-upload-error', vm.name, vm.filterMsg)
      },
/*
readAsDataURL: function (file, idx) {
        let vm = this
        let fileReader = new window.FileReader()
        fileReader.onload = (e) => {
          vm.$dispatch('file-upload-review', vm.name, e.target.result, idx)
        }
        fileReader.readAsDataURL(file)
      },*/
      uploadFile: function (files, idx) {
        let vm = this
        let url = vm.url
        if (url) {
          let formData = new window.FormData()
          formData.append('theFile', files)
          forEach(files, (file, i) => {
            vm.$dispatch('file-upload-loading', vm.name, 'loading', idx + i)
          })
          Server.request({
            url,
            method: 'post',
            data: formData
          }).then((res) => {
            forEach(res.result.split(','), (src, i) => {
              vm.$dispatch('file-upload-success', vm.name, src, idx + i)
            })
          }, (res) => {
            forEach(files, (file, i) => {
              vm.$dispatch('file-upload-success', vm.name, '/assets/img/upload_error.png', idx + i)
            })
          })
        }
      }
    }
  }
</script>
