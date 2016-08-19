<template>
  <div class="label-inline" style="font-size:0">
    <label v-show="hasAll">
      <div class="checker">
        <span :class="{'checked': all === true}">
          <input type="checkbox" @click="checkAll" :name="name" value="" :disabled="readonly"/>
        </span>
      </div>
      {{allText}}
    </label>
    <label v-for="radio in radios" track-by="$index">
      <div class="checker">
        <span :class="{'checked': ~checked.indexOf(radio.value)}">
          <input type="checkbox" @change="change($event, $index)" :name="name" :value="radio.value" :disabled="readonly"/>
        </span>
      </div>
      {{radio.name}}
    </label>
    <label v-show="hasOther" class="other-checkbox">
      <div class="checker">
        <span :class="{'checked': other}">
          <input type="checkbox" @change="checkOther" :name="name" :disabled="readonly"/>
        </span>
      </div>
      其他
      <input type="text" :disabled="!other" :value="otherValue" @input="onOtherText" :placeholder="otherPlaceholder" v-el:other/>
    </label>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      name: String,
      hasAll: {
        type: Boolean,
        default: false
      },
      hasOther: {
        type: Boolean,
        default: false
      },
      allText: {
        type: String,
        default: '全部'
      },
      all: {
        type: Boolean,
        default: false
      },
      other: {
        type: Boolean,
        default: false
      },
      otherValue: {
        type: String,
        default: ''
      },
      otherPlaceholder: {
        type: String,
        default: '其他'
      },
      radios: {
        type: Array,
        default: function () {
          return []
        }
      },
      checked: {
        type: Array,
        default: function () {
          return []
        }
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      allRadio: function () {
        return this.radios.reduce((pre, cur) => {
          pre.push(cur.value)
          return pre
        }, [])
      }
    },
    methods: {
      isCheckAll: function () {
        let vm = this
        let checkLen = vm.checked.length
        let selectLen = vm.radios.length
        let checkAll = selectLen === checkLen ? (vm.hasOther ? vm.other : 1) : 0
        if (checkAll) {
          vm.all = true
        } else {
          vm.all = false
        }
      },
      checkAll: function (e) {
        let vm = this
        let other = vm.$els.other
        !vm.all ? (vm.checked = vm.allRadio, this.hasOther && (this.other = true, 1) && vm.checked.push(other && other.value || '')) : (vm.checked = [], this.other = false)
        vm.dispatchCheckValue()
      },
      checkOther: function (e) {
        let vm = this
        vm.other = !!(vm.other ? 0 : 1)
        vm.addOtherValue()
      },
      onOtherText: function (e) {
        let vm = this
        vm.otherValue = e.target.value
        vm.addOtherValue()
      },
      addOtherValue: function () {
        let vm = this
        vm.dispatchCheckValue()
      },
      change: function (e) {
        let vm = this
        if (vm.readonly) {
          return
        }
        let val = e.target.value
        let checked = !(~vm.checked.indexOf(val))
        let oldValue = vm.checked.slice(0)
        let idx = oldValue.indexOf(val)
        if (checked && idx === -1) {
          oldValue.push(val)
        } else if (!checked && ~idx) {
          idx = oldValue.indexOf(val)
          if (~idx) {
            oldValue.splice(idx, 1)
          }
        }
        vm.checked = oldValue
        vm.dispatchCheckValue()
      },
      dispatchCheckValue: function (arr) {
        let val = null
        let vm = this
        val = vm.checked.slice(0)
        vm.other && this.otherValue && val.push(this.otherValue)
        vm.$dispatch('radio-checked', val.join(','))
      }
    },
    ready () {
      this.isCheckAll()
    },
    watch: {
      checked: function (val) {
        this.isCheckAll()
      }
    }
  }
</script>
<style>
  label.other-checkbox{
    width: 400px;
  }
  .other-checkbox input{
    width: 300px;
    display: inline-block;
  }
</style>
