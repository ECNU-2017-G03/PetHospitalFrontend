<template>
  <div class="page-body">
    <div class="card-component" v-loading="loading">
      <div class="card-outer">
        <div class="title card">病例详情</div>
      </div>
      <div class="two-card-component info-img" >
        <div class="one-in-two-card">
          <div class="one-card-outer card-outer">
            <div class="one-card card">
              <div class="card-title">宠物信息</div>
              <div class="list-entry-row">
                <div class="list-entry-col-key">种类</div>
                <div class="list-entry-col-value">{{petInfo.type}}</div>
              </div>
              <div class="list-entry-row">
                <div class="list-entry-col-key">亚种</div>
                <div class="list-entry-col-value">{{petInfo.species}}</div>
              </div>
              <div class="list-entry-row">
                <div class="list-entry-col-key">性别</div>
                <div class="list-entry-col-value">{{petInfo.gender === '0' ? '雄性' : '雌性'}}</div>
              </div>
              <div class="list-entry-row">
                <div class="list-entry-col-key">年龄（年）</div>
                <div class="list-entry-col-value">{{petInfo.age}}</div>
              </div>
              <div class="list-entry-row">
                <div class="list-entry-col-key">重量（千克）</div>
                <div class="list-entry-col-value">{{petInfo.weight}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="one-in-two-card">
          <div class="one-card-outer card-outer">
            <div class="one-card card">
              <el-image :src="Object.keys(diseaseCase).length === 0 ? '' : diseaseCase.picture[0]" fit="cover" class="pet-img" slot="error"></el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="card-component">
        <div class="card-outer">
          <div class="card">
            <div class="card-title">病例描述</div>
<!--            <div class="list-entry-row">-->
<!--              <div class="list-entry-col-key">病种</div>-->
<!--              <div v-for="diseaseName in diseaseNameList" :key="diseaseName" class="list-entry-col-value">{{diseaseName}}</div>-->
<!--            </div>-->
            <div class="disease-case-description">{{Object.keys(diseaseCase).length === 0 ? null : diseaseCase.description}}</div>
            <div class="disease-line">
              <span class="disease-tag" v-for="diseaseName in diseaseNameList" :key="diseaseName">{{diseaseName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="two-card-component picture-video">
        <div class="one-in-two-card">
          <div class="one-card-outer card-outer">
            <div class="one-card card">
              <div class="img-scroll-container">
                <el-image v-for="picUrl in diseaseCase.picture" :key="picUrl" :src="picUrl"></el-image>
              </div>
            </div>
          </div>
        </div>
        <div class="one-in-two-card">
          <div class="one-card-outer card-outer">
            <div class="one-card card">
              <video class="video" controls :src="diseaseCase.video"></video>
            </div>
          </div>
        </div>
      </div>
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
      diseaseNameList: [],
      petInfo: {},
      loading: false,
    }
  },
  created() {
    this.queryDiseaseCase()
  },
  methods: {
    queryDiseaseCase: function () {
      this.loading = true
      this.axios
        .get('/api/learning/queryDiseaseCase', { params: { id: this.diseaseCaseId }})
        .then(res => {
          console.log(res)
          this.diseaseCase = res.data.diseaseCaseEntity
          this.diseaseNameList = res.data.diseaseNameList
          this.petInfo = JSON.parse(res.data.diseaseCaseEntity.petInfo)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('获取病例信息失败')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

.page-body {
  min-height: calc(100vh - 120px);
}

.card-component {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
}

.card-outer {
  padding: 20px;
}

.card {
  background-color: white;
  padding: 20px;
  color: #34495e;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(5,50,93,0.02), 0 5px 20px rgba(0,0,0,0.04);
  transition-duration: 0.5s;
  line-height: 1.5em;
  overflow: hidden;
}

.card-title {
  font-size: x-large;
  text-align: center;
  margin-bottom: 20px;
  line-height: 2em;
}

.title {
  text-align: center;
  font-size: xx-large;
  line-height: 60px;
  height: 60px;
}

.two-card-component {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
}

.info-img {
  height: 360px;
}

.picture-video {
  height: 450px;
}

.one-in-two-card {
  width: 50%;
  flex-shrink: 0;
}

.one-card-outer {
  height: calc(100% - 40px); /*配合card使用*/
}

.one-card {
  height: calc(100% - 40px); /*配合card使用*/
}

.list-entry-row {
  display: flex;
  margin-top: 10px;
  line-height: 2em;
  border-bottom: 1px #eee dashed;
}

.list-entry-col-key {
  font-weight: bold;
  width: 100px;
  margin-left: 10%;
  color: #666;
}

.list-entry-col-value {
  margin-left: 30px;
  color: #303133;
}

.disease-line {
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0 20px;
}

.disease-tag {
  margin: 0 10px;
  background: #aacdff47;
  padding: 0 10px;
  line-height: 32px;
  font-size: 12px;
  color: #2f93f7;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  white-space: nowrap;
  display: inline-block;
}

.disease-case-description {
  text-align: left;
  font-size: 15px;
  color: #303133;
  padding: 10px;
  text-indent: 2em;
}

.pet-img {
  width: 100%;
  height: 100%;
}

.img-scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.video {
  background: #222222;
  width: 100%;
  height: 100%;
}

</style>
