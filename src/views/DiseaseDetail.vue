<template>
  <div class="page-body">
    <div class="disease-detail">
      <div class="disease-detail-name">{{disease.name}}</div>
      <div class="disease-detail-description">{{disease.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiseaseDetail',
  data() {
    return {
      diseaseId: this.$route.params.diseaseId,
      disease: {},
    }
  },
  created() {
    this.queryDisease()
  },
  methods: {
    queryDisease: function () {
      this.axios
        .get('/api/learning/queryDisease', { params: { id: this.diseaseId }})
        .then(res => {
          console.log(res)
          this.disease = res.data.diseaseEntity
        })
        .catch(err => {
          console.log(err)
          this.$message.error('获取病种信息失败')
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

.disease-detail {
  background-color: white;
  display: inline-block;
  margin-top: 15vh;
  width: 400px;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgb(50 50 93 / 3%), 0 5px 15px rgb(0 0 0 / 7%);
}

.disease-detail-name {
  text-align: center;
  font-size: 30px;
  color: #303133;
  padding: 20px;
}

.disease-detail-description {
  text-align: justify;
  font-size: 12px;
  color: #303133;
  padding: 10px;
}

</style>