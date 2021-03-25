<template>
  <div class="page-body">
    <div class="login-form">
      <div class="form-title">用户登录</div>
      <el-form :model="loginForm" ref="loginForm" class="form" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input type="name" v-model="loginForm.name" placeholder="请输入用户名" maxlength="22"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" show-password maxlength="18">
          </el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary" @click="login" class="login-button-submit" :loading="LoggingIn">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'Login',
    data() {
      const checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不可为空'))
        } else {
          callback()
        }
      }
      const checkPassword = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error('密码不可为空'))
        } else if (value.length < 6 || value.length > 20) {
          callback(new Error('密码长度为6-20位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          name: '',
          password: '',
        },
        LoggingIn: false,
        rules: {
          name: [
            { validator: checkName, trigger: ['blur'] }
          ],
          password: [
            { validator: checkPassword, trigger: ['blur']}
          ]
        }
      }
    },
    created() {
      if (this.$route.query.redirect) {
        this.$message.error('请登录后进行学习')
      }
    },
    methods: {
      ...mapMutations(['saveToken']),
      login: function() {
        this.LoggingIn = true
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.axios.post('/api/user/login', this.loginForm)
              .then(res => {
                console.log(res)
                const data = res.data
                this.saveToken(data.token)
              })
              .catch(err => {
                console.log(err)
                this.$message.error('登录失败')
              })
              .finally(() => {
                this.LoggingIn = false
              })
          } else {
            this.LoggingIn = false
          }
        })
      },
      register: function() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  .page-body {
    height: 100%;
    text-align: center;
  }

  .login-form {
    background-color: white;
    display: inline-block;
    margin-top: 15vh;
    width: 400px;
    padding: 20px 40px;
    border-radius: 5px;
    box-shadow: 0 10px 30px rgb(50 50 93 / 3%), 0 5px 15px rgb(0 0 0 / 7%);
  }

  .form-title {
    text-align: center;
    font-size: 30px;
    color: #303133;
    padding: 20px;
  }

  .form {
    margin-top: 20px;
  }

  .login-button {
    margin-top: 40px;
  }

</style>