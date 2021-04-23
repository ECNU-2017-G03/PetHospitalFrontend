<template>
  <el-upload
      :action="fileUploadURL"
      :on-success="handleImageUploadSuccess"
      :file-list="fileList"
      :show-file-list="false"
      list-type="text"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  name: "VideoUpload",
  data() {
    return {
      fileUploadURL: '/api/tool/file',
      fileList: [],
    }
  },
  methods: {
    handleImageUploadSuccess: function () {
      this.$message.success('upload success')
    }
  }
}
</script>

<style scoped>

</style>
