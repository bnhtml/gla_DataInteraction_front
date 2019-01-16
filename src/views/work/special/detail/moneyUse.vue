<!-- 资金使用情况分析 二级页面  -->
<template>
  <div class='specialTable' v-breadcrumb="breadcrumb">
    <!-- <h2 class="special-title" :style="{background:'url('+titleBg+') no-repeat center center'}">
      <router-link :to="{name:'specialIndex',query:{sysOrgCode: $route.query.sysOrgCode}}">数据资产综合分析</router-link>
    </h2> -->
    <div class="situation">
      <Title :title='title.top' v-if="title.top"></Title>
      <dl>
        <div @click="routerTo({name: 'specialMoneyUsez', query: {year: yearSelect.year}})" class="routerlink">明细<i class="iconfont icon-shuangjiantou"></i></div>
        <dt class="clearfix">
          <ul class="length float-left">
            <li v-for='(v,i) in lengthItem' :key='i' :style="{'border-left-color':v.color}">
              <span class="left-span">
                <span><b>{{v.num}}</b>{{v.type}}</span>
                <label>{{v.cont}}</label>
              </span>
                <img class="right-img" :src="v.img" alt="">
            </li>
          </ul>
          <DatePicker v-model="yearSelect.year" type="year" @on-change="getAnalysisFundUtilization" placeholder="请选择" style="width: 200px;float:right" :clearable='true'></DatePicker>
        </dt>
        <dd class="mt20">
          <Row>
            <i-col span='12'>
                <div class="g-inside-border l">
                  <Row type="flex" align="middle">
                    <i-col span="11">
                    <ring v-if='capitalSource.isShow' :data='capitalSource.data' :labelColor='capitalSource.labelColor' :color='capitalSource.color' :title='capitalSource.title' :hasLabel='capitalSource.hasLabel'></ring>
                    </i-col>
                    <i-col span="13">
                    <div class="legendItem">
                        <legendItem :legendData='capitalSource.data' :bg='capitalSource.color' :className='"longitudinal"'></legendItem>
                    </div>
                    </i-col>
                  </Row>
                </div>
            </i-col>
            <i-col span='12'>
                <div class="g-inside-border r">
                  <Row type="flex" align="middle">
                    <i-col span="11">
                    <ring v-if='capitalSource1.isShow' :data='capitalSource1.data' :labelColor='capitalSource1.labelColor' :color='capitalSource1.color' :title='capitalSource1.title' :hasLabel='capitalSource1.hasLabel'></ring>
                    </i-col>
                    <i-col span="13">
                    <div class="legendItem">
                        <legendItem :legendData='capitalSource1.data' :bg='capitalSource1.color' :className='"longitudinal"'></legendItem>
                    </div>
                    </i-col>
                  </Row>
                </div>
            </i-col>
          </Row>
          <!-- <Row :gutter="32" type="flex" align="middle">
            <i-col span="14">
              <div :class="`changeColorBg flex-between ${item.className}`" v-for="(item, i) in items" :key="i">
                <div class="infoname">
                  {{item.title}}:<span>{{item.number}}</span>
                </div>
                <div class="infovalue" v-if="yearSelect.year">
                  同比：<span>{{item.value}} % <i class="iconfont" :class="`icon-${item.className}`"></i></span>
                </div>
              </div>
            </i-col>
            <i-col span="10">
              <DubblePie :series="pie.series" v-if="pie.isShow"></DubblePie>
            </i-col>
          </Row> -->
        </dd>
      </dl>
    </div>
    <div class="situation mt20">
      <Title :title='title.bottom'></Title>
      <dl>
        <div @click="routerTo({name: 'specialMoneyUsez', query: {year: yearSelect1.year}})" class="routerlink">明细<i class="iconfont icon-shuangjiantou"></i></div>
        <dt>
            <DatePicker v-model="yearSelect1.year" @on-change="getDetailsFundUseList" type="year" placeholder="请选择" style="width: 200px;margin-right: 30px" :clearable='true'></DatePicker>
            <Select v-model="businessBtn" style="width:200px">
                <Option v-for="(item,i) in typeSelect" :value="i.toString()" :key="item">{{ item }}</Option>
            </Select>
          </dt>
        <dd>
          <Newbar :bar="barOption" :series="barOption.series" v-if='barOption.isShow&&this.barOption.series[0].data.length'></Newbar>
          <p class="noData" v-if='barOption.isShow&&!this.barOption.series[0].data.length'> <img src="../../../../assets/img/bg/noData.png" alt=""> </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
  import Title from "@/components/title/index.vue";
  import Newbar from '@/components/charts/bar/newBar.vue';
  import DubblePie from '@/components/charts/dubblePie';
  import ring from "@/components/charts/ring/ring.vue";
  import legendItem from "@/components/charts/ring/legendItem.vue";
  import echarts from "echarts";
  let colorLineArr = [{
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#579ADD"
        },
        {
          offset: 1,
          color: "#2C61B9"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#A291F9"
        },
        {
          offset: 1,
          color: "#614EBE"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#2FBAB2"
        },
        {
          offset: 1,
          color: "#1E8589"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#B4EC51"
        },
        {
          offset: 1,
          color: "#4EBF21"
        }
      ])
    }
  ];
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      Title,
      Newbar,
      DubblePie,
      ring,
      legendItem,
    },
    data() {
      //这里存放数据
      return {
        breadcrumb: [{
            icon: 'dingwei',
            name: '数据资产综合分析'
          },
          {name:'资金使用情况'},
        ],
        lengthItem: [
          {
            color: '#A1BD4C',
            num: '0',
            type: '万元',
            title: '贵州省信息化投入总资金',
            cont: '贵州省信息化投入总资金',
            img: require('../../../../assets/img/icon/qian.png')
          }
        ],
        capitalSource: {
            data: [],
            labelColor: [
                "#ddbf18", //ced866
                "#3259ff",
                "#14d9a4",
                "#3E81D9",
            ],
            color: ["#ddbf18", "#3259ff", "#14d9a4", "#3E81D9"],
            hasLabel: false,
            isShow: false,
            title: {}
        },
        capitalSource1: {
            data: [],
            labelColor: [
                "#ddbf18", //ced866
                "#3259ff",
                "#14d9a4",
                "#3E81D9",
            ],
            color: ["#ddbf18", "#3259ff", "#14d9a4", "#3E81D9"],
            hasLabel: false,
            isShow: false,
            title: {}
        },
        query: this.$route.query,
        titleBg: require("../../../../assets/img/bg/special_title_bg.png"),
        title: {
          top: "资金使用情况",
          bottom: "各部门资金使用情况"
        },
        yearSelect: {
          year: this.$route.query.year1,
        },
        items: [],
        yearSelect1: {
          year: this.$route.query.year2,
        },
        typeSelect: ['全部费用', '建设费用', '运维费用', '云资源租赁费用'],
        barOption: {
          company:['万元','万元'],
          "height": 270,
          "xData": [],
          "labelnames": [""],
          colorArr: colorLineArr,
          isShow: false,
          series: []
        },
        businessBtn: '0',
        pie: {
          series: [],
          isShow: true
        }
      };
    },
    //监听属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {
      businessBtn(n) {
        this.getDetailsFundUseList(n);
      }
    },
    //方法集合
    methods: {
      init() {
        this.getDetailsFundUseList()
        this.getAnalysisFundUtilization();
      },
      routerTo({
        name,
        query = {}
      }) {
        this.$router.push({
          name,
          query: { ...query,
            ...this.$route.query,
            year: query.year ? new Date(query.year).pattern('yyyy') : ''
          }
        });
      },
      getAnalysisFundUtilization() {
        this.capitalSource.isShow = false;
        let {name, query} = this.$route;
        let year = this.yearSelect.year ? new Date(this.yearSelect.year).pattern('yyyy') : '';
        this.$router.replace({name, query: {...query, year1: year}})
        this.$api.getAnalysisFundUtilization({ ...this.query,
          year
        }).then(res => {
          // 信息化投入总资金 number totalCapital  value totalCapitalIncrease
          // 建设费用 number constructionCost  value constructionCostIncrease
          // 运维费用 number operationCost  value operationCostIncrease
          // 云资源租赁费用 number cloudResourceLeasingCost  value cloudResourceLeasingCostIncrease  

          this.lengthItem = [
            {
              color: '#A1BD4C',
              num: res.totalCapital,
              type: '万元',
              title: '贵州省信息化投入总资金',
              cont: '贵州省信息化投入总资金',
              img: require('../../../../assets/img/icon/qian.png')
            }

          ]
          this.capitalSource.title = {
              title: "资金投入<br/>占比分析"
          };
          this.capitalSource.data = [{
                  "value": res.constructionCostIncrease,
                  "name": "建设费用",
                  "number": res.constructionCost + '万元'
              },
              {
                  "value": res.operationCostIncrease,
                  "name": "运维费用",
                  "number": res.operationCost + '万元'
              },
              {
                  "value": res.cloudResourceLeasingCostIncrease,
                  "name": "云资源租赁费用",
                  "number": res.cloudResourceLeasingCost+ '万元'
              }
          ]
          this.capitalSource.isShow = true;
          this.capitalSource1.title = {
              title: "软硬件费<br/>用占比"
          };
          this.capitalSource1.data = [{
                  "value": res.softCostIncrease,
                  "name": "软件",
                  "number": res.softPrice + '万元'
              },
              {
                  "value": res.equCostIncrease,
                  "name": "硬件",
                  "number": res.equPrice + '万元'
              }
          ]
          this.capitalSource1.isShow = true;

          // let itemObj = [{
          //     title: '信息化投入总资金',
          //     number: 'totalCapital',
          //     value: 'totalCapitalIncrease'
          //   },
          //   {
          //     title: '建设费用',
          //     number: 'constructionCost',
          //     value: 'constructionCostIncrease'
          //   },
          //   {
          //     title: '运维费用',
          //     number: 'operationCost',
          //     value: 'operationCostIncrease'
          //   },
          //   {
          //     title: '云资源租赁费用',
          //     number: 'cloudResourceLeasingCost',
          //     value: 'cloudResourceLeasingCostIncrease'
          //   }
          // ];
          // this.items = itemObj.map(o => ({
          //   title: o.title,
          //   number: res[o.number],
          //   value: res[o.value],
          //   className: res[o.value] <= 0 ? res[o.value] < 0 ?  'xiajiang' : 'pingwen' : 'shangsheng'
          // }))
          // this.pie.series = [{
          //     name: "",
          //     type: "pie",
          //     selectedMode: "single",
          //     radius: [0, "50%"],
          //     label: {
          //       normal: {
          //         position: "inner"
          //       }
          //     },
          //     labelLine: {
          //       normal: {
          //         show: false
          //       }
          //     },
          //     data: [{
          //         value: res.constructionCost,
          //         name: "建设费用",
          //         itemStyle: {
          //           color: '#D35C40'
          //         }
          //       },
          //       {
          //         value: res.operationCost,
          //         name: "运维费用",
          //         itemStyle: {
          //           color: '#0088F4'
          //         }
          //       },
          //       {
          //         value: res.cloudResourceLeasingCost,
          //         name: "云资源租赁费用",
          //         itemStyle: {
          //           color: '#57AD0A'
          //         }
          //       }
          //     ]
          //   },
          //   {
          //     name: "",
          //     type: "pie",
          //     radius: ["62%", "70%"],
          //     label: {
          //       normal: {
          //         position: "outer"
          //       }
          //     },
          //     data: [{
          //         value: res.systemConstructionCost,
          //         name: "系统建设费用",
          //         itemStyle: {
          //           color: '#F99700'
          //         }
          //       },
          //       {
          //         value: res.basicResourceConstructionCost,
          //         name: "基础资源建设费用",
          //         itemStyle: {
          //           color: '#F89595'
          //         }
          //       },
          //       {
          //         value: res.basicResourceOperationCost,
          //         name: "基础资源运维费用",
          //         itemStyle: {
          //           color: '#4974FF'
          //         }
          //       },
          //       {
          //         value: res.systemOperationCost,
          //         name: "系统运维费用",
          //         itemStyle: {
          //           color: '#50E3C2'
          //         }
          //       },
          //       {
          //         value: res.cloudResourceLeasingCost,
          //         name: "云资源租赁费用",
          //         itemStyle: {
          //           color: '#57AD0A'
          //         }
          //       }
          //     ]
          //   }
          // ];
          // this.pie.isShow = true;
        })
      },
      getDetailsFundUseList() {
        this.barOption.isShow = false;
        let {name, query} = this.$route;
        let year = this.yearSelect1.year ? new Date(this.yearSelect1.year).pattern('yyyy') : '';
        this.$router.replace({name, query: {...query, year2: year}})

        this.$api.getDetailsFundUseList({ ...this.query,
          year
        }).then(res => {
          this.barOption.isShow = true;
          this.barOption.xData = [];
          let newdata = res.data.map(o => ({ ...o,
            basic: o.basicResourceRoomConstructionCost + o.basicResourceHardwareConstructionCost,
            basic1: o.basicResourceRoomOperationCost + o.basicResourceHardwareOperationCost
          }))
          let item = [{
              keys: ['total'],
              names: ['全部费用']
            },
            {
              keys: ['basic', 'systemConstructionCost'],
              names: ['基础资源建设费用', '系统建设费用']
            },
            {
              keys: ['basic1', 'systemOperationCost'],
              names: ['基础资源运维费用', '系统运维费用']
            },
            {
              keys: ['cloudResourcesRentalCost'],
              names: ['云资源租赁费用']
            },
          ][this.businessBtn - 0];
          this.barOption.xData = newdata.map(o => o.orgName);
          this.barOption.labelnames = item.names;
          this.barOption.series = item.keys.map((o, i) => {
            let key = o;
            let name = item.names[i];
            return {
              name,
              "type": "bar",
              "data": newdata.map(o => o[key]),
              "barMaxWidth": 20,
              stack: "i",
            }
          })
        })
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.init();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .specialTable {
    // background-image: radial-gradient(51% 150%, #04236c 44%, #000d24 100%);
    // @include nums($w: 100%, $h: 100%);
    // padding: 40px;
    // padding-top: 20px;
    overflow-y: auto;
    .special-title {
      font-family: "zhanghaishan";
      text-align: center;
      @include font($fz: 36px, $color: #fff);
      height: 61px;
      line-height: 61px;
      margin: 10px 0 30px 0;
      position: relative;
      .back {
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 15px;
        @include font($fz: 16px, $color: #fff);
        i {
          @include font($fz: 16px, $color: #fff);
          position: relative;
          top: -2px;
        }
      }
      .back:hover {
        color: #2d8cf0;
        i {
          color: #2d8cf0;
        }
      }
    }
    .situation {
      dl {
        padding-top: 40px;
        padding-bottom: 15px;
        @extend %TitleBorder;
        border-top: 0;
        box-sizing: border-box;
        position: relative;
        .routerlink {
          position: absolute;
          right: 15px;
          top: -35px;
          font-size: 15px;
          color: #fff;
          cursor: pointer;
          i {
              margin-left: 5px;
          }
          &:hover{
              color: #00ffe7;
          }
        }
        dt {
          position: relative;
          padding: 0 40px;
        }
        dd {
          .pingwen span{
            color: #7ED321;
          }
          .xiajiang span{
            color: #0090FE;
          }
          .shangsheng span{
            color: #F5A623;
          }
          .changeColorBg {
            padding: 0 20px;
            background-image: linear-gradient(90deg, #0F4BA7 0%, #057698 100%);
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
            font-size: 18px;
            color: #fff;
            span {
              margin-left: 10px;
            }
          }
          .noData {
            text-align: center;
            img {
              margin-top: 80px;
            }
          }
        }
        .g-inside-border{
          margin-bottom: -1px;
          border: 1px solid #0f3889;
          padding: 20px 0;
        }
        .g-inside-border.l{
          margin-left: -1px;
        }
        .g-inside-border.r{
          margin-right: -1px;
        }
      .length {
        li {
          display: inline-block; // @include nums($w: 350px, $h:50px);
          border-left-style: solid;
          border-left-width: 3px;
          padding-left: 9px;
          position: relative;
          margin-right: 50px;
          .left-span {
            display: inline-block;
          }
          .right-img {
            margin-left: 20px;
          }
          span {
            display: block;
            height: 30px;
            line-height: 30px;
            b {
              font-size: 28px;
              height: 30px;
              line-height: 30px;
              font-family: 'zhanghaishan';
              margin-right: 5px;
            }
          }
          label {
            display: block;
            font-family: PingFangSC-Regular;
            @include font($fz: 14px, $color:rgba(255, 255, 255, 0.85));
            line-height: 20px;
          }
          p {
            display: inline-block;
            vertical-align: middle;
            min-width: 100px;
          }
          .gaugehalf {
            display: inline-block;
            vertical-align: middle;
            position: relative;
            top: -1px;
          }
          .title_tip {
              @include font($fz: 14px, $color:rgba(255, 255, 255, 0.6));
              position: absolute;
              left: 193px;
              top: -18px;
              width: 585px;
              height: 70px;
              padding: 3px;
              background-color: #071c43;
              border-radius: 4px;
              border: solid 1px #1a78c9;
              display: none;
              b{
                color:yellow;
              }
          }
        }
        li:hover{
            border-color: #00ffe7;
            .title_tip{
                  display: block;
              }
          }
      }
      }
    }
  }
  @font-face {
    font-family: "zhanghaishan";
    src: url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.ttf") format("truetype"), url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff"), url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff2"), url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.svg"), url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.eot"), url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.otf");
  }
  .selectorBox {
     cursor: pointer;
    p {
      width: 90%;
      font-size: 14px;
    }
    position: relative;
    width: 500px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #999;
    border-radius: 15px;
    color: #999;
    i {
      display: inline-block;
      vertical-align: middle;
      margin-top: -6px;
    }
  }
</style>