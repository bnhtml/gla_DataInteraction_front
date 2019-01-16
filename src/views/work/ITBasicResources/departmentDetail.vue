<template>
  <div v-breadcrumb="breadcrumb">
        <div class="cardHeight height210">
          <div class='titleBar'>
              <Title :title='$store.state.deptInfo.orgSpecies+" - IT基础资源总体分析"'></Title>
              <span class="right" @click="openNew">资产族谱</span>
          </div>
            <Row class="departmentDetail-top-cont">
                <i-col span="4" v-for='(v,i) in cardBlue' :key='i'>
                    <CardColor :title='v.title' :borderColor='v.borderColor' :bg='v.bg'>
                      <dd class="dd-num">
                        <p style='text-align:left;color:white;'> <b>{{v.num}}</b>{{v.type}} </p>                                   
                      </dd>
                  </CardColor>
               
                </i-col>
            </Row>
        </div>
        <!-- <div class="cardHeight"  :gutter="16" v-if="itjichushiyong">
            <dl>
              <div class='titleBar'>
                  <Title :title='$store.state.deptInfo.orgSpecies+" - IT基础资源使用情况"'></Title>
                  <span class="right-more" @click="goMore(0)">明细<i class="iconfont icon-shuangjiantou"></i></span>
              </div>
                <dd>
                    <Row class="rowStyle">
                        <i-col span="8">
                            <div class="bumenNumber">
                              <dl>
                                  <dt><span><strong>{{barDataLeft.sum||0}}</strong>核</span><span>剩余CPU资源</span></dt>
                                  <dd><img src="../../../assets/img/icon/chart_1.png" alt=""></dd>
                                  <dd>
                                    <legendItem :legendData='legendLeft.data' :bg='legendLeft.color' :className='"longitudinal"'></legendItem>
                                  </dd>
                              </dl>
                            </div>
                            <div class="barChartBox">
                              <newBar :bar="barDataLeft" :series="barDataLeft.series"></newBar>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="bumenNumber">
                                <dl>
                                  <dt><span><strong>{{barDataCentent.sum||0}}</strong>T</span><span>可用硬盘资源</span></dt>
                                  <dd><img src="../../../assets/img/icon/chart_1.png" alt=""></dd>
                              </dl>
                            </div>
                            <div class="barChartBox">
                                <newBar :bar="barDataCentent" :series="barDataCentent.series"></newBar>
                            </div>
                        </i-col>
                        <i-col span="8">
                            <div class="bumenNumber">
                                <dl>
                                  <dt><span><strong>{{barDataRight.sum||0}}</strong>GB</span><span>可用内存资源</span></dt>
                                  <dd><img src="../../../assets/img/icon/chart_1.png" alt=""></dd>
                              </dl>
                            </div>
                            <div class="barChartBox">
                                <newBar :bar="barDataRight" :series="barDataRight.series"></newBar>
                            </div>
                        </i-col>
                    </Row>
                </dd>
            </dl>
        </div> -->
        <Row  :gutter="16">
            <i-col span="12">
                <div class="cardHeight height490 mt20">
                    <div>
                        <dl>
                          <div class='titleBar'>
                              <Title :title='title1'></Title>
                              <span class="right-more" @click="goMore(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                          </div>
                            <dd>
                                <p>
                                    <!-- <RadioGroup v-model="roomRadio" type="button" @on-change='changeRoom'>
                                        <Radio :label="o" v-for="o in radios" :key="o"></Radio>
                                    </RadioGroup> -->
                                </p>
                                <Row class='ring-wrapper mt40'>
                                    <i-col span='12'>
                                        <ring v-if='capitalSource.isShow' :data='capitalSource.data' :labelColor='capitalSource.labelColor' :color='capitalSource.color' :title='capitalSource.title' :hasLabel='capitalSource.hasLabel'></ring>
                                    </i-col>
                                    <i-col span='12'>
                                      <div class="legendItemWrapper"><legendItem v-if="capitalSource.isShow" :legendData='capitalSource.data' :bg='capitalSource.color' :className='"longitudinal"'></legendItem></div>
                                    </i-col>
                                </Row>
                            </dd>
                        </dl>
                    </div>
                </div>
            </i-col>
            <i-col span="12">
                <div class="cardHeight height490 mt20">
                    <div>
                        <dl>
                          <div class='titleBar'>
                              <Title :title='title2'></Title>
                              <span class="right-more" @click="goMore(2)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                          </div>
                            <dd>
                                <Row class='ring-wrapper' >
                                  <i-col span='12' style="margin-top:30px;">
                                    <ring v-if='HardwareNumber.isShow' :data='HardwareNumber.data' :labelColor='HardwareNumber.labelColor' :color='HardwareNumber.color' :title='HardwareNumber.title' :hasLabel='HardwareNumber.hasLabel'></ring>
                                  </i-col>
                                  <i-col span='12' style="margin-top:30px;">
                                    <legendItem :legendData='HardwareNumber.data' :bg='HardwareNumber.color' :className='"longitudinal"'></legendItem>
                                  </i-col>
                                </Row>
                            </dd>
                        </dl>
                    </div>
                    <Spin size="large" fix v-if="!HardwareNumber.isShow">
                      <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                    </Spin>
                </div>
            </i-col>
        </Row>
        <!-- <Row style="margin-top: 15px" :gutter="16" v-if="lixiangPie">
            <i-col span="12">
                <div class="cardHeight">
                    <div>
                        <dl>
                          <div class='titleBar'>
                              <Title :title='$store.state.deptInfo.orgSpecies+"服务器资源立项依据分析"'></Title>
                              <span class="right-more" @click="goMore(3)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                          </div>
                            <dd>
                                <Row class='ring-wrapper mt30'>
                                    <i-col span='12'>
                                        <ring v-if='setPro.isShow' :data='setPro.data' :labelColor='setPro.labelColor' :color='setPro.color' :title='setPro.title' :hasLabel='setPro.hasLabel'></ring>
                                    </i-col>
                                    <i-col span='12'>
                                      <div class="legendItemWrapper"><legendItem v-if='setPro.isShow' :legendData='setPro.data' :bg='setPro.color'></legendItem></div>
                                    </i-col>
                                </Row>
                            </dd>
                        </dl>
                    </div>
                </div>
            </i-col>
            <i-col span="12">
                <div class="cardHeight">
                    <div>
                        <dl>
                          <div class='titleBar'>
                              <Title :title='$store.state.deptInfo.orgSpecies+"服务器资源建设资金来源分析"'></Title>
                              <span class="right-more" @click="goMore(4)">明细<i class="iconfont icon-shuangjiantou"></i></span>
                          </div>
                            <dd>
                                <Row class='ring-wrapper mt40'>
                                    <i-col span='12'>
                                        <ring v-if='zijinlaiyuan.isShow' :data='zijinlaiyuan.data' :labelColor='zijinlaiyuan.labelColor' :color='zijinlaiyuan.color' :title='zijinlaiyuan.title' :hasLabel='zijinlaiyuan.hasLabel'></ring>
                                    </i-col>
                                    <i-col span='12'>
                                      <div class="legendItemWrapper"><legendItem v-if='zijinlaiyuan.isShow' :legendData='zijinlaiyuan.data' :bg='zijinlaiyuan.color'></legendItem></div>
                                    </i-col>
                                </Row>
                            </dd>
                        </dl>
                    </div>
                </div>
            </i-col>
        </Row> -->
    </div>
</template>

<script type="text/javascript">
import echarts from "echarts";
import Title from '@/components/title/index';
import bar from "@/components/charts/bar/doubelColorBar";
import lineChart from "@/components/charts/line/line";
import paiming from "@/components/ranking";
import ring from "@/components/charts/ring/ring.vue";
import legendItem from "@/components/charts/ring/legendItem.vue";
// import cardBlue from "@/components/cardBlue/cardBlue.vue";
 import CardColor from '@/components/gla-ui/CardColor.vue';
import newBar from "@/components/charts/bar/newBar.vue";
const radios = ["全部费用", "建设费用", "运维费用"];
const radios2 = ["所有资源", "CPU资源", "硬盘资源", "内存资源"];
let names = ["已使用资源", "未使用资源"];
let names1 = ["未使用资源数量", "已使用资源数量"];
let names2 = ["未使用内存资源", "已使用内存资源"];
let names3 = ["未使用存储资源数量", "已使用储资资源数量"];

const colors = [
  ["#269094", "#2ba9ac"],
  ["#2b54a0", "#2e6ac6"],
  ["#5a4bb1", "#786acc"]
].map((o, i) => {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: o[0]
    },
    {
      offset: 1,
      color: o[1]
    }
  ]);
});

const hoverColors = [
    ["#269094", "#2ba9ac"],
    ["#2b54a0", "#2e6ac6"],
    ["#5a4bb1", "#786acc"]
 ].map((o, i) => {
   return
    {
    emphasis: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
           {
              offset: 0,
              color: o[0]
            },
            {
              offset: 1,
              color:o[1]
            }
      ])
    }
   }
});
let colorLineArr = [
  { 
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: "#83bff6"
      },
      {
        offset:0.5,
        color:"#188df0"
      },
      {
        offset: 1,
        color: "#188df0"
      }
    ])
  },
  {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: "#2378f7"
      },
       {
        offset: 0.7,
        color: "#2378f7"
      },
      {
        offset: 1,
        color: "#83bff6"
      }
    ])
  },
];
let series = {
  type: "bar",
  data: names.map((o, i) => {
    return {
      name: o,
      value: 0,
      itemStyle: { color: colors[i] }
    };
  }), // y轴数据
  barCategoryGap: 25,
  barWidth: "10%",
  colorStyle: {
    normal: [0, "#83bff6", 0.5, "#188df0", 1, "#188df0"],
    emphasis: [0, "#2378f7", 0.7, "#2378f7", 1, "#83bff6"]
  },
  emphasis: {
    label: {
      show: true
    },
    itemStyle: {
      color: "#06c5ea",
      borderColor: "#06c5ea",
      borderWidth: 1
    }
  }
};
let successLength = 0;
let namesTop = ["CPU资源", "硬盘资源", "内存资源"];
export default {
  data() {
    let {query, params, name, fullPath} = this.$route;
    let titleName = this.$store.state.deptInfo.orgSpecies;
    let typeThree = (query.isCityState == 'true')||(query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
      let parent = [{
          name: '全省总体分析',
          url: '/home/index/ITBasicResources'
        },
        {
          name: '省直部门分析',
          url: '/home/index/ITdepartment'
        }, {
          name: '市州部门分析',
          url: '/home/index/ITcityState'
        }
      ][typeThree];
      let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
    return {
      breadcrumb: [
          {
              icon: 'dingwei',
              name: 'IT基础资源分析'
          },
          parent,
          {
            name: titleName,
            url: fullPath
          }
      ],
      lixiangPie:false,
      itjichushiyong:false,
      HardwareNumber:{
            data: [
              {
                value: 10,
                name: "服务器",
                number: 10+"个",
                type:1
              },
              {
                value: 10,
                name: "专用设备",
                number: 10+"个",
                type:2
              },
              {
                value: 10,
                name: "ECS",
                number: 10+"个",
                type:3
              },
              {
                value: 10,
                name: "UPS",
                number: 10+"个",
                type:4
              },
              {
                value: 10,
                name: "其他",
                number: 10+"个",
                type:5
              },
              {
                value: 10,
                name: "机柜",
                number: 10+"个",
                type:6
              },
              {
                value: 10,
                name: "空调",
                number: 10+"个",
                type:7
              },
              {
                value: 10,
                name: "安全设备",
                number: 10+"个",
                type:8
              },
              {
                value: 10,
                name: "网络设备",
                number: 10+"个",
                type:9  
              },
              {
                value: 10,
                name: "路由器",
                number: 10+"个",
                type:10 
              },
              {
                value: 10,
                name: "交换机",
                number: 10+"个",
                type:11  
              },
              {
                value: 10,
                name: "未反馈",
                number: 10+"个",
                type:12  
              }
            ],
            labelColor: [
              "#d56c59",
              "transparent",
               "#d56c59",
              "transparent",
               "#d56c59",
              "transparent",
               "#d56c59",
              "transparent",
               "#d56c59",
              "transparent",
            ],
            color: [
              "linear-gradient(0deg,#ca5d55 0%,#d56c59 100%)", 
              "linear-gradient(0deg,#269094 0%,#2ba9ac 100%)",
              "linear-gradient(0deg,#10c4ff 0%,#3259ff 100%)", 
              "linear-gradient(0deg,#e8cb39 0%,#feba70 100%)", 
              "linear-gradient(0deg,#14cede 0%,#30ffda 100%)", 
              "linear-gradient(0deg,#694dff 0%,#b783ff 100%)", 
              "linear-gradient(0deg,#10c4ff 0%,#3259ff 100%)", 
              "linear-gradient(0deg,#e8cb39 0%,#feba70 100%)"
             ],
            hasLabel: false,
            isShow: false,
            // title: {
            //   title,
            //   num
            // }
          },
      alldata: [0, 0, 0],
      query,
      radios,
      roomRadio: "全部费用",
      radios2,
      setProRadio: 0,
      moneyRadio: 0,
      isBar: true,
      xData: namesTop,

      // 剩余可用资源信息配置
      barData:{
       height:360,
       xData:namesTop,
       labelnames:['CPU资源数量','硬盘资源数量','内存资源数量'],
       colorArr:hoverColors
      },
      barDataSeries:[],
     //IT基础资源使用情况 
      legendLeft:{
        data:[],
        color:[],
      },
      barDataLeft: {
        height:360,
        xData:names,
        series,
        labelnames:[''],
        colorArr:hoverColors
      },
      legendCentent:{
        data:[],
        color:[],
      },
      barDataCentent: {
        height:360,
        xData:names,
        series,
        labelnames:[''],
        colorArr:hoverColors
      },
      legendRight:{
        data:[],
        color:[],
      },
      barDataRight: {
        height:360,
        xData:names,
        series,
        labelnames:[''],
        colorArr:hoverColors
      },
    
    
      radio: "",
      // 机房投入资金分析信息配置
      capitalSource: {
        data: [
          {
            value: Math.ceil(Math.random() * 20),
            name: "机柜",
            number: 1300
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "空调",
            number: 700
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "安全设备",
            number: 600
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "UPS",
            number: 600
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "专用设备",
            number: 3400
          }
        ],
        labelColor: [
          "#FF644F",
          "transparent",
          "#ced866",
          "transparent",
          "#3FC2BD",
          "transparent",
          "#4082da",
          "transparent",
          "#9c8ae7",
          "transparent"
        ],
        color: ["#FF644F", "#ced866", "#3FC2BD", "#4082da", "#9c8ae7"],
        hasLabel: false,
        isShow: false,
        title: {}
      },
      // 服务器资源立项依据分析
      setPro: {
        data: [
          {
            value:Math.ceil(Math.random() * 20),
            name:'拟建',
            number:120
          },
          {
            value:Math.ceil(Math.random() * 20),
            name:'在建',
            number:10
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "已建",
            number: 600
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "国家派发",
            number: 1300
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "省级派发",
            number: 700
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "上级派发",
            number: 600
          }
        ],
        labelColor: [
          "#FF644F",
          "transparent",
          "#ced866",
          "transparent",
          "#3FC2BD",
          "transparent",
          "#4082da",
          "transparent",
          "#5AC426",
          "transparent",
          "#9c8ae7",
          "transparent",
          "#CF9D41",
          "transparent",
        ],
        color: ["#FF644F", "#ced866", "#3FC2BD", "#4082da", "#5AC426", '#9c8ae7', '#CF9D41'],
        hasLabel: false,
        isShow: false,
        title: {}
      },
      
      
      // 资源建设资金来源分析信息配置
      zijinlaiyuan: {
        data: [
          {
            value: Math.ceil(Math.random() * 20),
            name: "财政拨款",
            number: 1300
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "自筹",
            number: 700
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "BT项目",
            number: 600
          },
          {
            value: Math.ceil(Math.random() * 20),
            name: "其他",
            number: 600
          },
          // {
          //   value: Math.ceil(Math.random() * 20),
          //   name: "未反馈",
          //   number: 3400
          // }
        ],
        labelColor: [
          "#FF644F",
          "transparent",
          "#ced866",
          "transparent",
          "#3FC2BD",
          "transparent",
          "#4082da",
          "transparent",
          "#9c8ae7",
          "transparent"
        ],
        color: ["#FF644F", "#ced866", "#3FC2BD", "#4082da", "#9c8ae7"],
        hasLabel: false,
        isShow: false,
        title: {}
      },
      paimingList: [
        {
          city: "贵阳市",
          value: "334"
        },
        {
          city: "贵阳市",
          value: "334"
        },
        {
          city: "贵阳市",
          value: "334"
        },
        {
          city: "贵阳市",
          value: "334"
        },
        {
          city: "贵阳市",
          value: "334"
        },
        {
          city: "贵阳市",
          value: "334"
        },
        {
          city: "贵阳市",
          value: "334"
        },
        {
          city: "贵阳市",
          value: "334"
        }
      ],
      // series: [],
      line: {
        isShowSymbol: false,
        legendData: ["建设", "运维"],
        xAxisData: [
          2007,
          2008,
          2009,
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018
        ],
        color: ["#5AC426", "#D95450"],
        series: [
          {
            name: "建设",
            type: "line",
            stack: 0,
            showSymbol: false,
            data: [35, 42, 37, 34, 43, 76, 58, 67, 56, 57, 76, 56],
            color: "#5AC426",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3
                }
              }
            }
          },
          {
            name: "运维",
            type: "line",
            stack: 1,
            showSymbol: false,
            data: [45, 56, 58, 49, 58, 56, 68, 45, 34, 67, 69, 89],
            color: "#D95450",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3
                }
              }
            }
          }
        ],
        operationCost: {
          list: [45, 56, 58, 49, 58, 56, 68, 45, 34, 67, 69, 89],
          sum: 694
        },
        constructionCost: {
          list: [35, 42, 37, 34, 43, 76, 58, 67, 56, 57, 76, 56],
          sum: 637
        },
        width: 500,
        height: 250
      },
      cardBlue: [
        {
          title: "CPU资源数量",
          num: "0",
          type: "核",
          borderColor:"#1aa4ff",
          bg: ["rgba(43,84,160,0.5)", "rgba(46,106,198,0.5)"]
        },
        {
          title: "硬盘资源数量",
          num: "0",
          type: "T",
          borderColor:"#1aa4ff",
          bg: ["rgba(43,84,160,0.5)", "rgba(46,106,198,0.5)"]
        },
        {
          title: "内存资源数量",
          num: "0",
          type: "GB",
          borderColor: "#1aa4ff",
          bg: ["rgba(43,84,160,0.5)", "rgba(46,106,198,0.5)"]
        },
        {
          title: "机房总面积",
          num: "0",
          type: "M²",
          borderColor: " #00ffe7",
          bg: ["rgba(21,106,109,0.5)", "rgba(43,169,172,0.5)"]
        },
        {
          title: "机房数量",
          num: "0",
          type: "个",
          borderColor: "#00ffe7",
          bg: ["rgba(21,106,109,0.5)", "rgba(43,169,172,0.5)"]
        },
        {
          title: "机房建设资金",
          num: "0",
          type: "万元",
          borderColor: "#00ffe7",
          bg: ["rgba(21,106,109,0.5)", "rgba(43,169,172,0.5)"]
        }
      ]
    };
  },
  components: {
    bar,
    paiming,
    ring,
    legendItem,
    lineChart,
    CardColor,
    // cardBlue,
    newBar,
    Title
  },
  computed:{
    title2(){
        return this.$store.state.deptInfo.orgSpecies+"机房硬件设备数量"
    },
     title1(){
        return this.$store.state.deptInfo.orgSpecies+"机房投入资金分析"
    },
  },
  mounted() {
    // this.getCapitalSource(this.capitalSource, this.roomRadio + "1");
    this.getStateNum()
    this.getJifangtouru();
    // this.getCapitalSource(this.setPro, this.setProRadio + "2");
    // this.getCapitalSource(this.zijinlaiyuan, this.moneyRadio + "3");
    // this.getLineData();
    this.roomHardCount();
    // this.getStackBar(this.barDataLeft, 0);
    // this.getStackBar(this.barDataCentent, 1);
    // this.getStackBar(this.barDataRight, 2);
  },
  methods: {
    getStateNum(){
      let urls = ['ITPcroomDataArea', 'ITPcroomDataSize'];
      urls.forEach(o => {
        this.$api.ITBasic[o](this.query).then(res => {
          let idxs = [
            'cpu',
            'rom',
            'ram',
            'jfSize',
            'allroomCount',
            'rjzTrje'
          ];
          Object.keys(res.data).forEach(o => {
            let idx = idxs.indexOf(o);
            if(idx > -1){
              let oldObjg = this.cardBlue[idx];
              let num = res.data[o];
              this.cardBlue.splice(idx, 1, Object.assign({}, oldObjg, {num}));
            }
          })
          
        })
      })
    },
    changeRoom(label) {
      let idx = this.radios.indexOf(this.roomRadio);
      this.capitalSource.isShow = false;
      let param = idx < 1 ? {} : { type: idx };
      this.getJifangtouru(param);
    },

    getStackBar(e, idx) {
      let querys = [{ type: 1 }, { type: 3 }, { type: 2 }];
      // e.legendData = ["已使用资源", "未使用资源", ''];
      let types = ["bar", "bar"];
      let dataname = ["bukeyong", "keyong"];
      this.$api.ITBasic.ziyuanshiyongBybumen({
        ...this.query,
        ...querys[idx]
      }).then(res => {
        successLength++;
        let all = res.data[0]["keyong"] + res.data[0]["bukeyong"] || 1;
        this.alldata[idx] = res.data[0]["keyong"] / all;
        if (successLength === 3) {
          successLength = 0;
          this.barData.series = this.barData.labelnames.map((o, i) => {
            return{
             name:o,
             type:'bar',
             data: namesTop.map((oo, ii) => {
                return {
                  name: oo,
                  value: this.alldata[ii] * 100,
                  itemStyle: { color: colors[ii] }
                };
              }),
              barCategoryGap: 25,
              barWidth: "10%",
              colorStyle: {
                normal: [0, "#83bff6", 0.5, "#188df0", 1, "#188df0"],
                emphasis: [0, "#2378f7", 0.7, "#2378f7", 1, "#83bff6"]
              },
              emphasis: {
                label: {
                  show: true
                },
              }
            }
          })
        }
        // 使用情况 分三个请求 
        e.sum = res.allCount.keyong;
        e.series = e.labelnames.map((o, i) => {
           return {
            //  name:o,
             type:'bar',
             data:names.map((oo, ii) => {
               return {
                 name:oo,
                 value: res.data[0][dataname[ii]],
                 itemStyle: { color: colors[ii] }
               }
             }),
             barCategoryGap: 25,
             barWidth:'10%',
             emphasis: {
                label: {
                  show: true
                },
                // itemStyle: {
                //   color: "#06c5ea",
                //   borderColor: "#06c5ea",
                //   borderWidth: 1
                // },
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset:0,
                //     color:"#2378f7"
                //   },
                //   {
                //     offset: 0.7,
                //     color: "#2378f7"
                //   },
                //   {
                //     offset: 1, 
                //     color: "#83bff6"
                //   }
                // ])
             }
           }
        }) 
      });
      return;
    },
    // 获取机房投入资金分析数据
    getJifangtouru() {
      // this.capitalSource = {};
      let params={
        areaids:this.$route.query.areaids || '',
        sysOrgCode:this.$route.query.sysOrgCode
      }
      this.$api.ITBasic.jifangtouru(params).then(res => {
         let num = res.size;
        let title = '投入金额(万元)';
        let data = res;
        this.capitalSource = {
          data: [
            {
              value: data.jgTrjePercentage,
              name: "机柜",
              number: data.jgTrje + '万元'
            },
            {
              value: data.ktTrjePercentage,
              name: "空调",
              number: data.ktTrje + '万元'
            },
            {
              value: data.aqsbTrjePercentage,
              name: "安全设备",
              number: data.aqsbTrje + '万元'
            },
            {
              value: data.ccsbTrjePercentage,
              name: "存储设备",
              number: data.ccsbTrje + '万元'
            },
            {
              value: data.fwqTrjePercentage,
              name: "服务器",
              number: data.fwqTrje + '万元'
            },
            {
              value: data.uspTrjePercentage,
              name: "UPS",
              number: data.uspTrje + '万元'
            },
            {
              value: data.wlsbTrjePercentage,
              name: "网络设备",
              number: data.wlsbTrje + '万元'
            },
            {
              value: data.zysbTrjePercentage,
              name: "专用设备",
              number: data.zysbTrje + '万元'
            }
          ],
          labelColor: [
            "#FF644F",
            "transparent",
            "#ced866",
            "transparent",
            "#3FC2BD",
            "transparent",
            "#4082da",
            "transparent",
            "#5AC426",
            "transparent",
            "#9c8ae7",
            "transparent",
            "#CF9D41",
            "transparent",
            "#19be6b",
            "transparent",
          ],
          color: ["#FF644F", "#ced866", "#3FC2BD", "#4082da", "#5AC426", "#9c8ae7", "#CF9D41", "#19be6b"],
          hasLabel: false,
          isShow: true,
          title: {
            title,
            num
          }
        };
      });
    },
    /* 资金来源分析 ，立项依据分析*/
    getCapitalSource(e, name, param) {
      e.isShow = false;
      let aboutObj = {
        // "1": {
        //   url: "jifangtouru"
        // },
        "3": {
          url: "zijinlaiyuanfenixi"
        },
        "2": {
          url: "lixiangyijufenxi"
        }
      }[name.split("").pop()];
      this.$api.ITBasic[aboutObj.url]({ ...this.query, ...param }).then(res => {
        e.data = this.getOrder(res.data);
        e.isShow = true;
        e.title = {
          title: res.allCount.name+'(万元)',
          num: res.allCount.size.toString()
        };
      });
    },
    /* 未反馈排序 */
    getOrder(data) {
      data.forEach((v, i) => {
        if (v.name == '未反馈') {
          data.push(v)
          this.$nextTick(()=>{
            data.slice(1)
          })
        }
      })
      return data.slice(1)
    },
    //机房硬件设备数量
    roomHardCount(){
      let params={
        areaids:this.$route.query.areaids || '',
        orgRootId:'',
        sysOrgCode:this.$route.query.sysOrgCode
      }
      this.$api.roomHardCount(params).then(res=>{
        let roomData=res;
        let num = res.yjCount;
        let title = '硬件数量';
        this.HardwareNumber={
            data: [
              {
                value: roomData.jfPercent,
                name: "机柜",
                number: roomData.jfCount+"个",
                type:6
              },
              {
                value: roomData.ktPercent,
                name: "空调",
                number: roomData.ktCount+"个",
                type:7
              },
              {
                value: roomData.aqSbPercent,
                name: "安全设备",
                number: roomData.aqSbcount+"个",
                type:8
              },
              {
                value: roomData.ccSbPercent,
                name: "存储设备",
                number: roomData.ccSbcount+"个",
                type:12  
              },
              {
                value: roomData.fwqPercent,
                name: "服务器",
                number: res.fwqCount+"个",
                type:1
              },
              {
                value: roomData.upsPercent,
                name: "UPS",
                number: roomData.upsCount+"个",
                type:4
              },
              {
                value: roomData.wlSbPercent,
                name: "网络设备",
                number: roomData.wlSbcount+"个",
                type:9  
              },
              {
                value: roomData.zySbPercent,
                name: "专用设备",
                number: roomData.zySbcount+"个",
                type:2
              },
            ],
          labelColor: [
            "#FF644F",
            "transparent",
            "#ced866",
            "transparent",
            "#3FC2BD",
            "transparent",
            "#4082da",
            "transparent",
            "#5AC426",
            "transparent",
            "#9c8ae7",
            "transparent",
            "#CF9D41",
            "transparent",
            "#19be6b",
            "transparent",
          ],
          color: [
            "#FF644F",
            "#ced866",
            "#3FC2BD",
            "#4082da",
            "#5AC426",
            "#9c8ae7",
            "#CF9D41",
            "#19be6b",
            // "linear-gradient(0deg,#ca5d55 0%,#d56c59 100%)", 
            // "linear-gradient(0deg,#269094 0%,#2ba9ac 100%)",
            // "linear-gradient(0deg,#10c4ff 0%,#3259ff 100%)", 
            // "linear-gradient(0deg,#e8cb39 0%,#feba70 100%)", 
            // "linear-gradient(0deg,#14cede 0%,#30ffda 100%)", 
            // "linear-gradient(0deg,#694dff 0%,#b783ff 100%)", 
            // "linear-gradient(0deg,#10c4ff 0%,#3259ff 100%)", 
            // "linear-gradient(0deg,#e8cb39 0%,#feba70 100%)"
            ],
          hasLabel: false,
          isShow: true,
          title: {
            title,
            num
          }
        }
      })
    },
    getLineData() {
      this.$api.ITBasic.jianshezijin(this.query).then(res => {
        this.line.isShow = true;
        this.line.xAxisData = [];
        let constructionCost = {
          list: [],
          sum: 0
        }; // 建设
        let operationCost = {
          list: [],
          sum: 0
        }; // 运维
        res.data.forEach((v, i) => {
          this.line.xAxisData.push(v.year);
          constructionCost.list.push(v.constructionCost);
          operationCost.list.push(v.operationCost);
          constructionCost.sum += v.constructionCost;
          operationCost.sum += Number(v.operationCost);
        });
        this.line.legendData = ["建设", "运维"];
        this.line.constructionCost = constructionCost;
        this.line.operationCost = operationCost;
        let data = [constructionCost.list, operationCost.list];
        let type = ["line", "line"];
        data = data.map((o, i) => {
          return {
            name: this.line.legendData[i],
            type: type[i],
            stack: i,
            showSymbol: this.line.isShowSymbol,
            data: o,
            color: this.line.color[i],
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3
                }
              }
            }
          };
        });
        this.line.series = [...data];
      });
    },
    changeSetPro(idx) {
      this.setPro.isShow = false;
      let param = idx < 1 ? {} : { type: idx };
      this.getCapitalSource(this.setPro, idx + "2", param);
    },
    changeMoney(idx) {
      this.zijinlaiyuan.isShow = false;
      let param = idx < 1 ? {} : { type: idx };
      this.getCapitalSource(this.zijinlaiyuan, idx + "3", param);
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
    // 进入更多详情页
    goMore(e) {
    
     let names = '';
     let param = {};
     let querys = {};
     let taTitle='';
  
     if ( e == 0){
       names = 'IT资源使用情况详情'
       param ={pagename: 'usefullXiazuan'}
       querys = this.$route.query
     } else if( e == 1){
       names = '机房投入资金分析详情'
       param = {pagename: 'touruXiazuan'},
       querys = {...this.$route.query}
        taTitle=this.title1;
      
     } else if ( e == 2){
        names = '机房建设资金走势图详情'
        param =  {pagename: 'touruSizeXiazuan'},
        querys = {...this.$route.query}
        taTitle=this.title2;
     } else if ( e == 3){
       names = "立项依据分析详情"
       param = {pagename: 'lixiangXiazuan'}
       querys = this.$route.query
     } else if ( e == 4) {
       names = "建设资金来源分析详情"
       param = {pagename: 'laiyuanXiazuan'}
       querys = this.$route.query
     }
   
     this.$router.push({
       name: 'tablepage',
       params:param,
       query: {...querys, tableTitle:taTitle,type: 2, title: this.$store.state.deptInfo.orgSpecies, backPathName: this.$route.name},
     })
     this.$store.commit('get_breadGrandson',{
       pathName:'tablepage',
       pagename:param.pagename,
       name:names
     })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style/base/index.scss";
.title-item {
  @include flex($j: left);
  margin: 20px 0 40px 10px;
  span {
    margin-right: 20px;
    label {
      @include font($fz: 14px, $color: rgba(255, 255, 255, 0.65));
    }
  }
}
.cardBlueWrapper {
  @extend %margin;
  margin-top: 80px;
  padding: 0 40px 0 0;
  .ivu-col-span-8 {
    @extend %padding;
    margin-top: 20px;
    p {
      @include font($fz: 12px, $color: #d95450);
      b {
        font-size: 20px;
      }
    }
  }
  .ivu-col-span-8:nth-child(4),
  .ivu-col-span-8:nth-child(5) {
    p {
      color: #5ac426;
    }
  }
}
.rowStyle {
  // background: rgba(26, 35, 71, 1);
  padding: 15px;
}
.paimingTitle {
  color: #59a1eb;
  line-height: 30px;
  height: 62px;
  span {
    color: rgba(255, 255, 255, 0.5);
  }
}
dl {
  dd {
    text-align: left;
    margin-top: 10px;
    font-weight: normal;
    p {
      margin-top: 25px;
    }
    .ring-wrapper {
      // transform: scale(1.1)!important;
      // margin-top: 30px;
      @include flex($j: center);
      .ivu-col-span-12 {
        @include flex($j: center);
       .legendItemWrapper {
          width: 330px;
          }
      }
      span {
        margin: auto 0;
      }   
    }
  }
}
.listfeiyong {
  display: flex;
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
  margin-top: -15px;
  margin-bottom: 20px;
  .feiyong1 {
    width: 220px;
  }
  h3 {
    span {
      color: #06c5ea;
      font-size: 14px;
    }
  }
}
.height210{
  min-height: 210px;
}
.height490{
  min-height: 490px;
}
.cardHeight {
  @extend %TitleBorder;
  /deep/ .ivu-card-body{
      padding:0;
    }
  .my-title{
    border: none;
    padding: 15px;
    border-bottom: 1px solid #1a5182;
    line-height: 1;
  }
  
} 
.bumenNumber {
    padding-left: 30px;
    dl {
      border-left: solid 3px #22ebfb;
      height: 40px;
      padding-left: 26px;
      margin-bottom: 40px;
      dt {
          display: inline-block;
          position: relative;
          top: -5px;
          span:first-child {
              display: block;
              font-family: 'PangMenZhengDao';
              @include font($fz: 13px, $color:#fff);
              height: 26px;
              line-height: 26px;
              strong {
                  font-family: 'PangMenZhengDao';
                  @include font($fz: 23px, $color:#fff);
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
          margin-left: 10px;
          position: relative;
          top: -4px;
      }
  }
          
         
         
        
  // color: rgba(255, 255, 255, 0.6);
  // h3 span {
  //   color: #05a3d7;
  //   font-size: 24px;
  // }
}
.titleStyle {
  color: #2d8cf0;
  font-size: 16px;
  label {
    float: right;
    border: solid 1px #d76d5b;
    @include font($fz: 12px, $color: #d76d5b);
    border-radius: 4px;
    display: inline-block;
    @include nums($w: 81px, $h: 26px);
    text-align: center;
    line-height: 26px;
    box-sizing: border-box;
    margin-right: 10px;
  }
}

.dd-num {
  p {
    position: relative;
    vertical-align: bottom;
    vertical-align: bottom;
    font-family: "PangMenZhengDao";
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
      font-family: "PangMenZhengDao";
    }
    img {
      position: absolute;
      left: 0;
      bottom: 2px;
    }
  }
}
.departmentDetail-top-cont {
  display: flex;
  padding-left:20px;
  padding-top:30px;
  .cardColor{
    margin-right: 20px;
    /deep/ dl{
      padding: 14px 20px;
    }
  }
}
</style>
