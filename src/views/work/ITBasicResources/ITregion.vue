// IT 全省地区
<template>
    <div class="ITregion" v-breadcrumb="breadcrumb">
        <div class="titleBar">
            <Title :title='titleName+"IT基础资源情况"'></Title>
        </div>
        <Row class="ITregion-1">
            <i-col class="ITregion-left" span='10'>
                <div class="left-bottom">
                    <p class="titleLeftBorder">自有机房情况</p>
                    <div class="left-bottom-cont " @click="goPcRoom" :style='{"cursor":isCursor}'>
                        <Row class='circle-bottom '>
                            <i-col span="12" v-for="(v, index) in dataset" :key="index" >
                                <dl class="borderColor" v-if='index<4' :style='{borderColor:"#32beff"}'>
                                    <dt><strong>{{v.value}}</strong></dt>
                                    <dd>{{v.name}}{{v.unit}}</dd>
                                </dl>
                            </i-col>
                        </Row>
                    </div>
                </div>
                <div class="left-top">
                    <p class="titleLeftBorder">云资源情况</p>
                    <div class="left-top-cont" @click="goResources" :style='{"cursor":isCursor}'>
                        <Row class="">
                            <i-col span="12" v-for="(v, index) in dataset" :key="index" >
                                <dl class="borderColor" v-if='index>=4' :style='{borderColor:"#e8cb39"}'>
                                    <dt><strong>{{v.value}}</strong></dt>
                                    <dd>{{v.name}}{{v.unit}}</dd>
                                </dl>
                            </i-col>
                        </Row>
                    </div>
                </div>
            </i-col>
            <i-col class="ITregion-right" span='14'>
                <div class="right-cont">
                    <Map :jsonCode="jsonCode" :width="width" :height="height" :strip="strip" @mapClick="handelClick"></Map>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import Title from '@/components/title/index';
    import Map from "@/components/charts/map";
    import Datashow from "@/components/datashow";
import { constructionConditionMapSencodePage } from '../../../server/getData';
    export default {
        name: 'ITregion',
        data() {
            let radioIndex = ['ITBasicResources', 'ITcityState'].indexOf(this.$route.name);
            let parent = [{
                    name: '全省总体分析',
                    url: '/home/index/ITBasicResources'
                },
                {
                    name: '市州部门分析',
                    url: '/home/index/ITcityState'
                }
            ][radioIndex];
            return {
                radioBtn: [0, -1][radioIndex],
                breadcrumb: [{
                        icon: 'dingwei',
                        name: 'IT基础资源分析'
                    },
                    parent,
                ],
                titleName: ['全省总体', '市州部门'][radioIndex],
                allCity: ['全省', '市州'][radioIndex],
                jsonCode: "guizhou",
                width: 618,
                height: 616,
                strip: true,
                dataset: [{
                        name: "机房投入费用",
                        value: Math.ceil(Math.random() * 100000),
                        unit: "(万元)",
                        icon: require("@/assets/img/icon/icon_money_zi.png"),
                        numColor: ["#694dff", "#b783ff"],
                        url: {
                            name: "pcRoom"
                        }
                    },
                    {
                        name: "硬件设备数量",
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
                        icon: require("@/assets/img/icon/icon_money_zi.png"),
                        numColor: ["#694dff", "#b783ff"],
                        url: {
                            name: "resources"
                        }
                    },
                ],
                isCursor:'pointer',
                mapQuery:{
                    areaids:'',
                    name:'',
                    orgRootId:''
                }, // 地图信息
            }
        },
        components: {
            Title,
            Map,
            Datashow,
        },
        mounted() {
            this.setTypeName(this.allCity);
            this.getPcroomData({areaids:this.radioBtn});
        },
        methods: {
            /* 左侧数据标题  地图位置 */
            setTypeName(beginname) {
                this.dataset[0].name = beginname + "机房投入费用";
                this.dataset[1].name = beginname + "机房硬件设备数量";
                this.dataset[2].name = beginname + "机房总数量";
                this.dataset[3].name = beginname + "机房总面积";
            },
            getPcroomData(params = {}) {
                let arr = ['ITPcroomDataArea', 'ITPcroomDataSize']
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
                this.mapQuery.areaids = e.id;
                 this.mapQuery.name = e.name;
                this.setTypeName(this.allCity);
                this.getPcroomData({
                    areaids: [e.id]
                });
                this.mapLoading = false;
                // if(this.allCity !='全省'&&this.allCity !='市州') {
                //     this.isCursor = 'default'
                // } else{
                //     this.isCursor = 'pointer'
                // }
            },
            // 进入各部门机房面积分析
            goPcRoom() {
                if((this.allCity =='全省')||(this.allCity =='市州')){
                     this.mapQuery={areaids:'',name:'',orgRootId:''}
                 } 
                /* 仓真真 */
                this.$router.push({
                    name: 'pcRoom',
                    query: {
                        type: 1,
                        radioBtn: this.radioBtn,
                        isCityState:this.$route.name == 'ITcityState'?true:false,
                        mapQuery:JSON.stringify(this.mapQuery)
                    }
                })
            },
            goResources() {
                 if((this.allCity =='全省')||(this.allCity =='市州')){
                     this.mapQuery={areaids:'',name:'',orgRootId:''}
                 }
                this.$router.push({
                    name: 'resources',
                    query: {
                        type: 1,
                        radioBtn: this.radioBtn,
                        isCityState:this.$route.name == 'ITcityState'?true:false,
                        mapQuery:JSON.stringify(this.mapQuery)
                    }
                })
            }
        },
        created() {
            // this.$store.commit('breadcrumb', this.breadcrumb);
        }
    }
</script>

<style lang='scss' scoped>
    @import '@/assets/style/base/index.scss';
    .ITregion {
        height: 666px;
        .ITregion-1 {
            @extend %TitleBorder;
            border-top: 0;
            height: 616px;
        }
        .ITregion-left {
            // display: inline-block;
            padding: 23px 0 0 53px;
            .left-top {
                margin-top: 15px;
                .left-top-cont {
                     height: 245px;
                    @extend %TitleBorder;
                    padding: 23px 37px;
                    margin-top: 14px;
                    // cursor: pointer;
                    &:hover{
                    @include box-shadow($bs:#1a5182);
                }
                }
            }
            .left-bottom {
                .left-bottom-cont {
                    height: 245px;
                    @extend %TitleBorder;
                    padding: 23px 37px;
                    margin-top: 14px;
                    // cursor: pointer;
                    &:hover{
                    @include box-shadow($bs:#1a5182);
                }
                }
            }
        }
        .ITregion-right {
            .right-cont {
                height: 616px;
                padding: 0 10px;
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
</style>
