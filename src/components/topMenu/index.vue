<!-- 专题头部切换 -->
<template>
<div class='topMenu'>
  <div v-for="(menu, i) in list"  :key="i" class="menuOne" :class="{act: act === menu.type}" @click="change(menu, i)">
    <i class="iconfont" :class="menu.icon"></i>{{menu.name}}
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    let act = this.$route.query.type;
    return {
      act
    };
  },
  props: {
    list: {
      type: Array,
      default: function(){
        return [{
          name: '自有机房建设',
          icon: 'icon-ziyoujifangfenxi'
        },{
          name: '自有机房设备',
          icon: 'icon-yingjianzichanfenxi'
        }]
      }
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    change(item, idx){
      this.act = item.type;
      this.$emit('change', idx);
      let {name, query, params} = this.$route;
      this.$router.replace({
        name,
        query: {
          ...query,
          type: item.type
        },
        params
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.topMenu{
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #1a5182;
}
.menuOne{
  font-size: 24px;
  text-align: center;
  padding: 0  40px;
  height: 70px;
  line-height: 70px;
  color: #fff;
  opacity: .65;
  float: left;
  cursor: pointer;
  i{
    font-size: 24px;
    margin-right: 14px;
  }
}
.menuOne.act{
  background: rgba(158,215,255,.10);
  border: 1px solid #1a5182;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>