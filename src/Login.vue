<template>
  <div class="login-box">
    <div class="login">
      <form class="login-form form-vertical">
        <div class="control-group normal-text">
          <h3>后台系统登录{{auth.login}}</h3>
        </div>
        <div class="control-group">
          <div class="controls">
            <div class="main-input-box">
              <span class="add-on bg-lg"><i class="icon-user"></i></span>
              <input type="text" placeholder="请输入用户名" v-el:login_name/>
            </div>
          </div>
        </div>
        <div class="control-group">
          <div class="controls">
            <div class="main-input-box">
              <span class="add-on bg-ly"><i class="icon-lock"></i></span>
              <input type="password" placeholder="请输入密码" v-el:password/>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <span class="pull-left">
            <a href="javascript:void(0)" class="flip-link btn btn-info" id="to-recover">忘记密码?</a>
          </span>
          <span class="pull-right">
            <a href="javascript:void(0)" class="btn btn-success" @click="onUserLogin">登录</a>
          </span>
        </div>
      </form>
      <!--<form action="#" class="recover-form form-vertical">
          <p class="normal-text">Enter your e-mail address below and we will send you instructions how to recover a password.</p>

          <div class="controls">
              <div class="main-input-box">
                  <span class="add-on bg-lo"><i class="icon-envelope"></i></span><input type="text" placeholder="邮箱地址">
              </div>
          </div>

          <div class="form-actions">
              <span class="pull-left"><a href="#" class="flip-link btn btn-success" id="to-login">« 返回登录</a></span>
              <span class="pull-right"><a class="btn btn-info">发送</a></span>
          </div>
      </form>-->
    </div>
  </div>
</template>
<script>
  import {login} from 'my_vuex/actions/auth'
  import {getAuth} from 'my_vuex/getters/auth'
  export default {
    computed: {
      isLogin: function () {
        return this.auth.login
      }
    },
    methods: {
      onUserLogin: function () {
        let els = this.$els
        this.login({
          loginName: els.login_name.value.trim(),
          password: els.password.value.trim()
        })
      }
    },
    route: {
      data () {
        console.log(this.auth.login)
      }
    },
    vuex: {
      getters: {
        auth: getAuth
      },
      actions: {
        login
      }
    },
    watch: {
      isLogin: function (login) {
        if (login) {
          this.$router.go('/admin')
        }
      }
    }
  }
</script>
