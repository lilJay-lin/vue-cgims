<template>
  <div class="login-box">
    <div class="login">
      <h3>陈工家具服务</h3>
      <form class="login-form form-vertical">
        <div class="control-group normal-text">
          <h3>后台系统登录</h3>
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
              <input type="password" placeholder="请输入密码" v-el:password @keydown.enter="onUserLogin"/>
            </div>
          </div>
        </div>
        <div class="login-btn">
          <a href="javascript:void(0)" class="btn btn-success" @click="onUserLogin">登录</a>
        </div>
<!--        <div class="form-actions">
          <span class="pull-left" style="display: none">
            <a href="javascript:void(0)" class="flip-link btn btn-info" id="to-recover">忘记密码?</a>
          </span>
          <span class="pull-right">
            <a href="javascript:void(0)" class="btn btn-success" @click="onUserLogin">登录</a>
          </span>
        </div>-->
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
          let url = '/admin'
          let permission = this.auth.permission
          url += permission.userManager ? '/order' : permission.userOrderManager ? '/user/order' : ''
          this.$router.go(url)
        }
      }
    }
  }
</script>
<style>
  .login-btn{
    margin-top: 15px;
    text-align: center;
  }
  .login-btn a{
    width: 200px;
  }
  .login > h3{
    text-align: center;
    color: #fff;
  }
</style>
