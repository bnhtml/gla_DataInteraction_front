<template>
  <div>
    <card>
      <span class="cancel" ><span style='position:relative;top:10px'><i class="iconfont icon-zhanghushoucang"></i>取消收藏</span>
      </span>
      <Tabs :value="PageActive" :animated="false">
        <TabPane v-for="(label, index) in labels" :label="label" :name="index + ''" :key="index" class="tabPane">
          <Row :gutter="16" v-if="index === 0">
            <i-col span="16">
              <div class="paiming">
                <div class="paimingTitle">各地区全国统建系统数量</div>
                <div style="display:flex; justify-content: center;">
                  <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                </div>
                <div class="barChartBox">
                  <bar :series="barData.series" :xData="barData.xData" height="300" width="630"></bar>
                </div>
              </div>
            </i-col>
            <i-col span="8">
              <div class="paiming">
                <div class="paimingTitle">{{listTop.title}}</div>
                <paiming :data="listTop.data"></paiming>
              </div>
            </i-col>
          </Row>
          <Row :gutter="16" v-if="index === 1">
            <RadioGroup v-model="deptRadio" type="button" class="radioGroup">
              <!-- <Radio v-for="o in labels" :key="o" :label="o"></Radio> -->
              <Radio label="省直部门"></Radio>
              <Radio label="市级部门"></Radio>
            </RadioGroup>
            <i-col span="16">
              <div class="paiming">
                <div class="paimingTitle">各部门全国统建系统数量</div>
                <div style="display:flex; justify-content: center;">
                  <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                </div>
                <div class="barChartBox">
                  <bar :series="barData_1.series" :xData="barData_1.xData" height="300" width="630"></bar>
                </div>
              </div>
            </i-col>
            <i-col span="8">
              <div class="paiming">
                <div class="paimingTitle">{{list.title}}</div>
                <paiming :data="list.data"></paiming>
              </div>
            </i-col>
          </Row>
        </TabPane>
      </Tabs>
    </card>
    <Row style="margin-top: 15px" :gutter="16">
      <i-col span="16">
        <card class="cardHeight">
          <div>
            <dl>
              <dt class="card-title">信息系统部署方式统计<span class=" cancel"><span><i class="iconfont icon-zhanghushoucang"></i>取消收藏</span>
                </span></dt>
              <dd>
                <div style="display:flex; justify-content: center;">
                  <legendItem :legendData='top1.data' :bg='top1.color'></legendItem>
                </div>
                <div class="barChartBox">
                  <bar :series="barData1.series" :xData="barData1.xData" height="300" width="630"></bar>
                </div>
              </dd>
            </dl>
          </div>
        </card>
      </i-col>
      <i-col span="8">
        <card class="cardHeight">
          <div>
            <dl>
              <dt class="card-title">迁云状况分析<span class=" cancel"><span><i class="iconfont icon-zhanghushoucang"></i>取消收藏</span>
              </span></dt>
              <dd class="centermiddle">
                <!-- <Row type="flex" align="middle"  style="height: 100%;">
                                        <i-col span='12' style="border:2px solid red;">
                                            <ringGraph v-if='ringGraph0.isShow' :ringGraph='ringGraph0'></ringGraph>
                                        </i-col>
                                        <i-col span='12'>
                                            <legendItem v-if='ringGraph0.isShow' :legendData='ringGraph0.legendData' :bg='ringGraph0.bg'></legendItem>
                                        </i-col>
                                    </Row> -->
                <Row type="flex" justify="center" align="middle" style="height: 100%;" class="dd-row">
                  <i-col span='12'>
                    <ringGraph v-if='ringGraph0.isShow' :ringGraph='ringGraph0'></ringGraph>
                  </i-col>
                  <i-col span='12'>
                    <legendItem v-if='ringGraph0.isShow' :legendData='ringGraph0.legendData' :bg='ringGraph0.bg'></legendItem>
                  </i-col>
                </Row>
              </dd>
            </dl>
          </div>
        </card>
      </i-col>
    </Row>
    <!-- <Row style="margin-top: 15px" :gutter="16">
            <i-col span="16">
              <card class="cardHeight">
                <div>
                  <dl>
                    <dt class="card-title">业务系统建设状态分析<router-link :to="{name: 'businessTable'}" class=""><span>更多<i class="iconfont icon-shuangjiantou"></i></span></router-link></dt>
                    <dd>
                      <p>
                        <RadioGroup v-model="radio" type="button" @on-change="getLixiangyiju">
                          <Radio label="内部使用"></Radio>
                          <Radio label="面向公众"></Radio>
                          <Radio label="其他"></Radio>
                        </RadioGroup>
                      </p>
                      <Row class='ring-wrapper '>
                        <i-col span='12'>
                          <ring v-if='lixiangyiju.isShow' :data='lixiangyiju.data' :labelColor='lixiangyiju.labelColor' :color='lixiangyiju.color' :title='lixiangyiju.title' :hasLabel='lixiangyiju.hasLabel'></ring>
                        </i-col>
                        <i-col span='8'>
                          <legendItem :legendData='lixiangyiju.data' :bg='lixiangyiju.color'></legendItem>
                        </i-col>
                      </Row>
                    </dd>
                  </dl>
                </div>
              </card>
            </i-col>
            <i-col span="8">
              <card class="cardHeight">
                <div>
                  <dl>
                    <dt class="card-title">业务系统分布情况<router-link :to="{name: 'businessTable'}" class=""><span>更多<i class="iconfont icon-shuangjiantou"></i></span></router-link></dt>
                    <dd class="centermiddle">
                      <Row type="flex" justify="center" align="middle" style="height: 100%;">
                        <i-col span='12'>
                          <ringGraph v-if='ringGraph1.isShow' :ringGraph='ringGraph1'></ringGraph>
                        </i-col>
                        <i-col span='12'>
                          <legendItem v-if='ringGraph1.isShow' :legendData='ringGraph1.legendData' :bg='ringGraph1.bg'></legendItem>
                        </i-col>
                      </Row>
                    </dd>
                  </dl>
                </div>
              </card>
            </i-col>
          </Row>
          <card style="margin-top: 15px">
            <div>
              <dl>
                <dt class="card-title">业务系统建设状态分析<router-link :to="{name: 'businessTable'}" class="moreLink"><span>更多<i class="iconfont icon-shuangjiantou"></i></span></router-link></dt>
                <dd>
                  <Row :gutter="16">
                    <i-col span="8">
                      <div class="paiming">
                        <div class="paimingTitle">安全等级定级情况</div>
                        <div class="barChartBox">
                          <bar :series="barData2.series" :xData="barData2.xData" height="300" width="630"></bar>
                        </div>
                      </div>
                    </i-col>
                    <i-col span="8">
                      <div class="paiming">
                        <div class="paimingTitle">信息系统分级保护定级情况</div>
                        <div class="barChartBox">
                          <bar :series="barData2_1.series" :xData="barData2_1.xData" height="300" width="630"></bar>
                        </div>
                      </div>
                    </i-col>
                    <i-col span="8">
                      <div class="paiming">
                        <div class="paimingTitle">数据安全要求</div>
                        <div class="barChartBox">
                          <bar :series="barData2_2.series" :xData="barData2_2.xData" height="300" width="630"></bar>
                        </div>
                      </div>
                    </i-col>
                  </Row>
                </dd>
              </dl>
            </div>
          </card>
          <card style="margin-top: 15px">
            <div>
              <dl>
                <dt class="card-title">业务系统承载网络分析<router-link :to="{name: 'businessTable'}" class="moreLink"><span>更多<i class="iconfont icon-shuangjiantou"></i></span></router-link></dt>
                <dd>
                  <Row :gutter="16">
                    <i-col span="16">
                      <div class="paiming">
                        <div style="display:flex; justify-content: center;">
                          <legendItem :legendData='top2.data' :bg='top2.color'></legendItem>
                        </div>
                        <div class="barChartBox">
                          <bar :series="barData3.series" :xData="barData3.xData" height="300" width="630"></bar>
                        </div>
                      </div>
                    </i-col>
                    <i-col span="8">
                      <div class="paiming">
                        <div class="barChartBox">
                          <row class='ring-wrapper'>
                            <i-col span='24'>
                              <ring v-if='capitalSource.isShow' :data='capitalSource.data' :labelColor='capitalSource.labelColor' :color='capitalSource.color' :title='capitalSource.title' :hasLabel='capitalSource.hasLabel' style='margin-top:40px'></ring>
                            </i-col>
                          </row>
                        </div>
                      </div>
                    </i-col>
                  </Row>
                </dd>
              </dl>
            </div>
          </card> -->
  </div>
</template>

<script>
  import echarts from "echarts";
  import * as data from "../../../server/data/dept.js";
  import bar from "@/components/charts/bar/doubelColorBar";
  import lineChart from "@/components/charts/line/line";
  import paiming from "@/components/ranking";
  import ring from "../../../components/charts/ring/ring.vue";
  import ringGraph from "@/components/charts/ring/ringGraph";
  import legendItem from "../../../components/charts/ring/legendItem.vue";
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
  let citys = [{
      rmb: 780,
      cityName: "铜仁市"
    },
    {
      rmb: 720,
      cityName: "遵义市"
    },
    {
      rmb: 700,
      cityName: "贵阳市"
    },
    {
      rmb: 450,
      cityName: "安顺市"
    },
    {
      rmb: 250,
      cityName: "毕节市"
    },
    {
      rmb: 243,
      cityName: "六盘水市"
    },
    {
      rmb: 211,
      cityName: "黔西南市"
    },
    {
      rmb: 199,
      cityName: "黔东南市"
    },
    {
      rmb: 180,
      cityName: "黔南市"
    }
  ];
  let bumens = [{
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
      num: "45万元"
    }
  ];
  let xNames = ["一级", "二级", "三级", "四级", "五级", "未定级"];
  let yNames = ["未定秘", "秘密", "机密", "绝密"];
  let zNames = ["涉密", "敏感", "不宜公开", "依申请公开", "可公开"];
  export default {
    data() {
      let names = ["全国统建", "非全国统建"];
      let colors = ["#579ADD", "#A291F9"];
      let names1 = ["公有云平台", "私有云平台", "传统方式"];
      let colors1 = ["#4886D1", "#8A77E3", "#259B9A"];
      let names2 = ["政务内网", "政务外网", "政务专网", "互联网"];
      let colors2 = ["#4886D1", "#8A77E3", "#259B9A", "#B4EC51"];
      return {
        labels: ["全省各地区全国统建系统分析", "省直部门全国建系统分析"],
        PageActive: "0",
        deptRadio: '省直部门',
        isBar: true,
        top: {
          data: names.map(o => {
            return {
              name: o
            };
          }),
          color: colors
        },
        top1: {
          data: names1.map(o => {
            return {
              name: o
            };
          }),
          color: colors1
        },
        top2: {
          data: names2.map(o => {
            return {
              name: o
            };
          }),
          color: colors2
        },
        barData: {
          xData: citys.map(o => o.cityName),
          series: names.map((o, i) => {
            return {
              type: "bar",
              data: citys.map((oo, ii) => this.$getrandom('001' + i + ii, 500)), // y轴数据
              barCategoryGap: 25,
              barWidth: "30%",
              stack: "n",
              itemStyle: colorLineArr[i]
            };
          })
        },
        barData_1: {
          xData: bumens.map(o => o.title),
          series: names.map((o, i) => {
            return {
              type: "bar",
              data: citys.map((oo, ii) => this.$getrandom('002' + i + ii, 500)), // y轴数据
              barCategoryGap: 25,
              barWidth: "30%",
              stack: "n",
              itemStyle: colorLineArr[i]
            };
          })
        },
        barData1: {
          xData: citys.map(o => o.cityName),
          series: names1.map((o, i) => {
            return {
              type: "bar",
              data: citys.map((oo, ii) => this.$getrandom('003' + i + ii, 800)), // y轴数据
              barCategoryGap: 25,
              barWidth: "30%",
              stack: "n",
              itemStyle: colorLineArr[i]
            };
          })
        },
        barData2: {
          xData: xNames,
          series: [0].map((o, i) => {
            return {
              type: "bar",
              data: xNames.map((oo, ii) => this.$getrandom('004' + i + ii, 2300)), // y轴数据
              barCategoryGap: 25,
              barWidth: "30%",
              stack: "n",
              itemStyle: colorLineArr[i]
            };
          })
        },
        barData2_1: {
          xData: yNames,
          series: [0].map((o, i) => {
            return {
              type: "bar",
              data: yNames.map((oo, ii) => this.$getrandom('005' + i + ii, 1000)), // y轴数据
              barCategoryGap: 25,
              barWidth: "30%",
              stack: "n",
              itemStyle: colorLineArr[i]
            };
          })
        },
        barData2_2: {
          xData: zNames,
          series: [0].map((o, i) => {
            return {
              type: "bar",
              data: zNames.map((oo, ii) => this.$getrandom('006' + i + ii, 1200)), // y轴数据
              barCategoryGap: 25,
              barWidth: "30%",
              stack: "n",
              itemStyle: colorLineArr[i]
            };
          })
        },
        barData3: {
          xData: citys.map(o => o.cityName),
          series: names2.map((o, i) => {
            return {
              type: "bar",
              data: citys.map((oo, ii) => this.$getrandom('007' + i + ii, 800)), // y轴数据
              barCategoryGap: 25,
              barWidth: "30%",
              stack: "n",
              itemStyle: colorLineArr[i]
            };
          })
        },
        ringGraph0: {
          color: [
            "#2FBAB2 ",
            "#1E8589",
            "#579ADD",
            "#2C61B9",
            "#F77A5C",
            "#D95450"
          ],
          list: [],
          isShow: false,
          legendData: [],
          bg: ["#1E8589", "#2C61B9", "#D95450"],
          total: "",
          width: '160',
          height: "160"
        },
        ringGraph1: {
          color: [
            "#5EA8EB",
            "#306FD1",
            "#BDADF2",
            "#8875E1",
            "#E1E885",
            "#BFCC4E"
          ],
          list: [],
          isShow: false,
          legendData: [],
          bg: ["#306FD1", "#8875E1", "#BFCC4E"],
          total: "",
          width: '160',
          height: "160"
        },
        radio: "内部使用",
        capitalSource: {
          data: [],
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
          hasLabel: true,
          isShow: false,
          title: {}
        },
        lixiangyiju: {
          data: [],
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
            "transparent"
          ],
          color: [
            "#FF644F",
            "#ced866",
            "#3FC2BD",
            "#4082da",
            "#5AC426",
            "#9c8ae7"
          ],
          hasLabel: false,
          isShow: false,
          title: {}
        },
        zijinlaiyuan: {
          data: [],
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
        list: {
          title: "贵州省各部门全国统建系数量",
          data: bumens
        },
        listTop: {
          title: "贵州省各地区全国统建系数量",
          data: [{
              title: "贵阳市",
              num: "92万元"
            },
            {
              title: "铜仁市",
              num: "89万元"
            },
            {
              title: "贵黔南市",
              num: "75万元"
            },
            {
              title: "遵义市",
              num: "69万元"
            },
            {
              title: "黔东南市",
              num: "66万元"
            },
            {
              title: "毕节市",
              num: "64万元"
            },
            {
              title: "安顺市",
              num: "62万元"
            }
          ]
        },
        paimingList: [{
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
        series: [],
        line: {
          isShowSymbol: false,
          legendData: [],
          xAxisData: [],
          color: ["#5AC426", "#D95450"],
          series: []
        }
      };
    },
    components: {
      bar,
      paiming,
      ring,
      legendItem,
      lineChart,
      ringGraph
    },
    mounted() {
      this.getCapitalSource();
      this.getLineData();
      this.getPcroomAreaSort();
      this.getLixiangyiju();
      this.getZijinlaiyuan();
      this.getRingGraph(0);
      this.getRingGraph(1);
    },
    methods: {
      randomarr(total = 100, leng = 5) {
        let arr = [];
        for (let i = 0; i < leng; i++) {
          if (i === 4) {
            arr.push(total.toFixed(2));
            break;
          }
          let size = this.random(total * 2 / (leng - 1));
          arr.push(size);
          total -= size;
        }
        return arr;
      },
      random(num = 200, float = 2) {
        return parseInt(Math.random() * num);
      },
      getRingGraph(dataIdx) {
        let arr = this.$getrandom('arr010', 100, 3, true);
        let arr1 = this.$getrandom('arr011', 100, 3, true);
        let randomnum = this.$getrandom('021', 200);
        let params = {
          sysOrgCode: "A06A02A65"
        };
        let res = [{
            data: [{
                total: 11483,
                num: arr[0] * randomnum,
                title: "已迁云",
                percent: arr[0]
              },
              {
                total: 11483,
                num: arr[1] * randomnum,
                title: "计划迁云",
                percent: arr[1]
              },
              {
                total: 11483,
                num: arr[2] * randomnum,
                title: "不迁云",
                percent: arr[2]
              }
            ]
          },
          {
            data: [{
                total: 11483,
                num: arr1[0] * randomnum,
                title: "区(县)部署",
                percent: arr1[0]
              },
              {
                total: 11483,
                num: arr1[1] * randomnum,
                title: "市州部署",
                percent: arr1[1]
              },
              {
                total: 11483,
                num: arr1[2] * randomnum,
                title: "省级部署",
                percent: arr1[2]
              }
            ]
          }
        ][dataIdx];
        let total = 0;
        for (let i = 0; i < res.data.length; i++) {
          total += res.data[i]["num"];
        }
        this["ringGraph" + dataIdx].total = total;
        total = parseFloat(total.toFixed(2));
        res.data.forEach((v, i) => {
          this["ringGraph" + dataIdx].legendData.push({
            value: v.percent,
            name: v.title,
            number: v.num
          });
          this["ringGraph" + dataIdx].list.push({
            name: res.data[i]["title"],
            type: "pie",
            clockWise: false,
            radius: [100 - 6 - i * 20, 100 - i * 20],
            center: ["50%", "50%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            startAngle: 90,
            label: {
              borderRadius: "10"
            },
            data: [{
                value: (total || v.total) - v.num,
                name: "",
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    color: "#293D6F",
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: "#293D6F"
                  }
                }
              },
              {
                value: v.num,
                name: res.data[i]["title"],
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this["ringGraph" + dataIdx].color[0 + i * 2]
                      },
                      {
                        offset: 1,
                        color: this["ringGraph" + dataIdx].color[1 + i * 2]
                      }
                    ])
                  }
                }
              }
            ]
          });
        });
        this["ringGraph" + dataIdx].isShow = true;
        return;
        this.$api.sfQyunGroup().then(res => {
          res = [{
              total: 11483,
              num: 375,
              title: "已迁云",
              percent: "3.27"
            },
            {
              total: 11483,
              num: 203,
              title: "计划迁云",
              percent: "1.77"
            },
            {
              total: 11483,
              num: 548,
              title: "不迁云",
              percent: "4.77"
            },
            {
              total: 11483,
              num: 10357,
              title: "未反馈",
              percent: "90.19"
            }
          ];
          let total = 0;
          this.ringGraph.total = res.data[0].total;
          if (res.data.length && res.data[res.data.length - 1].title == "未反馈") {
            total = res.data[0].total - res.data[res.data.length - 1].num;
            res.data = res.data.slice(0, res.data.length - 1);
            this.ringGraph.total = total;
          }
          res.data.forEach((v, i) => {
            this.ringGraph.legendData.push({
              value: v.percent,
              name: v.title,
              number: v.num
            });
            this.ringGraph.list.push({
              name: res.data[i]["title"],
              type: "pie",
              clockWise: false,
              radius: [100 - 6 - i * 20, 100 - i * 20],
              center: ["50%", "50%"],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              hoverAnimation: false,
              startAngle: 90,
              label: {
                borderRadius: "10"
              },
              data: [{
                  value: (total || v.total) - v.num,
                  name: "",
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    normal: {
                      color: "#293D6F",
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      }
                    },
                    emphasis: {
                      color: "#293D6F"
                    }
                  }
                },
                {
                  value: v.num,
                  name: "四级匹配度",
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: this.ringGraph.color[0 + i * 2]
                        },
                        {
                          offset: 1,
                          color: this.ringGraph.color[1 + i * 2]
                        }
                      ])
                    }
                  }
                }
              ]
            });
          });
          this.ringGraph.isShow = true;
        });
      },
      handelClick(e) {
      },
      getLixiangyiju() {
        this.lixiangyiju.isShow = false;
        this.$nextTick(() => {
          let arr = this.randomarr(100, 5);
          let random = this.random(10);
          let res = {
            data: [{
                number: 2,
                name: "拟建",
                value: "50"
              },
              {
                number: 2,
                name: "在建",
                value: "50"
              },
              {
                number: "0",
                name: "已建",
                value: "0"
              },
              {
                number: "0",
                name: "国家派发",
                value: "0"
              },
              {
                number: "0",
                name: "省级派发",
                value: "0"
              }
            ]
          };
          this.lixiangyiju.data = [];
          res.data.forEach((v, i) => {
            this.lixiangyiju.data.push({
              value: arr[i],
              name: v.name,
              number: arr[i] * random
            });
          });
          this.lixiangyiju.title = {
            title: "立项依据"
          };
          this.lixiangyiju.isShow = true;
        });
        return;
        this.$api.yewuzhuangkuang().then(res => {
          this.lixiangyiju.data = [];
          res.data.forEach((v, i) => {
            this.lixiangyiju.data.push({
              value: v.value,
              name: v.name,
              number: v.number
            });
          });
          this.lixiangyiju.title = {
            title: "立项依据"
          };
          this.lixiangyiju.isShow = true;
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
      // 机房面积排序
      getPcroomAreaSort() {
        this.$api.ITPcroomAreaSort().then(res => {
          this.paimingList = res.data.map(o => {
            return {
              city: o.unitNm,
              value: o.jfSize
            };
          });
        });
      },
      /* 资金来源分析 */
      getCapitalSource() {
        this.$api.funingSourceTrje().then(res => {
          this.capitalSource.data = [];
          res.data.forEach((v, i) => {
            this.capitalSource.data.push({
              value: v.percent,
              name: v.title,
              number: v.num
            });
          });
          this.capitalSource.title = {
            title: "业务系统承<br/>载网络分析"
          };
          this.capitalSource.isShow = true;
        });
      },
      getLineData() {
        this.$api.costSystem().then(res => {
          let constructionCost = {
            list: [],
            sum: ""
          }; // 建设
          let operationCost = {
            list: [],
            sum: ""
          }; // 运维
          res.data.forEach((v, i) => {
            this.line.xAxisData.push(v.year);
            constructionCost.list.push(v.constructionCost);
            operationCost.list.push(v.operationCost);
            constructionCost.sum += v.constructionCost;
            operationCost.sum += Number(v.operationCost);
          });
          this.line.legendData = ["建设", "运维"];
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/style/base/index.scss";
  .moreLink {
    float: right;
    @include font($fz: 16px, $color: #2d8cf0);
    i {
      margin-left: 8px;
    }
  }
  .ringGraph {
    transform: scale(0.8)!important;
  }
  .tabPane {
    // border:2px solid gold;
    position: relative;
    .more {
      position: absolute;
      right: 15px;
      top: -40px;
      cursor: pointer;
      font-size: 14px;
      color: #2d8cf0;
      i {
        font-size: 16px;
        padding-right: 5px;
      }
    }
    .radioGroup {
      position: absolute;
      right: 10%;
      top: -45px;
      height: 26px;
    }
  }
  .paiming {
    min-height: 400px;
    padding: 10px 20px;
    background: rgba(26, 35, 71, 1);
  }
  .paimingTitle {
    color: #2d8cf0;
    line-height: 30px;
    height: 62px;
    span {
      color: rgba(255, 255, 255, 0.5);
    }
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
  dl {
    dt {
      @include font($fz: 18px, $color: #2d8cf0);
      span {
        float: right;
        label {
          @include font($fz: 16px, $color: #2d8cf0);
          margin-left: 15px;
        }
      }
    }
    .centermiddle {
      // margin: 100px 0 0 20px;
      margin: 100px 0 0 0; // border:1px solid #000;
    }
    dd {
      text-align: left;
      margin-top: 10px;
      font-weight: normal;
      p {
        margin-top: 25px;
      }
      .ring-wrapper {
        // transform: scale(1.1)!important;
        margin-top: 50px;
        @include flex($j: center);
        .ivu-col-span-12 {
          @include flex($j: center);
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
    height: 440px; // border:1px solid red;
  }
  .barChartBox {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
