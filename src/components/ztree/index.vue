<!-- ztree封装 -->
<template>
<div class=''>
  <div class="g-search">
    <p>{{searchTitle}}</p>
    <el-autocomplete
      suffix-icon="el-icon-search" 
      v-model="searchValue"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入"
      style="margin-top: 10px;"
      @select="searchDept"
    ></el-autocomplete>
    <!-- <el-input suffix-icon="el-icon-search" placeholder="请输入" style="margin-top: 10px;" on-change="searchDept"></el-input> -->
  </div>
  <div class="g-ztreedom ztree" ref="ztree"></div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

	import '../../../static/vendor/ztree/jquery-1.4.4.min';
	import "../../../static/vendor/ztree/icomoon_styles.css";
	import "../../../static/vendor/ztree/metroStyle.css";
	import "../../../static/vendor/ztree/jquery.ztree.core.js";
	import "../../../static/vendor/ztree/jquery.ztree.excheck.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    query: {
      type: Object,
      default(){
        return {}
      }
    },
    deptType: {
      type: Number
    },
    searchTitle: {
      type: String,
      default: '贵州省组织机构'
    },
    node: {
      type: Array,
      default: () => {
        return [{
          searchValue: '',
          id: 0,
          name: 'smsm',
          children: [
          { "id":3, "name":"test3"},
          { "id":4, "name":"test4"},
          { "id":5, "name":"test5"}
          ]
        },
        { "id":2, "name":"test2"  }]
      }
    }
  },
  data() {
    //这里存放数据
    return {
      searchValue: '',
      searchData: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    isSearch(){
      return !!this.searchValue;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    querySearchAsync(depart, cb) {
      let region_name = ['国家部门', '省直部门', '市州部门', '省内部门'][this.deptType];
      this.$api.sear_depcode({...this.query, depart, region_name }).then(res => {
        let data = res.data.map(value => ({value}))
        cb(data);
      })
    },
    searchDept(depart){
      this.$emit('onClick', {depart: depart.value});
    },
    getSelectDept(e, a, node){
      let param = ['region', 'depart'][node.level];
      this.$emit('onClick', {[param]: node.name});
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let deptDomeObj = $.fn.zTree.init($(this.$refs.ztree), {
    data: {
      simpleData: {
        enable: true
      }
    },
    callback: {
      onClick: this.getSelectDept
    }}, this.node);
    if(this.node.length === 1)deptDomeObj.expandAll(true);
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
.g-ztreedom {
  width: 100%;
  min-height: 400px;
}
.g-search{
  padding-top: 40px;
  font-size: 16px;
  line-height: 20px;

}

</style>