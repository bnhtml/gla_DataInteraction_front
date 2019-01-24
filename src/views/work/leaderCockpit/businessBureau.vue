// 领导驾驶舱 - 业务局委
<template>
    <div class="businessBureau">
        <el-row :gutter="20">
            <el-col :span="10">
                <el-card shadow="always" class="g-top-left">
                    <p class="titleLeftBorder">数据区概况</p>
                    <el-row>
                        <el-col :span="12">
                            <dl :style="{background:'url('+dataList[0].img+') no-repeat center center','backgroundSize':'cover'}">
                                <dt>{{dataList[0].title}}</dt>
                                <dd>{{dataList[0].num}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="12">
                            <dl :style="{background:'url('+dataList[1].img+') no-repeat center center','backgroundSize':'cover'}">
                                <dt>{{dataList[1].title}}</dt>
                                <dd>{{dataList[1].num}}</dd>
                            </dl>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-card shadow="always" class="g-top-right">
                    <p class="titleLeftBorder">数据目录概况</p>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <dl :style="{background:'url('+dataList[2].img+') no-repeat center center','backgroundSize':'cover'}">
                                <dt>{{dataList[2].title}}</dt>
                                <dd>{{dataList[2].num}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="12">
                            <dl :style="{background:'url('+dataList[3].img+') no-repeat center center','backgroundSize':'cover','height':'65px'}">
                                <dt>{{dataList[3].title}}</dt>
                                <dd>{{dataList[3].num}}</dd>
                            </dl>
                            <dl :style="{background:'url('+dataList[4].img+') no-repeat center center','backgroundSize':'cover','height':'65px','margin-top':'10px'}">
                                <dt>{{dataList[4].title}}</dt>
                                <dd>{{dataList[4].num}}</dd>
                            </dl>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-card shadow="always" class="mt20 g-middle">
            <p class="titleLeftBorder">已封装API分布概况</p>
            <el-row :gutter="20">
                <el-col :span="6" v-for='(v,i) in middle' :key='i'>
                    <dl v-if='i==0' :style="{background:'url('+v.img+') no-repeat center center','backgroundSize':'cover'}">
                        <dt>{{v.title}}</dt>
                        <dd>{{v.num}}</dd>
                    </dl>
                    <dl v-else class="border">
                        <dt>
                                    <p>库表类接口总数</p>
                                    <p>{{v.num}}</p>
                                    <p>{{v.percent}}</p>
                                </dt>
                        <dd>
                            <Ring :data='v.data' :labelColor='v.labelColor' :color='v.color' :title='v.title' :hasLabel='v.hasLabel'></Ring>
                        </dd>
                    </dl>
                </el-col>
            </el-row>
        </el-card>
        <el-row class="mt20 g-bottom">
            <el-col :span="12">
                <el-card shadow="always" class="mt20 pb10">
                    <p class="titleLeftBorder">接口开放情况</p>
                    <dl v-for='(v,i) in bottom' :key='i' v-if='i<3' :style="{'border-color':v.borderColor}">
                        <dt><img :src="v.img" alt=""></dt>
                        <dd>
                            <p>{{v.num}}</p>
                            <p>{{v.title}}</p>
                        </dd>
                    </dl>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always" class="mt20 pb10">
                    <p class="titleLeftBorder">接口申请情况</p>
                    <dl v-for='(v,i) in bottom' :key='i' v-if='i>=3' :style="{'border-color':v.borderColor}">
                        <dt><img :src="v.img" alt=""></dt>
                        <dd>
                            <p>{{v.num}}</p>
                            <p>{{v.title}}</p>
                        </dd>
                    </dl>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Ring from '../../../components/charts/ring/ring.vue';
    export default {
        data() {
            return {
                dataList: [{
                    title: '数据表总数',
                    num: '28',
                    img: require('@/assets/images/leaderCockpit_5.png'),
                }, {
                    title: '数据记录总数',
                    num: '35',
                    img: require('@/assets/images/leaderCockpit_6.png'),
                }, {
                    title: '2135',
                    num: '8848',
                    img: require('@/assets/images/leaderCockpit_7.png'),
                }, {
                    title: '数据记录总数',
                    num: '1135',
                    img: require('@/assets/images/leaderCockpit_1.png'),
                }, {
                    title: '数据记录总数',
                    num: '1000',
                    img: require('@/assets/images/leaderCockpit_2.png'),
                }],
                middle: [{
                    title: '数据记录总数',
                    num: '1135',
                    percent: '45%',
                    img: require('@/assets/images/leaderCockpit_3.png'),
                }, {
                    title: '数据记录总数',
                    num: '500',
                    percent: '45%',
                    img: require('@/assets/images/leaderCockpit_6.png'),
                    "data": [{
                        "value": "55.00",
                        "name": "",
                        "number": "55"
                    }, {
                        "value": "45.00",
                        "name": "",
                        "number": "45"
                    }, ],
                    "labelColor": ['#D3DBE3', '#33ABFB'],
                    "color": ['#D3DBE3', '#33ABFB'],
                    "hasLabel": false,
                    "title": {
                        "title": " "
                    }
                }, {
                    title: '数据记录总数',
                    num: '500',
                    percent: '45%',
                    img: require('@/assets/images/leaderCockpit_6.png'),
                    "data": [{
                        "value": "55.00",
                        "name": "",
                        "number": "55"
                    }, {
                        "value": "45.00",
                        "name": "",
                        "number": "45"
                    }, ],
                    "labelColor": ['#D3DBE3', '#33ABFB'],
                    "color": ['#D3DBE3', '#33ABFB'],
                    "hasLabel": false,
                    "title": {
                        "title": " "
                    }
                }, {
                    title: '数据记录总数',
                    num: '135',
                    percent: '10%',
                    img: require('@/assets/images/leaderCockpit_6.png'),
                    "data": [{
                        "value": "90",
                        "name": "",
                        "number": "90"
                    }, {
                        "value": "10.00",
                        "name": "",
                        "number": "10"
                    }, ],
                    "labelColor": ['#D3DBE3', '#33ABFB'],
                    "color": ['#D3DBE3', '#33ABFB'],
                    "hasLabel": false,
                    "title": {
                        "title": " "
                    }
                }, ],
                bottom: [{
                    title: '本单位开放接口总数',
                    num: '135',
                    img: require('@/assets/images/leaderCockpit_line_1.png'),
                    borderColor: '#FB8533'
                }, {
                    title: '服务其他部门总数',
                    num: '21',
                    img: require('@/assets/images/leaderCockpit_line_2.png'),
                    borderColor: '#35C3C4 '
                }, {
                    title: '接口被其他部门调用总数',
                    num: '11350',
                    img: require('@/assets/images/leaderCockpit_line_3.png'),
                    borderColor: '#9045D5 '
                }, {
                    title: '申请其他部门接口总数',
                    num: '21',
                    img: require('@/assets/images/leaderCockpit_line_4.png'),
                    borderColor: '#FB8533'
                }, {
                    title: '提供服务部门总数',
                    num: '12',
                    img: require('@/assets/images/leaderCockpit_line_5.png'),
                    borderColor: '#35C3C4 '
                }, {
                    title: '调用其他部门接口总数',
                    num: '210',
                    img: require('@/assets/images/leaderCockpit_line_6.png'),
                    borderColor: '#9045D5 '
                }, ]
            }
        },
        components: {
            Ring,
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .businessBureau {
        .g-top-left {
            height: 220px;
            .el-row {
                margin: 0 -20px;
                padding-top: 20px;
            }
            .el-col-12 {
                &:first-child {
                    padding: 0 10px 0 20px;
                }
                &:last-child {
                    padding: 0 20px 0 10px;
                }
                dl {
                    height: 140px;
                    padding: 15px;
                    dt {
                        @include font($fz: 14px, $color:#fff);
                    }
                    dd {
                        @include font($fz: 30px, $color:#fff);
                    }
                }
            }
        }
        .g-top-right {
            height: 220px;
            .el-row {
                margin: 0 -20px;
                padding-top: 20px;
                .el-col-12 {
                    &:first-child {
                        padding: 0 10px 0 20px;
                    }
                    &:last-child {
                        padding: 0 20px 0 10px;
                        dl {
                            display: flex;
                            justify-content: space-between;
                            dd {
                                position: relative;
                                top: -10px;
                            }
                        }
                    }
                    dl {
                        height: 140px;
                        padding: 15px;
                        dt {
                            @include font($fz: 14px, $color:#fff);
                        }
                        dd {
                            @include font($fz: 30px, $color:#fff);
                        }
                    }
                }
            }
        }
        .g-middle {
            height: 220px;
            dl {
                height: 140px;
                padding: 15px;
                margin-top: 20px;
                dt {
                    @include font($fz: 14px, $color:#fff);
                }
                dd {
                    @include font($fz: 30px, $color:#fff);
                }
            }
            dl.border {
                background-color: rgba(51, 171, 251, 0.05);
                border: 1px solid #33ABFB;
                display: flex;
                position: relative;
                dt {
                    p {
                        @include font($fz: 14px, $color:#666);
                        &:nth-child(2) {
                            font-size: 30px;
                            color: rgba(0, 0, 0, 0.85);
                        }
                        &:nth-child(3) {
                            font-size: 24px;
                            color: rgba(0, 0, 0, 0.85);
                        }
                    }
                }
                dd {
                    position: absolute;
                    top: -45px;
                    right: -100px;
                    transform: scale(.5);
                    /deep/ .ringBox {}
                }
            }
        }
        .g-bottom {
            margin: 0 -10px;
            .el-col-12 {
                padding: 0 10px;
                dl {
                    display: flex;
                    padding: 29px 20px 25px 20px;
                    height: 100px;
                    border: solid 1px pink;
                    margin-top: 20px;
                    dt {
                        width: -moz-calc(100% - 170px);
                        width: -webkit-calc(100% - 170px);
                        width: calc(100% - 170px);
                        height: 46px;
                        img {
                            width: -moz-calc(100% - 20px);
                            width: -webkit-calc(100% - 20px);
                            width: calc(100% - 20px);
                            height: 46px;
                        }
                    }
                    dd {
                        width: 170px;
                        position: relative;
                        top: -15px;
                        p {
                            font-size: 30px;
                            color: rgba(0, 0, 0, 0.85);
                            &:last-child {
                                font-size: 14px;
                                color: #666666;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
