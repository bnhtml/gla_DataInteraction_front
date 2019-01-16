<template>
    <div class="gauge">
        <canvas ref='gauge' width='170' height='170'></canvas>
    </div>
</template>

<script>
    export default {
        name: 'gauge',
        props:['option'],
        mounted() {
            this.getGauge();
        },
        methods: {
            getGauge() {
                let option = {
                    series: [{
                        type: 'gauge',
                        radius: '90%',
                        data: [{
                            value: Number(this.option.value),
                        }],
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                width: 1,
                                color:[[1, "#299a9e"]]
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 10, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: "auto"
                            },
                        },
                        
                        splitLine: { // 分隔线
                            length: 10, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        detail: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },
                    }]
                };
                let myChart = this.$echarts.init(this.$refs.gauge);
                myChart.setOption(option, true);
            }
        }
    }
</script>

<style>

</style>
