<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="title">
      <div class="dataTables-filter-wrap worker">
        <div class="dataTables-filter">
          <label>
            <Region @select-region="selectRegion"></Region>
            <input type="hidden" v-el:search_region/>
            <select class="form-control" v-el:search_service>
              <option value="服务" selected>服务</option>
              <option value="配安">配送安装</option>
              <option value="维修">维修</option>
            </select>
            <input type="text" placeholder="师傅名、电话" @keydown.enter="startSearchWorker(1)" v-el:search/>
            <button type="button" class="btn btn-info"  @click="startSearchWorker(1)">搜索</button>
            <a v-link="'/admin/worker/add?type=new'" class="btn btn-success">新增</a>
          </label>
        </div>
      </div>
      <table class="table with-check" >
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
          <th>评价</th>
          <th>合作次数</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="worker in workers.list">
          <td>
            <div class="checker" >
              <span :class="{checked: worker.checked}"><input type="checkbox" :checked="worker.checked" @change="toggleCheck($event, worker.id)"></span>
            </div>
          </td>
          <td>{{worker.workman_number}}</td>
          <td>{{worker.name}}</td>
          <td>{{worker.phone_num}}</td>
          <td>{{worker.qq}}</td>
          <td>{{worker.service_area}}</td>
          <td>{{worker.score}}</td>
          <td>{{worker.cooperate_times}}</td>
          <td>{{worker.description}}</td>
          <td>
            <div class="operation-group">
              <a v-link="'/admin/worker/' + worker.id + '?type=query'" title="详情"><i class="icon-search"></i></a>
              <a  v-link="'/admin/worker/' + worker.id + '?type=edit'" title="更新"><i class="icon-pencil"></i></a>
              <a  href="javascript:void(0)" title="删除" @click="deleteWorker(worker.id)"><i class="icon-remove"></i></a>
            </div>
          </td>
        </tr>
        </tbody>

      </table>
      <div class="fg-toolbar">
        <div class="fg-toolbar-operation">
          <button type="button" class="btn btn-success" @click="deleteWorker()">批量删除</button>
        </div>
        <Pagination :cur-page="workers.pageInfo.curPage" :total="workers.pageInfo.total" :page-size="workers.pageInfo.pageSize" :total-page="workers.pageInfo.totalPage" @go-page="startSearchWorker"></Pagination>
      </div>
      </div>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import {getWorkers, getCheckAll} from 'my_vuex/getters/worker'
  import {searchWorker, checkWorker, deleteWorker} from 'my_vuex/actions/worker'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import Region from 'components/Region'
  export default {
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
          server_type: service
        }, curPage: page || 1})
      },
      selectRegion: function (region) {
        this.$els.search_region.value = region.join('/')
      }
    },
    route: {
      data ({to: {query: {back}}}) {
        back ? this.searchWorker({searchKeyword: this.$els.search.value.trim(), curPage: this.workers.pageInfo.curPage}) : this.searchWorker({})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        workers: getWorkers,
        checkAll: getCheckAll,
        region: getRegion
      },
      actions: {
        searchWorker,
        checkWorker,
        deleteWorker
      }
    }
  }
</script>
<style>
  .worker.dataTables-filter-wrap select {
    width: 130px
  }
</style>
