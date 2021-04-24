<template>
  <div class="page-body">
    <div class="user-form">
      <div class="form-title">个人信息</div>
      <el-form :model="userForm" ref="userForm" class="form" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input type="name" v-model="name" placeholder="请输入用户名" maxlength="22" disabled/>
        </el-form-item>
        <el-form-item label="密码" prop="oldPassword">
          <el-input type="password" placeholder="请输入密码" v-model="userForm.oldPassword" show-password maxlength="18">
          </el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="newPassword">
          <el-input type="password" placeholder="请输入新密码" v-model="userForm.newPassword" show-password maxlength="18">
          </el-input>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="primary" @click="changePassword" :loading="Submitting">修改密码</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
    data() {
      const checkPassword = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error('密码不可为空'))
        } else if (value.length < 6 || value.length > 16) {
          callback(new Error('密码长度为6-16位'))
        } else {
          callback()
        }
      }
      const checkNewPassword = (rule, value, callback) => {
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
      return {
        name: '',
        userForm: {
          oldPassword: '',
          newPassword: '',
        },
        Submitting: false,
        rules: {
          oldPassword: [
            { validator: checkPassword, trigger: ['blur'] }
          ],
          newPassword: [
            { validator: checkNewPassword, trigger: ['blur', 'change'] }
          ],
        }
      }
    },
    created() {
      this.name = this.$store.state.userName
    },
    methods: {
      changePassword: function() {
        this.Submitting = true
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            this.axios.put('/api/user/changePassword', this.userForm)
                .then(res => {
                  console.log(res)
                  this.$message.success('修改密码成功')
                })
                .catch(err => {
                  console.log(err)
                  this.$message.error('修改密码失败')
                })
                .finally(() => {
                  this.Submitting = false
                })
          } else {
            this.Submitting = false
          }
        })
      },
      reset: function() {
        this.$refs['userForm'].resetFields();
        this.name = this.$store.state.userName
      }
    }
  }
</script>

<style scoped>
  .page-body {
    height: 100%;
    text-align: center;
  }

  .user-form {
    background-color: white;
    display: inline-block;
    margin-top: 12vh;
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

  .form-button {
    margin-top: 40px;
  }
</style>
