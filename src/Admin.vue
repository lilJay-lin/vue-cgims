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
            <a v-link="'/admin/user/self'">
              <img src="../assets/img/avatar.jpg" alt="" class="img-user" style="display: none">
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
        信息管理系统
      </div>
    </footer>
    <div class="slider-toggle" @click="toggleSlider"></div>
    <go-top :top=""></go-top>
  </div>
</template>
<script>
  import Slider from 'src/components/Slider.vue'
  import GoTop from 'src/components/GoTop.vue'
  import {getSlider} from './vuex/getters/getters'
  import {getAuth} from 'my_vuex/getters/auth'
  import {logout} from 'my_vuex/actions/auth'
  import {css} from './util/dom.js'
  export default {
    components: {
      Slider,
      GoTop
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
      }
    },
    vuex: {
      getters: {
        slider: getSlider,
        auth: getAuth
      },
      actions: {
        logout
      }
    }
  }
</script>
<!--
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
    width: auto;
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
  table.table td.operation-group-td{
    width: 160px;
  }
  .table.role tr>td:nth-child(2),
  .table.permission tr>td:nth-child(1){
    width: 200px;
  }
  .table.order td,.table.worker td{
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
  table.table td.description{
    width: auto;
  }
  .detail-star {
    position: relative;
    width: 190px;
    height: 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAAdCAYAAAAU/NbdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODJCQjUwRjI1MjE1MTFFNkFERTg5NUQxMTY5Q0YzQTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODJCQjUwRjM1MjE1MTFFNkFERTg5NUQxMTY5Q0YzQTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MkJCNTBGMDUyMTUxMUU2QURFODk1RDExNjlDRjNBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MkJCNTBGMTUyMTUxMUU2QURFODk1RDExNjlDRjNBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlTrMSwAAAJ/SURBVHja7Jw9SBxBFMfn1o/gNTZaicZrJSeoKCRpLBJSeaCVdqkOgqhliqsEGwtb4a5NnzSpDAnYGA4uET8KbcXOzkYw5OM/7BOXcLess2/chfs/+LF3uzPzfje8u13n9izU63XjGK9AAXxx6VytVhO1azQa9KOful+vY1KbcFu2X8Efk6+gH/1iI3BMvAKmwRRYNvkL+tFPvfCfgK3I8y3Zl5egH/28FP47UIo8L8m+vAT96Kde+IOg1mZ/TY5lHfSjn5fCfw+G2uwfkmNZB/3op174I2Aj5viGtMkq6Ee/ER+FvwmKMceL0iaroB/9Evt1WsfvA89MuFw0I9u5BOO9BRPgEPyQ7Sn4pTwJ9KNfKj9b+ANg0tyvi9ptGfQ7CPeA58Jd3IIT8FNE7PYY3CQck370U/ezhb/jebmqX961M5F9u2A1YX/60U/dz17jr4FPj3it9hGsP6A9/ein7mcL/7cJv/b99ghJbY4VyZk06Ec/db8gch20CJoekzYlx61DX/rRT9Uvupx5DRbAuYekZzL2dYox6Ec/Nb//1/GvTHif86ViUjvWaxk7bdCPfip+ASeaft3oF8ScGioKiSseT130o5+zX9wtCxcKiS+Mv6Af/ZzHiCv8pwqJxzxODP3o5+znu/DHcz4x9OtSv8Dzi/I5MfSjX24LfyznE0O/LvULUryoIyGrTwT60c/Zz+UT/7sJvwWbEuzjgxydCulHP9XC3wPz4AX4DP4K9vFLObbn4Q8U+tFP3a9T4Q+b8AcC9j9U2VtGZ8EbsB8jui9tZqWP7VuUsbSDfvRL5dep8EfBBxP+EmYJtB4g3ZI+ZRlj1MPE0I9+qfz+CTAAruGFi3dr3PIAAAAASUVORK5CYII=) no-repeat;
    -webkit-background-size: 100% auto;
    background-size: 100% auto
  }
  .detail-star-status {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAAdCAYAAAAU/NbdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NURBODI5Q0Y1MjE1MTFFNjlERjg4OTVGMTNEQjYzRDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NURBODI5RDA1MjE1MTFFNjlERjg4OTVGMTNEQjYzRDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1REE4MjlDRDUyMTUxMUU2OURGODg5NUYxM0RCNjNENSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1REE4MjlDRTUyMTUxMUU2OURGODg5NUYxM0RCNjNENSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps4Xod8AAAUeSURBVHja7JxbbNtkFMdtx3FIsl7TFqSmaYtEB7QpbdMCD5OiAWWAunB5Yi+ItwlN7BEkJiFtmpB4Q3vgHU1C4mUDaSrVKsb2AprWQKEZDKoVCOuKWiUpSZuLczHnKF9Z1CWZ40tiffqO9Jft73LOL/aJ/fmLHV65ymm1F0A8aFGzh6BSv/4az+kwxqeP8X4+NfEaNY18NxOH3+N4hR/tvPqxFj5eY+Ij7RJZToNKFkssxqePsTqfRRI/HJsTHm0Lp6AnfzsVaA94LhUa5RM04h4DTYEmQW9y1jPGRzGfW9w+1yVtuDqlDSesf6LFh5bEd4DOVmyfJWVWMcZHMR+c7du97pvH97ZxHcuakfjvgIYrtodJmVWM8VHM127f+uyAmBD3tnEdy8xO/A7QqSrlp0hdq43xUcz3Y+yVAZ87EtpfjmVYZ2bivw/qqVLeQ+pabYyPYj4Y03/hsO3el7NYhnUN3b03MKvTD/od5KpRnwaNgNZbNGvC+PQxGsundoZFJd9y/KXAWOeVJVGQq9YXShIX2X5ueqJ7IWz0Gf90nZ3CkbrTLTwhMD6K+TyOvz+vlfRoWIdt1PoTa5TbQWNceTorQJZPq/D3NuhJHI7hDThZRkB5g/cD46OYLxybc9n53KswhJl1iqkZuIEd9Lp/bXtQP2gzEs95kzuFrr8yhbYbuaJ7Ma84vgp4LqWrDXWcsBzn7s3b4tIPkgz6HPg1XQH9QHYULn8GZVQOJRifVr4yY2v4gkpGVZJfONotCZnXHEIakjw5AUnu65A2XQJfMASupIjcv3JfGr4M0UyhfTlXci3KJeeXmPiftmC6CmOeUJlYjE8rX5mxNXxB5YSahtH58YjPvTLaTLjorj+CY/x3QRebGPcC6GQD7RkfxXxb2cGpfzKP3W0W3AbEgpgBTPwiV/5Z+koT4mKMYySmWmN8FPPB+FteTx88CMmYMBsOY9yFWBhTqBinvQ66bmLc6ySGrHEcyfgo5YNE3LmzO+qP5/p3zIJD3xgDY+F25XRmEnQU9JsJcW8R30kdPhgfxXyTnvn16M74TDLfIxsNl8z3yugbY+yV7Z/H3+LKz2HfMTAu+polvnVfrRgfvXwTnq9vraWmD6ULHUWj4NDXWipwCH1XlgssERiflfgmuhdurCafCWWL7pJeX+gDfM2hz/11Qp1LV8iAzxEy8dLK+Cjle6r78vxq8tnjev2gD/C1UK2u3iMLUQM+Q5QzzxgfxXxFxR4200e9xB80gN9n4oFjfBTziXx+Wq8PG58PtCrxhyx+4BifRflEQfbr9WEX5HEtiT9k8QPH+CjmE/nsiJk+zE58n8UPHOOzKJ/DlhnQ60OyZb1aEv9BH+onoladsRgfxXySkO6tV78tP5xB1f3yCLt9Rp7xv+fKv9JNEuH6dxa6VDM+CvicYqrqPyfEc97UL9vBM7dTMwdQuB6DskZ8oNV79RAf3ndWbF8GfQS6VqN9EPQB6MV9Ptw1I+h7tY/x6Xv10Fw+na8eFhS7IvL33m/ZzA7HNjNDZ8a6vj1XrX0kcfhkn/PPD/se+sPzv4+ShDfJfCNn/F6yU/DXM3ykdQZ0pM5O4UjdEdL2IunrIr6MNsZHMd9y7OXHMekVjufwkeWVxPNvQUL31Ep6NKzDNtgW+2BffB0RfTWS+HhjcZ4rv6nzBlf+Ozm1tkT6+ImPARMOHOOjmM8m5KfW00+srcRnQ484V/v9Xd+cV9sX22If7Is+0Fe1dv8JMAAQi5psAAsOwQAAAABJRU5ErkJggg==) no-repeat;
    -webkit-background-size: 190px auto;
    background-size: 190px auto
  }
  .start{
    position: absolute;
    top:0;
    left: 0;
    z-index: 1;
  }
  .start i{
    position: relative;
    display: inline-block;
    z-index: 1000;
    width: 38px;
    height: 30px;
  }
  .go-up, .slider-toggle{
    cursor: pointer;
  }
  .slider-toggle{
    left: 100px;
    transition: transform 0.5s linear, -webkit-transform 0.5s linear;
  }
  .slider-toggle.extend{
    transform: translate3d(-100px, 0, 0) rotate3d(0, 0, 1, 90deg)
  }
  .top-nav, .right-content, .left-slider{
    transition: all 0.5s linear;
  }
  .extend .left-slider {
    transform: translate3d(-150px, 0, 0);
  }
  .identity-box{
    position: relative;
    text-align: center;
  }
  .identity-box>a:first-child{
    line-height: 270px;
  }
  .identity-box img{
    width:100%;
    vertical-align: middle;
  }

  .inner-control-group{
    vertical-align: top;
  }
  .headImg.identity-box{
    width: 200px;
    min-height: 200px;
  }
  .headImg.identity-box>a:first-child{
    line-height: 200px;
  }
  .identity-box{
    width: 280px;
    min-height: 176px;
    line-height: 176px;
  }
  .identity-box .loading, .controls-pics-item .loading{
    width: 48px;
    height: 48px;
    background: url('./assets/loading.png') 0 0 no-repeat;
    background-size: cover;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    margin-left: -24px;
    margin-top: -24px;
    animation: loading-rotate 1s infinite linear;
  }
  @keyframes loading-rotate {
    0%{
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100%{
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  .controls-pics-item{
    vertical-align: top;
    position: relative;
    margin: 5px;
    text-align: center;
    height: auto
  }
  .controls-pics-item a{
    background-color: #eeeeee;
  }
  .slider-view > ul, .slider-view{
    width:150px
  }
  .top-nav, .right-content{
    margin-left:150px;
  }
  .slider-view > ul > li ul li a{
    padding-left: 42px;
  }
  /*
    弹窗演示
  */
  .modal{
    display: block;
  }
  .show-transition{
    transition: all .3s linear;
    opacity: 1;
  }
  .modal-backdrop.show-transition{
    opacity: 0.5;
  }
  .show-enter, .show-leave{
    opacity: 0;
  }
  .modal-backdrop.show-enter, .modal-backdrop.show-leave{
    opacity: 0;
  }

  .service-region-radio label{
    min-width: 100px;
  }
  .error_ex h1{
    font-size: 60px;
  }
  .error_ex .btn {
    margin-bottom: 20px;
  }
  .dataTables-filter-wrap{
    height: auto;
    min-height: 45px;
  }
  .dataTables-filter{
    position: relative;
  }
  /*
 色值配置
*/
  .login-box,.login-form.form-vertical,.normal-text,.slider-view,.slider-toggle, .footer, .container{
    background-color:#337ab7;
  }

  .login-form.form-vertical{
    border-color:#6d9fca;
  }
  /*
  导航菜单背景色
  */
  .slider-view > ul > li ul{
    background-color: #286090;
    border-color: #286090
  }
  .slider-view > ul > li, .slider-view > ul{
    border-color: #337ab7;
  }
  /*
    导航菜单文字
  */
  .slider-view > ul > li > a,.slider-view > ul > li ul li a, .footer{
    color: #fff;
  }
  .go-up{
    background-color: #fff;
  }

  /*
    样式优化
  */
  .creators label{
    min-width: 20%;
    margin-right: 0;
  }
  .slider-view{
    font-size: 14px;
    /*font-weight: bold;*/
  }
  .table td{
    vertical-align: middle;
    text-align: center;
  }
  select{
    border-radius: 4px;
  }
</style>
-->
