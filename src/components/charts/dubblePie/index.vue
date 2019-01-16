<!-- 百分比pei图 -->
<template>
<div class='g-pie-box'>
  <div ref="pie" class="g-pie"></div>
  <slot></slot>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import echarts from "echarts";
export default {
  name: "ring",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    series: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    fnResize() {
      try {
        let parent = this.$refs.pie.parentNode;
        let width = parent.clientWidth;
        let height = parent.clientHeight;
        if (parent && width && height) {
          this.Chart.resize({
            width,
            height
          });
        }
      } catch (err) {}
    },
    init() {
      let pieChart = echarts.init(this.$refs.pie);
        this.Chart = pieChart;
      let option = {
        title: {
          text: "",
          subtext: "",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 18
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}:({d}%)"
        },
        series: this.series
      };
      pieChart.setOption(option);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      eventBus.$on("RESIZE", this.fnResize);
      setTimeout(() => {
        this.fnResize();
      }, 0)
    this.init();
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
.g-pie-box {
  width:100%;
  height: 280px;
  margin-top: -30px;
  cursor: pointer;
  .g-pie {
    width: 100%;
    height: 100%;
  }
}
</style>