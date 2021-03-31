<template>
  <div class="page-body">
    <div class="disease-case-detail">
      <div class="disease-case-detail-name">{{diseaseCase.name}}</div>
      <div class="disease-case-detail-description">{{diseaseCase.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiseaseCaseDetail',
  data() {
    return {
      diseaseCaseId: this.$route.params.diseaseCaseId,
      diseaseCase: {},
    }
  },
  created() {
    this.queryDiseaseCase()
  },
  methods: {
    queryDiseaseCase: function () {
      this.axios
        .get('/api/learning/queryDiseaseCase', { params: { id: this.diseaseCaseId }})
        .then(res => {
          console.log(res)
          this.diseaseCase = res.data.diseaseCaseEntity
        })
        .catch(err => {
          console.log(err)
          this.$message.error('获取病例信息失败')
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

.disease-case-detail {
  background-color: white;
  display: inline-block;
  margin-top: 15vh;
  width: 400px;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgb(50 50 93 / 3%), 0 5px 15px rgb(0 0 0 / 7%);
}

.disease-case-detail-name {
  text-align: center;
  font-size: 30px;
  color: #303133;
  padding: 20px;
}

.disease-case-detail-description {
  text-align: justify;
  font-size: 12px;
  color: #303133;
  padding: 10px;
}

</style>