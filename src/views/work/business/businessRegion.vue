// 业务全省地区
<template>
    <div class="businessRegion" v-breadcrumb="breadcrumb">
        <div class="titleBar">
            <Title :title='titleName+"业务系统情况"'></Title>
        </div>
        <Row class="businessRegion-1">
            <i-col span='10' class="businessRegion-1-left">
                <div class="businessRegion-1-left-top" @click='goBusinessTotal'>
                    <p class="titleLeftBorder">业务系统数量情况</p>
                    <div class="businessRegion-1-left-top-cont" :style='{"cursor":isCursor}'>
                        <div class="top-border">
                            <dl>
                                <dt><span><strong>{{business.sumTotal}}</strong><i class="icon iconfont icon-data" :style='{color:"#00ffe7"}'></i>  </span><span>业务系统总数(个)</span></dt>
                                <!-- <dd><img src="../../../assets/img/icon/chart_4.png" alt=""></dd> -->
                            </dl>
                        </div>
                        <Row>
                            <i-col span="12" v-for='(v,i) in cardTop' :key='i' >
                                <dl class="borderColor" :style="{'borderColor':v.percentColor}">
                                    <dt><strong>{{v.num}}</strong></dt>
                                    <dd>{{v.title}}({{v.company}})<span :style="{'color':v.percentColor}">{{v.percent}}%</span></dd>
                                </dl>
                            </i-col>
                        </Row>
                    </div>
                </div>
                <div class="businessRegion-1-left-bottom" @click='goBusinessMoney'>
                    <p class="titleLeftBorder">业务系统资金使用情况</p>
                    <div class="businessRegion-1-left-bottom-cont" :style='{"cursor":isCursor}'>
                        <div class="top-border">
                            <dl :style='{borderColor:"#e8cb39"}'>
                                <dt><span><strong>{{business.sumMoney}}</strong> <i class="icon iconfont icon-data" :style='{color:"#e8cb39"}'></i> </span><span>业务系统总费用(万元)</span></dt>
                                <!-- <dd><img src="../../../assets/img/icon/chart_3.png" alt=""></dd> -->
                            </dl>
                        </div>
                        <Row>
                            <i-col span="12" v-for='(v,i) in cardBottom' :key='i' >
                                <dl class="borderColor" :style="{'borderColor':v.numColor}">
                                    <dt><strong>{{v.num}}</strong></dt>
                                    <dd>{{v.title}}({{v.company}})</dd>
                                </dl>
                            </i-col>
                        </Row>
                    </div>
                </div>
            </i-col>
            <i-col span='14'>
                <div class="businessRegion-1-right">
                    <!-- <p>业务系统总投入资金热力图</p> -->
                    <Map :jsonCode="jsonCode" :width="width" :height="height" :strip="strip" @mapClick="handelClick"></Map>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import Title from '@/components/title/index';
    import Map from "@/components/charts/map";
    import CardColor from '@/components/gla-ui/CardColor.vue';
    export default {
        name: 'businessRegion',
        data() {
            let radioIndex = ['businessIndex', 'businessCityState'].indexOf(this.$route.name);
            let parent=[
                {
                    name: '全省总体分析',
                    url: '/home/index/businessIndex'
                },
                {
                    name: '市州部门分析',
                    url: '/home/index/businessCityState'
                }
            ][radioIndex];
            return {
                breadcrumb: [{
                        icon: 'dingwei',
                        name: '业务系统分析'
                    },
                    parent,
                ],
                titleName:['全省总体','市州部门'][radioIndex],
                allCity: "全省",
                jsonCode: "guizhou",
                width: 618,
                height: 580,
                strip: true,
                cardTop: [{
                        title: '已建业务系统',
                        percent: '',
                        num: '',
                        company: '个',
                        borderColor: 'rgb(26, 164, 255)',
                        bg: ['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)'],
                        numColor: '#fff',
                        percentColor: '#1ba0ff',
                    },
                    {
                        title: '在建业务系统',
                        percent: '',
                        num: '',
                        company: '个',
                        borderColor: 'rgb(26, 164, 255)',
                        bg: ['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)'],
                        numColor: '#fff',
                        percentColor: '#1ba0ff',
                    },
                    {
                        title: '拟建业务系统',
                        percent: '',
                        num: '',
                        company: '个',
                        borderColor: 'rgb(26, 164, 255)',
                        bg: ['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)'],
                        numColor: '#fff',
                        percentColor: '#1ba0ff',
                    },
                    {
                        title: '未反馈',
                        percent: '',
                        num: '',
                        company: '个',
                        borderColor: '#d56c59',
                        bg: ['rgba(202,93,85,0.5)', 'rgba(213,108,89,0.5) '],
                        numColor: '#fff',
                        percentColor: '#d06557',
                    },
                ],
                cardBottom: [{
                        title: '建设费用',
                        num: '',
                        company: '万元',
                        borderColor: 'rgb(31, 222, 229)',
                        bg: ['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5) '],
                        numColor: '#e8cb39',
                    },
                    {
                        title: '运维费用',
                        num: '',
                        company: '万元',
                        borderColor: 'rgb(31, 222, 229)',
                        bg: ['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5) '],
                        numColor: '#e8cb39',
                    },
                ],
                business: {
                    sumTotal: '', //系统总数
                    sumMoney: "", //系统总费用
                },
                isCursor:'pointer',
                mapQuery:{
                    areaids:'',
                    name:'',
                    orgRootId:''
                }, // 地图参数
            }
        },
        components: {
            Title,
            Map,
            CardColor,
        },
        mounted() {
            this.getCard({
                areaids: this.$route.name=='businessCityState'?-1:0
            });
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
                this.getCard({
                    areaids: [e.id]
                });
                this.mapQuery.areaids=e.id;
                this.mapQuery.name=e.name;
                this.mapLoading = false;
            },
            /* 卡片数据 */
            getCard(params) {
                /* 已建 在建 拟建 未反馈*/
                let topNum = ['build', 'underConstruction', 'proposedConstruction', 'unknown']
                let topPercent = ['buildPercent', 'underConstructionPercent', 'proposedConstructionPercent', 'unknownPercent']
                /*建设  运维  */
                let bottomNum = ['constructionCost', 'operationCost'];
                this.$nextTick(() => {
                    this.$api.sfUseGroup(params).then(res => {
                        this.business.sumTotal = res.total;
                        this.business.sumMoney = res.constructionCost + res.operationCost //建设费用+运维费用
                        this.business.sumMoney = this.business.sumMoney.toFixed(2)
                        topNum.forEach((v, i) => {
                            this.cardTop[i].num = res[v]
                        })
                        topPercent.forEach((v, i) => {
                            this.cardTop[i].percent = res[v]
                        })
                        bottomNum.forEach((v, i) => {
                            this.cardBottom[i].num = res[v]
                        })
                    })
                })
            },
            goBusinessTotal() {
                if((this.allCity =='全省')||(this.allCity =='市州')){
                     this.mapQuery={areaids:'',name:'',orgRootId:''}
                 } 
                this.$router.push({
                    name: 'businessTotal',
                    query: {
                        type: 1,
                        isCityState:this.$route.name=='businessCityState'?true:false,
                        radioBtn:this.$route.name=='businessCityState'?-1:0,
                        mapQuery:JSON.stringify(this.mapQuery)
                    }
                })
            },
            goBusinessMoney() {
                if((this.allCity =='全省')||(this.allCity =='市州')){
                     this.mapQuery={areaids:'',name:'',orgRootId:''}
                 } 
                this.$router.push({
                    name: 'businessMoney',
                    query: {
                        type: 1,
                        isCityState:this.$route.name=='businessCityState'?true:false,
                        radioBtn:this.$route.name=='businessCityState'?-1:0,
                        mapQuery:JSON.stringify(this.mapQuery)
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .businessRegion {
        height: 666px;
        .businessRegion-1 {
            height: 616px;
            @extend %TitleBorder;
            border-top: 0;
            padding: 26px 0;
            .businessRegion-1-left {
                padding-left: 53px;
                .businessRegion-1-left-top-cont {
                    height: 286px;
                    @extend %TitleBorder;
                    margin-top: 16px;
                    margin-bottom: 18px;
                    padding: 16px 25px;
                    // cursor: pointer;
                    &:hover{
                    @include box-shadow($bs:#1a5182);
                }
                }
                .businessRegion-1-left-bottom-cont {
                    height: 207px;
                    @extend %TitleBorder;
                    margin-top: 14px;
                    padding: 16px 25px;
                    // cursor: pointer;
                    &:hover{
                    @include box-shadow($bs:#1a5182);
                }
                }
                .ivu-col-span-12:nth-child(2n) {
                    .borderColor {
                        float: right;
                    }
                }
                .borderColor {
                    width: 200px;
                    padding-bottom: 14px;
                    border-bottom: solid 2px #fff;
                    margin-top: 10px;
                    dt {
                        @include font($fz: 18px, $color:#fff);
                        font-family: 'PangMenZhengDao';
                        strong {
                            @include font($fz: 30px, $color:#fff);
                            font-family: 'PangMenZhengDao';
                        }
                    }
                    dd {
                        @include font($fz: 14px, $color:#fff);
                        line-height: 18px;
                        span {
                            @include font($fz: 18px);
                            font-family: 'PangMenZhengDao';
                            float: right;
                        }
                    }
                }
            }
        }
        .businessRegion-1-right {
            p {
                @include font($fz: 20px, $color:#9ed7ff);
                text-align: center;
            }
        }
        .top-border {
            border-bottom: solid 1px rgba(255, 255, 255, 0.2);
            padding-bottom: 19px;
            dl {
                border-left: solid 3px #00ffe7;
                padding-left: 26px;
                display: inline-block;
                position: relative;
                cursor: pointer;
                height: 50px;
                // margin-top: 10px;
                dt {
                    display: inline-block;
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
                        i {
                            @include font($fz: 23px);
                            position: relative;
                            top: -9px;
                        }
                    }
                    span:last-child {
                        display: block;
                        height: 28px;
                        line-height: 28px;
                        @include font($fz: 14px, $color:#fff);
                    }
                }
                dd {
                    display: inline-block;
                    margin-left: 40px;
                    position: relative;
                    top: 3px;
                }
            }
        }
    }
</style>
