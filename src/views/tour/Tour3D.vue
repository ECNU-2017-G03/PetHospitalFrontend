<template>
  <div>
    <h3 v-for="departmentTour in departmentTourList" :key="departmentTour.departmentId">
      {{departmentTour.departmentName}}
      x: {{departmentTour.x}}
      y: {{departmentTour.y}}
      <button @click="clickDepartmentTour(departmentTour.departmentId, 'panorama')">
        Panorama
      </button>
      <button @click="clickDepartmentTour(departmentTour.departmentId, 'model')">
        Model
      </button>
    </h3>
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
      clickDepartmentTour: function (departmentId, page) {
        if (page === 'panorama') {
          this.$router.push(`/panorama3D/${departmentId}`)
        } else if (page === 'model') {
          this.$router.push(`/model3D/${departmentId}`)
        }
      }
    }
  }
</script>

<style scoped>

</style>
