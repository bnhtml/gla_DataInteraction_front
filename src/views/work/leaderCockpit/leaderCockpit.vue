// 领导驾驶舱
<template>
  <div class='leaderCockpit relative' id='leaderCockpit'>
    <!-- 水球 -->
    <Row class='row-header'>
      <i-col span='6' v-for='(v,i) in cardTopList' :key='i'>
        <dl @click='toAssetAnalysis(i)'>
          <dt><img :src="v.img" alt=""></dt>
          <dd>
            <ul>
              <li>{{v.en}}</li>
              <li>{{v.cn}}</li>
            </ul>
            <p v-if='i!=0'> <label>{{v.value}}</label> <span>{{v.type}}</span> </p>
            <p v-if='i==0'>
              <i-circle :percent="Number(v.value)" dashboard stroke-color='rgba(255,255,255,0.85)' trail-color='rgba(255,255,255,0.2)'>
                <span class="demo-circle-inner" style="font-size:24px">{{v.value}}</span>
              </i-circle>
            </p>
          </dd>
        </dl>
      </i-col>
    </Row>
    <!--  <Row class='row-header'>
                        <i-col span="6">
                          <Card>
                            <div>
                              <dl>
                                <dt>资产填报预警指数</dt>
                                <dd style='padding-top:5px' @click='toAssetAnalysis'>
                                  <gauge :option='gauge' v-if='this.gauge.isShow'></gauge>
                                </dd>
                              </dl>
                            </div>
                          </Card>
                        </i-col>
                        <i-col span="6" v-for='(v,i) in waterPlolList' :key='i'>
                          <Card>
                            <div>
                              <dl>
                                <dt>{{v.title}}</dt>
                                <dd @click='toResources'>
                                  <waterPlol :option='v'></waterPlol>
                                </dd>
                              </dl>
                            </div>
                          </Card>
                        </i-col>
                      </Row> -->
    <!-- 地图 -->
    <Row class='row-map '>
      <i-col span="18">
        <Card class="relative">
          <div>
            <dl>
              <dt>
                    <!-- 业务系统投入资金热力图 -->
                    业务系统情况
                  </dt>
              <dd>
                <Row class="row-card">
                  <i-col span="6">
                    <!-- <router-link :to="{name: 'businessTotal'}"> -->
                    <div class="leftOneBox" @click="goBusinessTotal">
                      <cardBlue :title='"已建系统总量及百分比"' class="mb30">
                        <dd class="dd-num">
                          <p :style="{'color':'#5AC426'}"> <b>{{cardInfo.total}}</b>个 </p>
                          <Progress :percent="100" :hide-info='true' :stroke-width='8' status="success" class='ivu-progress ivu-progress-success' />
                        </dd>
                      </cardBlue>
                    </div>
                    <!-- </router-link> -->
                  </i-col>
                  <i-col span="6">
                    <!-- <router-link :to="{name: 'businessTotal'}"> -->
                    <div class="leftOneBox" @click="goBusinessTotal">
                      <cardBlue :title='"在建系统总量及百分比"' class="mb30">
                        <dd class="dd-num">
                          <p :style="{'color':'#5AC426'}"> <b>{{cardInfo.usable}}</b>个 <span v-if='cardInfo.usable!=100'>{{cardInfo.usablePercent}}%</span></p>
                          <Progress :percent="Number(cardInfo.usablePercent)" :hide-info='true' :stroke-width='8' status="success" class='ivu-progress ivu-progress-success' />
                        </dd>
                      </cardBlue>
                    </div>
                    <!-- </router-link> -->
                  </i-col>
                  <i-col span="6">
                    <!-- <router-link :to="{name: 'businessTotal'}"> -->
                    <div class="leftOneBox" @click="goBusinessTotal">
                      <cardBlue :title='"拟建系统总量及百分比"' class="mb30">
                        <dd class="dd-num">
                          <p :style="{'color':'rgb(196, 135, 38)'}"> <b>{{cardInfo.corpse}}</b>个 <span v-if='cardInfo.corpsePercent!=100'>{{cardInfo.corpsePercent}}%</span></p>
                          <Progress :percent="Number(cardInfo.corpsePercent)" :hide-info='true' :stroke-width='8' status="success" class='ivu-progress ivu-progress-wrong' />
                        </dd>
                      </cardBlue>
                    </div>
                    <!-- </router-link> -->
                  </i-col>
                  <i-col span="6">
                    <!-- <router-link :to="{name: 'businessTotal'}"> -->
                    <div class="leftOneBox" @click="goBusinessTotal">
                      <cardBlue :title='"未反馈总量及百分比"' class="mb30">
                        <dd class="dd-num">
                          <p :style="{'color':'#5AC426'}"> <b>{{cardInfo.build}}</b>个 <span v-if='cardInfo.buildPercent!=100'>{{cardInfo.buildPercent}}%</span></p>
                          <Progress :percent="Number(cardInfo.buildPercent)" :hide-info='true' :stroke-width='8' status="success" class='ivu-progress ivu-progress-success ' />
                        </dd>
                      </cardBlue>
                    </div>
                    <!-- </router-link> -->
                  </i-col>
                </Row>
                <div class="map-wrapper">
                  <Map :jsonCode="map.jsonCode" :width="map.width" :height="map.height" @mapClick="handelClick"></Map>
                </div>
              </dd>
            </dl>
          </div>
          <Spin size="large" fix v-if="map.loading">
            <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
          </Spin>
        </Card>
      </i-col>
      <i-col span="6">
        <Card v-for='(v,i) in situationList.length?situationList:3' :key='i'>
          <div>
            <dl>
              <dt>{{v.title||'暂无数据'}}</dt>
              <dd>
                <label style='cursor: pointer;' @click='toLeaderCockpitTable'>
                      <i-circle v-if='v.list.length' :percent="Number(v.list&&v.list[0].percent)" :size='100' stroke-color='#279599' trail-color='#293d6f' stroke-linecap='square'>
                          <span class="demo-Circle-inner" >{{v.list[0].percent }}%</span>
                      </i-circle>
                      <i-circle v-else :percent="100" :size='100' stroke-color='#279599' trail-color='#293d6f' stroke-linecap='square'>
                        <span class="demo-Circle-inner" >——</span>
                      </i-circle> 
                    </label>
                <span class="span-right">
                     <p  v-for='(val,ind) in v.list' :key='ind' v-if="v&&val.title&&val.title != '未反馈'">
                        {{val.title}} 
                        <span>{{(val.num).toFixed(2)}}</span>
                <b class='sub' v-if='ind == 0'></b>
                <b class='sup' v-if='ind == 1'></b>
                <b class='circle' v-if='ind == 2'></b>
                </p>
                </span>
              </dd>
            </dl>
          </div>
        </Card>
      </i-col>
    </Row>
    <!-- 资金部分 -->
    <Row cLass='row-money'>
      <i-col span="12">
        <Card>
          <div>
            <dl>
              <dt>资金投入走势图 </dt>
              <dd>
                <p class="title-item">
                  <span :style='{color:line.color[0]}'> <label>{{line.legendData[0]}}费用</label> <br>{{line.constructionCost.sum | number_format(2)}}万元</span>
                  <span :style='{color:line.color[1]}'><label>{{line.legendData[1]}}费用</label><br>{{line.operationCost.sum | number_format(2)}}万元/每年</span>
                </p>
                <lineItem :line="line" :series="line.series"></lineItem>
              </dd>
            </dl>
          </div>
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <div class='relative'>
            <dl>
              <dt>资金来源分析</dt>
              <dd>
                <p>
                  <RadioGroup v-model="radio" type="button" @on-change='changeRadio'>
                    <Radio label="全部费用"></Radio>
                    <Radio label="业务系统"></Radio>
                    <Radio label="IT基础资源"></Radio>
                  </RadioGroup>
                </p>
                <Row class='ring-wrapper' style='cursor: pointer;'>
                  <i-col span='12'>
                    <div @click='goRouters'>
                      <ring v-if='capitalSource.isShow' :data='capitalSource.data' :labelColor='capitalSource.labelColor' :color='capitalSource.color' :title='capitalSource.title' :hasLabel='capitalSource.hasLabel'></ring>
                    </div>
                  </i-col>
                  <i-col span='12'>
                    <legendItem :legendData='capitalSource.data' :bg='capitalSource.color'></legendItem>
                  </i-col>
                </Row>
              </dd>
            </dl>
          </div>
          <Spin size="large" fix v-if="!capitalSource.isShow">
            <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
          </Spin>
        </Card>
      </i-col>
    </Row>
    <Spin size="large" fix v-if="!capitalSource.isShow">
      <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
    </Spin>
  </div>
</template>

<script>
  import waterPlol from "@/components/charts/waterPolo/waterPolo.vue";
  import gauge from "@/components/charts/gauge/gauge.vue";
  import cardBlue from "@/components/cardBlue/cardBlue.vue";
  import lineItem from "@/components/charts/line/line.vue";
  import Map from "@/components/charts/map";
  import ring from "@/components/charts/ring/ring.vue";
  import legendItem from "@/components/charts/ring/legendItem.vue";
  export default {
    name: "leaderCockpit",
    data() {
      return {
        // allLoading: true,
        radio: "全部费用",
        waterPlolList: [], // 水球数据
        waterColor: ["#be5939", "#06a1d8", "#d30737"],
        gauge: {
          value: "0",
          title: "资产填报预警指数",
          isShow: false
        },
        map: {
          jsonCode: "guizhou",
          width: 650,
          height: 460,
          loading: false
        },
        situationList: [{
            title: "省级共享交换平台接入情况",
            list: []
          },
          {
            title: "省网上办事大厅接入情况",
            list: []
          },
          {
            title: "业务系统迁云情况",
            list: []
          }
        ], // 右侧各个系统接入情况
        cardInfo: {}, //卡片数据 各个系统总量
        line: {
          isShowSymbol: false,
          legendData: ["建设", "运维"],
          xAxisData: [],
          color: ["#5AC426", "#D95450"],
          series: [{
              name: "建设",
              type: "line",
              stack: 0,
              showSymbol: false,
              data: [],
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
              data: [],
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
            list: [],
            sum: 0
          },
          constructionCost: {
            list: [],
            sum: 0
          },
          width: 500,
          height: 250
        },
        searchLeft: "", // 资金走势图
        searchLeftList: [{
            value: "666",
            label: "123"
          },
          {
            value: "134",
            label: "345"
          }
        ],
        capitalSource: {
          data: [{
              name: '财政拨款',
              value: 0,
              number: 0
            },
            {
              name: '自筹',
              value: 0,
              number: 0
            },
            {
              name: 'BT项目',
              value: 0,
              number: 0
            },
            {
              name: '其他',
              value: 0,
              number: 0
            },
            {
              name: '未反馈',
              value: 0,
              number: 0
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
            "#9c8ae7",
            "transparent"
          ],
          color: ["#FF644F", "#ced866", "#3FC2BD", "#4082da", "#9c8ae7"],
          hasLabel: false,
          isShow: false,
          title: {
            num: '',
          }
        },
        cardTopList: [{
            img: require('../../../assets/img/bg/leader_02.png'),
            en: 'Asset reporting early warning index',
            cn: '资产填报预警指数',
            value: '0',
            type: ''
          },
          {
            img: require('../../../assets/img/bg/leader_04.png'),
            en: 'CPU resource usage',
            cn: 'CPU资源使用情况',
            value: '0',
            type: '核'
          },
          {
            img: require('../../../assets/img/bg/leader_01.png'),
            en: 'Memory resource usage',
            cn: '内存资源使用情况',
            value: '0',
            type: 'GB'
          },
          {
            img: require('../../../assets/img/bg/leader_03.png'),
            en: 'Hide disk resource usage',
            cn: '硬盘资源使用情况',
            value: '0',
            type: 'T'
          }
        ],
      };
    },
    components: {
      waterPlol,
      gauge,
      cardBlue,
      lineItem,
      Map,
      ring,
      legendItem
    },
    mounted() {
      this.handelClick('返回首页');
      this.getExchangeGroup();
      this.getSfJrswsbsdtGroup();
      this.getSfQyunGroup();
      this.getEarlyWarning();
      this.getWaterPlolList();
      this.getCapitalSource(this.radio); // OK
      this.getLine();
    },
    methods: {
      /* 共享交换平台接入情况 */
      getExchangeGroup() {
        this.$api.exchangeGroup().then(res => {
          this.situationList[0].list = res.data;
          this.situationList[0].title = '省级' + '共享交换平台接入情况';
        })
      },
      /* 网上办事大厅接入情况 */
      getSfJrswsbsdtGroup() {
        this.$api.sfJrswsbsdtGroup().then(res => {
          this.situationList[1].list = res.data;
          this.situationList[1].title = '省' + '网上办事大厅接入情况';
        });
      },
      /* 业务系统迁云情况 */
      getSfQyunGroup() {
        this.$api.sfQyunGroup().then(res => {
          
          this.situationList[2].list = res.data;
          this.situationList[2].title = '业务系统迁云情况';
        });
      },
      /* 卡片-各个系统总量 */
      getProgressList(e) {
        this.$api.sfUseGroup({
          areaids: e
        }).then(res => {
          this.cardInfo = res;
          this.map.loading = false;
        })
      },
      /* 资源剩余  - 水球 */
      getWaterPlolList() {
        let params = {
          resourceStatus: 1 // 使用资源
        };
        this.$api.getResourceSurplus(params).then(res => {
          if (res.data.length == 0) return;
          this.cardTopList[1].value = res.data[0].size
          this.cardTopList[2].value = res.data[1].size
          this.cardTopList[3].value = res.data[2].size
          /*  if (res.data.length >= 4) {
             res.data = res.data.splice(0, res.data.length - 1);
           }
           this.waterPlolList = [];
            res.data.forEach((v, i) => {
             this.waterPlolList.push({
               title: v.title,
               value: v.value,
               color: this.waterColor[i]
             });
           }); */
        });
      },
      /* 资产填报预警指数 */
      getEarlyWarning() {
        // let completeness;
        this.$api.warning.completeness().then(res => {
          // completeness = res.completeness;
          this.getEarly(res.completeness);
        })
      },
      getEarly(completeness) {
        this.$api.getEarlyWarning().then(res => {
          if (res.total == 0) {
            this.cardTopList[0].value = 0;
          } else {
            this.cardTopList[0].value = ((res.data[0].count / res.total * 0.3 * 100) + (res.data[1].count / res.total * 0.3 * 100) + (100 - Number(completeness)) * 0.4).toFixed(2);
          }
        })
      },
      /* 地图操作 */
      handelClick(e) {
        this.map.loading = true;
        if (e == "返回首页") {
          e = 0;
        } else {
          e = e.id
        }
        this.getProgressList(e || 0);
      },
      ISNumber(e) {
        if (typeof e == 'string') {
          e = Number(e)
        }
        return e
      },
      /* 资金来源分析 */
      getCapitalSource(e) {
        this.capitalSource.data = []
        if (e == '全部费用') {
          let sum = 0;
          this.$api.funingSourceTrje().then(res => {
            res.data.forEach((v, i) => {
              sum += this.ISNumber(v.num)
            })
            this.$api.ITzijinlaiyuan().then(res2 => {
              res2.data.forEach((v, i) => {
                sum += this.ISNumber(v.number)
              })
              res.data.forEach((v, i) => {
                this.capitalSource.data.push({
                  name: v.title,
                  number: this.ISNumber(res.data[i].num) + this.ISNumber(res2.data[i] && res2.data[i].number || 0),
                  value: ((this.ISNumber(res.data[i].num) + this.ISNumber(res2.data[i] && res2.data[i].number || 0)) / sum * 100).toFixed(2)
                })
              })
              this.capitalSource.title = {
                "title": "投资金额(万元)",
                "num": sum
              };
              this.capitalSource.isShow = true;
            });
          })
        } else if (e == '业务系统') {
          let ySum = 0;
          this.$api.funingSourceTrje().then(res => {
            res.data.forEach((v, i) => {
              ySum += this.ISNumber(v.num);
              this.capitalSource.data.push({
                number: v.num,
                value: v.percent,
                name: v.title
              })
            });
            // this.capitalSource.data = this.capitalSource.data.splice(0, 4)
            this.capitalSource.title = {
              "title": "投资金额(万元)",
              "num": ySum
            };
            this.capitalSource.isShow = true;
          })
        } else if (e == 'IT基础资源') {
          let ItSum = 0;
          this.$api.ITzijinlaiyuan().then(res => {
            res.data.forEach((v, i) => {
              ItSum += this.ISNumber(v.number);
              this.capitalSource.data.push({
                number: v.number,
                value: v.value,
                name: v.name
              })
            });
            this.capitalSource.title = {
              "title": "投资金额(万元)",
              "num": ItSum
            };
            this.capitalSource.isShow = true;
          })
        }
      },
      //资金投入走势图
      getLine() {
        this.$api.costSystem().then(res => {
          this.line.constructionCost = {
            list: [],
            sum: 0
          }; // 建设
          this.line.operationCost = {
            list: [],
            sum: 0
          }; // 运维
          res.data.forEach((v, i) => {
            this.line.xAxisData.push(v.year);
            this.line.constructionCost.list.push(v.constructionCost.toFixed(2));
            this.line.operationCost.list.push(v.operationCost.toFixed(2));
            this.line.constructionCost.sum += Number(v.constructionCost);
            this.line.operationCost.sum += Number(v.operationCost);
          });
          this.line.legendData = ["建设", "运维"];
          let data = [
            this.line.constructionCost.list,
            this.line.operationCost.list
          ];
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
      /* 资金来源分析单选 */
      changeRadio(e) {
        this.capitalSource.isShow = false;
        this.getCapitalSource(e);
      },
      /* 领导驾驶舱 打开新页面 */
      toAssetAnalysis(i) {
        if (i == 0) {
          let routeData = this.$router.resolve({
            name: "assetAnalysis",
            query: {
              from: 'leaderCockpit'
            }
          });
          window.open(routeData.href, '_blank');
        } else {
          let routeData = this.$router.resolve({
            name: "resources",
            query: {
              from: 'leaderCockpit'
            }
          });
          window.open(routeData.href, '_blank');
        }
      },
      toResources() {
        let routeData = this.$router.resolve({
          name: "resources",
          query: {
            from: 'leaderCockpit'
          }
        });
        window.open(routeData.href, '_blank');
      },
      /* 去table 列表 */
      toLeaderCockpitTable() {
        let routeData = this.$router.resolve({
          name: "tableDetail",
          query: {
            type: 'leaderCockpitTable',
            from: 'leaderCockpit'
          }
        });
        window.open(routeData.href, '_blank');
      },
      goRouters() {
        if (this.radio == '业务系统') {
          let routeData = this.$router.resolve({
            name: "businessTable",
            query: {
              type: 'sourceTable',
              from: 'leaderCockpit'
            }
            // 
          });
          window.open(routeData.href, '_blank');
        } else if (this.radio == 'IT基础资源') {
          let routeData = this.$router.resolve({
            name: "moneyMore",
            query: {
              from: 'leaderCockpit'
            }
          });
          window.open(routeData.href, '_blank');
        }
      },
      toBusinessTotal() {
        let routeData = this.$router.resolve({
          name: "businessTotal",
          query: {
            from: 'leaderCockpit'
          }
        });
        window.open(routeData.href, '_blank');
      },
      goBusinessTotal() {
        this.$router.push({
          name: 'businessTotal',
          query: {
            from: 'leaderCockpit'
          }
        })
        this.$store.commit('get_breadSon', {
          // path: '/home/index/businessTotal',
          pathName: 'businessTotal',
          name: '全省地区各地区全国统建系统分析'
        })
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  %margin {
    margin-left: -10px;
    margin-right: -10px;
  }
  .ivu-col {
    padding-left: 10px;
    padding-right: 10px;
  }
  .relative {
    position: relative;
  }
  .row-header {
    @extend %margin;
    .ivu-col-span-6 {
      dl {
        @include nums($w: 100%, $h: auto);
        position: relative;
        dt {
          display: flex;
          img {
            @include nums($w: 100%, $h: auto);
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
            border-radius: 5px;
          }
        }
        dd {
          position: absolute;
          left: 0;
          top: 0;
          @include nums($w: 100%, $h: 100%);
          ul {
            padding-left: 8px;
            li:first-child {
              margin-top: 12px;
              @include font($color: reba(255, 255, 255, 0.45), $fz:14px);
            }
            li:last-child {
              margin-top: 5px;
              @include font($color: reba(255, 255, 255, 0.85), $fz:18px, $fw:800);
            }
          }
          p {
            text-align: right;
            position: absolute;
            bottom: 0px;
            right: 8px;
            width: 100%;
            label {
              @include font($color: reba(255, 255, 255, 0.85), $fz:36px, $fw:800);
            }
            span {
              @include font($color: reba(255, 255, 255, 0.85), $fz:18px, $fw:800);
            }
            .ivu-chart-circle {
              @include nums($w: 80px!important, $h: 80px!important);
            }
          }
        } // background-size: cover;
      }
    }
  }
  .row-map {
    @extend %margin;
    margin-top: 20px;
    .ivu-col-span-18 {
      .ivu-card-body {
        &>div {
          @include nums($w: 100%, $h: 610px);
          dl {
            dt {
              @include font($fz: 16px, $color: #2d8cf0);
            }
            dd {
              .row-card {
                @extend %margin;
                margin-top: 15px;
                .ivu-col-span-6 {
                  .dd-num {
                    p {
                      position: relative;
                      vertical-align: bottom;
                      height: 40px;
                      vertical-align: bottom;
                      b {
                        font-size: 30px;
                      }
                      span {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                      }
                    }
                  }
                }
              }
              .map-wrapper {
                @include nums($w: 100%); // text-align: center;
                margin-top: 10px;
                div {
                  margin: auto;
                }
              }
            }
          }
        }
      }
    }
    .ivu-col-span-6 {
      .ivu-card {
        margin-top: 20px;
        .ivu-card-body {
          &>div {
            @include nums($w: 100%, $h: 170px);
            dl {
              dt {
                @include font($fz: 16px, $color: #2d8cf0);
              }
              dd {
                @include nums($w: 100%, $h: 150px);
                @include flex($j: center);
                text-align: right;
                label {
                  display: inline-block;
                  @include nums($w: 100px, $h: 100px);
                  .demo-Circle-inner {
                    @include font($fz: 24px, $color: #2ba8ab);
                  }
                }
                .span-right {
                  // margin-left: 30px;
                  margin: auto 5%;
                  p {
                    position: relative;
                    line-height: 26px;
                    font-size: 14px;
                    span {
                      display: inline-block;
                      @include nums($w: 45px);
                    }
                    .sub {
                      background: #5ac426;
                      position: absolute;
                      bottom: 7px;
                      right: -25px;
                      @include nums($w: 10px, $h: 10px);
                      border-radius: 50%;
                    }
                    .sup {
                      background: #c42626;
                      position: absolute;
                      bottom: 7px;
                      right: -25px;
                      @include nums($w: 10px, $h: 10px);
                      border-radius: 50%;
                    }
                    .circle {
                      background: #ced866;
                      position: absolute;
                      bottom: 7px;
                      right: -25px;
                      @include nums($w: 10px, $h: 10px);
                      border-radius: 50%;
                    }
                  }
                }
              }
            }
          }
        }
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
  .row-money {
    @extend %margin;
    margin-top: 20px;
    .ivu-col-span-12 {
      .ivu-card-body {
        &>div {
          @include nums($w: 100%, $h: 440px);
          dl {
            dt {
              @include font($fz: 16px, $color: #2d8cf0);
              span {
                float: right;
                label {
                  @include font($fz: 12px, $color: #2d8cf0);
                  margin-left: 15px;
                }
              }
            }
            dd {
              text-align: left;
              margin-top: 10px;
              font-weight: normal;
              p {
                margin-top: 25px;
              }
              .ring-wrapper {
                @include nums($w: 100%, $h: 300px);
                margin-top: 30px;
                @include flex($j: center);
                .ivu-col-span-12 {
                  // @include flex($j: center);
                  @include flex($j:space-around);
                }
                span {
                  margin: auto 0;
                }
                .legendItem {
                    width: 300px;
                }
              }
            }
          }
        }
      }
    }
    .title-item {
      @include flex($j: left);
      margin: 10px 0 40px 10px;
      span {
        margin-right: 20px;
        label {
          @include font($fz: 14px, $color: rgba(255, 255, 255, 0.65));
        }
      }
    }
  }
  .ivu-col {
    padding-left: 10px;
    padding-right: 10px;
  }
  .ivu-radio-group-button .ivu-radio-wrapper-checked {
    background: transparent;
  }
  .ivu-radio-group-button .ivu-radio-wrapper {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.45);
  }
  .ivu-radio-group-button .ivu-radio-wrapper {
    color: rgba(255, 255, 255, 0.45);
  }
</style>
