<template>
  <div class="page-body">
    <div class="card-component">
      <div class="card-outer">
        <div class="title card">{{detail.name}}</div>
      </div>
      <div class="two-card-component">
        <div class="one-in-two-card">
          <div class="one-card-outer card-outer">
            <div class="one-card card">
              <div class="card-title">科室概述</div>
              <div class="card-detail">{{detail.overview}}</div>
            </div>
          </div>
        </div>
        <div class="one-in-two-card">
          <div class="one-card-outer card-outer">
            <div class="one-card card">
              <div class="card-title">科室人员</div>
              <div v-for="member in detail.members" :key="member">{{member}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-outer">
        <div class="card">
          <div class="card-title">科室器材</div>
          <div v-for="tool in detail.tools" :key="tool.id" class="tool-card">
            <div class="tool-card-left">
              <div class="tool-card-title">{{tool.name}}</div>
              <div class="tool-card-detail">{{tool.description}}</div>
            </div>
            <div class="tool-card-right">
              <el-image :src="tool.picture" fit="cover" class="tool-img" slot="error"></el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="card-outer">
        <div class="card">
          <div class="card-title">科室职能介绍</div>
          <div class="card-detail">{{detail.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Department',
    data() {
      return {
        id: this.$route.params.id,
        detail: {
          name: undefined,
          overview: undefined,
          members: [],
          description: undefined,
          tools: [],
        }
      }
    },
    computed: {
      actor() {
        return this.$store.state.actor
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      getDetail: function () {
        this.axios
            .get('/api/department/detail', {
              params: {
                actor: this.actor,
                id: this.id,
              }})
            .then(res => {
              console.log(res)
              this.detail = res.data
            })
      },

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

  .card-detail {
    text-indent: 2em;
  }

  .title {
    text-align: center;
    font-size: xx-large;
    line-height: 60px;
    height: 60px;
  }

  .two-card-component {
    display: flex;
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

  .tool-card {
    height: 300px;
    padding: 20px;
    display: flex;
  }

  .tool-card:not(:last-child) {
    margin-bottom: 20px;
  }

  .tool-card-left {
    width: 60%;
    padding: 20px;
  }

  .tool-card-right {
    width: 40%;
  }

  .tool-img {
    width: 100%;
    height: 100%;
  }

  .tool-card-title {
    font-weight: bold;
    line-height: 2em;
    margin-bottom: 10px;
  }

  .tool-card-detail {
    text-indent: 2em;
  }
</style>
