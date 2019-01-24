<!-- api接口配置详情 -->
<template>
<div class='g-info'>
  
  <el-row v-for="(info, i) in infolist" :key="i"  :gutter="12" style="margin-top: 12px;">
    <el-col :span="6" style="text-align: right; line-height: 32px;">{{info.label}}</el-col>
    <el-col :span="18">
      <p :style="`height:${info.height || '30'}px`">{{info.value}}</p>
    </el-col>
  </el-row>
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
      result: {
        name: '资源1'
      },
      infolist: [
        {
          label: "资源名称",
          props: "resourceName",
          value:'',
        },
        {
          label: "资源ID",
          props: "resourceId",
          value:'',
        },
        {
          label: "部门单位",
          props: "departName",
          value:'',
        },
        {
          label: "URL地址",
          props: "urlAddress",
          value:'',
        },
        {
          label: "数据接口名称",
          props: "dataInterfaceName",
          value:'',
        },
        {
          label: "封装数据类型",
          props: "dataInterfaceType",
          value:'',
        },
        {
          label: "请求数据类型",
          props: "requestInterType",
          value:'',
        },
        {
          label: "响应数据类型",
          props: "responseInterType",
          value:'',
        },

         {
          label: "接口请求方式",
          props: "requestInterMode",
          value:'',
        },
        {
          label: "设置接口路径",
          props: "name",
          value:'',
        }, {
          label: "单位域名",
          props: "departDomain",
          value:'',
        },
        {
          label: "请求头",
          props: "requestHeader",
          value:'',
        },
        {
          label: "描述/备注",
          props: "dataInterfaceDesc",
          value:'',
        },
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
 
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getQueryResources({resourceId:this.$route.query.resourceId});
  },
   //方法集合
  methods: {
    getQueryResources(params){
      this.$api.query_resources(params).then(res=>{
        if(res.data.length>0){
          this.infolist.forEach((v,i) => {
            if(res.data[0][v.props]){
              v.value = res.data[0][v.props]
              if(v.props == 'dataInterfaceType'){
                let valueArr = ['db','interface','file'];
                let labelArr=['数据库类','接口类','文件']
                if(valueArr.indexOf(res.data[0][v.props])!=-1){
                  v.value = labelArr[valueArr.indexOf(res.data[0][v.props])]
                }
              }
            }else{
              if(v.label=='设置接口路径'){
                v.value = res.data[0].firstAddress+res.data[0].secondAddress+res.data[0].thirdAddress
              }else{
                v.value ='未找到相对应的字段匹配！！！'
              }
            }
          });
        }
      console.log(this.infolist)

      })
    }
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
.g-info p{
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
}
</style>