<template>
  <div class="header">
    <div class="title" @click="toMainPage">Pet Hospital</div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
      toMainPage: function () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .header {
    background-color: #66a6ff;
    color: white;
    height: 50px;
    padding: 5px;
    text-align: center;
  }

  .title {
    line-height: 50px;
    font-size: x-large;
  }

  .title:hover {
    cursor: pointer;
  }
</style>