<template>
  <div class="page-body">
    <div class="card-component">
      <div class="card-outer">
        <div class="title card">{{ this.testName }}</div>
      </div>
      <!--todo: 加考试剩余时间 -->
      <div class="card-right-side">
        <el-collapse >
          <el-collapse-item title="查看考试进度" name="2">
            <div class="title-time">
              <span>剩余时间</span>
            </div>
            <FlipDown :endDate="endTime" @timeUp="exceedToSubmit"></FlipDown>
            <div class="title-time">
              <span>做题进度</span>
            </div>
            <div class="progress">
              <el-progress type="circle" :percentage="percentage"></el-progress>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="card-outer">
        <div class="card">
          <el-form :model="testPaper">
            <template v-for="(item,index) in testPaper.questions">
              <el-form-item :label="`Q ${index+1}`" :key="index">
                <div class="question">{{item.content}}</div>
                <el-radio @change="changeProgress" v-model="testAnswer.questions[index].choice" label="A">{{item.options.A}}</el-radio>
                <el-radio @change="changeProgress" v-model="testAnswer.questions[index].choice" label="B">{{item.options.B}}</el-radio>
                <el-radio @change="changeProgress" v-model="testAnswer.questions[index].choice" label="C">{{item.options.C}}</el-radio>
              </el-form-item>
            </template>
            <el-form-item>
              <div class= "buttonSubmit">
                <el-button type="primary" @click="submitTest">交卷</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100"></el-backtop>
            <el-dialog
              title="试卷提交"
              :visible.sync="dialogVisible"
              width="30%"
              >
            <span>{{message}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" v-if="message==='提交成功！' " @click="goToHistory">确定</el-button>
              <el-button v-if="message==='提交失败！'" type="primary" @click="retry">重试</el-button>
            </span>
          </el-dialog>
          <el-dialog
              title="试卷提交"
              :visible.sync="dialogSubmit"
              width="30%"
          >
            <span>{{message}}</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogSubmit = false">取消</el-button>
            <el-button type="primary"  @click="realTry">确定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlipDown from 'vue-flip-down';
export default {
  name: "TestPage",
  data() {
    return {
      totalQuestion:'',
      answeredQuestion:'',
      retryCount: 0,
      message:'提交失败',
      dialogVisible: false,
      id: this.$route.params.id,
      testName: this.$route.params.testName,
      realSubmit: false,
      dialogSubmit: false,
      testAnswer:{
        questions:[{
          choice:'',
          qid:'',
          score:'',
        }],
        quizId: '',
        testId: '',
        startTime:'',
        endTime:'',
      },
      percentage: 50,
      testPaper: {
        questions: [
        //     {
        //   answer:'',
        //   content:'',
        //   disease:'',
        //   id:'',
        //   options:{
        //     A:'',
        //     B:'',
        //     C:'',
        //   },
        //   score: 5,
        // }
        ],
        quizId: '',
        testId: '',
        startTime: '',
        endTime: '',
    },
    endTime:'',
  }},
  created() {
    this.endTime = Date.parse("2022-09-02 10:11:12")
    this.axios.get('/api/test/enterTest', {
      params: {
        id: this.id,
      }
    }).then(res => {
      console.log(res.data)
      this.testPaper = res.data
      this.testAnswer = {
        questions:[],
        quizId: '',
        testId: '',
        startTime: '',
        endTime: '',
      }
      this.endTime = Date.parse(this.testPaper.endTime)
      console.log(this.endTime)
      this.totalQuestion = this.testPaper.questions.length
      this.percentage = 0
      this.answeredQuestion = 0
      this.testAnswer.testId = this.testPaper.testId
      this.testAnswer.startTime = this.testPaper.startTime
      this.testAnswer.endTime = this.testPaper.endTime
      for (let item of this.testPaper.questions) {
        let q = {
          choice: '',
          qid: item.id,
          score: item.score,
        }
        this.testAnswer.questions.push(q)
      }
    })
  },
  components: {FlipDown},
  methods:{
    cancel() {
      this.realSubmit = false
      this.dialogSubmit = false
    },
    realTry() {
      this.realSubmit = true
      this.submitTest()
      this.dialogSubmit = false
    },
    exceedToSubmit() {
      console.log("excceeeeeeed")
      this.submitTest()
      const loading = this.$loading({
        lock: true,
        text: '超时未提交，自动提交',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    goToHistory() {
      this.$router.push('/testHistory')
    },
    retry: function () {
      this.retryCount += 1
      if(this.retryCount < 3) {
        this.submitTest()
        const loading = this.$loading({
          lock: true,
          text: '重新提交中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      } else {
        this.message = '重复提交次数超过限制，提交失败'
      }
    },
    changeProgress: function() {
      console.log(this.answeredQuestion)
      let count = 0
      for (let i = 0; i < this.testAnswer.questions.length; i++) {
        if (this.testAnswer.questions[i].choice !== '') {
          count+= 1
        }
      }
      this.answeredQuestion = count
      this.percentage = Math.round(this.answeredQuestion / this.totalQuestion * 100)
    },
    submitTest: function() {
      if (this.answeredQuestion < this.totalQuestion && this.realSubmit === false) {
        console.log("enter if")
        this.dialogSubmit = true
        this.message = "仍有题目未作答，是否确认提交？"

      } else {
        if (this.realSubmit === true) {
          for (let i = 0; i < this.testAnswer.questions.length; i++) {
            if (this.testAnswer.questions[i].choice === '') {
              this.testAnswer.questions[i].choice = 'None'
            }
          }
        }
        this.testAnswer.quizId = this.testPaper.quizId
        this.axios.post('/api/test/submitTest', this.testAnswer)
            .then(res => {
              console.log(res.data)
              this.dialogVisible = true
              if (res.data === 'OK') {
                this.message = '提交成功！'
              } else {
                this.message = '提交失败！'
              }
            })
      }
      console.log(this.testAnswer)
      },
    // syncSystemTime() {
    //   this.timeTimer = setInterval(() => {
    //     this.syncData.systemTime = new Date((new Date()).getTime() + this.syncData.timeDiff)
    //   }, 50)
    // },
    clearTimeTimer() {
      if (this.timeTimer) {
        clearInterval(this.timeTimer)
      }
    },
    getTimeWithSeconds(t) {
      if (!t) {
        return null
      }
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      h = h < 10 ? `0${h}` : h
      m = m < 10 ? `0${m}` : m
      s = s < 10 ? `0${s}` : s
      return `${h}:${m}:${s}`
    },
  }
}
</script>

<style scoped>
.title-time {
  margin-bottom: 10px;
  margin-top: 5px;
}
.card-right-side {
  background-color: white;
  color: #34495e;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(5,50,93,0.02), 0 5px 20px rgba(0,0,0,0.04);
  transition-duration: 0.5s;
  line-height: 1.5em;
  overflow: hidden;
  position: fixed;
  top: 150px;
  right: 12px;
}
.progress {
  margin-top: 10px;
}

.buttonSubmit {
  text-align: center;
  margin-left: 60px;
}
.title {
  text-align: center;
  font-size: x-large;
  line-height: 60px;
  height: 40px;
}
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

.card-title {
  font-weight: bold;
  font-size: large;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
