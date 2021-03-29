<template>
  <div>
    <el-dialog title="选择角色" :visible.sync="dialogVisible" width="500px" center>
      <div class="hint">
        <el-radio-group v-model="actorName">
          <el-radio-button label="医生"></el-radio-button>
          <el-radio-button label="护士"></el-radio-button>
          <el-radio-button label="前台"></el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeActor">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'Actor',
    props: [''],
    data() {
      return {
        dialogVisible: true,
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
      ...mapMutations(['saveActor']),
      getActor: function () {
        const actor = this.$store.state.actor
        this.actorName = this.englishNameToChineseMapping[actor]
      },
      changeActor: function () {
        const actor = this.chineseNameToEnglishMapping[this.actorName]
        this.saveActor(actor)
        this.dialogVisible = false
      }
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
