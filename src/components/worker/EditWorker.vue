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
              <input type="text" class="span12" placeholder="姓名" :value="worker.name"/>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">手机</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="手机" :value="worker.phone_num" />
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">QQ</label>
            <div class="controls">
              <input type="text" class="span12" placeholder="QQ" :value="worker.qq"/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">收款账号</label>
          <div class="controls">
            <label>
              <div class="radio">
                <span :class="{checked: worker.receive_type === 0}">
                  <input type="radio" name="receive_type" :checked="worker.receive_type === 0">
                </span>
              </div>
              <input type="text" class="span4" placeholder="支付宝帐号" :value="worker.alipay_account"/>
            </label>
            <label>
              <div class="radio" >
                <span :class="{checked: worker.receive_type === 1}">
                  <input type="radio" name="receive_type" :checked="worker.receive_type === 1">
                </span>
              </div>
              银行卡
              <input type="text" class="span2" placeholder="银行名称" :value="worker.bank"/>
              <input type="text" class="span3" placeholder="银行卡帐号" :value="worker.card_num"/>
            </label>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">出生日期</label>
          <div class="controls">
            <input type="date" :value="worker.birthday"/>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">所在地</label>
          <div class="controls">
            <Region :province="worker.province" :city="worker.city" :area="worker.area"></Region>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">详细地址</label>
          <div class="controls">
            <input type="text" class="span5" placeholder="详细地址" :value="worker.address" />
          </div>
        </div>
        <div class="control-group">
          <label class="control-label uploader-identity-wrap">
            <div class="uploader-identity">
                <span class="btn btn-success">身份证正面
                    <input type="file" />
                </span>
            </div>
          </label>
          <div class="controls">
            <div class="identity-box">
              <img :src="worker.id_card_face" alt="">
            </div>
            <div class="inner-control-group">
              <label class="control-label">
                <div class="uploader-identity">
                    <span class="btn btn-success">身份证背面
                        <input type="file" />
                    </span>
                </div>
              </label>
              <div class="controls">
                <div class="identity-box">
                  <img :src="worker.id_care_back" alt="">
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
            <radio-group :radios="service_types" :checked="worker.service_type" @radio-checked="setServiceType"></radio-group>
          </div>
        </div>
        <div class="form-title">
          <h3>服务项目</h3>
        </div>
        <div class="control-group">
          <label class="control-label">家具类</label>
          <div class="controls service-region-radio">
            <radio-group :radios="furniture_types" :checked="worker.furniture_type" @radio-checked="setFurnitureType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">灯具类</label>
          <div class="controls service-region-radio">
            <radio-group :radios="light_types" :checked="worker.light_type" @radio-checked="setLightType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">卫浴类</label>
          <div class="controls  service-region-radio">
            <radio-group :radios="stool_types" :checked="worker.stool_type" @radio-checked="setStoolType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">门窗五金</label>
          <div class="controls service-region-radio">
            <radio-group :radios="metals_types" :checked="worker.metals_type" @radio-checked="setMetalsType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">家电</label>
          <div class="controls service-region-radio">
            <radio-group :radios="household_types" :checked="worker.household_type" @radio-checked="setHouseholdType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">服务区域</label>
          <div class="controls service-region-radio ">
            <radio-group :radios="region_types" :checked="worker.region_type" @radio-checked="setRegionType"></radio-group>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">团队人数</label>
          <div class="controls ">
            <input type="text" class="span30">
            人
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">货车数量</label>
          <div class="controls ">
            <input type="text" class="span30">
            辆
          </div>
        </div>

        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">推荐提货点</label>
            <div class="controls">
              <input type="text"placeholder="体育中心北门">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">提存物流</label>
            <div class="controls">
              <input type="text" placeholder="圆通">
            </div>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">优势</label>
          <div class="controls">
            <textarea name="" class="span5"></textarea>
          </div>
        </div>

        <div class="control-group-box">
          <div class="control-group">
            <label class="control-label">合作次数</label>
            <div class="controls">
              <input type="text"placeholder="合作次数">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">综合评分</label>
            <div class="controls">
              <input type="text" placeholder="综合评分">
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-success" @click="onSaveWorker" v-show="isEdit" >保存</button>
          <a v-link="{path: '/admin/worker', query: {back: true}}" class="btn btn-success">返回</a>
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
  import Region from 'components/Region'
  import RadioGroup from 'components/RadioGroup'
  import {getDetailWorker, getUIOptions} from 'my_vuex/getters/worker'
  import {showWorkerDetail, saveWorker, setWorkerMode, clearWorkerDetail, setWorker} from 'my_vuex/actions/worker'
  export default {
    components: {
      Content,
      Widget,
      Pagination,
      Region,
      RadioGroup
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
      region_types: function () {
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
      onSaveWorker: function () {
        let vm = this
        let els = vm.$els
        let worker = vm.worker
        vm.saveWorker(worker, {
          id: worker.id,
          name: els.name.value,
          description: els.description.value
        })
      },
      setServiceType: function (value) {
        this.setWorker({
          serviceType: value
        })
      },
      setFurnitureType: function (value) {
        this.setWorker({
          furnitureType: value
        })
      },
      setLightType: function (value) {
        this.setWorker({
          lightType: value
        })
      },
      setStoolType: function (value) {
        this.setWorker({
          stoolType: value
        })
      },
      setMetalsType: function (value) {
        this.setWorker({
          metalsType: value
        })
      },
      setHouseholdType: function (value) {
        this.setWorker({
          householdType: value
        })
      },
      setRegionType: function (value) {
        this.setWorker({
          regionType: value
        })
      }
    },
    route: {
      data ({to: {path, params: {id}, query: {type}}}) {
        if (!id && !type) {
          type = 'new'
        }
        this.setWorkerMode(type)
        type !== 'new' && this.showWorkerDetail(id)
      }
    },
    vuex: {
      getters: {
        breads: getBreadCrumb,
        worker: getDetailWorker,
        mode: getUIOptions
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
