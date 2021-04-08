<template>
  <div>
    <div v-for="departmentTour in departmentTourList" :key="departmentTour.departmentId">
      <h1 @click="clickDepartmentTour(departmentTour.departmentId)">
        departmentName: {{departmentTour.departmentName}}
        x: {{departmentTour.x}}
        y: {{departmentTour.y}}
      </h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tour3D',
    data() {
      return {
        departmentTourList: []
      }
    },
    created() {
      this.listTours()
    },
    methods: {
      listTours: function () {
        this.axios
          .get('/api/tour/listTours')
          .then(res => {
            console.log(res)
            this.departmentTourList = res.data.departmentTourList
          })
          .catch(err => {
            console.log(err)
            this.$message.error('获取科室导览信息失败')
          })
      },
      clickDepartmentTour: function (departmentId) {
        this.$router.push(`/panorama3D/${departmentId}`)
      }
    }
  }
</script>

<style scoped>

</style>
