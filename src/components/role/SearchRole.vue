<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="title">
      <div class="dataTables-filter-wrap">
        <div class="dataTables-filter">
          <label>
            <input type="text" v-el:search @keydown.enter="startSearchRole(1)"/>
            <button type="button" class="btn btn-info" @click="startSearchRole(1)">搜索</button>
          </label>
        </div>
      </div>
      <table class="table with-check role">
        <thead>
        <tr>
          <th>
            <div class="checker" >
              <span :class="{checked: checkAll}"><input type="checkbox" :checked="checkAll"  name="title-table-checkbox"  @change="toggleCheck($event, '')"></span>
            </div>
          </th>
          <th>角色名称</th>
          <th class="desc">描述</th>
          <th class="operation-group">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="role in roles.list">
          <td>
            <div class="checker" >
              <span :class="{checked: role.checked}"><input type="checkbox" :checked="role.checked" @change="toggleCheck($event, role.id)"></span>
            </div>
          </td>
          <td>{{role.name}}</td>
          <td>{{role.description}}</td>
          <td>
            <div class="operation-group">
              <a v-link="'/admin/role/' + role.id + '?type=query'" title="详情"><i class="icon-search"></i></a>
              <a  v-show="permission.roleManager" v-link="'/admin/role/' + role.id + '?type=edit'" title="更新"><i class="icon-pencil"></i></a>
              <a  v-show="permission.roleManager" href="javascript:void(0)" title="删除" @click="deleteRole(role.id)"><i class="icon-remove"></i></a>
            </div>
          </td>
        </tr>
        </tbody>

      </table>

      <div class="fg-toolbar">
        <div class="fg-toolbar-operation">
          <button type="button" class="btn btn-success" @click="deleteRole()" v-show="permission.roleManager">删除</button>
          <a v-link="'/admin/role/add?type=new'" class="btn btn-success" v-show="permission.roleManager">新增</a>
        </div>
        <Pagination :cur-page="roles.pageInfo.curPage"  :page-size="roles.pageInfo.pageSize"   :total="roles.pageInfo.total" :total-page="roles.pageInfo.totalPage" @go-page="startSearchRole"></Pagination>
      </div>
      </div>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb} from 'my_vuex/getters/getters'
  import {getRoles, getCheckAll} from 'my_vuex/getters/role'
  import {searchRole, checkRole, deleteRole} from 'my_vuex/actions/role'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import {getPermission} from 'my_vuex/getters/auth'
  export default {
    components: {
      Content,
      Widget,
      Pagination
    },
    computed: {
      title: function () {
        return '角色管理'
      }
    },
    methods: {
      toggleCheck: function (e, id) {
        let el = e.target
        this.checkRole(el.checked, id)
      },
      startSearchRole: function (page) {
        let searchKeyword = this.$els.search.value.trim()
        this.searchRole({searchKeyword, curPage: page || 1})
      }
    },
    route: {
      data (transition) {
        let {to: {query: {back}}} = transition
        let permission = this.permission
        if (!(permission.userManager || permission.roleManager)) {
          transition.redirect('/admin/forbidden')
        }
        let roles = this.roles
        let searchKeyword = this.$els.search && this.$els.search.value || roles.searchKeyword
        back ? this.searchRole({searchKeyword: searchKeyword, curPage: roles.pageInfo.curPage}) : this.searchRole({})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        roles: getRoles,
        checkAll: getCheckAll,
        permission: getPermission
      },
      actions: {
        searchRole,
        checkRole,
        deleteRole
      }
    }
  }
</script>
