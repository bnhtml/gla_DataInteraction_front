/* 
    业务 资金投入
    type  1  全省地区   2 全省各部门
 */
<template>
    <div class="businessMoney" v-breadcrumb="breadcrumb">
        <div class="businessMoney-2">
            <div class="titleBar">
                <Title :title="title0"></Title>
                <span class="right-more" @click="goMore(0)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <div class="businessMoney-2-cont">
                <p v-for='(v,i) in circleList' :key='i'>
                    <CardColor :title='v.type' :borderColor='"rgb(26, 164, 255)"' :bg="['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)']" v-if='i<4'>
                        <dd class="dd-num">
                            <p :style="{'color':v.numColor}"> <b>{{v.num}}</b>万元 <span :style="{'color':'#1bfff7'}">{{v.percent}}%</span></p>
                            <Progress :percent="Number(v.percent)" :hide-info='true' :stroke-width='8' status="normal" class='ivu-progress ivu-progress-normal' />
                        </dd>
                    </CardColor>
                    <CardColor :title='v.type' :borderColor='"#ff526f"' :bg="['rgba(202,93,85,0.5)', 'rgba(213,108,89,0.5)']" v-else>
                        <dd class="dd-num">
                            <p :style="{'color':v.numColor}"> <b>{{v.num}}</b>万元 <span :style="{'color':'#ff8398'}">{{v.percent}}%</span></p>
                            <Progress :percent="Number(v.percent)" :hide-info='true' :stroke-width='8' status="normal" class='ivu-progress ivu-progress-wrong' />
                        </dd>
                    </CardColor>
                </p>
            </div>
        </div>
        <div class="businessMoney-1">
            <div class='titleBar pos-relative'>
                <Title :title='title4'></Title>
                <ul class="tabTitleBtn" style='right:80px'>
                    <li v-for='(v,i) in rightRadioList' :key="i" :class="rightRadioIndex==i?'hover':''" @click='changeRadio(v,i)'>{{v}}</li>
                </ul>
                <span class="right-more" @click="goMore(4)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <Row class="businessMoney-1-cont">
                <i-col span='16'>
                    <newBar v-if="isBarTop_1" :bar="barTopData_1" :series="barTopData_1.series"></newBar>
                </i-col>
                <i-col span='8'>
                    <list :title='listTop_1.title'>
                        <ul>
                            <li v-for='(v,i) in listTop_1.data' :key='i'>
                                <label>{{i+1}}</label> {{v.title}}
                                <span>{{v.num|number_format(2)}}</span>
                            </li>
                        </ul>
                    </list>
                </i-col>
            </Row>
            <Spin size="large" fix v-if="!isBarTop_1">
                <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
            </Spin>
        </div>
        <Row class="businessMoney-3">
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title="title2"></Title>
                    <span class="right-more" @click="goMore(2)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <div class="businessMoney-3-cont">
                    <div class="typeMoney">
                        <p>
                            <label style='background:#e8cb39'></label> 建设费用
                            <span>建设费用总额为{{line.constructionCost.sum}}万元<span v-if='line.constructionCost.unknown'>，其中存在没有填写日期的建设费用{{line.constructionCost.unknown}}万元，这部分数据没有在资金投入走势图中进行展示，需要填报单位完善数据后方可展示出来</span></span>
                        </p>
                        <p>
                            <label style='background:#694dff'></label> 运维费用
                            <span>建设费用总额为{{line.operationCost.sum}}万元<span v-if='line.operationCost.unknown'>，其中存在没有填写日期的建设费用{{line.operationCost.unknown}}万元，这部分数据没有在资金投入走势图中进行展示，需要填报单位完善数据后方可展示出来</span></span>
                        </p>
                    </div>
                    <newBar :bar="line" :series="line.series"></newBar>
                </div>
            </i-col>
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title="title1"></Title>
                    <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <div class="businessMoney-3-cont">
                    <newBar :bar="barData" :series="barData.series"></newBar>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script type="text/javascript">
    import echarts from "echarts";
    import legendItem from "@/components/charts/ring/legendItem.vue";
    import lineItem from "@/components/charts/line/line.vue";
    import ring from "@/components/charts/ring/ring.vue";
    import list from "@/components/list/list.vue";
    import newBar from "@/components/charts/bar/newBar.vue";
    import Title from '@/components/title/index';
    import CardColor from '@/components/gla-ui/CardColor.vue';
    export default {
        name: "businessMoney",
        data() {
            let {
                query,
                params,
                name,
                fullPath
            } = this.$route;
            query.mapQuery = JSON.parse(query.mapQuery);
            query.areaids = query.mapQuery.areaids ? query.mapQuery.areaids : query.radioBtn;
            let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
            let parent = [{
                    name: '全省总体分析',
                    url: '/home/index/businessIndex'
                },
                {
                    name: '省直部门分析',
                    url: '/home/index/businessDepartment'
                }, {
                    name: '市州部门分析',
                    url: '/home/index/businessCityState'
                }
            ][typeThree];
            let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
            if (query.mapQuery.name) leftname = query.mapQuery.name
            return {
                breadcrumb: [{
                        icon: 'dingwei',
                        name: '业务系统分析'
                    },
                    parent,
                    {
                        name: leftname + '业务系统资金使用情况',
                        url: fullPath
                    }
                ],
                query,
                typeThree,
                titleName: leftname,
                rightRadioList: ['建设费用', '运维费用'],
                rightRadioIndex: 0,
                rightRadioName: '建设费用',
                radio: "全部范围",
                isBar: false,
                isBarTop_1: false,
                isBarTop_2: false,
                // 按系统分布情况分析信息配置
                barData: {
                    company: ['万元'],
                    height: 400,
                    xData: ["省级部署投入资金", "市州部署投入资金", "区县部署投入资金"],
                    labelnames: ['金额'],
                    series: []
                },
                // 全国各地区资金投入信息配置
                barTopData_1: {
                    company: ['万元'],
                    height: 320,
                    xData: [],
                    labelnames: ['金额'],
                    series: []
                },
                line: {
                    company: ['万元', '万元'],
                    legendData: ['建设', '运维'],
                    labelnames: ['建设费用', '运维费用'],
                    xData: [],
                    colorArr: [{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#e8cb39"
                            },
                            {
                                offset: 1,
                                color: "#feba70"
                            }
                        ])
                    }, {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#694dff"
                            },
                            {
                                offset: 1,
                                color: "#b783ff"
                            }
                        ])
                    }],
                    series: [],
                    operationCost: {}, // 运维
                    constructionCost: {}, // 建设
                    height: 300
                },
                // 用户范围投入金额分析信息配置
                capitalSource: {
                    data: [{
                            num: 0,
                            percent: 0,
                            name: "内部公众",
                        },
                        {
                            num: 0,
                            percent: 0,
                            name: "组织公众",
                        },
                        {
                            num: 0,
                            percent: 0,
                            name: "非组织公众",
                        }
                    ],
                    labelColor: [
                        "#FF644F",
                        "transparent",
                        "#ced866",
                        "transparent",
                        "#3FC2BD",
                        "transparent"
                    ],
                    color: ["#FF644F", "#ced866", "#3FC2BD"],
                    hasLabel: false,
                    isShow: false,
                    title: {
                        title: '投资金额(万元)'
                    }
                },
                circleList: [{
                        percent: "25",
                        color: "#CA543E",
                        type: "财务拨款",
                        num: 0,
                    },
                    {
                        percent: "25",
                        color: "#23C27D",
                        type: "自筹",
                        num: 0,
                    },
                    {
                        percent: "25",
                        color: "#614EBE",
                        type: "BT项目",
                        num: 0,
                    },
                    {
                        percent: "25",
                        color: "#34A4DF",
                        type: "其他",
                        num: 0,
                    }
                ],
                listTop_1: {
                    title: "各部门系统建设费用排名",
                    data: [{
                            title: "贵阳市",
                            num: "92万元"
                        },
                        {
                            title: "铜仁市",
                            num: "89万元"
                        },
                        {
                            title: "贵黔南市",
                            num: "75万元"
                        },
                        {
                            title: "遵义市",
                            num: "69万元"
                        },
                        {
                            title: "黔东南市",
                            num: "98万元"
                        },
                        {
                            title: "毕节市",
                            num: "82万元"
                        },
                        {
                            title: "安顺市",
                            num: "97万元"
                        }
                    ]
                }
            };
        },
        components: {
            legendItem,
            lineItem,
            ring,
            list,
            newBar,
            Title,
            CardColor,
        },
        computed: {
            title4() {
                return this.titleName + "业务系统资金投入情况对比";
            },
            title0() {
                return this.titleName + '业务系统资金来源分析';
            },
            title2() {
                return this.titleName + '资金投入走势图';
            },
            title1() {
                return this.titleName + '资金按系统部署情况分析';
            },
        },
        mounted() {
            let params;
            if (this.$route.query.type == 1) {
                params = {
                    areaids: this.query.areaids,
                }
            } else {
                params = {
                    areaids: this.query.areaids,
                    orgRootId: this.query.mapQuery.orgRootId
                }
            }
            this.changeCircleList(params);
            this.getSystemTrje(params);
            this.getLine(params);
            this.changeRadio(this.rightRadioName, this.rightRadioIndex);
        },
        methods: {
            /* 1  资金投入 建设费用/运维费用 */
            changeRadio(v, i) {
                let params;
                if (this.$route.query.type == 1) {
                    params = {
                        areaids: this.query.areaids,
                    }
                } else {
                    params = {
                        areaids: this.query.areaids,
                        orgRootId: this.query.mapQuery.orgRootId
                    }
                }
                let ISareaids = [1,2,3,4,5,6,7,8,9,10,11].indexOf(this.query.areaids) ==-1?false:true
                this.rightRadioIndex = i;
                this.rightRadioName = v;
                 if (this.$route.query.type == 2 ||ISareaids){
                    this.getOrgTrjeGroup(this.rightRadioName == '建设费用' ? 'qxbsTrje' : 'totalMtExp',params)
                    this.getOrgTrjeOrder(this.rightRadioName == '建设费用' ? 1 : 2,params);
                }else if (this.$route.query.type == 1) {
                    this.getCityTrjeGroup(this.rightRadioName == '建设费用' ? 'qxbsTrje' : 'totalMtExp', params);
                    this.getCityTrjeOrder(this.rightRadioName == '建设费用' ? 1 : 2,params);
                } 
            },
            /* 贵州省信息系统资金来源分析 */
            changeCircleList(e) {
                this.$api.funingSourceTrje(e).then(res => {
                    this.circleList = [];
                    let color = ["#10c4ff", "#14cede", "#694dff", "#e8cb39", '#ff5e52'];
                    color.forEach((v, i) => {
                        if (this.radio == '全部范围') {
                            this.circleList.push({
                                percent: res.data[i].percent,
                                color: color[i],
                                type: res.data[i].title,
                                num: res.data[i].num.toFixed(2),
                            })
                        } else if (this.radio == '建设') {
                            this.circleList.push({
                                percent: res.data[i].constructionPercent,
                                color: color[i],
                                type: res.data[i].title,
                                num: res.data[i].constructionCost.toFixed(2)
                            })
                        } else if (this.radio == '运维') {
                            this.circleList.push({
                                percent: res.data[i].operationPercent,
                                color: color[i],
                                type: res.data[i].title,
                                num: res.data[i].operationCost.toFixed(2)
                            })
                        }
                    })
                });
            },
            //资金投入走势图
            getLine(e) {
                this.$api.costSystem(e).then(res => {
                    this.line.constructionCost = {
                        list: [],
                        sum: 0
                    }; // 建设
                    this.line.operationCost = {
                        list: [],
                        sum: 0
                    }; // 运维
                    res.data.forEach((v, i) => {
                        this.line.xData.push(v.year);
                        this.line.constructionCost.list.push(Number(v.constructionCost).toFixed(2));
                        this.line.operationCost.list.push(Number(v.operationCost).toFixed(2));
                    });
                    this.line.constructionCost.sum = res.totalMap.constructionCost;
                    this.line.constructionCost.normal = res.totalMap.constructionCostNormal;
                    this.line.constructionCost.unknown = res.totalMap.constructionCostUnknown;
                    this.line.operationCost.sum = res.totalMap.operationCost
                    this.line.operationCost.normal = res.totalMap.operationCostNormal;
                    this.line.operationCost.unknown = res.totalMap.operationCostUnknown;
                    let data = [
                        this.line.constructionCost.list,
                        this.line.operationCost.list,
                    ];
                    this.line.series = data.map((o, i) => {
                        return {
                            type: 'line',
                            data: o,
                            stack: i,
                            showSymbol: false,
                            smooth: true,
                        };
                    });
                });
            },
            /* 全省各地区资金投入 */
            getCityTrjeGroup(e, params) {
                this.listTop_1.data = [];
                this.barTopData_1.xData = [];
                this.$api.cityTrjeGroup(params).then(res => {
                    let yData = [];
                    res.data.forEach((v, i) => {
                        this.barTopData_1.xData.push(v.city);
                        yData.push(v[e]);
                        this.listTop_1.title = '各部门系统' + this.rightRadioName + '排名'
                    })
                    this.barTopData_1.series = this.barTopData_1.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 20,
                            barCategoryGap: 25,
                        }
                    })
                    this.isBarTop_1 = true;
                })
            },
            // 获取全省各地区业务系统建设费用排名   1建设  2运维
            getCityTrjeOrder(sourceType,params) {
                let param = {
                    size: 8,
                    sourceType: sourceType,
                    ...params
                };
                this.listTop_1.data = [];
                this.$api.business.cityTrjeOrder(param).then(res => {
                    this.listTop_1.title = this.titleName + '业务系统' + this.rightRadioName + '排名'
                    res.data.forEach((v, i) => {
                        this.listTop_1.data.push({
                            title: v.areaname,
                            num: v.total,
                        });
                    })
                })
            },
            /* 全省各部门 */
            getOrgTrjeGroup(e,params) {
                this.listTop_1.data = [];
                this.barTopData_1.xData = [];
                this.$api.orgTrjeGroup(params).then(res => {
                    let yData = [];
                    res.data.forEach((v, i) => {
                        yData.push(v[e]);
                        this.barTopData_1.xData.push(v.dept);
                        this.listTop_1.title = '各部门系统' + this.rightRadioName + '排名'
                    })
                    this.barTopData_1.series = this.barTopData_1.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 20,
                            barCategoryGap: 25,
                        }
                    })
                    this.isBarTop_1 = true;
                })
            },
            // 获取全省各部门业务系统运维费用排名
            getOrgTrjeOrder(sourceType,params) {
                this.listTop_1.data = [];
                this.$api.orgTrjeOrder( {
                    size: 8,
                    sourceType: sourceType,
                    ...params
                }).then(res => {
                    this.listTop_1.title = '全省各部门业务系统' + this.rightRadioName + '排名'
                    res.data.forEach((v, i) => {
                        this.listTop_1.data.push({
                            title: v.org_nm,
                            num: v.total,
                        });
                    })
                })
            },
            /* 按系统分布情况分析 */
            getSystemTrje(e) {
                this.$api.systemTrje(e).then(res => {
                    let yData = [];
                    yData = [res.data[0].sjbsTrje, res.data[0].szbsTrje, res.data[0].qxbsTrje]
                    this.barData.series = this.barData.labelnames.map((o, i) => {
                        return {
                            name: 0,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 20,
                            barCategoryGap: 25,
                        }
                    })
                    this.isBar = true;
                })
            },
            // 下面四个卡片中四个更多进入详情页
            goMore(e) {
                let query = {};
                let names = '';
                if (e == 0) {
                    query = {
                        typeUrl: 'sourceTable',
                        tableTitle: this.title0
                    };
                } else if (e == 1) {
                    query = {
                        typeUrl: 'jbieTable',
                        tableTitle: this.title1
                    }
                } else if (e == 2) {
                    query = {
                        typeUrl: 'constructionCost',
                        tableTitle: this.title2
                    }
                } else if (e == 3) {
                    query = {
                        typeUrl: 'costStatusTable',
                        sourceType: 1
                    }
                } else if (e == 4) {
                    query = {
                        typeUrl: 'sfUseTable',
                        tableTitle: this.title4
                    }
                }
                this.$router.push({
                    name: 'businessTable',
                    query: {
                        ...query,
                        title: this.titleName + '业务系统资金使用情况',
                        type: this.$route.query.type,
                        backPathName: 'businessMoney',
                        radioBtn: this.$route.query.radioBtn,
                        isCityState: this.$route.query.isCityState,
                        areaids: this.$route.query.areaids,
                        mapQuery: JSON.stringify(this.query.mapQuery),
                        orgRootId:this.query.mapQuery.orgRootId,
                    }
                })
            }
        }
    };
</script>

<style lang='scss' scoped>
    @import "@/assets/style/base/index.scss";
    .businessMoney {
        .businessMoney-1 {
            margin-top: 25px;
            .businessMoney-1-cont {
                @extend %TitleBorder;
                border-top: 0;
                height: 398px;
                padding: 29px 16px;
            }
        }
        .businessMoney-2 {
            .businessMoney-2-cont {
                @extend %TitleBorder;
                border-top: 0;
                height: 186px;
                padding: 0 15px;
                @include flex($j: center);
                &>p {
                    flex: 1;
                    margin: 40px 15px; // .circle-body {
                    //     dt {
                    //         @include font($fz: 26px, $color: rgba(255, 255, 255, 0.65));
                    //         font-family: 'PangMenZhengDao';
                    //     }
                    //     dd {
                    //         @include font($fz: 16px, $color: rgba(255, 255, 255, 0.65));
                    //         padding-top: 5px;
                    //     }
                    // }
                    // span {
                    //     display: block;
                    //     @include font($fz: 16px, $color:#fff);
                    //     margin-top: 30px;
                    // }
                }
            }
        }
        .businessMoney-3 {
            margin: 25px -15px;
            .ivu-col-span-12 {
                padding: 0 15px;
            }
            .businessMoney-3-cont {
                @extend %TitleBorder;
                border-top: 0;
                padding: 23px 10px;
                height: 442px;
                .typeMoney {
                    padding: 0 15px;
                    p {
                        display: inline-block;
                        padding-left: 14px;
                        padding-top: 36px;
                        @include nums($w: 130px);
                        @include font($fz: 14px, $color:#fff);
                        position: relative;
                        label {
                            display: inline-block;
                            @include nums($w: 10px, $h:10px);
                            border-radius: 100%;
                        }
                        &>span {
                            position: absolute;
                            top: 35px;
                            left: 100px;
                            @include nums($w: 400px);
                            @include font($fz: 14px, $color:rgba(255, 255, 255, 0.6));
                            padding: 3px;
                            background-color: #071c43;
                            border-radius: 4px;
                            border: solid 1px #1a78c9;
                            display: none;
                            z-index: 1;
                        }
                    }
                    p:hover {
                        cursor: default;
                        &>span {
                            display: block
                        }
                    }
                }
                &>div {
                    dl {
                        border-left: solid 3px #b682ff;
                        height: 60px;
                        padding-left: 26px;
                        margin-left: 18px;
                        display: inline-block;
                        dt {
                            position: relative;
                            top: -10px;
                            span:first-child {
                                @include font($fz: 14px, $color:#fff);
                            }
                            span:last-child {
                                font-family: 'PangMenZhengDao';
                                @include font($fz: 14px, $color:#fff);
                                margin-left: 5px;
                                strong {
                                    font-family: 'PangMenZhengDao';
                                    @include font($fz: 23px, $color:#fff);
                                }
                            }
                        }
                        dd {
                            position: relative;
                            top: -10px;
                            span {
                                @include font($fz: 14px, $color:#fff);
                            }
                            b {
                                @include font($fz: 14px, $color:#b682ff);
                            }
                        }
                    }
                    .ivu-col-span-12:first-child {
                        dl {
                            border-color: #f1c450;
                            b {
                                color: #f1c450;
                            }
                        }
                    }
                }
            }
        }
    }
    .dd-num {
        p {
            position: relative;
            vertical-align: bottom;
            vertical-align: bottom;
            font-family: 'PangMenZhengDao';
            margin-top: 5px;
            height: 30px;
            font-size: 16px;
            b {
                font-size: 24px;
            }
            span {
                position: absolute;
                right: 0;
                bottom: 0;
                font-family: 'PangMenZhengDao';
                font-size: 14px;
            }
            img {
                position: absolute;
                left: 0;
                bottom: 2px;
            }
        }
    }
    /* czz   end*/
</style>
