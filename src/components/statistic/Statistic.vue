<template>
  <div class="content">
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" class="tip-bottom" ><i class="icon-home"></i>首页</a>
        <a href="#" class="current">订单统计</a> </div>
      <h1>订单统计</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box statistics">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>订单统计</h5>
        </div>
        <div class="widget-content nopadding">
          <form action="#" method="get" class="form-horizontal">
            <div class="control-group">
              <div class="controls label-inline">
                <label>
                  <div class="radio"><span><input type="radio" name="order_state"></span></div>
                  不限
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  员工甲
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  员工乙
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  员工丙
                </label>
                <label>
                  <div class="radio" >
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  员工丁
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  员工卯
                </label>
              </div>
            </div>
            <div class="control-group">
              <div class="controls label-inline">
                <label>
                  <div class="radio"><span><input type="radio" name="order_state"></span></div>
                  不限
                </label>
                <label>
                  <div class="radio" >
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  配送安装
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  维修
                </label>
              </div>
            </div>
            <div class="control-group">
              <div class="controls label-inline">
                <label>
                  <input type="date">
                </label>
                <label>至</label>
                <label>
                  <input type="date">
                </label>
              </div>
            </div>
            <div class="control-group">
              <div class="controls label-inline">
                <label>
                  <div class="radio"><span><input type="radio" name="order_state"></span></div>
                  订单数
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  总收入
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  总支出
                </label>
                <label>
                  <div class="radio" >
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  总利润
                </label>
                <label>
                  <div class="radio" >
                    <span ><input type="radio" name="order_state"></span>
                  </div>
                  利润率
                </label>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success btn-large">开始统计</button>
              <div class="statistics-result">
                统计结果：
                <div>
                  <label>总利润：</label>
                  <input type="text" />
                  <label>元</label>
                </div>
              </div>
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
