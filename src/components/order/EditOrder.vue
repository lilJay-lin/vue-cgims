<template>
  <Content :breads="breads" :title="title">
    <Widget :title="title">
      <form  class="form-horizontal order">
        <div class="control-group">
          <label class="control-label">订单号</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="订单号" @change="setData('order_number', $event)" :value="order.order_number"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">订单状态</label>
          <div class="controls">
            <radio-group :radios="orderStatus" :name="'order.order_status'" :checked="order.order_status" @radio-checked="setOrderStatus"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">订单类型</label>
          <div class="controls label-inline">
            <radio-group :radios="serviceTypes" :name="'order.service_type'" :checked="order.service_type" @radio-checked="setServiceType"></radio-group>
          </div>
        </div>
        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">客户名称</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="客户名称" @change="setData('customer_name', $event)" :value="order.customer_name"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">客户电话</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="客户电话" @change="setData('customer_phone_num', $event)":value="order.customer_phone_num"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">备用电话</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="备用电话" @change="setData('customer_tel', $event)":value="order.customer_tel"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">客户地址</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="客户地址"@change="setData('customer_address', $event)":value="order.customer_address"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">产品信息</label>
          <div class="controls">
            <input type="text" @change="setData('product_info', $event)":value="order.product_info"/>
            <file-upload title="添加图片" :url="productUploadURL" @file-upload-success="uploadProductSuccess" @file-upload-review="showProductInfo"></file-upload>
          </div>
          <div class="controls-pics">
            <div class="controls-pics-item" v-for="src in product_imgs">
              <img :src="src" alt="src">
              <a href="javascript:void(0)" @click="onDealOrderImage('product_imgs', $index, 'del')"><i class="icon-remove"></i></a>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">物流信息</label>
          <div class="controls">
            <input type="text" @change="setData('logistics_info', $event)":value="order.logistics_info"/>
            <file-upload title='添加图片' :url="logisticsUploadURL" @file-upload-success="uploadLogisticsSuccess" @file-upload-review="showProductInfo"></file-upload>
          </div>
          <div class="controls-pics">
            <div class="controls-pics-item" v-for="src in logistics_imgs">
              <img :src="src" alt="src">
              <a  href="javascript:void(0)" @click="onDealOrderImage('logistics_imgs', $index, 'del')"><i class="icon-remove"></i></a>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">物流信息</label>
          <div class="controls">
            <input type="text" @change="setData('repair_info', $event)":value="order.repair_info"/>
            <file-upload title="添加图片" :url="repairUploadURL" @file-upload-success="uploadRepairSuccess" @file-upload-review="showProductInfo"></file-upload>
          </div>
          <div class="controls-pics">
            <div class="controls-pics-item" v-for="src in repair_imgs">
              <img :src="src" alt="src">
              <a  href="javascript:void(0)" @click="onDealOrderImage('repair_imgs', $index, 'del')"><i class="icon-remove"></i></a>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">核销</label>
          <div class="controls label-inline">
            <label>
              <div class="radio" >
                <span :class="{checked: order.is_checked === 1}">
                  <input type="radio" value=1 name="is_checked" @change="setData('is_checked', $event)"/>
                </span>
              </div>
              是
              <input type="text" :value="order.check_info" v-show="order.is_checked === 0" @change="setData('check_info', $event)"/>
            </label>
            <label>
              <div class="radio" >
                <span :class="{checked: order.is_checked === 0}">
                  <input type="radio" name="is_checked" value=0 @change="setData('is_checked', $event)"/>
                </span>
              </div>
              否
            </label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">商家信息</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="旺旺号" @change="setData('shop_info', $event)" :value="order.shop_info"/>
          </div>
        </div>
        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">接单价</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="接单价" @change="setData('order_price', $event)" :value="order.order_price"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">服务价</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="服务价" @change="setData('service_price', $event)" :value="order.service_price"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">利润</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="利润" @change="setData('profit', $event)" :value="order.profit"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">价格变动原因</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="价格变动原因" @change="setData('price_change_reason', $event)" :value="order.price_change_reason"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">订单评分</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="订单评分" @change="setData('judgment', $event)" :value="order.judgment"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">评价备注</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="评价备注" @change="setData('judge_reason', $event)" :value="order.judge_reason"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">备注</label>
          <div class="controls">
            <textarea class="span10" @change="setData('description', $event)">{{order.description}}</textarea>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">创建人</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="创建人"  :value="order.creator_id" readonly="true" />
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
        <div class="form-title">
          <h3>选择对接师傅</h3>
        </div>
        <div class="control-group">
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
          <button type="button" class="btn btn-success" @click="saveOrder()">保存</button>
          <button type="button" class="btn btn-success">返回</button>
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
          order_status: value
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
          service_type: value
        })
      },
      setData: function (key, e) {
        let obj = {}
        let val = e.target.value
        if (key === 'check_info') {
          val = parseInt(val, 10)
        }
        obj[key] = val
        this.setOrder(obj)
      },
      showProductInfo: function (files) {
        console.log(files)
      },
      uploadProductSuccess: function (src) {
        this.onDealOrderImage('product_imgs', src, 'add')
      },
      uploadLogisticsSuccess: function (src) {
        this.onDealOrderImage('logistics_imgs', src, 'add')
      },
      uploadRepairSuccess: function (src) {
        this.onDealOrderImage('repair_imgs', src, 'add')
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
      data ({to: {path, params: {id}, query: {type}}}) {
        if (!id) {
          type = 'new'
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
        status: getOrderStatus
      },
      actions: {
        showOrderDetail,
        searchWorker,
        saveOrder,
        setOrderMode,
        clearOrderDetail,
        setOrder
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
