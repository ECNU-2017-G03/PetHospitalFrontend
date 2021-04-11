<template>
  <div>
    <canvas class="floor-plane card" id="floor"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'FloorPlane',
    data() {
      return {
        canvasLeft: undefined,
        canvasTop: undefined,
        canvas: undefined,
        departmentList: {
          '前台': {'x': 411, 'y': 590},
          '厕所': {'x': 187, 'y': 362},
          '隔离室': {'x': 504, 'y': 559},
          '免疫室': {'x': 442, 'y': 487.5},
          '药房': {'x': 403, 'y': 435},
          '猫科诊室': {'x': 386, 'y': 382},
          '犬科诊室': {'x': 358, 'y': 351},
          '另类动物诊室': {'x': 336, 'y': 318},
          '档案室': {'x': 331, 'y': 285},
          '药物储藏室': {'x': 461, 'y': 416},
          '休息室': {'x': 505, 'y': 464},
          '更衣室': {'x': 556, 'y': 521.5},
          '手术更衣室': {'x': 613, 'y': 495},
          '人员消毒室': {'x': 641, 'y': 462},
          '器械清洗室': {'x': 593, 'y': 415},
          '器械消毒室': {'x': 568, 'y': 385},
          '手术室': {'x': 683, 'y': 407},
          '手术准备室': {'x': 592, 'y': 362},
          '专科检查室': {'x': 545, 'y': 345},
          '输液室': {'x': 510, 'y': 308},
          '化验室': {'x': 444, 'y': 272},
          '注射室': {'x': 479, 'y': 255},
          '化验报告室': {'x': 450, 'y': 222},
          'B-Scan': {'x': 574, 'y': 187},
          'MRI': {'x': 617, 'y': 226},
          'CT': {'x': 664, 'y': 266},
          'X-Ray': {'x': 714, 'y': 308},
          'ICU': {'x': 770, 'y': 350},
          '住院管理部': {'x': 623, 'y': 109.5},
          '住院1': {'x': 665, 'y': 138},
          '住院2': {'x': 708, 'y': 166},
          '住院3': {'x': 756, 'y': 201.5},
          '住院4': {'x': 807, 'y': 235},
          '病理检验室': {'x': 860, 'y': 274},
        }
      }
    },
    mounted() {
      this.getDepartmentList()
      this.setHiDPICanvas(1050, 750, 4)
      this.computePosition()
      this.draw()
      this.setListener()
    },
    methods: {
      computePosition: function() {
        const canvas = document.getElementById('floor')
        this.canvas = canvas
        this.canvasLeft = canvas.offsetLeft
        this.canvasTop = canvas.offsetTop
      },
      draw: function () {
        const ctx = this.canvas.getContext('2d')
        // ctx.font="16px Consolas"
        // ctx.fillText('test', 50, 50)

        for (let i in this.departmentList) {
          this.drawDot(this.departmentList[i].x, this.departmentList[i].y, ctx)
        }

      },
      drawDot: function(x, y, ctx) {
        ctx.beginPath()
        let grd = ctx.createRadialGradient(x, y, 1, x, y, 4)
        grd.addColorStop(0, 'red')
        grd.addColorStop(1, '#ffffff00')
        ctx.fillStyle = grd
        ctx.arc(x, y, 4, 0, 2*Math.PI, false)
        ctx.closePath()
        ctx.fill()
      },
      setListener: function() {
        this.canvas.addEventListener('click', (event) => {
          let x = event.clientX - this.canvasLeft
          let y = event.clientY - this.canvasTop
          // console.log(x, y)
          let department = this.inClickRange(x, y)
          if (department && this.departmentList[department].id) {
            this.$router.push(`/department/${this.departmentList[department].id}`)
          } else if (department) {
            this.$message.info('您无权限访问此科室')
          }

        })

        this.canvas.addEventListener('mousemove', (event) => {
          let x = event.clientX - this.canvasLeft
          let y = event.clientY - this.canvasTop
          if (this.inClickRange(x, y)) {
            this.canvas.style.cursor = 'pointer'
          } else {
            this.canvas.style.cursor = 'default'
          }
        })
      },
      inClickRange: function(x, y) {
        for (let i in this.departmentList) {
          let dx = this.departmentList[i].x
          let dy = this.departmentList[i].y
          let l = i.length
          if (Math.abs(dy-y) <= 6 && x >= dx-2 && x <= dx+l*12+6) {
            return i
          }
        }
        return null
      },
      setHiDPICanvas: function (w, h, ratio) {
        const PIXEL_RATIO = (() => {
          const c = document.createElement("canvas")
          let ctx = c.getContext("2d")
          let dpr = window.devicePixelRatio || 1
          let bsr = ctx['webkitBackingStorePixelRatio'] ||
            ctx['mozBackingStorePixelRatio'] ||
            ctx['msBackingStorePixelRatio'] ||
            ctx['oBackingStorePixelRatio'] ||
            ctx['backingStorePixelRatio'] || 1

          return dpr / bsr
        })()

        if (!ratio) {
          ratio = PIXEL_RATIO
        }
        const can = document.getElementById('floor')
        // const can = document.createElement("canvas")
        can.width = w * ratio
        can.height = h * ratio
        can.style.width = w + "px"
        can.style.height = h + "px"
        can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0)
        return can
      },
      getDepartmentList: function() {
        this.axios
            .get('/api/department/list', {
              params: {
                actor: this.actor
              }})
            .then(res => {
              for (let department of res.data.departmentList) {
                if (this.departmentList[department.name]) {
                  this.departmentList[department.name].id = department.id
                }
              }
            })
      },
    }
  }
</script>

<style scoped>
  .floor-plane {
    margin: 40px 10px;
    width: 1050px;
    height: 750px;
    background-image: url('../assets/floorPlane2d-word.png');
    background-position: center top;
    background-size: cover;
  }

  .card {
    border-radius: 5px;
    box-shadow: 0 10px 30px rgba(5,50,93,0.02), 0 5px 20px rgba(0,0,0,0.04);
    transition-duration: 0.5s;
    line-height: 1.5em;
    overflow: hidden;
  }
</style>
