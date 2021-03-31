<template>
  <div class="page-body">
    <div class="search-disease-form">
      <div class="form-title">病种学习</div>
      <el-form :model="diseaseForm" ref="diseaseForm" class="search-bar" :rules="rules">
        <el-form-item label="" prop="name">
          <el-input type="disease-name" v-model="diseaseForm.diseaseName" placeholder="请输入疾病名" maxlength="22"/>
        </el-form-item>
        <el-form-item class="search-button">
          <el-button type="primary" @click="searchDiseaseByName" class="search-button-submit" :loading="Searching">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="card-component">
        <el-row :gutter="0">
          <el-col :span="1" v-for="disease in diseaseList" :key="disease.id">
            <div class="button-card" @click="clickDiseaseName(disease.id)">
              {{disease.name}}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DiseaseStudy',
    data() {
      const checkDiseaseName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('疾病名称不能为空'))
        } else {
          callback()
        }
      }
      return {
        diseaseForm: {
          diseaseName: ''
        },
        Searching: false,
        diseaseList: {},
        rules: {
          diseaseName: [
            { validator: checkDiseaseName, trigger: ['blur']}
          ]
        }
      }
    },
    created() {
      if (this.$route.query.redirect) {
        this.$message.error('请登录后进行病种查询')
      }
      this.listDisease()
    },
    methods: {
      searchDiseaseByName: function() {
        this.Searching = true
        this.$refs['diseaseForm'].validate((valid) => {
          if (valid) {
            this.axios.get('api/learning/queryDisease', { params: { name: this.diseaseForm.diseaseName}})
              .then(res => {
                console.log(res)
                this.diseaseList = [ res.data.diseaseEntity ]
              })
              .catch(err => {
                console.log(err)
                this.diseaseList = {}
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
      clickDiseaseName: function(diseaseId) {
        this.$router.push(`/diseaseDetail/${diseaseId}`)
      },
      listDisease: function() {
        this.Searching = true
          this.axios
            .get('api/learning/listDisease', { params: { size: 20 }})
            .then(res => {
              console.log(res)
              this.diseaseList = res.data.diseaseEntityList
            })
            .catch(err => {
              console.log(err)
              this.$message.error('获取初始疾病列表失败')
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

.search-disease-form {
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

.card-component {
  margin-top: 5vh;
}

.button-card {
  background-color: white;
  display: inline-block;
  margin: auto;
  width: 360px;
  height: 20px;
  line-height: 20px;
  padding: 20px;
  font-size: larger;
  color: #34495e;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(5,50,93,0.03), 0 5px 15px rgba(0,0,0,0.07);
  transition-duration: 0.5s;
}

.button-card:hover {
  transform: translateY(-8px);
  cursor: pointer;
  box-shadow: 0 20px 50px rgba(5,50,93,0.08), 0 10px 30px rgba(0,0,0,0.12);
}
</style>