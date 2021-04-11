<template>
  <div class="page-body">
    <TourMapPlane></TourMapPlane>
  </div>
</template>

<script>
  import TourMapPlane from "@/components/TourMapPlane";
  export default {
    name: 'Tour3D',
    components: {TourMapPlane}
  }
</script>

<style scoped>
  .page-body {
    height: 100%;
    text-align: center;
  }
</style>
