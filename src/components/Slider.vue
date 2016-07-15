<template>
  <ul>
    <template v-for="menu in menus">
      <li class="" >

      </li>
    </template>
    <li class="submenu open">
      <a href="#">
        <i class="icon icon-th-list"></i>
        <span>角色管理</span> <span class="label">4</span>
      </a>
      <ul>
        <li><a href="form-common.html">搜索角色</a></li>
        <li><a href="form-validation.html">角色详情</a></li>
        <li><a href="form-wizard.html">添加角色</a></li>
        <li><a href="form-wizard.html">修改角色</a></li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  props:{
    menus: {
      type: Array
    },
    isActive: {
      type: String,
      default: 'index'
    }
  }
}
</script>
