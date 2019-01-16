<template>
    <div class="waterPolo" >
        <canvas width='100' height='100' ref='waterPolo' id='waterPolo'></canvas>
        <div class="g-title">{{option.title}}</div>
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
                        top: '32%',
                        left: 'center',
                        text: this.option.num,
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: 26,
                            fontFamily:'zhanghaishan'
                        },
                    },
                    series: [{
                        type: 'liquidFill',
                        data: [this.option.value/100],
                        radius: '90%',
                        color: ["#004eff"],
                        backgroundStyle: {
                            color: 'rgba(17,65,127, .5)'
                        },
                        
                        label: {
                            normal: {
                                padding: [50, 0, 0, 0],
                                show: true,
                                textStyle: {
                                    color: "#fff",
                                    insideColor: "#004eff",
                                    fontSize: 18,
                                    fontFamily:'zhanghaishan'
                                }
                            }
                        },
                        outline: {
                            show: false
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
.waterPolo{
  width: 100px;
  padding: 10px;
  background: url(../../../assets/img/special/waterBg.png) center 0 no-repeat;
  canvas{
    width: 100%;
    height: 100%;
  }
  .g-title{
    margin-top: 13px;
    width: 100%;
    text-align: center;
  }
}
</style>
