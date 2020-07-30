<template>
  <div class="login" v-loading="loading">
    <div class="login-wamp">
      <div class="title">
        <span>学生审核管理系统</span>
      </div>
      <div class="username">
        <label for="">用户名：</label>
        <input type="text" class="userCode" v-model.trim="user.username">
      </div>
      <div>
        <label for="">密码：</label>
        <input type="password" class="password" v-model.trim="user.password">
      </div>
      <div>
        <label for=""></label>
        <span class="submitBtn" @click="login">登录</span>
      </div>
    </div>
  </div>
</template>
<script>
  // eslint-disable-next-line no-unused-vars
  import { userQueryMenus, userLogin } from 'api/main'
  export default {
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      async login () {
        if (!this.user.username) {
          this.$message.error('请输入用户名')
          return false
        }
        if (!this.user.password) {
          this.$message.error('请输入密码')
          return false
        }
        const data = {
          userCode: this.user.username,
          password: this.user.password
        }
        this.loading = true
        let res = await userLogin(data)
        this.loading = false
        if (res.code == 0) {
          sessionStorage.setItem("token", res.data)
          this.$router.push({
            path: "/layout/userManage"
          })
        } else {
          this.$message.error(res.message)
        }
      }
    }
  }
</script>
<style scoped>
  body{
    background:url("~@/assets/line.jpg");
    background-size:100% auto;
  }
  .login{
    width:100vw;
    height: 100vh;
    background: url("~@/assets/login.jpg") center top / 100% no-repeat !important;
    background-size: cover;
  }
  .login-wamp{
    width:450px;
    height:235px;
    background-color: #fff;
    position: absolute;
    right:200px;
    top:50%;
    margin-top:-200px;
    border-radius: 10px;
  }
  .login-wamp .title{
    text-align: center;
    font-weight: 600;
    font-size: 26px;
  }
  .login-wamp>div{
    margin-top:20px;
  }
  .login-wamp label{
    display: inline-block;
    width:70px;
    margin-left:50px;
  }
  .login-wamp input{
    border-radius: 5px;
    height:30px;
    border: 1px solid #999;
    width:230px;
    padding-left:5px;
  }
  .login-wamp input.verCode{
    width:115px;
  }
  .login-wamp .sendVerCode{
    height: 31px;
    width:100px;
    border-radius: 3px;;
    border:1px solid #999;
    outline: none;
    cursor: pointer;
    margin-left:10px;
    text-align: center;
  }
  .login-wamp .submitBtn{
    display: inline-block;
    width:240px;
    height:35px;
    text-align: center;
    background-color: #2969df;
    color:#fff;
    line-height: 35px;
    border-radius: 3px;
  }
  .login-wamp .submitBtn:hover{
    cursor: pointer;
    background-color: #2969bf;
  }
</style>