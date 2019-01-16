<template>
  <div class="specialTablexz" v-breadcrumb='breadcrumb'>
     <!-- <h2 class="special-title" :style="{background:'url('+titleBg+') no-repeat center center'}">
      <router-link :to="{name:'specialIndex',query:{orgType:1}}">数据资产综合分析</router-link>
      <span @click='goBack' class="back">返回 <i class="iconfont icon-fanhui"></i> </span>
    </h2> -->
    <Title :title="bmName+title"></Title>
    <div class="table">
      <div class="dateSearch" v-if='$route.query.type.indexOf("sourceanalysis") !=-1'>
        <DatePicker @on-change='changeDate' v-model="sourceanalysis.year" type="year" placeholder="请输入年份" style="width: 200px" :clearable='true'></DatePicker>
      </div>
      <p @click="clickOutData" v-show='downloadIsShow' class="out-p">导出明细 <i class="iconfont icon-daochu"></i></p>
      <ul class='tab' v-if='ifTab'>
        <li v-if='$route.query.type.indexOf("sourceanalysis")!=-1 || $route.query.type.indexOf("usedetail")!=-1' v-for='(v,i) in tabMoneyList' :name="v.title" :key='i' :class='tabActive==v.tabId?"active":""' @click="changeTab(i,v.tabId)"> {{v.title}}({{v.num}})
        </li>
        <li v-if='$route.query.type.indexOf("sourceanalysis")==-1 && $route.query.type.indexOf("usedetail")==-1' v-for='(v,i) in tabList' :name="v.title" :key='i' :class='tabActive==v.tabId?"active":""' @click="changeTab(i,v.tabId)"> {{v.title}}({{v.num}})
        </li>
      </ul>
      <NomalTable :table-json="tableJson" :url='url' axiosType="post" v-if='tableISSHow' >
        <TableSearch :searchs="searchs"></TableSearch>
      </NomalTable>
      <!-- <div class="remarks"> <img src="../../../../assets/img/icon/table_tips.png" alt=""> 建设费用  运维费用</div> -->
    </div>
    <Spin size="large" fix v-if="loadingISShow">
      <span class="demo-spin-icon-load"><i class="iconfont icon-loading "></i></span>
    </Spin>
  </div>
</template>

<script>
  import fundUse from './config/fundUse'
  import Title from '@/components/title/index.vue';
  import NomalTable from '@/components/table/NomalTable.vue';
  import TableSearch from "@/components/table/TableSearch";
  import appBase from "@/../static/common/app_base.js"
  import {
    SERVER_BASE_URL
  } from '@/http/config.js';
  import {
    alreadyxx, // 已填报  - 二级 - 信息系统
    alreadyjf, // 已填报  - 二级 - 机房q
    alreadyyj, // 已填报  - 二级 - 硬件
    alreadyrj, // 已填报  - 二级 - 软件
    alreadysjzc, // 已填报  - 二级 - 数据资产
    alreadyyzy, // 已填报  - 二级 - 云资源
    buildxz, // 建设情况分析  - 二级 
    compliancexx, //合规度  - 二级 - 信息系统
    compliancejf, //合规度  - 二级 - 机房
    complianceyj, //合规度  - 二级 - 硬件
    compliancerj, //合规度  - 二级 - 软件
    compliancesjzc, //合规度  - 二级 - 数据资产
    complianceyzy, //合规度  - 二级 - 云资源
    completenessxx,
    completenessjf,
    completenessyj,
    completenessrj,
    completenesssjzc,
    completenessyzy,
    migratedCloudsxz, // 迁云情况 - 二级
    sharexz, // 接入共享平台 - 二级
    officehallxz, // 接入网上办事大厅 - 二级
    specialnetworkxz, // 专网
    sourceanalysisxx, // 资源分析 - 信息
    sourceanalysisjf, // 资源分析 - 机房
    sourceanalysisyj, // 资源分析 - 硬件
    sourceanalysisrj, // 资源分析 - 软件
    sourceanalysisyzy, // 资源分析 - 云资源
    cloudResourcesxz, // 云资源 - 二级
  } from './tableJson.js';
  import {
    alreadyxxSearch,
    alreadyjfSearch,
    alreadyyjSearch,
    alreadyrjSearch,
    alreadysjzcSearch,
    alreadyyzySearch,
    completenessxxSearch,
    completenessjfSearch,
    completenessyjSearch,
    completenessrjSearch,
    completenesssjzcSearch,
    completenessyzySearch,
    compliancexxSearch,
    compliancejfSearch,
    complianceyjSearch,
    compliancerjSearch,
    compliancesjzcSearch,
    complianceyzySearch,
    buildSearch,
    migratedCloudsSearch,
    shareSearch,
    officehallSearch,
    specialnetworkSearch,
    sourceanalysisSearch,
  } from './tableSearch.js'
import { costSystem } from '../../../../server/getData';
  let MOCK_URL = 'http://39.107.233.177:36743'
  let config = {
    fundUse,
    buildxz: {
      tableJson: buildxz, // 业务 - 建设 
      searchs: buildSearch,
      url: `${SERVER_BASE_URL}/api/system/list`,
    },
    alreadyxx: {
      tableJson: alreadyxx, // 信息
      searchs: alreadyxxSearch,
      url: `${SERVER_BASE_URL}/api/system/list`,
    },
    alreadyjf: {
      tableJson: alreadyjf, // 机房
      searchs: alreadyjfSearch,
      url: `${SERVER_BASE_URL}/api/ComputerRoom/getComRoomSizeListBySecondLevel`,
    },
    alreadyyj: {
      tableJson: alreadyyj, // 硬件
      searchs: alreadyyjSearch,
      url: `${SERVER_BASE_URL}/api/equipment/list`,
    },
    alreadyrj: {
      tableJson: alreadyrj, // 软件
      searchs: alreadyrjSearch,
      url: `${SERVER_BASE_URL}/api/softwares/list`,
    },
    alreadysjzc: {
      tableJson: alreadysjzc, // 数据资产
      searchs: alreadysjzcSearch,
      url: `${SERVER_BASE_URL}/api/dataAsset/list`,
    },
    alreadyyzy: {
      tableJson: alreadyyzy, // 填报云资源
      searchs: alreadyyzySearch,
      url: `${SERVER_BASE_URL}/api/fillReportSituation/getCloudResourcesList`,
    },
    compliancexx: {
      tableJson: compliancexx, //合规度  - 二级 - 信息系统
      searchs: compliancexxSearch,
      url: `${SERVER_BASE_URL}/api/compliance/getComplianceAllList`,
    },
    compliancejf: {
      tableJson: compliancejf, //合规度  - 二级 - 机房
      searchs: compliancejfSearch,
      url: `${SERVER_BASE_URL}/api/compliance/getComplianceAllList`,
    },
    complianceyj: {
      tableJson: complianceyj, //合规度  - 二级 - 硬件
      searchs: complianceyjSearch,
      url: `${SERVER_BASE_URL}/api/compliance/getComplianceAllList`,
    },
    compliancerj: {
      tableJson: compliancerj, //合规度  - 二级 - 软件
      searchs: compliancerjSearch,
      url: `${SERVER_BASE_URL}/api/compliance/getComplianceAllList`,
    },
    compliancesjzc: {
      tableJson: compliancesjzc, //合规度  - 二级 - 数据资产
      searchs: compliancesjzcSearch,
      url: `${SERVER_BASE_URL}/api/compliance/getComplianceAllList`,
    },
    complianceyzy: {
      tableJson: complianceyzy, //合规度  - 二级 - 云资源
      searchs: complianceyzySearch,
      url: `${SERVER_BASE_URL}/api/compliance/getComplianceAllList`,
    },
    completenessxx: {
      tableJson: completenessxx, // 完备度  - 二级 - 信息
      searchs: completenessxxSearch,
      url: `${SERVER_BASE_URL}/api/abnormal/completenessList`,
    },
    completenessjf: {
      tableJson: completenessjf, // 完备度  - 二级 - 机房
      searchs: completenessjfSearch,
      url: `${SERVER_BASE_URL}/api/abnormal/completenessList`,
    },
    completenessyj: {
      tableJson: completenessyj, // 完备度  - 二级 - 硬件
      searchs: completenessyjSearch,
      url: `${SERVER_BASE_URL}/api/abnormal/completenessList`,
    },
    completenessrj: {
      tableJson: completenessrj, // 完备度  - 二级 - 软件
      searchs: completenessrjSearch,
      url: `${SERVER_BASE_URL}/api/abnormal/completenessList`,
    },
    completenesssjzc: {
      tableJson: completenesssjzc, // 完备度  - 二级 - 数据资产
      searchs: completenesssjzcSearch,
      url: `${SERVER_BASE_URL}/api/abnormal/completenessList`,
    },
    completenessyzy: {
      tableJson: completenessyzy, // 完备度  - 二级 - 云资源
      searchs: completenessyzySearch,
      url: `${SERVER_BASE_URL}/api/abnormal/completenessList`,
    },
    migratedCloudsxz: {
      tableJson: migratedCloudsxz, //  迁云
      searchs: migratedCloudsSearch,
      url: `${SERVER_BASE_URL}/api/system/monographicList`,
    },
    sharexz: {
      tableJson: sharexz, //  接入共享平台
      searchs: shareSearch,
      url: `${SERVER_BASE_URL}/api/system/monographicList`,
    },
    officehallxz: {
      tableJson: officehallxz, //  接入网上办事大厅
      searchs: officehallSearch,
      url: `${SERVER_BASE_URL}/api/system/monographicList`,
    },
    specialnetworkxz: {
      tableJson: specialnetworkxz, //  专网
      searchs: specialnetworkSearch,
      url: `${SERVER_BASE_URL}/api/system/monographicList`,
    },
    sourceanalysisxx: {
      tableJson:{column:[0,1,2,3,4,7].map(o=> sourceanalysisxx.column[o])} , //  资金来源分析
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    sourceanalysisjf: {
      tableJson: {column:[0,1,2,3,4,7].map(o=> sourceanalysisjf.column[o])}, //  资金来源分析 - 机房
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    sourceanalysisyj: {
      tableJson: {column:[0,1,2,3,4,7].map(o=> sourceanalysisyj.column[o])}, //  资金来源分析 - 硬件
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    sourceanalysisrj: {
      tableJson: {column:[0,1,2,3,4,7].map(o=> sourceanalysisrj.column[o])}, //  资金来源分析 - 软件
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    sourceanalysisyzy: {
      tableJson: {column:[0,1,2,3,6].map(o=> sourceanalysisyzy.column[o])}, //  资金来源分析 - 云资源
      searchs: complianceyzySearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getCloudSourceFundsListData`,
    },
    usedetailxx:{
      tableJson:{column:[0,1,3,5,6,7].map(o=> sourceanalysisxx.column[o])} , //  资金使用明细 - 信息
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    usedetailjf:{
      tableJson:{column:[0,1,3,5,6,7].map(o=> sourceanalysisjf.column[o])} , //  资金使用明细 - 机房
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    usedetailyj:{
      tableJson:{column:[0,1,3,5,6,7].map(o=> sourceanalysisyj.column[o])} , //  资金使用明细 - 硬件
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    usedetailrj:{
      tableJson:{column:[0,1,3,5,6,7].map(o=> sourceanalysisrj.column[o])} , //  资金使用明细 - 软件
      searchs: sourceanalysisSearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getSourceFundsListDataDetail`,
    },
    usedetailyzy:{
       tableJson: {column:[0,1,2,4,5,6].map(o=> sourceanalysisyzy.column[o])}, //  资金来源分析 - 云资源
      searchs: complianceyzySearch,
      url: `${SERVER_BASE_URL}/api/sourceFunds/getCloudSourceFundsListData`,
    },
    cloudResourcesxz:{
       tableJson: cloudResourcesxz, //  云资源
      searchs: alreadyyzySearch, //填报和云资源搜索类型一致
      url: `${SERVER_BASE_URL}/api/couldResource/getCloudResourceDetailedList`,
    },
  };
  export default {
    name: 'specialTablexz',
    data() {
      let {query,} = this.$route
      let backQuery = JSON.parse(query.backQuery)
      /* 
        query.type:资金投入分析（特殊）
        backQuery.type:业务等模块（常规）
       */
      let parent_0={
        already:{name:'数据资产填报',url:{name:'specialTable',query:backQuery}},
        compliance:{name:'数据合规度',url:{name:'specialTable',query:backQuery}},
        build:{name:'业务系统建设情况',url:{name:'specialTable',query:backQuery}},
        specialnetwork:{name:'专网环境运行系统分析',url:{name:'specialTable',query:backQuery}},
        migratedClouds:{name:'业务系统迁云情况',url:{name:'specialTable',query:backQuery}},
        officehall:{name:'业务系统接入网上办事大厅情况',url:{name:'specialTable',query:backQuery}},
        share:{name:'业务系统接入共享平台情况',url:{name:'specialTable',query:backQuery}},
        sourceanalysis:{name:'各部门资金来源分析',url:{name:'specialTable',query:backQuery}},
        cloudResources:{name:'云资源',url:{name:'specialTable',query:backQuery}},
        pcRoomC:{name:'机房',url:{name:'specialTable',query:backQuery}},
        servers:{name:'服务器',url:{name:'specialTable',query:backQuery}},
        completeness:{name:'数据完备度',url:{name:'specialTable',query:backQuery}},
        usedetailyzy:{name:'资金投入分析',url:{name:'specialMoneyUsez',query:backQuery}},
        usedetailxx:{name:'资金投入分析',url:{name:'specialMoneyUsez',query:backQuery}},
        usedetailjf:{name:'资金投入分析',url:{name:'specialMoneyUsez',query:backQuery}},
        usedetailyj:{name:'资金投入分析',url:{name:'specialMoneyUsez',query:backQuery}},
        usedetailrj:{name:'资金投入分析',url:{name:'specialMoneyUsez',query:backQuery}},
      }[backQuery.type||query.type];
      return {
        breadcrumb: [{
            icon: 'dingwei',
            name: '数据资产综合分析'
          },
          parent_0,
          {name:'明细'}
        ],
        titleBg: require('../../../../assets/img/bg/special_title_bg.png'),
        tableISSHow: true,
        ifTab: true,
        loadingISShow: false, // 下载loading
        tabList: [{
          title: '信息系统',
          num: '0',
          tabId: 1
        }, {
          title: '机房',
          num: '0',
          tabId: 2
        }, {
          title: '硬件',
          num: '0',
          tabId: 3
        }, {
          title: '软件',
          num: '0',
          tabId: 4
        }, {
          title: '数据资产',
          num: '0',
          tabId: 5
        }, {
          title: '云资源',
          num: '0',
          tabId: '6,7,8,9'
        }, ],
        tabMoneyList: [{
          title: '信息系统',
          num: '0',
          tabId: 5
        }, {
          title: '机房',
          num: '0',
          tabId: 2
        }, {
          title: '硬件',
          num: '0',
          tabId: 1
        }, {
          title: '软件',
          num: '0',
          tabId: 4
        }, {
          title: '云资源',
          num: '0',
          tabId: ''
        }],
        tabActive: window.sessionStorage.getItem('specialTabIndex') || this.$route.query.types ,
        searchs: config[this.$route.query.type].searchs,
        query: this.$route.query,
        url: config[this.$route.query.type].url,
        tableJson: config[this.$route.query.type].tableJson,
        sourceanalysis: {
          year: this.$route.query.year||'',
          i: '',
          tabId: ''
        }
      }
    },
    components: {
      Title,
      NomalTable,
      TableSearch,
    },
    computed: {
      downloadIsShow() {
        return ['buildxz', 'fundUse'].indexOf(this.$route.query.type) === -1;
      },
      title() {
        if (this.$route.query.type == "buildxz") {
          return '业务系统建设明细'
        } else if (this.$route.query.type == "migratedCloudsxz") {
          return '业务系统迁云情况明细'
        } else if (this.$route.query.type == "sharexz") {
          return '业务系统接入共享平台情况明细'
        } else if (this.$route.query.type == "officehallxz") {
          return '业务系统接入网上办事大厅情况明细'
        } else if (this.$route.query.type == "specialnetworkxz") {
          return '专网运行系统情况明细'
        } else if (this.$route.query.type.indexOf('already') != -1) {
          return '数据资产填报明细'
        } else if (this.$route.query.type.indexOf('completeness') != -1) {
          return '数据资产填报完备度明细'
        } else if (this.$route.query.type.indexOf('compliance') != -1) {
          return '数据资产填报合规度明细'
        } else if (this.$route.query.type == 'fundUse') {
          return '服务器资源明细'
        } else if (this.$route.query.type.indexOf('sourceanalysis') != -1) {
          return '资金使用情况'
        } else if (this.$route.query.type.indexOf('cloudResources') != -1) {
          return '云资源明细'
        } else if(this.$route.query.type.indexOf('usedetail')!=-1){
          return '资金投入分析明细'
          }else {
          return ''
        }
      },
      bmName() {
        if (this.$route.query.bmName) {
          return this.$route.query.bmName + ' - '
        } else {
          return ''
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      const newCloumn = to.query.column;
      const oldCloumn = from.query.column;
      let year = {
        newY: to.query.year,
        oldY: from.query.year
      }
      if (oldCloumn != newCloumn || year.newY != year.oldY) {
        this.getConfig();
      }
      next();
    },
    // watch: {
    //   column: function() {
        
    //     this.getConfig()
    //   }
    // },
    created(){
    },
    beforeMount(){
    },
    mounted() {
      this.getTabData();
      this.getIfTab();

    },
    methods: {
      getConfig() {
        this.tableISSHow = false;
        this.url = config[this.$route.query.type].url;
        this.tableJson = config[this.$route.query.type].tableJson;
        this.searchs = config[this.$route.query.type].searchs;
        this.$nextTick(() => this.tableISSHow = true)
      },
      changeTab(i, tabId) {
        // window.sessionStorage.setItem('sourceanalysis', JSON.stringify({
        //   i: i,
        //   tabId: tabId
        // }))
        window.sessionStorage.setItem('specialTabIndex', tabId);
        let buildArr = ['buildxz'];
        let alreadyArr = ['alreadyxx', 'alreadyjf', 'alreadyyj', 'alreadyrj', 'alreadysjzc', 'alreadyyzy'];
        let complianceArr = ['compliancexx', 'compliancejf', 'complianceyj', 'compliancerj', 'compliancesjzc', 'complianceyzy'];
        let completenessArr = ['completenessxx', 'completenessjf', 'completenessyj', 'completenessrj', 'completenesssjzc', 'completenessyzy']
        let sourceanalysisArr = ['sourceanalysisxx', 'sourceanalysisjf', 'sourceanalysisyj', 'sourceanalysisrj', 'sourceanalysisyzy']
        let usedetailArr = ['usedetailxx','usedetailjf','usedetailyj','usedetailrj','usedetailyzy']
        this.getTab(buildArr, i, tabId);
        this.getTab(alreadyArr, i, tabId);
        this.getTab(complianceArr, i, tabId);
        this.getTab(completenessArr, i, tabId);
        this.getTab(sourceanalysisArr, i, tabId);
        this.getTab(usedetailArr, i, tabId);
        this.tabActive = window.sessionStorage.getItem('specialTabIndex');
        this.getConfig()
      },
      getTab(arr, i, tabId) {
        if (arr.indexOf(this.$route.query.type) != -1) {
          if (this.$route.query.type.indexOf('sourceanalysis') != -1 || this.$route.query.type.indexOf('usedetail') != -1) {
            this.$router.replace({
              name: 'specialTablexz',
              query: {
                sysOrgCode: this.$route.query.sysOrgCode,
                type: arr[i],
                types: tabId,
                bmName: this.$route.query.bmName,
                year: this.sourceanalysis.year,
                backQuery:this.$route.query.backQuery,
                areaids:this.$route.query.areaids,
              },
            })
          } else {
            this.$router.replace({
              name: 'specialTablexz',
              query: {
                sysOrgCode: this.$route.query.sysOrgCode,
                type: arr[i],
                types: tabId,
                bmName: this.$route.query.bmName,
                backQuery:this.$route.query.backQuery,
                areaids:this.$route.query.areaids,
              },
            })
            
          }
        }else{
          return 
        }
      },
      goBack() {
        window.history.go(-1)
      },
      /* tab 的count值 */
      getTabData() {
        let params = {
          sysOrgCode: this.$route.query.sysOrgCode,
        }
        if (this.$route.query.type.indexOf('sourceanalysis') != -1 || this.$route.query.type.indexOf("usedetail") != -1) {
          params = Object.assign(params, {
            year: this.sourceanalysis.year ? new Date(this.sourceanalysis.year).pattern('yyyy') : this.sourceanalysis.year
          })
        }
        if (this.$route.query.type.indexOf("sourceanalysis") != -1|| this.$route.query.type.indexOf("usedetail") != -1) {
          this.$api.getTabDatas(params).then(res => {
            let arr = ['informationSystemTotalCount', 'computerRoomTotalCount', 'hardwareTotalCount', 'softwareTotalCount', 'cloudResourcesTotalCount'];
            // this.tabMoneyList.splice(this.tabMoneyList-2,1,1)
            // let list  = this.$route.query.type.indexOf("usedetail")!=-1?this.tabList:ç;
            this.tabMoneyList.forEach((v, i) => {
              v.num = res[arr[i]]
            });
            // this.tabMoneyList = list;
          })
        } else {
          this.$api.getTabData(params).then(res => {
            let arr = ['informationSystemTotalCount', 'computerRoomTotalCount', 'hardwareTotalCount', 'softwareTotalCount', 'dataAssetsTotalCount', 'cloudResourcesTotalCount'];
            this.tabList.forEach((v, i) => {
              v.num = res[arr[i]]
            });
          })
        }
      },
      /*导出数据*/
      clickOutData() {
        this.loadingISShow = true
        this.$api.exportExcel({
          orgCode: this.$route.query.sysOrgCode
        }).then(res => {
          let fileName = this.title;
          appBase.downloadFile(res, fileName);
          this.loadingISShow = false;
        });
      },
      /* 是否需要显示tab */
      getIfTab() {
        let tabArr = ['buildxz','migratedCloudsxz','sharexz','officehallxz','specialnetworkxz','fundUse','cloudResourcesxz']
        if(tabArr.indexOf(this.$route.query.type) != -1){
          this.ifTab = false
        }
      },
      /* 资金 - 资金来源分析 时间切换 */
      changeDate(newDate) {
        window.sessionStorage.setItem('sourceanalysisYear', newDate)
        let sourceanalysis = JSON.parse(window.sessionStorage.getItem('sourceanalysis'))
        this.changeTab(sourceanalysis.i, sourceanalysis.tabId||1)
        this.getTabData();
      }
    },
  }
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .specialTablexz {
    // background-image: radial-gradient(51% 150%, #04236C 44%, #000D24 100%);
    // @include nums($w: 100%, $h:100%);
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
    .tab {
      margin-bottom: 10px;
      li {
        display: inline-block;
        @include font($fz: 16px, $color:rgba(255, 255, 255, 0.85));
        margin-right: 20px;
        border-bottom: solid 2px transparent;
        height: 30px;
        line-height: 22px;
        cursor: pointer;
      }
      li.active,
      li:hover {
        @include font($fz: 16px, $color:#0094FF);
        border-color: #0094FF;
      }
    }
    .table {
      padding: 40px;
      border: 1px solid #1A5182;
      border-top: 0;
      box-sizing: border-box;
      position: relative;
      .out-p {
        position: absolute;
        right: 50px;
        top: 44px;
        font-size: 16px;
        cursor: pointer;
        z-index: 999;
        &:hover {
          color: #2d8cf0;
        }
      }
      .dateSearch {
        position: absolute;
        right: 155px;
        top: 42px;
        z-index: 1000;
      }
      .remarks {
        position: absolute;
        top: 105px;
        right: 50px;
        font-size: 14px;
        img {
          vertical-align: middle;
        }
      }
    }
  }
</style>
