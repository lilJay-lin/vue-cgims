<template>
  <div class="content">
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" class="tip-bottom" ><i class="icon-home"></i>首页</a>
        <a href="#" class="tip-bottom" >角色管理</a>
        <a href="#" class="current">添加角色</a> </div>
      <h1>添加角色</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>添加角色</h5>
        </div>
        <div class="widget-content nopadding">
          <form action="#" method="get" class="form-horizontal">
            <div class="control-group">
              <label class="control-label">角色名</label>
              <div class="controls">
                <input type="text" class="span5" placeholder="角色名">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">描述</label>
              <div class="controls">
                <textarea class="span10"></textarea>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">添加权限</label>
              <div class="controls">
                <div class="control-box span10">
                  <div class="search-table-box">
                    <div class="dataTables-filter-wrap">
                      <label>
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
                            <a  href="#" title="添加"><i class="icon-plus"></i></a>
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
            <div class="control-group">
              <label class="control-label">已分配权限</label>
              <div class="controls">
                <ul class="relation-list ">
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                  <li><i class="icon-remove"></i> icon-remove</li>
                </ul>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success">保存</button>
              <button type="submit" class="btn btn-success">返回</button>
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
