<template>
  <div class="label-inline">
    <label v-for="radio in radios" track-by="$index">
      <div class="radio">
        <span :class="{'checked': radio.value === checked}">
          <input type="radio" @click="change($event, $index)" :name="name" :value="radio.value" :disabled="readonly"/>
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
        default: []
      },
      checked: {
        type: [String, Number],
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      change: function (e) {
        if (this.readonly) {
          return
        }
        this.checked = e.target.value
        this.$dispatch('radio-checked', this.checked)
      }
    }
/*
    filters: {
      showChecked: function (radios, checked) {
        let vm = this
        /!*
        let checked = checked || vm.radios.length > 0 && vm.radios[0].value
        *!/
        return radios.map((radio) => {
          if (radio.value === checked) {
            radio.checked = true
          } else {
            radio.checked = false
          }
          return radio
        })
      }
    }*/
  }
</script>
