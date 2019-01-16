<!--  专题分析 - 表格 -->
<template>
  <div class="specialTable" v-if="pageshow" v-breadcrumb="breadcrumb">
    <div class="situation">
      <MyTitle :title='title.top' v-if="title.top"></MyTitle>
      <TopMenu v-if="['pcRoomC', 'pcRoomE'].indexOf($route.query.type) > -1" :list="topMenus" @change="businessBtn = '0'"></TopMenu>
      <dl>
        <dt>
          <i-menu v-if="isRearlyPcRoom" mode="horizontal" :active-name="businessBtn" @on-select='changeBusiness'>
              <menu-item :name="i.toString()" v-for='(v,i) in lengthItem' :key='i' :class="i==businessBtn?'ivu-menu-item ivu-menu-item-active ivu-menu-item-selected':'ivu-menu-item'">{{v.title}}</menu-item>
          </i-menu>
                      <!-- 填报 -->
                      <ul class="length" v-if="['already', 'servers', 'pcRoom', 'pcRoomC', 'pcRoomE','cloudResources'].indexOf($route.query.type) > -1">
                        <div v-for='(v,i) in CountShow' :key='i'  :class='$route.query.type=="cloudResources"&&businessBtn==i?"acitve-lenged length-div ":"length-div"' :style="{'border-color':v.color}">
                          <li :style="{'border-left-color':v.color}">
                          <span class="left-span">
                            <span><b>{{v.num}}</b>{{v.type}}</span>
                            <label>{{v.cont}}</label>
                          </span>
                            <img class="right-img" :src="v.img" alt="">
                        </li>
                        </div>
                        <RadioGroup v-if='!isRearlyPcRoom && lengthItem&&lengthItem[0].title' v-model="businessBtn" type="button" @on-change='changeBusiness' size='small' :class="{pcRoom: isPcRoom }">
                            <Radio :label="i.toString()" v-for='(v,i) in lengthItem' :key='i'>{{v.title}}</Radio>
                        </RadioGroup>
                        <div class="selectorBox" v-if="isPcRoom || isRearlyPcRoom" @click="showBlock = true">
                          <p class="text-nobr float-left pl15">{{orgNames || '请选择部门' }}</p>
                          <div class="float-right mr20"><i class="iconfont icon-xiangxia"></i></div>
                          <Cascader v-if="showBlock" :cascader="cascader" @upload="selected" @close="showBlock = false"></Cascader>
                        </div>
                      </ul>
                      <!--完备度  -->
                      <p v-if='$route.query.type == "completeness"'> 
                        <ul class="length " >
                          <li  :style="{'border-left-color':'#40AA8E'}" class="pos-relative">
                            <span class="left-span">
                              <span><b>{{$route.query.percent}}</b>%</span>
                              <label>数据完备度</label>
                            </span>
                              <img class="right-img" src="../../../../assets/img/icon/table_title_3.png" alt="">
                              <p class="title_tip">
                                反映数据填报完整程度的指标，完备度越高，资产填报的完整程度越好，<b>例如省发改委所有业务系统需要填报的字段数是100个，该单位实际填写了98，则该单位业务系统填报的完备度是98%</b>
                              </p>
                          </li>
                          
                        </ul>
                      </p>
                      <!-- 合规度 -->
                      <p v-if='$route.query.type == "compliance"'> 
                        <ul class="length" >
                          <li  :style="{'border-left-color':'#40AA8E'}" class="pos-relative">
                              <span class='left-span'>
                                <span><b>{{$route.query.percent}}</b>%</span>
                              <label>数据合规度</label>
                              </span>
                                <img class='right-img' src="../../../../assets/img/icon/table_title_3.png" alt="">
                                <p class="title_tip">
                                    反映数据填报规范程度的指标，合规度越高，资产填报的数据，越符合系统的规范要求，<b>例如省发改委所有业务系统实际填报的字段数是100个，该单位实际填写字段数中有98个符合系统的规范要求，则该单位业务系统填报的数据合规度是98%</b>
                                </p>
                          </li>
                          
                        </ul>
                        </p>
                      <!-- 业务系统  建设 -->
                      <p v-if='isGaugehalf'>
                        <ul class="length" >
                          <div v-for='(v,i) in gaugehalf' :key='i' :class='businessBtn==i?"acitve-lenged length-div length-width":"length-div length-width"' :style="{'border-color':gaugehalfColor[i]}">
                            <li  :style="{'border-left-color':gaugehalfColor[i]}" >
                              <p>
                                <span><b>{{v.num}}</b>个</span>
                                <label>{{v.title}}</label>
                              </p>
                                <span class="gaugehalf"><Gaugehalf :color='gaugehalfColor[i]' :percent='Number(v.percent)'></Gaugehalf></span>
                            </li>
                          </div>
                        </ul>
                        <RadioGroup v-model="businessBtn" type="button" @on-change='changeBusiness' size='small'>
                            <Radio :label="i.toString()" v-for='(v,i) in gaugehalf' :key='i'>{{v.title}}</Radio>
                        </RadioGroup>
                      </p>
                        <!-- 资金来源分析 -->
                      <div v-if='$route.query.type == "sourceanalysis"'>
                        <div class="sourceanalysis" v-if='$route.query.type == "sourceanalysis"'>
                          <DatePicker v-model="sourceanalysis.year" type="year" placeholder="请选择年份" style="width: 200px" ></DatePicker>
                          <Select v-model="businessBtn" style="width:200px">
                              <Option v-for="(item,i) in sourceanalysisList" :value="i.toString()" :key="item">{{ item }}</Option>
                          </Select>
                          <Button type="primary" @click='changeBusiness'>查询</Button>
                        </div>
                      </div>
                      
                    </dt>
        <dd>
          <Newbar :bar="barOption" :series="barOption.series" v-if='resizeOver && barOption.isShow&&this.barOption.series[0].data.length' @setBarParams='getBarParams' cursor="pointer"></Newbar>
          <p class="noData" v-if='barOption.isShow&&!this.barOption.series[0].data.length'> <img src="../../../../assets/img/bg/noData.png" alt=""> </p>
        </dd>
      </dl>
    </div>
    <div class="detailed">
      <MyTitle :title='title.bottom'></MyTitle>
      <div class="table">
        <div class="flex-between">
          <div class="selectorBox" v-if="!isPcRoom && !isRearlyPcRoom" @click="showBlock = true">
            <p class="text-nobr float-left pl15">{{orgNames || '请选择部门' }}</p>
            <div class="float-right mr20"><i class="iconfont icon-xiangxia"></i></div>
            <Cascader v-if="showBlock" :cascader="cascader" @upload="selected" @close="showBlock = false"></Cascader>
          </div>
          <p @click="clickOutData" v-show='downloadIsShow' class="between-p" :class="{'out-p': !isPcRoom && !isRearlyPcRoom}">查询结果导出 <i class="iconfont icon-daochu"></i></p>
          <div class="tips"> <img src="../../../../assets/img/icon/table_tips.png" alt="">
            <!-- <span v-if='$route.query.type == "completeness"'>上报省直单位{{total.already}}个 数据完备度:{{$route.query.percent}}%</span> -->
            <!-- <span v-if='$route.query.type == "compliance"'>上报省直单位{{total.already}}个 数据合规度:{{$route.query.percent}}%</span> -->
            <!-- <span v-if='$route.query.type == "build"'>上报省直单位{{total.already}}个 系统总数量:{{total.build}}个</span> -->
            <!-- <span v-if='$route.query.type == "already" && lengthItem.length'>上报省直单位{{total.already}}个 已填报:{{lengthItem[0].num}}个 未填报:{{lengthItem[1].num}}个 数据记录总数:{{lengthItem[2].num}} 项</span> -->
            <!-- IT - 服务器资源 -->
            <ul v-if='$route.query.type == "servers" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li><label>服务器数量</label><span>{{allcount.servers}}</span>个</li>
              <li><label>内存资源</label><span>{{allcount.ram}}</span>GB</li>
              <li><label>硬盘资源</label><span>{{allcount.rom}}</span>T</li>
            </ul>
            <!-- 业务 - 建设情况 -->
            <ul v-if='$route.query.type == "build" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li><label>已建</label><span>{{allcount.built}}</span>个</li>
              <li><label>在建</label><span>{{allcount.underConstruction}}</span>个</li>
              <li><label>拟建</label><span>{{allcount.proposedConstruction}}</span>个</li>
              <li><label>未反馈</label><span>{{allcount.unknown}}</span>个</li>
            </ul>
            <!-- 业务 - 接入共享平台情况 -->
            <ul v-if='$route.query.type == "share" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li v-for='(v,i) in allcount.data' :key='i'><label>{{v.title}}</label><span>{{v.num}}</span>个</li>
            </ul>
            <!-- 业务 - 接入网上办事大厅情况 -->
            <ul v-if='$route.query.type == "officehall" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li v-for='(v,i) in allcount.data' :key='i'><label>{{v.title}}</label><span>{{v.num}}</span>个</li>
            </ul>
            <!-- 业务 - 迁云情况 -->
            <ul v-if='$route.query.type == "migratedClouds" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li v-for='(v,i) in allcount.data' :key='i'><label>{{v.title}}</label><span>{{v.num}}</span>个</li>
            </ul>
            <!-- 业务 - 专网环境运行系统分析 -->
            <ul v-if='$route.query.type == "specialnetwork" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li><label>专网运行环境</label><span>{{allcount.specialNetCount}}</span>个</li>
              <li><label>非专网运行环境</label><span>{{allcount.otherNetCount}}</span>个</li>
              <li><label>未反馈</label><span>{{allcount.unknownCount}}</span>个</li>
            </ul>
            <!-- 各部门资金来源分析 -->
            <ul v-if='$route.query.type == "sourceanalysis" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li v-for='(v,i) in allcount.data' :key='i' v-if='v.type!==0'><label>{{['财政拨款','自筹','BT项目','其他'][v.type-1]}}</label><span>{{v.totalMoney|number_format(0)}}</span></li>
            </ul>
            <!-- 业务 - 数据资产填报情况 -->
            <ul v-if='$route.query.type == "already" && allcount'>
              <li><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li><label>云资源</label><span>{{allcount.cloudCountTotal}}</span>个</li>
              <li><label>机房</label><span>{{allcount.computerRoomCountTotal}}</span>个</li>
              <li><label>数据资产</label><span>{{allcount.dataAssetCountTotal}}</span>个</li>
              <li><label>硬件</label><span>{{allcount.equipmentCountTotal}}</span>个</li>
              <li><label>信息系统</label><span>{{allcount.informationSystemCountTotal}}</span>个</li>
              <li><label>软件</label><span>{{allcount.softCountTotal}}</span>个</li>
            </ul>
            <!-- 业务 - 完备度 -->
            <ul v-if='$route.query.type == "completeness" &&allcount&&allcount.completeness&&allcount.completeness.total'>
              <li v-if='allcount.totalCount'><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li><label>应填</label><span>{{allcount.completeness.total}}</span>个</li>
              <li><label>实填</label><span>{{allcount.completeness.total - allcount.completeness.empty}}</span>个</li>
              <li><label>缺失</label><span>{{allcount.completeness.empty}}</span>个</li>
              <li><label>完备度</label><span>{{allcount.completeness.completeness}}</span>%</li>
            </ul>
            <!-- 业务 - 合规度 -->
            <ul v-if='$route.query.type == "compliance" && allcount&&allcount.percent'>
              <li v-if='allcount.totalCount'><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li><label>实填</label><span>{{allcount.total}}</span>个</li>
              <li><label>合规</label><span>{{allcount.total - allcount.empty}}</span>个</li>
              <li><label>异常</label><span>{{allcount.empty}}</span>个</li>
              <li><label>异常度</label><span>{{allcount.percent}}</span>%</li>
            </ul>
            <!-- 云资源 -->
             <ul v-if='$route.query.type == "cloudResources" && allcount'>
              <li v-if='allcount.totalCount'><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li>
              <li><label>CPU</label><span>{{allcount.cpu}}</span>核</li>
              <li><label>内存资源</label><span>{{allcount.ram}}</span>GB</li>
              <li><label>硬盘资源</label><span>{{allcount.rom}}</span>T</li>
            </ul>
            <!-- IT - 自有机房建设 -->
             <ul v-if='(isRearlyPcRoom || $route.query.type == "pcRoomC") && allcount'>
              <!-- <li v-if='allcount.totalCount'><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li> -->
              <li><label>机房总数</label><span>{{allcount.roomcount}}</span>个</li>
              <li><label>机房总面积</label><span>{{allcount.roomsize}}</span>㎡</li>
              <li><label>机房投入资金</label><span>{{allcount.putintoMoney}}</span>万元</li>
            </ul>
            <!-- IT - 自有机房设备 -->
             <ul v-if='$route.query.type == "pcRoomE" && allcount'>
              <!-- <li v-if='allcount.totalCount'><label>统计单位</label><span>{{allcount.totalCount}}</span>个</li> -->
              <li><label>设备总数</label><span>{{allcount.equcount}}</span>个</li>
              <li><label>设备总投入资金</label><span>{{allcount.equmoney}}</span>万元</li>
            </ul>
          </div>
        </div>
        <NomalTable class='table-cont' v-if="tableShow" :table-json="tableJson" :url='url' axiosType="post" :query="query" @receive="setCount"></NomalTable>
      </div>
    </div>
    <Spin size="large" fix v-if="loadingISShow">
      <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
    </Spin>
  </div>
</template>

<script>
  import MyTitle from '@/components/title/index.vue';
  import TopMenu from '@/components/topMenu/index.vue';
  import Newbar from '@/components/charts/bar/newBar.vue';
  import NomalTable from '@/components/table/NomalTable.vue';
  import Cascader from "@/components/table/Cascader";
  import appBase from "@/../static/common/app_base.js";
  import Gaugehalf from '@/components/charts/gauge/Gaugehalf.vue'
  import {
    SERVER_BASE_URL
  } from '@/http/config.js';
  let MOCK_URL = 'http://39.107.233.177:36743'
  import {
    already, //已填报
    completeness, // 完备度
    compliance, // 合规度
    build, // 建设情况分析
    migratedClouds, // 迁云情况
    share, //接入共享平台
    officehall, // 接入网上办事大厅
    specialnetwork, // 专网分析
    sourceanalysis, // 资金来源分析
    cloudResources, // 云资源
  } from './tableJson.js';
  import {
    serverResources
  } from './config/fundUse'
  import PCROOM from './config/pcRoom'
import { constructionCost } from '../../../../server/getData.js';
import echarts from 'echarts'
import { labelName } from '../../../../server/data/dept.js';
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
  export default {
    name: 'specialTable',
    data() {
      let parent_0={
        already:{name:'数据资产填报'},
        completeness:{name:'数据完备度'},
        compliance:{name:'数据合规度'},
        build:{name:'业务系统建设情况'},
        specialnetwork:{name:'专网环境运行系统分析'},
        migratedClouds:{name:'业务系统迁云情况'},
        officehall:{name:'业务系统接入网上办事大厅情况'},
        share:{name:'业务系统接入共享平台情况'},
        sourceanalysis:{name:'各部门资金来源分析'},
        cloudResources:{name:'云资源'},
        pcRoom: {name: '自有机房建设分析及明细'},
        pcRoomC:{name:'自有机房建设'},
        pcRoomE:{name:'自有机房设备'},
        servers:{name:'服务器'}
      }[this.$route.query.type];
      return {
        breadcrumb: [{
            icon: 'dingwei',
            name: '数据资产综合分析'
          },
          parent_0,
        ],
        barData: [], // bar图的接口数据，用来点击得到ID
        pageshow: true,
        loadingISShow: false, // 下载loading
        actIndex: 0,
        query: {},
        orgNames: '',
        showBlock: false,
        cascader: {
          width: 600,
          height: 550,
          // className: "m-indexCascader-box"
          className: 'm-subCascader-box'
        },
        topMenus: [{
          name: '自有机房建设',
          icon: 'icon-ziyoujifangfenxi',
          type: 'pcRoomC'
        }, {
          name: '自有机房设备',
          icon: 'icon-yingjianzichanfenxi',
          type: 'pcRoomE'
        }],
        titleBg: require('../../../../assets/img/bg/special_title_bg.png'),
        businessBtn: this.$route.query.businessBtn == 0 ? '0' : this.$route.query.businessBtn,
        total: {
          already: '',
          build: '',
        },
        lengthItem: [],
        barOption: {
          company:['个'],
          "height": 270,
          "xData": [],
          "labelnames": ["填报"],
          isShow: false,
          series: [{
            "name": "",
            "type": "bar",
            "data": [],
            "barMaxWidth": 20
          }]
        },
        config: {
          /* 填报 */
          already: {
            tableJson: already,
            url: `${SERVER_BASE_URL}/api/abnormal/entryCountByOrg`,
            api: 'entryCountByOrg'
          },
          completeness: {
            tableJson: completeness, //完备度
            url: `${SERVER_BASE_URL}/api/abnormal/completenessByOrg`,
            api: 'completenessByOrg'
          },
          compliance: {
            tableJson: compliance, // 合规度
            url: `${SERVER_BASE_URL}/api/compliance/getComplianceList`,
            api: 'getComplianceList'
          },
          build: {
            tableJson: build, // 建设情况分析
            url: `${SERVER_BASE_URL}/api/system/sysStatusByOrg`,
            api: 'sysStatusByOrg'
          },
          migratedClouds: {
            tableJson: migratedClouds, // 迁云情况
            url: `${SERVER_BASE_URL}/api/system/migrationCloud`,
            api: 'migrationCloud'
          },
          share: {
            tableJson: share, // 接入共享平台
            url: `${SERVER_BASE_URL}/api/system/accessSharingPlatform`,
            api: 'accessSharingPlatform'
          },
          officehall: {
            tableJson: officehall, // 接入网上办事大厅
            url: `${SERVER_BASE_URL}/api/system/accessOnlineServiceHall`,
            api: 'accessOnlineServiceHall'
          },
          specialnetwork: {
            tableJson: specialnetwork, // 专网分析
            url: `${SERVER_BASE_URL}/api/system/runenvironment`,
            api: 'runenvironment'
          },
          sourceanalysis: {
            tableJson: sourceanalysis, // 资金来源分析
            url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListData`,
            api: 'getSourceFundsListData'
          },
          servers: {
            tableJson: serverResources, // 服务器资源
            url: `${SERVER_BASE_URL}/api/servers/serverresourcedetails`,
            api: 'serverresourcedetails'
          },
          pcRoom: PCROOM[0],
          pcRoomC: PCROOM[0],
          pcRoomE: PCROOM[1],
          cloudResources: {
            tableJson: cloudResources, // 云资源
            url: `${SERVER_BASE_URL}/api/cloudResource/getCloudResourceList`,
            api: 'getCloudResourceList'
          }
        },
        tableShow: true,
        gaugehalfShow: false, // 仪表盘加载展示
        gaugehalfColor: ['#7F6FE1', '#40AA8E', '#A1BD4C', '#BD5C4C'],
        gaugehalf: [],
        isGaugehalf: false, // 是否为业务展示模块，仪表盘样式是否需要展示
        title: {
          top: '',
          bottom: ''
        },
        sourceanalysis: {
          year: this.$route.query.year || '',
        },
        sourceanalysisList: ['财政拨款', '自筹项目', 'BT项目', '其他项目'],
        allcount: {
          data: []
        },
        resizeOver: true
      }
    },
    components: {
      MyTitle,
      TopMenu,
      Newbar,
      NomalTable,
      Cascader,
      Gaugehalf,
    },
    computed: {
      downloadIsShow() {
        return ['buildxz'].indexOf(this.$route.query.type) === -1;
      },
      url() {
        return this.config[this.$route.query.type].url
      },
      tableJson() {
        return this.config[this.$route.query.type].tableJson
      },
      isPcRoom() {
        return this.$route.query.type === 'pcRoomC' || this.$route.query.type === 'pcRoomE';
      },
      isRearlyPcRoom(){
        return this.$route.query.type === 'pcRoom';
      },
      CountShow(){
        if(this.isRearlyPcRoom){
          return [this.lengthItem[this.businessBtn]]
        }else{
          return this.lengthItem
        }
      }
    },
    mounted() {
      this.changeBusiness(this.businessBtn)
      // this.getBar();
      this.getTitle();
      window.sessionStorage.removeItem('specialTabIndex');
      if (this.$route.query.type == 'compliance') {
        this.getEarlyWarning();
      } else {
        this.getcompleteness();
      }


            let reshow = () => {
                this.resizeOver = false;
                this.$nextTick(() => this.resizeOver = true)
            };
            reshow();
            window.eventBus.$on('RESIZE', reshow)
    },
    methods: {
      setCount(data) {
        if (data && data.allcount) {
          if (data.allcount && data.allcount.data) {
            /* 
             * share 接入共享交换平台
             * officehall 接入网上办事大厅
             */
            let arr = ['share', 'officehall']
            if (arr.indexOf(this.$route.query.type) != -1) {
              data.allcount.data.splice(1, 0, {
                title: '计划接入',
                num: 0
              })
            }
            this.allcount.data = data.allcount.data;
          } else {
            this.allcount = data.allcount
          }
        }
        this.allcount.totalCount = data.page && data.page.totalCount;
      },
      /* 获得完备度的统计说明文字 */
      getcompleteness() {
        this.$api.warning.completeness({
          sysOrgCode: this.$route.query.sysOrgCode
        }).then(res => {
          this.allcount.completeness = res;
        })
      },
      getEarlyWarning() {
        this.$api.getEarlyWarning({
          sysOrgCode: this.$route.query.sysOrgCode
        }).then(res => {
          let sum = 0;
          res.data.forEach((v, i) => {
            sum += v.count
          });
          this.allcount.percent = (sum / res.total).toFixed(2)
          this.allcount.total = res.total;
          this.allcount.empty = sum;
        })
      },
      selected(query, names) {
        this.orgNames = names.toString();
        this.showBlock = false;
        this.tableShow = false;
        this.query = query;
        if (this.$route.query.type == 'pcRoomC' || this.$route.query.type == 'pcRoomE'||this.$route.query.type=='pcRoom') {
          this.getBar();
        }
        this.$nextTick(() => {
          this.tableShow = true
        });
      },
      /* 导出 */
      clickOutData() {
        this.loadingISShow = true;
        this.$api.exportExcel({
          orgCode: this.$route.query.sysOrgCode || ''
        }).then(res => {
          let fileName = this.title.bottom;
          if (this.$route.query.type == "completeness") {
            fileName = "数据资产填报完备度明细表"
          }
          if (this.$route.query.type == "already") {
            fileName = "数据资产填报已填报明细表"
          }
          if (this.$route.query.type == "compliance") {
            fileName = "数据资产填报合规度明细表"
          }
          this.$appBase.downloadFile(res, fileName);
          this.loadingISShow = false;
        });
      },
      /* 获得柱状图 */
      getBar(typename) {
        this.barOption.xData = [];
        this.barOption.series = [];
        this.barOption.series.push({
          "name": "",
          "type": "bar",
          "data": [],
          "barMaxWidth": 20,
          "stack": "i",
        });
        this.sourceanalysis.source = this.businessBtn;
        let params = {
          sysOrgCode: this.$route.query.sysOrgCode || '',
          orgType: this.$route.query.orgType,
        }
        // 机房选择部门bar图重新渲染
        if (this.$route.query.type == 'pcRoomC' || this.$route.query.type == 'pcRoomE'||this.$route.query.type == 'pcRoom') {
          Object.assign(params, this.query);
        }
        /* 资金来源分析时间切换传参 */
        if (this.$route.query.type == 'sourceanalysis') {
          let sourceParams = {
            year: this.sourceanalysis.year&&this.sourceanalysis.year.pattern('yyyy')
          }
          params = Object.assign(params, sourceParams)
        }
        this.$api[this.config[typename || this.$route.query.type].api](params).then(res => {
          this.barData = res.data;
          if (this.$route.query.type == 'pcRoomE') {
            let names = ['网络设备', '服务器', '安全设备', '存储设备', '专用设备', '机柜', '空调', 'UPS'];
            let keys = ['net', 'servers', 'safeeqipment', 'romeqipment', 'specificequpment', 'cabinet', 'aircondioner', 'ups'];
            let btnNames = ['']
            let btns = ['count', 'money']
            this.barOption.xData = names;
            keys.forEach(o => {
              this.barOption.series[0].data.push(res.data[o + btns[this.businessBtn]])
            });
            this.barOption.isShow = true;
            this.getLengthItem(res.allcount || {});
            return;
          }
          res.data && res.data.length && res.data.forEach((v, i) => {
            this.barOption.xData.push(v.name); // 柱状图显示简称
            let yDataJson = {
              servers: []
            }
            if(this.businessBtn==0){this.businessBtn == '0'}
            /* 类型切换 */
            if (this.businessBtn && this.$route.query.type == 'build') {
              /* 业务系统建设情况 */
              let arr = ['built', 'underConstruction', 'proposedConstruction', 'unknown'];
              this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
              let statusKey = [
                "built",
                "underConstruction",
                "proposedConstruction",
                "unknown"
              ];
              let statusName = ["已建系统", "在建系统", "拟建系统", "未反馈"];
              this.gaugehalf = statusKey.map((o, i) => ({
                title: statusName[i],
                num: res.allcount[o],
                percent: (res.allcount[o] * 100 / res.allcount.total).toFixed(2),
                id:i.toString()
              }));
            } else if (this.businessBtn && this.$route.query.type == 'migratedClouds') {
              /* 业务系统迁云情况 */
              let arr = ['alreadyMigrationCloud', 'planMigrationCloud', 'notMigrationCloud', 'unknown'];
              this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
              let nameKeys = ["已迁云", "计划迁云", "不迁云", "未反馈"];
              let types = res.allcount.data.map(o => o.title);
              this.gaugehalf = nameKeys.map((item, i) => {
                let idx = types.indexOf(item);
                let obj = {
                  num: 0,
                  percent: "0.00",
                  title: item
                };
                if (idx > -1) {
                  obj = {
                    ...obj,
                    ...res.allcount.data[idx]
                  };
                }
                return obj;
              });
            } else if (this.businessBtn && this.$route.query.type == 'share') {
              /* 业务系统接入共享平台 */
              let arr = ['alreadyAccessSharingPlatform', 0, 'notAccessSharingPlatform', 'unknown'];
              if (this.businessBtn == 1) {
                this.barOption.series[0].data.push(0);
              } else {
                this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
              }
              let nameKeys = ["已接入", '计划接入', "未接入", "未反馈"];
              let types = res.allcount.data.map(o => o.title);
              let res1 = res.allcount.data.map((o, i) => ({
                title: o.title,
                num: o.num,
                percent: o.percent
              }));
              this.gaugehalf = nameKeys.map((o, i) => {
                let idx = types.indexOf(o);
                let obj = {
                  title: o,
                  num: 0,
                  percent: "0.00"
                };
                if (idx > -1) {
                  obj = {
                    ...obj,
                    ...res1[idx]
                  };
                }
                return obj;
              });
            } else if (this.businessBtn && this.$route.query.type == 'officehall') {
              /* 业务系统接入网上办事大厅 */
              let arr = ['alreadyAccessOnlineServiceHall', 'planAccessOnlineServiceHall', 'notAccessOnlineServiceHall', 'unknown'];
              this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
              let nameKeys = ["已接入", '计划接入', "未接入", "未反馈"];
              let types = res.allcount.data.map(o => o.title);
              let res1 = res.allcount.data.map((o, i) => ({
                title: o.title,
                num: o.num,
                percent: o.percent
              }));
              this.gaugehalf = nameKeys.map((o, i) => {
                let idx = types.indexOf(o);
                let obj = {
                  title: o,
                  num: 0,
                  percent: "0.00"
                };
                if (idx > -1) {
                  obj = {
                    ...obj,
                    ...res1[idx]
                  };
                }
                return obj;
              });
            } else if (this.businessBtn && this.$route.query.type == 'specialnetwork') {
              /* 专网环境运行系统分析 */
              // 非专网运行  
              let arr = ['specialNetCount', 'internetCount', 'unknown'];
              if (this.businessBtn == 1) {
                this.barOption.series[0].data.push(v['governmentExtranetCount'] + v['internetCount']);
              } else {
                this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
              }
              let counts = ["specialNetCount", "otherNetCount", "unknownCount"];
              let titles = ['专网运行环境', '非专网运行环境', '未反馈'];
              let percents = [
                "specialNetPercent",
                "otherNetPercent",
                "unknownPercent"
              ];
              this.gaugehalf = counts.map((o, i) => ({
                title: titles[i],
                num: res.allcount[o],
                percent: parseFloat(res.allcount[percents[i]])
              }));
            } else if (this.businessBtn && this.$route.query.type == 'sourceanalysis') { // 资金来源
              let {name, query} = this.$route;
              let year = this.sourceanalysis.year ? new Date(this.sourceanalysis.year).pattern('yyyy') : '';
              this.$router.replace({name, query: {...query, year: year}})
              let arr = ['financialAppropriation', 'raiseIndependentlyProject', 'btProject', 'otherProject'];
              this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
            } else if (this.businessBtn && this.$route.query.type == 'servers') { // 服务器资源
              let arr = ['servers', 'ram', 'rom'];
              this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
            } else if (this.businessBtn && this.$route.query.type == 'pcRoom') { // 服务器资源
              let arr = ['roomcount', 'roomsize', 'equcount', 'softMoney', 'hardMoney'];
              if(this.businessBtn < 3){

                this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
              }else{
                this.barOption.labelnames = ['软件投入资金', '硬件投入资金'];
                this.barOption.company = ['万元', '万元'];
                this.barOption.colorArr = colorArr;
                this.barOption.series.push({
                  "name": "",
                  "type": "bar",
                  "data": [],
                  "barMaxWidth": 20,
                  "stack": "i",
                });
                this.barOption.series[0].stack = 'i';
                this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
                this.barOption.series[1].data.push(v[arr[this.businessBtn - 0 + 1]]);
              }
            } else if (this.businessBtn && this.$route.query.type == 'pcRoomC') { // 服务器资源
              let arr = ['roomcount', 'roomsize', 'putintoMoney'];
              this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
            } else if (this.businessBtn && this.$route.query.type == 'cloudResources') { // 云资源
              let arr = ['cpu', 'ram', 'rom'];
              this.barOption.series[0].data.push(v[arr[this.businessBtn]]);
            } else {
              if (this.$route.query.type == 'already') {
                // 填报
                this.barOption.series[0].data.push(v.total);
              } else if (this.$route.query.type == 'completeness') {
                // 完备度
                let num = 0;
                if (v.empty == 0 || v.total == 0) {
                  num = 0
                } else {
                  num = ((v.total - v.empty) / v.total * 100).toFixed(2)
                }
                this.barOption.series[0].data.push(num);
              } else if (this.$route.query.type == 'compliance') {
                // 合规度
                let num = 0;
                if (v.empty == 0 || v.total == 0) {
                  num = 0
                } else {
                  num = ((v.total - v.empty) / v.total * 100).toFixed(2)
                }
                this.barOption.series[0].data.push(num);
              }
            }
          });
          this.barOption.isShow = true;
          this.total.already = res.page && res.page.totalCount;
          this.getLengthItem(res.allcount || {});
        })
      },
      changeBusiness(e) {
        this.barOption.isShow = false;
        this.businessBtn = e;
        this.getBar();
      },
      /* 获得填报数据 */
      getLengthItem(query = {}) {
        let querys = { ...this.$route.query,
          ...query
        }
        let {
          reportingDepartmentCount = 0,
            dataRecordTotalCount = 0,
            serverAllData = '',
            equcount = 0,
            equmoney = 0,
            roomcount = 0,
            roomsize = 0,
            putintoMoney = 0,
            cpuTotal = 0, // 云资源 - CPU
            ramTotal = 0, // 云资源 - 内存
            romTotal = 0, // 云资源 - 硬盘
        } = querys;
        this.lengthItem = {
          already: [{
              color: '#7F6FE1',
              num: reportingDepartmentCount,
              type: '个',
              cont: '已填报单位',
              img: require('../../../../assets/img/icon/table_title_0.png')
            },
            {
              color: '#40AA8E',
              num: this.total.already - reportingDepartmentCount,
              type: '个',
              cont: '未填报单位',
              img: require('../../../../assets/img/icon/table_title_1.png')
            },
            {
              color: '#A1BD4C',
              num: dataRecordTotalCount,
              type: '项',
              cont: '数据记录总数',
              img: require('../../../../assets/img/icon/table_title_2.png')
            }
          ],
          servers: [{
              color: '#7F6FE1',
              num: serverAllData.split(',')[1],
              type: '个',
              title: '服务器',
              cont: '服务器数量',
              img: require('../../../../assets/img/icon/table_title_0.png')
            },
            {
              color: '#40AA8E',
              num: serverAllData.split(',')[2],
              type: 'GB',
              title: '内存资源',
              cont: '内存资源',
              img: require('../../../../assets/img/icon/table_title_1.png')
            },
            {
              color: '#A1BD4C',
              num: serverAllData.split(',')[3],
              type: 'T',
              title: '硬盘资源',
              cont: '硬盘资源',
              img: require('../../../../assets/img/icon/table_title_2.png')
            }
          ],
          pcRoom: [{
              color: '#7F6FE1',
              num: roomcount,
              type: '个',
              title: '机房数量',
              cont: '机房总数',
              img: require('../../../../assets/img/icon/table_title_0.png')
            },
            {
              color: '#40AA8E',
              num: roomsize,
              type: '㎡',
              title: '机房面积',
              cont: '机房总面积',
              img: require('../../../../assets/img/icon/table_title_1.png')
            },
            {
              color: '#40AA8E',
              num: equcount,
              type: '台',
              title: '硬件数量',
              cont: '硬件总数量',
              img: require('../../../../assets/img/icon/table_title_2.png')
            },
            {
              color: '#A1BD4C',
              num: putintoMoney,
              type: '万元',
              title: '总投入资金',
              cont: '总投入资金',
              img: require('../../../../assets/img/icon/qian.png')
            }
          ],
          pcRoomC: [{
              color: '#7F6FE1',
              num: roomcount,
              type: '个',
              title: '机房数量',
              cont: '机房总数',
              img: require('../../../../assets/img/icon/table_title_0.png')
            },
            {
              color: '#40AA8E',
              num: roomsize,
              type: '㎡',
              title: '机房面积',
              cont: '机房总面积',
              img: require('../../../../assets/img/icon/table_title_1.png')
            },
            {
              color: '#A1BD4C',
              num: putintoMoney,
              type: '万元',
              title: '投入资金',
              cont: '机房投入资金',
              img: require('../../../../assets/img/icon/qian.png')
            }
          ],
          pcRoomE: [{
              color: '#7F6FE1',
              num: equcount,
              type: '个',
              title: '设备数量',
              cont: '设备总数',
              img: require('../../../../assets/img/icon/table_title_0.png')
            },
            {
              color: '#A1BD4C',
              num: equmoney,
              type: '万元',
              title: '设备投入资金',
              cont: '设备总投入资金',
              img: require('../../../../assets/img/icon/qian.png')
            }
          ],
          cloudResources: [{
              color: '#7F6FE1',
              num: cpuTotal,
              type: '核',
              title: 'CPU',
              cont: 'CPU',
              img: require('../../../../assets/img/icon/table_title_0.png')
            },
            {
              color: '#40AA8E',
              num: ramTotal,
              type: 'GB',
              title: '内存资源',
              cont: '内存资源',
              img: require('../../../../assets/img/icon/table_title_1.png')
            },
            {
              color: '#A1BD4C ',
              num: romTotal,
              type: 'T',
              title: '硬盘资源',
              cont: '硬盘资源',
              img: require('../../../../assets/img/icon/table_title_4.png')
            }
          ]
        }[this.$route.query.type] || [];
        if(this.isRearlyPcRoom && this.businessBtn === 3)return;
        let labelnames = '填报';
        let company = '个';
        if(this.$route.query.type === 'completeness'){
          labelnames = '数据完备度';
          company = '%';
        }
        if(this.$route.query.type === 'compliance'){
          labelnames = '数据合规度';
          company = '%';
        }
        this.barOption.labelnames = [this.lengthItem && this.lengthItem[this.businessBtn - 0] && this.lengthItem[this.businessBtn - 0].cont || labelnames];
        this.barOption.company = [this.lengthItem && this.lengthItem[this.businessBtn - 0] && this.lengthItem[this.businessBtn - 0].type || company];
      },
      /* 
       * 头部标题 
       * 业务 去掉省直部门
       */
      getTitle(typename = this.$route.query.type) {
        if (this.$route.query.type == "build") {
          this.isGaugehalf = true;
          this.title.top = '业务系统建设情况';
          this.title.bottom = '业务系统建设明细';
        } else if (this.$route.query.type == "already") {
          this.title.top = '省直部门 - 数据资产填报情况'
          this.title.bottom = '省直部门 - 数据资产填报明细'
        } else if (this.$route.query.type == "completeness") {
          this.title.top = '省直部门 - 数据资产填报完备度'
          this.title.bottom = '省直部门 - 数据资产填报完备度明细'
        } else if (this.$route.query.type == "compliance") {
          this.title.top = '省直部门 - 数据资产填报合规度'
          this.title.bottom = '省直部门 - 数据资产填报合规度明细'
        } else if (this.$route.query.type == "migratedClouds") {
          this.isGaugehalf = true;
          this.title.top = '业务系统迁云情况'
          this.title.bottom = '业务系统迁云情况明细'
        } else if (this.$route.query.type == "share") {
          this.isGaugehalf = true;
          this.title.top = '业务系统接入共享平台情况'
          this.title.bottom = '业务系统接入共享平台情况明细'
        } else if (this.$route.query.type == "officehall") {
          this.isGaugehalf = true;
          this.title.top = '业务系统接入网上办事大厅情况'
          this.title.bottom = '业务系统接入网上办事大厅情况明细'
        } else if (this.$route.query.type == "specialnetwork") {
          this.isGaugehalf = true;
          this.title.top = '专网环境运行系统分析'
          this.title.bottom = '专网环境运行系统明细'
        } else if (this.$route.query.type == "sourceanalysis") {
          this.isGaugehalf = true;
          this.title.top = '各部门资金来源分析'
          this.title.bottom = '各部门资金来源明细'
        } else if (this.$route.query.type == "servers") {
          this.isGaugehalf = true;
          this.title.top = '服务器资源情况'
          this.title.bottom = '服务器资源情况明细'
        } else if (typename == "pcRoom") {
          // this.isGaugehalf = true;
          this.title.top = '自有机房建设分析及明细'
          this.title.bottom = '自有机房建设分析及明细'
        } else if (typename == "pcRoomC") {
          this.isGaugehalf = true;
          this.title.top = ''
          this.title.bottom = '自有机房建设分析明细'
        } else if (typename == "pcRoomE") {
          this.isGaugehalf = true;
          this.title.top = ''
          this.title.bottom = '自有机房设备分析明细'
        } else if (typename == "cloudResources") {
          this.isGaugehalf = true;
          this.title.top = '云资源情况'
          this.title.bottom = '云资源情况明细'
        }
      },
      /*获得点击柱状图的下标 */
      getBarParams(e) {
        let index = e;
        let sysOrgCode = this.barData && this.barData[index] && this.barData[index].sysOrgCode;
        let orgName = this.barData && this.barData[index] && this.barData[index].orgName;
        let id = this.barData && this.barData[index] && this.barData[index].id;
        let typeArr = ['build', 'specialnetwork', 'migratedClouds', 'officehall', 'share', 'already', 'completeness', 'compliance', 'servers', 'cloudResources', 'sourceanalysis'];
        let routeTypeArr = ['buildxz', 'specialnetworkxz', 'migratedCloudsxz', 'officehallxz', 'sharexz', 'alreadyxx', 'completenessxx', 'compliancexx', 'fundUse', 'cloudResourcesxz', 'sourceanalysisxx'];
        if (typeArr.indexOf(this.$route.query.type) != -1) {
          let typeIndex = typeArr.indexOf(this.$route.query.type);
          let query={
            sysOrgCode: sysOrgCode,
            type: routeTypeArr[typeIndex],
            bmName: orgName,
          }
          if (typeArr[typeIndex].indexOf('xx')!=-1) {
            query = Object.assign(query,{types:1})
          } 
          /* 资金 */
          if(typeArr[typeIndex]=='sourceanalysis'){
            query = Object.assign(query,{year:this.sourceanalysis.year?new Date(this.sourceanalysis.year).pattern('yyyy'):'',types:5})
          }
          this.$router.push({
            name: "specialTablexz",
            query: {
              ...query,
              backQuery:JSON.stringify(this.$route.query)
            }
          })
        }
      }
    },
    // 监控路由变化
    beforeRouteUpdate(to, from, next) {
      const newpage = to.query.type;
      const oldpage = from.query.type;
      const newPath = to.path;
      const oldPath = from.path;
      if (oldpage !== newpage && newPath == oldPath) {
        // 重新渲染
        this.pageshow = false;
        this.$nextTick(() => {
          this.pageshow = true
        });
        this.getTitle(newpage)
        this.getBar(newpage);
      }
      next();
    },
  }
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .specialTable {
    // background-image: radial-gradient(51% 150%, #04236C 44%, #000D24 100%);
    @include nums($w: 100%, $h:100%);
    // padding: 40px;
    // padding-top: 0;
    overflow-y: auto;
    .special-title {
      text-align: center;
      height: 61px;
      line-height: 61px;
      margin: 10px 0 30px 0;
      position: relative;
      .back {
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 15px;
        @include font($fz: 16px, $color:#fff);
        i {
          @include font($fz: 16px, $color:#fff);
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
      a {
        display: inline-block;
        @include nums($w: 461px, $h:61px);
        font-family: 'zhanghaishan';
        @include font($fz: 36px, $color:#fff);
        cursor: pointer;
      }
    }
    .situation {
      dl {
        padding: 10px 40px 40px 40px;
        border: 1px solid #1A5182;
        border-top: 0;
        box-sizing: border-box;
        height: 440px;
        position: relative;
        dt {
          position: relative;
          .ivu-radio-group {
            position: absolute;
            right: 0;
            top: -77px;
          }
          .ivu-radio-group.pcRoom {
            top: 10px;
          }
        }
        dd {
          .noData {
            text-align: center;
            img {
              margin-top: 80px;
            }
          }
        }
      }
      .length {
        margin-top: 30px;
        padding-left: 25px;
        display: flex;
        .length-div{
          width: 380px;
          margin-right: 10px;
          padding: 10px;
        }
        .length-width{
          width: 294px;
        }
   
        .acitve-lenged{
          border: 1px solid rgb(0, 255, 231);
          border-radius: 8px;
          box-shadow: 0 0 3px rgba(255, 255, 255, 0.4),0 0 3px rgba(255, 255, 255, 0.4),0 0 3px rgba(255, 255, 255, 0.4);
        }
        .selectorBox {
          position: absolute;
          right: 0;
          top: 0px;
           cursor: pointer;
           z-index: 1000;
        }
        .selectorBox /deep/ .m-subCascader-box {
          left: auto;
          right: 0;
        }
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
      .sourceanalysis {
        .ivu-date-picker {
          margin-right: 10px;
        }
        .ivu-btn-primary {
          margin-left: 10px;
        }
      }
    }
    .detailed {
      .flex-between {
        padding: 0 0 20px;
        align-items: center;
        position: relative;
        .between-p {
          font-size: 16px;
          cursor: pointer;
          display: inline-block;
          &:hover {
            color: #2d8cf0;
          }
        }
        .out-p {
          position: absolute;
          left: 530px;
        }
      }
      margin-top: 30px;
      div.table {
        border: 1px solid #1A5182;
        box-sizing: border-box;
        border-top: 0;
        box-sizing: border-box;
        min-height: 100px;
        padding: 40px;
        .tips {
          @include font($fz: 14px, $color:rgba(255, 255, 255, 0.85));
          line-height: 30px; // font-size: ;
          ul {
            display: inline-block;
            li {
              display: inline-block;
              margin-right: 5px;
             
              span {
                margin-right: 0px;
              }
            }
          }
          img {
            vertical-align: middle;
          }
        }
      }
    }
  }
  @font-face {
    font-family: 'zhanghaishan';
    src: url('../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.ttf') format("truetype"), url('../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff'), url('../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff2'), url('../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.svg'), url('../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.eot'), url('../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.otf');
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
