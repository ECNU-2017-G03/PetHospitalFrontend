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
                  width="220">
              </el-table-column>
              <el-table-column
                  prop="startTimeDisplay"
                  label="开始时间"
                  width="160">
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
            <el-dialog
                title="试卷记录"
                :visible.sync="dialogLoad"
                width="30%"
            >
              <span>{{loadMessage}}</span>
              <span slot="footer" class="dialog-footer">
              <el-button v-if="loadMessage === '试卷记录获取失败'" type="primary" @click="retryLoad">重试</el-button>
              <el-button @click="backToMainPage">取消</el-button>
            </span>
            </el-dialog>
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
      loadMessage:'',
      dialogLoad: false,
      retryLoadCount: 0,
      tableData: [
      //     {
      //   recordId: '',
      //   testId: '',
      //   quizId: '',
      //   testName: '',
      //   startTime: '',
      //   duration: '',
      //   sid: '',
      //   total: '',
      //   score: '',
      //   endTime: '',
      //   costTime: '',
      //   submitTime: '',
      //   snapShot: '',
      // }
      ]
    }
  },
  created() {
    this.getTestRecord()
  },
  methods: {
    backToMainPage: function() {
      this.$router.push('/main')
    },
    retryLoad: function() {
      this.retryLoadCount+= 1
      if(this.retryLoadCount <= 3) {
        this.getTestRecord()
        const loading = this.$loading({
          lock: true,
          text: '重新获取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 5000);
      }else {
        this.loadMessage = '重复加载次数超过限制，加载失败'
      }
    },
    enterTestPage: function (recordId, testName, snapShot) {
      let shot = JSON.stringify(snapShot)
      this.$router.push(`/testPastView/${recordId}/${testName}/`+encodeURIComponent(shot))
    },
    getTestRecord: function() {
      this.axios.get('/api/test/testRecord')
      .then(res => {
        this.dialogLoad = false
        this.tableData = res.data['records']
        for (let i = 0; i < this.tableData.length; i++) {
          let item = this.tableData[i]
          item.duration = Math.ceil((new Date(item.endTime).getTime() - new Date(item.startTime).getTime())/(1000*60))
          item.costTime = Math.ceil((new Date(item.submitTime).getTime() - new Date(item.startTime).getTime())/(1000*60))
          item.testName = '虚拟宠物医院考试 ' + item.startTime.substring(0,10)
          item.startTimeDisplay = (new Date(item.startTime)).toLocaleString()
        }
      })
      .catch(err => {
        console.log(err)
        this.loadMessage = '试卷记录获取失败'
        this.dialogLoad = true
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
