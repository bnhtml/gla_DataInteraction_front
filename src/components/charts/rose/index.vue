<!-- 饼图 rose类型 -->
<template>
<div class='g-pie-box'>
  <div ref="pie" class="g-pie"></div>
  <div class="totol-number">{{totalCount}}</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import echarts from "echarts";
const colors = {
  type1: ["#c0ab30", "#a73a43", "#5b2e8d", "#2e81a8"],
  type2: ['#289665', '#a73a43', '#2d59bc', '#332e8d'],
  type3: ['#a73a43', '#9a8c2f', '#5b2e8d', '#2e81a8'],
  type4:['#289665', '#9a692f', '#2d59bc', '#332e8d'],
}
export default {
  name: "rose",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    data: {
      type: Array,
      default: [
        {
          value: 400,
          name: "搜索引擎"
        },
        {
          value: 335,
          name: "直接访问"
        },
        {
          value: 310,
          name: "邮件营销"
        },
        {
          value: 274,
          name: "联盟广告"
        }
      ]
    },
    colorType: {
      type: String,
      default: 'type1'
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    data: function(newData, oldData){
      if(newData.length){
        this.init();
      }
    }
  },
  //方法集合
  methods: {
    init() {
      let pieChart = echarts.init(this.$refs.pie);
      let option = {
        color: colors[this.colorType],
        grid: {
          top: 46,
          left: 16,
          right: 16,
          bottom: 16,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
          backgroundColor: "#000"
        },
        legend: {
          show: false,
          data: this.data.map(item => item.name)
        },
        series: [
          {
            type: "pie",
            radius: ["34%", "55%"],
            center: ["50%", "60%"],
            data: this.data,
            roseType: "radius",
            label: {
                show: false,
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };

      pieChart.setOption(option);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
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
  background: url(../../../assets/img/special/roteBg.png) center 130px no-repeat;
  margin-top: -70px;
  width: 280px;
  height: 280px;
  position: relative;
  .totol-number{
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    height: 50px;
    line-height: 50px;
    font-family: 'zhanghaishan';
  }
  .g-pie {
    width: 100%;
    height: 100%;
  }
}
</style>