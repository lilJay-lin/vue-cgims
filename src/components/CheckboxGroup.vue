<template>
  <div class="label-inline">
    <label v-show="hasAll">
      <div class="radio">
        <span :class="{'checked': all}">
          <input type="checkbox" @change="checkAll" :name="name" value="" :disabled="readonly"/>
        </span>
      </div>
      {{allText}}
    </label>
    <label v-for="radio in radios" track-by="$index">
      <div class="radio">
        <span :class="{'checked': ~checked.indexOf(radio.value)}">
          <input type="checkbox" @change="change($event, $index)" :name="name" :value="radio.value" :disabled="readonly"/>
        </span>
      </div>
      {{radio.name}}
    </label>
    <label v-show="hasOther" class="other-checkbox">
      <div class="radio">
        <span :class="{'checked': other}">
          <input type="checkbox" @change="checkOther" :name="name" :disabled="readonly"/>
        </span>
      </div>
      其他
      <input type="text" :disabled="!other" :value="otherValue" @input="onOtherText"/>
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
      checkAll: function (e) {
        let vm = this
        vm.all = !vm.all
        vm.all ? vm.checked = vm.allRadio : (vm.checked = [], this.other = false)
        vm.dispatchCheckValue(vm.checked)
      },
      checkOther: function (e) {
        let vm = this
        vm.other = !vm.other
        vm.addOtherValue()
      },
      onOtherText: function (e) {
        let vm = this
        vm.otherValue = e.target.value
        vm.addOtherValue()
      },
      addOtherValue: function () {
        let vm = this
        let checked = vm.checked.slice(0)
        vm.other && vm.otherValue.trim() !== '' && checked.push(vm.otherValue)
        vm.dispatchCheckValue(checked)
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
        if (arr) {
          val = arr
        } else {
          val = vm.checked.slice(0)
          vm.other && this.otherValue && val.push(this.otherValue)
        }
        vm.$dispatch('radio-checked', val.join(','))
      }
    }
  }
</script>
<style>
  label.other-checkbox{
    width: 230px;
  }
</style>
