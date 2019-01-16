// 部门
<template>
    <div class="warningDepartment" v-breadcrumb='breadcrumb'>
        <div class="titleBar">
            <Title :title="titleName+'资产填报预警情况'"></Title>
            <!-- <ul class="right-radio">
                <li v-for='(v,i) in radioList' :key='i' :class="radioIndex==i?'hover':''" @click="changeRadio(v,i)">{{v.text}}</li>
            </ul> -->
        </div>
        <Row class="warningDepartment-cont" v-if='perfect.loading&&normality.loading'>
            <i-col span='10' >
               <div class="warningDepartment-cont-inner" @click='goMore' :style='{"cursor":isCursor}'>
                    <div class="warningDepartment-cont-inner-top">
                        <dl :style='{borderColor:levelColor[getLevel(100-warningNum)]}'>
                            <dt><span><strong>{{warningNum}}%</strong> <b :style='{color:levelColor[getLevel(100-warningNum)]}'>{{levelText[getLevel(100-warningNum)]}}</b> </span><span>资产填报预警指数</span></dt>
                            <!-- <dd><img :src="require('../../../assets/img/icon/chart_level_'+getLevel(100-warningNum)+'.png')" alt=""></dd> -->
                            <p class="tip">
                                反映数据填报预警程度的指标，预警指数越高，数据填报质量越差，是对填报数据异常情况、不完整情况的综合反映。资产填报预警指数=（1-数据合规度）*权重1+（1-数据完备度）*权重2（权重1=0.5；权重2=0.5）
                            </p>
                        </dl>
                    </div>
                    <div class="warningDepartment-cont-inner-bottom">
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
                        <p>1.资产填报预警指数=（1-数据合规度）*权重1+（1-数据完备度）*权重2  <br/>（权重1=0.5；权重2=0.5）</p>
                        <p>2.数据合规度=符合系统要求的字段总数/实际填报的字段总数*100%；</p>
                        <p>3.数据完备度=实际填报的字段总数/应该填写的字段总数*100%。</p>
                    </div>
                </div>
            </i-col>
            <i-col span='14' >
                <i-col span="24" class="tabBar">
                    <p class="rightBtn"><strong @click="goUp" v-if="cengji != 0&&cengji != -1"><i class="iconfont icon-fanhui"></i>返回上一级 <br></strong>
                        <span @click='moreBar.isBar=!moreBar.isBar'> <i class='iconfont icon-qiehuan'></i> 切换为{{moreBar.isBar==false?'柱状':'列表'}}显示 </span>
                    </p>
                    <Row class="icon-department">
                        <ul v-if='!moreBar.isBar'>
                            <li v-for="(item, k) in deptList" :key="k" @click="iconClick(item)">
                                <label for="">
                                                                              <img :src="item.img" alt="图标">
                                                                          </label>
                                <span>{{item.orgSpecies}}</span>
                            </li>
                        </ul>
                        <div class="moreBar-wrapper" v-if='moreBar.isBar'>
                            <div class="bgColorBox" >
                                <legendItem :legendData='legendData.data' :bg='legendData.color'></legendItem>
                                <newBar v-if="moreBar.isMoreBar " :bar="moreBar" :series="moreBarSeries"></newBar>
                            </div>
                           <!-- <div v-else class="noData bgColorBox">
                                <img src="@/assets/img/bg/noData.png" alt="暂无数据">
                            </div> -->
                        </div>
                    </Row>
                </i-col>
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
    import echarts from "echarts";
    import legendItem from "@/components/charts/ring/legendItem.vue"; // 图例
    import newBar from "@/components/charts/bar/newBar.vue";
    import {
        SERVER_BASE_URL
    } from "@/http/config.js";
    let colorArr = [{
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
    }
    export default {
        name: 'warningDepartment',
        data() {
            let radioIndex = ['warningDepartment', 'warningCityState'].indexOf(this.$route.name);
            let radio = ['1', '-1'][radioIndex];
            let parent=[{
                        name: '省直部门分析',
                        url: '/home/index/warningDepartment'
                    },{
                        name: '市州部门分析',
                        url: '/home/index/warningCityState'
                    }][radioIndex];
            return {
                 breadcrumb: [
                    {
                        icon: 'dingwei',
                        name: '资产填报预警'
                    },
                    parent,
                ],
                levelText:['优秀', '较好', '一般', '较差',  '预警'],
                levelColor:['#00ffe7','#36bfff','#594ea4','#efc54b','#ff5073'],// 优秀 较好 一般 较差  预警
                titleName:['省直部门','市州部门'][radioIndex],
                radioList: [{
                        text: '省级部门',
                        id: '1'
                    },
                    {
                        text: '市级部门',
                        id: '-1'
                    }
                ],
                radioIndex,
                radio,
                allCity: "全省",
                jsonCode: "guizhou",
                width: 618,
                height: 616,
                strip: true,
                perfect: {
                    completeness: 0,
                    empty: 0,
                    fileds: 0,
                    total: 0,
                    loading:false
                }, //完备度
                normality: {
                    percent: 0,
                    data: 0,
                    type: 0,
                    total:0,//
                    sumTotal:0,//
                    loading:false
                }, // 合规度
                moreBar: {
                    height: 488,
                    isBar: false,
                    isMoreBar: false,
                    isShow: false,
                    xData: [],
                    labelnames: ['资产填报预警指数'],
                    company:['%'],
                    colorArr: colorArr,
                },
                legendData: {
                    data: [{name:'资产填报预警指数'}],
                    color: [ "#10c4ff"]
                },
                moreBarSeries: [],
                deptList: data.data0,
                cengji: -1,
                isCursor:'pointer',
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
            Map,
            Title,
            legendItem,
            newBar,
        },
        computed:{
            // 预警指数
            warningNum(){
                return  ((100-this.perfect.completeness)*0.5+(100-this.normality.percent)*0.5).toFixed(2)
            }
        },
        mounted() {
            this.getIcon({})
        },
        methods: {
            /* 省级市级切换 */
            changeRadio(v, i) {
                this.radioIndex = i;
                this.radio = v.id;
                this.cengji = -1;
                this.getIcon(this.radio);
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
                        this.normality.loading = true
                    }
                })
            },
            /* 填报数据完备度 */
            getCompleteness(params) {
                this.$api.warning.completeness(params).then(res => {
                    this.perfect = res;
                    this.perfect.loading = true
                })
            },
            goUp() {
                let add = {
                    '1': 2,
                    '-1': 1
                }[this.radio];
                this.cengji -= add;
                this.deptList = data["data" + this.cengji];
                if (this.cengji === 0) {
                    this.getEarlyWarning({ areaids: this.radio,});
                    this.getCompleteness({ areaids: this.radio,});
                    this.mapQuery = {
                        name: '',
                        areaids: '',
                        orgRootId: '',
                    }
                } else {
                    this.getEarlyWarning({
                        areaids: this.radio,
                        orgRootId: this.deptList && this.deptList[0].orgRootId || ''
                    });
                    this.getCompleteness({
                        areaids: this.radio,
                        orgRootId: this.deptList && this.deptList[0].orgRootId || ''
                    });
                     this.mapQuery.orgRootId = this.mapQueryObj['mapQuery' + this.cengji].orgRootId 
                    this.mapQuery.name =this.mapQueryObj['mapQuery' + this.cengji].name 
                }
                this.getMoreBar(dataList["data" + this.cengji]);
            },
            // 获取多柱状图测试数据
            getMoreBar(res) {
                this.moreBar.isMoreBar = false;
                this.$nextTick(() => {
                    this.moreBar.xData = res.data && res.data.map(o => o.org_species || o.areaname || o.org_nm);
                    this.moreBarSeries = this.moreBar.labelnames.map((o, i) => {
                        let dataname = ['err', 'valueErr', 'typeErr', ''][i];
                        return {
                            name: o,
                            type: 'bar',
                            data: res.data.map((oo, ii) => {
                                if (dataname) {
                                    return res.data[ii][dataname];
                                } else {
                                    return 0;
                                }
                            }),
                            // stack: 'num',
                            barWidth: 30,
                        }
                    })
                    this.moreBar.isMoreBar = true;
                })
            },
            tab() {
                this.moreBar.isBar = !this.moreBar.isBar;
            },
            // 点击图标进入
            iconClick(v) {
                this.getIcon(v);
            },
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
                            areaids:  this.radio,
                            orgRootId: v.orgRootId
                        }
                    },
                    {
                        url_icon: 'organizationViewList',
                        url_data: 'barThrid',
                        params: {
                            areaids: v.areaid || this.radio,
                            orgRootId: v.orgRootId
                        }
                    }
                ][newcengji];
                if (apiInfo) {
                    this.$api.ITBasic[apiInfo.url_icon](apiInfo.params).then(res => {
                        res.data.forEach((v, i) => {
                            v.img = SERVER_BASE_URL + v.img;
                        });
                        this.deptList = data['data' + newcengji] = res.data;
                        this.cengji = newcengji;
                        if (newcengji !== 0) {
                            this.mapQuery.orgRootId = this.mapQueryObj['mapQuery' + newcengji].orgRootId = v.orgRootId || ''
                            this.mapQuery.name =this.mapQueryObj['mapQuery' + newcengji].name = '【' + v.orgSpecies + '】';
                            this.mapQuery.areaids =this.mapQueryObj['mapQuery' + newcengji].areaids =  apiInfo.params.areaids;
                        }
                    });
                    this.$api.warning[apiInfo.url_data](apiInfo.params).then(res => {
                        dataList['data' + newcengji] = res;
                        this.getMoreBar(res);
                    })
                    this.getEarlyWarning(apiInfo.params);
                    this.getCompleteness(apiInfo.params);
                } else {
                    this.$store.commit('get_deptInfo', v);
                    /* icon 部门的最后一层跳往详情页 */
                    this.$router.push({
                        name: "warningDeptDetali",
                        query: {
                            sysOrgCode: v.sysOrgCode,
                            type:2,
                            radioBtn:this.radio,
                            isCityState:this.$route.name=='warningCityState'?true:false,
                            mapQuery: JSON.stringify(this.mapQuery)
                        }
                    });
                }
            },
            goMore() {
                if(window.sysOrgCode && window.sysOrgCode.length === 1)return;
                this.$router.push({
                    name: 'assetAnalysis',
                    query: {
                        type: 2,
                        radioBtn: this.radio,
                        isCityState:this.$route.name=='warningCityState'?true:false,
                        mapQuery: JSON.stringify(this.mapQuery)

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
    .warningDepartment {
        .warningDepartment-cont {
            @extend %TitleBorder;
            border-top: 0;
            height: 616px;
             .warningDepartment-cont-inner {
                @extend %TitleBorder;
                height: 562px;
                margin: 26px 0px 26px 54px;
                padding: 36px 18px 26px 20px;
                // cursor: pointer;
                &:hover{
                @include box-shadow($bs:#1a5182);
                }
                .warningDepartment-cont-inner-top {
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
                .warningDepartment-cont-inner-bottom {
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
                    margin-top: 50px;
                    p {
                        line-height: 28px;
                        @include font($fz: 14px, $color:rgba(255, 255, 255, 0.5));
                    }
                }
            }
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
                padding-left: 10px;
                li {
                    width: 100px!important;
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
    }
</style>
