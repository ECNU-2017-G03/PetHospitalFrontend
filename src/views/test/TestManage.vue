<template>
  <div class="page-body">
    <div class="card-component">
      <div class="card-component">
        <div class="card-outer">
          <div class="title card">考试列表</div>
        </div>
        <div class="card-outer">
          <div class="card" v-loading="loading">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
              <el-table-column
                  prop="testName"
                  label="考试名称"
                  width="230">
              </el-table-column>
              <el-table-column
                  prop="startTimeDisplay"
                  label="开始时间">
              </el-table-column>
              <el-table-column
                  prop="duration"
                  label="考试时长(分钟)">
              </el-table-column>
              <el-table-column
                  label="操作">
                <template slot-scope = "scope">
                   <el-button type="primary" size="small" @click="enterTestPage(scope.row.quizId, scope.row.testName, scope.row.startTime)">开始考试</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog
                title="测试记录"
                :visible.sync="dialogLoad"
                width="30%"
            >
              <span>{{loadMessage}}</span>
              <span slot="footer" class="dialog-footer">
              <el-button v-if="loadMessage === '测试记录获取失败'" type="primary" @click="retryLoad">重试</el-button>
              <el-button @click="backToMainPage">取消</el-button>
            </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
    <div class="card test-record-button" @click="toHistory">历史考试</div>
  </div>
</template>

<script>
export default {
name: 'TestManage',
  data() {
    return {
      tableData: [],
      loadMessage: '',
      dialogLoad: false,
      retryLoadCount: 0,
      loading: false
    }
  },
created() {
    this.getTestReady()
  },
  computed: {
    actor() {
      return this.$store.state.actor
    }
  },
  methods: {
    enterTestPage: function (id, testName, startTime) {
      let date = new Date()
      let dateStart = Date.parse(startTime)
      if(date < dateStart) {
        this.$alert('未到考试时间，不能进入考试！', '提升', {
          confirmButtonText: '确定',
        });
      } else {
        let r = this.checkTestValid(id)
        if(r) {
          this.$router.push(`/testPage/${id}/${testName}`)
        } else {
          console.log("test done")
        }
      }
    },
    backToMainPage: function() {
      this.$router.push('/main')
    },
    retryLoad: function() {
      this.retryLoadCount+= 1
      if(this.retryLoadCount <= 3) {
        this.getTestReady()
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
    checkTestValid: async function(quizId) {
      let result = false
      await this.axios.get('/api/test/checkTestValid', {
        params: {
          id: quizId,
        }
      }).then(res => {
        result = res.data
        console.log(res.data)
      })
      console.log(result)
      return result
    },
    getTestReady: function () {
      this.loading = true
      this.axios.get('/api/test/enterTestFunc').then(res => {
        this.tableData = res.data['testInfo']
        console.log(res.data)
        for(let item of this.tableData) {
          item.testName = '虚拟宠物医院考试 ' + item.startTime.substring(0,10)
          item.startTimeDisplay = (new Date(item.startTime)).toLocaleString()
          // item.startTimeDisplay = item.startTime.substring(0,10) + ' ' + item.startTime.substring(11, 19)
          item.duration =Math.ceil((new Date(item.endTime).getTime()- new Date(item.startTime) )/ (1000*60))
        }
      })
      .catch(err => {
        console.log(err)
        this.loadMessage = '测试记录获取失败'
        this.dialogLoad = true
      })
      .finally(() => {
        this.loading = false
        })
    },
    toHistory: function () {
      this.$router.push('/testHistory')
    }
  }
}
</script>

<style scoped>
.card-component {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
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
.button-card {
  background-color: white;
  display: inline-block;
  width: 500px;
  max-width: 250px;
  margin: 30px 40px;
  padding: 30px;
  font-size: larger;
  color: #34495e;
  height: 400px;
  line-height: 80px;
  border-radius: 5px;
  box-shadow: 0 10px 30px rgba(5,50,93,0.03), 0 5px 15px rgba(0,0,0,0.07);
  transition-duration: 0.5s;
}
.title {
  text-align: center;
  font-size: x-large;
  line-height: 40px;
  height: 30px;
}

.test-record-button {
  position: absolute;
  top: 200px;
  right: 20px;
  font-size: small;
  cursor: pointer;
  z-index: 100;
}

.test-record-button:hover {
  box-shadow: 0 20px 50px rgba(5,50,93,0.08), 0 10px 30px rgba(0,0,0,0.12);
}
</style>
