<template>
  <div class="page-body">
    <div class="card-component">
      <el-row :gutter="20">
        <el-col :span="4" v-for="department in departmentList" :key="department.id">
          <div class="button-card" @click="clickDepartmentName(department.id)">
            {{department.name}}
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DepartmentList',
    data() {
      return {
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
              console.log(res)
              this.departmentList = res.data.departmentList
            })
      },
      clickDepartmentName: function (id) {
        this.$router.push(`/department/${id}`)
      }
    }
  }
</script>

<style scoped>
  .page-body {
    min-height: calc(100vh - 120px);
  }

  .card-component {
    padding: 40px 30px;
  }

  .button-card {
    text-align: center;
    background-color: white;
    width: 100%;
    padding: 20px;
    font-size: larger;
    color: #34495e;
    height: 80px;
    line-height: 80px;
    border-radius: 5px;
    box-shadow: 0 10px 30px rgba(5,50,93,0.03), 0 5px 15px rgba(0,0,0,0.07);
    transition-duration: 0.5s;
  }

  .button-card:hover {
    transform: translateY(-8px);
    cursor: pointer;
    box-shadow: 0 20px 50px rgba(5,50,93,0.08), 0 10px 30px rgba(0,0,0,0.12);
  }
</style>
