<!-- 大数据局 -->
<template>
<div class='g-admin-page'>
    <el-container style="padding-bottom: 20px;">
      <el-aside v-if="$route.query.user === 'admin'" style="width: 300px;margin-right:20px">
        <el-card shadow="always" class="published-header" style="height: 100%;overflow: auto">
            <p class="titleLeftBorder">{{pageName}}</p>
            <z-tree v-if="isShow" :node="node" :searchTitle="title" :deptType="deptType" v-on:onClick="checked" :query="query"></z-tree>
        </el-card>
      </el-aside>
      <el-main style="padding: 0 ;">
        <slot class="pos-bottom"></slot>
      </el-main>
    </el-container>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import zTree from "@/components/ztree";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { zTree },
  props: {
    deptType: {
      type: Number
    }
  },
  data() {
    //这里存放数据
    let title = ["国家部委组织机构", "贵州省组织机构", "贵州省组织机构"][
      this.$route.query.deptType - 0
    ];
    return {
      isShow: false,
      title,
      query: {dirParameter: ['dataAreaManagement', 'published', 'interfacePathManagement', 'unitDomainNameManagement'].indexOf(this.$route.name)},
      loadedLength: 0,
      node: [],
      firstleval: [],
      pageName: ''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    deptType(n, o){
      // n新的 0 国家， 1省直， 2市州， 3全省
      this.isShow = false;
      this.loadedLength = 0;
      this.title = ["国家部委组织机构", "贵州省组织机构", "贵州省组织机构"][n];
      this.setFirst(n);
    },
    $route(n, o){
      this.changeName(n);
    }
  },
  //方法集合
  methods: {
    changeName(n){
      this.pageName = {
        published: '已发布数据接口',
        dataAreaManagement: '数据区管理',
        interfacePathManagement: '接口路径管理',
        unitDomainNameManagement: '单位域名管理'
      }[n.name]
    },
    checked(name){
      this.$emit('checked', name)

    },
    setFirst(n){
      if(isNaN(n)){
        if(this.$route.name === 'published'){
          this.$emit('checked', {depart: this.$route.query.user})
        }
        return
      };
      this.node = [];
      if(n < 2){
        let firstleval = [['国家部门'], ['省直部门']][n];
        this.firstleval = firstleval;
        this.setNode(firstleval, this.node);
      }else{
        this.$api.getdep_region({...this.query, dire_ide: n - 2}).then(res => {
          this.firstleval = res.data;
          this.setNode(res.data, this.node);
        });
      }


      if(this.$route.name === 'published'){
        this.$emit('checked', {region: ['国家部门', '省直部门', '市州部门'][n]})
      }

    },
    setNode(firstleval, arr, noChild, idx){
      firstleval.forEach((o, i) => {
        arr.push({name: o, children: []});
        if(noChild && (i === firstleval.length - 1 || firstleval.length === 0)){
          this.loadedLength ++;
        }
        console.log(this.loadedLength === this.firstleval.length, this.loadedLength, this.firstleval.length)
        if(this.loadedLength === this.firstleval.length){
          this.isShow = true;
        }
        if(!noChild){
          this.$api.get_depart({...this.query, region_name: o}).then(res => {
            this.setNode(res.data, arr[i]['children'], true, i);
          }).catch(err => {
            console.log(err)
          })
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setFirst(this.deptType);
    this.changeName(this.$route);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>