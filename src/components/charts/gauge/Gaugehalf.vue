<template>
    <div class="gaugehalf">
        <div ref='gaugehalf' style="width:80px,height:80px"></div>
    </div>
</template>

<script>
/* 
    * #7F6FE1
    * #40AA8E 
    * #A1BD4C
    * #BD5C4C 

*/
    export default {
        name: 'gaugehalf',
        props: {
            color:{
                type:String,
                default:'yellow'
            },
            percent:{
                type:Number,
                default:25
            }
        },
        mounted() {
            this.getGauge();
        },
        methods: {
            getGauge() {
                let option = {
                    series: [{
                        type: 'gauge',
                        name: '派单占比',
                        radius: '90%',
                        startAngle: '180',
                        endAngle: '0',
                        pointer: {
                            show: false
                        },
                        detail: {
                            show: false,
                        },
                        data: [{
                            value: this.percent,
                            name: this.percent+'%'
                        }],
                        title: {
                            show: true,
                            offsetCenter: [0, 0],
                            textStyle: {
                                color: '#fff',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily:'zhanghaishan',
                                fontSize: 14
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [
                                    [0.65, this.color],
                                    [1, '#04236C']
                                ],
                                width: 2,
                                shadowBlur: 1,
                                shadowColor: this.color,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            length: 25,
                            lineStyle: {
                                color: '#00377a',
                                width: 1,
                                type: 'solid',
                                
                            },
                        },
                        axisLabel: {
                            show: false
                        }
                    }]
                };
                let myChart = this.$echarts.init(this.$refs.gaugehalf);
                myChart.setOption(option, true);
            }
        }
    }
</script>

<style scoped lang='scss'>
@font-face {
    font-family: 'zhanghaishan';
    src: url('../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.ttf') format("truetype"), url('../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff'), url('../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff2'), url('../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.svg'), url('../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.eot'), url('../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.otf');
  }
  .gaugehalf{
      width: 80px;
      height: 80px;
      div{
          width: 80px;
          height: 80px;
      }
  }
</style>
