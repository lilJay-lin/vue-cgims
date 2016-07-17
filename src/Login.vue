<template>
  <div class="login-box">
    <div class="login">
      <form class="login-form form-vertical" action="index.html">
        <div class="control-group normal-text">
          <h3>后台系统登录</h3>
        </div>
        <div class="control-group">
          <div class="controls">
            <div class="main-input-box">
              <span class="add-on bg-lg"><i class="icon-user"></i></span><input type="text" placeholder="请输入用户名">
            </div>
          </div>
        </div>
        <div class="control-group">
          <div class="controls">
            <div class="main-input-box">
              <span class="add-on bg-ly"><i class="icon-lock"></i></span><input type="password" placeholder="请输入密码">
            </div>
          </div>
        </div>
        <div class="form-actions">
          <span class="pull-left"><a href="#" class="flip-link btn btn-info" id="to-recover">忘记密码?</a></span>
          <span class="pull-right"><a type="submit" href="index.html" class="btn btn-success">登录</a></span>
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
export default {
}
</script>
