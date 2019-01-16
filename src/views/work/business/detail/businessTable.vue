// 全省各部门分析Table
<template>
  <div class="page" v-breadcrumb="breadcrumb">
     <div class="IT-title">
        <Title :title='$route.query.tableTitle+"明细"'></Title>   
        <div class="page-cont">
          <nomal-table :table-json="tableJson" :url="url" axiosType="post" v-if='isShow'>
            <table-search :searchs="searchs"></table-search>
          </nomal-table>
        </div>
     </div>
  </div>
</template>

<script type='text/javascript'>
  import Title from '@/components/title/index';
  import NomalTable from "@/components/table/NomalTable";
  import TableSearch from "@/components/table/TableSearch";
  import { dataFilter } from '@/utils';
  import {
    SERVER_BASE_URL
  } from '@/http/config.js';
  import {
    systemList, //  二级页面
    protConditionTable, //系统分布情况  1
    jbieTable, // 业务系统分布资金情况 
    sysStatusTable, // 业务系统建设状态分析 1
    bearerNetworkTable, //业务系统承载网络分析 1
    optModeTable, //信息系统部署方式统计 1
    sfQgtzTable, //全国统建系统分析 1
    sfUseTable, //系统分布在用/拟建/僵尸系统/建设/运维费用情况  全国各地区资金投入
    systemQuery, //查看详情
    sfQyunTable, // 迁云状况分析1
    sourceTable, //信息资金来源分析
    constructionCost, //资金走势图
    costStatusTable, // 用户范围投入金额分析
  } from '@/server/getData.js';
  import {
    protConditionSearch, //系统分布情况 
    jbieSearch, // 业务系统分布资金情况 
    sysStatusSearch, // 业务系统建设状态分析 
    bearerNetworkSearch, //业务系统承载网络分析 
    optModeSearch, //信息系统部署方式统计
    sfQgtzSearch, //全国统建系统分析
    sfUseSearch, //系统分布在用/拟建/僵尸系统/建设/运维费用情况
    systemQuerySearch, //查看详情
    sfQyunSearch, // 迁云状况分析
    systemSafetySearch, // 业务系统安全情况分析
    sourceSearch, //信息资金来源分析
    constructionCostSearch, // 运维走势图
    costStatusSearch, // 用户范围投入金额分析
  } from './tableSearchs.js';
  import {
    protConditionTableJson, //系统分布情况 
    jbieTableJson, // 业务系统分布资金情况 
    sysStatusTableJson, // 业务系统建设状态分析 
    bearerNetworkTableJson, //业务系统承载网络分析 
    optModeTableJson, //信息系统部署方式统计
    sfQgtzTableJson, //全国统建系统分析
    sfUseTableJson, //系统分布在用/拟建/僵尸系统/建设/运维费用情况
    systemQueryJson, //查看详情
    sfQyunTableJson, // 迁云状况分析
    systemSafetyJson, //业务系统安全情况分析
    sourceTableJson, //信息资金来源分析
    constructionCostJson,
    costStatusJson, // 用户范围投入金额分析
  } from './tableJson.js'
  export default {
    name: "assetTotal",
    data() {
      let {
        query,
        params,
        name,
        fullPath
      } = this.$route;
      let typeThree = (query.isCityState == 'true')||(query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
      let parent = [{
          name: '全省总体分析',
          url: '/home/index/businessIndex'
        },
        {
          name: '省直部门分析',
          url: '/home/index/businessDepartment'
        }, {
          name: '市州部门分析',
          url: '/home/index/businessCityState'
        }
      ][typeThree];
      let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
      let  queryUrl ={
        areaids: query.areaids,
        backPathName: query.backPathName,
        isCityState: query.isCityState,
        mapQuery: query.mapQuery,
        radioBtn: query.radioBtn,
        tableTitle:query.afterTitle || query.tableTitle,
        title: query.title,
        type: query.type,
        typeUrl: query.backTypeUrl||query.typeUrl,
      }
      let parent_1 = {
        'businessTotal': {
          name: query.title,
          url: {
            name: 'businessTotal',
            query: queryUrl
          }
        },
        'businessMoney': {
          name: query.title,
          url: {
            name: 'businessMoney',
            query: queryUrl
          }
        },
        'provinceDetail': {
          name: query.title,
          url: {
            name: 'provinceDetail',
            query: queryUrl
          }
        },
      }[query.backPathName];
      let bumne = {
        name: 'undefined'
      };
      return {
        breadcrumb: [{
            icon: 'dingwei',
            name: '业务系统分析'
          },
          parent,
          parent_1,
          {
            name: '明细'
          }
        ],
        urlNameArr: [
          'protConditionTable',
          'jbieTable',
          'sysStatusTable',
          'bearerNetworkTable',
          'optModeTable',
          'sfQgtzTable',
          'sfUseTable',
          'systemQuery',
          'sfQyunTable',
          'systemSafety', // 安全，2
          'sourceTable', //信息资金来源分析
          'constructionCost',
          'costStatusTable',
        ],
        urlArr: [
          protConditionTable,
          jbieTable,
          sysStatusTable,
          bearerNetworkTable,
          optModeTable, // YES
          sfQgtzTable,
          sfUseTable,
          systemQuery,
          sfQyunTable,
          '/api/system/list', // 安全2 
          sourceTable, //信息资金来源分析
          constructionCost,
          costStatusTable, // 用户范围
        ],
        searchArr: [
          protConditionSearch, //系统分布情况 
          jbieSearch, // 业务系统分布资金情况 
          sysStatusSearch, // 业务系统建设状态分析 
          bearerNetworkSearch, //业务系统承载网络分析 
          optModeSearch, //信息系统部署方式统计
          sfQgtzSearch, //全国统建系统分析
          sfUseSearch, //系统分布在用/拟建/僵尸系统/建设/运维费用情况
          systemQuerySearch, //查看详情
          sfQyunSearch, // 迁云状况分析
          systemSafetySearch, // 系统安全2
          sourceSearch, //信息资金来源分析
          constructionCostSearch, // 运维走势图
          costStatusSearch, // 用户范围投入金额分析
        ],
        tableJsonArr: [
          protConditionTableJson, //系统分布情况 
          jbieTableJson, // 业务系统分布资金情况 
          sysStatusTableJson, // 业务系统建设状态分析 
          bearerNetworkTableJson, //业务系统承载网络分析 
          optModeTableJson, //信息系统部署方式统计
          sfQgtzTableJson, //全国统建系统分析
          sfUseTableJson, //系统分布在用/拟建/僵尸系统/建设/运维费用情况
          systemQueryJson, //查看详情
          sfQyunTableJson, // 迁云状况分析
          systemSafetyJson, //系统安全2
          sourceTableJson, //信息资金来源分析
          constructionCostJson,
          costStatusJson, // 用户范围投入金额分析
        ],
        searchs: {},
        tableJson: {},
        url: '',
        isShow: false,
        typeThree,
      };
    },
    components: {
      Title,
      NomalTable,
      TableSearch
    },
    mounted() {

      this.init();
      this.getCity({pid: this.$route.query.areaids});
    },
    computed: {
    },
    methods: {
      init() {
        this.isShow = false;
        this.url = this.getUrl();
        this.$nextTick(() => this.isShow = true);
      },
      getUrl() {
        if (this.urlNameArr.indexOf(this.$route.query.typeUrl) != -1) {
          // 
          let index = this.urlNameArr.findIndex(item => {
            return item == this.$route.query.typeUrl
          });
          let url = `${SERVER_BASE_URL}${this.urlArr[index]}Export`;
          if(this.$route.query.typeUrl === 'constructionCost'){
            url = `${SERVER_BASE_URL}${sfUseTable}Export`
          }
          if(this.$route.query.typeUrl === 'systemSafety'){
            url = `${SERVER_BASE_URL}/api/system/safeDetailExport`
          }
          this.tableJson = {...this.tableJsonArr[index], excelButton: [{type: 'export', url, fileName: this.$route.query.tableTitle,}]};
          this.searchs = dataFilter(this.searchArr)[index];
          
          if (this.$route.query.level) {
            return `${SERVER_BASE_URL}/api/system/list`;
          } else {
            return `${SERVER_BASE_URL}${this.urlArr[index]}`;
          }
        }
      },
      getCity(e) {
        let pidArr = [1,2,3,4,5,6,7,8,9,10,11];
        // 单独的某个地区  不显示地区查询
        if(typeof e.pid =='string' ) e.pid= Number(e.pid)
        if(e.pid&&pidArr.indexOf(e.pid)!=-1){
          this.searchs.list = this.searchs.list.filter(o => o.name != 'areaids');
          return;
        }else{
          this.$api.getCity(e).then(res => {
            console.log(this.searchs.list.filter(o => o.name == 'areaids'))
            this.searchs.list.filter(o => o.name == 'areaids')[0].options = [];
            res.data.forEach((v, i) => {
             this.searchs.list.filter(o => o.name == 'areaids')[0].options.push({
                name: v.areaname,
                value: v.id
              })
            });
          })
        }
        
      }
    }
  };
</script>

<style lang='scss' scoped>
@import "@/assets/style/base/index.scss";
.page{
   .page-cont{
    @extend %TitleBorder;
    border-top: 0;
    padding: 15px;
  }
}
</style>

