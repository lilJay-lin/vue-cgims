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
          <li>
            <a href="">
              <img src="../assets/img/avatar.jpg" alt="" class="img-user">
              <strong>@john</strong>
            </a>
          </li>
          <li><a href="">退出</a></li>
          <li><a href="">登录</a></li>
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
  </div>
</template>
<script>
import Slider from './components/Slider.vue'
import {getSlider} from './vuex/getters/getters'
import {css} from './util/dom.js'
export default {
  components: {
    Slider
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
    }
  },
  vuex: {
    getters: {
      slider: getSlider
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
</style>
