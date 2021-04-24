<template>
  <div class="page-body">
    <div class="card-component" v-if="mode==='list'">
      <div class="card-outer">
        <div class="title card">科室列表</div>
      </div>
      <el-row :gutter="20" class="card-outer">
        <el-col :span="6" v-for="department in departmentList" :key="department.id">
          <div class="button-card" @click="clickDepartmentName(department.id)">
            {{department.name}}
          </div>
        </el-col>
      </el-row>
    </div>
    <FloorPlane v-else-if="mode==='map'"></FloorPlane>
    <div class="card mode-button" @click="changeMode">
      <i class="el-icon-setting"></i>
      切换模式
    </div>
  </div>
</template>

<script>
  import FloorPlane from "@/components/FloorPlane";
  export default {
    name: 'DepartmentList',
    components: {FloorPlane},
    data() {
      return {
        mode: 'map',
        departmentList: {},
      }
    },
    computed: {
      actor() {
        return this.$store.state.actor
      }
    },
    created() {
      this.getDepartmentList()
    },
    methods: {
      getDepartmentList: function() {
        this.axios
            .get('/api/department/list', {
              params: {
                actor: this.actor
              }})
            .then(res => {
              this.departmentList = res.data.departmentList
            })
            .catch(() => {
              this.$message.error('获取科室列表失败')
            })
      },
      clickDepartmentName: function (id) {
        this.$router.push(`/department/${id}`)
      },
      changeMode: function () {
        if (this.mode === 'list') {
          this.mode = 'map'
        } else if (this.mode === 'map') {
          this.mode = 'list'
        }
      }
    }
  }
</script>

<style scoped>
  .page-body {
    height: 100%;
    text-align: center;
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

  .title {
    text-align: center;
    font-size: xx-large;
    line-height: 60px;
    height: 60px;
  }

  .card-component {
    padding: 40px 30px;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
  }

  .button-card {
    text-align: center;
    background-color: white;
    width: 100%;
    padding: 20px 0;
    font-size: larger;
    color: #34495e;
    height: 80px;
    line-height: 80px;
    border-radius: 5px;
    box-shadow: 0 10px 30px rgba(5,50,93,0.03), 0 5px 15px rgba(0,0,0,0.07);
    transition-duration: 0.5s;
    margin: 10px 0;
  }

  .button-card:hover {
    transform: translateY(-8px);
    cursor: pointer;
    box-shadow: 0 20px 50px rgba(5,50,93,0.08), 0 10px 30px rgba(0,0,0,0.12);
  }

  .mode-button {
    position: absolute;
    width: 70px;
    top: 100px;
    right: 20px;
    font-size: small;
    cursor: pointer;
  }

</style>
