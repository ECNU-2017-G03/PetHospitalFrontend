<template>
  <div id='container' ref="container"></div>
</template>

<script>
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import axios from 'axios'

export default {
  name: 'Panorama3D',
  data() {
    return {
      departmentId: this.$route.params.departmentId,
      departmentName: undefined,
      panoramaPicture: undefined,
      camera: undefined,
      controls: undefined,
      renderer: undefined,
      scene: undefined,
      image: undefined,
      textures: []
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
          console.log(res)
          this.departmentId = res.data.departmentId
          this.departmentName = res.data.departmentName
          this.panoramaPicture = res.data.panoramaPicture
          this.loadPicture()
        })
        .catch(err => {
          console.log(err)
          this.$message.error('获取3D全景信息失败')
        })
    },
    loadPicture: function () {
      const tempAxios = axios.create();
      tempAxios
        .get(this.panoramaPicture, {responseType: 'arraybuffer'})
        .then(res => {
          console.log(res)
          let base64String = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          this.image = new Image()
          const init = this.init
          this.image.onload = function () {
            init()
          }
          this.image.src = 'data:image/jpeg;base64, ' + base64String;
        })
        .catch(err => {
          console.log(err)
          this.$message.error('获取3D全景图失败')
        })
    },
    init: function () {
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight * 0.80);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
      this.camera.position.z = 0.01;

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      this.controls.rotateSpeed = -0.25;

      let container = document.getElementById('container');
      const materials = [];

      const tilesNum = 6
      for (let i = 0; i < tilesNum; i++) {
        this.textures[i] = new THREE.Texture();
      }

      let canvas, context;
      const tileWidth = this.image.height;

      for (let i = 0; i < this.textures.length; i++) {
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
        canvas.height = tileWidth;
        canvas.width = tileWidth;
        context.drawImage(this.image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth);
        this.textures[i].image = canvas;
        this.textures[i].needsUpdate = true;
      }

      for (let i = 0; i < 6; i++) {
        materials.push(new THREE.MeshBasicMaterial({'map': this.textures[i]}));
      }

      const skyBox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
      skyBox.geometry.scale(1, 1, -1);
      this.scene.add(skyBox);
      container.appendChild(this.renderer.domElement);
      window.addEventListener('resize', this.onWindowResize);

      this.animate()
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.controls.update(); // required when damping is enabled
      this.renderer.render(this.scene, this.camera);
    },

    onWindowResize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
</script>

<style scoped>

</style>