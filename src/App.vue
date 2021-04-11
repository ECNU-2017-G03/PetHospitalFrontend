<template>
  <div id="app">
    <Header/>
    <div class="app-body">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Footer,
    Header,
  },
}
</script>

<style>
  body {
    margin: 0;
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, Roboto, Microsoft YaHei, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }

  .app-body {
    min-height: calc(100vh - 120px);
    padding-top: 60px;
    width: 100%;
    background-color: #eaeaea;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #f6f6f6;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #747474;
  }

  ::-webkit-scrollbar-corner {
    background: #f6f6f6;
  }
</style>
