 <!--堆叠柱子组件的封装-->
<template>
        <!-- <canvas ref='stackBar' width='350' height='300'></canvas> -->
        
    <div class="barBox" >
        <div ref="dom" class="echartsBar" :style="'width:' + width + 'px;height:' + height + 'px'"></div>
    </div>
</template>

<script type="text/javascript">
import echarts from "echarts";
export default {
  name: "testDev",
  props: ["stackBar", "series", "width", "height"],
  data() {
    return {
      //指定图标的配置和数据
    };
  },
  components: {},
  mounted() {
    eventBus.$on("RESIZE", this.fnResize);
    this.initBar()
    setTimeout(() => {
      this.fnResize();
    }, 0);
  },
  methods: {
    fnResize() {
      try {
        let parent = this.$refs.dom.parentNode;
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
    //初始化echarts实例
    initBar() {
      var barChart = echarts.init(this.$refs.dom);
      this.moreBarChart = barChart
      let itemLength = this.stackBar.xAxisData.length || 0
      //使用制定的配置项和数据显示图表
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: "rgba(255, 255, 255, .75)",
            fontSize: 11
          }
        },
        dataZoom: [
            {
                show: itemLength > 5,
                // show:true,
                type: 'slider',
                start: 0,
                end: itemLength ? parseInt(500 / itemLength) : 100
            }
        ],
        grid: {
          left: "5",
          right: "5",
          bottom: "5",
          top: "5",
          containLabel: true //是否显示x y数据 一般都是默认显示
        },
        xAxis: {
          type: "category",
          data: this.stackBar.xAxisData || [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
          ], //this.barData.xAxis.data ||
          axisLabel: {
            interval: 0, // x轴的数据是否显示完 0 显示全部 1 隔一条数据显示
            margin: 10, // x轴数据距离图标的距离
            textStyle: {
              // x轴数据样式设置
              color: "rgba(255, 255, 255, .50)",
              fontSize: 14
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
          axisTick: {
            // 坐标轴小标记
            alignWithLabel: true
          },
          //设置轴线的属性  x轴最下面的轴线shezhi
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, .75)",
              margin: 10,
              width: 1
            }
          }
        },
        yAxis: [
          {
            type: "value",
            // max: 1000,
            min: 0,
            axisLabel: {
              //y轴数据样式
              textStyle: {
                color: "rgba(255, 255, 255, .65)",
                fontSize: 12
              }
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(255, 255, 255, .25)",
                fontSize: 12
              }
            },
            //设置轴线的属性
            axisLine: {
              lineStyle: {
                // color:'rgba(255, 255, 255, .65)',
              }
            }
            // boundaryGap: [0.2, 0.2]
          }
        ],
        series: this.series
      };
      barChart.setOption(option);
    }
  },
  watch: {
    series: function(newObj) {
      if (newObj.length > 0) {
        this.initBar();
        setTimeout(() => {
          this.fnResize();
        }, 0);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.barBox {
    width: 100%;
  .echartsBar {
    width: 100%;
    height: 100%;
    // padding: 10px 5px;
    //  background:rgba(26, 35, 71, 1);
  } //   min-height: calc(100% - 64px);
}
</style>
