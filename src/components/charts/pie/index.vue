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

  import echarts from 'echarts';
export default {
  name: "ring",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    title: {
      type: String,
      default: '0%'
    },
    percent: {
      type: Number,
      default: 0
    },
    bgColor: {
      type: String,
      default: '#2e4c8c'
    },
    percentColor: {
      type: String,
      default: '#32b487'
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
    init() {
      let pieChart = echarts.init(this.$refs.pie);
      let option = {
        title: {
          text: this.title,
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#ffffff",
            fontSize: "16",
            fontFamily:"zhanghaishan",
          }
        },
        color: ["rgba(176, 212, 251, 1)"],
        tooltip: {
          show: false,
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show: false,
          itemGap: 12,
          data: ["01", "02"]
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            }
          }
        },
        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["90%", "97%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,

            data: [
              {
                value: parseFloat(this.percent),
                name: "01",
                itemStyle: {
                  normal: {
                    color: this.percentColor,
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                value: 100 - parseFloat(this.percent),
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: this.bgColor,
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      }
      pieChart.setOption(option);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init()
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
.g-pie-box{
  width: 100%;
  height: 150px;
  padding: 20px 0 30px;
  cursor: pointer;
  .g-pie{
    width: 100%;
    height: 100%;
  }
}
</style>