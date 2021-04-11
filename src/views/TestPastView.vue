<template>
  <div class="page-body">
    <div class="card-component">
      <div class="card-right-side">
        <el-button type="primary" @click="backToMain">返回主页</el-button>
      </div>
      <div class="card-outer">
        <div class="title card">{{ this.testName }}</div>
      </div>
      <div class="card-outer">
        <div class="card">
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
    quizId: this.$route.params.recordId,
     testName: this.$route.params.testName,
     snapShot: this.$route.params.snapShot,
      testPaper: {
        questions: [{
          answer:'',
          content:'',
          disease:'',
          id:'',
          options:{
            A:'',
            B:'',
            C:'',
          },
          color:{
            A:'',
            B:'',
            C:'',
          },
          score: 5,
        }],
        quizId: '',
        testId: '',
        startTime: '',
        endTime: '',
      }
    }
  },
  created() {
  console.log(this.quizId)
    console.log(this.testName)
    var shot = decodeURIComponent(this.$route.params.snapShot);
    this.snapShot = JSON.parse(shot);
    console.log(this.snapShot.length)
    this.findTest();
  },
  methods :{
  backToMain: function () {
    this.$router.push('/main')
  },
  addOptionColor: function(color) {
    if(color === 1) {
      return 'green'
    } else if(color === 0) {
      return 'black'
    } else {
      return 'red'
    }
  },
    findTest: function() {
      this.axios.get('/api/test/pastTest',{
      params: {
        id: this.quizId,
      }}).then(res => {
        console.log(res.data)
        this.testPaper = res.data
        for(let i = 0; i < res.data.questions.length; i++) {
          for(let j = 0; j < this.snapShot.length; j++) {
            if (res.data.questions[i].qid === this.snapShot[j].qid) {
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
    }
  }
}
</script>

<style scoped>
.green {
  color: darkgreen;
}
.red {
  color: darkred;
}
.black{
  color: black;
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
  height: 40px;
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