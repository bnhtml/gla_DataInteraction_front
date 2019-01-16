<template>
  <div>
    <card>
      <Tabs :value="PageAction" class="ITtab" :animated="false">
        <TabPane v-for="(label, index) in labels" class="tabPane" :label="label" :name="index + ''" :key="index">
          <div class="relative" v-show="'0' === (index + '')">
            <div span="24" class="textTitle">
              <p class="blueFont">各地区总体投入资金热力图</p>
              <p>*点击对应区域查看具体详情</p>
            </div>
            <Row type="flex" justify="center" align="middle" :gutter="90">
              <i-col span="12">
                <row class="flexBetween">
                  <i-col span="12" v-for="(data, index) in dataset0" :key="index" @click.native="goPcRoom">
                    <!-- <router-link :to="{name:data.url.name,query:{type:1}}" class="onebox" v-if='index<4'> -->
                    <div class="onebox" v-if='index<4'>
                      <Datashow :data='data'></Datashow>
                    </div>
                    <!-- </router-link> -->
                  </i-col>
                </row>
                <row class='circle-bottom flexBetween'>
                  <i-col span="12" v-for="(data, index) in dataset0" :key="index" @click.native="goResources">
                    <!-- <router-link :to="{name:data.url.name,query:{type:1}}" class="onebox" v-if='index>=4'> -->
                    <div class="onebox" v-if='index>=4'>
                      <Datashow :data='data'></Datashow>
                    </div>
                    <!-- </router-link> -->
                  </i-col>
                </row>
              </i-col>
              <i-col span="12">
                <div class="mapBox">
                  <Map :jsonCode="jsonCode" :width="width" :height="height" :strip="strip" @mapClick="handelClick"></Map>
                </div>
              </i-col>
            </Row>
            <Spin size="large" fix v-if="mapLoading">
              <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
            </Spin>
          </div>
          <Row v-show="'1' === (index + '')" justify="center" class="relative">
            <!--  @on-change="getCardData(arguments[0], '1')" -->
            <RadioGroup v-model="radio" type="button" class="radioGroup" @on-change="handelCheck(1)">
              <Radio v-for="(o, i) in labelName" :key="o" :label="labelIds[i]">{{o}}</Radio>
            </RadioGroup>
            <i-col span="6" v-for="(data, index) in dataset1" :key="index">
              <router-link :to="data.url" class="onebox">
                <Datashow :data='data'></Datashow>
              </router-link>
            </i-col>
            <i-col span="24" class="textTitle">
              <p class="rightBtn"><strong @click="goUp" v-if="cengji !== 0"><i class="iconfont icon-fanhui"></i>返回上一级 <br></strong>
                <span @click='moreColorBar.isMoreBar=!moreColorBar.isMoreBar'> <i class='iconfont icon-qiehuan'></i> 切换为{{moreColorBar.isMoreBar==false?'柱状':'列表'}}显示
                </span>
              </p>
              <div class="icon-department">
                <ul v-if='!moreColorBar.isMoreBar'>
                  <li v-for='(v,i) in deptList' :key='i' @click="iconClick(v)">
                    <label><img :src="v.img" alt=""></label>
                    <span>{{v.orgSpecies}}</span>
                  </li>
                </ul>
                <div class="moreBar-wrapper" v-if='moreColorBar.isMoreBar'>
                  <div class="bgColorBox">
                    <p class='tip'>* 点击对应图标查看详情</p>
                    <legendItem :legendData='legendData.data' :bg='legendData.color'></legendItem>
                    <newBar  v-if="moreBar.isMoreBar" :bar="moreBar" :series="moreBarSeries"></newBar>
                  </div>
                </div>
                <!-- </router-link> -->
              </div>
            </i-col>
          </Row>
        </TabPane>
      </Tabs>
    </card>
  </div>
</template>

<script type="text/javascript">
  import echarts from 'echarts';
  import Map from "@/components/charts/map";
  import Datashow from "@/components/datashow";
  import legendItem from "@/components/charts/ring/legendItem.vue";
  import newBar from "@/components/charts/bar/newBar.vue";
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
  let dataNumber = {
    data0: [],
    data1: [],
    data2: []
  };
  import {
    SERVER_BASE_URL
  } from "@/http/config.js";
  let legend = [{
      name: "机房数量"
    },
    {
      name: "CPU资源"
    },
    {
      name: "硬盘资源数量"
    },
    {
      name: "内存资源数量"
    }
  ];
  let dataset1 = [{
      name: "省直部门机房建设费用",
      value: Math.ceil(Math.random() * 100000),
      unit: "万元",
      icon: require("../../../assets/img/icon/icon_money_zi.png"),
      numColor: ["#5a4ab0", "#8e80de"],
      url: {
        name: "pcRoom"
      }
    },
    {
      name: "省直部门机房运维费用",
      value: Math.ceil(Math.random() * 100000),
      unit: "万元",
      icon: require("../../../assets/img/icon/icon_money_lv.png"),
      numColor: ["#269094", "#2ba9ac"],
      url: {
        name: "pcRoom"
      }
    },
    {
      name: "省直部门机房总数量",
      value: Math.ceil(Math.random() * 100000),
      unit: "",
      icon: require("../../../assets/img/icon/icon_jifang.png"),
      numColor: ["#579add", "#2c61b9"],
      url: {
        name: "pcRoom"
      }
    },
    {
      name: "省直部门机房总面积",
      value: Math.ceil(Math.random() * 100000),
      unit: "㎡",
      icon: require("../../../assets/img/icon/icon_pingmi.png"),
      numColor: ["#ca5d55", "#d56c59"],
      url: {
        name: "pcRoom"
      }
    },
    {
      name: "CPU资源总数量",
      value: Math.ceil(Math.random() * 100000),
      unit: "",
      icon: require("../../../assets/img/icon/icon_jisuan.png"),
      numColor: ["#ca5d55", "#d56c59"],
      url: {
        name: "resources"
      }
    },
    {
      name: "硬盘资源总数量",
      value: Math.ceil(Math.random() * 100000),
      unit: "T",
      icon: require("../../../assets/img/icon/icon_baocun.png"),
      numColor: ["#269094", "#2ba9ac"],
      url: {
        name: "resources"
      }
    },
    {
      name: "内存资源总数量",
      value: Math.ceil(Math.random() * 100000),
      unit: "G",
      icon: require("../../../assets/img/icon/icon_web.png"),
      numColor: ["#579add", "#2c61b9"],
      url: {
        name: "resources"
      }
    },
    {
      name: "服务资源运维费用",
      value: Math.ceil(Math.random() * 100000),
      unit: "万元",
      icon: require("../../../assets/img/icon/icon_money_zi.png"),
      numColor: ["#5a4ab0", "#8e80de"],
      url: {
        name: "resources"
      }
    },
  ]
  let colorArr = [
    {
      color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#2e6ac6"//"#A291F9"
        },
        {
          offset: 1,
          color: "#2b54a0"//"#614EBE"
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
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#2ba9ac"
        },
        {
          offset: 1,
          color: "#269094"
        }
      ])
    },{
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#5a4ab0"
        },
        {
          offset: 1,
          color: "#8e80de"
        }
      ])
    }
  ];
  export default {
    data() {
      let PageAction = this.$route.query.action || '0';
      return {
        cengji: -1,
        labelName: data.labelName,
        labelIds: ['1', '2,3,4,5,6,7,8,9,10,11'],
        radio: "1", // 头部  省直或者市级
        allCity: "全省",
        deptName: '省直部门',
        jsonCode: "guizhou",
        width: 618,
        height: 500,
        strip: true,
        labels: ["全省总体分析", "全省各部门分析"],
        PageAction,
        mapLoading: true,
        dataset0: [{
            name: "机房建设费用",
            value: Math.ceil(Math.random() * 20),
            unit: "万元",
            icon: require("../../../assets/img/icon/icon_money_zi.png"),
            numColor: ["#5a4ab0", "#8e80de"],
            url: {
              name: "pcRoom"
            }
          },
          {
            name: "机房运维费用",
            value: Math.ceil(Math.random() * 20),
            unit: "万元",
            icon: require("../../../assets/img/icon/icon_money_lv.png"),
            numColor: ["#269094", "#2ba9ac"],
            url: {
              name: "pcRoom"
            }
          },
          {
            name: "机房总数量",
            value: Math.ceil(Math.random() * 20),
            unit: "个",
            icon: require("../../../assets/img/icon/icon_jifang.png"),
            numColor: ["#579add", "#2c61b9"],
            url: {
              name: "pcRoom"
            }
          },
          {
            name: "机房总面积",
            value: Math.ceil(Math.random() * 20),
            unit: "㎡",
            icon: require("../../../assets/img/icon/icon_pingmi.png"),
            numColor: ["#ca5d55", "#d56c59"],
            url: {
              name: "pcRoom"
            }
          },
          {
            name: "CPU资源总数量",
            value: Math.ceil(Math.random() * 20),
            unit: "核",
            icon: require("../../../assets/img/icon/icon_jisuan.png"),
            numColor: ["#ca5d55", "#d56c59"],
            url: {
              name: "resources"
            }
          },
          {
            name: "硬盘资源总数量",
            value: Math.ceil(Math.random() * 20),
            unit: "T",
            icon: require("../../../assets/img/icon/icon_baocun.png"),
            numColor: ["#269094", "#2ba9ac"],
            url: {
              name: "resources"
            }
          },
          {
            name: "内存资源总数量",
            value: Math.ceil(Math.random() * 20),
            unit: "G",
            icon: require("../../../assets/img/icon/icon_web.png"),
            numColor: ["#579add", "#2c61b9"],
            url: {
              name: "resources"
            }
          },
          {
            name: "服务资源运维费用",
            value: Math.ceil(Math.random() * 20),
            unit: "万元",
            icon: require("../../../assets/img/icon/icon_money_zi.png"),
            numColor: ["#5a4ab0", "#8e80de"],
            url: {
              name: "resources"
            }
          }
        ],
        dataset1,
        datasetQuery: {},
        deptList: data.data0,
        citylevel: "", // 判断市级部门第几层
        legendData: {
          data: legend,
          color: ["#2e6ac6", "#d56c59", "#2ba9ac", "#8e80de"]
        },
        moreBar:{
         height:350,
         xData:[],
         isMoreBar:false,
         labelnames:['机房数量', 'CPU资源', '硬盘资源数量', '内存资源数量'],
         colorArr:colorArr,
        },
        moreBarSeries:[],

        moreColorBar: {
          legendData: ["机房数量", "CPU资源", "硬盘资源", "内存资源"],
          xAxisData: [],
          width: 540,
          height: 383,
          isMoreBar: false,
          isShow: false,
          color: [
            ["#2e6ac6", "#2b54a0"],
            ["#d56c59", "#ca5d55"],
            ["#2ba9ac", "#269094"],
            ["#8e80de", "#5a4ab0"]
          ],
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
          legendItem: [{
              name: "机房数量"
            },
            {
              name: "CPU资源"
            },
            {
              name: "硬盘资源"
            },
            {
              name: "内存资源"
            }
          ],
          legendColor: ["#2e6ac6", "#d56c59", "#2ba9ac", "#8e80de"]
        } // bar数据
      };
    },
    components: {
      Map,
      Datashow,
      legendItem,
      newBar,
    },
    mounted() {
      this.getDeptList();
      this.setTypeName(0, this.allCity);
      this.setTypeName(1, this.deptName);
      this.getIcon(1);
      this.getMoreColorBar();
      this.getPcroomData(0);
    },
    methods: {
      random(num = 100) {
        return parseInt(Math.random() * num);
      },
      goUp() {
        let add = {
          '1': 2,
          '2,3,4,5,6,7,8,9,10,11': 1
        }[this.radio];
        this.cengji -= add;
        this.deptList = data["data" + this.cengji];
        if (this.cengji === 0) {
          this.getPcroomData(1, this.radio);
        } else {
          this.getPcroomData(this.deptCard, {
            areaids: this.radio,
            orgRootId: this.deptList[0].orgRootId
          })
        }
        this.getMoreBar(dataList["data" + this.cengji]);
      },
      getIcon(v = {}) {
        let add = {
          '1': 2,
          '2,3,4,5,6,7,8,9,10,11': 1
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
            url_data: 'barFirst',
            params: {
              areaids: this.radio,
              orgRootId: v.orgRootId || ''
            }
          },
          {
            url_icon: 'organizationViewList',
            url_data: 'barSecond',
            params: {
              areaids: v.areaid || this.radio,
              orgRootId: v.orgRootId || ''
            }
          }
        ][newcengji];
        if (apiInfo) {
          this.datasetQuery = apiInfo.params;
          this.getPcroomData(1, apiInfo.params);
          this.$api.ITBasic[apiInfo.url_icon](apiInfo.params).then(res => {
            res.data.forEach((v, i) => {
              v.img = SERVER_BASE_URL + v.img;
            });
            this.deptList  = res.data;
            data['data' + newcengji] = res.data;
            this.cengji = newcengji;
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
              sysOrgCode: v.sysOrgCode
            }
          });
          this.$store.commit('get_breadSon',{
            pathName:'department',
            name:'省直部门资源总体分析'
          })
        }
      },
      /* 点击部门IOCN */
      iconClick(v) {
        this.getIcon(v);
      },
      handelClick(e) {
        this.mapLoading = true;
        if (e == "返回首页") {
          e = {
            name: "全省"
          };
        }
        this.allCity = e.name;
        this.setTypeName(0, this.allCity);
        this.getPcroomData(0, e.id ? {
          areaids: [e.id]
        } : {});
        this.mapLoading = false;
      },
      handelCheck(label) {
        let areaids = this.radio;
        let query = {
          areaids
        };
        this.deptName = this.labelName[this.labelIds.indexOf(this.radio)];
        this.getPcroomData(1, query);
        this.setTypeName(1, this.deptName);
        this.deptList = data.data0;
        this.cengji = -1;
        this.getIcon();
      },
      getDeptList() {
      },
      // 获取柱状图数据
      getMoreBar(res) {
        this.moreBar.isMoreBar = false;
        this.$nextTick(() => {
          this.moreBar.xData
           = this.deptList.map(o => o.orgSpecies);
           let dataname = ['type', 'cpu', 'rom', 'comcon'];
          this.moreBarSeries = this.moreBar.labelnames.map((o, i) => {
             return {
               name:o,
               type:'bar',
               data:this.deptList.map((oo, ii) => {
                  let idx = res.data.map(o => o.hardFirm).indexOf(oo.orgSpecies);
                  if (idx >= 0) {
                    return res.data[idx][dataname[i]];
                  } else {
                    return 0;
                  }
               })
             }
          })
          this.moreBar.isMoreBar = true;
        })
      },
      setTypeName(label = 0, beginname) {
        this['dataset' + label][0].name = beginname + "机房建设费用";
        this['dataset' + label][1].name = beginname + "机房运维费用";
        this['dataset' + label][2].name = beginname + "机房总数量";
        this['dataset' + label][3].name = beginname + "机房总面积";
      },
      getPcroomData(label = 0, query = {}, newcengji = 0) {
        let apis = ['ITPcroomDataArea', 'ITPcroomDataSize'].map(o => this.$api.ITBasic[o](query));
        Promise.all(apis).then(res => {
          this.mapLoading = false;
          let data = {};
          res.forEach(o => {
            let nameIndex = {
              'ywTrje': 1,
              'rjzTrje': 0,
              'jfSize': 3,
              'allroomCount': 2,
              'cpu': 4,
              'ram': 6,
              'rom': 5,
              'operactionCost': 7
            }
            Object.keys(nameIndex).forEach(o => {
              let val = data[o];
              let idx = nameIndex[o];
              let obj = this['dataset' + label][idx];
              this['dataset' + label].splice(idx, 1, Object.assign(obj, {
                value: val
              }));
            });
          })
        })
      },
      getMoreColorBar() {
        let params = {
          areaids: 1
        };
        this.$api.getBarGraphWithDeptSpecies(params).then(res => {
          res.data.forEach((v, i) => {
            this.moreColorBar.xAxisData.push(v.hardFirm);
            this.moreColorBar.series[0].data.push(v.type);
            this.moreColorBar.series[1].data.push(v.cpu);
            this.moreColorBar.series[2].data.push(v.ram);
            this.moreColorBar.series[3].data.push(v.rom);
            this.moreColorBar.isShow = true;
          });
        });
      },
      // 进入各部门机房面积分析
      goPcRoom() {
        this.$router.push({
          name:'pcRoom',
          query:{
            type:1
          }
        })
        this.$store.commit('get_breadSon',{
          path:'/home/index/pcRoom',
          pathName:'pcRoom',
          name:'各部门机房面积分析'
        })
      },
      goResources(){
         this.$router.push({
          name:'resources',
          query:{
            type:1
          }
        })
        this.$store.commit('get_breadSon',{
          path:'/home/index/resources',
          pathName:'resources',
          name:'各地区服务器资源使用情况'
        })  
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/style/base/index.scss";
  .rightBtn {
    line-height: 50px;
    font-weight: 500;
    @include font($fz: 14px, $color: #1087d7);
    cursor: pointer;
    span,
    strong {
      cursor: pointer;
    }
    span {
      float: right;
    }
    strong {
      float: left;
    }
    i {
      margin-right: 6px;
    }
  }
  .relative {
    position: relative;
  }
  .radioGroup {
    position: absolute;
    right: 10px;
    top: -45px;
    height: 26px;
  }
  .textTitle {
    clear: both;
    @include font($fz: 14px, $color: #b2bbcd);
    p {
      height: 40px;
      line-height: 40px;
      position: relative;
      span {
        position: absolute;
        right: 40px;
        cursor: pointer;
        @include font($fz: 14px, $color: #1087d7);
      }
    }
    .blueFont {
      color: #2d8cf0;
    }
    .moreBar-wrapper {
      .bgColorBox {
        padding: 15px;
        background-color: #1a2247;
        position: relative;
        width: 100%;
      }
      .tip {
        position: absolute;
        right: 20px;
        top: 3px;
        @include font($fz: 14px, $color: #d56456);
      }
    }
  }
  .flexBetween {
    .ivu-col-span-12 {
      padding-left: 30px;
      // border:1px solid red;
    }
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .icon-department {
    @include nums($w: 100%, $h: 414px);
    margin-top: 30px;
    ul {
      @include nums($w: 100%, $h: 414px);
      overflow-y: scroll;
      display: flex;
      flex-wrap: wrap;
      li {
        @include nums($w: 100px, $h: 124px);
        @include font($fz: 14px, $color: #fff);
        margin: 10px 25px;
        text-align: center;
        border: solid 1px #1c2851;
        border-radius: 4px;
        cursor: pointer;
        label {
          display: block;
          cursor: pointer;
          img {
            @include nums($w: 54px, $h: 54px);
            margin-top: 20px;
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
  .circle-bottom {
    margin-top: 20px;
    padding-top: 50px;
    border-top: solid 1px rgba(255, 255, 255, 0.25)
  }
</style>
