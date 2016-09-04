<template>
  <Content :breads="breads" :title="title">
    <Widget :title="'角色信息'">
      <form  class="form-horizontal">
        <div class="control-group">
          <label class="control-label">角色名</label>
          <div class="controls">
            <input type="text" class="span5" :value="role.name" :readonly="isQuery" placeholder="角色名" v-el:name>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">描述</label>
          <div class="controls">
            <textarea class="span10" v-el:description  :readonly="isQuery">{{role.description}}</textarea>
          </div>
        </div>
        <div class="control-group" v-if="isEdit">
          <label class="control-label">添加权限</label>
          <div class="controls">
            <div class="control-box span10">
              <div class="search-table-box">
                <div class="dataTables-filter-wrap">
                  <div class="dataTables-filter">
                    <label>
                      <input type="text" @keydown.enter="startSearchPermission(1)" v-el:search/>
                      <button type="button" class="btn btn-info" @click="startSearchPermission(1)">搜索</button>
                    </label>
                  </div>
                </div>
                <table class="table permission">
                  <thead>
                  <tr>
                    <th>权限</th>
                    <th>描述</th>
                    <th class="operation-group">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="permission in permissions.list">
                    <td>{{permission.name}}</td>
                    <td>{{permission.description}}</td>
                    <td class="operation-group-td" style="width:50px;">
                      <div class="operation-group">
                        <a  href="javascript:void(0)" title="添加" @click="addRelPermission(permission)"><i class="icon-plus"></i></a>
                      </div>
                    </td>
                  </tr>
                  </tbody>

                </table>

                <div class="fg-toolbar">
                  <Pagination  :total="permissions.pageInfo.total"  :page-size="permissions.pageInfo.pageSize"  :cur-page="permissions.pageInfo.curPage" :total-page="permissions.pageInfo.totalPage" @go-page="startSearchPermission"></Pagination>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">已分配权限</label>
          <div class="controls">
            <ul class="relation-list"  v-show="isEdit">
              <li v-for="permission in role.permissions"  @click="deleteRelPermission(permission.id)">
                <i class="icon-remove" ></i>{{permission.name}}
              </li>
            </ul>
            <ul class="relation-list" v-else>
              <li v-for="permission in role.permissions">{{permission.name}}</li>
            </ul>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-success" @click="onSaveRole" v-if="isEdit" >保存</button>
          <a v-link="{path: '/admin/role', query: {back: true}}" class="btn btn-success">返回</a>
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
  import {getDetailRole, getUIOptions} from 'my_vuex/getters/role'
  import {showRoleDetail, deleteRelPermission, addRelPermission, saveRole, setRoleMode, clearRoleDetail} from 'my_vuex/actions/role'
  import {getPermission} from 'my_vuex/getters/auth'
  import {getPermissions} from 'my_vuex/getters/permission'
  import {searchPermission} from 'my_vuex/actions/permission'
  export default {
    components: {
      Content,
      Widget,
      Pagination
    },
    computed: {
      title: function () {
        return '角色管理'
      },
      isEdit: function () {
        return this.mode !== 'query'
      },
      isQuery: function () {
        return this.mode === 'query'
      }
    },
    methods: {
      startSearchPermission: function (page) {
        let searchKeyword = this.$els.search.value.trim()
        this.searchPermission({searchKeyword, curPage: page || 1}, 1)
      },
      onSaveRole: function () {
        let vm = this
        let els = vm.$els
        let role = vm.role
        vm.saveRole(role, {
          id: role.id,
          name: els.name.value,
          description: els.description.value
        }).then(() => {
          this.$router.go('/admin/role?back=true')
        })
      }
    },
    route: {
      data (transition) {
        let {to: {params: {id}, query: {type}}} = transition
        if (id && !type) {
          type = 'query'
        } else if (!type) {
          type = 'new'
        }
        if ((type === 'edit' || type === 'new') && !this.permission.roleManager) {
          transition.redirect('/admin/forbidden')
        }
        this.clearRoleDetail()
        this.setRoleMode(type)
        type !== 'new' && this.showRoleDetail(id)
        this.searchPermission({})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        role: getDetailRole,
        permissions: getPermissions,
        mode: getUIOptions,
        permission: getPermission
      },
      actions: {
        showRoleDetail,
        searchPermission,
        deleteRelPermission,
        addRelPermission,
        saveRole,
        setRoleMode,
        clearRoleDetail
      }
    }
  }
</script>
