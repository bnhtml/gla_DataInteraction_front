<template>
  <div class="pcRoom" v-breadcrumb="breadcrumb">
    <Row>
      <div class="cardHeight">
        <dl>
          <div class='titleBar'>
            <Title :title='title1'></Title>
            <span class="right-more" @click="goArea()">明细<i class="iconfont icon-shuangjiantou"></i></span>
          </div>
          <dd>
            <Row class="computer-area">
              <i-col span="18">
                <newBar v-if="isBarDataBottom&&barDataBottomSeries.length&&barDataBottomSeries[0].data.length" :bar="barDataBottom" :series="barDataBottomSeries"></newBar>
                <div class="noData" :style='{height:"350px"}' v-else><img src="@/assets/img/bg/noData_2.png" alt="暂无数据"></div>
              </i-col>
              <i-col span="6">
                <list :title='list.title' >
                  <ul v-if='list.data.length'>
                    <li v-for='(v,i) in list.data' :key='i'>
                      <label>{{i+1}}</label> {{v.title}}
                      <span>{{v.num | number_format}}</span>
                    </li>
                  </ul>
                  <div class="noData" v-else><img src="@/assets/img/bg/noData_1.png" alt="暂无数据"></div>
                </list>
              </i-col>
            </Row>
            <Spin size="large" fix v-if="!isBarDataBottom">
              <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
            </Spin>
          </dd>
        </dl>
      </div>
    </Row>
    <!-- <card class="card-list">
        <Tabs :value="$route.query.type==1?'name1':'name2'" :animated='false' @on-click='changeTab'>
          <TabPane label="各地区机房面积分析" name="name2">
            <Row>
              <i-col span="18">
                <newBar v-if="isBarDataBottom" :bar="barDataBottom" :series="barDataBottomSeries"></newBar>
              </i-col>
              <i-col span="6">
                <list :title='list.title'>
                  <ul>
                    <li v-for='(v,i) in list.data' :key='i'>
                      <label>{{i+1}}</label> {{v.title}}
                      <span>{{v.num | number_format}}</span>
                    </li>
                  </ul>
                </list>
              </i-col>
            </Row>
            <Spin size="large" fix v-if="!isBarDataBottom">
              <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
            </Spin>
          </TabPane>
          <TabPane label="各部门机房面积分析" name="name1" class="tabPane">
            <span class="more" @click="goArea">更多&nbsp;&nbsp;<i class="iconfont icon-shuangjiantou"></i></span>
            <RadioGroup v-model="deptRadio" type="button" @on-change='deptChange' class="radioGroup">
              <Radio label="1">省直部门</Radio>
              <Radio label="2,3,4,5,6,7,8,9,10">市级部门</Radio>
            </RadioGroup>
            <Row>
              <i-col span="18">
                <newBar v-if="isBarData" :bar="barData" :series="barDataSeries"></newBar>
              </i-col>
              <Spin size="large" fix v-if="!isBarData">
                <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
              </Spin>
              <i-col span="6">
                <list :title='listTop.title'>
                  <ul>
                    <li v-for='(v,i) in listTop.data' :key='i'>
                      <label>{{i+1}}</label> {{v.title}}
                      <span>{{v.num | number_format}}</span>
                    </li>
                  </ul>
                </list>
              </i-col>
            </Row>
          </TabPane>
        </Tabs>
      </card> -->
    <Row class="mt15" :gutter="16">
      <i-col span="12">
        <div class="cardHeight">
          <div>
            <dl>
              <div class='titleBar'>
                <Title :title='title2'></Title>
                <span class="right-more" @click="goTouru(0)">明细<i class="iconfont icon-shuangjiantou"></i></span>
              </div>
              <!-- <dt class="card-title">机房投入资金分析 -->
              <!-- <router-link :to="{name: 'tablepage', params: {pagename: 'touruPage'}}" class=""> -->
              <!-- <span @click="goTouru">更多<i class="iconfont icon-shuangjiantou"></i></span>  -->
              <!-- @click="goMore(0)" -->
              <!-- </router-link> -->
              <!-- </dt> -->
              <dd>
                <p>
                  <!-- <RadioGroup v-model="roomRadio" type="button" @on-change='changeRoom'>
                                            <Radio :label="o" v-for="o in radios" :key="o"></Radio>
                                        </RadioGroup> -->
                </p>
                <Row class='ring-wrapper mt50' :class="{'g-max-fontsize': capitalSource.title.num > 10000}">
                  <i-col span='12'>
                    <ring v-if='capitalSource.isShow' :data='capitalSource.data' :labelColor='capitalSource.labelColor' :color='capitalSource.color' :title='capitalSource.title' :hasLabel='capitalSource.hasLabel'></ring>
                  </i-col>
                  <i-col span='12'>
                    <legendItem :legendData='capitalSource.data' :bg='capitalSource.color' :className='"longitudinal"'></legendItem>
                  </i-col>
                </Row>
              </dd>
            </dl>
          </div>
          <Spin size="large" fix v-if="!capitalSource.isShow">
            <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
          </Spin>
        </div>
      </i-col>
      <i-col span="12">
        <div class="cardHeight">
          <div>
            <dl>
              <div class='titleBar'>
                <Title :title='title3'></Title>
                <span class="right-more" @click="goTouru(1)">明细<i class="iconfont icon-shuangjiantou"></i></span>
              </div>
              <!-- <dt class="card-title">机房建设资金走势图 -->
              <!-- <router-link :to="{name: 'tablepage', params: {pagename: 'touruPage'}}" class="">  -->
              <!-- <span @click="goTouru">更多<i class="iconfont icon-shuangjiantou"></i></span>  -->
              <!-- </router-link> -->
              <!-- </dt> -->
              <dd>
                <!-- <p class="title-item">
                    <span :style='{color:line.color[0]}'> <label>{{line.legendData[0]}}费用</label> <br>{{line.constructionCost.sum |number_format(2)}}万元</span>
                    <span :style='{color:line.color[1]}'><label>{{line.legendData[1]}}费用</label><br>{{line.operationCost.sum|number_format(2)}}万元/每年</span>
                  </p>
                  <div class="lineBox">
                    <lineChart :series="line.series" :line="line"></lineChart>
                  </div> -->
                <Row class='ring-wrapper mt50'>
                  <i-col span='12'>
                    <ring v-if='HardwareNumber.isShow' :data='HardwareNumber.data' :labelColor='HardwareNumber.labelColor' :color='HardwareNumber.color' :title='HardwareNumber.title' :hasLabel='HardwareNumber.hasLabel'></ring>
                  </i-col>
                  <i-col span='12'>
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
    <!-- 与产品沟通后先隐藏 -->
    <!-- <Row style="margin-top: 15px" :gutter="16">
                <i-col span="12">
                    <card class="cardHeight">
                        <div>
                            <dl>
                                <dt class="card-title">机房资金来源分析
                                     <span @click="goArea">更多<i class="iconfont icon-shuangjiantou"></i></span> 
                                </dt>
                                <dd>
                                    
                                    <Row class='ring-wrapper'>
                                        <i-col span='12'>
                                            <ring v-if='setPro.isShow' :data='setPro.data' :labelColor='setPro.labelColor' :color='setPro.color' :title='setPro.title' :hasLabel='setPro.hasLabel'></ring>
                                        </i-col>
                                        <i-col span='12'>
                                            <legendItem :legendData='setPro.data' :bg='setPro.color'></legendItem>
                                        </i-col>
                                    </Row>
                                </dd>
                            </dl>
                        </div>
                        <Spin size="large" fix v-if="!setPro.isShow">
                            <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                        </Spin>
                    </card>
                </i-col>
                <i-col span="12">
                    <card class="cardHeight">
                        <div>
                            <dl>
                                <dt class="card-title">机房立项依据分析
                                     <span @click="goArea">更多<i class="iconfont icon-shuangjiantou"></i></span>
                                </dt>
                                <dd>
                                    <Row class='ring-wrapper'>
                                        <i-col span='12'>
                                            <ring v-if='zijinlaiyuan.isShow' :data='zijinlaiyuan.data' :labelColor='zijinlaiyuan.labelColor' :color='zijinlaiyuan.color' :title='zijinlaiyuan.title' :hasLabel='zijinlaiyuan.hasLabel'></ring>
                                        </i-col>
                                        <i-col span='12'>
                                            <legendItem :legendData='zijinlaiyuan.data' :bg='zijinlaiyuan.color'></legendItem>
                                        </i-col>
                                    </Row>
                                </dd>
                            </dl>
                        </div>
                        <Spin size="large" fix v-if="!zijinlaiyuan.isShow">
                            <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                        </Spin>
                    </card>
                </i-col>
            </Row> -->
  </div>
</template>

<script type="text/javascript">
  import Title from '@/components/title/index';
  import lineChart from "@/components/charts/line/line";
  import paiming from "@/components/ranking";
  import ring from "@/components/charts/ring/ring.vue";
  import legendItem from "@/components/charts/ring/legendItem.vue";
  import list from "@/components/list/list.vue";
  import newBar from "@/components/charts/bar/newBar.vue";
  const radios = ["全部费用", "建设费用", "运维费用"];
  export default {
    data() {
      let {
        query,
        params,
        name,
        fullPath
      } = this.$route;
      query.mapQuery = JSON.parse(query.mapQuery);
      query.areaids =query.mapQuery.areaids?query.mapQuery.areaids: query.radioBtn ;
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
      if(query.mapQuery.name) leftname = query.mapQuery.name
      return {
        query,
        leftname,
        breadcrumb: [{
            icon: 'dingwei',
            name: 'IT基础资源分析'
          },
          parent,
          {
            name: leftname + '自有机房情况',
            url: fullPath
          }
        ],
        HardwareNumber: {
          data: [
            // {
            //   value: 10,
            //   name: "服务器",
            //   number: 10+"个",
            //   type:1
            // },
            // {
            //   value: 10,
            //   name: "专用设备",
            //   number: 10+"个",
            //   type:2
            // },
            // {
            //   value: 10,
            //   name: "ECS",
            //   number: 10+"个",
            //   type:3
            // },
            {
              value: 10,
              name: "UPS",
              number: 10 + "个",
              type: 4
            },
            {
              value: 10,
              name: "其他",
              number: 10 + "个",
              type: 5
            },
            {
              value: 10,
              name: "机柜",
              number: 10 + "个",
              type: 6
            },
            {
              value: 10,
              name: "空调",
              number: 10 + "个",
              type: 7
            },
            {
              value: 10,
              name: "安全设备",
              number: 10 + "个",
              type: 8
            },
            {
              value: 10,
              name: "网络设备",
              number: 10 + "个",
              type: 9
            },
            {
              value: 10,
              name: "路由器",
              number: 10 + "个",
              type: 10
            },
            {
              value: 10,
              name: "交换机",
              number: 10 + "个",
              type: 11
            },
            {
              value: 10,
              name: "未反馈",
              number: 10 + "个",
              type: 12
            }
          ],
          labelColor: [
            // "linear-gradient(0deg,#ca5d55 0%,#d56c59 100%)",
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
            // "linear-gradient(0deg,#269094 0%,#2ba9ac 100%)",
            // "transparent",
            // "linear-gradient(0deg,#10c4ff 0%,#3259ff 100%)",
            // "transparent",
            // "linear-gradient(0deg,#e8cb39 0%,#feba70 100%)",
            // "transparent",
            // "linear-gradient(0deg,#14cede 0%,#30ffda 100%)",
            // "transparent",
            // "linear-gradient(0deg,#694dff 0%,#b783ff 100%)",
            // "transparent",
            // "linear-gradient(0deg,#10c4ff 0%,#3259ff 100%)",
            // "transparent",
            // "linear-gradient(0deg,#e8cb39 0%,#feba70 100%)",
            // "transparent",
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
        deptRadio: "1",
        radio: "",
        radios,
        roomRadio: "全部费用",
        setProRadio: "所有资源",
        moneyRadio: "所有资源",
        labels: ["各部门机房面积分析", "各地区机房面积分析"],
        PageActive: "0",
        isBar: true,
        // 各部门面积分析
        barData: {
          company:['㎡'],
          height: 330,
          xData: [],
          labelnames: ['机房面积'],
        },
        isBarData: false,
        barDataSeries: [],
        // 各地区机房面积分析
        isBarDataBottom: false, // 控制地区机房面积变量
        barDataBottom: {
          company:['㎡'],
          height: 330,
          xData: [],
          labelnames: ['机房面积'],
        },
        barDataBottomSeries: [],
        capitalSource: {
          data: [{
              value: Math.round(Math.random() * 20),
              name: "机柜",
              number: 1300
            },
            {
              value: Math.round(Math.random() * 20),
              name: "空调",
              number: 700
            },
            {
              value: Math.round(Math.random() * 20),
              name: "安全设备",
              number: 600
            },
            {
              value: Math.round(Math.random() * 20),
              name: "UPS",
              number: 600
            },
            {
              value: Math.round(Math.random() * 20),
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
        // 机房资金来源分析信息配置
        setPro: {
          data: [{
              value: 0,
              name: "国家派发",
              number: 0
            },
            {
              value: 0,
              name: "省级派发",
              number: 0
            },
            {
              value: 0,
              name: "自建",
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
          title: {}
        },
        // 机房立项依据分析信息配置
        zijinlaiyuan: {
          data: [{
              value: 0,
              name: "财政拨款",
              number: 0
            },
            {
              value: 0,
              name: "自筹",
              number: 0
            },
            {
              value: 0,
              name: "BT项目",
              number: 0
            },
            {
              value: 0,
              name: "其他",
              number: 0
            },
            {
              value: 0,
              name: "未反馈",
              number: 0
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
        listTop: {
          title: "省直部门系统建设费用排名",
          data: [{
              title: "贵州省交通运输厅",
              num: "92万元"
            },
            {
              title: "贵州省科学技术厅",
              num: "89万元"
            },
            {
              title: "贵州省环境保护厅",
              num: "75万元"
            },
            {
              title: "贵州省商务厅",
              num: "69万元"
            },
            {
              title: "贵州省国土资源厅",
              num: "55万元"
            },
            {
              title: "贵州省公安消防总队",
              num: "53万元"
            },
            {
              title: "贵州省教育厅",
              num: "42万元"
            }
          ]
        },
        list: {
          title: "",
          data: [{
              title: "贵阳市",
              num: "910万元"
            },
            {
              title: "铜仁市",
              num: "533万元"
            },
            {
              title: "贵黔南市",
              num: "421万元"
            },
            {
              title: "遵义市",
              num: "344万元"
            },
            {
              title: "黔东南市",
              num: "322万元"
            },
            {
              title: "毕节市",
              num: "310万元"
            },
            {
              title: "安顺市",
              num: "290万元"
            }
          ]
        },
        series: [],
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
          series: [{
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
        }
      };
    },
    components: {
      paiming,
      ring,
      legendItem,
      lineChart,
      list,
      newBar,
      Title
    },
    computed: {
      title1() {
        return this.leftname + "机房面积分析";
        // return this.$route.query.type == 1 ? "全省总体机房面积分析" : this.$route.query.radioBtn == 1 ? "省直部门机房面积分析" : "市州部门机房面积分析";
      },
      title2() {
          return this.leftname + "机房硬件设备投入资金分析";
        // return this.$route.query.type == 1 ? "全省总体机房硬件设备投入资金分析" : this.$route.query.radioBtn == 1 ? "省直部门机房硬件设备投入资金分析" : "市州部门机房硬件设备投入资金分析";
      },
      title3() {
          return this.leftname + "机房硬件设备数量分析";
        // return this.$route.query.type == 1 ? "全省总体机房硬件设备数量分析" : this.$route.query.radioBtn == 1 ? "省直部门机房硬件设备数量分析" : "市州部门机房硬件设备数量分析";
      }
    },
    mounted () {

      this.getMianjifenxi({
        areaids: this.query.areaids,
        orgRootId:this.query.mapQuery.orgRootId||''
        });
      this.getJifangtouru({
        areaids: this.query.areaids,
        orgRootId:this.query.mapQuery.orgRootId||''
        });
      // this.getCapitalSource(this.setPro);
      // this.getCapitalSource(this.zijinlaiyuan);
      // this.getLineData();
      this.roomHardCount({
        areaids: this.query.areaids,
        orgRootId:this.query.mapQuery.orgRootId||''
        });
    },
    methods: {
      // deptChange(label) {
      //   this.getMianjifenxi({
      //     areaids: label
      //   })
      // },
      getMianjifenxi(params) {
        let areaidsArr = [1,2,3,4,5,6,7,8,9,10,11]
        this.barDataBottom.xData = [];
        this.barDataBottomSeries = [];
        this.isBarDataBottom = false;
        // 部门
        if (this.$route.query.type == 2||areaidsArr.indexOf(params.areaids)!=-1) {
          this.getPcroomAreaSort(params)
          this.$api.ITBasic.sizeByBumenArea(params).then(res => {
            res.data.forEach((v, i) => {
              this.barDataBottom.xData.push(v.unitNm);
            })
            this.barDataBottomSeries = this.barData.labelnames.map((o, i) => {
              return {
                name: o,
                type: 'bar',
                data: res.data.map(o => o.jfSize),
                barMaxWidth: 20,
              }
            })
            this.isBarDataBottom = true;
          });
        }
        // 地区
       else  if (this.$route.query.type == 1) {
          this.getTopByDeptArea(params); //地区排名
          this.$api.ITBasic.sizeByDeptArea(params).then(res => {
            res.data.forEach((v, i) => {
              this.barDataBottom.xData.push(v.unitNm);
            })
            this.barDataBottomSeries = this.barDataBottom.labelnames.map((o, i) => {
              return {
                name: o,
                type: 'bar',
                data: res.data.map(o => o.jfSize),
                barMaxWidth: 20,
              }
            })
            this.isBarDataBottom = true;
          });
        };
      },
      // 省级和市级机房面积排序 
      getPcroomAreaSort(v) {
        // areaids: 1//省级机房面积排序
        //areaids: 2,3,4,5,6,7,8,9,10
        this.$api.ITPcroomAreaSort(v).then(res => {
          let val;
          if (this.query.areaids == 1&&!this.query.mapQuery.name) {
            val = "省级机房面积排序";
          } else if(!this.query.mapQuery.name){
            val = "市级机房面积排序";
          }else{
            val =this.query.mapQuery.name+'机房面积排序'
          }
          this.list = {
            title: val,
            data: res.data.map(o => {
              return {
                title: o.unitNm,
                num: o.jfSize + "㎡"
              };
            })
          };
        });
      },
      //地区机房面积排名
      getTopByDeptArea(query) {
        let title = '贵州省地区机房面积排名';
        /* if(this.query.mapQuery.name=='全省'){
          title = '贵州省地区机房面积排名';
        }else  */if(this.query.mapQuery.name){
          title =this.query.mapQuery.name+'机房面积排名';
        }
        this.$api.ITBasic.topByDeptArea(query).then(res => {
          this.list = {
            title: title,
            data: res.data.map(o => {
              return {
                title: o.unitNm,
                num: o.jfSize + "㎡"
              };
            })
          };
        })
      },
      // //省级部门机房面积排名
      // getTopByBumenArea(){
      //   this.$api.ITBasic.topByBumenArea({areaids:"2,3,4,5,6,7,8,9,10"}).then(res => {
      //     this.list = {
      //       title: "省级部门机房面积排名",
      //       data: res.data.map(o => {
      //         return {
      //           title: o.unitNm,
      //           num: o.jfSize + "㎡"
      //         };
      //       })
      //     };
      //   });
      // },
      //机房投入资金分析
      getJifangtouru(params) {
        this.$api.ITBasic.jifangtouru(params).then(res => {
          let num = res.size;
          let title = '投入金额(万元)';
          let data = res;
          this.capitalSource = {
            data: [{
                value: data.jgTrjePercentage,
                name: "机柜",
                number: "￥" + data.jgTrje
              },
              {
                value: data.ktTrjePercentage,
                name: "空调",
                number: "￥" + data.ktTrje
              },
              {
                value: data.aqsbTrjePercentage,
                name: "安全设备",
                number: "￥" + data.aqsbTrje
              },
              {
                value: data.ccsbTrjePercentage,
                name: "存储设备",
                number: "￥" + data.ccsbTrje
              },
              {
                value: data.fwqTrjePercentage,
                name: "服务器",
                number: "￥" + data.fwqTrje
              },
              {
                value: data.uspTrjePercentage,
                name: "UPS",
                number: "￥" + data.uspTrje
              },
              {
                value: data.wlsbTrjePercentage,
                name: "网络设备",
                number: "￥" +data.wlsbTrje
              },
              {
                value: data.zysbTrjePercentage,
                name: "专用设备",
                number: "￥" + data.zysbTrje
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
      getZijinlaiyuan() {
        this.$api.ITzijinlaiyuan().then(res => {
          this.zijinlaiyuan.data = [];
          res.data.forEach((v, i) => {
            this.zijinlaiyuan.data.push({
              value: v.value,
              name: v.name,
              number: v.number
            });
          });
          this.zijinlaiyuan.title = {
            title: "资金来源"
          };
          this.zijinlaiyuan.isShow = true;
        });
      },
      /* 资金来源分析 */
      getCapitalSource(e, name) {
        let sum = 0;
        e.data.forEach((v, i, all) => {
          sum += this.ISNumber(v.num);
        });
        e.title = {
          title: "投资金额(万元)",
          num: sum
        };
        setTimeout(() => {
          e.isShow = true;
        }, 0);
      },
      //机房硬件设备数量
      roomHardCount(params) {
        this.$api.roomHardCount(params).then(res => {
          let roomData = res;
          let num = res.yjCount;
          let title = '硬件数量';
          this.HardwareNumber = {
            data: [
              {
                value: roomData.jfPercent,
                name: "机柜",
                number: roomData.jfCount + "个",
                type: 6
              },
              {
                value: roomData.ktPercent,
                name: "空调",
                number: roomData.ktCount + "个",
                type: 7
              },
              {
                value: roomData.aqSbPercent,
                name: "安全设备",
                number: roomData.aqSbcount + "个",
                type: 8
              },
              {
                value: roomData.ccSbPercent,
                name: "存储设备",
                number: roomData.ccSbcount + "个",
                type: 12
              },
              {
                value: roomData.fwqPercent,
                name: "服务器",
                number: res.fwqCount + "个",
                type: 1
              },
               {
                value: roomData.upsPercent,
                name: "UPS",
                number: roomData.upsCount + "个",
                type: 4
              },
              {
                value: roomData.wlSbPercent,
                name: "网络设备",
                number: roomData.wlSbcount + "个",
                type: 9
              },
              {
                value: roomData.zySbPercent,
                name: "专用设备",
                number: roomData.zySbcount + "个",
                type: 2
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
        this.$api.ITBasic.jianshezijin().then(res => {
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
            constructionCost.list.push(Number(v.constructionCost).toFixed(2));
            operationCost.list.push(Number(v.operationCost).toFixed(2));
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
      changeRoom(label) {
        let idx = this.radios.indexOf(this.roomRadio);
        this.capitalSource.isShow = false;
        let param = idx === 0 ? {} : {
          type: idx
        };
        this.getJifangtouru(param);
      },
      changeSetPro(label) {
        this.setPro.isShow = false;
        this.getCapitalSource(this.setPro, label + 2);
      },
      changeMoney(label) {
        this.zijinlaiyuan.isShow = false;
        this.getCapitalSource(this.zijinlaiyuan, label + 3);
      },
      changeTab(e) {
        let name = '';
        if (e == 'name1') {
          name = '各部门机房面积分析';
        } else if (e == 'name2') {
          name = '各地区机房面积分析';
        }
        this.isBarData = false;
        this.getMianjifenxi();
        this.$store.commit('get_breadSon', {
          path: '/home/index/pcRoom',
          pathName: 'pcRoom',
          name: name
        })
        // this.$refs.bar.fnResize();
        // this.$refs.barTop.fnResize();
      },
      goTouru(idx) {
        let title = this.leftname + '自有机房情况';
        this.$router.push({
          name: 'tablepage',
          params: {
            pagename: ['touruXiazuan', 'touruSizeXiazuan'][idx],
          },
          query: {
            ...this.query,
            backPathName: this.$route.name,
            title,
            tableTitle: idx == 1 ? this.title3 : this.title2,
            fileType: ['money', 'count'][idx],
            mapQuery: JSON.stringify(this.query.mapQuery),
            orgRootId:this.query.mapQuery.orgRootId
          }
        })
      },
      goArea() {
        let title = this.leftname + '自有机房情况';
        this.$router.push({
          name: 'tablepage',
          params: {
            pagename: 'areaXiazuan',
          },
          query: {
            ...this.query,
            backPathName: this.$route.name,
            title,
            tableTitle: this.title1,
            mapQuery: JSON.stringify(this.query.mapQuery),
            orgRootId:this.query.mapQuery.orgRootId
          }
        })
        this.$store.commit('get_breadGrandson', {
          pathName: 'tablepage',
          pagename: 'areaPage',
          name: '资金分析详情'
        })
      },
      ISNumber(e) {
        if (typeof e == 'string') {
          e = Number(e);
        }
        return e;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/style/base/index.scss";
  .card-list {
    @include nums($w: 100%, $h: 420px);
    .tabPane {
      position: relative;
      .radioGroup,
      .more {
        position: absolute;
      }
      .radioGroup {
        right: 8%;
        top: -45px;
      }
      .more {
        right: 2%;
        top: -40px;
        cursor: pointer;
        font-size: 14px;
        color: #2d8cf0;
        i {
          font-size: 12px;
        }
      }
    }
  }
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
  dl {
    dt {
      .moreLink {
        float: right;
        @include font($fz: 12px, $color: #2d8cf0);
        i {
          font-size: 12px;
        }
      }
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
      .g-max-fontsize /deep/ .changeLine .font {
        font-size: 20px;
      }
      .ring-wrapper {
        // transform: scale(1.1)!important;
        // margin-top: 50px;
        @include flex($j: center);
        .ivu-col-span-12 {
          @include flex($j: center);
          .legendItem {
            width: 400px;
            white-space: nowrap;
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
    color: #fff;
    font-size: 18px;
    .feiyong1 {
      width: 220px;
    }
    h3 {
      span {
        color: #2d8cf0;
        font-size: 24px;
      }
    }
  }
  .cardHeight {
    min-height: 440px;
    @extend %TitleBorder;
    /deep/ .ivu-card-body {
      padding: 0;
    }
    .my-title {
      border: none;
      padding: 15px;
      border-bottom: 1px solid #1a5182;
      line-height: 1;
    }
  }
  .barChartBox {
    display: flex;
    justify-content: center;
  }
  .computer-area {
    padding: 29px 16px;
  }

</style>
