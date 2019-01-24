<!-- 数据集成 -->
<template>
<div class='datainteration'>
  <el-card shadow="always" class="datainteration-header">
    <p class="titleLeftBorder">数据集成操作指南
      <a href="#" class="right tool"><span class="iconfont icon-xiazai"></span>下载数据集成工具</a>
      <a href="#" class="right guide"><span class="iconfont icon-xiazai"></span>下载数据集成操作指南</a>
    </p>
    <div class="datainteration-table">
      <div class="database_box">
      <div class="source_database_text">源数据库</div>
      </div>
      <div class="database_box">
      <div class="source_ip_text">源数据IP地址</div>
      <div class="source_ip_con">
      <div class="content">数据原来存储的数据库IP地址</div>
      </div>
      <div class="source_username_text">用户名</div>
      <div class="source_username_con">
      <div class="content">源数据库用户账户</div>
      </div>
      </div>
      <div class="database_box">
      <div class="source_dataname_text">源数据名称</div>
      <div class="source_dataname_con">
      <div class="content">数据原来存储的数据库名称</div>
      </div>
      <div class="source_password_text">密码</div>
      <div class="source_password_con">
      <div class="content">源数据库用户密码</div>
      </div>
      </div>
      <div class="database_box">
      <div class="source_database_text">目标数据库</div>
      </div>
      <div class="database_box">
      <div class="target_ip_text">目标数据库IP地址</div>
      <div class="target_ip_con">
      <div class="content">数据准备导入的目标数据库IP地址（如果每个单位只有一个固定的IP地址，则直接显示IP地址。）</div>
      </div>
      <div class="target_username_text">用户名</div>
      <div class="target_username_con">
      <div class="content">目标数据库用户账户</div>
      </div>
      </div>
      <div class="database_box">
      <div class="source_dataname_text">目标数据库名称</div>
      <div class="target_dataname_con">
      <div class="content">数据原来存储的数据库名称</div>
      </div>
      <div class="source_password_text">密码</div>
      <div class="target_password_con">
      <div class="content">目标数据库用户密码</div>
      </div>
      </div>
      </div>
  </el-card>
  <el-card shadow="always" class="datainteration-header">
    <p class="titleLeftBorder">操作步骤</p> 
    <el-tabs class="datainteration-tabs" v-model="activeName2" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="第一步" name="first">
        <h5>1.工具下载安装</h5>
        <br>
        <p>1.1 首先下载数据集成工具mt。解压压缩包migrationtool-1.0.6,双击migrationtool-1.0.6文件夹，进入到bin目录，双击starup.bat将迁移工具打开运行。</p>
        <p>1.2 配置服务器host文件，host文件路径：C:\Windows\System32\drivers\etc\hosts,host文件配置：<a href="#"><span class="iconfont icon-bianjiqi_chaolian"></span>hosts文件配置.txt</a></p>
        <br>
        <img src="../../../assets/images/step1-1.jpg" alt="">
        <br><br>
        <h5>选择创建迁移项目</h5>
        <br>
        <p>如果迁移项目名称与之前已成功的迁移项目名称相同，则不能使用该名称，否则将出现警告：该迁移项目已存在。</p>
        <p>如果迁移项目名称与之前失败的迁移项目名称相同，则可以使用该名称，且迁移项目将覆盖之前未成功的迁移项目。</p>
        <p>迁移开始后，EsgynDB迁移工具将在migrationtool-1.0.6 文件夹中创建esgyn 文件夹，并为每个迁移项目创建单独的文件夹。</p>
        <br>
        <img src="../../../assets/images/step1-2.jpg" alt="">
      </el-tab-pane>
      <el-tab-pane label="第二步" name="second">
        <h5>1.输入源库的服务器信息</h5>
        <br>
        <p>数据源选项可以选择其他类型的数据库，包括主流数据库mysql,oracle,postgresql,sql server和Esgyndb。填写完信息后，点击下一步。</p>
        <br>
        <img src="../../../assets/images/step2-1.jpg" alt="">
        <br><br>
        <h5>2.输入目标库信息</h5>
        <br>
        <p>该目标库目前只支持Esgyndb数据库，输入服务器地址，租户名称(大写)，用户名和密码后点击下一步继续。</p>
        <br>
        <img src="../../../assets/images/step2-2.jpg" alt="">
      </el-tab-pane>
      <el-tab-pane label="第三步" name="third">
        <h5>选择数据类型映射</h5>
        <br>
        <p>因为源库是MySQL数据库，将数据迁移集成到Esgyndb数据库时，不免要将一些数据类型进行转换。其中较为常见的为datatime转换为timestamp类型，text则推荐转换为varchar类型，Year类型推荐转换为smallint类型等。将类型转换完毕后点击下一步继续。</p>
        <br>
        <img src="../../../assets/images/step3-1.jpg" alt="">
      </el-tab-pane>
      <el-tab-pane label="第四步" name="fourth">
        <h5>选择源库的Schema/库/表空间</h5>
        <br>
        <p>选择要迁移数据的Schema/表/表空间</p>
        <br>
        <img src="../../../assets/images/step4-1.jpg" alt="">
      </el-tab-pane>
      <el-tab-pane label="第五步" name="fifth">
          <h5>选择要迁移的表</h5>
          <br>
          <p>1.选择源库中需要迁移的表</p>
          <p>2.输入目标表的schemas</p>
          <p>3.选择只创建表或者只集成数据等</p>
          <p>选择下一步继续</p>
          <br>
          <img src="../../../assets/images/step5-1.jpg" alt="">
      </el-tab-pane>
      <el-tab-pane label="第六步" name="sixth">
          <h5>选择列</h5>
          <br>
          <p>如图所示，类型列中的数据类型是可以根据现实情况进行调换的，时间类型的默认值比较容易出现报错情况，需要注意。</p>
          <p>如果时间有默认值，如图中所示，默认值需要更改为timestamp(‘1900-01-01 01:01:01’)。</p>
          <br>
          <img src="../../../assets/images/step6-1.jpg" alt="">
      </el-tab-pane>
      <el-tab-pane label="第七步" name="seventh">
          <h5>1.选择其他对象</h5>
          <br>
          <p>此时是当表有其他外键表时的选项。</p>
          <p>请注意左上角表一行的输入是否有错误。此时这个位置填写的内容应为目标schemas和目标表。完成后点击下一步继续</p>
          <br>
          <img src="../../../assets/images/step7-1.jpg" alt="">
          <br>
          <br>
          <h5>2.迁移执行</h5>
          <br>
          <p>确认字段对应无误后点击下一步执行。</p>
          <br>
          <img src="../../../assets/images/step7-2.jpg" alt="">
      </el-tab-pane>
    </el-tabs>
  </el-card>
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
      activeName2: 'first'
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {} //生命周期 - 销毁之前
  // destroyed() {}, //生命周期 - 销毁完成
  // activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
.datainteration {
        .datainteration-header {
            margin: 0px 20px 0 0px;
            .datainteration-tabs,.datainteration-table{
              margin: 20px 20px 0 0;
            }
        }
}
* {
margin: 0px;
padding: 0px;
}
.titleLeftBorder{
        padding-left: 14px;
        margin-left: -20px;
        font-size: 16px;
}    
.database_box {
        display: flex;
        width: 100%;
        height: 3.2%;
/* line-height: 54px; */
/* border: 1px solid #CCCCCC; */
        margin: 0px 0px;
}
.database_box:first-child {
        border-top: 1px solid #CCCCCC;
}
.database_box>div:first-child {
        border-left: 1px solid #CCCCCC;
}
.source_database_text {
        width: 100%;
        font-size: 16px;
        color: #333;
        padding:0.9% 1.5%;
        font-weight: bold;
        background: #EFF2F5;
        border: 1px solid #CCCCCC;
        border-top: 1px solid transparent;
}
.source_ip_text,
.source_username_text,
.source_dataname_text,
.source_password_text {
        flex: 1;
        background: #EFF2F5;
        border-bottom: 1px solid #CCCCCC;
        font-size: 14px;
        color: #333333;
        padding:0.9% 1.5%;
        display: flex;
        align-items: center;
}
.source_ip_con,
.source_username_con,
.source_dataname_con,
.source_password_con,
.target_ip_con,
.target_username_con,
.target_dataname_con,
.target_password_con {
        flex: 2;
        border-bottom: 1px solid #CCCCCC;
        padding-left: 1.4%;
        padding-right: 0.8%;
        font-size: 14px;
        color: #333333;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #CCCCCC;
        border-right: 1px solid #CCCCCC;
}
.content {
        display: inline-block;
        width: 100%;
        line-height: 22px;
}
.target_ip_text,
.target_username_text {
        flex: 1;
        background: #EFF2F5;
        border-bottom: 1px solid #CCCCCC;
        font-size: 14px;
        color: #333333;
        padding:1.4% 1.5%;
        display: flex;
        align-items: center;
}
img{
  /* width: 100%; */
  max-width: 700px;
}
a{
  color: #58CAFD;
  font-size: 14px;
}
span,p{
  font-size: 14px;
}
h5{
  font-size: 16px;
}
.tool{
  margin-right: 170px;
}
.guide{
  margin-right: 20px;
}
el-tabs{
  /* background-color: #EFF2F5; */
  background-color: #fff;
}
.datainteration /deep/ .el-tabs__nav-wrap {
    padding-left: 0px !important;
}
</style>