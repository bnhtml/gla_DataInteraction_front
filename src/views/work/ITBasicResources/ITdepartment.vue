// IT  全省部门
<template>
    <div class="ITdepartment" v-breadcrumb="breadcrumb">
        <div class="titleBar">
            <Title :title='allCity + "部门IT基础资源情况"'></Title>
        </div>
        <Row class="ITdepartment-1">
            <i-col span='10' class="ITdepartment-content">
                <div class="left-bottom">
                    <p class="titleLeftBorder">自有机房情况</p>
                    <div class="left-bottom-cont " @click="goPcRoom" :style='{"cursor":isCursor}'>
                        <Row class='circle-bottom '>
                            <i-col span="12" v-for="(v, index) in dataset" :key="index">
                                <dl class="borderColor" v-if='index<4' :style='{borderColor:"#32beff"}'>
                                    <dt><strong>{{v.value||0}}</strong></dt>
                                    <dd>{{allCity}}{{v.name}}{{v.unit}}</dd>
                                </dl>
                            </i-col>
                        </Row>
                    </div>
                </div>
                <div class="left-top">
                    <p class="titleLeftBorder">云资源情况</p>
                    <div class="left-top-cont" @click="goResources" :style='{"cursor":isCursor}'>
                        <Row class="">
                            <i-col span="12" v-for="(v, index) in dataset" :key="index">
                                <dl class="borderColor" v-if='index>=4' :style='{borderColor:"#e8cb39"}'>
                                    <dt><strong>{{v.value||0}}</strong></dt>
                                    <dd>{{v.name}}{{v.unit}}</dd>
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
                        <li v-for='(v,i) in deptList' :key='i' @click="iconClick(v)">
                            <label><img :src="v.img" alt=""></label>
                            <span>{{v.orgSpecies}}</span>
                        </li>
                    </ul>
                    <div class="moreBar-wrapper" v-if='moreBar.isShow'>
                        <div class="bgColorBox">
                            <div class="legend-item">
                                <legendItem :legendData='legendData.data' :bg='legendData.color' class="ml30"></legendItem>
                            </div>
                            <newBar v-if="moreBar.isMoreBar" :bar="moreBar" :series="moreBar.series"></newBar>
                        </div>
                    </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import Title from '@/components/title/index';
    import echarts from 'echarts';
    import Datashow from "@/components/datashow";
    import legendItem from "@/components/charts/ring/legendItem.vue";
    import newBar from "@/components/charts/bar/newBar.vue";
    import {
        SERVER_BASE_URL
    } from "@/http/config.js";
    let data = {
        labelName: ['省直部门', '市级部门'],
        data0: [],
        data1: [],
        data2: []
    };
    let dataList = {
        data0: [],
        data1: [],
        data2: []
    };
    export default {
        name: 'ITdepartment',
        data() {
            let radioIndex = ['ITdepartment', 'ITcityState'].indexOf(this.$route.name);
            let radio = ['1', '-1'][radioIndex];
            let parent = [{
                    name: '省直部门分析',
                    url: '/home/index/ITdepartment'
                },
                {
                    name: '市州部门分析',
                    url: '/home/index/ITcityState'
                }
            ][radioIndex];
            return {
                breadcrumb: [{
                        icon: 'dingwei',
                        name: 'IT基础资源分析'
                    },
                    parent,
                ],
                titleName: ['全省总体', '市州部门'][radioIndex],
                radioList: [{
                        text: '省级部门',
                        id: '1'
                    },
                    {
                        text: '市级部门',
                        id: '2,3,4,5,6,7,8,9,10,11'
                    }
                ],
                radioIndex,
                jsonCode: "guizhou",
                width: 618,
                height: 500,
                strip: true,
                radio, // 头部  省直或者市级
                allCity: ['省直', '市州'][radioIndex],
                deptName: '省直部门',
                cengji: -1,
                deptList: data.data0,
                datasetQuery: {},
                citylevel: "", // 判断市级部门第几层
                dataset: [{
                        name: "机房投入费用",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(万元)",
                        icon: require("@/assets/img/icon/IT_icon_circle_1.png"),
                        numColor: ["#694dff", "#b783ff"],
                        url: {
                            name: "pcRoom"
                        }
                    },
                    {
                        name: "机房硬件设备数量",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(个)",
                        icon: require("@/assets/img/icon/IT_icon_yingjianshebei.png"),
                        numColor: ["#14cede", "#30ffda"],
                        url: {
                            name: "pcRoom"
                        }
                    },
                    {
                        name: "机房总数量",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(个)",
                        icon: require("@/assets/img/icon/IT_icon_circle_3.png"),
                        numColor: ["#3259ff", "#10c4ff"],
                        url: {
                            name: "pcRoom"
                        }
                    },
                    {
                        name: "机房总面积",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(㎡)",
                        icon: require("@/assets/img/icon/IT_icon_circle_4.png"),
                        numColor: ["#e8cb39", "#feba70"],
                        url: {
                            name: "pcRoom"
                        }
                    },
                    {
                        name: "计算资源总数量",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(核)",
                        icon: require("@/assets/img/icon/IT_icon_circle_5.png"),
                        numColor: ["#e8cb39", "#feba70"],
                        url: {
                            name: "resources"
                        }
                    },
                    {
                        name: "存储资源总数量",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(T)",
                        icon: require("@/assets/img/icon/IT_icon_yingpan.png"),
                        numColor: ["#3259ff", "#10c4ff"],
                        url: {
                            name: "resources"
                        }
                    },
                    {
                        name: "内存资源总数量",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(G)",
                        icon: require("@/assets/img/icon/IT_icon_neicun.png"),
                        numColor: ["#14cede", "#30ffda"],
                        url: {
                            name: "resources"
                        }
                    },
                    {
                        name: "云资源租赁费用",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(万元)",
                        icon: require("@/assets/img/icon/IT_icon_circle_1.png"),
                        numColor: ["#694dff", "#b783ff"],
                        url: {
                            name: "resources"
                        }
                    },
                ],
                moreBarSeries: [],
                moreBar: {
                    company:['万元','万元'],
                    isShow: false,
                    height: 500,
                    xData: [],
                    series: [{
                            name: "机房数量",
                            type: "bar",
                            barCategoryGap: 60,
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        type: "linear",
                                        global: false,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#2e6ac6"
                                            },
                                            {
                                                offset: 1,
                                                color: "#2b54a0"
                                            }
                                        ]
                                    },
                                    opacity: 1
                                }
                            },
                            data: []
                        },
                        {
                            name: "CPU资源",
                            type: "bar",
                            barCategoryGap: 60,
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        type: "linear",
                                        global: false,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#d56c59"
                                            },
                                            {
                                                offset: 1,
                                                color: "#d56c59"
                                            }
                                        ]
                                    },
                                    opacity: 1
                                }
                            },
                            data: []
                        },
                        {
                            name: "硬盘资源",
                            type: "bar",
                            barCategoryGap: 60,
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        type: "linear",
                                        global: false,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#2ba9ac"
                                            },
                                            {
                                                offset: 1,
                                                color: "#2ba9ac"
                                            }
                                        ]
                                    },
                                    opacity: 1
                                }
                            },
                            data: []
                        },
                        {
                            name: "内存资源",
                            type: "bar",
                            barCategoryGap: 60,
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        type: "linear",
                                        global: false,
                                        colorStops: [{
                                                offset: 0,
                                                color: "#8e80de"
                                            },
                                            {
                                                offset: 1,
                                                color: "#8e80de"
                                            }
                                        ]
                                    },
                                    opacity: 1
                                }
                            },
                            data: []
                        }
                    ],
                    isMoreBar: false,
                    labelnames: ['机房建设总费用', '云资源租赁费用'],
                    colorArr: [{
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: "#b783ff" //"#A291F9"
                                },
                                {
                                    offset: 1,
                                    color: "#694dff" //"#614EBE"
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
                                    color: "#feba70"
                                },
                                {
                                    offset: 1,
                                    color: "#e8cb39"
                                }
                            ])
                        }, {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: "#30ffda"
                                },
                                {
                                    offset: 1,
                                    color: "#14cede"
                                }
                            ])
                        }
                    ],
                },
                legendData: {
                    data: [{
                            name: "机房建设总费用"
                        },
                        {
                            name: "云资源租赁费用"
                        },
                    ],
                    color: ["linear-gradient(0deg, #694dff 0%,#b783ff 100%)", " linear-gradient(0deg, #3259ff 0%, #10c4ff 100%)", "linear-gradient(0deg,#e8cb39 0%,#feba70 100%)", "linear-gradient(0deg, #14cede 0%,#30ffda 100%)"]
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
            Datashow,
            legendItem,
            newBar,
        },
        mounted() {
            this.getIcon(1);
        },
        methods: {
            /* 省级市级切换 */
            changeRadio(v, i) {
                this.radioIndex = i;
                this.radio = v.id;
                this.cengji = -1;
                this.getIcon(this.radio);
                for (let j = 0; j < 3; j++) {
                    if (this.dataset[j].name.indexOf("市") > -1 && i == 0) {
                        this.dataset[j].name = this.dataset[j].name.replace('市', '省');
                    }
                    if (this.dataset[j].name.indexOf("省") > -1 && i == 1) {
                        this.dataset[j].name = this.dataset[j].name.replace('省', '市');
                    }
                }
            },
            goUp() {
                let add = {
                    '1': 2,
                    '-1': 1
                }[this.radio];
                this.cengji -= add;
                this.deptList = data["data" + this.cengji];
                if (this.cengji === 0) {
                    this.getPcroomData({
                        areaids: this.radio
                    });
                    this.mapQuery = {
                        name: '',
                        areaids: '',
                        orgRootId: '',
                    }
                } else {
                    this.getPcroomData({
                        areaids: this.radio,
                        orgRootId: this.deptList[0].orgRootId
                    });
                    this.mapQuery.orgRootId = this.mapQueryObj['mapQuery' + this.cengji].orgRootId 
                    this.mapQuery.name =this.mapQueryObj['mapQuery' + this.cengji].name 
                }
                this.getMoreBar(dataList["data" + this.cengji]);
            },
            /* 获取柱状图数据 */
            getMoreBar(res) {
                this.moreBar.isMoreBar = false;
                this.$nextTick(() => {
                    this.moreBar.xData = res.data.map(o => o.hardFirm);
                    let dataname = ['operationTrje', 'operactionCost'] //['type', 'cpu', 'rom', 'ram'];
                    this.moreBar.series = this.moreBar.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: res.data.map(oo => oo[dataname[i]]),
                            stack: "i",
                            barWidth: 30,
                        }
                    })
                    this.moreBar.isMoreBar = true;
                })
            },
            /* 获得 自有机房情况 和 云资源情况  数据 */
            getPcroomData(params = {}) {
                let arr = ['ITPcroomDataArea', 'ITPcroomDataSize'];
                arr.map(o => {
                    this.$api.ITBasic[o](params).then(res => {
                        let data = {};
                        let nameIndex = {
                            'yjCount': 1,
                            'rjzTrje': 0,
                            'jfSize': 3,
                            'allroomCount': 2,
                            'cpu': 4,
                            'ram': 6,
                            'rom': 5,
                            'operactionCost': 7
                        }
                        Object.keys(nameIndex).forEach(o => {
                            let val = res.data[o];
                            let idx = nameIndex[o];
                            let obj = this.dataset[idx];
                            if (val != undefined) {
                                this.dataset[idx].value = val
                            }
                        });
                    })
                })
            },
            // 进入各部门机房面积分析
            goPcRoom() {
                if (window.sysOrgCode && window.sysOrgCode.length === 1) return;
                this.$router.push({
                    name: 'pcRoom',
                    query: {
                        type: 2,
                        radioBtn: this.radio, //1省级，-1市级
                        isCityState: this.$route.name == 'ITcityState' ? true : false,
                        mapQuery: JSON.stringify(this.mapQuery)
                    }
                })
            },
            goResources() {
                if (window.sysOrgCode && window.sysOrgCode.length === 1) return;
                this.$router.push({
                    name: 'resources',
                    query: {
                        type: 2,
                        radioBtn: this.radio, //1省级，-1市级
                        isCityState: this.$route.name == 'ITcityState' ? true : false,
                        mapQuery: JSON.stringify(this.mapQuery)
                    }
                })
            },
            /*  获得ICON部门 & 机房和服务器*/
            getIcon(v = {}) {
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
                        url_data: 'barFirst',
                        params: {
                            areaids: this.radio,
                        }
                    },
                    {
                        url_icon: 'areaOrgSpeciesList',
                        url_data: 'barSecond',
                        params: {
                            areaids: this.radio,
                            orgRootId: v.orgRootId || ''
                        }
                    },
                    //省二层市三层
                    {
                        url_icon: 'organizationViewList',
                        url_data: 'barThrid',
                        params: {
                            areaids: v.areaid || this.radio,
                            orgRootId: v.orgRootId || ''
                        }
                    }
                ][newcengji];
                
                if (apiInfo) {
                    this.datasetQuery = apiInfo.params;
                    this.getPcroomData(this.datasetQuery);
                    this.$api.ITBasic[apiInfo.url_icon](apiInfo.params).then(res => {
                        res.data.forEach((v, i) => {
                            v.img = SERVER_BASE_URL + v.img;
                        });
                        this.deptList = res.data;
                        data['data' + newcengji] = res.data;
                        this.cengji = newcengji;
                        if (newcengji !== 0) {
                            this.mapQuery.orgRootId = this.mapQueryObj['mapQuery' + newcengji].orgRootId = v.orgRootId || ''
                            this.mapQuery.name =this.mapQueryObj['mapQuery' + newcengji].name = '【' + v.orgSpecies + '】';
                        }
                    });
                    this.$api.ITBasic[apiInfo.url_data](apiInfo.params).then(res => {
                        dataList['data' + newcengji] = res;
                        this.getMoreBar(res);
                    })
                } else {
                    this.$store.commit('get_deptInfo', v)
                    /* icon 部门的最后一层跳往详情页 */
                    this.$router.push({
                        name: "department",
                        query: {
                            sysOrgCode: v.sysOrgCode,
                            radioBtn: this.radio,
                            isCityState: this.$route.name == 'ITcityState' ? true : false
                        }
                    });
                    this.$store.commit('get_breadSon', {
                        pathName: 'department',
                        name: '省直部门资源总体分析'
                    })
                }
            },
            /* 点击部门IOCN */
            iconClick(v) {
                this.getIcon(v);
            },
        }
    }
</script>


<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .ITdepartment {
        .ITdepartment-1 {
            @extend %TitleBorder;
            border-top: 0;
            height: 616px;
        }
        .ITdepartment-content {
            box-sizing: border-box;
            padding: 23px 0 0 53px;
            .left-top {
                margin-top: 15px;
                .left-top-cont {
                    height: 245px;
                    @extend %TitleBorder;
                    padding: 23px 37px;
                    margin-top: 14px; //    cursor: pointer;
                    &:hover {
                        @include box-shadow($bs: #1a5182);
                    }
                }
            }
            .left-bottom {
                .left-bottom-cont {
                    height: 245px;
                    @extend %TitleBorder;
                    padding: 23px 37px;
                    margin-top: 14px; // cursor: pointer;
                    &:hover {
                        @include box-shadow($bs: #1a5182);
                    }
                }
            }
            .ivu-col-span-12:nth-child(2n) {
                .borderColor {
                    float: right;
                }
            }
            .borderColor {
                width: 190px;
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
        .cont-right {
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
                li {
                    width: 100px!important;
                }
                .legend-item {
                    margin-left: 30px;
                    position: absolute;
                }
            }
            .icon-department {
                @include nums($w: 100%, $h: 560px);
                ul {
                    @include nums($w: 100%, $h: 560px);
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
        .onebox {
            /deep/ .textBox {
                width: 170px;
            }
        }
    }
</style>
