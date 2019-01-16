// 环形图组件封装
<template>
    <div class="ringBox">
        <div ref="ring" class="echartsRing" width="350" height="250"></div>
        <!--     ringData 数据   color: 环形颜色      title：圆圈标题   :labelColor：箭头字体以及箭头颜色  hasLabel: 箭头提示是否显示-->
        <!-- <img src="../../../assets/img/bg/circle.png" alt="圆圈" class="circle"> -->
        <!-- 圆圈里面的数据不换行时字段为title -->
        <p v-if="!this.title.num&&!isShowNum" class="title" v-html="this.title.title || '暂无数据'"></p>
        <!-- 圆圈里面的数据换行时title为对象num :百分比 title:值 -->
        <div class="changeLine" v-else>
            <p class="font">{{this.title.num||0}}</p>
            <p class="ratio" v-html="this.title.title || '暂无数据'"></p>
        </div>
    </div>
</template>

<script type='text/javascript'>
    import echarts from 'echarts';
    export default {
        name: 'ring',
        // props: ['data', 'color', 'title', 'hasLabel'],
        props: {
            "data": {
                type: Array,
                default:[]
            },
            "color": {
                type: Array,
                default:["#FF644F", "#ced866", "#3FC2BD", "#4082da", "#5AC426", "#9c8ae7", "#CF9D41", "#19be6b"],
            },
            labelColor:{
                type: Array,
                default:["#FF644F", "#ced866", "#3FC2BD", "#4082da", "#5AC426", "#9c8ae7", "#CF9D41", "#19be6b"],
            },
            'title': {type:Object},
            'hasLabel': {
                type:Boolean,
                default:false
            },
            'cursor': {
                type: String,
                default: 'initial'
            }
        },
        data() {
            return {
                allCount: 0,
                ringData: [],
                isShowNum: false
            }
        },
        mounted() {
            this.initRing();
        },
        methods: {
            //初始化echarts实例 
            initRing() {
                this.getData();
                var ringChart = echarts.init(this.$refs.ring);
                let _this = this;
                let option = {
                    tooltip: {
                        show: true,
                        textStyle: {
                            color: 'rgba(255, 255, 255, .75)',
                            fontSize: 14,
                        },
                        formatter(res) {
                            return res.name + ' ' + (_this.allCount ? res.value : 0) + '% ' + res.data.num;
                        }
                    },
                    series: [{
                        type: 'pie',
                        clockWise: false,
                        radius: [80, 100],
                        center: ['50%', '50%'],
                        radius: ['50%', '70%'],
                        // roseType: 'radius',
                        // hoverAnimation: true,,
                        cursor: this.cursor, // 
                        color: this.color,
                        label: {
                            normal: {
                                show: this.hasLabel, // 是否显示标签[ default: false ]
                                position: 'outside', // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                                formatter: '{b}', // 标签内容
                                fontSize: 12,
                            },
                        },
                        data: this.ringData
                    }]
                }
                // ringChart.dispatchAction({
                //     type: 'highlight',
                //     seriesIndex: 0,
                //     dataIndex: 0
                // });
                // ringChart.on('mouseover', (v) => {
                //     if ($scope.initFlag && v.dataIndex != 0) {
                //         myChart.dispatchAction({
                //             type: 'downplay',
                //             seriesIndex: 0,
                //             dataIndex: 0
                //         });
                //     }
                // });
                // ringChart.on('mouseout', (v) => {
                //     if ($scope.initFlag) {
                //         myChart.dispatchAction({
                //             type: 'highlight',
                //             seriesIndex: 0,
                //             dataIndex: 0
                //         });
                //     }
                // });
                ringChart.setOption(option);
            },
            // 重新获取数据
            getData() {
                let count = 0;
                this.data.forEach((v, i) => {
                    if (v.value == 0) {
                        ++count
                    }
                })
                this.allCount = count == this.data.length ? 0 : 1;
                this.data.forEach((v, i) => {
                    if (!this.allCount) {
                        this.ringData.push({
                            value: 100 / this.data.length || 0,
                            num: v.number,
                            name: v.name,
                        })
                        this.isShowNum = true;
                    } else {
                        this.isShowNum = false
                        this.ringData.push({
                            value: Number(v.value) || 0,
                            num: v.number,
                            name: v.name,
                        })
                    }
                })
            }
        },
    }
</script>

<style lang='scss' scoped>
    .ringBox {
        width: 350px;
        height: 250px;
        text-align: center;
        position: relative;
        margin: 0 auto;
        .echartsRing {
            width: 100%;
            height: 100%;
        }
        .circle,
        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: auto;
            transform: translate(-50%, -50%);
            line-height: 40px;
        }
        .circle {
            width: 140px;
            height: 140px;
        }
        .title {
            font-family: PingFang-SC-Bold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal; // line-height: 75px;
            letter-spacing: 0px;
            color: #4987a5;
        }
        .changeLine {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            &>p {
                color: #fff;
                &:first-child {
                    font-family: 'PangMenZhengDao';
                }
            }
            &>.font {
                font-size: 26px;
                height: 40px;
                line-height: 40px;
            }
            &>.ratio {
                font-size: 16px;
                height: 20px;
                line-height: 20px;
                color: #fff;
            }
        }
    }
</style>


