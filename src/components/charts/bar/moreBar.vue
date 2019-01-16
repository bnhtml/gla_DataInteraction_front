//多柱状图组件封装
<template>
  <div class="moreBar">
    <div ref="moreBar" class="echartsMoreBar" :style="{width:width, height:height}"></div>
  </div>
</template>
<script type='text/javascript'>
import echarts from "echarts";
let colors = ["#2e6ac6", "#2b54a0", "#d56c59", "#ca5d55", "#2ba9ac", "#269094", "#8e80de", "#5a4ab0"];
export default {
  name: "moreBar",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "380px"
    },
    moreBar: Object
  },
  data() {
    return {};
  },
  mounted() {
    // 检测窗口变化
    this.initMoreBar();
    eventBus.$on("RESIZE", this.fnResize);
    setTimeout(() => {
      this.fnResize();
    }, 0);
  },
  methods: {
    fnResize() {
      try {
        let parent = this.$refs.moreBar.parentNode;
        let width = parent.clientWidth;
        let height = parent.clientHeight;
        if (parent && width && height) {
          this.moreBarChart.resize({
            width,
            height
          });
        }
      } catch (err) {}
    },
    initMoreBar() {
      let moreBarChart = echarts.init(this.$refs.moreBar);
      this.moreBarChart = moreBarChart;
      let itemLength = this.moreBar.xAxisData.length || 0;
      let titles = this.moreBar.titles;
      let datanames = this.moreBar.datanames;
      moreBarChart.setOption({
        // backgroundColor: "#1A2247",
        // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        // color:['#2b54a0'],
        tooltip: {
          trigger: "axis",
          padding: 10, // 内边距
          axisPointer: {
            type: "shadow"
          },
          textStyle: {
            color: "rgba(255, 255, 255, .75)",
            fontSize: 11
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     right:10,
        //     feature: {
        //         mark: {show: true},
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: true
            },
            data: this.moreBar.xAxisData || [
              "喀什市",
              "疏附县",
              "疏勒县",
              "英吉沙县",
              "泽普县",
              "岳普湖县",
              "巴楚县",
              "伽师县",
              "叶城县"
              // '莎车县 ',
            ],
            axisLine: {
              show: true,
              //设置轴线的属性  x轴最下面的轴线shezhi
              lineStyle: {
                color: "rgba(255, 255, 255, .50)",
                width: 1,
                type: "solid"
              }
            },
            axisLabel: {
              show: true,
              fontSize: 14,
              textStyle: {
                color: "#a8abb9" //"rgba(255, 255, 255, .75)",
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            // max: 1000,
            min: 0,
            interval: 250, // 设置y轴间隔
            axisLabel: {
              formatter: "{value}"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(255, 255, 255, .75)", //"#00c7ff",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, .25)", //"#063374",
                type: "dashed"
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            type: 'slider',
            start: 0,
            end: itemLength ? parseInt(900 / itemLength) : 100
          }
        ],
        series: this.moreBar.titles.map((o, i) => {
          return {
            name: o,
            type: "bar",
            // barGap: 0,
            // barWidth: 10, //柱子宽度
            // barGap: 1, //柱子之间间距
            // barCategoryGap: 40,
            // label: this.labelOption,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colors[i * 2]
                  },
                  {
                    offset: 1,
                    color: colors[i * 2 + 1]
                  }
                ]),
                opacity: 1
              }
            },
            data: this.moreBar[datanames[i]]
          }
        })
      });
    }
  },
  watch: {
    
  }
};
</script>
<style lang='scss' scoped>
.moreBar {
  // width:900px;
  // height:380px;
  .echartsMoreBar {
    // padding: 0 10px;
    width: 100%;
    height: 100%;
  } // margin:50px;
}
</style>


