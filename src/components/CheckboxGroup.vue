<template>
  <div class="label-inline">
    <label v-for="radio in radios | showChecked" track-by="$index">
      <div class="radio">
        <span :class="{'checked': checked.indexOf(radio.value) !== -1}">
          <input type="checkbox" @change="change($event, $index)" :name="name" :value="radio.value" :disabled="readonly"/>
        </span>
      </div>
      {{radio.name}}
    </label>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      name: String,
      radios: {
        type: Array,
        default: function () {
          return []
        }
      },
      checked: {
        type: [Array],
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
          cur.value !== '全部' && pre.push(cur.value)
          return pre
        }, [])
      }
    },
    methods: {
      change: function (e) {
        if (this.readonly) {
          return
        }
        let checked = e.target.checked
        let val = e.target.value
        let oldValue = this.checked
        let idx = oldValue.indexOf(val)
        if (val === '全部') {
          this.checked = checked ? this.allRadio : []
        } else {
          if (checked && idx === -1) {
            this.checked.push(val)
          } else if (!checked && ~idx) {
            idx = oldValue.indexOf(val)
            if (~idx) {
              oldValue.splice(idx, 1)
            }
          }
        }
        this.$dispatch('radio-checked', oldValue.join(','))
      }
    },
    filters: {
      showChecked: function (radios) {
        let vm = this
        let checked = vm.checked || vm.radios.length > 0 && [vm.radios[0].value]
        return radios.map((radio) => {
          if (checked.indexOf(radio.value)) {
            radio.checked = true
          } else {
            radio.checked = false
          }
          return radio
        })
      }
    }
  }
</script>
