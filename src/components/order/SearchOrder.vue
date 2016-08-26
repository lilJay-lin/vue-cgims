<template>
  <Content :breads="breads" :title="title">
    <Widget :padding="false" :title="'订单列表'">
      <div class="dataTables-filter-wrap order">
        <div class="dataTables-filter">
          <label v-if="isPersonal">
            <select class="form-control" v-el:order_status @change="setOrderStatus">
              <option :value="isPersonal ? allPersonalStatus : ''" selected>全部状态</option>
              <option :value="status" v-for="status in orderStatus | filterStatus 'select'" track-by="$index">{{status}}</option>
            </select>
            <select class="form-control" v-el:service_type>
              <option value="" selected>全部类型</option>
              <option value="配送安装">配送安装</option>
              <option value="维修">维修</option>
            </select>
            <select class="form-control" v-el:creator_id v-if="isPersonal">
              <option  v-for="slave in slaves" :value="slave.id" :selected="slave.id === orders.search.creatorId">{{slave.name}}</option>
            </select>
            <select class="form-control" v-el:creator_id v-else>
              <option value="" selected>全部</option>
              <option  v-for="user in users.list" :value="user.id">{{user.name}}</option>
            </select>
            <input type="text" v-el:begin_time placeholder="开始时间" style="width:80px" onClick="WdatePicker()"  readonly="true"/>
            至
            <input type="text" v-el:end_time placeholder="截止时间"  style="width:80px" onClick="WdatePicker()"  readonly="true"/>
            <input type="text" @keydown.enter="startSearchOrder(1)" v-el:search/>
            <button type="button" class="btn btn-info" @click="startSearchOrder(1)">搜索</button>
            <a v-show="hasPermission" v-link="detailUrl + '/add'" class="btn btn-info">新增</a>
          </label>
          <label v-else>
            <select class="form-control" v-el:order_status @change="setOrderStatus">
              <option :value="isPersonal ? allPersonalStatus : ''" selected>全部状态</option>
              <option :value="status" v-for="status in orderStatus | filterStatus 'select'" track-by="$index">{{status}}</option>
            </select>
            <select class="form-control" v-el:service_type>
              <option value="" selected>全部类型</option>
              <option value="配送安装">配送安装</option>
              <option value="维修">维修</option>
            </select>
            <select class="form-control" v-el:creator_id v-if="isPersonal">
              <option  v-for="slave in slaves" :value="slave.id" :selected="slave.id === orders.search.creatorId">{{slave.name}}</option>
            </select>
            <select class="form-control" v-el:creator_id v-else>
              <option value="" selected>全部</option>
              <option  v-for="user in users.list" :value="user.id">{{user.name}}</option>
            </select>
            <input type="text" v-el:begin_time placeholder="开始时间" style="width:80px" onClick="WdatePicker()"  readonly="true"/>
            至
            <input type="text" v-el:end_time placeholder="截止时间"  style="width:80px" onClick="WdatePicker()"  readonly="true"/>
            <input type="text" @keydown.enter="startSearchOrder(1)" v-el:search/>
            <button type="button" class="btn btn-info" @click="startSearchOrder(1)">搜索</button>
            <a v-show="hasPermission" v-link="detailUrl + '/add'" class="btn btn-info">新增</a>
          </label>
        </div>
      </div>
      <div class="operation-list"  v-el:order_operation @mouseover="keepOperaShow" @mouseout="hideOrderOpera">
        <a href="javascript:void(0)" track-by="$index" v-for="status in orderStatus | filterStatus 'change' "  :title="'status'" @click="onDealOrder(status)"><i class="icon-link"></i>{{status}}</a>
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
          <th>接单价<i class="priceSplit" style="vertical-align:middle"></i>服务价</th>
          <th>师傅</th>
          <th>详情</th>
          <th v-show="hasPermission" class="operation-group">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders.list">
          <td>
            <div class="checker" >
              <span :class="{checked: order.isChecked}"><input type="checkbox" :checked="order.isChecked" @change="toggleCheck($event, order.id)"></span>
            </div>
          </td>
          <td><a v-link="detailUrl + '/' + order.id + '?creatorId=' + order.user.id">{{order.orderNumber}}</a></td>
          <td>
            <div>
              <p>{{order.shopInfo}}</p>
              <p>{{order.qq}}</p>
            </div>
          </td>
          <td><span class="orderPrice" :class="{'change': order.orderPriceChanged}">{{order.orderPrice}}</span><i class="priceSplit"></i><span class="servicePrice" :class="{'change': order.servicePriceChanged}">{{order.servicePrice}}</span></td>
          <td style="width:20%;font-size: 14px;">
            <div v-if="isPersonal">
              <p>{{order.workman.name}}</p>
              <p>{{order.workman.phoneNum}}</p>
            </div>
            <div v-else>
              <div v-if="order.workman.receiveType === 1">
                <p><span>{{order.workman.bankCardName}}</span><span>{{order.workman.bank}}</span></p>
                <p>{{order.workman.cardNum}}</p>
              </div>
              <div v-else>
                <p>{{order.workman.alipayAccountName}}</p>
                <p>{{order.workman.alipayAccount}}</p>
              </div>
            </div>
          </td>
          <td class="description">
            <div>
              <span>{{order.customerName}}</span>
              <span>{{order.customerPhoneNum}}</span>
              <span>{{order.customerTel}}</span>
              <span>{{order.customerAddress}}</span>
              <span v-if="order.serviceType === '配送安装'">{{order.productInfo}}</span>
              <span v-if="order.serviceType === '配送安装'">{{order.logisticsInfo}}</span>
              <span v-if="order.serviceType === '维修'">{{order.repairInfo}}</span>
              <span v-if="order.checked">{{order.checkInfo}}</span>
            </div>
          </td>
          <td v-if="hasPermission" class="operation-group-td">
            <div class="operation-group" v-if="isPersonal">
              <a href="javascript:void(0)" @mouseout="hideOrderOpera" @mouseover="showOrderOpera($event, order.id, order.orderStatus)" v-if="order.orderStatus === '未收未付' || order.orderStatus === '已收未付'"><i class="icon-th-list"></i>操作</a>
              <a href="javascript:void(0)" style="opacity: 0" v-else><i class="icon-th-list"></i>操作</a>
              <a href="javascript:void(0)" @mouseout="hideOrderComment" @mouseover="showOrderComment($event, order.id, order.description)"><i class="icon-flag" :class="{'red': order.description}"></i>备注</a>
            </div>
            <div class="operation-group" v-else>
              <a href="javascript:void(0)" @mouseout="hideOrderOpera" @mouseover="showOrderOpera($event, order.id, order.orderStatus)"><i class="icon-th-list"></i>操作</a>
              <a href="javascript:void(0)" @mouseout="hideOrderComment" @mouseover="showOrderComment($event, order.id, order.description)"><i class="icon-flag" :class="{'red': order.description}"></i>备注</a>
            </div>
          </td>
        </tr>
        </tbody>

      </table>
      <div class="fg-toolbar">
        <div v-if="hasPermission">
          <div class="fg-toolbar-operation" v-if="isPersonal">
            <select class="form-control" v-el:action v-if="searchStatus === '未收未付' || searchStatus === '已收未付'">
              <option value="删除" selected>删除</option>
              <option :value="status" v-for="status in orderStatus | filterStatus 'batch'" track-by="$index">{{status}}</option>
            </select>
            <button style="margin-left:2px" type="button" class="btn btn-success" @click="onDealBatch()" v-if="searchStatus === '未收未付' || searchStatus === '已收未付'">批量操作</button>
          </div>
          <div class="fg-toolbar-operation" v-else>
            <select class="form-control" v-el:action>
              <option value="删除" selected>删除</option>
              <option :value="status" v-for="status in orderStatus | filterStatus 'batch'" track-by="$index">{{status}}</option>
            </select>
            <button type="button" class="btn btn-success" @click="onDealBatch()">批量操作</button>
          </div>
        </div>
        <Pagination :cur-page="orders.pageInfo.curPage" :total="orders.pageInfo.total" :page-size="orders.pageInfo.pageSize" :total-page="orders.pageInfo.totalPage" @go-page="startSearchOrder"></Pagination>
      </div>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {toggleDialog} from 'my_vuex/actions/actions'
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import {getOrders, getCheckAll, getOrderStatus, isPersonal, hasCheck, getSlaves} from 'my_vuex/getters/order'
  import {searchOrder, checkOrder, dealOrder, updateOrderComment, setOrderPersonal, setOrders} from 'my_vuex/actions/order'
  import {getPermission, getAuth} from 'my_vuex/getters/auth'
  import {getUsers} from 'my_vuex/getters/user'
  import {searchUser} from 'my_vuex/actions/user'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import Region from 'components/Region'
  import {css} from 'src/util/dom'
  export default {
    props: {
      searchStatus: {
        type: String,
        default: ''
      },
      checkStatus: {
        type: String,
        default: ''
      },
      noSlave: {
        type: Boolean,
        default: false
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
        return this.isPersonal ? '个人订单管理' : '订单管理'
      },
      hasPermission: function () {
        return this.isPersonal ? this.permission.userOrderManager : this.permission.orderManager
      },
      detailUrl: function () {
        return this.isPersonal ? '/admin/user/order' : '/admin/order'
      },
      allPersonalStatus: function () {
        let arr = this.orderStatus
        return [].concat(arr.slice(0, 2), arr.slice(4, 6), [arr[9]]).join(',')
      }
    },
    ready: function () {
      this.setInitHeight()
    },
    methods: {
      toggleCheck: function (e, id) {
        let el = e.target
        this.checkOrder(el.checked, id)
      },
      startSearchOrder: function (page) {
        if (this.noSlave && this.isPersonal) {
          this.setOrders({
            list: [],
            pageInfo: {
              curPage: 1,
              pageSize: 10,
              totalPage: 0,
              total: 0
            }
          })
          this.showHint('无关联用户')
          return
        }
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
        let vm = this
        let el = vm.$els.order_comment
        let id = el.getAttribute('curren')
        let val = vm.$els.operation_comment.value.trim()
        vm.updateOrderComment({id, description: val, creatorId: vm.$els.creator_id.value})
      },
      onDealOrder: function (orderStatus) {
        let el = this.$els.order_operation
        let id = el.getAttribute('curren')
        id && this.onDealBatch(id, orderStatus)
      },
      onDealBatch: function (id, orderStatus) {
        let val = ''
        let action = ''
        let vm = this
        let state = '更新'
        /*
        *  非批量操作
        * */
        if (id) {
          val = orderStatus
          action = 'update'
        } else {
          val = vm.$els.action.value
          action = val === '删除' ? 'delete' : 'update'
          if (action === 'delete') {
            state = '删除'
          }
          if (!vm.hasCheck) {
            vm.toggleDialog({
              content: '请选择要' + state + '的订单',
              show: true,
              auto: true,
              hasSuccessBtn: false,
              hasCloseBtn: false
            })
            return
          }
        }
        vm.toggleDialog({
          content: '是否' + state + '的订单',
          show: true,
          hasSuccessBtn: true,
          hasCloseBtn: true,
          auto: false,
          success: () => {
            vm.dealOrder({id: id, action, orderStatus: val, creatorId: vm.$els.creator_id.value})
          }
        })
      },
      showOrderOpera: function (e, id, status) {
        let el = this.$els.order_operation
        el.setAttribute('curren', id)
        el.setAttribute('height', el.childNodes.length * 30)
        this.checkStatus = status
        this.show(e, el)
      },
      show: function (e, el) {
        let elHeight = parseInt(el.getAttribute('height'), 10)
        let elWidth = parseInt(el.getAttribute('width'), 10)
        let top = e.clientY
        let left = e.clientX
        let height = window.innerHeight
        let width = window.innerWidth
        let mL = top + elHeight - height
        top = mL > 0 ? top - mL - 45 : top
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
      },
      setOrderStatus: function (e) {
        this.searchStatus = e.target.value
      },
      filter: function (arr, val) {
        let newArr = arr.slice(0)
        let idx = newArr.indexOf(val)
        ~idx && newArr.splice(idx, 1)
        return newArr
      },
      showHint: function (msg) {
        this.toggleDialog({
          content: msg,
          show: true,
          auto: true
        })
      },
      setInitHeight: function () {
        let elOpera = this.$els.order_operation
        let elComment = this.$els.order_comment
        elOpera.setAttribute('height', elOpera.offsetHeight)
        elOpera.setAttribute('width', elOpera.offsetWidth)
        elComment.setAttribute('height', elComment.offsetHeight)
        elComment.setAttribute('width', elComment.offsetWidth)
      }
    },
    route: {
      data (transition) {
        let {to: {path, query: {back}}} = transition
        let vm = this
        let orders = vm.orders
        let isPersonal = vm.isPersonal
        let permission = vm.permission
        let hasPermission = permission.orderManager || permission.orderView
        if (~path.indexOf('/admin/user/order')) {
          isPersonal = true
          hasPermission = permission.userOrderManager
        } else {
          isPersonal = false
          vm.searchUser({pageSize: 9999})
        }
        if (!hasPermission) {
          transition.redirect('/admin/forbidden')
        }
        let search = back ? (orders.search || {}) : {}
        if (vm.isPersonal !== isPersonal) {
          search = {}
        }
        vm.setOrderPersonal(isPersonal)
        if (isPersonal) {
          vm.searchStatus = search.orderStatus = search.orderStatus || vm.allPersonalStatus
          if (vm.slaves.length > 0 && !search.creatorId) {
            let idx = vm.slaves.some((obj) => {
              return obj.id === vm.auth.id
            })
            search.creatorId = idx ? vm.auth.id : vm.slaves[0].id
          } else if (vm.slaves.length === 0) {
            vm.noSlave = true
            vm.showHint('无关联用户')
            vm.setOrders({list: [],
              pageInfo: {
                curPage: 1,
                pageSize: 10,
                totalPage: 0,
                total: 0
              }})
            transition.next()
            return
          }
        }
        vm.search = search
        back ? vm.searchOrder({search: search, curPage: orders.pageInfo.curPage}) : vm.searchOrder({search: search})
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        orders: getOrders,
        checkAll: getCheckAll,
        region: getRegion,
        users: getUsers,
        slaves: getSlaves,
        orderStatus: getOrderStatus,
        permission: getPermission,
        isPersonal: isPersonal,
        hasCheck: hasCheck,
        auth: getAuth
      },
      actions: {
        searchOrder,
        checkOrder,
        dealOrder,
        searchUser,
        updateOrderComment,
        setOrderPersonal,
        toggleDialog,
        setOrders
      }
    },
    filters: {
      filterStatus: function (arr, type) {
        let vm = this
        let res = []
        let checkStatus = vm.checkStatus
        let searchStatus = vm.searchStatus
        let select = 'select'
        let batch = 'batch'
        if (vm.isPersonal) {
          let arr1 = arr.slice(1, 4)
          arr1 = arr1.concat(arr.slice(6, 8))
          res = type === select ? [].concat(arr.slice(0, 2), arr.slice(4, 6), [arr[9]]) : (type === batch ? (searchStatus === vm.allPersonalStatus || searchStatus === '未收未付' ? arr1 : [arr[3], arr[7]]) : checkStatus === arr[0] ? arr1 : [arr[3], arr[7]])
        } else {
          res = type === select ? arr : (type === batch ? (searchStatus === '' ? arr : vm.filter(arr, searchStatus)) : vm.filter(arr, checkStatus))
        }
        return res
      }
    }
  }
</script>
<style>
  .order.dataTables-filter-wrap select {
    width: 120px
  }
  .priceSplit{
    width: 1px;
    display: inline-block;
    height: 16px;
    margin: 0 5px 0 8px;
    overflow: hidden;
    box-shadow: -1px 0px 2px #888888;
  }
  .orderPrice, .servicePrice{
    color: #666;
    width: 40px;
    display: inline-block;
  }
  .servicePrice {
    font-size: 16px;
  }
  .orderPrice.change, .servicePrice.change{
    color: red
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
    padding: 5px;
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
  .order .icon-flag{
    color: gray;
  }
  .order .icon-flag.red{
    color: red;
  }
</style>
