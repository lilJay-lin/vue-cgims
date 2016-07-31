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
              <input :readOnly="isQuery" type="text" class="span3" placeholder="银行卡帐号" :value="worker.cardNum" @change="setData('cardNum', $event)"/>
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
                <span :class="{checked: worker.receiveType === '1'}">
                  <input value='1' type="radio" name="receiveType" :checked="worker.receiveType === '1'" @change="setData('receiveType', $event)">
                </span>
              </div>
              银行卡
              <input  :readOnly="worker.receiveType === 0" type="text" class="span2" placeholder="银行名称" :value="worker.bank" @change="setData('bank', $event)"/>
              <input :readOnly="worker.receiveType === 0" type="text" class="span3" placeholder="银行卡帐号" :value="worker.cardNum" @change="setData('cardNum', $event)"/>
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
            <file-upload :disabled="isQuery" title="身份证正面" url="'/ workman/' + worker.id + '/upload/headImg'" @file-upload-success="cardFaceUploadSuccess" ></file-upload>
          </label>
          <div class="controls">
            <div class="identity-box">
              <img :src="worker.idCardFace" alt="">
            </div>
            <div class="inner-control-group">
              <label class="control-label">
                <file-upload :disabled="isQuery" title="身份证背面" url="'/ workman/' + worker.id + '/upload/headImg'" @file-upload-success="cardBackUploadSuccess" ></file-upload>
              </label>
              <div class="controls">
                <div class="identity-box">
                  <img :src="worker.idCardBack" alt="">
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
            <radio-group :readonly="isQuery" :radios="service_types" :name="'serviceType'" :checked="worker.serviceType" @radio-checked="setServiceType"></radio-group>
          </div>
        </div>
        <div class="form-title">
          <h3>服务项目</h3>
        </div>
        <div class="control-group">
          <label class="control-label">家具类</label>
          <div class="controls service-region-radio">
            <radio-group :readonly="isQuery" :radios="furniture_types" :name="'furniture_type'"  :checked="worker.furniture_type" @radio-checked="setFurnitureType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">灯具类</label>
          <div class="controls service-region-radio">
            <radio-group :readonly="isQuery" :radios="light_types" :name="'light_type'" :checked="worker.light_type" @radio-checked="setLightType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">卫浴类</label>
          <div class="controls  service-region-radio">
            <radio-group :readonly="isQuery" :radios="stool_types" :name="'stool_type'" :checked="worker.stool_type" @radio-checked="setStoolType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">门窗五金</label>
          <div class="controls service-region-radio">
            <radio-group :readonly="isQuery" :radios="metals_types"  :name="'metals_type'" :checked="worker.metals_type" @radio-checked="setMetalsType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">家电</label>
          <div class="controls service-region-radio">
            <radio-group :readonly="isQuery" :radios="household_types" :name="'household_type'" :checked="worker.household_type" @radio-checked="setHouseholdType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">服务区域</label>
          <div class="controls service-region-radio ">
            <radio-group :readonly="isQuery" :radios="service_areas" :name="'serviceArea'" :checked="worker.serviceArea" @radio-checked="setServiceArea"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">团队人数</label>
          <div class="controls ">
            <input type="text" class="span30":readonly="isQuery" :value="teamPeopleNum" @change="setData('teamPeopleNum', $event)"/>
            人
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">货车数量</label>
          <div class="controls ">
            <input type="text" class="span30":readonly="isQuery" :value="truckNum" @change="setData('truckNum', $event)"/>
            辆
          </div>
        </div>

        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">推荐提货点</label>
            <div class="controls">
              <input type="text"placeholder="推荐提货点":readonly="isQuery" :value="willingPickAddress" @change="setData('willingPickAddress', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">提存物流</label>
            <div class="controls">
              <input type="text" placeholder="提存物流":readonly="isQuery" :value="logistics" @change="setData('logistics', $event)"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">优势</label>
          <div class="controls">
            <textarea name="" class="span5" :readonly="isQuery" @change="setData('strength', $event)">{{strength}}</textarea>
          </div>
        </div>

        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">合作次数</label>
            <div class="controls">
              <input type="text"placeholder="合作次数":readonly="isQuery" :value="cooperateTimes" @change="setData('cooperateTimes', $event)"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">综合评分</label>
            <div class="controls">
              <input type="text" placeholder="综合评分":readonly="isQuery" :value="score" @change="setData('score', $event)"/>
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
  import FileUpload from 'components/FileUpload'
  import {getDetailWorker, getUIOptions} from 'my_vuex/getters/worker'
  import {showWorkerDetail, saveWorker, setWorkerMode, clearWorkerDetail, setWorker} from 'my_vuex/actions/worker'
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
      this.clearWorkerDetail()
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
      service_types: function () {
        return this.createRadios(['配送安装', '维修'])
      },
      furniture_types: function () {
        return this.createRadios(['办公家具', '定制家具', '民用家具'])
      },
      light_types: function () {
        return this.createRadios(['吸顶灯', '吊灯', '大型水晶灯', '筒灯'])
      },
      stool_types: function () {
        return this.createRadios(['马桶', '花洒', '淋浴屏', '水盆类', '浴室柜', '储物架'])
      },
      metals_types: function () {
        return this.createRadios(['晾衣杆', '饰品', '挂件', '内门'])
      },
      household_types: function () {
        return this.createRadios(['电视', '空调', '净水器', '热水器', '浴霸', '吊扇'])
      },
      service_areas: function () {
        return this.createRadios(['端州区', '鼎湖区', '大旺区', '四会', '怀集', '广宁', '封开', '高要'])
      }
    },
    methods: {
      createRadios: function (arr) {
        let key = arr.slice(0)
        key.unshift('全部')
        let all = arr.slice(0)
        arr.unshift(JSON.stringify(all))
        return key.map((val, idx) => {
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
        this.setWorker({
          furniture_type: value
        })
      },
      setLightType: function (value) {
        this.setWorker({
          light_type: value
        })
      },
      setStoolType: function (value) {
        this.setWorker({
          stool_type: value
        })
      },
      setMetalsType: function (value) {
        this.setWorker({
          metals_type: value
        })
      },
      setHouseholdType: function (value) {
        this.setWorker({
          household_type: value
        })
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
      cardFaceUploadSuccess: function (src) {
        this.setData('idCardFace', src)
      },
      cardBackUploadSuccess: function (src) {
        this.setData('idCardBack', src)
      },
      setData: function (key, e) {
        let obj = {}
        let val = e.target.value
        if (key === 'receiveType') {
          val = parseInt(val, 10)
        }
        obj[key] = val
        this.setWorker(obj)
      }
    },
    route: {
      data ({to: {path, params: {id}, query: {type}}}) {
        if (id && !type) {
          type = 'query'
        } else if (!type) {
          type = 'new'
        }
        this.setWorkerMode(type)
        if (type !== 'new') {
          return this.showOrderDetail(id)
        }
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        worker: getDetailWorker,
        mode: getUIOptions,
        region: getRegion
      },
      actions: {
        showWorkerDetail,
        saveWorker,
        setWorkerMode,
        clearWorkerDetail,
        setWorker
      }
    }
  }
</script>
