<template>
  <div class="barBox" :style="'height:' + bar.height + 'px'">
    <div ref="bar" class="echartsBar"></div>
    <!-- <div v-else class="noData">
            <img v-if='!isShow' src="../../../assets/img/bg/noData.png" alt="暂无数据">
          </div> -->
  </div>
</template>

<script type="text/javascript">
  import echarts from "echarts";
  import {
    SERVER_BASE_URL
  } from '@/http/conf.js';
  const defaultColor = '72, 72, 72';
  let colorLineArr = [{
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
      ])
    },
  ];
  let colorArr = [{
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#A291F9"
        },
        {
          offset: 1,
          color: "#614EBE"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#57D8D5"
        },
        {
          offset: 1,
          color: "#2CB0AA"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#B4EC51"
        },
        {
          offset: 1,
          color: "#4EBF21"
        }
      ])
    }
  ];
  let yAxis = {
    type: 'value',
    name: '',
    min: 0,
    axisLabel: {
      //y轴数据样式
      textStyle: {
        color: `rgba(${defaultColor}, .65)`,
        fontSize: 12
      }
    },
    //设置轴线的属性
    boundaryGap: [0.2, 0.2],
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        // type: "dashed",
        color: `rgba(${defaultColor}, .1)`,
        fontSize: 12
      }
    },
    axisLabel: {
    // formatter: '{value}'
    },
    //设置轴线的属性
    axisLine: {
      lineStyle: {
        color: `rgba(${defaultColor}, .65)`,
        // color: "linear-gradient(0deg,#9314c8 0%,#5e92fe 100%)",
        width: 1,
        fontSize: 12
      }
    }
  }
  export default {
    name: "bar",
    props: {
      "bar": {
        type: Object
      }, 
      "series": {
        type: Array
      },
      'cursor': {
        type: String,
        default: 'initial'
      } 
    },
    data() {
      return {
        //指定图标的配置和数据
        isShow: true
      };
    },
    components: {},
    mounted() {
      eventBus.$on("RESIZE", this.fnResize);
      if (this.series && this.series.length > 0) {
        this.isShow = true;
        this.initBar();
      } else {
        this.isShow = false;
      }
      
      setTimeout(() => {
        this.fnResize();
      }, 0)
    },
    methods: {
      fnResize() {
        try {
          let parent = this.$refs.bar.parentNode;
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
        if (!this.series || this.series.length <= 0) {
          return;
        }
        var barChart = echarts.init(this.$refs.bar);
        let _this = this;
        barChart.getZr().on('click', params => {   
          const pointInPixel = [params.offsetX, params.offsetY];   
          if (barChart.containPixel('grid', pointInPixel)) {       
            let xIndex = barChart.convertFromPixel({
              seriesIndex: 0
            }, [params.offsetX, params.offsetY])[0];
            _this.$emit('setBarParams', xIndex)
          }
        });
        // var ecConfig = require('echarts/config');
        // barChart.on(ecConfig.EVENT.CLICK, this.eConsole);
        this.Chart = barChart;
        let itemLength = this.bar.xData.length || 0;
        //使用制定的配置项和数据显示图表
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                backgroundColor: "#6a7985"
              }
            },
            textStyle: {
              color: `rgba(255, 255, 255, .75)`,
              fontSize: 11
            },
            formatter(res){
              let html = '';
              let label = '';
              let company = [];
              let color = '#fff';
              if(_this.bar.company&&_this.bar.company.length){
                company = _this.bar.company;
              }
              
              res.forEach((v,i)=>{
                label = `${v.axisValue}`;
                color = _this.bar.colorArr&&_this.bar.colorArr.length? _this.bar.colorArr[i].color.colorStops[0].color:color
                html += `</br><span class='circle-color' style='background:${color}'></span>${v.seriesName}:${v.data}${company[i]||''}`
              })
              return label+html
            }
            // formatter:"{b} <br/>{a} : {c}% "
          },
          dataZoom: [{
            zoomLock:true,
            show: itemLength > (this.bar.num ? this.bar.num : 9),
            type: 'slider',
            start: 0,
            height: 15,
            end: itemLength ? parseInt((this.bar.num * 100 || 900) / itemLength) : 100,
            textStyle: {
              color: `rgb(${defaultColor})`
            },
            bottom: 0,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line',
            handleSize: '100%',
            handleStyle: {
              color: "#d3dee5",
              borderRadius: '50%'
            },
            borderColor: "#90979c"
          }],
          grid: {
            left: "20",
            right: "20",
            bottom:"20",
            // bottom: this.changeBarBottom(),
            top: "50",
            containLabel: true //是否显示x y数据 一般都是默认显示
          },
          // grid: ["20", "20", "10", "50"],
          xAxis: [{
            type: "category",
            splitLine: {
              show:true,
              lineStyle: {
                // type: "line",
                color: `rgba(${defaultColor}, .1)`,
                fontSize: 12
              }
            },
            data: this.bar.xData || [
              "铜仁市",
              "遵义市",
              "贵阳市",
              "安顺市",
              //   "毕节市",
              //   "六盘水市"
            ], //this.registerSumLine.caseChargeList,
            axisPointer: {
              type: "shadow"
            },
            axisTick: { // 坐标轴小标记
              alignWithLabel: true,
              // interval:true
            },
            axisLabel: {
              interval: 0, // x轴的数据是否显示完 0 显示全部 1 隔一条数据显示
              margin: 10, // x轴数据距离图标的距离
              textStyle: {
                // x轴数据样式设置
                color: `rgba(${defaultColor}, .75)`,
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
                color: "linear-gradient(0deg,#9314c8 0%,#5e92fe 100%)",
                margin: 20,
                width: 1
              }
            }
          }],
          yAxis: this.bar.yAxis && this.bar.yAxis.length > 0 ? this.bar.yAxis.map((o, i) => {
            return Object.assign({}, yAxis, this.bar.yAxis && this.bar.yAxis.length > 0 ? {
              max: this.bar.yAxis[i].max
            } : {}, {
              name: o.name
            }, {
              axisLabel: {
                formatter: o.formatter
              }
            })
          }) : yAxis,
          series: this.bar.labelnames.map((o, i) => {
            return Object.assign(this.series[i], {
              name: o,
              itemStyle: this.bar.colorArr ? this.bar.colorArr[i] : {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
                  ])
                },
              },
              splitLine: {
                lineStyle: {
                  color: `rgba(${defaultColor}, .65)`,
                  fontSize: 12
                }
              },
              cursor: this.cursor,
              data: this.series[i] && this.series[i].data
            })
          })
        };
        barChart.setOption(option, true);
      },
      /* 
       * 计算拖拽手柄和bar图的距离
       * 不改变原数组
       */
      changeBarBottom() {
        let obj = {
          arr: []
        }
        obj.arr = JSON.stringify(this.bar.xData)
        let arr = JSON.parse(obj.arr);
        arr.sort(function(a, b) {
          return a.length - b.length;
        });
        return Math.ceil(arr[arr.length - 1].length / 4) * 10
      },
      eConsole(param) {
        if (typeof param.seriesIndex == 'undefined') {
          return;
        }
        if (param.type == 'click') {
          alert(param.data + 1);
        }
      }
    },
    watch: {
      series: function(newArr) {
        if (newArr.length > 0) {
          this.initBar()
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/style/base/index.scss";
  .barBox {
    width: 100%;
    .echartsBar {
      width: 100%;
      height: 100%;
    }
  }
  .noData {
    @include flex($j: center);
    height: 100%;
  }
  .circle-color{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
  }
</style>

