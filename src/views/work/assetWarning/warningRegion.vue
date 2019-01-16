// 地区
<template>
    <div class="warningRegion" v-breadcrumb="breadcrumb">
        <Title :title="titleName+'资产填报预警情况'"></Title>
        <Row class="warningRegion-cont" v-if='perfect.loading&&normality.loading'>
            <i-col span='10'>
                <div class="warningRegion-cont-inner" @click='goMore' :style='{"cursor":isCursor}'>
                    <div class="warningRegion-cont-inner-top" >
                        <dl  :style='{borderColor:levelColor[getLevel(100-warningNum)]}'>
                            <dt><span><strong>{{warningNum}}%</strong> <b :style='{color:levelColor[getLevel(100-warningNum)]}'>{{levelText[getLevel(100-warningNum)]}}</b> </span><span>资产填报预警指数</span></dt>
                            <!-- <dd><img :src="require('../../../assets/img/icon/chart_level_'+getLevel(100-warningNum)+'.png')" alt=""></dd> -->
                            <p class="tip">
                                反映数据填报预警程度的指标，预警指数越高，数据填报质量越差，是对填报数据异常情况、不完整情况的综合反映。资产填报预警指数=（1-数据合规度）*权重1+（1-数据完备度）*权重2 （权重1=0.5；权重2=0.5）
                            </p>
                        </dl>
                    </div>
                    <div class="warningRegion-cont-inner-bottom" >
                        <dl >
                            <dt class="pos-relative" :style='{borderColor:levelColor[getLevel(perfect.completeness)]}'>
                                    <strong>{{perfect.completeness}}<span>%</span><b :style='{color:levelColor[getLevel(perfect.completeness)]}'>{{levelText[getLevel(perfect.completeness)]}}</b></strong>
                                    <p>填报数据完备度</p>
                                    <p class="tip">反映数据填报完整程度的指标，完备度越高，资产填报的完整程度越好，<span>例如省发改委所有业务系统需要填报的字段数是100个，该单位实际填写了98，则该单位业务系统填报的完备度是98%</span></p>
                                </dt>
                            <dd><b :style='{background:levelColor[getLevel(perfect.completeness)]}'></b><span>实填数据量</span><span :style='{color:levelColor[getLevel(perfect.completeness)]}'>{{perfect.fileds}}</span></dd>
                            <dd><b :style='{background:levelColor[getLevel(perfect.completeness)]}'></b><span>应填数据量</span><span :style='{color:levelColor[getLevel(perfect.completeness)]}'>{{perfect.total}}</span></dd>
                        </dl>
                        <dl >
                            <dt class="pos-relative" :style='{borderColor:levelColor[getLevel(normality.percent)]}'>
                                    <strong>{{normality.percent}}<span>%</span><b :style='{color:levelColor[getLevel(normality.percent)]}'>{{levelText[getLevel(normality.percent)]}}</b></strong>
                                    <p>填报数据合规度</p>
                                    <p class="tip">反映数据填报规范程度的指标，合规度越高，资产填报的数据，越符合系统的规范要求，<span>例如省发改委所有业务系统实际填报的字段数是100个，该单位实际填写字段数中有98个符合系统的规范要求，则该单位业务系统填报的数据合规度是98%</span></p>
                                </dt>
                            <dd><b :style='{background:levelColor[getLevel(normality.percent)]}'></b><span>合规数据量</span><span :style='{color:levelColor[getLevel(normality.percent)]}'>{{normality.total}}</span></dd>
                            <dd><b :style='{background:levelColor[getLevel(normality.percent)]}'></b><span>实填数据量</span><span :style='{color:levelColor[getLevel(normality.percent)]}'>{{normality.sumTotal}}</span></dd>
                        </dl>
                    </div>
                    <div class="info">
                        <!-- <p> 资产填报预警指数=(填报数据完备度*权重系统1+填报数据异常度*权重系数2)*100% </p>
                            <p>(备注：权重系数1=0.5,权重系数2=0.5）</p>
                            <p>填报数据完备度=实填数据量/应填数据量 *100%</p>
                            <p>填报数据异常度=(填报数据类型异常数量+填报数据值异常数量)/实填数据量 *100%</p> -->
                        <p>1.资产填报预警指数=（1-数据合规度）*权重1+（1-数据完备度）*权重2 <br/>（ 权重1=0.5；权重2=0.5）</p>
                        <p>2.数据合规度=符合系统要求的字段总数/实际填报的字段总数*100%；</p>
                        <p>3.数据完备度=实际填报的字段总数/应该填写的字段总数*100%。</p>
                    </div>
                </div>
            </i-col>
            <i-col span='14'>
                <Map :jsonCode="jsonCode" :width="width" :height="height" :strip="strip" @mapClick="handelClick"></Map>
            </i-col>
        </Row>
        <Spin size="large" fix v-else>
            <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
        </Spin>
    </div>
</template>

<script>
    import Map from "@/components/charts/map";
    import Title from '@/components/title/index';
    export default {
        name: 'warningRegion',
        data() {
            let radioIndex = ['assetWarning', 'warningCityState'].indexOf(this.$route.name);
            let radio = ['0', '-1'][radioIndex];
            let parent=[{
                        name: '全省总体分析',
                        url: '/home/index/assetWarning'
                    },{
                        name: '市州部门分析',
                        url: '/home/index/warningCityState'
                    }][radioIndex];
            return {
                breadcrumb: [{
                        icon: 'dingwei',
                        name: '资产填报预警'
                    },
                    parent,
                ],
                levelText:['优秀', '较好', '一般', '较差',  '预警'],
                levelColor:['#00ffe7','#36bfff','rgba(153,140,241,1)','#efc54b','#ff5073'],// 优秀 较好 一般 较差  预警
                titleName:['省直部门','市州部门'][radioIndex],
                allCity: "全省",
                jsonCode: "guizhou",
                width: 618,
                height: 616,
                strip: true,
                radio,
                perfect: {
                    completeness: 0,
                    empty: 0,
                    fileds: 0,
                    total:0,
                    loading:false,
                }, //完备度
                normality: {
                    percent: 0,
                    data: 0,
                    type: 0,
                    total:0,//
                    sumTotal:0,//
                    loading:false
                }, // 合规度
                isCursor:'pointer',
                mapQuery:{
                    areaids:'',
                    name:'',
                    orgRootId:''
                }, // 地图参数
            }
        },
        components: {
            Map,
            Title,
        },
        computed:{
            // 预警指数
            warningNum(){
                return  ((100-this.perfect.completeness)*0.5+(100-this.normality.percent)*0.5).toFixed(2)
            }
        },
        mounted() {
            this.getEarlyWarning({areaids: this.radio});
            this.getCompleteness({areaids: this.radio});
        },
        methods: {
            /* 地图操作 */
            handelClick(e) {
                this.mapLoading = true;
                if (e == "返回首页") {
                    e = {
                        name: "全省",
                        id: 0
                    };
                }
                if (e == '省直部门') {
                    e = {
                        name: e,
                        id: 1
                    }
                }
                this.allCity = e.name;
                this.getEarlyWarning({
                    areaids: [e.id]
                });
                this.getCompleteness({
                    areaids: [e.id]
                });
                this.mapQuery.areaids=e.id;
                this.mapQuery.name=e.name;
            },
            /* 填报合规度 */
            getEarlyWarning(params) {
                this.$api.getEarlyWarning(params).then(res => {
                    this.normality.sumTotal = res.total;
                    if (res.data.length) {
                        let sum = 0
                        res.data.forEach((v, i) => {
                            sum += v.count;
                            if (v.abnormal_type == 1) { //1类型异常2值异常
                                this.normality.type = v.count
                            } else if (v.abnormal_type == 2) {
                                this.normality.data = v.count
                            }
                        });
                        this.normality.total = res.total-sum;
                        if (res.total) {
                            this.normality.percent = ((res.total - sum) / res.total * 100).toFixed(2)
                        } else {
                            this.normality.percent = (100).toFixed(2)
                        }
                        this.normality.loading = true;
                    }
                })
            },
            /* 填报数据完备度 */
            getCompleteness(params) {
                this.$api.warning.completeness(params).then(res => {
                    this.perfect = res;
                    this.perfect.loading = true;
                })
            },
            goMore() {
                if((this.allCity =='全省')||(this.allCity =='市州')){
                     this.mapQuery={areaids:'',name:'',orgRootId:''}
                 } 
                this.$router.push({
                    name: 'assetAnalysis',
                    query: {
                        type: 1,
                        isCityState:this.$route.name=='warningCityState'?true:false,
                        radioBtn: this.radio,
                        mapQuery:JSON.stringify(this.mapQuery)

                    }
                })
            },
            getLevel(level_0){
                level_0 = Number(level_0)
                if(level_0<=20){
                    return  4
                }else if(level_0>20&&level_0<=40){
                    return 3
                }else if(level_0>40&&level_0<=60){
                    return 2
                }else if(level_0>60&&level_0<=80){
                    return 1
                }else if(level_0>80&&level_0<=100){
                    return 0
                }
            }
        },
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .warningRegion {
        .warningRegion-cont {
            @extend %TitleBorder;
            border-top: 0;
            height: 616px;
            .warningRegion-cont-inner {
                @extend %TitleBorder;
                height: 562px;
                margin: 26px 0px 26px 54px;
                padding: 36px 18px 26px 20px;
                // cursor: pointer;
                &:hover{
                    @include box-shadow($bs:#1a5182);
                }
                .warningRegion-cont-inner-top {
                    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
                    dl {
                        border-left: solid 3px #00ffe7; 
                        padding-left: 26px;
                        margin-bottom: 20px;
                        display: inline-block;
                        position: relative;
                        padding: 5px 18px 0 30px;
                        height: 50px;
                        // cursor: pointer;
                        dt {
                            display: inline-block;
                            position: relative;
                            top: -7px;
                            span:first-child {
                                display: block;
                                font-family: 'PangMenZhengDao';
                                @include font($fz: 13px, $color:#fff);
                                height: 26px;
                                line-height: 26px;
                                strong {
                                    font-family: 'PangMenZhengDao';
                                    @include font($fz: 36px, $color:#fff);
                                }
                                b{
                                    font-family: 'PangMenZhengDao';
                                    font-size: 24px;
                                    padding-left: 5px;
                                }
                            }
                            span:last-child {
                                display: block;
                                line-height: 30px;
                                margin-top: 2px;
                                @include font($fz: 14px, $color:#fff);
                            }
                        }
                        dd {
                            display: inline-block;
                            margin-left: 10px;
                            position: relative;
                            top: -4px;
                        }
                        .tip {
                            @include font($fz: 14px, $color:rgba(255, 255, 255, 0.6));
                            position: absolute;
                            right: -440px;
                            top: -20px;
                            width: 458px;
                            // height: 70px;
                            padding: 3px;
                            background-color: #071c43;
                            border-radius: 4px;
                            border: solid 1px #1a78c9;
                            display: none;
                            z-index: 1000;
                        }
                    }
                    dl:hover {
                        // border-color: #00ffe7;
                        .tip {
                            display: block;
                        }
                    }
                }
                .warningRegion-cont-inner-bottom {
                    @include flex($j: space-between);
                    margin-top: 20px;
                    
                    dl {
                        width: 190px;
                        // cursor: pointer;
                        padding:14px;
                        box-sizing: border-box;
                        border-radius: 10px;
                        border:transparent solid 1px;
                        dt {
                            @include font($fz: 24px, $color:#fff);
                            border-bottom: solid 2px #68cfff;
                            padding-bottom: 10px;
                            margin-bottom: 5px;
                            strong {
                                display: block;
                                font-family: 'PangMenZhengDao';
                                @include font($fz: 30px, $color:#fff);
                                span {
                                    @include font($fz: 16px, $color:#fff);
                                    font-family: 'PangMenZhengDao';
                                }
                                b{
                                    font-family: 'PangMenZhengDao';
                                    font-size: 18px;
                                    padding-left: 5px;
                                }
                            }
                            p {
                                @include font($fz: 14px, $color:#fff);
                            }
                            .tip {
                                @include font($fz: 14px, $color:rgba(255, 255, 255, 0.6));
                                position: absolute;
                                right: -400px;
                                top: -20px;
                                width: 400px;
                                // height: 90px;
                                padding: 3px;
                                background-color: #071c43;
                                border-radius: 4px;
                                border: solid 1px #1a78c9;
                                display: none;
                                z-index: 1000;
                                span {
                                    color: yellow;
                                }
                            }
                        }
                        dt:hover {
                            
                        }
                        dd {
                            padding-top: 10px;
                            @include font($fz: 14px, $color:#fff);
                            position: relative;
                            b {
                                @include nums($w: 7px, $h:7px);
                                border-radius: 100%;
                                background: #00ffe7;
                                position: absolute;
                                left:0;
                                top:50%;
                                margin-top:2px;
                            }
                            span {
                                display: block;
                                padding-left: 30px;
                                line-height: 18px;
                                @include font($fz: 18px, $color:#fff);
                            }
                            span:last-child {
                                 @include font($fz: 18px, $color:#68cfff);
                                font-family: 'PangMenZhengDao';
                                 margin-top: 5px;
                            }
                        }
                        &:last-child {
                            dt {
                                border-bottom: solid 2px #feba70;
                            }
                            dd {
                                b {
                                    background: #feba70;
                                }
                                span:last-child {
                                    color: #feba70;
                                }
                                
                            }
                        }
                        &:hover{
                            // border-color: #00ffe7;
                            .tip {
                                display: block;
                            }
                        }
                    }
                }
                .info {
                    // margin-top: 50px;
                    p {
                        line-height: 28px;
                        @include font($fz: 14px, $color:rgba(255, 255, 255, 0.5));
                    }
                }
            }
        }
    }
</style>
