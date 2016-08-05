<template>
  <div class="container" v-el:container>
    <aside class="left-slider">
      <a href="" class="logo">后台管理</a>
      <div class="slider-view">
        <Slider :menus="slider.menus" :active="slider.active"></Slider>
      </div>
    </aside>
    <header class="top-nav"  v-el:header>
      <div class="nav-menu">
        <ul class="nav">
          <li v-if="auth.login">
            <a href="">
              <img src="../assets/img/avatar.jpg" alt="" class="img-user">
              <strong>{{auth.name}}</strong>
            </a>
          </li>
          <li>
            <a v-link="'/login'" v-if="auth.login" @click="logout">退出</a>
            <a v-link="'/login'" v-else>登录</a></li>
        </ul>
      </div>
    </header>
    <aside class="right-content" v-el:content>
      <router-view keep-alive></router-view>
    </aside>
    <footer>
      <div class="footer"  v-el:footer>
        底部fixed
      </div>
    </footer>
    <div class="slider-toggle" @click="toggleSlider"></div>
    <go-top :top=""></go-top>
    <dialog :title="dialog.title" :content="dialog.content" :has-success-btn="dialog.hasSuccessBtn"
            :has-close-btn="dialog.hasCloseBtn" :show="dialog.show" :auto="dialog.auto" @dialog-close="onDialogClose">
    </dialog>
  </div>
</template>
<script>
  import Slider from 'src/components/Slider.vue'
  import GoTop from 'src/components/GoTop.vue'
  import Dialog from 'src/components/Dialog.vue'
  import {getSlider, getDialog} from './vuex/getters/getters'
  import {toggleDialog} from './vuex/actions/actions'
  import {getAuth} from 'my_vuex/getters/auth'
  import {logout} from 'my_vuex/actions/auth'
  import {css} from './util/dom.js'
  export default {
    components: {
      Slider,
      GoTop,
      Dialog
    },
    ready: function () {
      let me = this
      me.setContentMinHeight()
    },
    methods: {
      setContentMinHeight: function () {
        let $els = this.$els
        css($els.content, {
          'min-height': window.innerHeight - $els.footer.offsetHeight + 'px'
        })
      },
      toggleSlider: function (e) {
        let el = e.target
        let container = this.$els.container
        let cls = 'extend'
        let hasClass = el.classList.contains(cls)
        el.classList[hasClass ? 'remove' : 'add'](cls)
        container.classList[hasClass ? 'remove' : 'add'](cls)
      },
      onDialogClose: function () {
        this.toggleDialog({
          show: false
        })
      }
    },
    vuex: {
      getters: {
        slider: getSlider,
        auth: getAuth,
        dialog: getDialog
      },
      actions: {
        logout,
        toggleDialog
      }
    },
    route: {
      data: function () {
        console.log('is enter')
      }
    }
  }
</script>
<style>
  .dataTables-filter-wrap input, .dataTables-filter-wrap .btn, .dataTables-filter-wrap select{
    margin-bottom: 10px;
  }
  .top-nav, .right-content,  .left-slider{
    transition: all  1s linear;
    backface-visibility: hidden;
  }

  .relation-list{
    min-height: 42px;
    user-select: none;
  }
  .relation-list li{
    min-width: auto;
  }
  .pagination-box{
    margin-top: 15px;
  }
  .pagination-info span {
    margin-right: 10px;
  }
  .pagination{
    margin:0
  }
  table.table  td{
    padding:10px;
  }
  .hide{
    display: none;
  }
  /*
   表单格式
  */
  td span + span{
    margin-left: 10px;
  }
  .table td{
    text-align: center;
    white-space: normal;
    word-break: break-all;
  }
  table.table tr>td.operation-group-td{
    width: 160px;
  }
  .table.role tr>td:nth-child(2),
  .table.permission tr>td:nth-child(1){
    width: 200px;
  }
  .table.order tr>td,.table.worker tr>td{
    width: 100px;
  }
  .table.worker tr>td:nth-child(4){
    width: 80px;
  }
  .table.worker tr>td:nth-child(5){
    width: 80px;
  }
  .table.worker tr>td:nth-child(7){
    width: 25px;
  }
  .table.worker tr>td:nth-child(8){
    width: 60px;
  }
  .table.order td.description, .table.worker td.description{
    width: auto;
  }

</style>
