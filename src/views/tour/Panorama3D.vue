<template>
  <div class="page-body" v-loading="loading">
    <div class="container" id='container' @mousewheel="scrollEvent"></div>
    <div>
      <div class="button-3d button-left el-icon-caret-left" @click="onCommand('left')"></div>
      <div class="button-3d button-top el-icon-caret-top" @click="onCommand('up')"></div>
      <div class="button-3d button-right el-icon-caret-right" @click="onCommand('right')"></div>
      <div class="button-3d button-bottom el-icon-caret-bottom" @click="onCommand('down')"></div>
      <div class="button-3d button-high el-icon-top" @click="onCommand('high')"></div>
      <div class="button-3d button-low el-icon-bottom" @click="onCommand('low')"></div>
    </div>
<!--    <div class="control-pane">-->
<!--      <div>x: {{ this.x }}</div>-->
<!--      <div>y: {{ this.y }}</div>-->
<!--      <div>z: {{ this.z }}</div>-->
<!--    </div>-->
    <tour2-d class="floor-plane floor-plane-small" :class="planeSmall?'floor-plane-small':'floor-plane-large'"></tour2-d>
    <div
        class="floor-plane-resize el-icon-full-screen"
        :class="planeSmall?'floor-plane-resize-small':'floor-plane-resize-large'"
        @click="planeSmall=!planeSmall"
    >
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import Tour2D from "@/views/tour/Tour2D";
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default {
  name: 'Panorama3D',
  components: {Tour2D},
  data() {
    return {
      departmentId: this.$route.params.departmentId,
      departmentName: undefined,
      x: undefined,
      y: undefined,
      z: undefined,
      camera: undefined,
      renderer: undefined,
      scene: undefined,
      control: undefined,
      loading: false,
      planeSmall: true,
    }
  },
  created() {

  },
  mounted() {
    this.queryPanorama()
  },
  methods: {
    queryPanorama: function () {
      this.axios
          .get('/api/tour/queryPanorama', {params: {departmentId: this.departmentId}})
          .then(res => {
            this.departmentId = res.data.departmentId
            this.departmentName = res.data.departmentName
            this.x = res.data.x
            this.y = res.data.y
            this.z = res.data.z
            console.log(res.data)
            this.loadObjModel()
          })
          .catch(err => {
            console.error(err)
            this.$message.error('获取3D全景信息失败')
          })
    },
    loadObjModel: function () {
      this.loading = true
      const manager = new THREE.LoadingManager()
      manager.onStart = (url, itemsLoaded, itemsTotal) => {
        console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
      }

      manager.onLoad = () => {
        console.log('Loading complete!')
        this.loading = false
      }


      manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
      }

      manager.onError = (url) => {
        console.log('There was an error loading ' + url)
        this.loading = false
      }

      let init = this.init
      let mtlLoader = new MTLLoader(manager)
      mtlLoader
          .setPath(`${process.env.BASE_URL}`)
          .load('petHospital.mtl',
              function (materials) {
                materials.preload()
                let objLoader = new OBJLoader(manager)
                objLoader
                    .setPath(`${process.env.BASE_URL}`)
                    .setMaterials(materials)
                    .load('petHospital.obj', init)
              })

      // const loader = new GLTFLoader()
      // loader
      //     .setPath(`${process.env.BASE_URL}`)
      //     .load('petHospital.glb', (gltf) => {
      //       const model = gltf.scene
      //       model.position.set(-1000, 0, -1000)
      //       this.init(model)
      //     })
    },
    init: function (objModel) {
      objModel.receiveShadow = true
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight * 0.85)
      this.renderer.setClearColor(0xEEEEEE)
      this.renderer.shadowMapEnabled = true
      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1,5000)
      this.camera.position.set(this.x, this.y, this.z)
      //this.camera.up = new THREE.Vector3(0,1,0)
      this.camera.lookAt(this.x, 0, this.z - 800)
      console.log(this.camera.getWorldDirection())


      // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // this.controls.enableZoom = true
      // this.controls.enablePan = true
      // this.controls.enableDamping = true
      // this.controls.rotateSpeed = -0.25

      let container = document.getElementById('container')

      const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
      directionalLight.position.set(1, 3, 3)
      const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.3);
      directionalLight2.position.set(1, 2, 1)
      // directionalLight.target.x = 1600
      // directionalLight.target.y = 1600
      // directionalLight.target.z = 1600
      directionalLight.castShadow = true
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)

      this.scene.add(directionalLight)
      this.scene.add(directionalLight2)
      this.scene.add(ambientLight)
      this.scene.add(objModel)

      container.appendChild(this.renderer.domElement)
      // window.addEventListener('resize', this.onWindowResize)

      this.animate()
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      //this.controls.update() // required when damping is enabled
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    onCommand: function (key) {
      if (key === 'down') {
        this.z += 200
      } else if (key === 'up') {
        this.z -= 200
      } else if (key === 'left') {
        this.x -= 200
      } else if (key === 'right') {
        this.x += 200
      } else if (key === 'high') {
        this.y += 200
      } else if (key === 'low') {
        this.y -= 200
      }
      this.camera.position.set(this.x, this.y, this.z)
      console.log(this.x, this.y, this.z)
      //this.renderer.render(this.scene, this.camera)
    },
    scrollEvent: function (e) {
      if (e.deltaY > 0) {
        this.onCommand('low')
      } else if (e.deltaY < 0) {
        this.onCommand('high')
      }
    },
  }
}
</script>

<style scoped>
.page-body {
  min-height: calc(100vh - 120px);
}

.container {
  width: 100vw;
}

.control-pane {
  width: 100vw;
  display: flex;
}

.button-3d {
  position: absolute;
  background-color: #ffffff55;
  color: white;
  border-radius: 50%;
  font-size: xx-large;
  cursor: pointer;
}

.button-3d:hover {
  background-color: #ffffff88;
}

.button-left {
  top: 40vh;
  left: 30px;
}

.button-top {
  top: 90px;
  left: 48vw;
}

.button-right {
  top: 40vh;
  right: 30px;
}

.button-bottom {
  bottom: 120px;
  left: 48vw;
}

.button-high {
  bottom: 160px;
  left: 30px;
  font-size: x-large;
  padding: 4px;
}

.button-low {
  bottom: 120px;
  left: 30px;
  font-size: x-large;
  padding: 4px
}

.floor-plane {
  position: absolute;
  top: 80px;
  right: 20px;
  transition-duration: 0.7s;
  z-index: 100;
}

.floor-plane-small {
  width: 336px;
  height: 216px;
}

.floor-plane-large {
  max-width: 90vw;
  max-height: calc(100vh - 150px);
  display: inline-block;
  width: 1120px;
  height: 720px;
  right: 5vw;
}

.floor-plane-resize {
  color: white;
  position: absolute;
  top: 90px;
  cursor: pointer;
  z-index: 120;
  transition-duration: 0.7s;
}

.floor-plane-resize-small {
  right: 30px;
}

.floor-plane-resize-large {
  right: calc(5vw + 10px);
}

.floor-plane-resize:hover {
  color: #2f93f7;
  background-color: #ffffffaa;
}
</style>
