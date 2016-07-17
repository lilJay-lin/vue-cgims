<template>
  <div class="content">
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" class="tip-bottom" data-original-title="Go to Home"><i class="icon-home"></i>首页</a>
        <a href="#" class="tip-bottom" data-original-title="Go to Home">角色管理</a>
        <a href="#" class="current">搜索角色</a> </div>
      <h1>搜索角色</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>角色信息</h5>
        </div>
        <div class="dataTables-filter-wrap">
          <div class="dataTables-filter">
            <label>
              <input type="text" />
              <button type="submit" class="btn btn-info">搜索</button>
            </label>
          </div>
        </div>
        <div class="widget-content ">

          <table class="table with-check role">
            <thead>
            <tr>
              <th>
                <div class="checker" >
                  <span><input type="checkbox"  name="title-table-checkbox"></span>
                </div>
              </th>
              <th>角色名称</th>
              <th class="desc">描述</th>
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
              <td >
                <div class="desc">第三方第三方的手电风扇范德萨发第三方都是范德萨范德萨发都是</div>
              </td>
              <td>
                <div class="operation-group">
                  <a href="" title="详情"><i class="icon-search"></i></a>
                  <a  href="#" title="更新"><i class="icon-pencil"></i></a>
                  <a  href="#" title="删除"><i class="icon-remove"></i></a>
                </div>
              </td>
            </tr>
            </tbody>

          </table>

          <div class="fg-toolbar">
            <div class="fg-toolbar-operation">
              <button type="button" class="btn btn-success">删除</button>
              <button type="button" class="btn btn-success">新增</button>
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
