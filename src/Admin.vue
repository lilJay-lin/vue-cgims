<template>
  <div class="container">
    <aside class="left-slider">
      <a href="" class="logo">后台管理</a>
      <div class="slider-view">
        <Slider :menus="slider.menus" :active="slider.active"></Slider>
      </div>
    </aside>
    <header class="top-nav">
      <div class="nav-menu">
        <ul class="nav">
          <li>
            <a href="">
              <img src="../static/img/avatar.jpg" alt="" class="img-user">
              <strong>@john</strong>
            </a>
          </li>
          <li><a href="">退出</a></li>
          <li><a href="">登录</a></li>
        </ul>
      </div>
    </header>
    <aside class="right-content">
      <router-view></router-view>
    </aside>
    <footer>
      <div class="footer">
        底部fixed
      </div>
    </footer>
  </div>
</template>

<script>
import Slider from './components/Slider.vue'
import {getSlider} from './vuex/getters'
export default {
  components: {
    Slider
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
