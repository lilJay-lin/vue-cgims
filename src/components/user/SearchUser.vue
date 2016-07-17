<template>
  <div class="content">
    <div class="content-header">
      <bread-crumb :menus="breads.menus" :active="breads.active"></bread-crumb>
      <h1>用户管理</h1>
    </div>
    <div class="content-container">
      <hr/>
      <div class="widget-box">
        <div class="widget-title"><span class="icon"><i class="icon-th"></i></span>
          <h5>用户管理</h5>
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
              <th>用户名</th>
              <th >姓名</th>
              <th >手机</th>
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
import {getBreadCrumb} from 'my_vuex/getters'
import BreadCrumb from 'components/BreadCrumb'
export default {
  components: {
    BreadCrumb
  },
  vuex: {
    getters: {
      breads: getBreadCrumb
    }
  }
}
</script>
