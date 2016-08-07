<template>
    <div class="region-box">
      <select class="form-control" v-model="province" @change="changeProvince" :disabled="readonly">
        <option v-for="province in provinces" track-by="$index" :value="province">{{province}}</option>
      </select>
      <select class="form-control" v-model="city" @change="changeCity" :disabled="readonly">
        <option v-for="city in cities" track-by="$index" :value="city">{{city}}</option>
      </select>
      <select class="form-control" v-model="area" @change="changeArea" :disabled="readonly">
        <option v-for="area in areas" track-by="$index" :value="area">{{area}}</option>
      </select>
    </div>
</template>
<script type="text/ecmascript-6">
  let _province = '省'
  let _city = '市'
  let _area = '区'
  export default {
    props: {
      province: {
        type: String,
        default: _province
      },
      city: {
        type: String,
        default: _city
      },
      area: {
        type: String,
        default: _area
      },
      region: Object,
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      provinces: function () {
        let vm = this
        vm.province = vm.province || _province
        vm.city = vm.city || _city
        vm.area = vm.area || _area
        let provinces = Object.keys(vm.region)
        provinces.unshift(_province)
        return provinces
      },
      cities: function () {
        let vm = this
        let cities = vm.region[vm.province]
        if (vm.province === _province || !cities) {
          return [_city]
        }
        cities = Object.keys(cities)
        cities.unshift(_city)
        return cities
      },
      areas: function () {
        let vm = this
        if (!vm.city || vm.city === _city) {
          return [_area]
        }
        let cities = vm.region[vm.province] && vm.region[vm.province][vm.city]
        if (!cities) {
          return [_area]
        }
        let areas = cities.map((city) => {
          return city
        })
        areas.unshift(_area)
        return areas
      }
    },
    methods: {
      changeProvince: function (e) {
        let vm = this
        vm.city = _city
        vm.area = _area
        vm.areas = [_area]
        vm.change()
      },
      changeCity: function (e) {
        this.area = _area
        this.change()
      },
      changeArea: function (e) {
        this.change()
      },
      change: function () {
        let vm = this
        let province = vm.province === _province ? '' : vm.province
        let city = vm.city === _city ? '' : vm.city
        let area = vm.area === _area ? '' : vm.area
        vm.$dispatch('select-region', [province, city, area])
      }
    }
  }
</script>
<style>
  .region-box{
    display: inline-block;
  }
</style>
