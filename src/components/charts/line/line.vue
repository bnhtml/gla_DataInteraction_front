// 折线图组件封装
<template>
    <div class="lineBox" :style="'height:' + line.height + 'px'">
        <div ref="line" class="echartsline"></div>
    </div>
</template>
<script type='text/javascript'>
import echarts from "echarts";
export default {
  name: "lineBox",
  props: ["line", "series"],
  data() {
    return {
      /*折线图设置*/
      seriesData: []
    };
  },
  mounted() {
    this.initLine();
    eventBus.$on("RESIZE", this.fnResize);
    setTimeout(() => {
        this.fnResize();
    }, 0);
  },
  methods: {
    fnResize() {
      try {
        let parent = this.$refs.line.parentNode;
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
    //初始化echarts实例
    initLine() {
      var lineChart = echarts.init(this.$refs.line);
      this.Chart = lineChart;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          },
          textStyle: {
            color: "rgba(255, 255, 255, .75)",
            fontSize: 11
          }
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "5%",
          top: "10px",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            // interval: 0,  // x轴的数据是否显示完 0 显示全部 1 隔一条数据显示
            // margin:10,   // x轴数据距离图标的距离
            textStyle: {
              // x轴数据样式设置
              color: "rgba(255, 255, 255, .75)",
              fontSize: 12
            }
          },
          splitLine: {
            show:true,
            lineStyle: {
              // type: "dashed",
              color: "rgba(255, 255, 255, .1)",
              fontSize: 12
            }
          },
          axisTick: {
            // 坐标轴小标记
            alignWithLabel: true
            // show:true,
            // inside : true,    // 控制小标记是否在grid里
          },
          //设置轴线的属性  x轴最下面的轴线shezhi
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, .50)"
              // margin: 10,
            }
          },
          data: this.line.xAxisData || [
            "2012年",
            "2013年",
            "2014年",
            "2015年",
            "2016年",
            "2017年"
          ]
        },
        yAxis: [
          {
            type: "value",
            // max: 3000,
            min: 0,
            // interval: 500, // 设置
            axisLabel: {
              //y轴数据样式
              textStyle: {
                color: "rgba(255, 255, 255, .65)",
                fontSize: 12
              }
            },
            splitLine: {
              lineStyle: {
                // type: "dashed",
                color: "rgba(255, 255, 255, .1)",
                fontSize: 12
              }
            }
          }
        ],
        series: this.series
        // [
        //     {
        //         name: this.line.legendData[0] || '运维',
        //         type: 'bar',
        //         // stack: '总量',
        //         stack: '运维',
        //         // symbol:'',  // 去掉折线上的小圆圈
        //         showSymbol: !this.isShowSymbol, // 去掉折线上的小圆圈
        //         data: this.line.yunweiData || [500, 490, 800, 1800, 500, 800],
        //         color: ['#5AC426'],
        //         itemStyle: {
        //             normal: {
        //                 lineStyle: {
        //                     width: 3, //折线宽度
        //                     // color:"#5AC426"//折线颜色
        //                 }
        //             }
        //         },
        //     },
        //     {
        //         name: this.line.legendData[1] || '建设',
        //         type: 'line',
        //         // stack: '总量',
        //         showSymbol: this.isShowSymbol,
        //         data: this.line.jiansheData || [700, 1750, 800, 800, 1200, 2700],
        //         color: ['#D95450'],
        //         itemStyle: {
        //             normal: {
        //                 lineStyle: {
        //                     width: 3, //折线宽度
        //                     // color:"#D95450"//折线颜色
        //                 }
        //             }
        //         },
        //     },
        // ]
      };
      lineChart.setOption(option);
    }
  },
  watch: {
    series: function(newobj) {
      if (newobj.length > 0) {
        this.initLine();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.lineBox {
    width: 100%;
    
  .echartsline {
    width: 100%;
    height: 100%;
  }
}
</style>


