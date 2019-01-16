<!-- 市州页面 -->
<template>
    <div class=''>
        <div class="pos-relative">
            <Title :title='"省级部门分析"'></Title>
            <ul class="tabTitleBtn">
                <li v-for='(v,i) in radioList' :key='i' :class="radioIndex==i?'hover':''" @click="changeRadio(v,i)">{{v.text}}</li>
            </ul>
        </div>
        
        <ITregion v-if="radioIndex === 0"></ITregion>
        <ITdepartment v-if="radioIndex === 1"></ITdepartment>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ITregion from "./ITregion";
import ITdepartment from "./ITdepartment";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { ITregion, ITdepartment },
  data() {
    //这里存放数据
    return {
      radioIndex: 0,
      radioList: [
        {
          text: "市州分析"
        },
        {
          text: "部门分析"
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
		changeRadio(v, i) {
			this.radioIndex = i;
		},
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
@import "@/assets/style/base/index.scss";

</style>