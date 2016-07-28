<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="title">
      <div class="dataTables-filter-wrap order">
        <div class="dataTables-filter">
          <label>
            <select class="form-control" v-el:order_status>
              <option value="全部" selected>全部状态</option>
              <option value="未收未付">未收未付</option>
              <option value="未收需付">未收需付</option>
              <option value="已收未付">已收未付</option>
              <option value="已收需付">已收需付</option>
              <option value="未收未完">未收未完</option>
              <option value="未收完成">未收完成</option>
              <option value="已收未完">已收未完</option>
              <option value="已收完成">已收完成</option>
              <option value="未收失败">未收失败</option>
              <option value="已收失败">已收失败</option>
            </select>
            <select class="form-control" v-el:service_type>
              <option value="全部" selected>全部类型</option>
              <option value="配送安装">配送安装</option>
              <option value="维修">维修</option>
            </select>
            <select class="form-control" v-el:creator_id>
              <option  v-for="user in users.list" :value="user.id">{{user.name}}</option>
            </select>
            <input type="date" v-el:begin_time/>
            至
            <input type="date" v-el:end_time/>
            <input type="text" @keydown.enter="startSearchOrder(1)" v-el:search/>
            <button type="button" class="btn btn-info" @click="startSearchOrder(1)">搜索</button>
            <button type="button" class="btn btn-info">新增</button>
          </label>
        </div>
      </div>
      <div class="operation-list"  v-el:order_operation @mouseover="keepOperaShow" @mouseout="hideOrderOpera">
        <a href="javascript:void(0)" title="未收未付" @click="onDealOrder('未收未付')"><i class="icon-link"></i>未收未付</a>
        <a href="javascript:void(0)" title="未收需付" @click="onDealOrder('未收需付')"><i class="icon-link"></i>未收需付</a>
        <a href="javascript:void(0)" title="已收未付" @click="onDealOrder('已收未付')"><i class="icon-link"></i>已收未付</a>
        <a href="javascript:void(0)" title="已收需付" @click="onDealOrder('已收需付')"><i class="icon-link"></i>已收需付</a>
        <a href="javascript:void(0)" title="未收未完" @click="onDealOrder('未收未完')"><i class="icon-link"></i>未收未完</a>
        <a href="javascript:void(0)" title="未收完成" @click="onDealOrder('未收完成')"><i class="icon-link"></i>未收完成</a>
        <a href="javascript:void(0)" title="已收未完" @click="onDealOrder('已收未完')"><i class="icon-link"></i>已收未完</a>
        <a href="javascript:void(0)" title="已收完成" @click="onDealOrder('已收完成')"><i class="icon-link"></i>已收完成</a>
        <a href="javascript:void(0)" title="未收失败" @click="onDealOrder('未收失败')"><i class="icon-link"></i>未收失败</a>
        <a href="javascript:void(0)" title="已收失败" @click="onDealOrder('已收失败')"><i class="icon-link"></i>已收失败</a>
      </div>
      <div class="operation-list" v-el:order_comment  @mouseover="keepCommentShow" @mouseout="hideOrderComment">
        <div class="operation-comment-area">
          <span>备注</span>
          <button  class="btn btn-sm btn-success" @click="onSaveComment">保存</button>
        </div>
        <textarea name="operation_comment" v-el:operation_comment></textarea>
      </div>
      <table class="table with-check order">
        <thead>
        <tr>
          <th>
            <div class="checker" >
              <span :class="{checked: checkAll}"><input type="checkbox" :checked="checkAll"  name="title-table-checkbox"  @change="toggleCheck($event, '')"></span>
            </div>
          </th>
          <th>订单号</th>
          <th>商家信息</th>
          <th>接单价/服务价</th>
          <th>师傅</th>
          <th class="detail">详情</th>
          <th class="operation-group">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders.list">
          <td>
            <div class="checker" >
              <span :class="{checked: order.checked}"><input type="checkbox" :checked="order.checked" @change="toggleCheck($event, order.id)"></span>
            </div>
          </td>
          <td>{{order.order_number}}</td>
          <td>{{order.shop_info}}</td>
          <td>{{order.order_price}}/{{order.service_price}}</td>
          <td>{{order.order_number}}</td>
          <td>{{order.customer_name}}{{order.customer_phone_num || order.customer_address}}{{order.customer_address}}</td>
          <td>
            <div class="operation-group">
              <a href="javascript:void(0)" @mouseout="hideOrderOpera" @mouseover="showOrderOpera($event, order.id)"><i class="icon-th-list"></i>操作</a>
              <a href="javascript:void(0)" @mouseout="hideOrderComment" @mouseover="showOrderComment($event, order.id, order.description)"><i class="icon-info-sign"></i>备注</a>
            </div>
          </td>
        </tr>
        </tbody>

      </table>
      <div class="fg-toolbar">
        <div class="fg-toolbar-operation">
          <select class="form-control" v-el:action>
            <option value="删除" selected>删除</option>
            <option value="未收未付">未收未付</option>
            <option value="未收需付">未收需付</option>
            <option value="已收未付">已收未付</option>
            <option value="已收需付">已收需付</option>
            <option value="未收未完">未收未完</option>
            <option value="未收完成">未收完成</option>
            <option value="已收未完">已收未完</option>
            <option value="已收完成">已收完成</option>
            <option value="未收失败">未收失败</option>
            <option value="已收失败">已收失败</option>
          </select>
          <button type="button" class="btn btn-success" @click="onDealBatch()">批量操作</button>
        </div>
        <Pagination :cur-page="orders.pageInfo.curPage" :total="orders.pageInfo.total" :page-size="orders.pageInfo.pageSize" :total-page="orders.pageInfo.totalPage" @go-page="startSearchOrder"></Pagination>
      </div>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import {getOrders, getCheckAll} from 'my_vuex/getters/order'
  import {searchOrder, checkOrder, dealOrder, updateOrderComment} from 'my_vuex/actions/order'
  import {getUsers} from 'my_vuex/getters/user'
  import {searchUser} from 'my_vuex/actions/user'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import Region from 'components/Region'
  import {css} from 'src/util/dom'
  export default {
    components: {
      Content,
      Widget,
      Pagination,
      Region
    },
    ready () {
      let elOpera = this.$els.order_operation
      let elComment = this.$els.order_comment
      elOpera.setAttribute('height', elOpera.offsetHeight)
      elOpera.setAttribute('width', elOpera.offsetWidth)
      elComment.setAttribute('height', elComment.offsetHeight)
      elComment.setAttribute('width', elComment.offsetWidth)
    },
    computed: {
      title: function () {
        return '订单管理'
      }
    },
    methods: {
      toggleCheck: function (e, id) {
        let el = e.target
        this.checkOrder(el.checked, id)
      },
      startSearchOrder: function (page) {
        let searchKeyword = this.$els.search.value.trim()
        let orderStatus = this.$els.order_status.value.trim()
        let serviceType = this.$els.service_type.value.trim()
        let creatorId = this.$els.creator_id.value.trim()
        let beginTime = this.$els.begin_time.value.trim()
        let endTime = this.$els.end_time.value.trim()
        let search = {
          searchKeyword,
          orderStatus,
          serviceType,
          creatorId,
          beginTime,
          endTime
        }
        this.searchOrder({search, curPage: page || 1})
      },
      onSaveComment: function () {
        let el = this.$els.order_comment
        let id = el.getAttribute('curren')
        let val = this.$els.operation_comment.value.trim()
        this.updateOrderComment({id, description: val})
      },
      onDealOrder: function (orderStatus) {
        let el = this.$els.order_operation
        let id = el.getAttribute('curren')
        id && this.onDealBatch(id, orderStatus)
      },
      onDealBatch: function (id, orderStatus) {
        let val = ''
        let action = ''
        /*
        *  非批量操作
        * */
        if (id) {
          val = orderStatus
          action = 'update'
        } else {
          val = this.$els.action.value
          action = val === '删除' ? 'delete' : 'update'
        }
        let data = {id: id, action, orderStatus: val}
        this.dealOrder(data)
      },
      showOrderOpera: function (e, id) {
        let el = this.$els.order_operation
        el.setAttribute('curren', id)
        this.show(e, el)
      },
      show: function (e, el) {
        let elHeight = parseInt(el.getAttribute('height'), 10)
        let elWidth = parseInt(el.getAttribute('width'), 10)
        let top = e.clientY
        let left = e.clientX
        let height = window.innerHeight
        let width = window.innerWidth
        top = top + elHeight > height ? height - elHeight - 80 : top
        left = left + elWidth > width ? width - elWidth - 40 : left
        css(el, {
          display: 'block',
          left: left + 'px',
          top: top + 'px'
        })
      },
      showOrderComment: function (e, id, description) {
        this.$els.operation_comment.value = description
        let el = this.$els.order_comment
        el.setAttribute('curren', id)
        this.show(e, el)
      },
      hideOrderOpera: function (e, id) {
        css(this.$els.order_operation, {
          display: 'none'
        })
      },
      hideOrderComment: function (e, id) {
        css(this.$els.order_comment, {
          display: 'none'
        })
      },
      keepOperaShow: function () {
        css(this.$els.order_operation, {
          display: 'block'
        })
      },
      keepCommentShow: function () {
        css(this.$els.order_comment, {
          display: 'block'
        })
      }
    },
    route: {
      data ({to: {query: {back}}}) {
        let orders = this.orders
        this.searchUser({page: 9999})
        back ? this.searchOrder({search: orders.search, curPage: orders.pageInfo.curPage}) : this.searchOrder({})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        orders: getOrders,
        checkAll: getCheckAll,
        region: getRegion,
        users: getUsers
      },
      actions: {
        searchOrder,
        checkOrder,
        dealOrder,
        searchUser,
        updateOrderComment
      }
    }
  }
</script>
<style>
  .order.dataTables-filter-wrap select {
    width: 120px
  }
  .order .operation-group{
    width: 150px
  }
  .operation-list{
    position: fixed;
    z-index: 10;
    display: block;
    left: -1000px;
    text-align: center;
  }
  .operation-list a{
    margin: 10px 5px;
  }
  .widget-content{
    position: relative;
  }
  .operation-comment-area{
    text-align: left;
    line-height: 40px;
    width: 350px;
  }
  .operation-comment-area button{
    float: right;
    margin:5px;
  }
  .operation-comment-area span{
    margin-left: 10px;
  }
  .operation-list textarea{
    width: 350px;
    height: 200px;
    margin: 0;
    border: 0;
    border-top: 1px solid #e2e2e2;
    outline: 0;
  }
</style>
