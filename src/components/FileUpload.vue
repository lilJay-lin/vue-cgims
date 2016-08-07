<template>
  <div class="uploader-identity">
      <span class="btn" :class="classObject">
        {{title}}
        <input type="file" :name="name" :disabled="disabled" @change="onUploadFile"/>
      </span>
  </div>
</template>
<script type="text/ecmascript-6">
  import Server from 'src/api/server.js'
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
        let file = e.target.files[0]
        let val = 1
        let idx = vm.files.length
        val = vm.filter(file)
        val ? (vm.uploadFile(file, idx), vm.readAsDataURL(file, idx), vm.files.push(file)) : vm.$dispatch('file-upload-error', vm.name, vm.filterMsg)
      },
      readAsDataURL: function (file, idx) {
        let vm = this
        let fileReader = new window.FileReader()
        fileReader.onload = (e) => {
          vm.$dispatch('file-upload-review', vm.name, e.target.result, idx)
        }
        fileReader.readAsDataURL(file)
      },
      uploadFile: function (file, idx) {
        let vm = this
        let url = vm.url
        if (url) {
          let formData = new window.FormData()
          formData.append('theFile', file)
          vm.$dispatch('file-upload-loading', vm.name, 'loading', idx)
          Server.request({
            url,
            method: 'post',
            data: formData
          }).then((res) => {
            vm.$dispatch('file-upload-success', vm.name, res.result, idx)
          }, (res) => {
            vm.$dispatch('file-upload-success', vm.name, '/assets/img/upload_error.png', idx)
          })
        }
      }
    }
  }
</script>
