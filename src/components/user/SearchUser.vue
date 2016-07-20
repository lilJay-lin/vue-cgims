<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="title">
      <table class="table with-check role">
        <thead>
        <tr>
          <th>
            <div class="checker" >
              <span :class="{checked: checkAll}"><input type="checkbox"  name="title-table-checkbox"  @change="toggleCheck($event, '')"></span>
            </div>
          </th>
          <th>用户名</th>
          <th >姓名</th>
          <th >手机</th>
          <th class="operation-group">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users.list">
          <td>
            <div class="checker" >
              <span :class="{checked: user.checked}"><input type="checkbox" @change="toggleCheck($event, user.id)"></span>
            </div>
          </td>
          <td>{{user.login_name}}</td>
          <td>{{user.name}}</td>
          <td>{{user.phone_num}}</td>
          <td>
            <div class="operation-group">
              <a href="" title="详情"><i class="icon-search"></i></a>
              <a  href="#" title="更新"><i class="icon-pencil"></i></a>
              <a  href="#" title="删除"><i class="icon-remove"></i></a>
            </div>
          </td>
        </tr>
        </tbody>

      </table>

      <div class="fg-toolbar">
        <div class="fg-toolbar-operation">
          <button type="button" class="btn btn-success">删除</button>
          <button type="button" class="btn btn-success">新增</button>
        </div>
        <Pagination></Pagination>
      </div>
      </div>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb} from 'my_vuex/getters/getters'
  import {getUsers, getCheckAll} from 'my_vuex/getters/user'
import {searchUser, checkUser} from 'my_vuex/actions/user'
import BreadCrumb from 'components/BreadCrumb'
import Content from 'components/Content'
import Widget from 'components/Widget'
import Pagination from 'components/Pagination'
export default {
    components: {
      BreadCrumb,
      Content,
      Widget,
      Pagination
    },
    computed: {
      title: function () {
        return '用户管理'
      }
    },
    methods: {
      toggleCheck: function (e, id) {
        let el = e.target
        this.checkUser(el.checked, id)
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
        users: getUsers,
        checkAll: getCheckAll
      },
      actions: {
        searchUser,
        checkUser
      }
    }
}
</script>
<style>
  .table td{
    text-align: center;
  }
</style>
