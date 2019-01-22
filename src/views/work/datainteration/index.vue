<!-- 数据集成 -->
<template>
<div class='datainteration'>
  <el-card shadow="always" class="datainteration-header">
    <p class="titleLeftBorder">数据集成操作指南</p>
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
    <el-tabs class="datainteration-tabs" v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="第一步" name="first">
        <h5>1.工具下载安装</h5>
        <br>
        <p>1.1 首先下载数据集成工具mt。解压压缩包migrationtool-1.0.6,双击migrationtool-1.0.6文件夹，进入到bin目录，双击starup.bat将迁移工具打开运行。</p>
        <p>1.2 配置服务器host文件，host文件路径：C:\Windows\System32\drivers\etc\hosts,host文件配置：</p>
        <br>
        <img src="../../../assets/images/step1-1.jpg" alt="">
        <br><br>
        <h5>选择创建迁移项目</h5>
        <br>
        <p>如果迁移项目名称与之前已成功的迁移项目名称相同，则不能使用该名称，否则将出现警告：该迁移项目已存在。</p>
        <p>如果迁移项目名称与之前失败的迁移项目名称相同，则可以使用该名称，且迁移项目将覆盖之前未成功的迁移项目。</p>
        <p>迁移开始后，EsgynDB迁移工具将在migrationtool-1.0.6 文件夹中创建esgyn 文件夹，并为每个迁移项目创建单独的饿文件夹。</p>
        <br>
        <img src="../../../assets/images/step1-2.jpg" alt="">
      </el-tab-pane>
      <el-tab-pane label="第二步" name="second">
        <h5>1.输入源库的服务器信息</h5>
        <p>数据源选项可以选择其他类型的数据库，包括主流数据库mysql,oracle,postgresql,sql server和Esgyndb。填写完信息后，点击下一步。</p>
        <img src="" alt="">
        <h5>2.输入目标库信息</h5>
        <p>该目标库目前只支持Esgyndb数据库，输入服务器地址，租户名称(大写)，用户名和密码后点击下一步继续。</p>
        <img src="" alt="">
      </el-tab-pane>
      <el-tab-pane label="第三步" name="third">
        <h5>选择数据类型映射</h5>
        <br>
        <p>因为源库是MySQL数据库，将数据迁移集成到Esgyndb数据库时，不免要将一些数据类型进行转换。其中较为常见的为datatime转换为timestamp类型，text则推荐转换为varchar类型，Year类型推荐转换为smallint类型等。将类型转换完毕后点击下一步继续。</p>
      </el-tab-pane>
      <el-tab-pane label="第四步" name="fourth">第四步</el-tab-pane>
      <el-tab-pane label="第五步" name="fifth">第五步</el-tab-pane>
      <el-tab-pane label="第六步" name="sixth">第六步</el-tab-pane>
      <el-tab-pane label="第七步" name="seventh">第七步</el-tab-pane>
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
            margin: 20px 20px 0 20px;
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
  width: 100%;
}
</style>