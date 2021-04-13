<template>
    <div class="page-body">
      <div class="card-component">
        <div class="card-component">
          <div class="card-outer">
            <div class="title card">考试记录</div>
          </div>
        <div class="card-outer">
          <div class="card">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
              <el-table-column
                  prop="testName"
                  label="考试名称"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="startTime"
                  label="开始时间">
              </el-table-column>
              <el-table-column
                  prop="duration"
                  label="考试时长(分钟)">
              </el-table-column>
              <el-table-column
                  prop="costTime"
                  label="实际用时(分钟)">
              </el-table-column>
              <el-table-column
                  prop="score"
                  label="得分">
              </el-table-column>
              <el-table-column
                  prop="total"
                  label="总分">
              </el-table-column>
              <el-table-column
                  label="操作">
                <template slot-scope = "scope">
                  <el-button type="primary" @click="enterTestPage(scope.row.quizId, scope.row.testName, scope.row.snapShot)">查看记录</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestHistory",
  data() {
    return {
      tableData: [{
        recordId: '',
        testId: '',
        quizId: '',
        testName: '',
        startTime: '',
        duration: '',
        sid: '',
        total: '',
        score: '',
        endTime: '',
        costTime: '',
        submitTime: '',
        snapShot: '',
      }]
    }
  },
  created() {
    this.getTestRecord()
  },
  methods: {
    enterTestPage: function (recordId, testName, snapShot) {
      console.log(recordId)
      console.log(testName)
      console.log(snapShot)
      var shot = JSON.stringify(snapShot)
      this.$router.push(`/testPastView/${recordId}/${testName}/`+encodeURIComponent(shot))
    },
    getTestRecord: function() {
      this.axios.get('/api/test/testRecord')
      .then(res => {
        console.log(res.data)
        this.tableData = res.data['records']
        console.log(res.data['records'].length)
        for(let i = 0; i < this.tableData.length; i++) {
          let item = this.tableData[i]
          item.duration =Math.ceil((new Date(item.endTime).getTime() - new Date(item.startTime).getTime())/(1000*60))
          item.costTime =Math.ceil((new Date(item.submitTime).getTime() - new Date(item.startTime).getTime())/(1000*60))
          item.testName = '虚拟宠物医院考试 ' + item.startTime.substring(0,10)
          console.log(item.duration)
          console.log(item.costTime)
          console.log(item.testName)
        }
      })
}
  },
}
</script>

<style scoped>
.card-component {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
}
.title {
  text-align: center;
  font-size: x-large;
  line-height: 60px;
  height: 40px;
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
</style>