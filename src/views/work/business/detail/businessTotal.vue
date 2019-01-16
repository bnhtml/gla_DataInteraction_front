<template>
    <div class="businessTotal" v-breadcrumb="breadcrumb">
        <div class="businessTotal-1">
            <div class="titleBar">
                <Title :title='title5'></Title>
                <span class="right-more" @click="goMore(5)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <Row class="businessTotal-1-cont">
                <i-col span='16'>
                    <div>
                        <legendItem :legendData='top2.data' :bg='top2.color'></legendItem>
                    </div>
                    <div>
                        <newBar v-if='barData3.isShow' :bar="barData3" :series="barData3Series"></newBar>
                    </div>
                </i-col>
                <i-col span='8'>
                    <div>
                        <ring v-if='capitalSource.isShow' :data='capitalSource.data' :labelColor='capitalSource.labelColor' :color='capitalSource.color' :title='capitalSource.title' :hasLabel='capitalSource.hasLabel'></ring>
                        <div class="legendItem">
                            <legendItem :legendData='capitalSource.data' :bg='capitalSource.color' :className='"longitudinal"'></legendItem>
                        </div>
                    </div>
                </i-col>
            </Row>
        </div>
        <Row class="businessTotal-2">
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title='title2'></Title>
                    <span class="right-more" @click="goMore(2)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <Row class="businessTotal-2-cont ">
                    <i-col span='12'>
                        <ring v-if='ring.isShow' :data='ring.data' :labelColor='ring.labelColor' :color='ring.color' :title='ring.title' :hasLabel='ring.hasLabel'></ring>
                    </i-col>
                    <i-col span='12'>
                        <legendItem v-if="ring.isShow" :legendData='ring.data' :bg='ring.color' :className='"longitudinal"'></legendItem>
                    </i-col>
                </Row>
            </i-col>
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title='title3'></Title>                
                    <span class="right-more" @click="goMore(3)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <Row class="businessTotal-2-cont">
                    <i-col span='12'>
                        <ring v-if='ring_1.isShow' :data='ring_1.data' :labelColor='ring_1.labelColor' :color='ring_1.color' :title='ring_1.title' :hasLabel='ring_1.hasLabel'></ring>
                    </i-col>
                    <i-col span='12'>
                        <legendItem v-if="ring_1.isShow" :legendData='ring_1.data' :bg='ring_1.color' :className='"longitudinal"'></legendItem>
                    </i-col>
                </Row>
            </i-col>
        </Row>
        <Row class="businessTotal-3">
            <i-col span='16'>
                <div class="titleBar">
                    <Title :title='title0'></Title>  
                    <span class="right-more" @click="goMore(0)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <div class="businessTotal-3-cont ">
                    <legendItem :legendData='top1.data' :bg='top1.color' :class='"transverse"'></legendItem>
                    <div>
                        <newBar v-if='barData1.isShow' :bar="barData1" :series="barData1Series"></newBar>
                    </div>
                </div>
            </i-col>
            <i-col span='8'>
                <div class="titleBar">
                    <Title :title='title1'></Title>
                    <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <Row class="businessTotal-3-cont">
                    <i-col span='12' v-for='(v,i) in ringGraph0.legendData' :key='i' class="text-center">
                        <i-circle :percent="Number(v.percent)" :size='130' :stroke-color='v.color' trail-color='#293d6f' :trail-width='10' :stroke-width='10'>
                            <dl class="circle-body">
                                <dt>{{v.percent}}%</dt>
                                <dd>{{v.num}}</dd>
                            </dl>
                        </i-circle>
                        <span>{{v.title}}</span>
                    </i-col>
                </Row>
            </i-col>
        </Row>
        <div class="businessTotal-4">
            <div class="titleBar">
                <Title :title='title4'></Title>
                <span class="right-more" @click="goMore(4)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <Row class="businessTotal-4-cont">
                <i-col span='8'>
                    <p>安全等级定级情况</p>
                    <Row class="row-body">
                        <i-col span='24' class="justify-center mt10">
                            <newBar :bar="barData2" :series="barData2Series"></newBar>
                        </i-col>
                    </Row>
                </i-col>
                <i-col span='8'>
                    <p>信息系统分级保护定级情况</p>
                    <Row class="row-body">
                        <i-col span='24' class="justify-center mt10">
                            <newBar :bar="barData2_1" :series="barData2_1Series"></newBar>
                        </i-col>
                    </Row>
                </i-col>
                <i-col span='8'>
                    <p>数据安全要求</p>
                    <Row class="row-body">
                        <i-col span='24' class="justify-center mt10">
                            <newBar :bar="barData2_2" :series="barData2_2Series"></newBar>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </div>
        <div class="businessTotal-5">
            <div class="titleBar">
                <Title :title='title6'></Title>
                <span class="right-more" @click="goMore(6)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <Row class="businessTotal-5-cont">
                <i-col span='16'>
                    <div>
                        <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                    </div>
                    <div v-if="isBarData">
                        <newBar v-if="isBarData" :bar="barData" :series="barData.series"></newBar>
                    </div>
                    <Spin size="large" fix v-else>
                        <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                    </Spin>
                </i-col>
                <i-col span='8'>
                    <List :title="list.title">
                        <ul v-if='list.isShow'>
                            <li v-for='(v,i) in list.data' :key='i'>
                                <label>{{i+1}}</label> {{v.city}} <span>{{v.num}}</span>
                            </li>
                        </ul>
                        <div v-else class="noData">
                            <img src="../../../../assets/img/bg/noData.png" alt="暂无数据">
                        </div>
                    </List>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script type="text/javascript">
    import echarts from "echarts";
    import * as data from "@/server/data/dept.js";
    import lineChart from "@/components/charts/line/line";
    import paiming from "@/components/ranking";
    import ring from "@/components/charts/ring/ring.vue";
    import ringGraph from "@/components/charts/ring/ringGraph";
    import legendItem from "@/components/charts/ring/legendItem.vue";
    import newBar from "@/components/charts/bar/newBar.vue";
    import Title from '@/components/title/index';
    import List from '@/components/list/list.vue';
    let colorLineArr = [{
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#694dff"
                },
                {
                    offset: 1,
                    color: "#b783ff"
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
                    color: "#e8cb39"
                },
                {
                    offset: 1,
                    color: "#feba70"
                }
            ])
        },
        {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#ca5d55"
                },
                {
                    offset: 1,
                    color: "#d56c59"
                }
            ])
        },
        {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#0d8d70"
                },
                {
                    offset: 1,
                    color: "#14d9a4"
                }
            ])
        },
        {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#e8cb39"
                },
                {
                    offset: 1,
                    color: "#feba70"
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
                    color: "#14cede"
                },
                {
                    offset: 1,
                    color: "#30ffda"
                }
            ])
        },
    ];
    let colorArr = [{
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#30ffda"
                },
                {
                    offset: 1,
                    color: "#14cede"
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
                    color: "#d56c59"
                },
                {
                    offset: 1,
                    color: "#ca5d55"
                }
            ])
        }
    ];
    let xNames = ["一级", "二级", "三级", "四级", "五级", "未定级", '未反馈'];
    let yNames = ["未定秘", "秘密", "机密", "绝密", '未反馈'];
    let zNames = ["涉密", "敏感", "不宜公开", "依申请公开", "可公开", '未反馈'];
    zNames = zNames.slice(1, zNames.length);
    let names = ["全国统建", "非全国统建", '未反馈'];
    let names1 = ["公有云平台", "私有云平台", "传统方式",'公有云平台、私有云平台', '公有云平台、传统方式','私有云平台、传统方式','所有方式','未反馈'];
    let names2 = ["政务外网", "政务专网", "互联网", '未反馈'];
    let iTotal = 0;
    let pTotal = 0;
    let oTotal = 0;
    export default {
        name: 'businessTotal',
        data() {
            let colors = ["#694dff", "#30ffda","#e8cb39"];
            let colors1 = ["#694dff", "#10c4ff", "#e8cb39", '#ca5d55','#0d8d70','#e8cb39','#10c4ff','#14cede']; // 信息系统部署方式统计
            let colors2 = ["#30ffda", "#b783ff", "#3259ff", "#d56c59"]; // 承载网络分析颜色
            let {
                query,
                params,
                name,
                fullPath
            } = this.$route;
            // debugger
            query.mapQuery = JSON.parse(query.mapQuery);
            query.areaids =query.mapQuery.areaids?query.mapQuery.areaids: query.radioBtn ;
            let typeThree = (query.isCityState == 'true')||(query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
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
            let leftname = ['全省总体','省直部门','市州部门'][typeThree];
            if(query.mapQuery.name) leftname = query.mapQuery.name
            return {
                breadcrumb: [{
                        icon: 'dingwei',
                        name: '业务系统分析'
                    },
                    parent,
                    {
                        name: leftname + '业务系统数量情况',
                        url: fullPath
                    }
                ],
                query,
                typeThree,
                titleName:leftname,
                PageActive: "0",
                isBar: true,
                isBarData2: false, // 控制安全等级定级变量
                isBarData3: false,
                isBarData: false, // 控制loading
                top: {
                    data: names.map(o => {
                        return {
                            name: o
                        };
                    }),
                    color: colors
                },
                top1: {
                    data: names1.map(o => {
                        return {
                            name: o
                        };
                    }),
                    color: colors1
                },
                top2: {
                    data: names2.map(o => {
                        return {
                            name: o
                        };
                    }),
                    color: colors2
                },
                // t统建系统分析
                barData: {
                    company:['个','个','个'],
                    height: 320,
                    xData: [],
                    labelnames: ['全国统建', '非全国统建', '未反馈'],
                    colorArr: colorLineArr,
                    num: 9,
                    series: []
                },
                barData1: {
                    company:['个','个','个','个','个','个','个','个',],
                    height: 330,
                    xData: [],
                    colorArr: colorLineArr,
                    labelnames: names1,
                    num: 9,
                    isShow: false
                }, // 信息系统部署方式统计数据配置
                barData1Series: [],
                // 安全等级定级情况数据配置
                barData2: {
                    company:['个','个','个','个'],
                    height: 280,
                    xData: xNames,
                    labelnames: ['数量'],
                },
                barData2Series: [],
                /*信息系统分级保护定级情况 信息配置*/
                barData2_1: {
                    company:['个','个','个','个'],
                    height: 280,
                    xData: yNames,
                    labelnames: ['数量'],
                },
                barData2_1Series: [],
                /*数据安全要求 信息配置 */
                barData2_2: {
                    company:['个','个','个','个'],
                    height: 300,
                    xData: zNames,
                    labelnames: ['数量'],
                },
                barData2_2Series: [],
                // 业务系统承载网络分析数据配置
                barData3: {
                    company:['个','个','个','个'],
                    height: 350,
                    xData: [],
                    colorArr: colorArr,
                    labelnames: ['政务外网', '互联网', '政务专网', '未反馈'],
                    isShow: false
                },
                barData3Series: [],
                ringGraph0: {
                    color: [
                        "#2FBAB2 ",
                        "#1E8589",
                        "#579ADD",
                        "#2C61B9",
                        "#F77A5C",
                        "#D95450",
                        "#BFCC4E",
                        "#E1E885",
                    ],
                    list: [],
                    isShow: false,
                    legendData: [],
                    bg: ["#1E8589", "#2C61B9", "#D95450", '#E1E885'],
                    total: "",
                    width: '160',
                    height: "160",
                },
                // 业务系统分布情况数据配置
                ringGraph1: {
                    color: [
                        "#5EA8EB",
                        "#306FD1",
                        "#BDADF2",
                        "#8875E1",
                        "#E1E885",
                        "#BFCC4E",
                        'pink',
                        'pink',
                        "#E1E885",
                        "#BFCC4E",
                    ],
                    list: [],
                    isShow: false,
                    legendData: [],
                    bg: ["#306FD1", "#8875E1", "#BFCC4E", 'pink', 'pink'],
                    total: "",
                    width: '160',
                    height: "160"
                },
                radio: "internalUse",
                capitalSource: {
                    data: [],
                    labelColor: colors2,
                    color: colors2,
                    hasLabel: false,
                    isShow: false,
                    title: {}
                },
                // 业务系统建设状态分析数据配置
                ring: {
                    data: [],
                    legend: [],
                      labelColor: [ "#FF644F","#ced866","#3FC2BD","#4082da","#5AC426","#9c8ae7","#CF9D41" ],
                    color: [
                        "#694dff",
                        "#10c4ff",
                        "#e8cb39",
                        "#ca5d55",
                        "#0d8d70",
                        "#10c4ff",
                        "#14cede",
                    ],
                    hasLabel: false,
                    isShow: false,
                    title: {},
                    internalUse: [], // internalUse
                    public: [], // public
                    other: [], // 其它
                },
                ring_1: {
                    data: [],
                    legend: [],
                    labelColor: [ "#FF644F","#ced866","#3FC2BD","#4082da","#5AC426","#9c8ae7","#CF9D41" ],
                    color: [
                        "#694dff",
                        "#10c4ff",
                        "#e8cb39",
                        "#ca5d55",
                        "#0d8d70",
                        "#e8cb39",
                        "#10c4ff",
                        '#14cede',
                    ],
                    hasLabel: false,
                    isShow: false,
                    title: {},
                    internalUse: [], // internalUse
                    public: [], // public
                    other: [], // 其它
                },
                list: {
                    title: "贵州省各部门全国统建系数量",
                    data: [],
                    isShow: false,
                },
                listTop: {
                    title: "贵州省各地区全国统建系数量",
                    data: []
                },
                series: [],
                line: {
                    isShowSymbol: false,
                    legendData: [],
                    xAxisData: [],
                    color: ["#5AC426", "#D95450"],
                    series: []
                },
            };
        },
        components: {
            paiming,
            ring,
            legendItem,
            lineChart,
            ringGraph,
            newBar,
            Title,
            List,
        },
        computed: {
            // titleName() {
            //     if (this.$route.query.type == 1) {
            //         return '全省地区'
            //     } else if (this.$route.query.type == 2) {
            //         if (this.$route.query.radioBtn == 1) {
            //             return '省级部门'
            //         } else {
            //             return '市级部门'
            //         }
            //     }
            // }
            title5(){
                return this.titleName + '业务系统承载网络分析';
            },
            title2(){
                return this.titleName + "业务系统建设状态分析";
            },
            title6(){
                return this.titleName +"业务系统统建情况分析";
            },
            title3(){
                return this.titleName + "业务系统分布情况";
            },
            title0(){
                return this.titleName + "业务系统部署方式统计";
            },
            title1(){
                return this.titleName + "业务系统迁云状况分析";
            },
            title4(){
                return this.titleName + "业务系统安全情况分析";
            },
        },
        mounted() {
            let ISareaids = [1,2,3,4,5,6,7,8,9,10,11].indexOf(this.query.areaids) ==-1?false:true
            let params;
              if (this.$route.query.type == 1) {
                   params ={
                    areaids: this.query.areaids,
                }
                // this.getBearerNetworkCityGroup(params); //地区 业务系统承载网络分析
                // this.getSfQgtzCityGroup(params); //统建系统分析
                // this.getSfQgtzCityOrder(params); // 地区 
                // this.getOptModeCityGroup(params); // 地区 信息系统部署方式统计
                this.getSafeLevGroup(params); //  地区 安全等级等级情况
                this.getProtConditionGroup(params); //地区  信息系统分级保护定级情况
                this.getSjaqYqGroup(params); //地区  数据安全要求
                this.getSfQyunGroup(params); // 地区迁云状况分析
                this.getSysStatusGroup(params); //地区  业务系统建设状态分析
                this.getSysFbGroup(params); // 地区 业务系统分布情况
            } else if (this.$route.query.type == 2) {
                 params ={
                    areaids: this.query.areaids,
                    orgRootId:this.query.mapQuery.orgRootId
                }
                // this.getBearerNetworkOrgGroup(params); // 省级部门/市级部门 业务系统承载网络分析
                // this.getSfQgtzOrgNmGroup(params); // 省级部门/市级部门 统建系统分析
                // this.getSfQgtzOrgNmOrder(params); // 省级部门/市级部门 右侧列表数据
                // this.getOptModeOrgGroup(params); //  省级部门/市级部门 信息系统部署方式统计
                this.getSafeLevGroup(params); //  省级部门/市级部门  安全等级等级情况
                this.getProtConditionGroup(params); //省级部门/市级部门   信息系统分级保护定级情况
                this.getSjaqYqGroup(params); // 省级部门/市级部门  数据安全要求
                this.getSfQyunGroup(params); // 省级部门/市级部门  迁云状况分析
                this.getSysStatusGroup(params); // 省级部门/市级部门  业务系统建设状态分析
                this.getSysFbGroup(params); // 省级部门/市级部门  业务系统分布情况
            }
             if(this.$route.query.type==2||ISareaids){
                this.getBearerNetworkOrgGroup(params); // 省级部门/市级部门 业务系统承载网络分析
                this.getOptModeOrgGroup(params); //  省级部门/市级部门 信息系统部署方式统计
                this.getSfQgtzOrgNmGroup(params); // 省级部门/市级部门 统建系统分析
                this.getSfQgtzOrgNmOrder(params); // 省级部门/市级部门 右侧列表数据
            }else if(this.$route.query.type==1){
                this.getBearerNetworkCityGroup(params); //地区 业务系统承载网络分析
                 this.getOptModeCityGroup(params); // 地区 信息系统部署方式统计
                 this.getSfQgtzCityGroup(params); //统建系统分析
                 this.getSfQgtzCityOrder(params); // 地区 
            }
        },
        methods: {
            /* 业务系统承载网络分析 */
            getBearerNetworkOrgGroup(param) {
                this.capitalSource.isShow = false;
                // this.isBarData3 = false;
                this.barData3.xData = [];
                this.capitalSource.data = [];
                this.barData3.isShow = false;
                this.$api.business.getBearerNetworkOrgGroup(param).then(res => {
                    let allTotal = 0;
                    let oneTotal = 0;
                    let twoTotal = 0;
                    let threeTotal = 0;
                    let unknownTotal = 0;
                    res.data.forEach((v, i) => {
                        this.barData3.xData.push(v.org_nm);
                        allTotal += v.total;
                        oneTotal += v.one;
                        twoTotal += v.two;
                        threeTotal += v.three;
                        unknownTotal += v.unknown;
                    })
                    let legendNames = ['one', 'two', 'three', 'unknown'];
                    this.barData3Series = names2.map((o, i) => {
                        return {
                            type: "bar",
                            data: res.data.map((oo, ii) => oo[legendNames[i]]), // y轴数据
                            barCategoryGap: 25,
                            barWidth: "30%",
                            stack: "i",
                        };
                    })
                     this.capitalSource.title = {
                        title: "总数量",
                        num:allTotal
                    };
                    this.capitalSource.data = [{
                            "value": allTotal?(oneTotal / allTotal * 100).toFixed(2):0,
                            "name": "政务外网",
                            "number": oneTotal + '个'
                        },
                        {
                            "value":allTotal? (threeTotal / allTotal * 100).toFixed(2):0,
                            "name": "政务专网",
                            "number": threeTotal + '个'
                        },
                        {
                            "value": allTotal?(twoTotal / allTotal * 100).toFixed(2):0,
                            "name": "互联网",
                            "number": twoTotal + '个'
                        },
                        {
                            "value": allTotal?(unknownTotal / allTotal * 100).toFixed(2):0,
                            "name": "未反馈",
                            "number": unknownTotal + '个'
                        }
                    ]
                    this.capitalSource.isShow = true;
                    this.barData3.isShow = true;
                })
            },
            /* 业务系统承载网络分析  地区  */
            getBearerNetworkCityGroup(e) {
                this.capitalSource.isShow = false;
                this.barData3.xData = [];
                this.capitalSource.data = [];
                this.barData3.isShow = false;
                this.$api.business.getBearerNetworkCityGroup(e).then(res => {
                    let allTotal = 0;
                    let oneTotal = 0;
                    let twoTotal = 0;
                    let threeTotal = 0;
                    let unknownTotal = 0;
                    res.data.forEach((v, i) => {
                        this.barData3.xData.push(v.areaname);
                        allTotal += v.total;
                        oneTotal += v.one;
                        twoTotal += v.two;
                        threeTotal += v.three;
                        unknownTotal += v.unknown;
                    })
                    let legendNames = ['one', 'two', 'three', 'unknown'];
                    this.barData3Series = names2.map((o, i) => {
                        return {
                            type: "bar",
                            data: res.data.map((oo, ii) => oo[legendNames[i]]), // y轴数据
                            barCategoryGap: 25,
                            barWidth: "30",
                            stack: "i",
                        };
                    })
                    this.capitalSource.title = {
                        title: "总数量",
                        num:allTotal
                    };
                    this.capitalSource.data = [{
                            "value": (oneTotal / allTotal * 100).toFixed(2),
                            "name": "政务外网",
                            "number": oneTotal + '个'
                        },
                        {
                            "value": (twoTotal / allTotal * 100).toFixed(2),
                            "name": "政务专网",
                            "number": twoTotal + '个'
                        },
                        {
                            "value": (threeTotal / allTotal * 100).toFixed(2),
                            "name": "互联网",
                            "number": threeTotal + '个'
                        },
                        {
                            "value": (unknownTotal / allTotal * 100).toFixed(2),
                            "name": "未反馈",
                            "number": unknownTotal + '个'
                        }
                    ]
                    this.capitalSource.isShow = true;
                    this.barData3.isShow = true;
                })
            },
            /*  业务系统建设状态分析   */
            getSysStatusGroup(params) {
                this.ring.data = [];
                this.ring.isShow = false;
                iTotal = 0;
                pTotal = 0;
                oTotal = 0
                this.$api.business.getSysStatusGroup(params).then(res => {
                    this.ring.isShow = true;
                    let newData = res.data;
                    this.ring.title.title = "总数量";
                    this.ring.title.num = res.total;
                    let nameArr = ['未反馈', '拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'];
                    res.data.forEach((v, i) => {
                        iTotal += v.whole;
                    })
                    newData.forEach((v, i) => {
                        v.name = nameArr[v.sysFb]
                    })
                    nameArr.forEach((item, k) => {
                        this.ring.data.push({
                            value: newData[k] && newData[k].whole ? (newData[k].whole / iTotal * 100).toFixed(2) : 0,
                            name: item,
                            number: (newData[k] && newData[k].whole || 0) + '个'
                        });
                    })
                    this.ring.title.num = iTotal;
                    this.ring.data = this.getOrder(this.ring.data)
                })
            },
            /* 获取业务系统分布情况数据 */
            getSysFbGroup(params) {
                this.ring_1.data = [];
                this.ring_1.isShow = false;
                this.$api.business.getSysFbGroup(params).then(res => {
                    this.ring_1.isShow = true;
                    let newData = res.data;
                    this.ring_1.title.title = "总数量";
                    this.ring_1.title.num = res.total;
                    let nameArr = ['未反馈', '省级部署', '市州部署', '省/市部署', '区县部署', '省/县部署', '市/县部署', '省/市/县部署'];
                    newData.forEach((v, i) => {
                        v.name = nameArr[v.sysFb]
                    })
                    nameArr.forEach((item, k) => {
                        this.ring_1.data.push({
                            value: newData[k] && newData[k].countnum ? (newData[k].countnum / res.total * 100).toFixed(2) : 0,
                            name: item,
                            number: (newData[k] && newData[k].countnum || 0) + '个',
                        });
                    })
                    this.ring_1.data = this.getOrder(this.ring_1.data)
                })
            },
            /* 地区 获取信息系统部署方式统计数据  */
            getOptModeCityGroup(e) {
                this.barData1.xData = [];
                this.barData1.isShow = false;
                this.$api.business.getOptModeCityGroup(e).then(res => {
                    res.data.forEach((v, i) => {
                        this.barData1.xData.push(v.areaname);
                    })
                    let legendName = ['publicCloud', 'privateCloud', 'noCloud', 'publiccloudPrivatecloud','publiccloudNocloud','privatecloudNocloud','publiccloudPrivatecloudNocloud','unknown',];
                    this.barData1Series = names1.map((o, i) => {
                        return {
                            type: "bar",
                            data: res.data.map((oo, ii) => oo[legendName[i]]), // y轴数据
                            barCategoryGap: 25,
                            barWidth: "30",
                            stack: "i",
                        };
                    })
                    this.barData1.isShow = true;
                })
            },
            /* 部门 获取信息系统部署方式统计数  */
            getOptModeOrgGroup(params) {
                this.barData1.xData = [];
                this.barData1.isShow = false;
                this.$api.business.getOptModeOrgGroup(params).then(res => {
                    res.data.forEach((v, i) => {
                        this.barData1.xData.push(v.org_nm);
                    })
                    let legendName = ['publicCloud', 'privateCloud', 'noCloud', 'publiccloudPrivatecloud','publiccloudNocloud','privatecloudNocloud','publiccloudPrivatecloudNocloud','unknown',];
                    this.barData1Series = names1.map((o, i) => {
                        return {
                            type: "bar",
                            data: res.data.map((oo, ii) => oo[legendName[i]]), // y轴数据
                            barCategoryGap: 25,
                            barWidth: "30",
                            stack: "i",
                        };
                    })
                    this.barData1.isShow = true;
                })
            },
            /* 获取迁云状况分析 */
            getSfQyunGroup(params) {
                let newArr = [{
                        title: '已迁云',
                        num: 0,
                        percent: 0,
                        color: '#e8cb39'
                    },
                    {
                        title: '计划迁云',
                        num: 0,
                        percent: 0,
                        color: '#14cede'
                    },
                    {
                        title: '不迁云',
                        num: 0,
                        percent: 0,
                        color: '#694dff'
                    },
                    {
                        title: '未反馈',
                        num: 0,
                        percent: 0,
                        color: '#ff5e52'
                    },
                ]
                this.ringGraph0.legendData = [];
                this.$api.sfQyunGroup(params).then(res => {
                    res.data.forEach((v, i) => {
                        this.ringGraph0.total = v.total;
                        if (v.title == '已迁云') {
                            newArr[i].num += v.num;
                            newArr[i].percent = v.percent
                        } else if (v.title == '计划迁云') {
                            newArr[i].num += v.num;
                            newArr[i].percent = v.percent
                        } else if (v.title == '不迁云') {
                            newArr[i].num += v.num;
                            newArr[i].percent = v.percent
                        } else if (v.title == '未反馈') {
                            newArr[i].num += v.num;
                            newArr[i].percent = v.percent
                        }
                    })
                    this.ringGraph0.legendData = newArr;
                    // this.getRingGraph(this.ringGraph0, newArr, ['已迁云', '计划迁云', '不迁云', '未反馈']);
                })
            },
            /* 数据安全要求 */
            getSjaqYqGroup(params) {
                this.$api.sjaqYqGroup(params).then(res => {
                    let yData = [0, 0, 0, 0, 0, 0];
                    res.data.forEach((v, i) => {
                        if (v.sjaqYq == 1) {
                            yData[0] = v.countnum;
                        } else if (v.sjaqYq == 2) {
                            yData[1] = v.countnum;
                        } else if (v.sjaqYq == 3) {
                            yData[2] = v.countnum;
                        } else if (v.sjaqYq == 4) {
                            yData[3] = v.countnum;
                        } else if (v.sjaqYq == 5) {
                            yData[4] = v.countnum;
                        } else if (v.sjaqYq == 0) {
                            yData[5] = v.countnum;
                        }
                    })
                    yData = yData.slice(1, yData.length - 1)
                    this.barData2_2Series = this.barData2_2.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 20,
                            barCategoryGap: 25,
                        }
                    })
                })
            },
            /* 安全等级定级情况 */
            getSafeLevGroup(params) {
                this.$api.safeLevGroup(params).then(res => {
                    this.isBarData2 = true;
                    let yData = [0, 0, 0, 0, 0, 0, 0]
                    res.data.forEach((v, i) => {
                        if (v.safeLev == 1) {
                            yData[0] = v.countnum;
                        } else if (v.safeLev == 2) {
                            yData[1] = v.countnum;
                        } else if (v.safeLev == 3) {
                            yData[2] = v.countnum;
                        } else if (v.safeLev == 4) {
                            yData[3] = v.countnum;
                        } else if (v.safeLev == 5) {
                            yData[4] = v.countnum;
                        } else if (v.safeLev == 6) {
                            yData[5] = v.countnum;
                        } else if (v.safeLev == 0) {
                            yData[6] = v.countnum;
                        }
                    })
                    this.barData2Series = this.barData2.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: "bar",
                            data: yData,
                            barMaxWidth: 20,
                            barCategoryGap: 25,
                        }
                    })
                })
            },
            /* 信息系统分级保护定级情况 */
            getProtConditionGroup(params) {
                this.$api.protConditionGroup(params).then(res => {
                    let yData = [0, 0, 0, 0, 0];
                    res.data.forEach((v, i) => {
                        if (v.protCondition == 1) {
                            yData[0] = v.countnum;
                        } else if (v.protCondition == 2) {
                            yData[1] = v.countnum;
                        } else if (v.protCondition == 3) {
                            yData[2] = v.countnum;
                        } else if (v.protCondition == 4) {
                            yData[3] = v.countnum;
                        } else if (v.protCondition == 0) {
                            yData[4] = v.countnum;
                        }
                    })
                    this.barData2_1Series = this.barData2_1.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 20,
                            barCategoryGap: 25,
                        }
                    })
                })
            },
            /*  统建系统数量   */
            getSfQgtzOrgNmGroup(params) {
                this.barData.xData = [];
                this.isBarData = false;
                this.$api.business.getSfQgtzOrgNmGroup(params).then(res => {
                    res.data.forEach((v, i) => {
                        this.barData.xData.push(v.org_nm);
                    })
                    let legendName = ['yes', 'no', 'unknown'];
                    this.barData.series = names.map((o, i) => {
                        return {
                            type: "bar",
                            data: res.data.map((oo, ii) => oo[legendName[i]]), // y轴数据
                            barCategoryGap: 25,
                            barWidth: "30",
                            stack: 'i',
                        };
                    })
                    this.isBarData = true;
                })
            },
            /*  统建系统数量  右侧列表   */
            getSfQgtzOrgNmOrder(params) {
                this.list.data = [];
                let obj = {
                    sfQgtz: 1,
                    size: 8,
                }
                if(this.query.mapQuery.name){
                    this.list.title = this.query.mapQuery.name+'全国统建系统数量';
                }else{this.list.title = this.titleName+'全国统建系统数量';}
                

                this.$api.business.getSfQgtzOrgNmOrder(Object.assign(obj, params)).then(res => {
                    if (res.data.length) {
                        res.data.forEach((v, i) => {
                            this.list.data.push(v);
                            this.list.data[i].num = v.countnum + '个';
                        })
                        this.list.isShow = true;
                    }
                })
            },
            /* 全省地区各地区全国统建系统分析 */
            getSfQgtzCityGroup(e) {
                this.barData.xData = [];
                this.isBarData = false;
                this.$api.business.getSfQgtzCityGroup(e).then(res => {
                    res.data.forEach((v, i) => {
                        this.barData.xData.push(v.areaname);
                    })
                    let legendNames = ['yes', 'no', 'unknown'];
                    this.barData.series = names.map((o, i) => {
                        return {
                            type: "bar",
                            data: res.data.map((oo, ii) => oo[legendNames[i]]), // y轴数据
                            barCategoryGap: 25,
                            barWidth: "30",
                            stack: 'i',
                        };
                    })
                    this.isBarData = true;
                })
            },
            /* 地区 统建系统数量  右侧列表   */
            getSfQgtzCityOrder(params) {
                this.list.data = [];
                let obj = {
                    sfQgtz: 1,
                    size: 8,
                }
                 if(this.query.mapQuery.name){
                    this.list.title = this.query.mapQuery.name+'全国统建系统数量';
                }
                this.$api.business.sfQgtzCityOrder(Object.assign(obj, params)).then(res => {
                    if (res.data.length) {
                        res.data.forEach((v, i) => {
                            this.list.data.push(v);
                            this.list.data[i].num = v.countnum + '个';
                            // this.list.data[i].city = v.city ;
                        })
                        this.list.isShow = true;
                    }
                })
            },
            /* 跳转详情 */
            goBusinessTable(e, name) {
                this.$router.push({
                    name: 'businessTable',
                    query: {
                        typeUrl: e,
                        type: this.$route.query.type,
                        isCityState:this.$route.query.isCityState,
                        areaids: this.$route.query.radioBtn
                    }
                })
            },
            /*更多进入详情页 */
            goMore(e) {
                let query = {};
                let name = '';
                if (e == 0) {
                    query = {
                        typeUrl: 'optModeTable',
                        tableTitle:this.title0,
                    }
                } else if (e == 1) {
                    query = {
                        typeUrl: 'sfQyunTable',
                        tableTitle:this.title1,
                    };
                } else if (e == 2) {
                    query = {
                        typeUrl: 'sysStatusTable',
                        tableTitle:this.title2,
                    };
                } else if (e == 3) {
                    query = {
                        typeUrl: 'protConditionTable',
                        tableTitle:this.title3,
                    };
                } else if (e == 4) {
                    query = {
                        typeUrl: 'systemSafety',
                        level: 2,
                        tableTitle:this.title4,
                    };
                } else if (e == 5) {
                    query = {
                        typeUrl: 'bearerNetworkTable',
                        tableTitle:this.title5,
                    };
                } else if(e==6){
                    query={
                        typeUrl:'sfQgtzTable',
                        tableTitle:this.title6,
                    }
                }
                this.$router.push({
                    name: 'businessTable',
                    query: {
                        ...query,
                        title: this.titleName+'业务系统数量情况',
                        backPathName: 'businessTotal',
                        type: this.$route.query.type,
                        radioBtn: this.$route.query.radioBtn,
                        isCityState:this.$route.query.isCityState,
                        areaids: this.$route.query.areaids,
                        mapQuery:JSON.stringify(this.query.mapQuery),
                        areaids:this.query.mapQuery.areaids,
                        orgRootId:this.query.mapQuery.orgRootId,
                    },
                })
            },
            /* 未反馈排序 */
            getOrder(data) {
                data.forEach((v, i) => {
                    if (v.name == '未反馈') {
                        data.push(v)
                        this.$nextTick(() => {
                            data.slice(1)
                        })
                    }
                })
                return data.slice(1)
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/assets/style/base/index.scss";
    .businessTotal {
        .businessTotal-1 {
            .businessTotal-1-cont {
                .ivu-col-span-16 {
                    @extend %TitleBorder;
                    border-top: 0;
                    height: 442px;
                    padding: 0px 18px;
                }
                .ivu-col-span-8 {
                    @extend %TitleBorder;
                    border-top: 0;
                    border-left: 0;
                    height: 442px;
                    padding: 0;
                    @include flex($j: center);
                    .legendItem {
                        padding-left: 40px;
                    }
                }
            }
        }
        .businessTotal-2 {
            margin: 0 -15px;
            margin-top: 25px;
            .ivu-col-span-12 {
                padding: 0 15px;
            }
            .businessTotal-2-cont {
                @extend %TitleBorder;
                border-top: 0;
                height: 445px;
                @include flex($j: center);
            }
        }
        .businessTotal-3 {
            margin: 0 -15px;
            margin-top: 25px;
            .ivu-col-span-16,
            .ivu-col-span-8 {
                padding: 0 15px;
            }
            .businessTotal-3-cont {
                @extend %TitleBorder;
                border-top: 0;
                height: 442px;
                padding: 10px;
                .ivu-col-span-12 {
                    margin-top: 30px;
                    .circle-body {
                        dt {
                            @include font($fz: 26px, $color: rgba(255, 255, 255, 0.65));
                            font-family: 'PangMenZhengDao';
                        }
                        dd {
                            @include font($fz: 16px, $color: rgba(255, 255, 255, 0.65));
                            padding-top: 5px;
                            text-align: center;
                        }
                    }
                    span {
                        display: block;
                        @include font($fz: 16px, $color:#fff);
                        margin-top: 20px;
                    }
                }
                .transverse{
                /deep/ ul{
                        li{
                            width: 213px;
                        }
                    }
                }
            }
        }
        .businessTotal-4 {
            margin-top: 25px;
            .businessTotal-4-cont {
                height: 398px;
                @extend %TitleBorder;
                border-top: 0;
            }
            p {
                border-left: solid 3px #22ebfb;
                height: 20px;
                line-height: 20px;
                padding-left: 20px;
                margin-left: 20px;
                @include font($fz: 18px, $color:#fff);
                margin-top: 45px;
            }
        }
        .businessTotal-5 {
            margin: 25px 0;
            .businessTotal-5-cont {
                padding: 10px;
                height: 398px;
                @extend %TitleBorder;
                border-top: 0;
                .ivu-col-span-8 {
                    margin-top: 15px;
                    .noData {
                        @include flex($j: center);
                        height: 100%;
                    }
                }
            }
        }
    }
</style>