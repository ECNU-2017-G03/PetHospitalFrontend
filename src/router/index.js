import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Main from '@/views/Main'
import Overview from '@/views/Overview'
import page404 from '@/views/ErrorPage'
import Tour3D from '@/views/Tour3D'
import DepartmentList from "@/views/DepartmentList";
import Department from "@/views/Department";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
  }, {
    path: '/register',
    name: 'Register',
    component: Register,
  }, {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/overview',
    name: 'Overview',
    component: Overview,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/tour3d',
    name: 'Tour3D',
    component: Tour3D,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/departmentList',
    name: 'DepartmentList',
    component: DepartmentList,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/department/:id',
    name: 'Department',
    component: Department,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/404',
    component: page404,
  }, {
    path: '*',
    redirect: '/404',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('Token')) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})

export default router
