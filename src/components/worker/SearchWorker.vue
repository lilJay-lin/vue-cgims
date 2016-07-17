<template>
  <div class="content">
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" class="tip-bottom" data-original-title="Go to Home"><i class="icon-home"></i>首页</a>
        <a href="#" class="tip-bottom" data-original-title="Go to Home">师傅管理</a>
        <a href="#" class="current">搜索师傅</a> </div>
      <h1>搜索师傅</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box worker-search">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>师傅信息</h5>
        </div>
        <div class="dataTables-filter-wrap">
          <div class="dataTables-filter">
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
              <input type="text" placeholder="师傅名、电话"/>
              <button type="button" class="btn btn-info">搜索</button>
              <button type="button" class="btn btn-info">新增</button>
            </label>
          </div>
        </div>
        <div class="widget-content ">

          <table class="table with-check">
            <thead>
            <tr>
              <th>
                <div class="checker" >
                  <span><input type="checkbox"  name="title-table-checkbox"></span>
                </div>
              </th>
              <th>工号</th>
              <th>名称</th>
              <th>电话</th>
              <th>qq</th>
              <th>服务地区</th>
              <th>评价</th>
              <th>合作次数</th>
              <th>备注</th>
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
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
              <td>Row 1</td>
            </tr>
            </tbody>

          </table>

          <div class="fg-toolbar">
            <div class="fg-toolbar-operation">
              <button type="button" class="btn btn-success">批量删除</button>
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
