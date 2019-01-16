// 柱子加折线组建的封装
<template>
    <div class="barLineBox" :style="'height:' + barLine.height + 'px'">
        <div ref="dom" class="echartsBarLine"></div>
    </div>
</template>

<script type="text/javascript">
import echarts from "echarts";
export default {
  name: "testDev",
  props: ["barLine"],
  data() {
    return {
      //指定图标的配置和数据
    };
  },
  components: {},
  mounted() {
    this.initBar();
    eventBus.$on("RESIZE", this.fnResize);
    setTimeout(() => {
       this.fnResize();
    }, 0)
  },
  methods: {
    fnResize() {
      try {
        let parent = this.$refs.dom.parentNode;
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
    initBar() {
      var barLineChart = echarts.init(this.$refs.dom);
      this.Chart = barLineChart;
      let itemLength = this.barLine.xAxisData.length || 0;
      //使用制定的配置项和数据显示图表
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          textStyle: {
            color: "rgba(255, 255, 255, .75)",
            fontSize: 11
          }
        },
        dataZoom: [
            {
                show: itemLength > 6,
                // show:true,
                type: 'slider',
                start: 0,
                end: itemLength ? parseInt(900 / itemLength) : 100
            }
        ],
        xAxis: [
          {
            type: "category",
            data: this.barLine.xAxisData || [
              "铜仁市",
              "遵义市",
              "贵阳市",
              "安顺市",
              "毕节市",
              "六盘水市"
            ], //this.registerSumLine.caseChargeList,
            axisPointer: {
              type: "shadow"
            },
            // axisTick: { // 坐标轴小标记
            //     alignWithLabel: true,
            //     // show:true,
            //     // inside : true,    // 控制小标记是否在grid里
            // },
            axisLabel: {
              interval: 0, // x轴的数据是否显示完 0 显示全部 1 隔一条数据显示
              margin: 10, // x轴数据距离图标的距离
              textStyle: {
                // x轴数据样式设置
                color: "rgba(255, 255, 255, .75)",
                fontSize: 12
              },
              //坐标轴刻度标签的相关设置。x轴数据换行显示
              formatter: function(params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 4; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, .50)",
                margin: 20,
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: this.barLine.legendData[0] || "数量", //+appBase.getSum(this.registerSumLine.gaseCheckList),
            min: 0,
            // max: this.barLine.LMax || 8000,
            // interval: 20,
            axisLabel: {
              //y轴数据样式
              textStyle: {
                color: "rgba(255, 255, 255, .65)",
                fontSize: 12
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, .25)",
                fontSize: 12
              }
            },
            // axisLabel: {
            //     formatter: '{value}'
            // },
            //设置轴线的属性
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, .65)",
                width: 0,
                fontSize: 12
              }
            }
          },
          {
            type: "value",
            name: this.barLine.legendData[1] || "异常覆盖率",
            min: 0,
            // max: this.barLine.RMax || 100,
            // interval: 25,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              //y轴数据样式
              textStyle: {
                color: "rgba(255, 255, 255, .65)",
                fontSize: 12
              },
              formatter: "{value} %"
            },
            //设置轴线的属性
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, .65)",
                width: 0,
                fontSize: 12
              }
            }
          }
        ],
        series: [
          {
            name: this.barLine.legendData[0] || "数量",
            type: "bar",
            data: this.barLine.series[0] || [
              7200,
              4800,
              5500,
              6100,
              3000,
              4200
            ], //this.registerSumLine.gaseCheckList,
            barWidth:30,
            // barCategoryGap: 50,
            itemStyle: {
              normal: {
                //颜色渐变
                // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //   offset: 1,
                //   color: '#5A91E1'
                // }, {
                //   offset: 0,
                //   color: '#5DB6F3'
                // }])
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  // {
                  //   offset: 0,
                  //   color: "#579ADD"
                  // },
                  // {
                  //   offset: 0.5,
                  //   color: "#2C61B9"
                  // },
                  // {
                  //   offset: 1,
                  //   color: "#2C61B9"
                  // }
                   {
                    offset: 0,
                    color: "#83bff6"
                  },
                  {
                    offset: 0.5,
                    color: "#188df0"
                  },
                  {
                    offset: 1,
                    color: "#2C61B9"
                  }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#2378f7"
                  },
                  {
                    offset: 0.7,
                    color: "#2378f7"
                  },
                  {
                    offset: 1,
                    color: "#83bff6"
                  }
                  // 以下是ui的
                  // {
                  //     offset: 0,
                  //     color: '#80d1ff'
                  // },
                  // {
                  //     offset: 0.7,
                  //     color: '#80d1ff'
                  // },
                  // {
                  //     offset: 1,
                  //     color: '#5791fe'
                  // }
                ])
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, .65)",
                fontSize: 12
              }
            }
          },
          {
            name: this.barLine.legendData[1] || "异常覆盖率",
            type: "line",
            yAxisIndex: 1,
            data: this.barLine.series[1] || [38, 55, 53, 30, 35, 45], //this.registerSumLine.increaseNum,
            color: ["#F9671C"],
            smooth: true, // 折线是否有弧度
            showSymbol: false // 折线上的小圆圈是否显示
          }
        ]
      };
      barLineChart.setOption(option);
    }
  }
};
</script>

<style lang='scss' scoped>
.barLineBox {
    width: 100%;
  .echartsBarLine {
    width: 100%;
    height: 100%; //  padding: 10px 5px;
    //  background:rgba(26, 35, 71, 1);
  } //   min-height: calc(100% - 64px);
}
</style>
