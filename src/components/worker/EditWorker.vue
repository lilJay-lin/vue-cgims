<template>
  <Content :breads="breads" :title="title">
    <Widget :title="'师傅信息'">
      <form class="form-horizontal">
        <div class="form-title">
          <h2>个人信息</h2>
        </div>
        <div class="control-group" v-if="!isNew">
          <label class="control-label" >工号</label>
          <div class="controls">
            <input type="text" style="width: 185px" placeholder="工号"  readonly="true" :value="worker.workmanNumber"/>
          </div>
        </div>
        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label" >姓名</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="请输入真实姓名"  :readonly="isQuery" :value="worker.name" @change="setData('name', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">手机</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="请输入11位手机号码" :readonly="isQuery" :value="worker.phoneNum" @change="setData('phoneNum', $event)"/>
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
            <a class="identity-box headImg" :href="worker.headImg | orgPicture" target="_blank">
              <span v-if="worker.headImg === 'loading'" class="loading"></span>
              <img :src="worker.headImg === 'error' ? '/assets/img/upload_error.png' : worker.headImg" alt=""  v-else>
            </a>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">收款账号</label>
          <div class="controls">
            <label>
              <div class="radio">
                <span :class="{checked: worker.receiveType === 0}">
                  <input value='0':readonly="isQuery" type="radio" name="receiveType" :checked="worker.receiveType === 0" @change="setData('receiveType', $event)">
                </span>
              </div>
              <input  type="text" :readonly="worker.receiveType === 1 || isQuery" style="width: 426px;" placeholder="支付宝帐号" :value="worker.alipayAccount" @change="setData('alipayAccount', $event)"/>
              <input type="text"  :readonly="worker.receiveType === 1 || isQuery" style=" width: 125px;" placeholder="姓名" :value="worker.alipayAccountName" @change="setData('alipayAccountName', $event)"/>
            </label>
            <label>
              <div class="radio" >
                <span :class="{checked: worker.receiveType === 1}">
                  <input value='1' :readonly="isQuery" type="radio" name="receiveType" :checked="worker.receiveType === 1" @change="setData('receiveType', $event)">
                </span>
              </div>
              银行卡
<!--
              <input  :readOnly="worker.receiveType === 0 || isQuery" style=" width: 135px;" type="text" placeholder="银行名称" :value="worker.bank" @change="setData('bank', $event)"/>
-->
              <select style="height:30px" :disabled="worker.receiveType === 0 || isQuery" @change="setData('bank', $event)" placeholder="银行名称">
                <option value="" selected="worker.bank === ''"></option>
                <option value="中国银行" selected="worker.bank === '中国银行'">中国银行</option>
                <option value="农业银行" selected="worker.bank === '农业银行'">农业银行</option>
                <option value="建设银行" selected="worker.bank === '建设银行'">建设银行</option>
                <option value="工商银行" selected="worker.bank === '工商银行'">工商银行</option>
                <option value="邮政储蓄" selected="worker.bank === '邮政储蓄'">邮政储蓄</option>
              </select>
              <input :readOnly="worker.receiveType === 0 || isQuery" style="  width: 235px;" type="text" placeholder="账号" :value="newCardNum"  @change="setData('cardNum', $event)"/>
              <input  :readOnly="worker.receiveType === 0 || isQuery" style=" width: 125px;" type="text" placeholder="姓名" :value="worker.bankCardName" @change="setData('bankCardName', $event)"/>
            </label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">出生日期</label>
          <div class="controls">
            <input type="text" :value="worker.birthday" style=" width: 185px;" :readonly="true" @change="setData('birthday', $event)" onClick="WdatePicker()" v-el:birthday/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">所在地</label>
          <div class="controls">
            <Region :sort-provinces="sortProvinces" :readonly="isQuery" :region="region" :province="worker.province" :city="worker.city" :area="worker.area" @select-region="selectRegion"></Region>
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
            <a class="identity-box" :href="worker.idCardFace | orgPicture" target="_blank">
              <span v-if="worker.idCardFace === 'loading'" class="loading"></span>
              <img :src="worker.idCardFace === 'error' ? '/assets/img/upload_error.png' : worker.idCardFace" alt=""  v-else>
            </a>
            <div class="inner-control-group">
              <label class="control-label">
                <file-upload :name="'idCardBack'" :disabled="isQuery" title="身份证背面" url="/workman/upload/idCardBack"@file-upload-error="uploadError" @file-upload-loading="upload" @file-upload-success="upload" ></file-upload>
              </label>
              <div class="controls" style="padding-top:0">
                <a class="identity-box"  :href="worker.idCardBack | orgPicture" target="_blank">
                  <span v-if="worker.idCardBack === 'loading'" class="loading"></span>
                  <img :src="worker.idCardBack === 'error' ? '/assets/img/upload_error.png' : worker.idCardBack" alt=""  v-else>
                </a>
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
        <div class="control-group">
          <label class="control-label">服务区域</label>
          <div class="controls service-region-radio" v-if="service_areas.length !== 0">
            <checkbox-group :readonly="isQuery" :radios="service_areas" :has-all="true"  :name="'serviceArea'" :checked="worker.serviceArea | toArray" @radio-checked="setServiceArea"></checkbox-group>
          </div>
          <label class="controls " v-else style="padding: 15px 0 5px;color:red">请先选择所在所在城市</label>
        </div>
        <div class="form-title">
          <h3>服务项目</h3>
        </div>
        <div class="control-group">
          <label class="control-label">家具类</label>
          <div class="controls service-region-radio">
            <checkbox-group :readonly="isQuery" :has-other="true" :other-placeholder = "'多个项目可用分号隔开'" :has-all="true" :radios="furnitureTypes" :name="'furnitureType'" :other.sync = "allCheckboxesOther.furnitureType.otherCheck":other-value="allCheckboxes.furnitureType.other" :checked="allCheckboxes.furnitureType.checked" @radio-checked="setFurnitureType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">灯具类</label>
          <div class="controls service-region-radio">
            <checkbox-group :readonly="isQuery" :has-other="true" :has-all="true" :other-placeholder = "'多个项目可用分号隔开'" :radios="lightTypes":name="'lightType'"  :other-value="allCheckboxes.lightType.other" :other.sync = "allCheckboxesOther.lightType.otherCheck":checked="allCheckboxes.lightType.checked" @radio-checked="setLightType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">卫浴类</label>
          <div class="controls  service-region-radio">
            <checkbox-group :has-other="true" :has-all="true" :readonly="isQuery" :other-placeholder = "'多个项目可用分号隔开'":radios="stoolTypes":name="'stoolType'"  :other-value="allCheckboxes.stoolType.other" :other.sync = "allCheckboxesOther.stoolType.otherCheck":checked="allCheckboxes.stoolType.checked" @radio-checked="setStoolType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">门窗五金类</label>
          <div class="controls service-region-radio">
            <checkbox-group :has-other="true" :has-all="true" :readonly="isQuery":other-placeholder = "'多个项目可用分号隔开'" :radios="metalsTypes":name="'metalsType'"  :other-value="allCheckboxes.metalsType.other":other.sync = "allCheckboxesOther.metalsType.otherCheck" :checked="allCheckboxes.metalsType.checked" @radio-checked="setMetalsType"></checkbox-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">家电类</label>
          <div class="controls service-region-radio">
            <checkbox-group  :has-other="true" :has-all="true":readonly="isQuery":other-placeholder = "'多个项目可用分号隔开'" :radios="householdTypes":name="'householdType'" :other-value="allCheckboxes.householdType.other":other.sync = "allCheckboxesOther.householdType.otherCheck" :checked="allCheckboxes.householdType.checked" @radio-checked="setHouseholdType"></checkbox-group>
          </div>
        </div>
        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">团队人数</label>
            <div class="controls ">
              <input type="text" style="width:100px":readonly="isQuery" placeholder="只能输入正整数" :value="worker.teamPeopleNum" @change="setData('teamPeopleNum', $event)"/>
              人
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">货车数量</label>
            <div class="controls ">
              <input type="text" style="width:100px" :readonly="isQuery" placeholder="只能输入正整数" :value="worker.truckNum" @change="setData('truckNum', $event)"/>
              辆
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">货车吨位</label>
            <div class="controls ">
              <input type="text" style="width: 100px;":readonly="isQuery" placeholder="只能输入数字" :value="worker.tonnage" @change="setData('tonnage', $event)"/>
              吨
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">推荐提货点</label>
          <div class="controls">
            <input type="text"  style="width:480px" placeholder="推荐提货点":readonly="isQuery" :value="worker.willingPickAddress" @change="setData('willingPickAddress', $event)"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">推荐物流</label>
          <div class="controls">
            <input type="text" style="width:480px" placeholder="推荐物流":readonly="isQuery" :value="worker.logistics" @change="setData('logistics', $event)"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">优势</label>
          <div class="controls">
            <textarea name="" placeholder="是否有仓库，仓库面积多少平方，仓库地址，是否会维修，维修哪些项目" style="width: 480px;" :readonly="isQuery" @change="setData('strength', $event)">{{worker.strength}}</textarea>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">备注</label>
          <div class="controls">
            <textarea name="" style="width: 480px;" :readonly="isQuery" @change="setData('description', $event)">{{worker.description}}</textarea>
          </div>
        </div>

        <div class="control-group-box" v-if="isNew === false">
          <div class="control-group">
            <label class="control-label">合作次数</label>
            <div class="controls">
              <input type="text"placeholder="合作次数":readonly="true" :value="worker.cooperateTimes" @change="setData('cooperateTimes', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">综合评分</label>
            <div class="controls">
              <input type="text" placeholder="综合评分":readonly="true" :value="worker.score" @change="setData('score', $event)"/>
            </div>
          </div>
        </div>
        <div class="form-title" v-if="mode === 'edit'">
          <h3>历史订单</h3>
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
                    <input type="text" v-el:begin_time placeholder="开始时间" style="width:80px" onClick="WdatePicker()"  readonly="true"/>
                    至
                    <input type="text" v-el:end_time placeholder="截止时间"  style="width:80px" onClick="WdatePicker()"  readonly="true"/>
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
                  <td><a v-link="'/admin/order/' + order.id"  target="_blank">{{order.orderNumber}}</a></td>
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
          <button type="button" class="btn btn-success" @click="onSaveWorker" v-if="isEdit">保存</button>
          <a v-link="backUrl + '?back=true'" class="btn btn-success">返回</a>
        </div>
      </form>
    </Widget>
  </Content>
</template>
<script type="text/ecmascript-6">
  import {getBreadCrumb, getRegion} from 'my_vuex/getters/getters'
  import {setRegion, toggleDialog} from 'my_vuex/actions/actions'
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
  import {getOrders, getOrderStatus} from 'my_vuex/getters/order'
  import {searchOrder, setOrderPersonal, setOrders} from 'my_vuex/actions/order'
  import {getUsers} from 'my_vuex/getters/user'
  import {searchUser} from 'my_vuex/actions/user'
  import mixins from 'src/mixins/mixins'
  let forEach = require('lodash/forEach')
  const getAllCheckboxes = () => {
    let obj = {}
    forEach(['furnitureType', 'stoolType', 'lightType', 'metalsType', 'householdType'], (key) => {
      obj[key] = {
        otherCheck: false
      }
    })
    return obj
  }
  export default {
    mixins: [mixins],
    props: {
      backUrl: {
        type: String,
        default: '/admin/worker'
      },
      sortProvinces: {
        type: Array,
        default: () => {
          return []
        }
      },
      allServiceArea: {
        type: Boolean,
        default: false
      },
      allCheckboxesOther: {
        type: Object,
        default: getAllCheckboxes
      }
    },
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
        return '师傅管理'
      },
      isEdit: function () {
        return this.mode !== 'query'
      },
      isQuery: function () {
        return this.mode === 'query'
      },
      isNew: function () {
        return this.mode === 'new'
      },
      allCheckboxes: function () {
        let vm = this
        let obj = {}
        forEach(['furnitureType', 'stoolType', 'lightType', 'metalsType', 'householdType'], (key) => {
          let other = ''
          let values = vm[key + 'Arr']
          let arr = (vm.worker[key] || []).slice(0)
          if (arr.length === 0 || !arr) {
            arr = []
          } else {
            let newArr = arr.filter((val) => {
              let res = ~values.indexOf(val.trim())
              !res && (other = val)
              return res
            })
            arr = newArr
          }
          obj[key] = {
            other,
            checked: arr
          }
          other !== '' && (vm.allCheckboxesOther[key].otherCheck = true)
        })
        return obj
      },
      furnitureTypeArr: () => {
        return ['民用家具', '办公家具', '定制家具（衣橱类）']
      },
      stoolTypeArr: () => {
        return ['马桶', '花洒', '淋浴屏', '浴室柜', '水龙头', '储物架', '水盆类']
      },
      lightTypeArr: () => {
        return ['灯具安装', '灯具检测维修', '电路检测维修']
      },
      metalsTypeArr: () => {
        return ['晾衣架', '内门', '纱窗', '开锁换锁', '各种墙体挂板']
      },
      householdTypeArr: () => {
        return ['电视', '空调', '净水器', '热水器', '油烟机', '吊扇', '浴霸', '小家电']
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
        let val = (this.worker.cardNum || '').replace(/([^\d])+/g, '')
        val = vm.insertSpace(val, 4)
        val = vm.insertSpace(val, 9)
        val = vm.insertSpace(val, 14)
        val = vm.insertSpace(val, 19)
        return val
      },
      config: function () {
        return {
          teamPeopleNum: 'isNumber',
          truckNum: 'isNumber',
          tonnage: 'isFloatNumber',
          phoneNum: 'isPhoneNumber'
        }
      }
    },
    methods: {
      onSaveWorker: function () {
        this.setWorker({
          birthday: this.$els.birthday.value
        })
        this.saveWorker().then(() => {
          this.$router.go(this.backUrl + '?back=true')
        })
      },
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
        let vm = this
        let obj = {}
        let val = e.target.value
        let test = vm.config[key]
        let num = key === 'teamPeopleNum' || key === 'truckNum' || key === 'tonnage'
        if (val && test && !vm[test](val)) {
          if (num) {
            val = e.target.value = 0
          } else {
            val = e.target.value = ''
          }
        }
        if (key === 'teamPeopleNum' || key === 'truckNum') {
          val = e.target.value = parseInt(val, 10)
        }
        if (key === 'receiveType') {
          val = parseInt(val, 10)
        } else if (key === 'cardNum') {
          val = val.replace(/([^\d])+/g, '')
          val = vm.insertSpace(val, 4)
          val = vm.insertSpace(val, 9)
          val = vm.insertSpace(val, 14)
          val = vm.insertSpace(val, 19)
          e.target.value = val
        }
        obj[key] = val
        vm.setWorker(obj)
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
/*
      let backUrl = transition.from.path || this.backUrl
        if (~backUrl.indexOf('/admin/order') || ~backUrl.indexOf('/admin/user/order')) {
          backUrl = '/admin/worker'
        }
        this.backUrl = backUrl*/
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
        this.setOrders({
          search: {},
          list: [],
          pageInfo: {
            curPage: 1,
            pageSize: 10,
            totalPage: 0,
            total: 0
          }
        })
        /*
        * 所有checkbox清空勾选其他
        * */
        this.allCheckboxesOther = getAllCheckboxes()
        this.setWorkerMode(type)
        this.sortProvinces = window.__PROVINCE_NAMES__ && window.__PROVINCE_NAMES__.split(',') || []
        this.setRegion()
        if (type !== 'new') {
          this.setOrderPersonal(false)
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
        searchUser,
        setOrderPersonal,
        setRegion,
        setOrders
      }
    },
    filters: {
      toArray: function (val) {
        return val ? val.split(',') : []
      }
    },
    watch: {
      'worker.city': function (val, oldValue) {
        if (val && oldValue) {
          this.setWorker({
            serviceArea: ''
          })
        }
      }
    }
  }
</script>
