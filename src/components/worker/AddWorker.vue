<template>
  <div class="content">
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" class="tip-bottom" data-original-title="Go to Home"><i class="icon-home"></i>首页</a>
        <a href="#" class="tip-bottom" data-original-title="Go to Home">师傅管理</a>
        <a href="#" class="current">师傅详情</a> </div>
      <h1>师傅详情</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box workers-detail">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>师傅详情</h5>
        </div>
        <div class="widget-content nopadding">
          <form action="#" method="get" class="form-horizontal">
            <div class="form-title">
              <h2>个人信息</h2>
            </div>
            <div class="control-group-box">
              <div class="control-group">
                <label class="control-label">姓名</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="姓名">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label">手机</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="手机">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label">QQ</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="QQ">
                </div>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">收款账号</label>
              <div class="controls">
                <label>
                  <div class="radio"><span><input type="radio" name="order_state"></span></div>
                  支付宝
                  <input type="text" class="span4" placeholder="支付宝帐号"/>
                </label>
                <label>
                  <div class="radio" >
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  银行卡
                  <input type="text" class="span2" placeholder="银行名称"/>
                  <input type="text" class="span3" placeholder="银行卡帐号"/>
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">出生日期</label>
              <div class="controls">
                <input type="date"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">所在地</label>
              <div class="controls">
                <select name="" class="form-control">
                  <option value="">广东省</option>
                </select>
                <select name="" class="form-control">
                  <option value="">肇庆</option>
                </select>
                <select name="" class="form-control">
                  <option value="">端州区</option>
                </select>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">详细地址</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="详细地址">
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
                  <img src="" alt="">
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
                      <img src="" alt="">
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
              <div class="controls label-inline service-region-radio">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  配送安装

                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  维修
                </label>
              </div>
            </div>
            <div class="form-title">
              <h3>服务项目</h3>
            </div>
            <div class="control-group">
              <label class="control-label">家具类</label>
              <div class="controls label-inline service-region-radio">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  办公家具

                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  定制家具
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  民用家具
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">灯具类</label>
              <div class="controls label-inline service-region-radio">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  吸顶灯

                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  吊灯
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  大型水晶灯
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  筒灯
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">卫浴类</label>
              <div class="controls label-inline service-region-radio">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  马桶

                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  花洒
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  淋浴屏
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  水盆类
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  浴室柜
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  储物架
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">门窗五金</label>
              <div class="controls label-inline service-region-radio">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  晾衣杆

                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  饰品
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  挂件
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  内门
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">家电</label>
              <div class="controls label-inline service-region-radio">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  电视
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  空调
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  净水器
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  热水器
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  浴霸
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  吊扇
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">服务区域</label>
              <div class="controls label-inline service-region-radio ">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  端州区
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  鼎湖区
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  大旺区
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  四会
                </label>
              </div>
              <div class="controls label-inline service-region-radio">
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  怀集
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  广宁
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  封开
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  高要
                </label>
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
              <button type="button" class="btn btn-success">保存</button>
              <button type="button" class="btn btn-success">返回</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
  }
</script>
