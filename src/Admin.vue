<template>
  <div class="container" v-el:container>
    <aside class="left-slider">
      <a href="" class="logo">后台管理</a>
      <div class="slider-view">
        <Slider></Slider>
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
  import {setMenus} from 'my_vuex/actions/slider'
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
      me.setMenus()
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
        auth: getAuth
      },
      actions: {
        logout,
        setMenus
      }
    }
  }
</script>
