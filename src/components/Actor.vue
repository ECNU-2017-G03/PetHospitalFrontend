<template>
  <div>
    <el-dialog
        title="选择角色"
        :visible.sync="dialogVisible"
        width="500px"
        center
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
    >
      <div class="hint">
        <el-radio-group v-model="actorName">
          <el-radio-button v-for="actor in actors" :key="actor" :label="actor"></el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeActor">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'Actor',
    data() {
      return {
        actors: [],
        dialogVisible: false,
        actorName: '医生',
        chineseNameToEnglishMapping: {
          '医生': 'vet',
          '护士': 'nurse',
          '前台': 'receptionist',
        },
        englishNameToChineseMapping: {
          'vet': '医生',
          'nurse': '护士',
          'receptionist': '前台',
        }
      }
    },
    created() {
      this.getActor()
    },
    methods: {
      ...mapMutations(['saveActor', 'userLogout']),
      getActor: function () {
        const actor = this.$store.state.actor
        this.actorName = this.englishNameToChineseMapping[actor]
      },
      changeActor: function () {
        const actor = this.chineseNameToEnglishMapping[this.actorName]
        this.saveActor(actor)
        this.dialogVisible = false
      },
      setDialogVisible: function () {
        this.getActor()
        this.axios
          .get('/api/user/actors')
          .then(res => {
            if (res.data.actors.length === 0) {
              this.$alert('您无任何角色权限，请联系管理员', '权限提醒', {
                confirmButtonText: '确定',
                callback: () => {
                  this.userLogout()
                  this.$router.push('/')
                }
              })
              return
            }
            let actorList = []
            for (let a of res.data.actors) {
              actorList.push(this.englishNameToChineseMapping[a])
            }
            this.actors = actorList
            this.dialogVisible = true
          })
      },
    }
  }
</script>

<style scoped>
  .hint {
    text-align: center;
    line-height: 2em;
    margin: 30px 0 30px;
  }
</style>
