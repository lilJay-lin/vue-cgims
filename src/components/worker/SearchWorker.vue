<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="'师傅列表'">
      <div class="dataTables-filter-wrap">
        <div class="dataTables-filter">
          <label>
            <Region @select-region="selectRegion" :region="region" :sort-provinces="sortProvinces"></Region>
            <input type="hidden" v-el:search_region/>
            <select class="form-control" v-el:search_service>
              <option value="" selected>全部</option>
              <option value="配送安装">配送安装</option>
              <option value="维修">维修</option>
            </select>
            <input type="text"style="width: 220px;" placeholder="工号、师傅姓名、电话、服务地区" @keydown.enter="startSearchWorker(1)" v-el:search/>
            <button type="button" class="btn btn-info"  @click="startSearchWorker(1)">搜索</button>
            <a v-show="permission.workmanManager" v-link="'/admin/worker/add?type=new'" class="btn btn-success">新增</a>
          </label>
        </div>
      </div>
      <table class="table with-check worker" >
        <thead>
        <tr>
          <th>
            <div class="checker" >
              <span :class="{checked: checkAll}"><input type="checkbox" :checked="checkAll"  name="title-table-checkbox"  @change="toggleCheck($event, '')"></span>
            </div>
          </th>
          <th>工号</th>
          <th>名称</th>
          <th>电话</th>
          <th>qq</th>
          <th>服务地区</th>
          <th>服务类型</th>
          <th>合作</th>
          <th>备注</th>
          <!--<th>操作</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="worker in workers.list">
          <td>
            <div class="checker" >
              <span :class="{checked: worker.checked}"><input type="checkbox" :checked="worker.checked" @change="toggleCheck($event, worker.id)"></span>
            </div>
          </td>
          <td><a v-link="'/admin/worker/' + worker.id">{{worker.workmanNumber}}</a></td>
          <td>{{worker.name}}</td>
          <td>{{worker.phoneNum}}</td>
          <td>{{worker.qq}}</td>
          <td style="width:220px">{{worker.serviceArea}}</td>
          <td style="width:60px">{{worker.serviceType}}</td>
          <td style="width:30px">{{worker.cooperateTimes}}</td>
          <td class="description">{{worker.description}}</td>
          <!--
            <td class="operation-group-td">
              <div class="operation-group">
                <a v-link="'/admin/worker/' + worker.id + '?type=query'" title="详情"><i class="icon-search"></i></a>
                <a v-show="permission.workmanManager" v-link="'/admin/worker/' + worker.id + '?type=edit'" title="更新"><i class="icon-pencil"></i></a>
                <a v-show="permission.workmanManager" href="javascript:void(0)" title="删除" @click="onDeleteWorker(worker.id)"><i class="icon-remove"></i></a>
              </div>
            </td>
          -->
        </tr>
        </tbody>

      </table>
      <div class="fg-toolbar">
        <div class="fg-toolbar-operation" v-show="permission.workmanManager">
          <button type="button" class="btn btn-success" @click="onDeleteWorker()">批量删除</button>
        </div>
        <Pagination :cur-page="workers.pageInfo.curPage" :total="workers.pageInfo.total" :page-size="workers.pageInfo.pageSize" :total-page="workers.pageInfo.totalPage" @go-page="startSearchWorker"></Pagination>
      </div>
      </div>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {setRegion} from 'my_vuex/actions/actions'
  import {toggleDialog} from 'my_vuex/actions/dialog'
  import {getPermission} from 'my_vuex/getters/auth'
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import {getWorkers, getCheckAll, hasCheck} from 'my_vuex/getters/worker'
  import {searchWorker, checkWorker, deleteWorker} from 'my_vuex/actions/worker'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import Region from 'components/Region'
  export default {
    props: {
      sortProvinces: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    components: {
      Content,
      Widget,
      Pagination,
      Region
    },
    computed: {
      title: function () {
        return '师傅管理'
      }
    },
    methods: {
      toggleCheck: function (e, id) {
        let el = e.target
        this.checkWorker(el.checked, id)
      },
      startSearchWorker: function (page) {
        let searchKeyword = this.$els.search.value.trim()
        let region = this.$els.search_region.value
        let service = this.$els.search_service.value
        this.searchWorker({search: {
          searchKeyword,
          region,
          serverType: service
        }, curPage: page || 1})
      },
      selectRegion: function (region) {
        this.$els.search_region.value = region.join('/')
      },
      onDeleteWorker: function (id) {
        let vm = this
        if (!(id || vm.hasCheck)) {
          vm.toggleDialog({
            content: '请选择要删除的师傅',
            show: true,
            auto: true,
            hasSuccessBtn: false,
            hasCloseBtn: false
          })
        } else {
          vm.toggleDialog({
            content: '是否删除师傅',
            show: true,
            hasSuccessBtn: true,
            hasCloseBtn: true,
            auto: false,
            success: () => {
              vm.deleteWorker(id)
            }
          })
        }
      }
    },
    route: {
      data (transition) {
        let {to: {query: {back}}} = transition
        let permission = this.permission
        if (!(permission.orderManager || permission.orderView || permission.workmanManager || permission.userOrderManager)) {
          transition.redirect('/admin/forbidden')
        }
        this.setRegion()
        this.sortProvinces = window.__PROVINCE_NAMES__ && window.__PROVINCE_NAMES__.split(',') || []
        let workers = this.workers
        back ? this.searchWorker({search: workers.search, curPage: this.workers.pageInfo.curPage}) : this.searchWorker({})
      }
    },
    vuex: {
      getters: {

        workers: getWorkers,
        checkAll: getCheckAll,
        region: getRegion,
        permission: getPermission,
        hasCheck: hasCheck
      },
      actions: {
        searchWorker,
        checkWorker,
        deleteWorker,
        toggleDialog,
        setRegion
      }
    }
  }
</script>
<style>
  .dataTables-filter-wrap select {
    width: 130px
  }
</style>
