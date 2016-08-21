<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="true" :title="title">
      <form class="form-horizontal">
        <div class="control-group">
          <div class="controls creators">
            <radio-group :radios="creators"  :name="'creatorId'" @radio-checked="setCreatorId" :checked="search.creatorId"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <div class="controls">
            <radio-group :radios="serviceTypes" :name="'serviceType'" @radio-checked="setServerType" :checked="search.serviceType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <div class="controls label-inline">
            <label>
              <input type="text" placeholder="订单完成时间：起（包含）" onClick="WdatePicker()"  readonly="true" v-el:beging/>
            </label>
            <label>至</label>
            <label>
              <input type="text" onClick="WdatePicker()" placeholder="订单完成时间：止（包含）"  readonly="true" v-el:end/>
            </label>
          </div>
        </div>
        <div class="control-group">
          <div class="controls">
            <radio-group :name="'searchType'" :radios="searchTypes" @radio-checked="setSearchType" :checked="search.searchType"></radio-group>
          </div>
        </div>
        <div class="form-actions">
          <input type="button" class="btn btn-success btn-large" @click="onStartStatistic" value="开始统计" v-if="state"/>
          <input type="button" class="btn btn-success btn-large"  value="统计中..." v-else/>
          <div class="statistics-result">
            统计结果：
            <div>
              <label>{{this.searchTypesObject[search.searchType]}}：</label>
              <input type="text" :value="value" readonly="readonly"/>
              <label>
                {{unit}}
              </label>
            </div>
          </div>
        </div>
      </form>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import {getSearch, getValue, getState} from 'my_vuex/getters/statistic'
  import {setSearch, startStatistic} from 'my_vuex/actions/statistic'
  import {getUsers} from 'my_vuex/getters/user'
  import {searchUser} from 'my_vuex/actions/user'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import RadioGroup from 'components/RadioGroup'
  const forEach = require('lodash/forEach')
  export default {
    components: {
      Content,
      Widget,
      Pagination,
      RadioGroup
    },
    computed: {
      title: function () {
        return '订单统计'
      },
      unit: function () {
        return this.search.searchType === 'orderCount' ? '个' : this.search.searchType === 'profitMargin' ? '%' : '元'
      },
      creators: function () {
        let creators = this.users.list.map((user) => {
          return {
            name: user.name,
            value: user.id
          }
        })
        creators.unshift({
          name: '不限',
          value: ''
        })
        return creators
      },
      serviceTypes: function () {
        let serviceTyps = ['配送安装', '维修'].map((val) => {
          return {
            name: val,
            value: val
          }
        })
        serviceTyps.unshift({
          name: '不限',
          value: ''
        })
        return serviceTyps
      },
      searchTypesObject: function () {
        return {
          'orderCount': '订单数',
          'income': '总收入',
          'expenditure': '总支出',
          'profit': '总利润',
          'profitMargin': '利润率',
          'incomeP': '每单收入',
          'profitP': '每单利润'
        }
      },
      searchTypes: function () {
        let arrs = []
        let obj = this.searchTypesObject
        forEach(obj, (val, key) => {
          arrs.push({
            name: val,
            value: key
          })
        })
        return arrs
      }
    },
    methods: {
      onStartStatistic: function () {
        this.setSearch({
          beginTime: this.$els.beging.value,
          endTime: this.$els.end.value
        })
        this.startStatistic()
      },
      setCreatorId: function (value) {
        this.setSearch({
          creatorId: value
        })
      },
      setServerType: function (value) {
        this.setSearch({
          serviceType: value
        })
      },
      setSearchType: function (value) {
        this.setSearch({
          searchType: value
        })
      }
    },
    route: {
      data () {
        this.searchUser({pageSize: 9999})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        region: getRegion,
        users: getUsers,
        search: getSearch,
        value: getValue,
        state: getState
      },
      actions: {
        searchUser,
        setSearch,
        startStatistic
      }
    }
  }
</script>
