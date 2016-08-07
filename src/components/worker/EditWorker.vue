<template>
  <Content :breads="breads" :title="title">
    <Widget :title="title">
      <form class="form-horizontal">
        <div class="form-title">
          <h2>个人信息</h2>
        </div>
        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label" >姓名</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="姓名"  :readonly="isQuery" :value="worker.name" @change="setData('name', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">手机</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="手机" :readonly="isQuery" :value="worker.phoneNum" @change="setData('phoneNum', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">QQ</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="QQ" :readonly="isQuery" :value="worker.qq" @change="setData('qq', $event)"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label uploader-identity-wrap">
            <file-upload :name="'headImg'" :disabled="isQuery" title="头像" url="/workman/upload/headImg" @file-upload-error="uploadError" @file-upload-loading="upload" @file-upload-success="upload" ></file-upload>
          </label>
          <div class="controls">
            <div class="identity-box headImg">
              <span v-if="worker.headImg === 'loading'" class="loading"></span>
              <img :src="worker.headImg" alt="" v-else>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">收款账号</label>
          <div class="controls" v-if="isQuery">
            <label v-if="worker.receiveType === 0">
              <div class="radio">
                <span :class="{checked: worker.receiveType === 0}">
                  <input value='0' type="radio" name="receiveType" :checked="worker.receiveType === 0" @change="setData('receiveType', $event)">
                </span>
              </div>
              <input :readOnly="isQuery" type="text" class="span4" placeholder="支付宝帐号" :value="worker.alipayAccount" @change="setData('alipayAccount', $event)"/>
            </label>
            <label v-else>
              <div class="radio" >
                <span :class="{checked: worker.receiveType === 1}">
                  <input value='1' type="radio" name="receiveType" :checked="worker.receiveType === 1" @change="setData('receiveType', $event)">
                </span>
              </div>
              银行卡
              <input  :readOnly="isQuery" type="text" class="span2" placeholder="银行名称" :value="worker.bank" @change="setData('bank', $event)"/>
              <input :readOnly="isQuery" type="text" class="span3" placeholder="银行卡帐号" :value="newCardNum" @change="setData('cardNum', $event)"/>
            </label>
          </div>
          <div class="controls" v-else>
            <label>
              <div class="radio">
                <span :class="{checked: worker.receiveType === 0}">
                  <input value='0' type="radio" name="receiveType" :checked="worker.receiveType === 0" @change="setData('receiveType', $event)">
                </span>
              </div>
              <input  type="text" class="span4" placeholder="支付宝帐号" :value="worker.alipayAccount" @change="setData('alipayAccount', $event)"/>
            </label>
            <label>
              <div class="radio" >
                <span :class="{checked: worker.receiveType === 1}">
                  <input value='1' type="radio" name="receiveType" :checked="worker.receiveType === 1" @change="setData('receiveType', $event)">
                </span>
              </div>
              银行卡
              <input  :readOnly="worker.receiveType === 0" type="text" class="span2" placeholder="银行名称" :value="worker.bank" @change="setData('bank', $event)"/>
              <input :readOnly="worker.receiveType === 0" type="text" class="span3" placeholder="银行卡帐号" :value="newCardNum" @change="setData('cardNum', $event)"/>
            </label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">出生日期</label>
          <div class="controls">
            <input type="date" :value="worker.birthday"  :readonly="isQuery" @change="setData('birthday', $event)"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">所在地</label>
          <div class="controls">
            <Region :readonly="isQuery" :region="region" :province="worker.province" :city="worker.city" :area="worker.area" @select-region="selectRegion"></Region>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">详细地址</label>
          <div class="controls">
            <input type="text" :readonly="isQuery" class="span5" placeholder="详细地址" :value="worker.address" @change="setData('address', $event)"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label uploader-identity-wrap">
            <file-upload :name="'idCardFace'" :disabled="isQuery" title="身份证正面" url="/workman/upload/idCardFace"@file-upload-error="uploadError" @file-upload-loading="upload" @file-upload-success="upload" ></file-upload>
          </label>
          <div class="controls">
            <div class="identity-box">
              <span v-if="worker.idCardFace === 'loading'" class="loading"></span>
              <img :src="worker.idCardFace" alt="" v-else>
            </div>
            <div class="inner-control-group">
              <label class="control-label">
                <file-upload :name="'idCardBack'" :disabled="isQuery" title="身份证背面" url="/workman/upload/idCardBack"@file-upload-error="uploadError" @file-upload-loading="upload" @file-upload-success="upload" ></file-upload>
              </label>
              <div class="controls" style="padding-top:0">
                <div class="identity-box">
                  <span v-if="worker.idCardBack === 'loading'" class="loading"></span>
                  <img :src="worker.idCardBack" alt="" v-else>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-title">
          <h2>服务信息</h2>
        </div>
        <div class="control-group">
          <label class="control-label">服务类型</label>
          <div class="controls service-region-radio">
            <checkbox-group :readonly="isQuery" :has-all="true" :radios="serviceTypes" :name="'serviceType'" :checked="worker.serviceType | toArray" @radio-checked="setServiceType"></checkbox-group>
          </div>
        </div>
        <div class="form-title">
          <h3>服务项目</h3>
        </div>
        <div class="control-group">
          <label class="control-label">家具类</label>
          <div class="controls service-region-radio">
            <checkbox-group :readonly="isQuery" :has-other="true" :has-all="true" :radios="furnitureTypes" :name="'furnitureType'" :other-value="allCheckboxes.furnitureType.other" :checked="allCheckboxes.furnitureType.checked" @radio-checked="setFurnitureType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">灯具类</label>
          <div class="controls service-region-radio">
            <checkbox-group :readonly="isQuery" :has-other="true" :has-all="true" :radios="lightTypes" :name="'lightType'"  :other-value="allCheckboxes.lightType.other" :checked="allCheckboxes.lightType.checked" @radio-checked="setLightType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">卫浴类</label>
          <div class="controls  service-region-radio">
            <checkbox-group :has-other="true" :has-all="true" :readonly="isQuery" :radios="stoolTypes" :name="'stoolType'"  :other-value="allCheckboxes.stoolType.other" :checked="allCheckboxes.stoolType.checked" @radio-checked="setStoolType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">门窗五金</label>
          <div class="controls service-region-radio">
            <checkbox-group :has-other="true" :has-all="true" :readonly="isQuery" :radios="metalsTypes"  :name="'metalsType'"  :other-value="allCheckboxes.metalsType.other" :checked="allCheckboxes.metalsType.checked" @radio-checked="setMetalsType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">家电</label>
          <div class="controls service-region-radio">
            <checkbox-group  :has-other="true" :has-all="true":readonly="isQuery" :radios="householdTypes" :name="'householdType'" :other-value="allCheckboxes.householdType.other" :checked="allCheckboxes.householdType.checked" @radio-checked="setHouseholdType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">服务区域</label>
          <div class="controls service-region-radio" v-if="service_areas.length !== 0">
            <checkbox-group :readonly="isQuery" :radios="service_areas" :name="'serviceArea'" :checked="worker.serviceArea | toArray" @radio-checked="setServiceArea"></checkbox-group>
          </div>
          <label class="controls " v-else style="padding: 15px 0 5px;color:red">请先选择所在所在城市</label>
        </div>
        <div class="control-group">
          <label class="control-label">团队人数</label>
          <div class="controls ">
            <input type="text" class="span30":readonly="isQuery" :value="worker.teamPeopleNum" @change="setData('teamPeopleNum', $event)"/>
            人
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">货车数量</label>
          <div class="controls ">
            <input type="text" class="span30":readonly="isQuery" :value="worker.truckNum" @change="setData('truckNum', $event)"/>
            辆
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">货车吨位</label>
          <div class="controls ">
            <input type="text" class="span30":readonly="isQuery" :value="worker.tonnage" @change="setData('tonnage', $event)"/>
            吨
          </div>
        </div>

        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">推荐提货点</label>
            <div class="controls">
              <input type="text"placeholder="推荐提货点":readonly="isQuery" :value="worker.willingPickAddress" @change="setData('willingPickAddress', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">提存物流</label>
            <div class="controls">
              <input type="text" placeholder="提存物流":readonly="isQuery" :value="worker.logistics" @change="setData('logistics', $event)"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">优势</label>
          <div class="controls">
            <textarea name="" class="span5" :readonly="isQuery" @change="setData('strength', $event)">{{worker.strength}}</textarea>
          </div>
        </div>

        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">合作次数</label>
            <div class="controls">
              <input type="text"placeholder="合作次数":readonly="isQuery" :value="worker.cooperateTimes" @change="setData('cooperateTimes', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">综合评分</label>
            <div class="controls">
              <input type="text" placeholder="综合评分":readonly="isQuery" :value="worker.score" @change="setData('score', $event)"/>
            </div>
          </div>
        </div>
        <div class="form-title" v-if="mode === 'edit'">
          <h3>订单查询</h3>
        </div>
        <div class="control-group order" v-if="mode === 'edit'">
          <div class="control-box ">
            <div class="search-table-box">
              <div class="dataTables-filter-wrap order">
                <div class="dataTables-filter">
                  <label>
                    <select class="form-control" v-el:order_status>
                      <option value="" selected>全部状态</option>
                      <option :value="status" v-for="status in orderStatus" track-by="$index">{{status}}</option>
                    </select>
                    <select class="form-control" v-el:service_type>
                      <option value="" selected>全部类型</option>
                      <option value="配送安装">配送安装</option>
                      <option value="维修">维修</option>
                    </select>
                    <select class="form-control" v-el:creator_id v-if="isPersonal">
                      <option value="" selected>全部</option>
                      <option  v-for="slave in slaves" :value="slave.id">{{slave.name}}</option>
                    </select>
                    <select class="form-control" v-el:creator_id v-else>
                      <option value="" selected>全部</option>
                      <option  v-for="user in users.list" :value="user.id">{{user.name}}</option>
                    </select>
                    <input type="date" v-el:begin_time/>
                    至
                    <input type="date" v-el:end_time/>
                    <input type="text" @keydown.enter="startSearchOrder(1)" v-el:search/>
                    <button type="button" class="btn btn-info" @click="startSearchOrder(1)">搜索</button>
                    <a v-show="hasPermission" v-link="detailUrl + '/add'" class="btn btn-info">新增</a>
                  </label>
                </div>
              </div>
              <table class="table order">
                <thead>
                <tr>
                  <th>订单号</th>
                  <th>商家信息</th>
                  <th>接单价/服务价</th>
                  <th>师傅</th>
                  <th>详情</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in orders.list">
                  <td>{{order.orderNumber}}</td>
                  <td>{{order.shopInfo}}</td>
                  <td><span class="orderPrice" :class="{'change': order.orderPriceChanged}">{{order.orderPrice}}</span>/<span class="servicePrice" :class="{'change': order.servicePriceChanged}">{{order.servicePrice}}</span></td>
                  <td>{{order.orderNumber}}</td>
                  <td class="description">
                    <span>{{order.customerName}}</span><span>{{order.customerPhoneNum}}</span><span>{{order.customerAddress}}</span>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="fg-toolbar">
                <Pagination :cur-page="orders.pageInfo.curPage" :total="orders.pageInfo.total" :page-size="orders.pageInfo.pageSize" :total-page="orders.pageInfo.totalPage" @go-page="startSearchOrder"></Pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-success" @click="saveWorker" v-if="isEdit">保存</button>
          <a v-link="{path: '/admin/worker', query: {back: true}}" class="btn btn-success">返回</a>
        </div>
      </form>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import Content from 'components/Content'
  import Widget from 'components/Widget'
  import Pagination from 'components/Pagination'
  import Region from 'components/Region'
  import RadioGroup from 'components/RadioGroup'
  import CheckboxGroup from 'components/CheckboxGroup'
  import FileUpload from 'components/FileUpload'
  import {getPermission} from 'my_vuex/getters/auth'
  import {getDetailWorker, getUIOptions} from 'my_vuex/getters/worker'
  import {showWorkerDetail, saveWorker, setWorkerMode, clearWorkerDetail, setWorker} from 'my_vuex/actions/worker'
  import {toggleDialog} from 'my_vuex/actions/actions'
  import {getOrders, getOrderStatus} from 'my_vuex/getters/order'
  import {searchOrder} from 'my_vuex/actions/order'
  import {getUsers} from 'my_vuex/getters/user'
  import {searchUser} from 'my_vuex/actions/user'
  let forEach = require('lodash/forEach')
  export default {
    components: {
      Content,
      Widget,
      Pagination,
      Region,
      RadioGroup,
      FileUpload,
      CheckboxGroup
    },
    computed: {
      title: function () {
        return '师傅信息'
      },
      isEdit: function () {
        return this.mode !== 'query'
      },
      isQuery: function () {
        return this.mode === 'query'
      },
      allCheckboxes: function () {
        let vm = this
        let obj = {}
        forEach(['furnitureType', 'stoolType', 'lightType', 'metalsType', 'householdType'], (key) => {
          let other = ''
          let values = vm[key + 'Arr']
          let arr = vm.worker[key] || []
          if (arr.length === 0 || !arr) {
            arr = []
          } else {
            let newArr = arr.filter((val) => {
              let res = ~values.indexOf(val)
              !res && (other = val)
              return res
            })
            arr = newArr
          }
          obj[key] = {
            other,
            checked: arr
          }
        })
        return obj
      },
      furnitureTypeArr: () => {
        return ['办公家具', '定制家具', '民用家具']
      },
      stoolTypeArr: () => {
        return ['马桶', '花洒', '淋浴屏', '水盆类', '浴室柜', '储物架']
      },
      lightTypeArr: () => {
        return ['吸顶灯', '吊灯', '大型水晶灯', '筒灯']
      },
      metalsTypeArr: () => {
        return ['晾衣杆', '饰品', '挂件', '内门']
      },
      householdTypeArr: () => {
        return ['电视', '空调', '净水器', '热水器', '浴霸', '吊扇']
      },
      serviceTypes: function () {
        return this.createRadios(['配送安装', '维修'])
      },
      furnitureTypes: function () {
        return this.createRadios(this.furnitureTypeArr)
      },
      lightTypes: function () {
        return this.createRadios(this.lightTypeArr)
      },
      stoolTypes: function () {
        return this.createRadios(this.stoolTypeArr)
      },
      metalsTypes: function () {
        return this.createRadios(this.metalsTypeArr)
      },
      householdTypes: function () {
        return this.createRadios(this.householdTypeArr)
      },
      service_areas: function () {
        let vm = this
        let worker = vm.worker
        let areas = worker.city === '' ? [] : (worker.province && vm.region[worker.province] && vm.region[worker.province][worker.city] || [])
        return vm.createRadios(areas)
      },
      newCardNum: function () {
        let vm = this
        let val = this.worker.cardNum || ''
        val = vm.insertSpace(val, 4)
        val = vm.insertSpace(val, 9)
        val = vm.insertSpace(val, 14)
        return val
      }
    },
    methods: {
      uploadError: function (name, msg) {
        this.toggleDialog({
          content: msg,
          show: true,
          auto: true,
          hasSuccessBtn: false,
          hasCloseBtn: false
        })
      },
      createRadios: function (arr) {
        return arr.map((val, idx) => {
          return {
            name: val,
            value: arr[idx]
          }
        })
      },
      setServiceType: function (value) {
        this.setWorker({
          serviceType: value
        })
      },
      setFurnitureType: function (value) {
        this.multipleData('furnitureType', value)
      },
      setLightType: function (value) {
        this.multipleData('lightType', value)
      },
      setStoolType: function (value) {
        this.multipleData('stoolType', value)
      },
      setMetalsType: function (value) {
        this.multipleData('metalsType', value)
      },
      setHouseholdType: function (value) {
        this.multipleData('householdType', value)
      },
      multipleData: function (key, value) {
        let obj = {}
        obj[key] = value.split(',')
        this.setWorker(obj)
      },
      setServiceArea: function (value) {
        this.setWorker({
          serviceArea: value
        })
      },
      selectRegion: function (region) {
        this.setWorker({
          'province': region[0],
          'city': region[1],
          'area': region[2]
        })
      },
      upload: function (name, src) {
        let obj = {}
        obj[name] = src
        this.setWorker(obj)
      },
      setData: function (key, e) {
        let obj = {}
        let val = e.target.value
        if (key === 'receiveType') {
          val = parseInt(val, 10)
        }
        obj[key] = val
        this.setWorker(obj)
      },
      insertSpace: function (str, position) {
        if (str.length > position) {
          if (str.charAt(position) !== ' ') {
            str = str.substr(0, position) + ' ' + str.substring(position, str.length)
          }
        }
        return str
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
          endTime,
          url: '/workman/' + this.worker.id + '/order'
        }
        this.searchOrder({search, curPage: page || 1})
      }

    },
    route: {
      data (transition) {
        let {to: {params: {id}, query: {type}}} = transition
        if (id) {
          type = 'edit'
        } else {
          type = 'new'
          this.clearWorkerDetail()
        }
        if (!this.permission.workmanManager) {
          transition.redirect('/admin/forbidden')
        }
        this.clearWorkerDetail()
        this.setWorkerMode(type)
        if (type !== 'new') {
          this.searchUser({pageSize: 9999})
          this.searchOrder({search: {url: '/workman/' + id + '/order'}})
          return this.showWorkerDetail(id)
        }
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        worker: getDetailWorker,
        mode: getUIOptions,
        permission: getPermission,
        region: getRegion,
        orderStatus: getOrderStatus,
        orders: getOrders,
        users: getUsers
      },
      actions: {
        showWorkerDetail,
        saveWorker,
        setWorkerMode,
        clearWorkerDetail,
        setWorker,
        toggleDialog,
        searchOrder,
        searchUser
      }
    },
    filters: {
      toArray: function (val) {
        return val ? val.split(',') : []
      }
    }
  }
</script>
