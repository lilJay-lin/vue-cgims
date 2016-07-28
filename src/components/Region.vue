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
        this.province = this.province || _province
        this.city = this.city || _city
        this.area = this.area || _area
        let provinces = Object.keys(this.region)
        provinces.unshift(_province)
        return provinces
      },
      cities: function () {
        let cities = this.region[this.province]
        if (this.province === _province || !cities) {
          return [_city]
        }
        cities = Object.keys(cities)
        cities.unshift(_city)
        return cities
      },
      areas: function () {
        if (this.city === _city) {
          return [_area]
        }
        let cities = this.region[this.province][this.city]
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
        this.city = _city
        this.area = _area
        this.areas = [_area]
        this.change()
      },
      changeCity: function (e) {
        this.area = _area
        this.change()
      },
      changeArea: function (e) {
        this.change()
      },
      change: function () {
        let province = this.province === _province ? '' : this.province
        let city = this.city === _city ? '' : this.city
        let area = this.area === _area ? '' : this.area
        this.$dispatch('select-region', [province, city, area])
      }
    }
  }
</script>
<style>
  .region-box{
    display: inline-block;
  }
</style>
