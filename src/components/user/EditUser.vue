<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="'用户信息'">
      <form class="form-horizontal">
        <div class="control-group">
          <label class="control-label">登录名</label>
          <div class="controls">
            <input type="text" class="span5" :value="user.loginName" :readonly="!isEdit" placeholder="登录名" v-el:login_name>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">手机</label>
          <div class="controls">
            <input type="text":value="user.phoneNum" class="span5" :readonly="isQuery" @change="setData('phoneNum', $event)" placeholder="请输入11位手机号码" v-el:phone_num>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">身份证</label>
          <div class="controls">
            <input type="text" :value="user.identity" class="span5" :readonly="isQuery" placeholder="身份证" v-el:identity>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">姓名</label>
          <div class="controls">
            <input type="text" :value="user.name" class="span5" :readonly="isQuery" placeholder="姓名" v-el:name>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">密码</label>
          <div class="controls">
            <input type="password" :value="user.password" :readonly="isQuery" class="span5" placeholder="密码" v-el:password>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">描述</label>
          <div class="controls">
            <textarea class="span10" :readonly="isQuery" v-el:description>{{user.description}}</textarea>
          </div>
        </div>
        <div class="control-group"  v-if="isEdit">
          <label class="control-label">添加角色</label>
          <div class="controls">
            <div class="control-box span10">
              <div class="search-table-box">
                <div class="dataTables-filter-wrap">
                  <label>
                    <input type="text" @keydown.enter="startSearchRole(1)" v-el:search_role/>
                    <button type="button" class="btn btn-info" @click="startSearchRole(1)">搜索</button>
                  </label>
                </div>
                <table class="table">
                  <thead>
                  <tr>
                    <th>角色</th>
                    <th class="desc">描述</th>
                    <th class="operation-group">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="role in roles.list">
                    <td>{{role.name}}</td>
                    <td>
                      <div class="desc">{{role.description}}</div>
                    </td>
                    <td>
                      <div class="operation-group">
                        <a  href="javascript:void(0)" title="添加" @click="addRelRole(role)"><i class="icon-plus"></i></a>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div class="fg-toolbar">
                  <Pagination  :total="roles.pageInfo.total"  :page-size="roles.pageInfo.pageSize" :cur-page="roles.pageInfo.curPage" :total-page="roles.pageInfo.totalPage" @go-page="startSearchRole"></Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">已担当角色</label>
          <div class="controls">
            <ul class="relation-list " v-show="isEdit">
              <li v-for="role in user.roles" @click="deleteRelRole(role.id)">
                <i class="icon-remove"></i>{{role.name}}
              </li>
            </ul>
            <ul class="relation-list " v-else>
              <li v-for="role in user.roles">{{role.name}}</li>
            </ul>
          </div>
        </div>
        <div class="control-group"   v-if="isEdit">
          <label class="control-label">关联个人订单</label>
          <div class="controls">
            <div class="control-box span10">
              <div class="search-table-box">
                <div class="dataTables-filter-wrap">
                  <label>
                    <input type="text" @keydown.enter="startSearchUser(1)" v-el:search_user/>
                    <button type="button" class="btn btn-info" @click="startSearchUser(1)">搜索</button>
                  </label>
                </div>
                <table class="table">
                  <thead>
                  <tr>
                    <th>用户名</th>
                    <th>姓名</th>
                    <th >电话</th>
                    <th class="operation-group">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="user in users.list">
                    <td>{{user.loginName}}</td>
                    <td >{{user.name}}</td>
                    <td>{{user.phoneNum}}</td>
                    <td>
                      <div class="operation-group">
                        <a  href="javascript:void(0)" title="添加" @click="addRelSlave(user)"><i class="icon-plus"></i></a>
                      </div>
                    </td>
                  </tr>
                  </tbody>

                </table>
                <div class="fg-toolbar">
                  <Pagination :cur-page="users.pageInfo.curPage" :total-page="users.pageInfo.totalPage" @go-page="startSearchUser"></Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">已关联个人订单</label>
          <div class="controls">
            <ul class="relation-list">
              <li v-for="slave in user.slaves">
                <i class="icon-remove"  v-if="isEdit" @click="deleteRelSlave(slave.id)"></i>{{slave.name}}
              </li>
            </ul>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-success" @click="onSaveUser" v-if="!isQuery" >保存</button>
          <a v-link="{path: '/admin/user', query: {back: true}}" class="btn btn-success">返回</a>
        </div>
      </form>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb} from 'my_vuex/getters/getters'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import {getUsers, getDetailUser, getUIOptions} from 'my_vuex/getters/user'
  import {searchUser, showUserDetail, deleteRelRole, addRelRole, deleteRelSlave, addRelSlave, saveUser, setUserMode, clearUserDetail, showSelfUserDetail} from 'my_vuex/actions/user'
  import {getRoles} from 'my_vuex/getters/role'
  import {searchRole} from 'my_vuex/actions/role'
  import {getPermission} from 'my_vuex/getters/auth'
  import mixins from 'src/mixins/mixins'
  export default {
    mixins: [mixins],
    props: {
      selfEdit: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Content,
      Widget,
      Pagination
    },
    computed: {
      title: function () {
        return '用户管理'
      },
      isEdit: function () {
        return this.mode === 'selfEdit' ? false : this.mode === 'new' || this.mode === 'edit'
      },
      isQuery: function () {
        return this.mode === 'query'
      },
      config: function () {
        return {
          phoneNum: 'isPhoneNumber'
        }
      }
    },
    methods: {
      setData: function (key, e) {
        let vm = this
        let el = e.target
        let val = el.value.trim()
        el.value = val
        let test = vm.config[key]
        if (val && test && !vm[test](val)) {
          e.target.value = ''
          return
        }
      },
      startSearchRole: function (page) {
        let searchRoleKeyword = this.$els.search_role.value.trim()
        this.searchRole({searchKeyword: searchRoleKeyword, curPage: page || 1})
      },
      startSearchUser: function (page) {
        let searchUserKeyword = this.$els.search_user.value.trim()
        this.searchUser({searchKeyword: searchUserKeyword, curPage: page || 1})
      },
      onSaveUser: function () {
        let vm = this
        let els = vm.$els
        let user = vm.user
        vm.saveUser(user, {
          id: user.id,
          name: els.name.value,
          loginName: els.login_name.value,
          phoneNum: els.phone_num.value,
          identity: els.identity.value,
          password: els.password.value,
          description: els.description.value
        }, vm.selfEdit).then(() => {
          this.$router.go('/admin/user?back=true')
        })
      }
    },
    route: {
      data (transition) {
        let {to: {path, params: {id}, query: {type}}} = transition
        let selfEdit = 'selfEdit'
        let newType = 'new'
        this.clearUserDetail()
        /*
        * 个人信息修改只能修改个人信息，不能修改其他信息
        * */
        this.selfEdit = false
        if (path.indexOf('/admin/user/self') > -1) {
          type = selfEdit
          this.selfEdit = selfEdit
        } else {
          if (id && !type) {
            type = 'query'
          } else if (!type) {
            type = newType
          }
          if ((type === 'edit' || type === newType) && !this.permission.userManager) {
            transition.redirect('/admin/forbidden')
          }
          this.searchRole({})
          this.searchUser({})
        }
        this.setUserMode(type)
        return type !== newType ? (type === selfEdit ? this.showSelfUserDetail() : this.showUserDetail(id)) : transition.next()
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        user: getDetailUser,
        roles: getRoles,
        users: getUsers,
        mode: getUIOptions,
        permission: getPermission
      },
      actions: {
        showUserDetail,
        searchUser,
        searchRole,
        deleteRelRole,
        addRelRole,
        deleteRelSlave,
        addRelSlave,
        saveUser,
        setUserMode,
        clearUserDetail,
        showSelfUserDetail
      }
    }
  }
</script>
