// 接口概况 - 国家接口
<template>
    <div class="nationalInterface">
        <!-- <el-card shadow="always" class="mt20 g-top">
            <p class="titleLeftBorder">国家部委接口概况</p>
            <el-row >
                <el-col :span="8" v-for='(v,i) in top' :key='i'>
                    <dl :style="{background:'url('+v.img+') no-repeat 100% 100%','backgroundSize':'contain'}">
                        <dt>{{v.title}}</dt>
                        <dd>{{v.num}}</dd>
                    </dl>
                </el-col>
            </el-row>
        </el-card> -->
        <el-card shadow="always" class="mt20 g-middle">
            <p class="titleLeftBorder">省直部门已封装接口概况</p>
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
                            <!-- <Ring :data='v.data' :color='v.color'> </Ring> -->
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
                top: [{
                        title: '数据目录总数',
                        num: 1234,
                        img: require('@/assets/images/leaderCockpit_4.png'),
                    },
                    {
                        title: '数据目录总数',
                        num: 1234,
                        img: require('@/assets/images/leaderCockpit_transparent_1.png'),
                    },
                    {
                        title: '数据目录总数',
                        num: 1234,
                        img: require('@/assets/images/leaderCockpit_transparent_1.png'),
                    },
                ],
                middle: [{
                    title: '数据记录总数',
                    num: '8848',
                    percent: '45%',
                    img: require('@/assets/images/leaderCockpit_3.png'),
                }, {
                    title: '数据记录总数',
                    num: '8848',
                    percent: '45%',
                    img: require('@/assets/images/leaderCockpit_6.png'),
                    data: [{
                        value: 50,
                        num: 50,
                        name: '',
                    }],
                    color: ['#33ABFB', '#D3DBE3']
                }, {
                    title: '数据记录总数',
                    num: '8848',
                    percent: '45%',
                    img: require('@/assets/images/leaderCockpit_6.png'),
                    data: [{
                        value: 50,
                        num: 50,
                        name: '',
                    }],
                    color: ['#33ABFB', '#D3DBE3']
                }, {
                    title: '数据记录总数',
                    num: '8848',
                    percent: '45%',
                    img: require('@/assets/images/leaderCockpit_6.png'),
                    data: [{
                        value: 50,
                        num: 50,
                        name: '',
                    }],
                    color: ['#33ABFB', '#D3DBE3']
                }, ],
                bottom: [{
                    title: '本单位开放接口总数',
                    num: '8848',
                    img: require('@/assets/images/leaderCockpit_line_1.png'),
                    borderColor: '#FB8533'
                }, {
                    title: '服务其他部门总数',
                    num: '8848',
                    img: require('@/assets/images/leaderCockpit_line_2.png'),
                    borderColor: '#35C3C4 '
                }, {
                    title: '接口被其他部门调用总数',
                    num: '8848',
                    img: require('@/assets/images/leaderCockpit_line_3.png'),
                    borderColor: '#9045D5 '
                }, {
                    title: '申请其他部门接口总数',
                    num: '8848',
                    img: require('@/assets/images/leaderCockpit_line_4.png'),
                    borderColor: '#FB8533'
                }, {
                    title: '提供服务部门总数',
                    num: '8848',
                    img: require('@/assets/images/leaderCockpit_line_5.png'),
                    borderColor: '#35C3C4 '
                }, {
                    title: '调用其他部门接口总数',
                    num: '8848',
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
    .nationalInterface {
        .g-top {
            height: 220px;
            dl {
                height: 143px;
                margin-top: 20px;
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
                dt {
                    flex: 1;
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
                    flex: 1
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
