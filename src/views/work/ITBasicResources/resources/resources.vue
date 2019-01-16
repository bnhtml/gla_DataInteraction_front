
<template>
    <div class="resources" v-breadcrumb="breadcrumb">
        <div class="resources-top">
            <div class='titleBar'>
                <Title :title='title1'></Title>
                <span class="right-more" @click='goMore({pagename: "usefull"},0)'>明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            <div class="resources-top-cont">
                <Menu mode="horizontal" :active-name="menuIndex" @on-select='selectMenu'>
                    <MenuItem :name="i" v-for='(v,i) in menuList' :key='i'>{{v}}</MenuItem>
                </Menu>
                <div v-if='menuIndex==0' class="bumenNumber">
                    <dl>
                        <dt><span><strong>{{headerNumbers[0]||0}}</strong>核</span><span>计算资源</span></dt>
                        <dd><img src="../../../../assets/img/icon/table_title_2.png" alt=""></dd>
                        <dd>
                            <!-- <legendItem :legendData='top.data' :bg='top.color' ></legendItem> -->
                        </dd>
                    </dl>
                    <newBar :bar="stackBar" :series="stackBar.Series"></newBar>
                </div>
                <div v-if='menuIndex==1' class="bumenNumber">
                    <dl>
                        <dt><span><strong>{{headerNumbers[1]||0}}</strong>T</span><span>存储资源</span></dt>
                        <dd><img src="../../../../assets/img/icon/table_title_2.png" alt=""></dd>
                        <dd>
                            <!-- <legendItem :legendData='top.data' :bg='top.color' ></legendItem> -->
                        </dd>
                    </dl>
                    <newBar :bar="stackBarTwo" :series="stackBarTwo.Series"></newBar>
                </div>
                <div v-if='menuIndex==2' class="bumenNumber">
                    <dl>
                        <dt><span><strong>{{headerNumbers[2]||0}}</strong>T</span><span>内存资源</span></dt>
                        <dd><img src="../../../../assets/img/icon/table_title_2.png" alt=""></dd>
                        <dd>
                            <!-- <legendItem :legendData='top.data' :bg='top.color' ></legendItem> -->
                        </dd>
                    </dl>
                    <newBar :bar="stackBarThree" :series="stackBarThree.Series"></newBar>
                </div>
            </div>
        </div>
        <div class="resources-top mt20">
            <div class='titleBar'>
                <Title :title='title2'></Title>
                <span class="right-more" @click='goMore({pagename: "putInto"},1)'>明细<i class="iconfont icon-shuangjiantou"></i></span>
            </div>
            
            <Row  class="resources-top-cont">
                <div class="bumenNumber">
                    <dl>
                        <dt><span><strong>{{moreColorBar.allCount||0}}</strong>万元</span><span>云资源投入金额</span></dt>
                        <dd><img src="../../../../assets/img/icon/table_title_2.png" alt=""></dd>
                        <dd>
                        </dd>
                    </dl>
                    <newBar v-if="isMoreColorBar" :bar="moreColorBar" :series="moreColorBarSeries"></newBar>
                </div>
                <Spin size="large" fix v-if="!isMoreColorBar">
                    <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                </Spin>
            </Row>
        </div>
        <!-- <Card class="cardHeight">
               <dl>
                   <div class='titleBar'>
                        <Title :title='"各地区云资源使用情况"'></Title>
                        <span class="right-more" @click='goMore({pagename: "usefull"})'>明细<i class="iconfont icon-shuangjiantou"></i></span>
                    </div>
                   <dd>
                        <Row class='mt20 '>
                            <i-col span="8">
                            <dl>
                                <dt>可用CPU资源</dt>
                                <dd> <b>{{headerNumbers[0]}}</b>核</dd>
                                <dd>
                                <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                                </dd>
                            </dl>
                            <newBar :bar="stackBar" :series="stackBar.Series"></newBar>
                            </i-col>
                            <i-col span="8">
                            <dl>
                                <dt>可用硬盘资源存储空间</dt>
                                <dd> <b>{{headerNumbers[1]}}</b>T</dd>
                                <dd>
                                <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                                </dd>
                            </dl>
                            <newBar :bar="stackBarTwo" :series="stackBarTwo.Series"></newBar>
                            </i-col>
                            <i-col span="8">
                            <dl>
                                <dt>可用内存资源</dt>
                                <dd> <b>{{headerNumbers[2]}}</b>G</dd>
                                <dd>
                                <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                                </dd>
                            </dl>
                            <newBar :bar="stackBarThree" :series="stackBarThree.Series"></newBar>
                            </i-col>
                        </Row>
                   </dd>
               </dl>
            </Card> -->
        <!-- <Card class="card-stachBar">
              <Menu mode="horizontal" :active-name="$route.query.type==1?'2':'1'" @on-select='changeMenu'>
                <MenuItem name="2">各地区云资源使用情况
                </MenuItem>
                <MenuItem name="1">部门云资源使用情况
                </MenuItem>
              </Menu>
              <p class="card-title" style='position:absolute;top:15px;right:15px;z-index:999'><span @click='goMore({pagename: "usefull"})'>更多<i class="iconfont icon-shuangjiantou"></i></span></p>
              <Row class='mt20 '>
                <i-col span="8">
                  <dl>
                    <dt>可用CPU资源</dt>
                    <dd> <b>{{headerNumbers[0]}}</b>核</dd>
                    <dd>
                      <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                    </dd>
                  </dl>
                  <newBar :bar="stackBar" :series="stackBar.Series"></newBar>
                </i-col>
                <i-col span="8">
                  <dl>
                    <dt>可用硬盘资源存储空间</dt>
                    <dd> <b>{{headerNumbers[1]}}</b>T</dd>
                    <dd>
                      <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                    </dd>
                  </dl>
                  <newBar :bar="stackBarTwo" :series="stackBarTwo.Series"></newBar>
                </i-col>
                <i-col span="8">
                  <dl>
                    <dt>可用内存资源</dt>
                    <dd> <b>{{headerNumbers[2]}}</b>G</dd>
                    <dd>
                      <legendItem :legendData='top.data' :bg='top.color'></legendItem>
                    </dd>
                  </dl>
                  <newBar :bar="stackBarThree" :series="stackBarThree.Series"></newBar>
                </i-col>
              </Row>
            </Card> -->
        <!-- <Card class="cardHeight mt15" >
                <dl>
                    <div class='titleBar'>
                        <Title :title='"各地区云资源投入分析"'></Title>
                        <span class="right-more" @click='goMore({pagename: "usefull"})'>明细<i class="iconfont icon-shuangjiantou"></i></span>
                    </div>
                    <dd>
                        <Row>
                            <div>
                                <dl>
                                <dt>云资源投入金额</dt>
                                <dd><b>{{moreColorBar.allCount||0}} </b>万元</dd>
                                </dl>
                            </div>
                            <i-col span="24">
                                <legendItem :legendData='moreColorBar.legendItem' :bg='moreColorBar.legendColor'></legendItem>
                                <newBar v-if="isMoreColorBar" :bar="moreColorBar" :series="moreColorBarSeries"></newBar>
                            </i-col>
                            <Spin size="large" fix v-if="!isMoreColorBar">
                                <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                            </Spin>
                        </Row>
                    </dd>
                </dl>
                 </Card> -->
        <!-- <Card class="card-moreColorBar mt20">
              <p class="card-title" style="position: relative; z-index: 1000"><span @click='goMore({pagename: "putInto"})'>更多<i class="iconfont icon-shuangjiantou"></i></span></p>
              <Tabs :value="$route.query.type==1?'name1':'name2'" :animated="false" @on-click="changeMoreColorBar">
                <TabPane label="各地区云资源投入分析" name="name1">
                  <div class="title mt20">
                    <Row>
                      <div>
                        <dl>
                          <dt>云资源投入金额</dt>
                          <dd><b>{{moreColorBar.allCount||0}} </b>万元</dd>
                        </dl>
                      </div>
                      <i-col span="24">
                        <legendItem :legendData='moreColorBar.legendItem' :bg='moreColorBar.legendColor'></legendItem>
                        <newBar v-if="isMoreColorBar" :bar="moreColorBar" :series="moreColorBarSeries"></newBar>
                      </i-col>
                      <Spin size="large" fix v-if="!isMoreColorBar">
                        <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                      </Spin>
                    </Row>
                  </div>
                </TabPane>
                <TabPane label="部门云资源投入分析" name="name2">
                  <div class="title mt20">
                    <Row>
                      <div>
                        <dl>
                          <dt>云资源投入金额</dt>
                          <dd><b>{{isMoreColorBar.allCount||0}} </b>万元</dd>
                        </dl>
                      </div>
                      <i-col span="24">
                        <legendItem :legendData='isMoreColorBar.legendItem' :bg='isMoreColorBar.legendColor'></legendItem>
                        <newBar v-if="isMoreColorBarTop" :bar="isMoreColorBar" :series="moreColorBarSeries"></newBar>
                      </i-col>
                      <Spin size="large" fix v-if="!isMoreColorBarTop">
                        <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                      </Spin>
                    </Row>
                  </div>
                </TabPane>
              </Tabs>
            </Card> -->
        <Row class="card-pie mt20" v-if="sourceProject">
            <i-col span="12">
                <Card class="cardHeight ">
                    <div>
                        <dl>
                            <div class='titleBar'>
                                <Title :title='"资金来源分析"'></Title>
                                <span class="right-more" @click='goMore({pagename: "laiyuan"})'>明细<i class="iconfont icon-shuangjiantou"></i></span>
                            </div>
                            <!-- <dt class="card-title">资金来源分析<span @click='goMore({pagename: "laiyuan"})'>更多<i class="iconfont icon-shuangjiantou"></i></span></dt> -->
                            <dd>
                               
                                <row class='ring-wrapper'>
                                    <i-col span='12'>
                                        <ring @click.native='goMore()' v-if='zijinlaiyuan.isShow' :data='zijinlaiyuan.data' :labelColor='zijinlaiyuan.labelColor' :color='zijinlaiyuan.color' :title='zijinlaiyuan.title' :hasLabel='zijinlaiyuan.hasLabel'></ring>
                                    </i-col>
                                    <i-col span='12'>
                                        <div class="legendItemWrapper">
                                            <legendItem :legendData='zijinlaiyuan.data' :bg='zijinlaiyuan.color'></legendItem>
                                        </div>
                                    </i-col>
                                </row>
                            </dd>
                        </dl>
                    </div>
                    <Spin size="large" fix v-if="!zijinlaiyuan.isShow">
                        <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                    </Spin>
                </Card>
            </i-col>
            <i-col span="12">
                <Card class="cardHeight">
                    <div>
                        <dl>
                            <div class='titleBar'>
                                <Title :title='"立项依据分析"'></Title>
                                <span class="right-more" @click='goMore({pagename: "lixiang"})'>明细<i class="iconfont icon-shuangjiantou"></i></span>
                            </div>
                            <dd>
                                <row class='ring-wrapper'>
                                    <i-col span='12'>
                                        <ring @click.native='goMore({pagename: "lixiang"})' v-if='setPro.isShow' :data='setPro.data' :labelColor='setPro.labelColor' :color='setPro.color' :title='setPro.title' :hasLabel='setPro.hasLabel'></ring>
                                    </i-col>
                                    <i-col span='12'>
                                        <div class="legendItemWrapper">
                                            <legendItem :legendData='setPro.data' :bg='setPro.color'></legendItem>
                                        </div>
                                    </i-col>
                                </row>
                            </dd>
                        </dl>
                    </div>
                    <Spin size="large" fix v-if="!setPro.isShow">
                        <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
                    </Spin>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script type="text/javascript">
    import echarts from 'echarts';
    import ring from "@/components/charts/ring/ring.vue";
    import legendItem from "@/components/charts/ring/legendItem.vue";
    import newBar from "@/components/charts/bar/newBar.vue";
    import * as data from "@/server/data/dept.js";
    import Title from '@/components/title/index';
    let colorArr = [{
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#2e6ac6" 
                },
                {
                    offset: 1,
                    color: "#2b54a0" 
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
        }
    ];
    const radios2 = ['所有资源', 'CPU资源', '内存资源', '硬盘资源'];
    export default {
        name: "resources",
        data() {
            let {
                query,
                params,
                name,
                fullPath
            } = this.$route;
            query.mapQuery = JSON.parse(query.mapQuery)
            query.areaids =query.mapQuery.areaids?query.mapQuery.areaids: query.radioBtn;
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
            if(query.mapQuery.name) leftname = query.mapQuery.name;
            return {
                query,
                leftname,
                titlename: leftname + '云资源情况',
                breadcrumb: [{
                        icon: 'dingwei',
                        name: 'IT基础资源分析'
                    },
                    parent,
                    {
                        name: leftname + '云资源情况',
                        url: fullPath
                    }
                ],
                sourceProject: false,
                menuIndex: 0,
                menuList: ['计算资源', '存储资源', '内存资源'],
                /* czz */
                headerNumbers: [0, 0, 0],
                radios2,
                setProRadio: 0,
                moneyRadio: 0,
                
                isMoreColorBar: false,
                // 各地区云资源投入分析信息配置
                moreColorBarSeries: [],
                moreColorBar: {
                    company:['万元'],
                    height: 363,
                    xData: [],
                    labelnames: ['云资源投入金额'],
                    allCount: '',
                    colorArr: colorArr,
                    legendItem: [{
                        name: "云资源投入金额"
                    }, ],
                    legendColor: ["#2e6ac6", "#d56c59", "#2ba9ac"]
                },
                allCount: {
                    city: [],
                    bumen: []
                },
                legendData: {
                    data: [{
                            name: "硬件数量"
                        },
                        {
                            name: "软件数量"
                        },
                        {
                            name: "建设费用"
                        },
                        {
                            name: "运维费用"
                        }
                    ],
                    color: ["#FF644F", "#ced866", "#3FC2BD", "#8e80de"]
                },
                zijinlaiyuan: {
                    data: [{
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
                        {
                            value: Math.ceil(Math.random() * 20),
                            name: "未反馈",
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
                    title: {
                        title: '投入金额(万元)'
                    }
                },
                setPro: {
                    data: [{
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
                            name: "自建",
                            number: 600
                        }
                    ],
                    labelColor: [
                        "#CF9D41",
                        "transparent",
                        "#FF644F",
                        "transparent",
                        "#ced866",
                        "transparent",
                        "#3FC2BD",
                        "transparent",
                        "#4082da",
                        "transparent",
                        "#9c8ae7",
                        "transparent",
                        "#19be6b",
                        "transparent",
                    ],
                    color: ["#CF9D41", "#FF644F", "#ced866", "#3FC2BD", "#4082da", "#9c8ae7", "#19be6b"],
                    hasLabel: false,
                    isShow: false,
                    title: {}
                },
                top: {
                    data: [{
                            name: "已使用资源"
                        },
                        {
                            name: "未使用资源"
                        }
                    ],
                    color: ["#2e6ac6", "#2ba9ac"]
                },
                stackBar: {
                    company:['核'],
                    height: 300,
                    xData: [],
                    labelnames: ['计算资源'],
                    colorArr: colorArr,
                    num: 6,
                    Series: [],
                },
                stackBarTwo: {
                    company:['T'],
                    height: 300,
                    xData: [],
                    labelnames: ['存储资源'],
                    colorArr:colorArr,
                    num: 6,
                    Series: [],
                },
                stackBarThree: {
                    company:['T'],
                    height: 300,
                    xData: [],
                    labelnames: ['内存资源'],
                    colorArr:colorArr,
                    num: 6,
                    Series: []
                },
                
            };
        },
        computed: {
            title1() {
                return this.leftname + '云资源使用情况';
            },
            title2() {
                return this.leftname + "云资源投入分析";
            },
            ISareaids(){
                if(typeof this.query.areaids=='string') this.query.areaids = Number(this.query.areaids)
                return [1,2,3,4,5,6,7,8,9,10,11].indexOf(this.query.areaids) ==-1?false:true
            }
        },
        components: {
            legendItem,
            ring,
            newBar,
            Title,
        },
        created(){
            
        },
        mounted() {
            this.changeMenu();
           this.getZiyuantouruBybumen();
        },
        methods: {
            /* 切换 部门云资源使用情况  */
            selectMenu(e) {
                this.menuIndex = e;
            },
            
            // 获取部门---地区服务资源投入分析数据
            getZiyuantouruBybumen() {
                // debugger
                let index;
                if(this.$route.query.type==2||this.ISareaids){
                    index = 0
                }else {
                    index = 1
                }
                // 部门  --- 地区
                let url =['ziyuantouruBybumen','ziyuantouruBydiqu'][index]
                this.isMoreColorBar = false;
                this.$api.ITBasic[url]({
                    areaids:this.query.areaids,
                    orgRootId:this.query.mapQuery.orgRootId,
                    }).then(res => {
                    this.moreColorBar.allCount = res && res.allCount;
                    this.moreColorBar.xData = res.data.map(o => o.deptName);
                    this.moreColorBarSeries = this.moreColorBar.labelnames.map((o, i) => {
                        return {
                            name: o,
                            type: 'bar',
                            data: res.data.map(v => {
                                return v.trje
                            }),
                            barCategoryGap: 25,
                            barWidth: 30,
                        }
                    })
                    this.isMoreColorBar = true;
                })
            },
            getHeaderNumbers(label) {
                this.headerNumbers = [];
                for (let i = 0; i < 3; i++) {
                    this.headerNumbers.push(this.$getrandom("006" + label + i, 10000));
                }
            },
            /* 资金来源分析 */
            getCapitalSource(e, name, param = {}) {
                e.isShow = false;
                let aboutObj = {
                    "3": {
                        url: "zijinlaiyuanfenixi"
                    },
                    "2": {
                        url: "lixiangyijufenxi"
                    }
                }[name.split("").pop()];
                this.$api.ITBasic[aboutObj.url]({ ...query,
                    ...param
                }).then(res => {
                    e.data = res.data;
                    e.title = {
                        title: res.allCount.name + '(万元)',
                        num: res.allCount.size
                    };
                    e.data = this.getOrder(e.data)
                    setTimeout(() => {
                        e.isShow = true;
                    }, 0);
                });
            },
            getStackBar(e, name) {
                let querys = [{
                    type: 1,
                    areaids:this.query.areaids,
                    orgRootId:this.query.mapQuery.orgRootId,
                }, {
                    type: 3,
                    areaids:this.query.areaids,
                    orgRootId:this.query.mapQuery.orgRootId,
                }, {
                    type: 2,
                    areaids:this.query.areaids,
                    orgRootId:this.query.mapQuery.orgRootId,
                }];
                // debugger
                let index;
                if(this.$route.query.type==2||this.ISareaids){
                    index = 0
                }else {
                    index = 1
                }
                // 部门  --- 地区
                let url =["ziyuanshiyongBybumen", "ziyuanshiyongBydiqu"][index]
                let item = {
                    "11": {
                        query: querys[0],
                        url: url,//0
                        sumIdx: 0
                    },
                    "12": {
                        query: querys[1],
                        url: url,//0
                        sumIdx: 1
                    },
                    "13": {
                        query: querys[2],
                        url: url,//0
                        sumIdx: 2
                    },
                    "21": {
                        query: { ...querys[0],
                            // areaids: -1
                        },
                        url: url,//1
                        sumIdx: 0
                    },
                    "22": {
                        query: { ...querys[1],
                            // areaids: -1
                        },
                        url: url,//1
                        sumIdx: 1
                    },
                    "23": {
                        query: { ...querys[2],
                            // areaids: -1
                        },
                        url: url, // 1
                        sumIdx: 2
                    }
                }[name];
                let dataname = ['size'];
                e.xData = [];
                e.Series = [];
                this.$api.ITBasic[item.url](item.query).then(res => {
                    this.headerNumbers[item.sumIdx] = res.allCount.keyong; 
                    e.xData = res.data.map(o => o.deptName);
                    e.Series = dataname.map((o, i) => {
                        return {
                            name: e.labelnames[i],
                            type: 'bar',
                            stack: "i",
                            barWidth: 20,
                            data: res.data.map(v => v[o])
                        };
                    })
                });
                return;
            },
            goMore(params = {
                pagename: 'resourcePage'
            }, idx) {
                this.$router.push({
                    name: 'tablepage',
                    params,
                    query: {
                        ...this.query,
                        title: this.titlename,
                        backPathName: this.$route.name,
                        tableTitle: idx == 0 ? this.title1 : this.title2,
                        areaids:this.query.areaids,
                        orgRootId:this.query.mapQuery.orgRootId,
                    }
                });
            },
            changeMenu() {
                let label;
                if(this.$route.query.type==2||this.ISareaids){
                    label = 1
                }else {
                    label = 2
                }
                this.getStackBar(this.stackBar, label + "1");
                this.getStackBar(this.stackBarTwo, label + "2");
                this.getStackBar(this.stackBarThree, label + "3");
            },
            changeSetPro(idx) {
                this.setPro.isShow = false;
                let param = idx < 1 ? {} : {
                    type: idx
                };
                this.getCapitalSource(this.setPro, idx + "2", param);
            },
            changeMoney(idx) {
                this.zijinlaiyuan.isShow = false;
                let param = idx < 1 ? {} : {
                    type: idx
                };
                this.getCapitalSource(this.zijinlaiyuan, idx + "3", param);
            },
            /* 未反馈排序 */
            getOrder(data) {
                data.forEach((v, i) => {
                    if (v.name == '未反馈') {
                        data.push(v)
                        this.$nextTick(() => {
                            data.slice(1)
                        })
                    }
                })
                return data.slice(1)
            }
        }
    };
</script>

<style scoped lang='scss'>
    @import "@/assets/style/base/index.scss";
    .mt20 {
        margin-top: 20px;
    }
    .ivu-tabs-content,
    .ivu-tabs-content-animated {
        background-color: #1a2247 !important;
    }
    .resources {
        @include nums($w: 100%);
        .resources-top {
            .resources-top-cont {
                height: 440px;
                @extend %TitleBorder;
                border-top: 0;
                padding: 0 28px;
                .ivu-menu-horizontal{
                    z-index: 0;
                }
            }
            .h460 {
                height: 460px;
            }
        }
        /* czz-end */
        .card-moreColorBar,
        .card-stachBar {
            position: relative;
            .ivu-row {
                background-color: #1a2247;
                padding: 15px;
            }
            dl {
                @include font($fz: 14px, $color: rgba(255, 255, 255, 0.65));
                dd {
                    b {
                        @include font($fz: 24px, $color: #05a3d7);
                    }
                }
            }
        }
        .card-moreColorBar {
            height: 588px;
            div {
                position: relative;
                dl {
                    display: inline-block;
                    min-width: 300px;
                }
            }
        }
        .tip {
            position: absolute;
            right: 20px;
            top: 15px;
            @include font($fz: 14px, $color: #d56456);
        }
    }
    .ivu-col {
        padding-left: 10px;
        padding-right: 10px;
    }
    %margin {
        margin-left: -10px;
        margin-right: -10px;
    }
    .card-pie {
        @extend %margin;
        margin-top: 20px;
        .ivu-col-span-12 {
            .ivu-card-body {
                &>div {
                    @include nums($w: 100%, $h: 400px);
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
                        dd {
                            text-align: left;
                            margin-top: 10px;
                            font-weight: normal;
                            p {
                                margin-top: 25px;
                            }
                            .ring-wrapper {
                                margin-top: 50px;
                                @include flex($j: center);
                                .ivu-col-span-12 {
                                    @include flex($j: center);
                                }
                                span {
                                    margin: auto 0;
                                    &:last-child {
                                        display: inline-block;
                                        @include nums($w: 250px);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .cardHeight {
        //   width: 100%;
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
    .bumenNumber {
        // padding-left: 30px;
        padding-left: 24px;
        dl {
            border-left: solid 3px #fbca22;
            height: 40px;
            padding-left: 26px;
            margin-top: 20px; //   margin-bottom: 40px;
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
            dd:last-child {
                top: 26px;
                left: -120px;
            }
        }
    }
</style>
