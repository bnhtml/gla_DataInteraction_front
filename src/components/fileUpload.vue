<!-- 上传文件按钮 -->
<template>
<div style="display: flex">
  <p>接口说明文档：</p>
  <div style="line-height: 40px">
    <p>
      <a v-if="!!fileHref" target="_blank" :href="fileHref" class="g-linkstyle">
        {{fileName}} 
        <!-- <i class="g-deleteicon" @click.prevent="deleteFile">x</i> -->
      </a>
    </p>
    <div class='g-upload'>
      <el-upload :disabled="false" name="fileName" :action="this.$SERVER_BASE_URL + '/new_interface/upload_interFile'" :data="sendData" :show-file-list="false" :on-success="onSuccess" :on-error="onError" :on-progress="onProgress" accept=".rar,.zip,.doc,.docx,.pdf"><i class="iconfont icon-shangchuan"></i>上传文档</el-upload>
    </div>
    <a href="a.txt" target="_blank" style="color: #33ABFB; margin-left: 10px">模板下载</a>
    <p style="color: #999;">支持扩展名：.rar .zip .doc .docx .pdf</p>
  </div>

</div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      fileHref: ''
    };
  },
  props: {
    sendData: {
      type: Object
    },
    fileLink: {
      type: String,
      default: ''
    },
    fileName1: {
      type: String,
      default: ''
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    fileLink(n, o){

    }
  },
  //方法集合
  methods: {
    deleteFile(){
      this.$api.del_interfaceFile(this.sendData).then(res => {
        this.fileHref = '';
        this.$message({
          type: 'success',
          message: '已删除'
        })
      })
    }, 
    onSuccess(response, file, fileList){
      if(response.code === 200){
        this.fileHref = response.result.data.filedDownloadUrl;
        this.fileName = response.result.data.fileName;
      }
    },
    onError(error, file, fileList){
      this.$message({
        type: 'error',
        message: error
      })
    },
    onProgress(event, file, fileList){
      console.log(event, file, fileList)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.fileHref = this.fileLink;
    this.fileName = this.fileName1
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.g-upload {
  display: inline-block;
  width: 100px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  i {
    margin-right: 6px;
  }
}
.g-linkstyle{

    // display: block;
    color: #33ABFB;
    line-height: 24px;
    position: relative;
    .g-deleteicon{

      position: absolute;
      z-index: 10;
      left: 60px;
      top: -6px;
      color: #666;
      font-size: 10px;
      cursor: pointer;
    }
}
</style>