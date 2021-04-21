<template>
  <div class="home">
    <div class="out-container">
      <div class="home-container">
        <div class="cover">
          <div class="title">欢迎来到宠物医院学习系统</div>
          <div class="sub-title">
            {{subTitle.output}}
            <span class="easy-typed-cursor">|</span>
          </div>
          <div class="button-container">
            <button class="home-button" @click="learning">进入学习</button>
            <a class="admin-button" href="http://localhost:8080">管理员登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EasyTyper from 'easy-typer-js';

export default {
  name: 'Home',
  data() {
    return {
      subTitle: {
        output: '',
        isEnd: false,
        speed: 120,
        singleBack: false,
        sleep: 6000,
        type: 'rollback',
        backSpeed: 60,
        sentencePause: false,
      },
      typed: undefined,
    }
  },
  mounted() {
    this.dynamicType()
  },
  methods: {
    dynamicType() {
      const callbackFn = instance => {
        setTimeout(() => {
          this.dynamicType()
        }, instance.obj.sleep)
      }
      new EasyTyper(this.subTitle, 'Love pet, Love your life', callbackFn)
    },
    learning() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .home {
    text-align: center;
    height: calc(100vh - 120px);
    background-image: url('../assets/main.jpeg');
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
  }

  .out-container {
    display: block;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .home-container {
    position: absolute;
    z-index: 10;
    top: 15vh;
    left: 15vw;
    width: 70vw;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgb(50 50 93 / 5%), 0 5px 15px rgb(0 0 0 / 10%);
    background-color: white;
  }

  .home-container::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: -30px;
    background-image: url('../assets/main.jpeg');
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -ms-filter: blur(15px);
    -o-filter: blur(15px);
    filter: blur(15px);
  }

  .title {
    margin-top: 10vh;
    font-size: xxx-large;
    line-height: 1.5em;
    padding: 20px;
    color: #eaeaea;
  }

  .sub-title {
    height: 30px;
    line-height: 30px;
    color: white;
    font-size: large;
    margin-top: 5vh;
  }

  .button-container {
    margin-top: 18vh;
    margin-bottom: 8vh;
    position: relative;
  }

  .home-button {
    border-radius: 6px;
    border: 2px solid #dcdfe6;
    background: transparent;
    color: #eaeaea;
    box-sizing: border-box;
    outline: none;
    transition: .2s;
    font-size: large;
    line-height: 1.5em;
    padding: 10px 20px;
    cursor: pointer;
  }

  .home-button:hover {
    border: 2px solid #eaeaea;
    background-color: #eaeaea;
    color: #aaa;
  }

  .admin-button {
    color: #eaeaea;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    position: absolute;
    top: 15px;
  }

  .cover {
    /*background-color: rgba(255, 255, 255, 0.05);*/
    background-color: rgba(0, 0, 0, 0.1);
    display: grid;
  }

  .easy-typed-cursor {
    margin-left: 5px;
    opacity: 1;
    -webkit-animation: blink 1s infinite;
    -moz-animation: blink 1s infinite;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0% {opacity: 1}
    70% {opacity: 0}
    100% {opacity: 1}
  }

  @-webkit-keyframes blink {
    0% {opacity: 1}
    70% {opacity: 0}
    100% {opacity: 1}
  }

  @-moz-keyframes blink {
    0% {opacity: 1}
    70% {opacity: 0}
    100% {opacity: 1}
  }
</style>
