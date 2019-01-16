<template>
    <div class="waterPolo" >
        <canvas width='170' height='170' ref='waterPolo' id='waterPolo'></canvas>
    </div>
</template>

<script>
    import 'echarts-liquidfill';
    export default {
        name: 'waterPolo',
        props: ['option'],
        data() {
            return {}
        },
        mounted() {
            this.getWaterPolo()
        },
        methods: {
            getWaterPolo() {
                let option = {
                    title: {
                        top: '20%',
                        left: 'center',
                        text: this.option.title,
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: 14
                        },
                    },
                    series: [{
                        type: 'liquidFill',
                        data: [this.option.value/100],
                        radius: '90%',
                        color: [this.option.value<0.3?"#d30737":this.option.value>0.7?"#06a1d8":"#be5939"],
                        backgroundStyle: {
                            color: 'transparent'
                        },
                        
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 24,
                                    color: this.option.value<0.3?"#d30737":this.option.value>0.7?"#06a1d8":"#be5939",
                                    insideColor: this.option.value<0.3?"#d30737":this.option.value>0.7?"#06a1d8":"#be5939",
                                }
                            }
                        },
                        outline: {
                            show: true,
                            borderDistance: 8,
                            itemStyle: {
                                color: 'none',
                                borderColor: this.option.value<0.3?"#d30737":this.option.value>0.7?"#06a1d8":"#be5939",
                                borderWidth: 2,
                                // shadowBlur: 10, // 光圈
                                // shadowColor: '#fff'
                            }
                        },
                    }]
                };
                let waterPolo = this.$echarts.init(this.$refs.waterPolo);
                waterPolo.setOption(option);
            }
        }
    }
</script>

<style scoped lang='scss'>

</style>
