<!-- api详情 -->
<template>
<div class='g-api-info'>
  <el-card class="pos-relative">

    <router-link :to="{name: $route.query.fromName || '', query: {...{user: $route.query.user || ''}, ...(typeof $route.query.deptType === 'undefined' ? {} : {deptType: $route.query.deptType})}}" class="g-routerlink">返回列表页<i class="iconfont icon-shuangjiantou f"></i></router-link>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="API基本信息" name="info"></el-tab-pane>
      <!-- <el-tab-pane label="API参数" name="params" v-if="$route.query.dataInterfaceType === 'db'"></el-tab-pane> -->
      <el-tab-pane label="API使用情况" name="usage"></el-tab-pane>
    </el-tabs>

    <div>
      <router-view></router-view>
    </div>
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
      activeName: this.$route.name
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick(tab, event) {
      this.$router.push({
        name: tab.name,
        query: this.$route.query
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(typeof this.$route.query.deptType)
    console.log(typeof this.$route.query.deptType === 'undefined')
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
.g-routerlink{
  color: #33abfb;
  font-size: 16px;
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 10;
  i{
    margin-left: 10px;
    font-size: 12px;
  }
}
</style>