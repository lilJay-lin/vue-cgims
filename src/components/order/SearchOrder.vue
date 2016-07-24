<template>
  <div class="content">
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" class="tip-bottom" data-original-title="Go to Home"><i class="icon-home"></i>首页</a>
        <a href="#" class="tip-bottom" data-original-title="Go to Home">订单管理</a>
        <a href="#" class="current">订单信息</a> </div>
      <h1>订单信息</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box order">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>角色信息</h5>
        </div>
        <div class="widget-content ">
          <div class="dataTables-filter-wrap">
            <div class="dataTables-filter">
              <label>
                <select class="form-control">
                  <option selected>全部状态</option>
                  <option>Second option</option>
                  <option>Third option</option>
                </select>
                <select class="form-control">
                  <option selected>全部类型</option>
                  <option>Second option</option>
                  <option>Third option</option>
                </select>
                <select class="form-control">
                  <option selected>员工甲</option>
                  <option>Second option</option>
                  <option>Third option</option>
                </select>
                <input type="date"/>
                至
                <input type="date"/>
                <input type="text" />
                <button type="button" class="btn btn-info">搜索</button>
                <button type="button" class="btn btn-info">新增</button>
              </label>
            </div>
          </div>
          <table class="table with-check">
            <thead>
            <tr>
              <th>
                <div class="checker" >
                  <span><input type="checkbox"  name="title-table-checkbox"></span>
                </div>
              </th>
              <th>订单号</th>
              <th>商家信息</th>
              <th>接单价/服务价</th>
              <th>师傅</th>
              <th class="detail">详情</th>
              <th class="operation-group">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <div class="checker" >
                  <span class="checked"><input type="checkbox" style="opacity: 0;"></span>
                </div>
              </td>
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
              <td >
                <div class="detail">客户甲 14123152343 广东省肇庆市端州区星湖大道仕贤村口海逸广场A1</div>
              </td>
              <td>
                <div class="operation-group">
                  <div class="operation-list-box">
                    <i class="icon-th-list"></i>操作
                    <div class="operation-list ">
                      <a href="#" title="打款订单"><i class="icon-link"></i>打款订单</a>
                      <a href="#" title="完成订单"><i class="icon-link"></i>完成订单</a>
                      <a  href="#" title="售后订单"><i class="icon-link"></i>售后订单</a>
                    </div>
                  </div>
                  <div class="operation-list-box">
                    <i class="icon-info-sign"></i>备注
                    <div class="operation-list save-common-box">
                      <div>
                        <span>备注</span>
                        <button  class="btn btn-sm btn-success">保存</button>
                      </div>
                      <textarea name="" ></textarea>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>

          </table>

          <div class="fg-toolbar">
            <div class="fg-toolbar-operation">
              <select class="form-control">
                <option selected>全部状态</option>
                <option>Second option</option>
                <option>Third option</option>
              </select>
              <button type="button" class="btn btn-success">批量操作</button>
            </div>
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
</template>
<script>
  export default {
  }
</script>
