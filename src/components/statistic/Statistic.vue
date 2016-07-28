<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="true" :title="title">
      <form class="form-horizontal">
        <div class="control-group">
          <div class="controls">
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
              <input type="date" @change="setTime($event, 'beginTime')">
            </label>
            <label>至</label>
            <label>
              <input type="date" @change="setTime($event, 'endTime')">
            </label>
          </div>
        </div>
        <div class="control-group">
          <div class="controls">
            <radio-group :name="'searchType'" :radios="searchTypes" @radio-checked="setSearchType" :checked="search.searchType"></radio-group>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-success btn-large" @click="startStatistic">开始统计</button>
          <div class="statistics-result">
            统计结果：
            <div>
              <label>总利润：</label>
              <input type="text" />
              <label>元</label>
            </div>
          </div>
        </div>
      </form>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import {getSearch, getValue} from 'my_vuex/getters/statistic'
  import {setSearch, startStatistic} from 'my_vuex/actions/statistic'
  import {getUsers} from 'my_vuex/getters/user'
  import {searchUser} from 'my_vuex/actions/user'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import RadioGroup from 'components/RadioGroup'
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
      creators: function () {
        let creators = this.users.list.map((user) => {
          return {
            name: user.name,
            value: user.id
          }
        })
        creators.unshift({
          name: '不限',
          value: '不限'
        })
        return creators
      },
      serviceTypes: function () {
        return ['不限', '配送安装', '维修'].map((val) => {
          return {
            name: val,
            value: val
          }
        })
      },
      searchTypes: function () {
        let arrs = ['orderCount', 'income', 'expenditure', 'profit', 'profitMargin']
        return ['订单数', '总收入', '总支出', '总利润', '利润率'].map((val, idx) => {
          return {
            name: val,
            value: arrs[idx]
          }
        })
      }
    },
    methods: {
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
      },
      setTime: function (e, key) {
        this.setSearch({
          [key]: e.target.value
        })
      }
    },
    route: {
      data () {
        this.searchUser({})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        region: getRegion,
        users: getUsers,
        search: getSearch,
        value: getValue
      },
      actions: {
        searchUser,
        setSearch,
        startStatistic
      }
    }
  }
</script>
