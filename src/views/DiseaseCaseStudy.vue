<template>
  <div class="page-body">
    <div class="search-disease-case-form">
      <div class="form-title">病例学习</div>
      <el-form :model="diseaseCaseForm" ref="diseaseCaseForm" class="search-bar" :rules="rules">
        <el-form-item label="" prop="name">
          <el-input type="disease-case-name" v-model="diseaseCaseForm.diseaseCaseName" placeholder="请输入病例名字" maxlength="22"/>
        </el-form-item>
        <el-form-item class="search-button">
          <el-button type="primary" @click="searchDiseaseCaseByName" class="search-button-submit" :loading="Searching">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="card-component">
        <el-row :gutter="20">
          <el-col :span="12" v-for="diseaseCase in diseaseCaseList" :key="diseaseCase.id">
            <div class="button-card" @click="clickDiseaseCaseName(diseaseCase.id)">
              {{diseaseCase.name}}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiseaseCaseStudy',
  data() {
    const checkDiseaseCaseName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('病例名称不能为空'))
      } else {
        callback()
      }
    }
    return {
      diseaseCaseForm: {
        diseaseCaseName: ''
      },
      Searching: false,
      diseaseCaseList: [],
      rules: {
        diseaseCaseName: [
          { validator: checkDiseaseCaseName, trigger: ['blur']}
        ]
      }
    }
  },
  created() {
    if (this.$route.query.redirect) {
      this.$message.error('请登录后进行病例查询')
    }
    this.listDiseaseCase()
  },
  methods: {
    searchDiseaseCaseByName: function() {
      this.Searching = true
      this.$refs['diseaseCaseForm'].validate((valid) => {
        if (valid) {
          this.axios.get('api/learning/queryDiseaseCase', { params: { name: this.diseaseCaseForm.diseaseCaseName}})
              .then(res => {
                console.log(res)
                this.diseaseCaseList = [ res.data.diseaseCaseEntity ]
              })
              .catch(err => {
                console.log(err)
                this.diseaseCaseList = []
                this.$message.error('查询失败')
              })
              .finally(() => {
                this.Searching = false
              })
        } else {
          this.Searching = false
        }
      })
    },
    clickDiseaseCaseName: function(diseaseCaseId) {
      this.$router.push(`/diseaseCaseDetail/${diseaseCaseId}`)
    },
    listDiseaseCase: function() {
      this.Searching = true
      this.axios
          .get('api/learning/listDiseaseCase', { params: { size: 20 }})
          .then(res => {
            console.log(res)
            this.diseaseCaseList = res.data.diseaseCaseEntityList
          })
          .catch(err => {
            console.log(err)
            this.$message.error('获取初始病例列表失败')
          })
          .finally(() => {
            this.Searching = false
          })
    }
  }
}
</script>

<style scoped>
.page-body {
  text-align: center;
  display: flow-root;
}

.form-title {
  text-align: center;
  font-size: 30px;
  color: #303133;
  padding: 20px;
}

.search-disease-case-form {
  background-color: white;
  display: inline-block;
  margin-top: 15vh;
  width: 400px;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgb(50 50 93 / 3%), 0 5px 15px rgb(0 0 0 / 7%);
}

.search-bar {
  margin: auto;
  height: 100%;
  display: inline-flex;
}

.search-button {
  margin-left: 20px;
}

.card-component {
  margin-top: 5vh;
}

.button-card {
  background-color: white;
  display: inline-block;
  margin: 10px 0;
  width: calc(100% - 40px);
  height: 20px;
  line-height: 20px;
  padding: 20px;
  font-size: larger;
  color: #34495e;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(5,50,93,0.02), 0 5px 15px rgba(0,0,0,0.05);
  transition-duration: 0.5s;
}

.button-card:hover {
  transform: translateY(-8px);
  cursor: pointer;
  box-shadow: 0 20px 50px rgba(5,50,93,0.05), 0 10px 30px rgba(0,0,0,0.08);
}
</style>
