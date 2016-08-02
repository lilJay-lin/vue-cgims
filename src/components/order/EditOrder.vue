<template>
  <Content :breads="breads" :title="title">
    <Widget :title="title">
      <form  class="form-horizontal order">
        <div class="control-group">
          <label class="control-label">订单号</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="订单号" :readOnly="isQuery" @change="setData('orderNumber', $event)" :value="order.orderNumber"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">订单状态</label>
          <div class="controls">
            <radio-group :radios="orderStatus" :name="'order.orderStatus'":readOnly="isQuery" :checked="order.orderStatus" @radio-checked="setOrderStatus"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">订单类型</label>
          <div class="controls label-inline">
            <radio-group :radios="serviceTypes" :name="'order.serviceType'" :readOnly="isQuery" :checked="order.serviceType" @radio-checked="setServiceType"></radio-group>
          </div>
        </div>
        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">客户名称</label>
            <div class="controls">
              <input type="text" class="span12" :readOnly="isQuery" placeholder="客户名称" @change="setData('customerName', $event)" :value="order.customerName"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">客户电话</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="客户电话" :readOnly="isQuery" @change="setData('customerPhoneNum', $event)":value="order.customerPhoneNum"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">备用电话</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="备用电话" :readOnly="isQuery" @change="setData('customerTel', $event)":value="order.customerTel"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">客户地址</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="客户地址" :readOnly="isQuery" @change="setData('customerAddress', $event)":value="order.customerAddress"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">产品信息</label>
          <div class="controls">
            <input type="text" :readOnly="isQuery" @change="setData('productInfo', $event)":value="order.productInfo"/>
            <file-upload title="添加图片" :disabled="isQuery"  :url="productUploadURL" @file-upload-success="productUploadSuccess" @file-upload-review="showProductInfo"></file-upload>
          </div>
          <div class="controls-pics">
            <div class="controls-pics-item" v-for="src in order.productImgs" track-by="$index">
              <img :src="src" alt="src">
              <a href="javascript:void(0)" @click="onDealOrderImage('productImgs', $index, 'del')"><i class="icon-remove"></i></a>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">物流信息</label>
          <div class="controls">
            <input type="text" :readOnly="isQuery" @change="setData('logisticsInfo', $event)":value="order.logisticsInfo"/>
            <file-upload title='添加图片' :disabled="isQuery" :url="logisticsUploadURL" @file-upload-success="logisticsUploadSuccess" @file-upload-review="showProductInfo"></file-upload>
          </div>
          <div class="controls-pics">
            <div class="controls-pics-item" v-for="src in order.logisticsImgs" track-by="$index">
              <img :src="src" alt="src">
              <a v-if="isEdit" href="javascript:void(0)" @click="onDealOrderImage('logisticsImgs', $index, 'del')"><i class="icon-remove"></i></a>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">物流信息</label>
          <div class="controls">
            <input type="text" :readOnly="isQuery" @change="setData('repairInfo', $event)":value="order.repairInfo"/>
            <file-upload title="添加图片" :disabled="isQuery" :url="repairUploadURL" @file-upload-success="repairUploadSuccess" @file-upload-review="showProductInfo"></file-upload>
          </div>
          <div class="controls-pics">
            <div class="controls-pics-item" v-for="src in order.repairImgs" track-by="$index">
              <img :src="src" alt="src">
              <a v-if="isEdit" href="javascript:void(0)" @click="onDealOrderImage('repairImgs', $index, 'del')"><i class="icon-remove"></i></a>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">核销</label>
          <div class="controls label-inline">
            <label>
              <div class="radio" >
                <span :class="{checked: order.isChecked === 1}">
                  <input type="radio" :disabled="isQuery" value=1 name="isChecked" @change="setData('isChecked', $event)"/>
                </span>
              </div>
              是
              <input type="text" :readOnly="isQuery" :value="order.checkInfo" v-show="order.isChecked === 1" @change="setData('checkInfo', $event)"/>
            </label>
            <label>
              <div class="radio" >
                <span :class="{checked: order.isChecked === 0}">
                  <input type="radio" name="isChecked" :disabled="isQuery" value=0 @change="setData('isChecked', $event)"/>
                </span>
              </div>
              否
            </label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">商家信息</label>
          <div class="controls">
            <input type="text" :readOnly="isQuery" class="span5" placeholder="旺旺号" @change="setData('shopInfo', $event)" :value="order.shopInfo"/>
          </div>
        </div>
        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">接单价</label>
            <div class="controls">
              <input type="text":readOnly="isQuery" class="span12" placeholder="接单价" @change="setData('orderPrice', $event)" :value="order.orderPrice"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">服务价</label>
            <div class="controls">
              <input type="text" :readOnly="isQuery" class="span12" placeholder="服务价" @change="setData('servicePrice', $event)" :value="order.servicePrice"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">利润</label>
            <div class="controls">
              <input type="text" :readOnly="isQuery" class="span12" placeholder="利润" @change="setData('profit', $event)" :value="order.profit"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">价格变动原因</label>
          <div class="controls">
            <input type="text" :readOnly="isQuery" class="span5" placeholder="价格变动原因" @change="setData('priceChangeReason', $event)" :value="order.priceChangeReason"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">订单评分</label>
          <div class="controls">
            <input type="text":readOnly="isQuery" class="span5" placeholder="订单评分" @change="setData('judgment', $event)" :value="order.judgment"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">评价备注</label>
          <div class="controls">
            <input type="text" :readOnly="isQuery" class="span5" placeholder="评价备注" @change="setData('judge_reason', $event)" :value="order.judge_reason"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">备注</label>
          <div class="controls">
            <textarea class="span10" :readOnly="isQuery" @change="setData('description', $event)">{{order.description}}</textarea>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">创建人</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="创建人"  :value="order.creatorId" readonly="true" />
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">创建时间</label>
          <div class="controls">
            <input type="date" :value="order.cetate_date" readonly="true"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">完成时间</label>
          <div class="controls">
            <input type="date" :value="order.complete_date" readonly="true"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">对接师傅</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="对接师傅" readonly="true" :value="order.workman.name"/>
          </div>
        </div>
        <div class="form-title" v-if="isEdit">
          <h3>选择对接师傅</h3>
        </div>
        <div class="control-group" v-if="isEdit">
          <div class="control-box ">
            <div class="search-table-box">
              <div class="dataTables-filter-wrap worker">
                <div class="dataTables-filter">
                  <label>
                    <Region @select-region="selectRegion" :region="region"></Region>
                    <input type="hidden" v-el:search_region/>
                    <select class="form-control" v-el:search_service>
                      <option value="配送安装,维修" selected>全部</option>
                      <option value="配送安装">配送安装</option>
                      <option value="维修">维修</option>
                    </select>
                    <input type="text" placeholder="师傅名、电话" @keydown.enter="startSearchWorker(1)" v-el:search/>
                    <button type="button" class="btn btn-info"  @click="startSearchWorker(1)">搜索</button>
                    <a v-link="'/admin/worker/add?type=new'" class="btn btn-success">新增</a>
                  </label>
                </div>
              </div>
              <table class="table order">
                <thead>
                <tr>
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
                  <td>{{worker.workmanNumber}}</td>
                  <td>{{worker.name}}</td>
                  <td>{{worker.phoneNum}}</td>
                  <td>{{worker.qq}}</td>
                  <td>{{worker.serviceArea}}</td>
                  <td>{{worker.score}}</td>
                  <td>{{worker.cooperateTimes}}</td>
                  <td>{{worker.description}}</td>
                  <td >
                    <div class="operation-group">
                      <a  href="javascript:void(0)" title="选中" class="{worker.id === order.workman.id}" @click="setWorkman(worker.id, worker.name)"><i class="icon-check"></i></a>
                    </div>
                  </td>
                </tr>
                </tbody>

              </table>
              <div class="fg-toolbar">
                <Pagination :cur-page="workers.pageInfo.curPage" :total="workers.pageInfo.total" :page-size="workers.pageInfo.pageSize" :total-page="workers.pageInfo.totalPage" @go-page="startSearchWorker"></Pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button v-show="permission.orderManager" type="button" class="btn btn-success" @click="saveOrder()" v-if="isEdit">保存</button>
          <button v-show="permission.orderManager" type="button" class="btn btn-success" @click="setOrderMode('edit')" v-if="isQuery">编辑</button>
          <a v-link="'/admin/order'" class="btn btn-success">返回</a>
        </div>
      </form>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import RadioGroup from 'components/RadioGroup'
  import Pagination from 'components/Pagination'
  import Region from 'components/Region'
  import FileUpload from 'components/FileUpload'
  import {getPermission} from 'my_vuex/getters/auth'
  import {getDetailOrder, getUIOptions, getOrderStatus} from 'my_vuex/getters/order'
  import {showOrderDetail, saveOrder, setOrderMode, clearOrderDetail, setOrder, dealOrderImage} from 'my_vuex/actions/order'
  import {getWorkers} from 'my_vuex/getters/worker'
  import {searchWorker} from 'my_vuex/actions/worker'
  export default {
    components: {
      Content,
      Widget,
      Pagination,
      Region,
      RadioGroup,
      FileUpload
    },
    detached () {
      this.clearOrderDetail()
    },
    computed: {
      title: function () {
        return '角色信息'
      },
      productUploadURL: function () {
        return '/order/upload/product '
      },
      logisticsUploadURL: function () {
        return '/order/ upload/logistics '
      },
      repairUploadURL: function () {
        return '/order/upload/repair '
      },
      isEdit: function () {
        return this.mode !== 'query'
      },
      isQuery: function () {
        return this.mode === 'query'
      },
      orderStatus: function () {
        return this.status.map((val, idx) => {
          return {
            name: val,
            value: this.status[idx]
          }
        })
      },
      serviceTypes: function () {
        return ['配送运输', '维修'].map((val, idx) => {
          return {
            name: val,
            value: this.status[idx]
          }
        })
      }
    },
    methods: {
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
      },
      setOrderStatus: function (value) {
        this.setOrder({
          orderStatus: value
        })
      },
      setWorkman: function (id, name) {
        this.setOrder({
          workman: {
            id,
            name
          },
          workmanId: id
        })
      },
      setServiceType: function (value) {
        this.setOrder({
          serviceType: value
        })
      },
      setData: function (key, e) {
        let obj = {}
        let val = e.target.value
        if (key === 'isChecked') {
          val = parseInt(val, 10)
        }
        obj[key] = val
        this.setOrder(obj)
      },
      showProductInfo: function (files) {
        console.log(files)
      },
      productUploadSuccess: function (src) {
        this.onDealOrderImage('productImgs', src, 'add')
      },
      logisticsUploadSuccess: function (src) {
        this.onDealOrderImage('logisticsImgs', src, 'add')
      },
      repairUploadSuccess: function (src) {
        this.onDealOrderImage('repairImgs', src, 'add')
      },
      onDealOrderImage: function (key, src, type) {
        this.dealOrderImage({
          key,
          src,
          type
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
        if ((type === 'edit' || type === 'new') && !this.permission.orderManager) {
          transition.redirect('/admin/forbidden')
        }
        this.setOrderMode(type)
        this.searchWorker({})
        if (type !== 'new') {
          return this.showOrderDetail(id)
        }
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        order: getDetailOrder,
        workers: getWorkers,
        mode: getUIOptions,
        region: getRegion,
        status: getOrderStatus,
        permission: getPermission
      },
      actions: {
        showOrderDetail,
        searchWorker,
        saveOrder,
        setOrderMode,
        clearOrderDetail,
        setOrder,
        dealOrderImage
      }
    }
  }
</script>
<style>
  .order .control-box {
    margin: 20px;
    margin-left: 60px;
  }
  .order .uploader-identity{
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
  }
</style>
