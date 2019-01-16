<!-- 专题首页 -->
<template>
  <div ref="specialIndex">
    <div class="special-index">
      <Model :img="titleModel.img" :top="titleModel.top" :left="titleModel.left">
        <p class="g-title-text" @click="getOrgs(true)">数据资产综合分析</p>
      </Model>
      <div class="g-left-models">
        <div class="g-common-model pb20" :class="{linkHover: overAct === 0}">
          <div class="g-common-title"><i class="icon-title-left"></i>业务系统<i class="icon-title-right"></i></div>
          <div class="g-common-cont">
            <div class="g-cont-item">
              <div class="g-item-title">业务系统总数</div>
              <div class="g-number-box flex-center">
                <p class="g-one-num" v-for="(item, i) in bussnessCountArr" :key="i">{{item}}</p>
              </div>
            </div>
            <div class="g-cont-item">
              <div class="g-item-title">业务系统情况分析</div>
              <div class="g-text-info">*点击对应图表查看详细信息</div>
              <Row class="g-item-one">
                <i-col class="g-item-listone" :span="12" @click.native="routerTo({name: 'specialTable',query: {type: 'specialnetwork',businessBtn:0}})">
                  <div class="g-left-icon itemIcon0"></div>
                  <div class="g-right-icon right0" v-if="specialNet[0]">
                    <p class="firstLine">{{specialNet[0].count}}个 <span>{{specialNet[0].percent}}%</span></p>
                    <p class="secondLine">专网系统</p>
                  </div>
                </i-col>
                <i-col class="g-item-listone" :span="12" @click.native="routerTo({name: 'specialTable',query: {type: 'migratedClouds',businessBtn:0}})">
                  <div class="g-left-icon itemIcon1"></div>
                  <div class="g-right-icon right1" v-if="moveToCloud[0]">
                    <p class="firstLine">{{moveToCloud[0].num}}个 <span>{{moveToCloud[0].percent}}%</span></p>
                    <p class="secondLine">已迁云</p>
                  </div>
                </i-col>
                <i-col class="g-item-listone" :span="12" @click.native="routerTo({name: 'specialTable',query: {type: 'officehall',businessBtn:0}})">
                  <div class="g-left-icon itemIcon2"></div>
                  <div class="g-right-icon right2" v-if="onlineWorkRoom[0]">
                    <p class="firstLine">{{onlineWorkRoom[0].number}}个 <span>{{onlineWorkRoom[0].value}}%</span></p>
                    <p class="secondLine">已接办事大厅</p>
                  </div>
                </i-col>
                <i-col class="g-item-listone" :span="12" @click.native="routerTo({name: 'specialTable',query: {type: 'share',businessBtn:0}})">
                  <div class="g-left-icon itemIcon3"></div>
                  <div class="g-right-icon right3" v-if="accessShared[0]">
                    <p class="firstLine">{{accessShared[0].number}}个 <span>{{accessShared[0].value}}%</span></p>
                    <p class="secondLine">已接共享平台</p>
                  </div>
                </i-col>
              </Row>
            </div>
            <div class="g-cont-item" style="padding-bottom: 0; border: none;">
              <div class="g-item-title">系统建设情况分析</div>
              <Row type="flex" justify="center" align="middle">
                <i-col :span="6" v-for="(item, i) in sysStatusList" :key="i" v-if="waterpoloIsshow">
                  <div @click="routerTo({name: 'specialTable',query: {type: 'build',bussnessCount:bussnessCount,businessBtn:i}})">
                    <waterPolo :option="item"></waterPolo>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
        </div>
        <div class="g-common-model mt15 g-common-model1" :class="{linkHover: overAct === 2}">
          <div class="g-common-title"><i class="icon-title-left"></i>数据资产填报情况<i class="icon-title-right"></i></div>
          <div class="g-common-cont">
            <div class="g-cont-one" @click="routerTo({name: 'specialTable',query: {type: 'already',reportingDepartmentCount:dataAssetsReporting.reportingDepartmentCount,dataRecordTotalCount:dataAssetsReporting.dataRecordTotalCount}})">
              <div class="flex-between">
                <p class="p1">
                  已填报部门：<span>{{dataAssetsReporting.reportingDepartmentCount}}个</span>
                </p>
                <p class="p2">
                  部门总量{{dataAssetsReporting.departmentTotalCount}}个
                </p>
              </div>
              <Progress :percent="dataAssetsReporting.reportingDepartmentCount / dataAssetsReporting.departmentTotalCount * 100" :hide-info='true' :stroke-width='10' status="success" class='g-green-type' />
            </div>
            <Row class="pb15">
              <i-col :span="8" @click.native="routerTo({name: 'specialTable',query: {type: 'already',reportingDepartmentCount:dataAssetsReporting.reportingDepartmentCount,dataRecordTotalCount:dataAssetsReporting.dataRecordTotalCount}})">
                <div class="pos-relative">
                  <div class="pos-absolute g-cursor-box"></div>
                  <pie v-if="pieIsShow" :title="dataAssetsReporting.dataRecordTotalCount + ''" bgColor="#4455a5">
                    <div class="g-pie-infoname">数据记录总数</div>
                  </pie>
                </div>
              </i-col>
              <i-col :span="8" @click.native="routerTo({name: 'specialTable',query: {type: 'completeness',percent:dataAssetsReporting.dataCompletenessPercentage}})">
                <div class="pos-relative circle-tip">
                  <div class="pos-absolute g-cursor-box"></div>
                  <pie v-if="pieIsShow" :title="dataAssetsReporting.dataCompletenessPercentage + '%'" :percent="dataAssetsReporting.dataCompletenessPercentage >> 0">
                    <div class="g-pie-infoname"><img v-if="pieIsShow" :src="hotImg[hotIndex(dataAssetsReporting.dataCompletenessPercentage)].img" alt="">数据完备度</div>
                  </pie>
                  <p class="tip">
                      反映数据填报完整程度的指标，完备度越高，资产填报的完整程度越好，<span>例如省发改委所有业务系统需要填报的字段数是100个，该单位实际填写了98，则该单位业务系统填报的完备度是98%</span>
                  </p>
                </div>
              </i-col>
              <i-col :span="8" @click.native="routerTo({name: 'specialTable',query: {type: 'compliance',percent:100-dataAssetsReporting.dataExceptionPercentage}})">
                <div class="pos-relative circle-tip">
                  <div class="pos-absolute g-cursor-box"></div>
                  <pie v-if="pieIsShow" :title="100-dataAssetsReporting.dataExceptionPercentage + '%'" :percent="100-dataAssetsReporting.dataExceptionPercentage >> 0" percentColor="#c0ab30">
                    <div class="g-pie-infoname"> <img v-if="pieIsShow" :src="hotImg[hotIndex(100-dataAssetsReporting.dataExceptionPercentage)].img" alt=""> 数据合规度</div>
                  </pie>
                  <p class="tip">
                      反映数据填报规范程度的指标，合规度越高，资产填报的数据，越符合系统的规范要求，<span>例如省发改委所有业务系统实际填报的字段数是100个，该单位实际填写字段数中有98个符合系统的规范要求，则该单位业务系统填报的数据合规度是98%</span>
                  </p>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
      <div class="g-right-models">
        <div class="g-model g-model1" :class="{linkHover: overAct === 1}">
          <p class="g-model-title">自有机房</p>
          <div :class="'u-btn-number u-btn' + (i + 1)" v-for="(item, i) in ITBasicData" :key="i" @click="routerTo({name: 'specialTable',query: {type: 'pcRoom', businessBtn: i, serverAllData: ITBasicData.map(o => o.value).toString()}})">
            <p><span>{{item.value}}</span><br>{{item.name}}</p>
          </div>
        </div>
        <div class="g-common-model mt15 g-model2" :class="{linkHover: overAct === 1}">
          <div class="g-common-title"><i class="icon-title-left"></i>云资源<i class="icon-title-right"></i></div>
          <div class="g-common-cont">
            <Row class="g-sign-box">
              <i-col :span="8" @click.native="routerTo({name: 'specialTable', query: {type: 'cloudResources', businessBtn: 0, cpuTotal: cloudResourceInformation.cpu, ramTotal: cloudResourceInformation.ram, romTotal: cloudResourceInformation.rom}})">
                <div class="g-sign" style="color: #01b0ff">{{cloudResourceInformation.cpu}}</div>
                <div class="g-icon-updown dizuo1">
                  <div class="imgAnimate"></div>
                </div>
                <p>CPU(核)</p>
              </i-col>
              <i-col :span="8" @click.native="routerTo({name: 'specialTable', query: {type: 'cloudResources', businessBtn: 1, cpuTotal: cloudResourceInformation.cpu, ramTotal: cloudResourceInformation.ram, romTotal: cloudResourceInformation.rom}})">
                <div class="g-sign" style="color: #18e7b3">{{cloudResourceInformation.ram}}</div>
                <div class="g-icon-updown dizuo2">
                  <div class="imgAnimate"></div>
                </div>
                <p>内存(GB)</p>
              </i-col>
              <i-col :span="8" @click.native="routerTo({name: 'specialTable', query: {type: 'cloudResources', businessBtn: 2, cpuTotal: cloudResourceInformation.cpu, ramTotal: cloudResourceInformation.ram, romTotal: cloudResourceInformation.rom}})">
                <div class="g-sign" style="color: #f6ff00">{{cloudResourceInformation.rom}}</div>
                <div class="g-icon-updown dizuo3">
                  <div class="imgAnimate"></div>
                </div>
                <p>硬盘(T)</p>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="g-common-model mt15 g-model2" :class="{linkHover: overAct === 3}">
          <div class="g-common-title"><i class="icon-title-left"></i>资金投入分析<i class="icon-title-right"></i></div>
          <div class="g-common-cont zijinBox">
            <Row class="g-sign-box" @click.native="routerTo({name: 'specialMoneyUse', query: {}})">
              <i-col :span="8">
                <div class="g-sign">{{CapitalInvestmentData.constructionCost}}</div>
                <div class="g-icon-updown">
                  <div class="imgAnimate"></div>
                </div>
                <p>建设费用(万元)</p>
              </i-col>
              <i-col :span="8">
                <div class="g-sign">{{CapitalInvestmentData.operationCost}}</div>
                <div class="g-icon-updown">
                  <div class="imgAnimate"></div>
                </div>
                <p>运维费用(万元)</p>
              </i-col>
              <i-col :span="8">
                <div class="g-sign">{{CapitalInvestmentData.cloudResourceLeasingCost}}</div>
                <div class="g-icon-updown">
                  <div class="imgAnimate"></div>
                </div>
                <p>云资源租赁费用(万元)</p>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="g-common-model mt15 g-model3" :class="{linkHover: overAct === 3}">
          <div class="g-common-title"><i class="icon-title-left"></i>资金来源分析<i class="icon-title-right"></i></div>
          <div class="g-common-cont">
            <Row>
              <i-col :span="12" v-for="(item, i) in moneyFrom" :key="i" style="display: flex;padding: 20px 4px;" @click.native="routerTo({name: 'specialTable',query: {type: 'sourceanalysis',businessBtn:i}})">
                <div class="g-left-text" :style="`color: ${colors[i]}; padding-right: 3px;border-color: ${colors[i]}`"><span v-if="item.name=='BT项目'"><span>{{item.name.substr(0,1)}}&nbsp;&nbsp;{{item.name.substr(1,1)}}</span>{{item.name.substr(2)}}</span><span v-else>{{item.name}}</span></div>
                <div class="g-right-text ALL-topicFont">
                  <p class="zhanghaishan">¥{{item.money}}万元</p>
                  <p class="zhanghaishan">{{item.percentage}}%</p>
                </div>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
      <div class="g-model g-model-main">
        <Model :propwidth="mainModel.width" :propheight="mainModel.height" :top="mainModel.top" :left="mainModel.left">
          <CenterModel :bussnessCount="bussnessCount" class="cur-p" @linkOver="i => {overAct = i}" @linkOut="overAct = -1" @linkClick="routerToHome(arguments[0])"></CenterModel>
          <div class="g-center-btn" @click="showBlock = true">省直部门<span v-show="names.length"><br>已选{{names.length}}个</span><br><i class="iconfont icon-unfold"></i></div>
        </Model>
      </div>
      <div class="g-center-bottom">
        <div class="g-bottom-title flex-between">
          <p>已选部门</p>
          <div class="g-clear-btn" @click="allClear">清空所选</div>
        </div>
        <div class="g-bottom-conte">
          <div class="g-checked-one" v-for="(item, i) in names" :key="i">{{item}}</div>
        </div>
      </div>
      <Cascader ref="CascaderDom" v-if="showBlock" :cascader="cascader" @upload="init" @close="showBlock = false"></Cascader>
    </div>
  </div>
</template>

<script>
  import {
    fitConfigure,
    FitMethod
  } from "@/utils/fit";
  import Model from "@/components/model";
  import Pie from "@/components/charts/pie";
  import Rose from "@/components/charts/rose";
  import legendItem from "@/components/charts/ring/legendItem";
  import waterPolo from "@/components/charts/waterPolo/waterPolo1";
  import CenterModel from "@/components/TopicCenter";
  import Cascader from "@/components/table/Cascader";
  const COLORS = ["#bf43ff", "#2bd4f8", "#ee4343", "#35e38a"];
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      Model,
      Pie,
      Rose,
      legendItem,
      waterPolo,
      CenterModel,
      Cascader
    },
    data() {
      //这里存放数据
      let query = this.$route.query;
      return {
        // 鼠标滑过的下标， 数据资产填报情况 0， 业务系统1， 总投入资金2， IT基础资源3， 未划过-1
        overAct: -1,
        query,
        names: [],
        colors: COLORS,
        cascader: {
          width: 900,
          height: 549,
          className: "m-indexCascader-box"
          // className:'m-subCascader-box'
        },
        showBlock: false,
        titleModel: {
          img: require("../../../assets/img/special/biaoti.png"),
          left: 728,
          top: 0
        },
        ITBasicData: [{
            name: "机房（个）",
            value: 0
          },
          {
            name: "机房面积（㎡）",
            value: 0
          },
          {
            name: "硬件数量（台）",
            value: 0
          },
          {
            name: "投入资金（万元）",
            value: 0
          }
        ],
        dataAssetsReporting: {
          dataExceptionPercentage: "0.00",
          dataCompletenessPercentage: "0.00",
          reportingDepartmentCount: 0,
          departmentTotalCount: 0,
          dataRecordTotalCount: 0
        },
        pieIsShow: true,
        cloudResourceInformation: {
          cpu: 0,
          ram: 0,
          rom: 0
        },
        CapitalInvestmentData: {
          constructionCost: 0,
          operationCost: 0,
          cloudResourceLeasingCost: 0
        },
        moneyFrom: [],
        specialNet: [],
        moveToCloud: [],
        onlineWorkRoomPieData: [],
        onlineWorkRoomPieTotal: 0,
        onlineWorkRoom: [],
        accessSharedPieData: [],
        accessSharedPieTotal: 0,
        accessShared: [],
        bg: {
          type1: ["#c0ab30", "#a73a43", "#5b2e8d", "#2e81a8"],
          type2: ["#289665", "#a73a43", "#2d59bc", "#332e8d"]
        },
        lengnd1Show: false,
        lengnd2Show: false,
        sysStatusList: [],
        bussnessCount: 0,
        mainModel: {
          width: 546,
          height: 546,
          left: 105,
          top: 125
        },
        hotImg: [{
            img: require("../../../assets/img/icon/score_youxiu.png")
          },
          {
            img: require("../../../assets/img/icon/score_jiaohao.png")
          },
          {
            img: require("../../../assets/img/icon/score_yiban.png")
          },
          {
            img: require("../../../assets/img/icon/score_jiaocha.png")
          },
          {
            img: require("../../../assets/img/icon/score_yujing.png")
          }
        ]
      };
    },
    //监听属性 类似于data概念
    computed: {
      bussnessCountArr() {
        return this.bussnessCount.toString().split("");
      }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      init(query, names = []) {
        if (query) {
          this.query = query;
          this.showBlock = false;
          this.names = names;
        } else {
          this.query = {
            sysOrgCode: ''
          };
        }
        this.getItResourcesData();
        this.getDataAssetsReporting();
        this.getCapitalInvestmentData();
        this.getSourceFundsData();
        this.getSpecialNet();
        this.getMoveToCloud();
        this.getJrwsbsdtCloud();
        this.getJrgxptGroup();
        this.getSysStatus();
        this.getCloudResourceInformation();
      },
      allClear() {
        this.names = [];
        let checkedNames = {},
          checkedObj = {}
        window.localStorage.setItem('checked', JSON.stringify({
          checkedNames,
          checkedObj
        }));
        let {
          params,
          name
        } = this.$route;
        let query = {
          sysOrgCode: '-1'
        };
        this.$router.replace({
          name,
          params,
          query: { ...this.$route.query,
            ...query
          }
        })
        this.init(query);
      },
      routerToHome(idx) {
        let query = {
          action: 1
        };
        if(idx==3) return;
        let urlname = ["businessDepartment", "ITdepartment", "warningDepartment", ""][idx];
        let name = ['业务系统分析', 'IT基础资源分析', '资产填报预警'][idx];
        let isJurisdiction = false; // 判断是否有权限查看该模块
        let this_ = this;
        function searchRouteName(list){
          for (let index = 0; index < list.length; index++) {
            if (urlname&& urlname === list[index].shorthref) {
              isJurisdiction = true;
              window.sessionStorage.setItem('openUrl', urlname);
              let routeData = this_.$router.resolve({
                name: urlname,
                query
              });
              this_.$store.commit('get_bread', {
                path: urlname,
                name: name
              });
              window.open(routeData.href, "_blank");
            }
            list[index].children.length && searchRouteName(list[index].children);
          }

        }
        searchRouteName(this.$store.state.homeRouterList)
        if (isJurisdiction == false) {
            this.$Message.info('Sorry，您没有权限查看');
          }
      },
      routerTo({
        name,
        query
      }) {
        let routeData = this.$router.resolve({
          name,
          query: {
            ...query,
            sysOrgCode: this.query.sysOrgCode.toString()
          }
        });
        window.open(routeData.href, "_blank");
      },
      getOrgs(showAll) {
        let {
          sysOrgCode,
          orgNames
        } = JSON.parse(window.localStorage.getItem('checked') || '{}');
        let fn = (query, orgNames) => {
          if(query.sysOrgCode.length === 0){
            query.sysOrgCode = -1;
          }
          let {
            name
          } = this.$route;
          this.init(query, orgNames);
          this.$router.replace({
            name,
            query: {
              sysOrgCode: query.sysOrgCode.toString()
            }
          });
        }
        if (showAll || !sysOrgCode) {
          this.$api.special.getOrgs().then(res => {
            sysOrgCode = res.data.map(o => o.sysOrgCode);
            orgNames = res.data.map(o => o.name)
            window.localStorage.setItem('checked', JSON.stringify({
              sysOrgCode,
              orgNames
            }))
            window.localStorage.setItem('allOrg', JSON.stringify(sysOrgCode));
            fn({
              sysOrgCode
            }, orgNames);
          });
        } else {
          fn({
            sysOrgCode
          }, orgNames);
        }
      },
      // 云资源
      getCloudResourceInformation() {
        this.$api.special
          .getCloudResourceInformation({ ...this.query
          })
          .then(res => {
            if (res) {
              this.cloudResourceInformation = res
            } else {
              this.cloudResourceInformation = {
                cpu: 0,
                ram: 0,
                rom: 0
              }
            }
            // let nums = ["cpu", "ram", "rom"];
            // res.data.forEach(o => {
            //   this.cloudResourceInformation[nums[o.type - 1]] = o.size;
            // });
          });
      },
      // IT基础资源接口统计
      getItResourcesData() {
        this.$api.special
          .getItResourcesData({
            ...this.query
          })
          .then(res => {
            let values = [
              "computerRoomCount",
              "storageResourcesCount",
              "serverCount",
              "memoryResourcesCount"
            ];
            let names = this.ITBasicData.map(o => o.name);
            this.ITBasicData = values.map((o, i) => ({
              name: names[i],
              value: res.data && res.data[o]
            }));
          });
      },
      // 获取数据资产填报情况
      getDataAssetsReporting() {
        this.$api.special
          .getDataAssetsReporting({
            ...this.query
          })
          .then(res => {
            this.pieIsShow = false;
            this.$nextTick(() => {
              this.pieIsShow = true;
              this.dataAssetsReporting = res;
            });
          });
      },
      // 资金投入分析
      getCapitalInvestmentData() {
        this.$api.special
          .getCapitalInvestmentData({
            ...this.query
          })
          .then(res => {
            if(res){
              this.CapitalInvestmentData = res
            }else{
              this.CapitalInvestmentData = {
                constructionCost: 0,
                operationCost: 0,
                cloudResourceLeasingCost: 0
              }
            }
          });
      },
      // 资金来源
      getSourceFundsData() {
        this.$api.special
          .getSourceFundsData({
            ...this.query
          })
          .then(res => {
            if (!res) {
              res = {
                data: []
              };
            }
            let nameKeys = ["财政拨款", "自筹项目", "BT项目", "其他项目"];
            let types = res.data.map(o => o.type);
            this.moneyFrom = nameKeys.map((item, i) => {
              let idx = types.indexOf(i + 1);
              let obj = {
                money: "0.00",
                percentage: "0.00",
                name: item
              };
              if (idx > -1) {
                obj = {
                  ...obj,
                  ...res.data[idx]
                };
              }
              return obj;
            });
          });
      },
      // 专网系统分析
      getSpecialNet() {
        this.$api.special
          .sfSpecialNet({
            ...this.query
          })
          .then(res => {
            let counts = ["specialNetCount", "otherNetCount", "unknownCount"];
            let percents = [
              "specialNetPercent",
              "otherNetPercent",
              "unknownPercent"
            ];
            this.specialNet = counts.map((o, i) => ({
              count: res[o],
              percent: parseFloat(res[percents[i]])
            }));
          });
      },
      // 迁云状态分析
      getMoveToCloud() {
        this.$api
          .sfQyunGroup({
            ...this.query
          })
          .then(res => {
            let nameKeys = ["已迁云", "计划迁云", "不迁云", "未反馈"];
            let types = res.data.map(o => o.title);
            this.moveToCloud = nameKeys.map((item, i) => {
              let idx = types.indexOf(item);
              let obj = {
                num: 0,
                percent: "0.00",
                title: item
              };
              if (idx > -1) {
                obj = {
                  ...obj,
                  ...res.data[idx]
                };
              }
              return obj;
            });
          });
      },
      // 接入网上办事大厅
      getJrwsbsdtCloud() {
        this.$api.special
          .sfJrswsbsdtGroup({
            ...this.query
          })
          .then(res => {
            let nameKeys = ["已接入", "计划接入", "未接入", "未反馈"];
            let types = res.data.map(o => o.title);
            let res1 = res.data.map((o, i) => ({
              name: o.title,
              number: o.num,
              value: o.percent
            }));
            let res2 = res.data.map((o, i) => ({
              name: o.title,
              value: o.num
            }));
            this.onlineWorkRoom = nameKeys.map((o, i) => {
              let idx = types.indexOf(o);
              let obj = {
                name: o,
                number: 0,
                value: "0.00"
              };
              if (idx > -1) {
                obj = {
                  ...obj,
                  ...res1[idx]
                };
              }
              return obj;
            });
            this.onlineWorkRoomPieData = nameKeys.map((o, i) => {
              let idx = types.indexOf(o);
              let obj = {
                name: o,
                value: 0
              };
              if (idx > -1) {
                obj = {
                  ...obj,
                  ...res2[idx]
                };
              }
              return obj;
            });
            this.bussnessCount = res.data && res.data[0] && res.data[0]["total"] || 0;
            this.onlineWorkRoomPieTotal = res.data && res.data[0] && res.data[0]["total"] || 0;
            this.lengnd1Show = true;
          });
      },
      // 接入共享平台情况
      getJrgxptGroup() {
        this.$api.special
          .exchangeGroup({
            ...this.query
          })
          .then(res => {
            let nameKeys = ["已接入", "计划接入", "未接入", "未反馈"];
            let types = res.data.map(o => o.title);
            let res1 = res.data.map((o, i) => ({
              name: o.title,
              number: o.num,
              value: o.percent
            }));
            let res2 = res.data.map((o, i) => ({
              name: o.title,
              value: o.num
            }));
            this.accessShared = nameKeys.map((o, i) => {
              let idx = types.indexOf(o);
              let obj = {
                name: o,
                number: 0,
                value: "0.00"
              };
              if (idx > -1) {
                obj = {
                  ...obj,
                  ...res1[idx]
                };
              }
              return obj;
            });
            this.accessSharedPieData = nameKeys.map((o, i) => {
              let idx = types.indexOf(o);
              let obj = {
                name: o,
                value: 0
              };
              if (idx > -1) {
                obj = {
                  ...obj,
                  ...res2[idx]
                };
              }
              return obj;
            });
            this.accessSharedPieTotal = res.data && res.data[0] && res.data[0]["total"];
            this.lengnd2Show = true;
          });
      },
      // 系统建设情况分析
      getSysStatus() {
        this.waterpoloIsshow = false;
        this.$api.special
          .sysStatus({
            ...this.query
          })
          .then(res => {
            this.waterpoloIsshow = true;
            let statusKey = [
              "built",
              "underConstruction",
              "proposedConstruction",
              "unknown"
            ];
            let statusName = ["已建系统", "在建系统", "拟建系统", "未反馈"];
            let total = res.total || 1;
            this.sysStatusList = statusKey.map((o, i) => ({
              title: statusName[i],
              value: (res[o] || 0) * 100 / total,
              num: res[o] || 0
            }));
          });
      },
      /* 获得hot下标 */
      hotIndex(e) {
        if (e >= 0 && e <= 20) {
          return 4;
        } else if (e > 20 && e <= 40) {
          return 3;
        } else if (e > 40 && e <= 60) {
          return 2;
        } else if (e > 60 && e <= 80) {
          return 1;
        } else if (e > 80 && e <= 100) {
          return 0;
        }
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      let {
        type,
        position,
        crop
      } = fitConfigure();
      let {
        width,
        height,
        left = 0,
        top = 0
      } = {
        width: 1920,
        height: 1080
      };
      let outerDom = this.$refs.specialIndex;
      // 自适应功能
      window.eventBus.$on("RESIZE", function resize() {
        FitMethod[type](outerDom, width, height, left, top, position);
      });
      FitMethod[type](outerDom, width, height, left, top, position);
    },
    created() {
      this.getOrgs();
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
  };
</script>

<style>
  .ALL-topicFont * {
    font-family: zhanghaishan;
  }
  body {
    background: #000d22 !important;
  }
</style>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .special-index {
    position: relative;
    width: 1920px;
    height: 1080px;
    perspective: 1920px;
    background: url(../../../assets/img/special/bg.jpg) center no-repeat;
    font-size: 16px;
  }
  .g-title-text {
    cursor: pointer;
    color: #fff;
    font-size: 32px;
    text-align: center;
    line-height: 58px;
    font-family: zhanghaishan;
  }
  .g-left-models {
    width: 500px;
    top: 40px;
    left: 40px;
    position: absolute;
    transform-origin: 0 0;
    -webkit-transform: rotateY(20deg);
    transform: rotateY(20deg);
  }
  .g-right-models {
    width: 500px;
    top: 40px;
    right: 40px;
    position: absolute;
    transform-origin: right top;
    -webkit-transform: rotateY(-20deg);
    transform: rotateY(-20deg);
  }
  .g-model4,
  .g-model5 {
    .g-common-cont {
      padding-top: 18px;
      padding-bottom: 18px;
    }
  }
  .g-model2 {
    .g-common-cont {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
  .g-model {
    width: 500px;
  }
  .g-model1 {
    height: 218px;
    position: relative;
    background: url(../../../assets/img/special/ityuan.png) center no-repeat;
    .g-model-title {
      position: absolute;
      text-align: center;
      height: 30px;
      line-height: 30px;
      width: 100%;
      top: 50%;
      margin-top: -15px;
      color: #fff;
      font-size: 24px;
    }
  }
  .g-model6 {
    position: absolute;
    width: 750px;
    top: 850px;
    left: 50%;
    margin-left: -375px;
  }
  .g-model-main {
    position: absolute;
    width: 750px;
    top: 86px;
    left: 50%;
    margin-left: -375px;
    transition: all .3s ease-in-out;
  }
  .g-model-main.noselect {
    transform: scale(1.2, 1.2);
  }
  .g-common-model1 {
    left: 40px;
    top: 280px;
  }
  .g-common-model2 {
    right: 40px;
    top: 520px;
  }
  .g-common-model3 {
    right: 40px;
    top: 800px;
  }
  .u-btn-number {
    width: 240px;
    height: 99px;
    position: absolute;
    cursor: pointer;
    p {
      text-align: center;
      padding: 20px 0;
      line-height: 34px;
      font-size: 16px;
      color: #9ed7ff;
      span {
        font-family: "zhanghaishan";
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .linkHover .u-btn-number.u-btn1 {
    background-image: url(../../../assets/img/special/jifang2.png);
  }
  .linkHover .u-btn-number.u-btn2 {
    background-image: url(../../../assets/img/special/fuwuqi2.png);
  }
  .linkHover .u-btn-number.u-btn3 {
    background-image: url(../../../assets/img/special/cunchuziyuan2.png);
  }
  .linkHover .u-btn-number.u-btn4 {
    background-image: url(../../../assets/img/special/neicunziyuan2.png);
  }
  .u-btn-number.u-btn1 {
    p {
      padding-right: 34px;
    }
    left: 0;
    top: 0;
    background: url(../../../assets/img/special/jifang1.png);
    &:hover {
      background-image: url(../../../assets/img/special/jifang2.png);
    }
  }
  .u-btn-number.u-btn2 {
    p {
      padding-left: 34px;
    }
    right: 0;
    top: 0;
    background: url(../../../assets/img/special/fuwuqi1.png);
    &:hover {
      background-image: url(../../../assets/img/special/fuwuqi2.png);
    }
  }
  .u-btn-number.u-btn3 {
    p {
      padding-right: 34px;
    }
    left: 0;
    bottom: 0;
    background: url(../../../assets/img/special/cunchuziyuan1.png);
    &:hover {
      background-image: url(../../../assets/img/special/cunchuziyuan2.png);
    }
  }
  .u-btn-number.u-btn4 {
    p {
      padding-left: 34px;
    }
    right: 0;
    bottom: 0;
    background: url(../../../assets/img/special/neicunziyuan1.png);
    &:hover {
      background-image: url(../../../assets/img/special/neicunziyuan2.png);
    }
  }
  @font-face {
    font-family: "zhanghaishan";
    src: url("../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.ttf") format("truetype"), url("../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff"), url("../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff2"), url("../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.svg"), url("../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.eot"), url("../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.otf");
  }
  .g-common-title {
    height: 49px;
    line-height: 49px;
    text-align: center;
    color: #9ed7ff;
    font-size: 20px;
    i {
      display: inline-block;
      margin-top: -3px;
      vertical-align: middle;
      width: 21px;
      height: 19px;
      background-repeat: no-repeat;
    }
    .icon-title-left {
      margin-right: 10px;
      background-image: url(../../../assets/img/special/left.png);
    }
    .icon-title-right {
      margin-left: 10px;
      background-image: url(../../../assets/img/special/right.png);
    }
  }
  .g-model2,
  .g-model3,
  .g-model4,
  .g-model5,
  .g-common-model {
    &:hover .icon-title-left {
      background-image: url(../../../assets/img/special/left2.png);
    }
    &:hover .icon-title-right {
      background-image: url(../../../assets/img/special/right2.png);
    }
  }
  .linkHover.g-common-model {
    box-shadow: 0 0 5px #0037ff, 0 0 5px #0037ff, 0 0 5px #0037ff;
    .icon-title-left {
      background-image: url(../../../assets/img/special/left2.png);
    }
    .icon-title-right {
      background-image: url(../../../assets/img/special/right2.png);
    }
  }
  .g-common-model {
    cursor: pointer;
    width: 500px;
    border: 1px solid #1a5182;
    transition: all 0.1s ease-in-out;
    &:hover {
      box-shadow: 0 0 5px #0037ff, 0 0 5px #0037ff, 0 0 5px #0037ff;
    }
    .g-common-title {
      border-bottom: 1px solid #1a5182;
      background: rgba(158, 215, 255, 0.1);
    }
    .g-cont-one {
      padding: 16px;
      .flex-between {
        align-items: center;
      }
      .p1 {
        font-size: 16px;
        color: #9ed7ff;
        span {
          font-size: 18px;
          color: #fff;
          opacity: 0.85;
          font-family: zhanghaishan;
        }
      }
      .p2 {
        font-size: 14px;
        color: #ccd1e7;
      }
    }
    .g-pie-infoname {
      width: 100%;
      font-size: 16px;
      text-align: center;
      position: relative;
      img {
        position: absolute;
        top: -85px;
        left: 20px;
      }
    }
  }
  .g-one-progress {
    padding: 6px 0;
    .flex-between p {
      span {
        font-family: zhanghaishan;
      }
    }
    &:hover .flex-between {
      color: red;
    }
  }
  .g-number-box {
    .g-one-num {
      width: 50px;
      height: 58px;
      line-height: 58px;
      text-align: center;
      color: #fff;
      font-size: 42px;
      font-weight: 900;
      border-radius: 4px;
      border: solid 1px #1d6dac;
      opacity: 1;
      font-family: "zhanghaishan";
      margin: 0 10px;
      background-image: linear-gradient( 90deg, rgba(29, 109, 172, 0.5) 0%, rgba(170, 212, 255, 0) 50%, rgba(29, 109, 172, 0.5) 100%);
    }
  }
  .g-left-text {
    width: 56px;
    height: 46px;
    font-size: 22px;
    border-right: 2px solid;
    line-height: 23px;
    margin-right: 10px;
    flex: none;
  }
  .g-right-text {
    font-size: 18px;
    line-height: 24px;
    p {
      white-space: nowrap;
    }
  }
  .noselect .g-center-btn {
    padding-top: 70px;
  }
  .g-center-btn {
    padding: 50px 0;
    width: 178px;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -89px;
    margin-top: -89px;
    span {
      color: #fe9a0a;
      font-size: 18px;
    }
  }
  .g-sign-box {
    text-align: center;
    .g-sign {
      font-family: zhanghaishan;
      color: #5af1f4;
      font-size: 20px;
      text-align: center;
    }
    .g-icon-updown {
      display: inline-block;
      width: 103px;
      height: 144px;
      background: url(../../../assets/img/special/jianshefeiyong.png) center bottom no-repeat;
      margin-top: -30px;
      .imgAnimate {
        width: 22px;
        height: 22px;
        background: url(../../../assets/img/icon/money_icon.png) center no-repeat;
        margin: 40px auto 0;
      }
    }
    .g-icon-updown.dizuo1 {
      height: 120px;
      background-image: url(../../../assets/img/icon/dizuo1.png);
      .imgAnimate {
        background-image: url(../../../assets/img/icon/CPU_icon.png);
      }
    }
    .g-icon-updown.dizuo2 {
      height: 120px;
      background-image: url(../../../assets/img/icon/dizuo2.png);
      .imgAnimate {
        background-image: url(../../../assets/img/icon/memor_icon.png);
      }
    }
    .g-icon-updown.dizuo3 {
      height: 120px;
      background-image: url(../../../assets/img/icon/dizuo3.png);
      .imgAnimate {
        background-image: url(../../../assets/img/icon/harddisk_icon.png);
      }
    }
    p {
      white-space: nowrap;
    }
  }
  .g-common-cont {
    padding: 0 20px;
    .g-cont-item {
      .g-item-title {
        text-align: center;
        font-size: 18px;
        color: #98c6fc;
        line-height: 50px;
      }
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,
      255,
      255,
      0.1);
      .g-item-one {
        .g-item-listone {
          display: flex;
          padding: 20px 4px;
          align-items: center;
        }
        .g-left-icon {
          width: 44px;
          height: 40px;
          margin-right: 10px;
        }
        .g-left-icon.itemIcon0 {
          background: url(../../../assets/img/icon/item_icon0.png);
        }
        .g-left-icon.itemIcon1 {
          background: url(../../../assets/img/icon/item_icon1.png);
        }
        .g-left-icon.itemIcon2 {
          background: url(../../../assets/img/icon/item_icon2.png);
        }
        .g-left-icon.itemIcon3 {
          background: url(../../../assets/img/icon/item_icon3.png);
        }
        .g-right-icon .firstLine {
          font-size: 28px;
        }
        .g-right-icon .secondLine {
          font-size: 16px;
          color: #c5f9ff;
        }
        .g-right-icon {
          span {
            font-size: 14px;
            border-radius: 4px;
            padding: 0 5px;
          }
        }
        .g-right-icon.right0 {
          span {
            border: 1px solid #ab0afe;
            color: #ab0afe;
          }
        }
        .g-right-icon.right1 {
          span {
            border: 1px solid #18e7b3;
            color: #18e7b3;
          }
        }
        .g-right-icon.right2 {
          span {
            border: 1px solid #c2f629;
            color: #c2f629;
          }
        }
        .g-right-icon.right3 {
          span {
            border: 1px solid #76c4ff;
            color: #76c4ff;
          }
        }
      }
    }
  }
  .zhanghaishan {
    font-family: "zhanghaishan";
  }
  .g-legenditem-font /deep/ .legendItem ul li span {
    font-size: 16px;
    opacity: 0.85;
  }
  .g-legenditem-font /deep/ .legendItem ul li {
    &:hover span {
      color: red;
    }
  }
  .g-text-info {
    color: #fe9a0a;
    font-size: 14px;
    line-height: 34px;
    text-align: center;
  }
  .imgAnimate {
    position: relative;
    animation: updown 3s 0s ease-in-out infinite;
  }
  .g-center-bottom {
    position: absolute;
    width: 790px;
    left: 50%;
    bottom: 50px;
    margin-left: -395px;
    height: 216px;
    border: 1px solid #1a5182;
    border-top-width: 5px;
    padding: 10px 24px;
    z-index: -10;
    .g-bottom-title {
      line-height: 46px;
      font-size: 18px;
      color: #9ed7ff;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      .g-clear-btn {
        height: 26px;
        line-height: 26px;
        border-radius: 4px;
        color: #fe9a0a;
        font-size: 14px;
        padding: 0 5px;
        border: 1px solid #fe9a0a;
        cursor: pointer;
      }
    }
    .g-bottom-conte {
      margin-top: 10px;
      overflow-y: scroll;
      height: 114px;
      &::-webkit-scrollbar //滚动条整体部分
      {
        width: 3px;
        height: 10px;
        background-color: rgba(0, 0, 0, 0);
      }
      &::-webkit-scrollbar-track //scroll轨道背景
      {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0);
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #0e45d0;
      }
      .g-checked-one {
        font-size: 14px;
        float: left;
        margin: 0 9px 9px 0;
        height: 20px;
        line-height: 20px;
        background: rgba(14, 69, 208, 0.5);
        padding: 0 10px;
        border-radius: 4px;
      }
    }
  }
  @keyframes updown {
    0% {
      top: -10px;
    }
    50% {
      top: 0;
    }
    100% {
      top: -10px;
    }
  }
  .g-cursor-box {
    width: 100%;
    height: 150px;
    cursor: pointer;
    z-index: 100000;
    left: 0;
    top: 0;    
  }
  .circle-tip{
    .tip {
        @include font($fz: 14px, $color:rgba(255, 255, 255, 0.6));
        position: absolute;
        right: -368px;
        top: 7px;
        width: 400px;
        height: 90px;
        padding: 3px;
        background-color: #071c43;
        border-radius: 4px;
        border: solid 1px #1a78c9;
        display: none;
        z-index: 10;
        span{
          color:yellow;
        }
    }
  }
  .circle-tip:hover{
    border-color: #00ffe7;
    .tip{
        display: block;
      }
  }
  
</style>