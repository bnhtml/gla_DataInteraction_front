
<template>
    <div class="provinceDetail" v-breadcrumb="breadcrumb">
        <div class="provinceDetail-top">
            <div class='titleBar'>
                <Title :title='title1'></Title>
                <span class="right" @click="openNew">资产族谱</span>
                <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <Row class="provinceDetail-to-cont">
                <i-col span='6' v-for='(v,i) in cardTop' :key="i" v-if='i==0'>
                    <CardColor :title='v.title' :borderColor='v.borderColor' :bg='v.bg'>
                        <dd class="dd-num">
                            <div> <span> <b :style="{'color':v.numColor}" >{{v.num}}</b>{{v.company}} </span><img src="../../../../assets/img/icon/chart_0.png" alt=""> </div>
                        </dd>
                    </CardColor>
                </i-col>
                <i-col span='10' v-for='(v,i) in cardTop' :key="i" v-if='i==1'>
                    <CardColor :title='v.title' :borderColor='v.borderColor' :bg='v.bg'>
                        <dd class="dd-num">
                            <div>
                                <span><b :style="{'color':v.numColor}">{{v.num}}</b>{{v.company}}</span>
                                <div>
                                    <p v-for='(val,ind) in cardTop' :key="ind" v-if='ind==2||ind==3'>{{val.title}}<span> <b :style="{'color':val.numColor}" >{{val.num}}</b>{{val.company}} </span></p>
                                </div>
                            </div>
                        </dd>
                    </CardColor>
                </i-col>
                <i-col span='8'>
                    <p><label>业务系统总数：</label>反映的是该部门业务系统的总体数量。</p>
                    <p><label>业务系统总费用：</label>反映的是该部门业务系统的建设费用和运维费用总和。</p>
                </i-col>
            </Row>
        </div>
        <div class="provinceDetail-2">
            <div class="titleBar">
                <Title :title='title2'></Title>
                <span class="right-more" @click="goMore(2)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <div class="provinceDetail-2-cont">
                <Row class="provinceDetail-2-cont-top">
                    <i-col span='16' class="provinceDetail-2-cont-top-left">
                        <div>
                            <p class='titleLeftBorder'>业务系统承载网络分析</p>
                            <Row class='ring-wrapper ' v-if='ring_web.data.length&&ring_web.isShow'>
                                <i-col span='12'>
                                    <ring v-if='ring_web.isShow' :data='ring_web.data' :labelColor='ring_web.labelColor' :color='ring_web.color' :title='ring_web.title' :hasLabel='ring_web.hasLabel'></ring>
                                </i-col>
                                <i-col span='12'>
                                    <legendItem :legendData='ring_web.data' :bg='ring_web.color' :className='"longitudinal"'></legendItem>
                                </i-col>
                            </Row>
                            <div v-else class="noData">
                                <img src="@/assets/img/bg/noData_1.png" alt="">
                            </div>
                        </div>
                        <div>
                            <p class='titleLeftBorder'>业务系统迁云情况分析</p>
                            <Row class='ring-wrapper ' v-if='circleLeft.data.length&&circleLeft.isShow'>
                                <i-col span='12'>
                                    <ring v-if='circleLeft.isShow' :data='circleLeft.data' :labelColor='circleLeft.labelColor' :color='circleLeft.color' :title='circleLeft.title' :hasLabel='circleLeft.hasLabel'></ring>
                                </i-col>
                                <i-col span='12'>
                                    <legendItem v-if="circleLeft.isShow" :legendData='circleLeft.data' :bg='circleLeft.color' :className='"longitudinal"'></legendItem>
                                </i-col>
                            </Row>
                            <div v-else class="noData">
                                <img src="@/assets/img/bg/noData_1.png" alt="">
                            </div>
                        </div>
                    </i-col>
                    <i-col span='8' class="provinceDetail-2-cont-top-right">
                        <p class='titleLeftBorder'>业务系统建设状态分析</p>
                        <div class='ring-wrapper'>
                            <ring v-if='circleRight.isShow' :data='circleRight.data' :labelColor='circleRight.labelColor' :color='circleRight.color' :title='circleRight.title' :hasLabel='circleRight.hasLabel'></ring>
                        </div>
                        <div class="text-center">
                            <legendItem v-if="circleRight.isShow" :legendData='circleRight.data' :bg='circleRight.color' :className='"longitudinal"'></legendItem>
                        </div>
                    </i-col>
                </Row>
                <Row class="provinceDetail-2-cont-bottom">
                    <i-col span='8'>
                        <p class='titleLeftBorder'>安全等级定级情况</p>
                        <Row class="row-body">
                            <i-col span='24' class="justify-center mt10">
                                <newBar :bar="barData_0" :series="barData_0Series"></newBar>
                            </i-col>
                        </Row>
                    </i-col>
                    <i-col span='8'>
                        <p class='titleLeftBorder'>信息系统分级保护定级情况</p>
                        <Row class="row-body">
                            <i-col span='24' class="justify-center mt10">
                                <newBar :bar="barData_1" :series="barData_1Series"></newBar>
                            </i-col>
                        </Row>
                    </i-col>
                    <i-col span='8'>
                        <p class='titleLeftBorder'>数据安全要求</p>
                        <Row class="row-body">
                            <i-col span='24' class="justify-center mt10">
                                <newBar :bar="barData_2" :series="barData_2Series"></newBar>
                            </i-col>
                        </Row>
                    </i-col>
                </Row>
            </div>
        </div>
        <div class="provinceDetail-3">
            <div class="titleBar">
                <Title :title="title3"></Title>
                <span class="right-more" @click="goMore(3)">明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <Row class="provinceDetail-3-cont">
                <i-col span='16'>
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
                </i-col>
                <i-col span='8'>
                    <div v-if='capitalSource.data.length&&capitalSource.isShow'>
                        <ring v-if='capitalSource.isShow' :data='capitalSource.data' :labelColor='capitalSource.labelColor' :color='capitalSource.color' :title='capitalSource.title' :hasLabel='capitalSource.hasLabel'></ring>
                        <div class="text-center">
                            <legendItem :legendData='capitalSource.data' :bg='capitalSource.color' :className='"longitudinal"'></legendItem>
                        </div>
                    </div>
                    <div v-else class="noData">
                        <img src="@/assets/img/bg/noData_1.png" alt="">
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script type="text/javascript">
    import echarts from "echarts";
    import ring from "@/components/charts/ring/ring.vue";
    import newBar from "@/components/charts/bar/newBar.vue";
    import Title from '@/components/title/index';
    import legendItem from "@/components/charts/ring/legendItem.vue";
    import CardColor from '@/components/gla-ui/CardColor.vue';
    import List from '@/components/list/list.vue';
    let name_0 = ["一级", "二级", "三级", "四级", "五级", "未定级", '未反馈'];
    let name_1 = ["未定秘", "秘密", "机密", "绝密", '未反馈'];
    let name_2 = ["涉密", "敏感", "不宜公开", "依申请公开", "可公开", '未反馈'];
    name_2 = name_2.slice(1, name_2.length);
    export default {
        name: "provinceDetail",
        data() {
            let {
                query,
                params,
                name,
                fullPath
            } = this.$route;
            let titleName = this.$store.state.deptInfo.orgSpecies;
            let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : 1
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
            return {
                titleName,
                breadcrumb: [{
                        icon: 'dingwei',
                        name: '业务系统分析'
                    },
                    parent,
                    {
                        name: titleName,
                        url: fullPath
                    }
                ],
                cardTop: [{
                    title: '业务系统总数',
                    num: '',
                    company: '个',
                    borderColor: 'rgb(26, 164, 255)',
                    bg: ['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)'],
                    numColor: '#20aeff'
                }, {
                    title: '业务系统总费用',
                    num: '',
                    company: '万元',
                    borderColor: ' rgb(31, 222, 229)',
                    bg: ['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5)'],
                    numColor: '#00f5ec'
                }, {
                    title: '业务系统建设费用',
                    num: '',
                    company: '万元',
                    borderColor: ' rgb(31, 222, 229)',
                    bg: ['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5)'],
                    numColor: '#00f5ec'
                }, {
                    title: '业务系统运维费用',
                    num: '',
                    company: '万元',
                    borderColor: ' rgb(31, 222, 229)',
                    bg: ['rgba(21,106,109,0.5)', 'rgba(43,169,172,0.5)'],
                    numColor: '#00f5ec'
                }],
                circleLeft: {
                    data: [{
                        value: 0,
                        name: '计划迁云',
                        number: 0,
                    }, {
                        value: 0,
                        name: '不迁云',
                        number: 0,
                    }, {
                        value: 0,
                        name: '已迁云',
                        number: 0,
                    }, {
                        value: 0,
                        name: '未反馈',
                        number: 0,
                    }, ],
                    color: ["#694dff", "#10c4ff", "#e8cb39", "#ca5d55", "#0d8d70", "#e8cb39", "#10c4ff", '#14cede'],
                    labelColor: ["#694dff", "#10c4ff", "#e8cb39", "#ca5d55", "#0d8d70", "#e8cb39", "#10c4ff", '#14cede'],
                    isShow: false,
                    hasLabel: false,
                    title: {
                        title: '迁云情况',
                        num: '0'
                    },
                }, // 业务系统迁云情况
                circleRight: {
                    data: [],
                    color: ["#694dff", "#10c4ff", "#e8cb39", "#ca5d55", "#0d8d70", "#e8cb39", "#10c4ff", '#14cede'],
                    labelColor: ["#694dff", "#10c4ff", "#e8cb39", "#ca5d55", "#0d8d70", "#e8cb39", "#10c4ff", '#14cede'],
                    isShow: false,
                    hasLabel: false,
                    title: {
                        title: '迁云情况'
                    },
                },
                line: {
                    company: ['万元', '万元'],
                    legendData: ['建设', '运维'],
                    labelnames: ['建设费用', '运维费用'],
                    xData: [],
                    yAxis: [{
                        name: '',
                        formatter: '{value}'
                    }, {
                        name: "",
                        formatter: '{value}'
                    }],
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
                    operationCost: {
                        normal: 0,
                        sum: 0,
                        unknown: 0
                    }, // 运维
                    constructionCost: {
                        normal: 0,
                        sum: 0,
                        unknown: 0
                    }, // 建设
                    height: 350
                },
                isBarData: false,
                isBarData_0: false,
                isBarData_1: false,
                isBarData_2: false,
                barData: {
                    height: 300,
                    xData: ['已建', '在建', '拟建'],
                    labelnames: ['数量(个)'],
                },
                barDataSeries: [],
                // 安全等级定级情况信息配置
                barData_0: {
                    company: ['个'],
                    height: 300,
                    xData: name_0,
                    labelnames: ['数量'],
                },
                barData_0Series: [],
                // 保护定级情况信息配置
                barData_1: {
                    company: ['个'],
                    height: 300,
                    xData: name_1,
                    labelnames: ['数量'],
                },
                barData_1Series: [],
                // 数据安全要求信息配置
                barData_2: {
                    company: ['个'],
                    height: 300,
                    xData: name_2,
                    labelnames: ['数量'],
                },
                barData_2Series: [],
                // 业务系统承载网络分析信息配置
                barWebData: {
                    company: ['个', '个', '个'],
                    height: 350,
                    xData: ["政务外网", "互联网", "专网"],
                    labelnames: ['数量'],
                    isShow: false
                },
                barWebDataSeries: [],
                radio: "业务系统",
                capitalSource: {
                    data: [{
                        value: 0.00,
                        name: '财政拨款',
                        number: 0,
                    }, {
                        value: 0.00,
                        name: '自筹',
                        number: 0,
                    }, {
                        value: 0.00,
                        name: 'BT项目',
                        number: 0,
                    }, {
                        value: 0.00,
                        name: '其他',
                        number: 0,
                    }, {
                        value: 0.00,
                        name: '未反馈',
                        number: 0,
                    }],
                    labelColor: ["#14cede", "#694dff", "#3259ff", "#e8cb39", "#9c8ae7"],
                    color: ["#14cede", "#694dff", "#3259ff", "#e8cb39", "#9c8ae7"],
                    hasLabel: false,
                    isShow: false,
                    title: {}
                },
                ring_web: {
                    data: [{
                        value: 0,
                        name: '政务外网',
                        number: 0,
                    }, {
                        value: 0,
                        name: '互联网',
                        number: 0,
                    }, {
                        value: 0,
                        name: '专网',
                        number: 0,
                    }, {
                        value: 0,
                        name: '未反馈',
                        number: 0,
                    }],
                    labelColor: ["#14cede", "#694dff", "#3259ff", "#e8cb39", "#9c8ae7"],
                    color: ["#14cede", "#694dff", "#3259ff", "#e8cb39", "#9c8ae7"],
                    isShow: false,
                    hasLabel: false,
                    title: {},
                },
                list: [],
                params: {
                    sysOrgCode: this.$store.state.deptInfo.sysOrgCode
                }
            };
        },
        components: {
            legendItem,
            ring,
            newBar,
            Title,
            CardColor,
            List,
        },
        mounted() {
            this.getCapitalSource(this.params);
            this.getLine(this.params);
            this.getSfQyunGroup(this.params); // 业务系统迁云情况分析
            this.getSysStatusGroup(this.params); //业务系统建设状态分析
            this.getCard(this.params); //业务系统总体情况
            this.getSafeLevGroup(this.params);
            this.getprotConditionGroup(this.params); //信息系统分级保护定级情况
            this.getsjaqYqGroup(this.params); //数据安全要求
            this.getBearerNetworkOrgGroup(this.params); //业务系统承载网络分析
            // this.getsystemList(this.params)
        },
        computed: {
            title1() {
                return this.titleName + " - 业务系统总体情况";
            },
            title2() {
                return this.titleName + ' - 业务系统数量情况' //" - 投入资金来源分析";
            },
            title3() {
                return this.titleName + " - 业务系统资金使用情况";
            },
            title4() {
                return this.titleName + " - 业务系统承载网络分析";
            },
            title6() {
                return this.titleName + " - 业务系统安全情况分析";
            },
            title0() {
                return this.titleName + " - 业务系统迁云情况分析";
            },
        },
        methods: {
            randomarr(total = 100, leng = 5) {
                let arr = [];
                for (let i = 0; i < leng; i++) {
                    if (i === 4) {
                        arr.push(total.toFixed(2));
                        break;
                    }
                    let size = this.random(total * 2 / (leng - 1));
                    arr.push(size);
                    total -= size;
                }
                return arr;
            },
            random(num = 200, float = 2) {
                return parseFloat((Math.random() * num).toFixed(float));
            },
            /* 投入资金来源分析 */
            getCapitalSource(e) {
                this.capitalSource.isShow = false;
                this.$api.funingSourceTrje(e).then(res => {
                    let arr = ['财政拨款', '自筹', 'BT项目', '其他', '未反馈'];
                    let sum = 0;
                    res.data.forEach((item, k) => {
                        sum += this.ISNumber(item.num);
                        arr.forEach((v, i) => {
                            if (item.title == v) {
                                this.capitalSource.data[i].value = item.percent;
                                this.capitalSource.data[i].number = item.num;
                            }
                        })
                    });
                    this.capitalSource.title = {
                        title: "投资金额(万元)",
                        num: sum
                    };
                    this.capitalSource.isShow = true;
                });
            },
            /* 资金投入走势图 */
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
                            yAxisIndex: i,
                            showSymbol: false,
                            smooth: true,
                        };
                    });
                });
            },
            openNew() {
                let routeData = this.$router.resolve({
                    name: "relation",
                    query: {
                        centerName: this.$store.state.deptInfo.orgSpecies || '',
                        sysOrgCode: this.$store.state.deptInfo.sysOrgCode
                    }
                });
                window.open(routeData.href, "_blank");
            },
            /* 头部卡片数据 */
            getCard(params) {
                /* 总数 建设  运维  */
                let topNum = ['total', '', 'constructionCost', 'operationCost'];
                // /* 已建 在建 拟建 */
                // let bottomNum = ['build', 'underConstruction', 'proposedConstruction']
                // let bottomPercent = ['buildPercent', 'underConstructionPercent', 'proposedConstructionPercent']
                this.$api.sfUseGroup(params).then(res => {
                    topNum.forEach((v, i) => {
                        this.cardTop[i].num = res[v]
                    })
                    this.cardTop[1].num = this.cardTop[2].num + this.cardTop[3].num
                })
            },
            /* 业务系统迁云情况分析 */
            getSfQyunGroup(e) {
                this.$api.sfQyunGroup(e).then(res => {
                    if (res.data.length) {
                        let sum = 0;
                        this.circleLeft.isShow = true;
                        let arr = ['计划迁云', '已迁云', '不迁云', '未反馈'];
                        res.data.forEach((item, k) => {
                            sum += item.num
                            arr.forEach((v, i) => {
                                if (item.title == v) {
                                    this.circleLeft.data[i] = {
                                        value: item.percent,
                                        name: item.title,
                                        number: item.num,
                                    }
                                }
                            })
                        })
                        this.circleLeft.title.num = sum;
                    }
                });
            },
            /* 业务系统建设状态分析 */
            getSysStatusGroup(e) {
                this.$api.sysStatusGroup(e).then(res => {
                    this.circleRight.data = [];
                    this.circleRight.isShow = true;
                    let newData = res.data;
                    this.circleRight.title.title = "总数量";
                    this.circleRight.title.num = res.total;
                    let nameArr = ['未反馈', '拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'];
                    newData.forEach((v, i) => {
                        v.name = nameArr[v.sys_status]
                    })
                    let haveArr = newData.map(o => o.sys_status);
                    nameArr.forEach((item, k) => {
                        let isin = haveArr.indexOf(k);
                        let value = (isin > -1) ? newData[isin] && newData[isin].whole ? (newData[isin].whole / res.total * 100).toFixed(2) : 0 : 0;
                        let number = (isin > -1) ? (newData[isin] && newData[isin].whole || 0) + '个' : '0个';
                        this.circleRight.data.push({
                            value,
                            name: item,
                            number
                        });
                    })
                    this.circleRight.data = this.getOrder(this.circleRight.data)
                })
            },
            /* 安全等级定级情况 */
            getSafeLevGroup(e) {
                this.$api.safeLevGroup(e).then(res => {
                    let yData = [0, 0, 0, 0, 0, 0, 0];
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
                    this.barData_0Series = this.barData_0.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 25,
                            barCategoryGap: 25,
                        }
                    })
                    // this.isBarData_0 = true;
                })
            },
            /* 信息系统分级保护定级情况 */
            getprotConditionGroup(e) {
                this.$api.protConditionGroup(e).then(res => {
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
                    this.barData_1Series = this.barData_1.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 25,
                        }
                    })
                    this.isBarData_1 = true;
                })
            },
            /* 数据安全要求 */
            getsjaqYqGroup(e) {
                this.$api.sjaqYqGroup(e).then(res => {
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
                        } else if (v.sjaqYq == 6) {
                            yData[5] = v.countnum;
                        } else if (v.sjaqYq == 0) {
                            yData[6] = v.countnum;
                        }
                    })
                    yData = yData.slice(1, yData.length - 1)
                    this.barData_2Series = this.barData_2.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: yData,
                            barMaxWidth: 25,
                        }
                    })
                    // this.isBarData_2 = true;
                })
            },
            /* 业务系统承载网络分析 */
            getBearerNetworkOrgGroup(e) {
                this.$api.bearerNetworkOrgGroup(e).then(res => {
                    let arr = ['one', 'two', 'three', 'unknown'];
                    this.ring_web.title.num = res.total;
                    this.ring_web.title.title = '承载网络';
                    if (res.data.length == 0) {
                        return
                    } else {
                        arr.forEach((v, i) => {
                            this.ring_web.data[i].number = res.data[0][v] + '个'
                            this.ring_web.data[i].value = (res.data[0][v] / res.total * 100).toFixed(2);
                        })
                    }
                    this.ring_web.isShow = true
                })
            },
            /* 业务系统承载网络分析  - list*/
            // getsystemList() {
            //     this.$api.systemList({
            //         sysOrgCode: this.$store.state.deptInfo.sysOrgCode,
            //         bearerNetwork: 3, // 1:政务外网,2:互联网,3:其他专网
            //         pageNumber: 1,
            //         pageSize: 1000
            //     }).then(res => {
            //         this.list = res.data;
            //     })
            // },
            /* 跑道数据获取方式封装 */
            getRingGraph(ringGraph, data, name) {
                name.forEach((v, i) => {
                    data.forEach((val, index) => {
                        if (v == val.title) {
                            ringGraph.legendData.push({
                                value: data[i].percent,
                                name: data[i].title,
                                number: data[i].num
                            });
                            ringGraph.list.push({
                                name: data[i]["title"],
                                type: "pie",
                                clockWise: false,
                                radius: [100 - 6 - i * 20, 100 - i * 20],
                                center: ["50%", "50%"],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    }
                                },
                                hoverAnimation: false,
                                startAngle: 90,
                                label: {
                                    borderRadius: "10"
                                },
                                data: [{
                                        value: ringGraph.total - data[i].num,
                                        name: data[i].title,
                                        tooltip: {
                                            show: false
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: "#293D6F",
                                                label: {
                                                    show: true
                                                },
                                                labelLine: {
                                                    show: true
                                                }
                                            },
                                            emphasis: {
                                                color: "#293D6F"
                                            }
                                        }
                                    },
                                    {
                                        value: data[i].num,
                                        name: data[i].title,
                                        tooltip: {
                                            show: true
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                        offset: 0,
                                                        color: ringGraph.color[0 + i * 2]
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: ringGraph.color[1 + i * 2]
                                                    }
                                                ])
                                            }
                                        }
                                    }
                                ]
                            });
                        }
                    })
                });
                ringGraph.isShow = true;
            },
            ISNumber(e) {
                if (typeof e == 'string') {
                    e = Number(e)
                }
                return e
            },
            /* 业务系统安全情况分析的更多 */
            goBusinessTable() {
                this.$router.push({
                    name: 'businessTable',
                    query: {
                        typeUrl: 'systemSafety',
                        sysOrgCode: this.$store.state.deptInfo.sysOrgCode,
                        title: this.$store.state.deptInfo.orgSpecies,
                        type: this.$route.query.type,
                        backPathName: 'provinceDetail',
                        isCityState: this.$route.query.isCityState,
                        tableTitle: this.title6,
                        radioBtn: this.$route.query.radioBtn
                    }
                })
            },
            // 其他的更多
            goMore(e) {
                let query = {};
                let names = '';
                if (e == 1) {
                    query = {
                        typeUrl: 'sfUseGroupTableSon',
                        tableTitle: this.title1
                    }
                } else if (e == 2) {
                    query = {
                        typeUrl: 'systemQuantitJson',
                        tableTitle: this.title2
                    }
                } else if (e == 3) {
                    query = {
                        typeUrl: 'sourceTableSon',
                        tableTitle: this.title3
                    }
                } 
                this.$router.push({
                    name: 'tableDetail',
                    query: {
                        ...query,
                        sysOrgCode: this.$store.state.deptInfo.sysOrgCode,
                        title: this.$store.state.deptInfo.orgSpecies,
                        type: this.$route.query.type,
                        backPathName: 'provinceDetail',
                        isCityState: this.$route.query.isCityState,
                        radioBtn: this.$route.query.radioBtn
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

<style scoped lang='scss'>
    @import "@/assets/style/base/index.scss";
    %margin {
        margin-left: -10px;
        margin-right: -10px;
    }
    %padding,
    /* .ivu-col */
    {
        padding-left: 10px;
        padding-right: 10px;
    }
    .justify-center {
        display: flex;
        justify-content: center;
    }
    .dd-num {
        &>div {
            position: relative;
            vertical-align: bottom;
            font-family: 'PangMenZhengDao';
            height: 73px;
            font-size: 16px;
            &>span {
                position: absolute;
                left: 0;
                bottom: -10px;
                font-family: 'PangMenZhengDao';
                b {
                    font-size: 36px;
                }
            }
            img {
                position: absolute;
                right: 0;
                bottom: 2px;
            }
            div {
                position: absolute;
                right: 0;
                top: -24px;
                @include nums($w: 60%, $h:96px);
                border-left: solid 1px rgba(255, 255, 255, 0.3);
                padding-left: 47px;
                p {
                    line-height: 40px;
                    font-size: 16px;
                    span {
                        font-family: 'PangMenZhengDao';
                        font-size: 14px;
                        b {
                            font-size: 30px;
                            padding-left: 5px;
                        }
                    }
                }
            }
        }
    }
    .provinceDetail {
        .provinceDetail-top {
            .provinceDetail-to-cont {
                height: 190px;
                @extend %TitleBorder;
                border-top: 0;
                padding: 15px;
                .ivu-col {
                    padding: 15px;
                }
                .ivu-col-span-8 {
                    p {
                        @include font($fz: 14px, $color:#9dabcf);
                        line-height: 18px;
                        margin-top: 20px;
                        label {
                            color: #c0cc4c;
                        }
                    }
                }
            }
        }
        .provinceDetail-2 {
            @extend %margin;
            margin-top: 25px;
            padding: 10px;
            .provinceDetail-2-cont {
                @extend %TitleBorder;
                border-top: 0;
                padding: 6px;
                height: 1157px;
                .provinceDetail-2-cont-top {
                    height: 710px;
                    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
                    .provinceDetail-2-cont-top-left {
                        height: 100%;
                        border-right: solid 1px rgba(255, 255, 255, 0.2);
                        &>div:first-child {
                            border-bottom: solid 1px rgba(255, 255, 255, 0.2);
                        }
                        &>div {
                            height: 355px;
                        }
                    }
                    .provinceDetail-2-cont-top-right {
                        .text-center {
                            @include flex($j: center);
                            margin-top: 70px;
                        }
                    }
                }
                .provinceDetail-2-cont-bottom {
                    .ivu-col-span-8 {
                        .titleLeftBorder {
                            margin-top: 60px;
                        }
                    }
                }
            }
        }
        .provinceDetail-3 {
            margin-top: 25px;
            .provinceDetail-3-cont {
                height: 500px;
                @extend %TitleBorder;
                border-top: 0;
                &>.ivu-col {
                    height: 500px;
                    .text-center {
                        @include flex($j: center);
                    }
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
                }
            }
        }
    }
    .ring-wrapper {
        margin-top: 30px;
        @include flex($j: center);
        .ivu-col-span-12:first-child {
            @include flex($j: center);
        }
        span {
            margin: auto 0;
            &:last-child {
                display: inline-block;
                @include nums($w: 250px);
            }
        }
    }
    .titleLeftBorder {
        margin: 20px 0 0 20px;
        padding-left: 20px;
    }
</style>
