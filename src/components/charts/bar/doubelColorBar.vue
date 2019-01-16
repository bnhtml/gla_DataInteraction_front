<template>
    <div class="barBox" :style="'height:' + height + 'px'">
        <div ref="dom" class="echartsBar"></div>
    </div>
</template>

<script type="text/javascript">
    import echarts from 'echarts';
    export default {
        name: 'testDev',
        //  props: ['width', 'height', 'series', 'xData'],
        props: {
            'width': [String, Number], 
            'height': [String, Number], 
            'series': [Object, Array], 
            'xData': {
                type: [Object, Array],
                default(){
                    return ["已使用", "未使用"]
                }
            }
        },
        // props:{
        //    barData:Object,
        //    width:{
        //     type:String,
        //     default:"550px"
        //    },
        //     height:{
        //     type:String,
        //     default:"250px"
        //    }    
        // },
        data() {
            return {
                //指定图标的配置和数据
            }
        },
        components: {},
        mounted() {
            eventBus.$on("RESIZE", this.fnResize);
            this.initBar();
            setTimeout(() => {
                this.fnResize();
                
            }, 0);
            // alert(this.xData.length);
            
        },
        methods: {
            fnResize() {
            try {
                let parent = this.$refs.dom.parentNode;
                let width = parent.clientWidth;
                let height = parent. clientHeight;
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
                this.moreBarChart = barChart;
                let itemLength = this.xData.length || 0;
                //使用制定的配置项和数据显示图表
                let option = {
                    // title:{
                    //     text: this.barData.title.text || '默认主标题',
                    //     textStyle:{
                    //         "fontSize": this.barData.title.textStyle[0] || 14,
                    //         "fontWeight": this.barData.title.textStyle[1] || 'bolder',
                    //         "color": this.barData.title.textStyle[2] || '#5FAEFC',
                    //     },
                    //     subtext:this.barData.title.subtext ||'默认副标题',
                    //     subtextStyle: {
                    //         "fontSize": this.barData.title.subtextStyle[0] || 12,
                    //         "color": this.barData.title.subtextStyle[1]|| "rgba(255, 255, 255, .65)",
                    //     },
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                        textStyle: {
                            color: 'rgba(255, 255, 255, .75)',
                            fontSize: 11,
                        },
                    },
                    dataZoom: [
                        {
                            show: itemLength > 9,
                            // show:true,
                            type: 'slider',
                            start: 0,
                            end: itemLength ? parseInt(900 / itemLength) : 100
                        }
                    ],
                    grid: {
                        left: '10',
                        right:  '20',
                        bottom: '10',
                        top:  '60',
                        containLabel: true //是否显示x y数据 一般都是默认显示
                    },
                    xAxis: {
                        type: 'category',
                        data:  this.xData, //this.barData.xAxis.data || 
                        axisLabel: {
                            interval:  0, // x轴的数据是否显示完 0 显示全部 1 隔一条数据显示
                            margin:  10, // x轴数据距离图标的距离
                            textStyle: { // x轴数据样式设置
                                color: 'rgba(255, 255, 255, .75)',
                                fontSize:  12,
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
                                return newParamsName
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            alignWithLabel: true,
                            // show:true,
                            // inside : true,    // 控制小标记是否在grid里 
                        },
                        //设置轴线的属性  x轴最下面的轴线shezhi
                        axisLine: {
                            lineStyle: {
                                color:'rgba(255, 255, 255, .50)',
                                margin: 10,
                                width: 1,
                            }
                        },
                    },
                    yAxis: [{
                        type: 'value',
                        // max: 100,
                        min:  0,
                        // interval:  250, // 设置y轴间隔
                        axisLabel: { //y轴数据样式
                            textStyle: {
                                color:  "rgba(255, 255, 255, .65)",
                                fontSize: 12,
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color:  'rgba(255, 255, 255, .25)',
                                fontSize: 12,
                            }
                        },
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                // color:'rgba(255, 255, 255, .65)',
                            }
                        },
                        // boundaryGap: [0.2, 0.2]
                    }],
                    series: this.series,
                    // [{
                    //     name: '访问量',
                    //     type: 'bar',
                    //     barCategoryGap: 25,
                    //     // barMinWidth:20,
                    //     // barWidth:20,
                    //     data: [200, 760, 300, 340, 100, 800, 1000],
                    //     itemStyle: {
                    //         normal: {
                    //             //颜色渐变
                    //             // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //             //   offset: 1,
                    //             //   color: '#5A91E1'
                    //             // }, {
                    //             //   offset: 0,
                    //             //   color: '#5DB6F3'
                    //             // }])
                    //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //                     offset:  0,
                    //                     color:  '#83bff6'
                    //                 },
                    //                 {
                    //                     offset:  0.5,
                    //                     color: '#188df0'
                    //                 },
                    //                 {
                    //                     offset:  1,
                    //                     color: '#188df0'
                    //                 }
                    //             ])
                    //         },
                    //         emphasis: {
                    //             color: new echarts.graphic.LinearGradient(
                    //                 0, 0, 0, 1, [{
                    //                         offset:  0,
                    //                         color:  '#2378f7'
                    //                     },
                    //                     {
                    //                         offset:  0.7,
                    //                         color: '#2378f7'
                    //                     },
                    //                     {
                    //                         offset:  1,
                    //                         color:  '#83bff6'
                    //                     }
                    //                 ]
                    //             )
                    //         }
                    //     },
                    // }],
                };
                barChart.setOption(option);
            },
        },
        watch: {
          xData:function(newArr){
            if(newArr.length > 0){
              this.initBar()
            }
          },
          series: function(newArr){
            if(newArr.length > 0){
              this.initBar()
            }
          }
        }
    }
</script>

<style lang='scss' scoped>
    .barBox {
        width: 100%;
        .echartsBar {
            width: 100%;
            height: 100%;
            padding: 10px 5px;
            // background:rgba(26, 35, 71, 1);
        } //   min-height: calc(100% - 64px);
    }
</style>
