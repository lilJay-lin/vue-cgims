<template>
  <div class="content">
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" class="tip-bottom" data-original-title="Go to Home"><i class="icon-home"></i>首页</a>
        <a href="#" class="tip-bottom" data-original-title="Go to Home">订单管理</a>
        <a href="#" class="current">订单详情</a>
      </div>
      <h1>添加订单</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box order_add">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>添加订单</h5>
        </div>
        <div class="widget-content nopadding">
          <form action="#" method="get" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">订单号</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="订单号">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">订单状态</label>
              <div class="controls label-inline">
                <label>
                  <div class="radio"><span><input type="radio" name="order_state"></span></div>
                  未付订单
                </label>
                <label>
                  <div class="radio" >
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  跟踪订单
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">订单类型</label>
              <div class="controls label-inline">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  配送运输
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  维修
                </label>
              </div>
            </div>
            <div class="control-group-box">
              <div class="control-group">
                <label class="control-label">客户名称</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="客户名称">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label">客户电话</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="客户电话">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label">备用电话</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="备用电话">
                </div>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">客户地址</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="客户地址">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">产品信息</label>
              <div class="controls">
                <div class="uploader">
                  <input type="file" />
                  <span class="filename">没有选中文件</span>
                  <span class="action">添加图片</span>
                </div>
              </div>
              <div class="controls-pics">
                <div class="controls-pics-item">
                  <img src="" alt="">
                  <a href=""><i class="icon-remove"></i></a>
                </div>
                <div class="controls-pics-item">
                  <img src="" alt="">
                  <a href=""><i class="icon-remove"></i></a>
                </div>
                <div class="controls-pics-item">
                  <img src="" alt="">
                  <a href=""><i class="icon-remove"></i></a>
                </div>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">物流信息</label>
              <div class="controls">
                <div class="uploader">
                  <input type="file" />
                  <span class="filename">没有选中文件</span>
                  <span class="action">添加图片</span>
                </div>
              </div>
              <div class="controls-pics">
                <div class="controls-pics-item">
                  <img src="" alt="">
                  <a href=""><i class="icon-remove"></i></a>
                </div>
                <div class="controls-pics-item">
                  <img src="" alt="">
                  <a href=""><i class="icon-remove"></i></a>
                </div>
                <div class="controls-pics-item">
                  <img src="" alt="">
                  <a href=""><i class="icon-remove"></i></a>
                </div>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">核销</label>
              <div class="controls label-inline">
                <label>
                  <div class="radio">
                    <span class="checked"><input type="radio" name="order_state"></span>
                  </div>
                  是
                  <input type="text">
                </label>
                <label>
                  <div class="radio" >
                    <span><input type="radio" name="order_state"></span>
                  </div>
                  否
                </label>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">商家信息</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="旺旺号">
              </div>
            </div>
            <div class="control-group-box">
              <div class="control-group">
                <label class="control-label">接单价</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="接单价">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label">服务价</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="服务价">
                </div>
              </div>
              <div class="control-group">
                <label class="control-label">利润</label>
                <div class="controls">
                  <input type="text" class="span12" placeholder="利润">
                </div>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">价格变动原因</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="价格变动原因">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">对接师傅</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="对接师傅">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">订单评分</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="订单评分">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">评价备注</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="评价备注">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">备注</label>
              <div class="controls">
                <textarea class="span10"></textarea>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">创建人</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="创建人">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">创建时间</label>
              <div class="controls">
                <input type="date"/>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">完成时间</label>
              <div class="controls">
                <input type="date"/>
              </div>
            </div>

            <div class="control-group">
              <label class="control-label">选择对接师傅</label>
              <div class="controls">
                <div class="control-box span10">
                  <div class="search-table-box">
                    <div class="dataTables-filter-wrap">
                      <label>
                        <select class="form-control">
                          <option selected>省</option>
                          <option>Second option</option>
                          <option>Third option</option>
                        </select>
                        <select class="form-control">
                          <option selected>市</option>
                          <option>Second option</option>
                          <option>Third option</option>
                        </select>
                        <select class="form-control">
                          <option selected>区</option>
                          <option>Second option</option>
                          <option>Third option</option>
                        </select>
                        <select class="form-control">
                          <option selected>服务</option>
                          <option>Second option</option>
                          <option>Third option</option>
                        </select>
                        <input type="text" />
                        <button type="submit" class="btn btn-info">搜索</button>
                      </label>
                    </div>
                    <table class="table role">
                      <thead>
                      <tr>
                        <th>权限</th>
                        <th class="desc">描述</th>
                        <th class="operation-group">操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>Row 1</td>
                        <td >
                          <div class="desc">第三方第三方的手电风扇范德萨发第三方都是范德萨范德萨发都是</div>
                        </td>
                        <td>
                          <div class="operation-group">
                            <a  href="#" title="选中" class="checked"><i class="icon-check"></i></a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Row 1</td>
                        <td >
                          <div class="desc">第三方第三方的手电风扇范德萨发第三方都是范德萨范德萨发都是</div>
                        </td>
                        <td>
                          <div class="operation-group">
                            <a  href="#" title="选择"><i class="icon-check"></i></a>
                          </div>
                        </td>
                      </tr>
                      </tbody>

                    </table>
                    <div class="fg-toolbar">
                      <div class="pagination " >
                        <a tabindex="0" class="first pg-button  pg-state-disabled" >首页</a>
                        <a tabindex="0" class="previous pg-button  pg-state-disabled">上一页</a>
                                                <span>
                                                    <a tabindex="0" class=" pg-button  pg-state-disabled">1</a>
                                                    <a tabindex="0" class=" pg-button ">2</a>
                                                    <a tabindex="0" class=" pg-button ">3</a>
                                                    <a tabindex="0" class=" pg-button ">4</a>
                                                    <a tabindex="0" class=" pg-button ">5</a>
                                                </span>
                        <a tabindex="0" class="next  pg-button ">下一页</a>
                        <a tabindex="0" class="last   pg-button " >尾页</a></div>
                    </div>
                  </div>
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
