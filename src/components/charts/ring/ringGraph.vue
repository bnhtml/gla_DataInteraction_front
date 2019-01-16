<template>
    <div class="ringGraph">
        <div ref='ringGraph' class="ringGraphCont"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: '',
        props: ['ringGraph'],
        data() {
            return {}
        },
        mounted() {
            this.getInit();
        },
        methods: {
            getInit() {
                var color = ['#2FBAB2 ', '#1E8589', '#579ADD', '#2C61B9', '#F77A5C', '#D95450'];
                let option = {
                    tooltip: {
                        trigger: 'item',
                        show: true,
                        // formatter: "{b} : <br/>{d}%",
                        formatter(res){
                            return `${res.name} ${res.percent}% ${res.value}`
                        },
                        backgroundColor: 'rgba(0,0,0,0.7)', // 背景
                        padding: [8, 10], //内边距
                        extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                    },
                    series: this.ringGraph.list
                };
                let ringGraph = this.$echarts.init(this.$refs.ringGraph);
                ringGraph.setOption(option);
            }
        }
    }
</script>

<style scoped lang='scss'>
    .ringGraph {
        width: 200px;
        height: 200px;
        .ringGraphCont {
            width: 200px;
            height: 200px;
        }
    }
</style>
