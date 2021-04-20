<template>
  <div>
    <div class="container" id='container'></div>
    <div>
      <div class="button-3d button-left el-icon-caret-left" @click="onCommand('left')"></div>
      <div class="button-3d button-top el-icon-caret-top" @click="onCommand('up')"></div>
      <div class="button-3d button-right el-icon-caret-right" @click="onCommand('right')"></div>
      <div class="button-3d button-bottom el-icon-caret-bottom" @click="onCommand('down')"></div>
    </div>
    <div class="control-pane">
<!--      <button @mousedown="onCommand('left')">left</button>-->
<!--      <button @mousedown="onCommand('right')">right</button>-->
<!--      <button @mousedown="onCommand('up')">up</button>-->
<!--      <button @mousedown="onCommand('down')">down</button>-->
      <button @mousedown="onCommand('high')">high</button>
      <button @mousedown="onCommand('low')">low</button>
      <div>x: {{ this.x }}</div>
      <div>y: {{ this.y }}</div>
      <div>z: {{ this.z }}</div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'

export default {
  name: 'Panorama3D',
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
      control: undefined
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
      const manager = new THREE.LoadingManager();
      manager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
      };

      manager.onLoad = function () {
        console.log('Loading complete!');
      };


      manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
      };

      manager.onError = function (url) {
        console.log('There was an error loading ' + url);
      };

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
    },
    init: function (objModel) {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight * 0.85)
      this.renderer.setClearColor(0xEEEEEE)
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
      directionalLight.position.set(0, 3200, 0)
      directionalLight.target.x = 1600
      directionalLight.target.y = 1600
      directionalLight.target.z = 1600
      directionalLight.castShadow = true
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
      this.scene.add(directionalLight)
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
      //this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
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
</style>
