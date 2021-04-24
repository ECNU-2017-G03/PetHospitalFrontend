<template>
  <div class="page-body">
    <div class="card-component">
      <div class="card-outer">
        <div class="title card">{{ this.testName }}</div>
      </div>
      <div class="card-outer">
        <div class="card" v-loading="loading">
          <el-form :model="testPaper">
            <template v-for="(item,index) in testPaper.questions">
              <el-form-item :label="`Q${index+1}`" :key="index">
                <div class="line">
              <div class="question">{{item.content}}</div>
                <div class="score">得分: {{item.point}} / {{item.score}}</div>
                </div>
              <div :class="addOptionColor(item.color.A)">A: {{item.options.A}}</div>
                <div :class="addOptionColor(item.color.B)" >B: {{item.options.B}}</div>
                <div :class="addOptionColor(item.color.C)" >C: {{item.options.C}}</div>
            </el-form-item>
            </template>
          </el-form>
          <el-dialog
              title="试卷历史"
              :visible.sync="dialogLoad"
              width="30%"
          >
            <span>{{loadMessage}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button v-if="loadMessage === '测试历史加载失败'" type="primary" @click="retryLoad">重试</el-button>
              <el-button @click="backToMainPage">取消</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <div><el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100"></el-backtop></div>
    </div>
  </div>
</template>

<script>
export default {
name: "TestPastView",
  data() {
    return {
      colors: [
        {'color':'red','name':'红色'},
         {'color':'blue','name':'蓝色'},
    ],
      loadMessage: '',
      retryCount: 0,
      dialogLoad: false,
    quizId: this.$route.params.recordId,
     testName: this.$route.params.testName,
     snapShot: this.$route.params.snapShot,
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
        //   color:{
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
      loading: false,
    }
  },
  created() {
    let shot = decodeURIComponent(this.$route.params.snapShot);
    this.snapShot = JSON.parse(shot);
    this.findTest();
  },
  methods :{
    backToMainPage: function() {
      this.$router.push('/main')
    },
    retryLoad: function() {
      this.retryLoadCount+= 1
      if(this.retryLoadCount <= 3) {
        let shot = decodeURIComponent(this.$route.params.snapShot);
        this.snapShot = JSON.parse(shot);
        this.findTest();
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
    addOptionColor: function(color) {
      if (color === 1) {
        return 'green'
      } else if(color === 0) {
        return 'black'
      } else {
        return 'red'
      }
    },
    findTest: function() {
      this.loading = true
      this.axios.get('/api/test/pastTest',{
        params: {
          id: this.quizId,
        }}).then(res => {
          console.log(res.data)
          this.dialogLoad = false
          this.testPaper = res.data
          for(let i = 0; i < res.data.questions.length; i++) {
            for(let j = 0; j < this.snapShot.length; j++) {
              if (res.data.questions[i].id === this.snapShot[j].qid) {
                this.testPaper.questions[i].choice = this.snapShot[j].choice
                console.log(this.testPaper.questions[i].answer)
                this.testPaper.questions[i].color = {A: '', B: '', C: ''}
                this.testPaper.questions[i].point = 0

                if (this.testPaper.questions[i].answer === 'A') {
                  this.testPaper.questions[i].color.A = 1
                } else if (this.testPaper.questions[i].answer === 'B') {
                  this.testPaper.questions[i].color.B = 1
                } else {
                  this.testPaper.questions[i].color.C = 1
                }

                if (this.testPaper.questions[i].choice === 'A') {
                  if (this.testPaper.questions[i].answer !== 'A') {
                    this.testPaper.questions[i].color.A = -1
                  } else {
                    this.testPaper.questions[i].point = this.testPaper.questions[i].score
                  }
                } else if(this.testPaper.questions[i].answer !== 'A'){
                  this.testPaper.questions[i].color.A = 0
                }
                if (this.testPaper.questions[i].choice === 'B') {
                  if (this.testPaper.questions[i].answer !== 'B') {
                    this.testPaper.questions[i].color.B = -1
                  } else {
                    this.testPaper.questions[i].point = this.testPaper.questions[i].score
                  }
                } else if(this.testPaper.questions[i].answer !== 'B'){
                  this.testPaper.questions[i].color.B = 0
                }
                if (this.testPaper.questions[i].choice === 'C') {
                  if (this.testPaper.questions[i].answer !== 'C') {
                    this.testPaper.questions[i].color.C = -1
                  } else {
                    this.testPaper.questions[i].point = this.testPaper.questions[i].score
                  }
                } else if(this.testPaper.questions[i].answer !== 'C'){
                  this.testPaper.questions[i].color.C = 0
                }
              }
            }
        }
      })
        .catch(err => {
          console.log(err)
          this.loadMessage = "测试历史加载失败"
          this.dialogLoad = true
        })
          .finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.green {
  color: #67C23A;
}
.red {
  color: #F56C6C;
}
.black{
  color: #303133;
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
.score {
  display: inline;
  float: right;
}
.question{
  display: inline;
}
.title {
  text-align: center;
  font-size: x-large;
  line-height: 60px;
}
.card-right-side {
  color: #34495e;
  border-radius: 5px;
  padding: 20px;
  line-height: 1.5em;
  overflow: hidden;
  position: absolute;
  margin-left: 1090px;
  margin-right: 10px;
}
</style>
