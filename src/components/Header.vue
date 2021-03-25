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
    width: 100%;
    padding: 5px 0;
    text-align: center;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 7px 10px 0 rgb(0 0 0 / 12%);
    position: absolute;
  }

  .title {
    line-height: 50px;
    font-size: x-large;
  }

  .title:hover {
    cursor: pointer;
  }
</style>