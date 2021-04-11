import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Main from '@/views/Main'
import Overview from '@/views/Overview'
import page404 from '@/views/ErrorPage'
import Tour3D from '@/views/tour/Tour3D'
import DepartmentList from '@/views/tour/DepartmentList'
import Department from '@/views/tour/Department'
import ItemDetail from '@/views/tour/ItemDetail'
import TestManage from '@/views/test/TestManage'
import TestPage from '@/views/test/TestPage'
import Learning from '@/views/learning/Learning'
import DiseaseStudy from '@/views/learning/DiseaseStudy'
import DiseaseCaseStudy from '@/views/learning/DiseaseCaseStudy'
import DiseaseDetail from '@/views/learning/DiseaseDetail'
import DiseaseCaseDetail from '@/views/learning/DiseaseCaseDetail'
import UserInfo from '@/views/UserInfo'
import TestHistory from "../views/TestHistory";
import TestPastView from "../views/TestPastView";
import Panorama3D from '@/views/tour/Panorama3D'
import Model3D from '@/views/tour/Model3D'
import Tour2D from '@/views/tour/Tour2D'


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
    path: '/panorama3D/:departmentId',
    name: 'Panorama3D',
    component: Panorama3D,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/model3D/:departmentId',
    name: 'Model3D',
    component: Model3D,
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
    path: '/items',
    name: 'ItemDetail',
    component: ItemDetail,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/learning',
    name: 'Learning',
    component: Learning,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/diseaseStudy',
    name: 'DiseaseStudy',
    component: DiseaseStudy,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/diseaseDetail/:diseaseId',
    name: 'DiseaseDetail',
    component: DiseaseDetail,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/diseaseCaseStudy',
    name: 'DiseaseCaseStudy',
    component: DiseaseCaseStudy,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/diseaseCaseDetail/:diseaseCaseId',
    name: 'DiseaseCaseDetail',
    component: DiseaseCaseDetail,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/userInfo',
    name: 'UserInfo',
    component: UserInfo,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/test',
    name: 'TestManage',
    component: TestManage,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/testPage/:id/:testName',
    name: 'TestPage',
    component: TestPage
  },{
    path: '/tour2d',
    name: 'Tour2D',
    component: Tour2D,
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/404',
    component: page404,
  }, {
    path: '*',
    redirect: '/404',
  }，{
    path: '/testHistory',
    name: 'TestHistory',
    component: TestHistory
  },{
    path: '/testPastView/:recordId/:testName/:snapShot',
    name: 'TestPastView',
    component: TestPastView
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
