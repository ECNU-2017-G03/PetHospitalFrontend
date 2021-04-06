<template>
  <div class="header">
    <div class="title" @click="toMainPage">Pet Hospital</div>
    <div class="avatar-container" @click="changeDropdownShow" v-if="$route.meta.requireAuth">
      <span class="avatar">{{userFirstLetter}}</span>
    </div>
    <transition
        :duration="500"
        v-on:enter="dropdownEnter"
        v-on:leave="dropdownLeave"
        enter-active-class="default-enter"
        leave-active-class="default-leave-to"
    >
      <div class="dropdown-container" v-if="dropdownShow">
        <ul class="dropdown">
          <li class="dropdown-item" @click="clickDropdownItem('actor')">切换角色</li>
          <li class="dropdown-item" @click="clickDropdownItem('personal')">个人中心</li>
          <li class="dropdown-item" @click="clickDropdownItem('logout')">退出</li>
        </ul>
      </div>
    </transition>
    <Actor ref="actorDialog"></Actor>
  </div>
</template>

<script>
  import Actor from '@/components/Actor'
  import { mapMutations } from 'vuex'

  export default {
    name: 'Header',
    components: {Actor},
    data() {
      return {
        dropdownShow: false,
        actorVisible: false,
      }
    },
    computed: {
      userFirstLetter: function () {
        if (this.$store.state.userName) {
          return this.$store.state.userName[0].toUpperCase()
        }
        return ' '
      }
    },
    methods: {
      ...mapMutations(['userLogout']),
      toMainPage: function () {
        this.$router.push('/')
      },
      clickDropdownItem: function (name) {
        if (name === 'actor') {
          this.$refs.actorDialog.setDialogVisible()
        } else if (name === 'personal') {
          this.$router.push('/userInfo')
        } else if (name === 'logout') {
          this.userLogout()
          this.toMainPage()
        }
        this.dropdownShow = false
      },
      dropdownHoverShow: function () {
        this.dropdownShow = true
      },
      dropdownUnshow: function () {
        this.dropdownShow = false
      },
      changeDropdownShow: function () {
        this.dropdownShow = !this.dropdownShow
      },
      dropdownEnter: function (el) {
        el.offsetWidth;
        el.style.maxHeight = "140px";
        el.style.transition = "all 0.3s ease-in";
      },
      dropdownLeave: function (el) {
        el.offsetWidth;
        el.style.maxHeight = 0;
        el.style.transition = "all 0.3s ease-out";
      },
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
    display: inline-block;
    cursor: pointer;
    padding: 0 20px;
  }

  .avatar-container {
    position: absolute;
    right: 30px;
    top: 0;
    height: 40px;
    padding: 10px;
  }

  .avatar {
    border-radius: 50%;
    background-color: white;
    text-align: center;
    display: inline-block;
    color: #66a6ff;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    cursor: pointer;
  }

  .dropdown-container {
    position: absolute;
    right: 30px;
    top: 60px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(5,50,93,0.02), 0 5px 15px rgba(0,0,0,0.03);
  }

  .dropdown {
    list-style-type: disc;
    color: #333333;
    margin: 6px 0;
    padding: 10px 0;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 10px 30px rgba(5,50,93,0.02), 0 5px 15px rgba(0,0,0,0.05);
  }

  .dropdown::after {
    border-top: 0 solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid white;
    position: absolute;
    top: 0;
    right: 23px;
    content: " ";
  }

  .dropdown-item {
    list-style: none;
    cursor: pointer;
    padding: 0 20px;
    line-height: 36px;
    color: #34495e;
    transition-duration: 0.5s;
    font-size: 14px;
  }

  .dropdown-item:hover {
    background-color: #66a6ff;
    color: white;
  }

  .default-enter,
  .default-leave-to {
    max-height: 0;
  }
</style>
