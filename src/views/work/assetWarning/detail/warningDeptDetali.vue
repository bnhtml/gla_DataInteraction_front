// 资产填报预警 部门详情展示页面
<template>
    <div class="warningDeptDetali" v-breadcrumb='breadcrumb'>
        <div class="warningDeptDetali-1">
            <div class="titleBar">
                <Title :title='$store.state.deptInfo.orgSpecies+"-资产填报异常总体情况"'></Title>
                <span class="right" @click='openNew'>资产族谱</span>
                <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <Row class="warningDeptDetali-1-cont">
                <i-col span='5'>
                    <CardColor :title='"资产填报预警指数"' :borderColor='"#1fdee5"' :bg="['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5)']">
                        <dd class="dd-num-1">
                            <label>{{level}}</label>
                            <span>{{((100-perfect.completeness)*0.5+(100-normality.percent)*0.5).toFixed(2)}}%</span>
                        </dd>
                    </CardColor>
                </i-col>
                <i-col span='5'>
                    <CardColor :title='"填报数据完备度"' :borderColor='"rgba(26, 164, 255)"' :bg="['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)']">
                        <dd class="dd-num">
                            <span>{{perfect.completeness}}%</span>
                            <div>
                                <label> 实填数据量</label>
                                <span>{{perfect.fileds}}</span>
                                <label>应填数据量</label>
                                <span>{{perfect.total}}</span>
                            </div>
                        </dd>
                    </CardColor>
                </i-col>
                <i-col span='5'>
                    <CardColor :title='"填报合规度"' :borderColor='"rgba(26, 164, 255)"' :bg="['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)']">
                        <dd class="dd-num">
                            <span>{{normality.percent}}%</span>
                            <div>
                                <label>合规数据量</label>
                                <span>{{normality.total}}</span>
                                <label>实填数据量</label>
                                <span>{{normality.sumTotal}}</span>
                            </div>
                        </dd>
                    </CardColor>
                </i-col>
                <i-col span='9'>
                    <p>资产填报预警指数=（1-数据合规度）*权重1+（1-数据完备度）*权重2 （权重1=0.5；权重2=0.5）</p>
                    <p>填报数据合规度=符合系统要求的字段总数/实际填报的字段总数*100%。</p>
                    <p>填报数据完备度=实际填报的字段总数/应该填写的字段总数*100% </p>
                </i-col>
            </Row>
        </div>
        <div class="warningDeptDetali-2">
            <div class="titleBar">
                <Title :title='"数据完备度"'></Title>
                <span class="right-more" @click="goMore(0)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <!--  -->
            <div class="warningDeptDetali-2-cont">
                <Row v-if='barTopData_1.series.length&&isBarTop_1'>
                    <i-col span='16'>
                        <newBar v-if="isBarTop_1" :bar="barTopData_1" :series="barTopData_1.series"></newBar>
                    </i-col>
                    <i-col span='8'>
                        <list :title='listTop_1.title'>
                            <ul>
                                <li v-for='(v,i) in listTop_1.data' :key='i'>
                                    <label>{{i+1}}</label> {{v.title}}
                                    <span>{{v.num}}</span>
                                </li>
                            </ul>
                        </list>
                    </i-col>
                </Row>
                <div v-else class="noData">
                    <img src="@/assets/img/bg/noData_1.png" alt="暂无数据">
                </div>
            </div>
        </div>
        <Row class="warningDeptDetali-3">
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title='"总异常数与合规数据占比"'></Title>
                    <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <div class="warningDeptDetali-3-cont">
                    <Row class="ring-wrapper" v-if='assets[0].isRing&&assets[0].data.length'>
                        <i-col span='11'>
                            <ring v-if="assets[0].isRing" :data='assets[0].data' :labelColor='assets[0].labelColor' :color='assets[0].color' :title='assets[0].title' :hasLabel='assets[0].hasLabel'></ring>
                        </i-col>
                        <i-col span='13'>
                            <legendItem v-if="assets[0].isRing" :legendData="assets[0].data" :bg='assets[0].color' :classNme='"longitudinal"'></legendItem>
                        </i-col>
                    </Row>
                    <div v-else class="noData">
                        <img src="@/assets/img/bg/noData_1.png" alt="暂无数据">
                    </div>
                </div>
            </i-col>
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title='"填报异常数据覆盖率"'></Title>
                    <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <div class="warningDeptDetali-3-cont">
                    <div class="warningDeptDetali-3-cont-pl" v-if='!isNoData&&barLineItem.data.length'>
                        <legendItem v-if="!isNoData" :legendData="barLineItem.data" :bg='barLineItem.color' :classNme='"longitudinal"'></legendItem>
                    </div>
                    <newBar v-if="!isNoData" :bar="barLine" :series="barLineSeries"></newBar>
                    <div v-else class="noData">
                        <img src="@/assets/img/bg/noData_1.png" alt="暂无数据">
                    </div>
                </div>
            </i-col>
        </Row>
        <Row class="warningDeptDetali-4">
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title='"填报数据类型异常量"'></Title>
                    <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <Row class="warningDeptDetali-4-cont">
                    <i-col span='11'>
                        <ring v-if="assets[1].isRing" :data='assets[1].data' :labelColor='assets[1].labelColor' :color='assets[1].color' :title='assets[1].title' :hasLabel='assets[1].hasLabel'></ring>
                    </i-col>
                    <i-col span='13'>
                        <legendItem v-if="assets[1].isRing" :legendData="assets[1].data" :bg='assets[1].color' :classNme='"longitudinal"'></legendItem>
                    </i-col>
                </Row>
            </i-col>
            <i-col span='12'>
                <div class="titleBar">
                    <Title :title='"填报数据值异常资产分布"'></Title>
                    <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                </div>
                <Row class="warningDeptDetali-4-cont">
                    <i-col span='11'>
                        <ring v-if="assets[2].isRing" :data='assets[2].data' :labelColor='assets[2].labelColor' :color='assets[2].color' :title='assets[2].title' :hasLabel='assets[2].hasLabel'></ring>
                    </i-col>
                    <i-col span='13'>
                        <legendItem v-if="assets[2].isRing" :legendData="assets[2].data" :bg='assets[2].color' :classNme='"longitudinal"'></legendItem>
                    </i-col>
                </Row>
            </i-col>
        </Row>
    </div>
</template>

<script type='text/javascript'>
    import echarts from "echarts";
    import cardBlue from "@/components/cardBlue/cardBlue";
    import ring from "@/components/charts/ring/ring.vue";
    import legendItem from "@/components/charts/ring/legendItem.vue"; // 图例
    import lineItem from "@/components/charts/line/line.vue";
    import newBar from "@/components/charts/bar/newBar.vue";
    import Title from '@/components/title/index.vue';
    import CardColor from '@/components/gla-ui/CardColor.vue';
    import List from "@/components/list/list.vue";
    const warningColors = {
        you: {
            name: '优',
            color: '#5AC426'
        },
        liang: {
            name: '良好',
            color: '#5AC426'
        },
        yiban: {
            name: '一般',
            color: 'yellow'
        },
        cha: {
            name: '差',
            color: 'red'
        }
    }
    export default {
        name: "warningDeptDetali",
        data() {
            let {
                query,
                fullPath
            } = this.$route
            let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
            let parent = [{
                name: '全省总体分析',
                url: '/home/index/assetWarning'
            }, {
                name: '省直部门分析',
                url: '/home/index/warningDepartment'
            }, {
                name: '市州部门分析',
                url: '/home/index/warningCityState'
            }][typeThree];
            let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
            return {
                breadcrumb: [{
                        icon: 'dingwei',
                        name: '资产填报预警'
                    },
                    parent,
                    {
                        name: this.$store.state.deptInfo.orgSpecies,
                    }
                ],
                perfect: {
                    completeness: 0,
                    empty: 0,
                    fileds: 0,
                    total: 0,
                    isShow: false,
                }, //完备度
                normality: {
                    percent: 0,
                    data: 0,
                    type: 0,
                    isShow: false,
                    total: 0,
                    sumTotal: 0,
                }, // 合规度
                params: this.$route.query || {},
                card: {
                    warningIndex: [],
                    completeness: [], // 放填报数据完备度数据
                    progressList: [{}, {}], // 放最后两条数据
                    firstProgressList: [] // 放第一条数据
                },
                leftCard: {
                    title: "资产填报预警指数",
                    color: "#5AC426"
                },
                isNoData: false,
                idx: 0,
                ring: {
                    data: [],
                    color: ["#FF644F", "#3E81D9", "#3FC2BD", "#C9D55E", "#A190E9"],
                    labelColor: [
                        "#FF644F",
                        "transparent",
                        "#3E81D9",
                        "transparent",
                        "#3FC2BD",
                        "transparent",
                        "#C9D55E",
                        "transparent",
                        "#A190E9"
                    ],
                    title: {
                        num: "",
                        title: ""
                    },
                    isRing: false,
                    hasLabel: true
                },
                //资产分部部分的数据；
                assets: [{
                        data: [{
                                value: 0,
                                name: "合规数据"
                            },
                            {
                                value: 0,
                                name: "异常数据"
                            }
                        ],
                        color: [
                            "#10c4ff",
                            "#feba70",
                        ],
                        labelColor: [
                            "#10c4ff",
                            "#feba70",
                        ],
                        title: {
                            num: "",
                            title: "合规数据占比"
                        },
                        isRing: false,
                        hasNum: false,
                    },
                    {
                        data: [],
                        color: [
                            "#ca5d55",
                            "#269094",
                            "#10c4ff",
                            "#e8cb39",
                            "#14cede",
                            "#694dff"
                        ],
                        labelColor: [
                            "#ca5d55",
                            "#269094",
                            "#10c4ff",
                            "#e8cb39",
                            "#14cede",
                            "#694dff"
                        ],
                        title: {
                            // 圆圈里面的数据
                            num: "",
                            title: ""
                        },
                        isRing: false,
                        hasLabel: false,
                        hasNum: false,
                    },
                    {
                        data: [],
                        color: [
                            "#ca5d55",
                            "#269094",
                            "#10c4ff",
                            "#e8cb39",
                            "#14cede",
                            "#694dff"
                        ],
                        labelColor: [
                            "#ca5d55",
                            "#269094",
                            "#10c4ff",
                            "#e8cb39",
                            "#14cede",
                            "#694dff"
                        ],
                        title: {
                            num: "",
                            title: ""
                        },
                        isRing: false,
                        hasLabel: false,
                        hasNum: false,
                    }
                ],
                barLine: {
                    company: ['个', '个', '%'],
                    height: 370,
                    xData: [],
                    labelnames: ['异常数据', '合规数据', '异常覆盖率'],
                    yAxis: [{
                        name: '数量',
                        formatter: '{value}'
                    }, {
                        name: "异常覆盖率",
                        formatter: '{value}%'
                    }],
                    colorArr: [{
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
                                    color: "#b783ff"
                                },
                                {
                                    offset: 1,
                                    color: "#694dff"
                                }
                            ])
                        },
                    ],
                },
                barLineSeries: [],
                isBarLine: false,
                barLineItem: {
                    data: [{
                        name: '异常数据'
                    }, {
                        name: '合规数据'
                    }, {
                        name: '异常覆盖率'
                    }],
                    color: ['#10c4ff', '#e8cb39', '#694dff'],
                },
                nameArr: ['云资源', '数据', '机房', '软件', '硬件', '业务系统'],
                isBarTop_1: false,
                listTop_1: {
                    title: "数据完备度度排名",
                    data: []
                },
                barTopData_1: {
                    company: ['%'],
                    yAxis: [{
                        name: '(%)',
                        formatter: '{value}'
                    }],
                    height: 340,
                    xData: [],
                    labelnames: ['完备度'],
                    series: [],
                    colorArr: [{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#10c4ff"
                            },
                            {
                                offset: 1,
                                color: "#3259ff"
                            }
                        ])
                    }, ]
                },
            };
        },
        components: {
            cardBlue,
            ring,
            legendItem,
            lineItem,
            newBar,
            Title,
            CardColor,
            List,
        },
        computed: {
            level() {
                let level_0 = ((100 - this.perfect.completeness) * 0.5 + (100 - this.normality.percent) * 0.5).toFixed(2)
                level_0 = Number(level_0)
                if (level_0 <= 20) {
                    return '优秀'
                } else if (level_0 > 20 && level_0 <= 40) {
                    return '较好'
                } else if (level_0 > 40 && level_0 <= 60) {
                    return '一般'
                } else if (level_0 > 60 && level_0 <= 80) {
                    return '较差'
                } else if (level_0 > 80 && level_0 <= 100) {
                    return '预警'
                }
            }
        },
        mounted() {
            this.getEarlyWarning(this.params);
            this.getCompleteness(this.params);
            this.getCityGroup(this.params);
            this.getValueAbnormalData({
                abnormalType: "2",
                ...this.params
            });
            this.getTypeAbnormalData({
                abnormalType: "1",
                ...this.params
            });
            /* 完备度以及排名列表 */
            this.getCompletenessByType({
                sysOrgCode: this.$route.query.sysOrgCode
            });
            this.getCompletenessByTypeList({
                sysOrgCode: this.$route.query.sysOrgCode
            })
        },
        methods: {
            /* 填报合规度 */
            getEarlyWarning(params) {
                this.$api.getEarlyWarning(params).then(res => {
                    this.normality.sumTotal = res.total;
                    let sum = 0
                    if (res.data.length) {
                        res.data.forEach((v, i) => {
                            sum += v.count;
                            if (v.abnormal_type == 1) { //1类型异常2值异常
                                this.normality.type = v.count
                            } else if (v.abnormal_type == 2) {
                                this.normality.data = v.count
                            }
                        });
                    }
                    this.normality.total = res.total - sum;
                    if (res.total) {
                        this.normality.percent = ((res.total - sum) / res.total * 100).toFixed(2)
                    } else {
                        this.normality.percent = (0).toFixed(2)
                    }
                    this.assets[0].data = [{
                            name: "合规数据",
                            number: (res.total - sum) + '条',
                            value: this.normality.percent
                        },
                        {
                            name: "异常数据",
                            number: sum + '条',
                            value: (100 - this.normality.percent).toFixed(2)
                        }
                    ];
                    this.assets[0].title.num = this.normality.percent + '%';
                    this.assets[0].isRing = true;
                })
            },
            /* 填报数据完备度 */
            getCompleteness(params) {
                this.$api.warning.completeness(params).then(res => {
                    this.perfect = res;
                })
            },
            // 获取填报数据类型异常资产分布
            getTypeAbnormalData(param) {
                let params = { ...param,
                    ...this.param
                };
                this.assets[1].data = [];
                this.$api.warning.typeGroup(params).then(res => {
                    // 1云资源2数据3机房4软件5硬件6业务系统
                    let countArr = ['cloudCount', 'dataAssetsCount', 'computerCount', 'softwareCount', 'equipmentCount', 'systemCount']
                    this.assets[1].isRing = true;
                    let total = 0;
                    let totalPercent = 0;
                    let allTotal = 0;
                    allTotal += (res.cloudCount + res.dataAssetsCount + res.computerCount + res.softwareCount + res.equipmentCount + res.systemCount) || 1;
                    res.data.forEach(item => (total += item.count));
                    this.assets[1].data = this.getName(res.data, total || 1);
                    totalPercent = (total / allTotal * 100).toFixed(2);
                    this.assets[1].title.title = "填报数据类型<br/>异常量";
                    this.assets[1].title.num = total;
                });
            },
            // 获取填报数据完备度图表
            getTypeEmpty() {
                this.assets[0].data = [];
                this.$api.warning.typeEmpty(this.param).then(res => {
                    this.assets[0].isRing = true;
                    let total = 0;
                    let yunTotal = 0;
                    res.data.forEach((v, i) => {
                        total += v.empty;
                        if (v.type == '6' || v.type == '7' || v.type == '8' || v.type == '9') {
                            yunTotal += v.empty;
                        }
                    })
                    total = total || 1;
                    let arr = ['业务系统', '数据', '硬件', '软件', '数据'];
                    let newData = arr.map((o, i) => {
                        let idx = res.data.map(o => o.type - 1).indexOf(i);
                        return {
                            name: o,
                            empty: idx > -1 ? res.data[idx].empty : 0
                        }
                    })
                    newData.push({
                        name: '云资源',
                        empty: yunTotal
                    })
                    newData.forEach((o, i) => {
                        this.assets[0].data.push({
                            "value": (o.empty / total * 100).toFixed(2) || 0,
                            "name": o.name,
                            "number": o.empty
                        })
                    })
                    this.assets[0].title.title = '数据完备度总数';
                    this.assets[0].title.num = total;
                });
            },
            // 获取填报数据值异常资产分布
            getValueAbnormalData(params) {
                this.$api.warning.typeGroup(params).then(res => {
                    this.assets[2].isRing = true;
                    let total = 0;
                    let totalPercent = 0;
                    let allTotal = 0;
                    allTotal += (res.cloudCount + res.dataAssetsCount + res.computerCount + res.softwareCount + res.equipmentCount + res.systemCount) || 1;
                    res.data.forEach(item => {
                        total += item.count
                    });
                    this.assets[2].data = this.getName(res.data, total || 1);
                    totalPercent = (total / allTotal * 100).toFixed(2);
                    this.assets[2].title.title = "填报数据值<br/>异常量";
                    this.assets[2].title.num = total;
                });
            },
            // 获取填报异常数据覆盖率
            getCityGroup(params) {
                this.$api.warning.typeGroup(params).then(res => {
                    if (res.data.length == 0) {
                        this.isNoData = true;
                    } else {
                        this.isNoData = false;
                    }
                    let data = this.getCountName(res);
                    // let totalList = ["cloudCount", "dataAssetsCount", "computerCount", 'softwareCount', 'equipmentCount', 'systemCount'];
                    this.isBarLine = true;
                    let newData = [{
                        data: data.map((o, i) => {
                            return o.count
                        }),
                        type: 'bar',
                        color: "#10c4ff",
                        stack: '0',
                        yAxisIndex: 0,
                        barWidth: 30,
                    }, {
                        data: data.map((o, i) => {
                            return o.totalCount - o.count
                        }),
                        type: 'bar',
                        color: "#e8cb39",
                        stack: '0',
                        barWidth: 30,
                    }, {
                        data: data.map((o, i) => {
                            return (o.count / (o.totalCount ? o.totalCount : 1) * 100).toFixed(2) || 0
                        }),
                        type: "line",
                        color: "#694dff",
                        yAxisIndex: 1,
                        smooth: true, // 折线是否有弧度
                        showSymbol: false, // 折线上的小圆圈是否显示
                    }];
                    this.barLine.xData = this.nameArr;
                    this.barLineSeries = newData.map((o, i) => {
                        return {
                            ...o,
                        }
                    })
                })
            },
            /*封装totalCount 的方法 */
            getCountName(res) {
                let countArr = ['cloudCount', 'dataAssetsCount', 'computerCount', 'softwareCount', 'equipmentCount', 'systemCount']
                return this.nameArr.map((o, i) => {
                    let idx = res.data.map(v => {
                        return v.type - 1
                    }).indexOf(i);
                    let number = idx > -1 ? res.data[idx]['count'] : 0;
                    return {
                        name: o,
                        totalCount: res[countArr[i]],
                        count: number,
                        type: i + 1
                    }
                });
            },
            // 根据类型判断1云资源2数据3机房4软件5硬件6业务系统的封装
            getName(data, total) {
                let arr = ['云资源', '数据', '机房', '软件', '硬件', '业务系统'];
                return arr.map((o, i) => {
                    let idx = data.map(o => o.type - 1).indexOf(i);
                    let number = idx > -1 ? data[idx]['count'] : 0;
                    return {
                        name: o,
                        value: (number / total * 100).toFixed(2) || 0,
                        number: number + '条'
                    }
                });
            },
            /*--------------------事件处理------------------- */
            // 进入完备度列表页
            goMore(k) {
                if (k == 0) {
                    this.$router.push({
                        name: "assetTable",
                        query: {
                            sysOrgCode: this.$route.query.sysOrgCode,
                            title: this.$store.state.deptInfo.orgSpecies,
                            backPathName: 'warningDeptDetali',
                            type: this.$route.query.type,
                            radioBtn: this.$route.query.radioBtn,
                            isCityState: this.$route.query.isCityState,
                            areaids: this.$route.query.areaids,
                            
                        }
                        
                    })
                } else {
                    this.$router.push({
                        name: "assetTotal",
                        query: {
                            sysOrgCode: this.$route.query.sysOrgCode,
                            title: this.$store.state.deptInfo.orgSpecies,
                            backPathName: 'warningDeptDetali',
                            type: this.$route.query.type,
                            radioBtn: this.$route.query.radioBtn,
                            isCityState: this.$route.query.isCityState,
                            areaids: this.$route.query.areaids,
                        }
                    });
                }
            },
            openNew() {
                let routeData = this.$router.resolve({
                    name: "relation",
                    query: {
                        centerName: this.$store.state.deptInfo.orgSpecies || '',
                        sysOrgCode: this.$route.query.sysOrgCode
                    }
                });
                window.open(routeData.href, "_blank");
            },
            /* 完备度 */
            getCompletenessByType(e) {
                this.barTopData_1.xData = []
                let param = {
                    // sort: 'completeness',
                    // sortRule: 'desc',
                    ...e
                };
                this.$api.completenessByType(param).then(res => {
                    let yData = [];
                    res.data.length && res.data.forEach((v, i) => {
                        this.barTopData_1.xData.push(v.type);
                        yData.push((v.completeness * 100).toFixed(2));
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
            /* 完备度排名列表 */
            getCompletenessByTypeList(e) {
                let param = {
                    sort: 'completeness',
                    sortRule: 'desc',
                    pageSize: 8,
                    pageNumber: 1,
                    ...e
                };
                this.$api.completenessByType(param).then(res => {
                    res.data.length && res.data.forEach((v, i) => {
                        this.listTop_1.data.push({
                            title: v.type,
                            num: (v.completeness * 100).toFixed(2) + '%',
                        });
                    })
                })
            },
        }
    };
</script>

<style lang='scss' scoped>
    @import "@/assets/style/base/index.scss";
    .warningDeptDetali {
        .warningDeptDetali-1-cont {
            height: 176px;
            @extend %TitleBorder;
            border-top: 0;
            padding: 15px 0;
            .ivu-col {
                padding: 12px 15px;
            }
            .ivu-col-span-5 {
                .dd-num-1 {
                    margin-top: 50px;
                    @include flex($j: space-between);
                    height: 25px;
                    line-height: 25px;
                    label {
                        @include font($fz: 24px, $color:#1fdee5);
                        font-family: 'PangMenZhengDao';
                    }
                    span {
                        @include font($fz: 36px, $color:#fff);
                        font-family: 'PangMenZhengDao';
                    }
                }
                .dd-num {
                    height: 25px;
                    line-height: 25px;
                    margin-top: 50px;
                    position: relative;
                    span {
                        @include font($fz: 36px, $color:#fff);
                        font-family: 'PangMenZhengDao';
                    }
                    div {
                        position: absolute;
                        right: 0;
                        top: -77px;
                        text-align: right;
                        span {
                            display: block;
                            @include font($fz: 24px, $color:#fff);
                            height: 40px;
                            line-height: 40px;
                        }
                        label {
                            display: block;
                            @include font($fz: 14px, $color:#1ba0ff);
                            height: 16px;
                            line-height: 16px;
                        }
                    }
                }
            }
            .ivu-col-span-9 {
                @include font($fz: 14px, $color:rgba(255, 255, 255, 0.5));
                line-height: 18px;
                padding: 25px 15px;
            }
        }
        .warningDeptDetali-2 {
            margin-top: 20px;
            .warningDeptDetali-2-cont {
                height: 398px;
                @extend %TitleBorder;
                border-top: 0;
                padding: 29px 16px;
            }
        }
        .warningDeptDetali-3 {
            margin: 0 -15px;
            margin-top: 20px;
            .ivu-col-span-12 {
                padding: 0 15px;
                .warningDeptDetali-3-cont {
                    @extend %TitleBorder;
                    border-top: 0;
                    height: 442px;
                    .warningDeptDetali-3-cont-pl {
                        padding-left: 30px;
                        padding-top: 30px;
                    }
                    .ring-wrapper {
                        margin-top: 30px;
                        @include flex($j: center);
                        .ivu-col-span-12 {
                            @include flex($j: center);
                        }
                        span {
                            margin: auto 0;
                        }
                    }
                }
            }
            &>.ivu-col-span-12:first-child .warningDeptDetali-3-cont {
                @include flex($j: center);
            }
        }
        .warningDeptDetali-4 {
            margin: 0 -15px;
            margin-top: 20px;
            &>.ivu-col-span-12 {
                padding: 0 15px;
                .warningDeptDetali-4-cont {
                    @extend %TitleBorder;
                    border-top: 0;
                    height: 442px;
                    @include flex($j: center);
                }
            }
        }
    }
</style>

