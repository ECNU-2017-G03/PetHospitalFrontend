<template>
    <div class="page-body">
      <div class="card-component">
        <div class="card-component">
          <div class="card-outer">
            <div class="title card">考试列表</div>
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
                width="230">
            </el-table-column>
            <el-table-column
                prop="startTimeDisplay"
                label="开始时间">
            </el-table-column>
            <el-table-column
                prop="duration"
                label="考试时长">
            </el-table-column>
            <el-table-column
                label="操作">
              <template slot-scope = "scope">
                 <el-button type="primary" @click="enterTestPage(scope.row.quizId, scope.row.testName, scope.row.startTime)">开始考试</el-button>
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
        startTimeDisPlay:'',
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
    enterTestPage: function (id, testName, startTime) {
      let date = Date.now()
      let dateStart = Date.parse(startTime)
      console.log(date)
      console.log(dateStart)
      // if(date < dateStart) {
      //   this.$alert('未到考试时间，不能进入考试！', '提升', {
      //     confirmButtonText: '确定',
      //   });
      // } else {
        this.$router.push(`/testPage/${id}/${testName}`)
      //}
    },
    getTestReady: function () {
      this.axios.get('/api/test/enterTestFunc').then(res => {
        this.tableData = res.data['testInfo']
        for(let item of this.tableData) {
          item.testName = '虚拟宠物医院考试 ' + item.startTime.substring(0,10)
          item.startTimeDisplay = item.startTime.substring(0,10) + ' ' + item.startTime.substring(11, 19)
          item.duration =Math.ceil((new Date(item.endTime).getTime()- new Date(item.startTime) )/ (1000*60))
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
.title {
  text-align: center;
  font-size: x-large;
  line-height: 40px;
  height: 30px;
}
</style>
