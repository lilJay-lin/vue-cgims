<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="title">
      <div class="dataTables-filter-wrap">
        <div class="dataTables-filter">
          <label>
            <input type="text" v-el:search @keydown.enter="startSearchUser(1)"/>
            <button type="button" class="btn btn-info" @click="startSearchUser(1)">搜索</button>
          </label>
        </div>
      </div>
      <table class="table with-check user">
        <thead>
        <tr>
          <th>
            <div class="checker" >
              <span :class="{checked: checkAll}"><input type="checkbox" :checked="checkAll"  name="title-table-checkbox"  @change="toggleCheck($event, '')"></span>
            </div>
          </th>
          <th>用户名</th>
          <th class="desc">姓名</th>
          <th class="desc">手机</th>
          <th class="operation-group">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users.list">
          <td>
            <div class="checker" >
              <span :class="{checked: user.checked}"><input type="checkbox" :checked="user.checked" @change="toggleCheck($event, user.id)"></span>
            </div>
          </td>
          <td>{{user.loginName}}</td>
          <td>{{user.name}}</td>
          <td>{{user.phoneNum}}</td>
          <td>
            <div class="operation-group">
              <a v-link="'/admin/user/' + user.id + '?type=query'" title="详情"><i class="icon-search"></i></a>
              <a  v-link="'/admin/user/' + user.id + '?type=edit'" title="更新"><i class="icon-pencil"></i></a>
              <a  href="javascript:void(0)" title="删除" @click="deleteUser(user.id)"><i class="icon-remove"></i></a>
            </div>
          </td>
        </tr>
        </tbody>

      </table>

      <div class="fg-toolbar">
        <div class="fg-toolbar-operation">
          <button type="button" class="btn btn-success" @click="deleteUser()">删除</button>
          <a v-link="'/admin/user/add?type=new'" class="btn btn-success">新增</a>
        </div>
        <Pagination :cur-page="users.pageInfo.curPage"  :page-size="users.pageInfo.pageSize"   :total="users.pageInfo.total" :total-page="users.pageInfo.totalPage" @go-page="startSearchUser"></Pagination>
      </div>
      </div>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getPermission} from 'my_vuex/getters/auth'
  import {getBreadCrumb} from 'my_vuex/getters/getters'
  import {getUsers, getCheckAll} from 'my_vuex/getters/user'
  import {searchUser, checkUser, deleteUser} from 'my_vuex/actions/user'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
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
        this.checkUser(el.checked, id)
      },
      startSearchUser: function (page) {
        let searchKeyword = this.$els.search.value.trim()
        this.searchUser({searchKeyword, curPage: page || 1})
      }
    },
    route: {
      data (transition) {
        let {to: {query: {back}}} = transition
        if (!this.permission.userManager) {
          transition.redirect('/admin/forbidden')
        }
        let users = this.users
        let searchKeyword = this.$els.search && this.$els.search.value || users.searchKeyword
        back ? this.searchUser({searchKeyword: searchKeyword, curPage: users.pageInfo.curPage}) : this.searchUser({})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        users: getUsers,
        checkAll: getCheckAll,
        permission: getPermission
      },
      actions: {
        searchUser,
        checkUser,
        deleteUser
      }
    }
  }
</script>
