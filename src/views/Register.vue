<template>
  <div class="page-body">
    <div class="register-form">
      <div class="form-title">用户注册</div>
      <el-form :model="registerForm" ref="registerForm" class="form" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input type="name" v-model="registerForm.name" placeholder="请输入用户名" maxlength="22"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" show-password maxlength="18">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" placeholder="请确认密码" v-model="registerForm.confirmPassword" show-password maxlength="18">
          </el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary" @click="register" class="login-button-submit" :loading="registering">注册</el-button>
          <el-button @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      const checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          let nameVerifier = /^[a-zA-Z0-9_-\u4e00-\u9fa5]{4,20}$/
          if (nameVerifier.test(value)) {
            callback()
          } else {
            callback(new Error('用户名不合法，请输入4-20个字符，支持大小写中文'))
          }
        }
      }
      const checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          let passwordVerifier = /^.*(?=.{6,16})(?=.*[a-zA-Z]).*$/
          if (passwordVerifier.test(value)) {
            callback()
          } else {
            callback(new Error('输入6-16位密码，需包含英文字母'))
          }
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          name: '',
          password: '',
          confirmPassword: '',
        },
        registering: false,
        rules: {
          name: [
            { validator: checkName, trigger: ['blur', 'change'] }
          ],
          password: [
            { validator: checkPassword, trigger: ['blur', 'change'] }
          ],
          confirmPassword: [
            { validator: validatePassword, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      register: function() {
        this.registering = true
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            const r = {
              'name': this.registerForm.name,
              'password': this.registerForm.password,
            }
            this.axios.post('/api/user/register', r)
              .then(() => {
                this.$message.success('注册成功，请登录')
                this.$router.push('/login')
              })
              .catch(err => {
                const status = err.response.status
                if (status === 409) {
                  this.$message.error('用户名已存在，请更换用户名')
                } else {
                  this.$message.error('注册失败，请重试')
                }
              })
              .finally(() => {
                this.registering = false
              })
          } else {
            this.registering = false
          }
        })
      },
      login: function() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .page-body {
    text-align: center;
  }

  .register-form {
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
