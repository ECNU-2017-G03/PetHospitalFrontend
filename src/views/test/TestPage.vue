<template>
  <div class="page-body">
    <div class="card-component">
      <div class="card-outer">
        <div class="title card">{{ this.testName }}</div>
      </div>
      <!--todo: 加考试剩余时间 -->
      <div class="card-outer">
        <div class="card">
          <el-form :model="testPaper">
            <template v-for="(item,index) in testPaper.questions">
          <el-form-item :label="`Question ${index+1}`" :key="index">
            <div class="question">{{item.content}}</div>
            <el-radio v-model="testAnswer.questions[index].choice" label="A">{{item.options.A}}</el-radio>
            <el-radio v-model="testAnswer.questions[index].choice" label="B">{{item.options.B}}</el-radio>
            <el-radio v-model="testAnswer.questions[index].choice" label="C">{{item.options.C}}</el-radio>
          </el-form-item>
            </template>
            <el-form-item>
              <div class= "buttonSubmit">
              <el-button type="primary" @click="submitTest">交卷</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  data() {
    return {
      id: this.$route.params.id,
      testName: this.$route.params.testName,
      testAnswer:{
        questions:[{
          choice:'',
          qid:'',
          score:'',
        }],
        quizId: '',
        testId: '',
      },
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
        score: 5,
      }],
        quizId: '',
        startTime: '',
        endTime: '',
    }
  }},
  created() {
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
      }
      for(let item of this.testPaper.questions) {
        var q = {
          choice: '',
          qid: item.id,
          score: item.score,
        }
        this.testAnswer.questions.push(q)
      }
    })
  },
  methods:{
    submitTest: function() {
      this.testAnswer.quizId = this.testPaper.quizId
      console.log(this.testAnswer)
      }
    }
}
</script>

<style scoped>
.buttonSubmit {
  text-align: center;
  margin-left: 100px;
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