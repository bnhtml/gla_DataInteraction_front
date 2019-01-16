//多柱状图组件封装
<template>
    <div class="moreBar" :style="'height:' + moreBar.height + 'px'">
        <div ref="moreBar" class="echartsMoreBar"></div>
        <!-- :style="'width:' + moreBar.width + 'px;height:' + moreBar.height + 'px'" -->
    </div>
</template>
<script type='text/javascript'>
import echarts from "echarts";
export default {
  name: "moreBar",
  props: ["moreBar", "series"],
  data() {
    return {};
  },
  mounted() {
    eventBus.$on("RESIZE", this.fnResize);
    this.initMoreBar();
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
      // moreBarChart.on('click', function(param) {
      // })
      let options = {
        // backgroundColor: "#1A2247",
        // color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        // color:['#2b54a0'],
        tooltip: {
          trigger: "axis",
          // padding: 10,// 内边距
          axisPointer: {
            type: "shadow"
          },
          textStyle: {
            color: "rgba(255, 255, 255, .75)",
            fontSize: 11
          }
        },
        dataZoom: [{
            show: itemLength > 9,
            type: 'slider',
            start: 0,
            end: itemLength ? parseInt(900 / itemLength) : 100,
            textStyle: {
              color: "#fff"
            },
        }],
        grid: {
          left: "5px",
          right: "5px",
          bottom: "20px",
          top: "10px",
          // left: '3%',
          // right: '4%',
          // bottom: '5%',
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: true
            },
            axisTick: {
              // 坐标轴小标记
              alignWithLabel: true
              // show:true,
              // inside : true,    // 控制小标记是否在grid里
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, .75)",
                margin: 10
              }
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
              interval: 0,
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
            // interval: 250, // 设置y轴间隔
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
        // dataZoom: [
        //   {
        //     show: itemLength > 9,
        //     type: "slider",
        //     start: 0,
        //     end: itemLength ? parseInt(900 / itemLength) : 100
        //   }
        // ],
        series: this.series
        // [
        //     {
        //         name: '机房数量',
        //         type: 'bar',
        //         // barGap: 0,
        //         barWidth: 10, //柱子宽度
        //         // barGap: 1, //柱子之间间距
        //         // barCategoryGap: 40,
        //         // label: this.labelOption,
        //         itemStyle: {
        //             normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //                     {
        //                         offset: 0,
        //                         color: '#2e6ac6'
        //                     }, {
        //                         offset: 1,
        //                         color: '#2b54a0'
        //                     }
        //                 ]),
        //                 opacity: 1,
        //             },
        //         },
        //         data: this.moreBar.jifangData || [550, 910, 210, 210, 210, 820, 730, 495, 495],
        //     },
        //     {
        //         name: '计算资源数量',
        //         type: 'bar',
        //         // barCategoryGap: 40,
        //         // barGap: 0,
        //         barWidth: 10, //柱子宽度
        //         // barGap: 1, //柱子之间间距
        //         // label: this.labelOption,
        //         itemStyle: {
        //             normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                     offset: 0,
        //                     color: '#d56c59'
        //                 }, {
        //                     offset: 1,
        //                     color: '#ca5d55'
        //                 }]),
        //                 opacity: 1,
        //             }
        //         },
        //         data: this.moreBar.jisuanData || [490, 600, 450, 550, 700, 270, 490, 490, 490],
        //     },
        //     {
        //         name: '存储资源数量',
        //         type: 'bar',
        //         // barCategoryGap: 40,
        //         // barGap: 0,
        //         barWidth: 10, //柱子宽度
        //         // barGap: 1, //柱子之间间距
        //         // label: this.labelOption,
        //         itemStyle: {
        //             normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                     offset: 0,
        //                     color: "#2ba9ac",//'#008cff'
        //                 }, {
        //                     offset: 1,
        //                     color: '#269094'
        //                 }]),
        //                 opacity: 1,
        //             }
        //         },
        //         data: this.moreBar.cunchuData || [745, 495, 300, 300, 510, 510, 760, 770,200],
        //     },
        //     {
        //         name: '网络资源数据量',
        //         type: 'bar',
        //         // barCategoryGap: 60,
        //         // barGap: 0,
        //         barWidth: 10, //柱子宽度
        //         // barGap: 1, //柱子之间间距
        //         // label: this.labelOption,
        //         itemStyle: {
        //             normal: {
        //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                     offset: 0,
        //                     color: '#8e80de'
        //                 }, {
        //                     offset: 1,
        //                     color: '#5a4ab0'
        //                 }]),
        //                 opacity: 1,
        //             }
        //         },
        //         data: this.moreBar.wangluoData || [330, 330, 730, 150, 800, 350, 900, 600, 600],
        //     },
        // ]
      };
      moreBarChart.setOption(options);
    }
  },
  watch: {
    series: function(newObj) {
      if (newObj.length > 0) {
        this.initMoreBar();
        setTimeout(() => {
            this.fnResize();
        }, 0);
        
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.moreBar {
  // width:900px;
  // height:380px;
  // border:1px solid red;
  .echartsMoreBar {
    // padding: 0 10px;
    // padding: 0 20px;
    width: 100%;
    height: 100%;
  } // margin:50px;
}
</style>


