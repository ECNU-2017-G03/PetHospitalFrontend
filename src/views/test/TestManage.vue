<template>
  <div>
    <div class="page-body">
      <div class="card-component">
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
                label="考试时长">
            </el-table-column>
            <el-table-column
                label="操作">
              <template slot-scope = "scope">
                 <el-button type="primary" @click="enterTestPage(scope.row.quizId, scope.row.testName)">开始考试</el-button>
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
name: 'TestManage',
  data() {
    return {
      tableData: [{
        testId: '',
        quizId: '',
        testName: '',
        startTime: '',
        duration: '',
        sid: '',
        endTime: '',
      }]
    }
  },
created() {
    console.log("created")
    this.getTestReady()
  },
  computed: {
    actor() {
      return this.$store.state.actor
    }
  },
  methods: {
    enterTestPage: function (id, testName) {
      this.$router.push(`/testPage/${id}/${testName}`)
    },
    getTestReady: function () {
      this.axios.get('/api/test/enterTestFunc', {
        params: {
          id: '1c1edf7e-8423-4938-8ebc-ddbba58a0a4c',
        }
      }).then(res => {
        this.tableData = res.data['testInfo']
        for(let item of this.tableData) {
          item.testName = '虚拟宠物医院考试 ' + item.startTime.substring(0,10)
          var date = new Date(item.startTime)
          var str = date.getFullYear() + '-' + date.getMonth()
              + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
          item.startTime = str
        }
      })
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
</style>