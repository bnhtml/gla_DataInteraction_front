//业务全省部门
<template>
    <div class="businessDepartment" v-breadcrumb="breadcrumb">
        <div class="business-title">
            <Title :title='titleName+"业务系统情况"'></Title>
        </div>
        <Row class="businessDepartment-content">
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
                            <i-col span="12" v-for='(v,i) in cardTop' :key='i'>
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
                            <i-col span="12" v-for='(v,i) in cardBottom' :key='i'>
                                <dl class="borderColor" :style="{'borderColor':v.numColor}">
                                    <dt><strong>{{v.num}}</strong></dt>
                                    <dd>{{v.title}}({{v.company}})</dd>
                                </dl>
                            </i-col>
                        </Row>
                    </div>
                </div>
            </i-col>
            <i-col span='14' class="cont-right">
                <p class="rightBtn"><strong @click="goUp" v-if="cengji != 0&&cengji != -1"><i class="iconfont icon-fanhui"></i>返回上一级 <br></strong>
                    <span @click='moreBar.isShow=!moreBar.isShow'> <i class='iconfont icon-qiehuan'></i> 切换为{{moreBar.isShow==false?'柱状':'列表'}}显示 </span>
                </p>
                <div class="icon-department">
                    <ul v-if='!moreBar.isShow'>
                        <li v-for='(v,i) in deptList' :key='i' @click="iconClick(v, {name: 'provinceDetail'})">
                            <label><img :src="v.img" alt=""></label>
                            <span>{{v.orgSpecies}}</span>
                        </li>
                    </ul>
                    <div class="moreBar-wrapper" v-if='moreBar.isShow'>
                        <div class="bgColorBox">
                            <legendItem :legendData='legendData.data' :bg='legendData.color'></legendItem>
                            <newBar v-if="moreBar.isMoreBar&&moreBar.isShow" :bar="moreBar" :series="moreBar.series"></newBar>
                        </div>
                    </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import Title from '@/components/title/index';
    import legendItem from "@/components/charts/ring/legendItem.vue";
    import newBar from "@/components/charts/bar/newBar.vue";
    import CardColor from '@/components/gla-ui/CardColor.vue';
    import {
        SERVER_BASE_URL
    } from "@/http/config.js";
    let colorArr = [{
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#feba70" //"#614EBE"
                },
                {
                    offset: 1,
                    color: "#e8cb39"
                }
            ])
        },
        {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#10c4ff"
                },
                {
                    offset: 1,
                    color: "#3259ff"
                }
            ])
        },
        {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#14d9a4"
                },
                {
                    offset: 1,
                    color: "#0d8d70"
                }
            ])
        },
        {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#b783ff"
                },
                {
                    offset: 1,
                    color: "#694dff"
                }
            ])
        }
    ];
    export default {
        name: 'businessDepartment',
        data() {
            let PageAction = this.$route.query.action || '0';
            let radioIndex = ['businessDepartment', 'businessCityState'].indexOf(this.$route.name);
            let radio = ['1', '-1'][radioIndex];
            let parent = [{
                    name: '省直部门分析',
                    url: '/home/index/businessDepartment'
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
                titleName: ['省直部门', '市州部门'][radioIndex],
                radioIndex,
                citylevel: '',
                cengji: -1,
                radio,
                areaids: 0,
                deptList:[],
                dept: {
                    dept0: [],
                    dept1: [],
                    dept2: [],
                    deptBar0:[],
                    deptBar1:[],
                    deptBar2:[]
                },
                radioList: [{
                        text: '省级部门',
                        id: '1'
                    },
                    {
                        text: '市级部门',
                        id: '-1'
                    }
                ],
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
                        title: '业务系统建设费用',
                        num: '',
                        company: '万元',
                        borderColor: 'rgb(31, 222, 229)',
                        bg: ['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5) '],
                        numColor: 'rgb(232, 203, 57)',
                    },
                    {
                        title: '业务系统运维费用',
                        num: '',
                        company: '万元',
                        borderColor: 'rgb(31, 222, 229)',
                        bg: ['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5) '],
                        numColor: 'rgb(232, 203, 57)',
                    },
                ],
                legendData: {
                    data: [{
                            name: "已建业务系统"
                        },
                        {
                            name: "在建业务系统"
                        },
                        {
                            name: "拟建业务系统"
                        },
                        {
                            name: "未反馈"
                        },
                    ],
                    color: ["#feba70", "#10c4ff", "#14d9a4", "#b783ff"]
                }, // bar图例
                moreBar: {
                    company:['个','个','个','个'],
                    height: 500,
                    xData: [],
                    series: [],
                    isMoreBar: false,
                    isShow: false,
                    labelnames: ["已建业务系统", "在建业务系统", "拟建业务系统", '未反馈'],
                    colorArr: colorArr,
                },
                business: {
                    sumTotal: '', //系统总数
                    sumMoney: "", //系统总费用
                },
                isCursor: 'pointer',
                mapQuery: {
                    name: '',
                    areaids: '',
                    orgRootId: '',
                }, //  icon 信息   字段和地图页面保持一致
                mapQueryObj: {
                    mapQuery0: {},
                    mapQuery1: {},
                    mapQuery2: {},
                }
            }
        },
        components: {
            Title,
            legendItem,
            newBar,
            CardColor,
        },
        mounted() {
            this.getIcon()
        },
        methods: {
            /* 获得部门数据 */
            getIcon(v = {}) {
                this.moreBar.isShow = false;
                let add = {
                    '1': 2,
                    '-1': 1
                }[this.radio];
                let newcengji = this.cengji + add;
                if (this.cengji === -1) {
                    newcengji = 0
                }
                let apiInfo = [{
                        url_icon: 'orgSpeciesList',
                        url_data: 'sfUseOrgSpeciesGroup',
                        params: {
                            areaids: this.radio,
                        }
                    },
                    {
                        url_icon: 'areaOrgSpeciesList',
                        url_data: 'sfUseAreanameGroup',
                        params: {
                            areaids: this.radio,
                            orgRootId: v.orgRootId
                        }
                    },
                    {
                        url_icon: 'organizationViewList',
                        url_data: 'sfUseOrgGroup',
                        params: {
                            areaids: v.areaid || this.radio,
                            orgRootId: v.orgRootId
                        }
                    }
                ][newcengji];
                if (apiInfo) {
                    this.$api[apiInfo.url_icon](apiInfo.params).then(res => {
                        res.data.forEach((v, i) => {
                            v.img = SERVER_BASE_URL + v.img;
                        });
                        this.deptList = this.dept['dept' + newcengji] = res.data;
                        this.cengji = newcengji;
                        if (newcengji !== 0) {
                            this.mapQuery.orgRootId = this.mapQueryObj['mapQuery' + newcengji].orgRootId = v.orgRootId || ''
                            this.mapQuery.name =this.mapQueryObj['mapQuery' + newcengji].name = '【' + v.orgSpecies + '】';
                            this.mapQuery.areaids =this.mapQueryObj['mapQuery' + newcengji].areaids =  apiInfo.params.areaids;
                        }
                    });
                    this.$api[apiInfo.url_data](apiInfo.params).then(res => {
                        this.dept['deptBar' + newcengji] = res;
                        this.getMoreBar(res);
                    })
                    this.getCard(apiInfo.params);
                } else {
                    this.$store.commit('get_deptInfo', v)
                    /* icon 部门的最后一层跳往详情页 */
                    this.$router.push({
                        name: 'provinceDetail',
                        query: {
                            radioBtn: this.radio,
                            type: 2,
                            isCityState: this.$route.name == 'businessCityState' ? true : false
                        }
                    })
                }
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
                         this.business.sumMoney =  this.business.sumMoney.toFixed(2)
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
            /* 点击部门IOCN */
            iconClick(v) {
                this.getIcon(v)
            },
            goUp() {
                let add = {
                    '1': 2,
                    '-1': 1
                }[this.radio];
                this.cengji -= add;
                this.deptList = this.dept['dept'+this.cengji];
                if (this.cengji === 0) {
                    this.getCard({
                        areaids: this.radio,
                    });
                    this.mapQuery = {
                        name: '',
                        areaids: '',
                        orgRootId: '',
                    }
                } else  {
                   this.getCard({
                        areaids: this.radio,
                        orgRootId: this.deptList && this.deptList[0].orgRootId || ''
                    });
                    this.mapQuery.orgRootId = this.mapQueryObj['mapQuery' + this.cengji].orgRootId 
                    this.mapQuery.name =this.mapQueryObj['mapQuery' + this.cengji].name 
                }
                this.getMoreBar(this.dept['deptBar' + this.cengji])
            },
            /* 获得Bar值 */
            getMoreBar(res) {
                this.moreBar.xData = [];
                if (res.data.length) {
                    res.data.forEach((v, i) => {
                        this.moreBar.xData.push(v.name);
                    })
                }
                let legendNames = ['build', 'underConstruction', 'proposedConstruction', 'unknown']
                this.moreBar.series = this.moreBar.labelnames.map((o, i) => {
                    return {
                        type: 'bar',
                        data: res.data.map((oo, ii) => oo[legendNames[i]]),
                        stack: '9',
                        barWidth: 30,
                    }
                })
                this.moreBar.isMoreBar = true;
            },
            goBusinessTotal() {
                if (window.sysOrgCode && window.sysOrgCode.length === 1) return;
                let names = '';
                    names = '省直部门全国统建系统分析';
                    this.$router.push({
                        name: 'businessTotal',
                        query: {
                            type: 2,
                            isCityState: this.$route.name == 'businessCityState' ? true : false,
                            radioBtn: this.$route.name == 'businessCityState' ? -1 : 1,
                            mapQuery: JSON.stringify(this.mapQuery)
                        }
                    })
            },
            goBusinessMoney() {
                if (window.sysOrgCode && window.sysOrgCode.length === 1) return;
                let names = '';
                    names = '全省各部门资金投入';
                    this.$router.push({
                        name: 'businessMoney',
                        query: {
                            type: 2,
                            isCityState: this.$route.name == 'businessCityState' ? true : false,
                            radioBtn: this.$route.name == 'businessCityState' ? -1 : 1,
                            mapQuery: JSON.stringify(this.mapQuery)
                        }
                    })
            }
        }
    }
</script>


<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .business-title {
        position: relative;
        ul {
            position: absolute;
            top: 10px;
            right: 30px;
            li {
                display: inline-block;
                @include nums($w: 97px, $h:29px);
                text-align: center;
                line-height: 29px;
                border-radius: 15px;
                font-size: 16px;
                margin-left: 10px;
                border: solid 1px transparent;
                cursor: pointer;
            }
            li.hover {
                color: #00ffe7;
                border: solid 1px #00ffe7;
            }
        }
    }
    .businessDepartment-content {
        @extend %TitleBorder;
        border-top: 0;
        box-sizing: border-box;
        height: 616px;
        padding: 26px 0;
        .businessRegion-1-left {
            padding-left: 53px;
            .businessRegion-1-left-top {
                // cursor: pointer;
            }
            .businessRegion-1-left-bottom {
                // cursor: pointer;
            }
            .businessRegion-1-left-top-cont {
                height: 286px;
                @extend %TitleBorder;
                margin-top: 16px;
                margin-bottom: 18px;
                padding: 16px 25px; // cursor: pointer;
                &:hover {
                    @include box-shadow($bs: #1a5182);
                }
            }
            .businessRegion-1-left-bottom-cont {
                height: 207px;
                @extend %TitleBorder;
                margin-top: 14px;
                padding: 16px 25px; // cursor: pointer;
                &:hover {
                    @include box-shadow($bs: #1a5182);
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
                border-bottom: solid 1px #fff;
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
        .cont-right {
            position: relative;
            top: -17px;
            .rightBtn {
                position: relative;
                height: 50px;
                @include font($fz: 16px, $color:#fff);
                strong {
                    position: absolute;
                    left: 15px;
                    top: 15px;
                    cursor: pointer;
                    i {
                        position: relative;
                        top: -2px;
                        padding-right: 4px;
                    }
                }
                span {
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    cursor: pointer;
                }
            }
            .bgColorBox {
                padding: 0 10px;
            }
            .icon-department {
                @include nums($w: 100%, $h: 540px);
                ul {
                    @include nums($w: 100%, $h: 540px);
                    overflow-y: scroll;
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 80px;
                        max-height: 200px;
                        @include font($fz: 14px, $color: #fff);
                        margin: 10px 25px;
                        text-align: center;
                        border: solid 1px transparent;
                        border-radius: 4px;
                        cursor: pointer;
                        label {
                            display: block;
                            cursor: pointer;
                            img {
                                @include nums($w: 52px, $h:52px);
                                margin-top: 20px;
                                margin-bottom: 10px;
                            }
                        }
                        span {
                            display: block;
                            line-height: 25px;
                        }
                    }
                    li:hover {
                        border-color: #1087d7;
                        cursor: pointer;
                    }
                }
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
                height: 50px; // margin-top: 10px;
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
        .borderColor {
            width: 200px;
            padding-bottom: 14px;
            border-bottom: solid 1px #fff;
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
</style>
