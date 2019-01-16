<template>
  <div class="page" v-breadcrumb="breadcrumb">
    <div class="IT-title">
      <Title :title='tableTitle+"明细"'></Title>
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
    systemQuantit, // 新增 业务系统数量情况
  } from '@/server/getData.js';
  import {
    sfQgtzSearchSon, //全国2
    optModeSearchSon, // 信息部署2
    sfQyunSearchSon, // 迁云2
    sysStatusSearchSon, // 建设2
    protConditionSearchSon, // 业务系统分布2
    bearerNetworkSearchSon, // 承载2
    sfUseSearchSon, // 全国各地资金投入 2
    sourceSearchSon, // 信息系统资金来源
    jbieSearchSon,
    constructionCostSearchSon,
    setProSearchSon, // 立项2
    leaderCockpitSearchSon,
    costStatusSearchSon, // 用户范围投入金额分析
    sfUseGroupSearchSon,
    systemQuantitSearch, // 新增 业务系统数量情况
  } from './tableSearchs.js';
  import {
    sfQgtzTableJsonSon, //全国统建系统分析2
    optModeTableJsonSon, //信息部署2
    sfQyunTableJsonSon, // 迁云2
    sysStatusTableJsonSon, // 建设2
    protConditionTableJsonSon, // 业务系统分布2
    bearerNetworkTableJsonSon, // 承载 2
    sfUseTableJsonSon, // // 全国各地资金投入 2
    sourceTableJsonSon, // 信息系统资金来源
    jbieTableJsonSon, // 
    constructionCostJsonSon,
    setProJsonSon, // 立项 2
    leaderCockpitJsonSon,
    costStatusJsonSon, // 用户范围投入金额分析
    sfUseGroupJsonSon,
    systemQuantitJson, // 新增  业务系统数量情况
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
      let queryUrl = {
        // sysOrgCode: query.sysOrgCode,
        title: query.title,
        type: query.type,
        backPathName: query.backPathName,
        typeUrl: query.backTypeUrl,
        radioBtn: query.radioBtn,
        isCityState: query.isCityState,
        mapQuery:query.mapQuery,
      };
      let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : (query.radioBtn || query.areaids) == 1 ? 1 : 0
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
      let parent_1 = {
        'provinceDetail': {
          name: query.title,
          url: {
            name: 'provinceDetail',
            query: queryUrl
          }
        },
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
      }[query.backPathName];
      return {
        query,
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
          'sfQgtzTableSon', // 全国2 
          'optModeTableSon', // 信息部署2
          'sfQyunTableSon', // 迁云 2
          'sysStatusTableSon', // 建设2
          'protConditionTableSon', // 
          'bearerNetworkTableSon',
          'sfUseTableSon', // 全国各地资金投入 2
          'sourceTableSon', // 信息系统资金来源
          'jbieTableSon', // 
          'constructionCostSon', //走势图
          'setProTableSon', // 立项 2
          'leaderCockpitTable',
          'costStatusSon', // 用户
          'sfUseGroupTableSon',
          'systemQuantitJson',
        ],
        urlArr: [
          sfQgtzTable, // 全国2 
          optModeTable, // 信息部署2
          sfQyunTable, // 迁云 2
          sysStatusTable, // 建设2
          protConditionTable, // 
          bearerNetworkTable,
          sfUseTable, // 全国各地资金投入 2
          sourceTable, // 信息系统资金来源
          jbieTable, // 
          'constructionCostSon', //走势图
          sysStatusTable, // 立项 2
          'leaderCockpitTable',
          'costStatusSon', // 用户
          sfUseTable,
          systemQuantit, // czz    0102 占位
        ],
        searchArr: [
          sfQgtzSearchSon, //全国2
          optModeSearchSon, // 信息部署2
          sfQyunSearchSon, // 迁云2
          sysStatusSearchSon, // 建设2
          protConditionSearchSon, // 业务系统分布2
          bearerNetworkSearchSon, // 承载2
          sfUseSearchSon, // 全国各地资金投入 2
          sourceSearchSon, // 信息系统资金来源
          jbieSearchSon,
          constructionCostSearchSon,
          setProSearchSon, // 立项2
          leaderCockpitSearchSon,
          costStatusSearchSon, // 用户范围投入金额分析
          sfUseGroupSearchSon,
          systemQuantitSearch, // 新增 业务系统数量情况
        ],
        tableJsonArr: [
          sfQgtzTableJsonSon, //全国统建系统分析2
          optModeTableJsonSon, //信息部署2
          sfQyunTableJsonSon, // 迁云2
          sysStatusTableJsonSon, // 建设2
          protConditionTableJsonSon, // 业务系统分布2
          bearerNetworkTableJsonSon, // 承载 2
          sfUseTableJsonSon, // // 全国各地资金投入 2
          sourceTableJsonSon, // 信息系统资金来源
          jbieTableJsonSon,
          constructionCostJsonSon,
          setProJsonSon, // 立项 2
          leaderCockpitJsonSon,
          costStatusJsonSon, // 用户范围投入金额分析
          sfUseGroupJsonSon,
          systemQuantitJson,
        ],
        searchs: {},
        tableJson: {},
        url: '',
        isShow: '',
        systemQuantitJson,
      };
    },
    components: {
      Title,
      NomalTable,
      TableSearch
    },
    mounted() {
      this.init();
      this.getCity({
        pid: this.$route.query.radioBtn
      });
    },
    computed: {
      tableTitle() {
        if (this.query.backPathName == 'provinceDetail') {
          return this.query.tableTitle;
        }
        return this.query.orgName + this.query.afterTitle.substring(4)
      }
    },
    methods: {
      init() {
        this.isShow = false;
        this.url = this.getUrl();
        this.$nextTick(() => this.isShow = true);
      },
      getUrl() {
        if (this.urlNameArr.indexOf(this.$route.query.typeUrl) != -1) {
          const index = this.urlNameArr.findIndex(item => {
            return item == this.$route.query.typeUrl
          });
          let url = `${SERVER_BASE_URL}${this.urlArr[index]}DetailExport`;
          if (this.$route.query.typeUrl === 'constructionCostSon') {
            url = `${SERVER_BASE_URL}${sfUseTable}DetailExport`
          }
          this.tableJson = { ...this.tableJsonArr[index],
            excelButton: [{
              type: 'export',
              url,
              fileName: this.tableTitle,
            }]
          };
          this.searchs = this.searchArr[index];
          return `${SERVER_BASE_URL}/api/system/list`;
        }
      },
      getCity(e) {
        let index = this.searchs.list.length - 1;
        this.searchs.list.forEach((v, i) => {
          if (v.label == '所属地区' || v.name == 'areaids') {
            index = i;
            this.$api.getCity(e).then(res => {
              this.searchs.list[index].options = [];
              res.data.forEach((v, i) => {
                this.searchs.list[index].options.push({
                  name: v.areaname,
                  value: v.id
                })
              });
            })
          } 
        })
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .page {
    .page-cont {
      @extend %TitleBorder;
      border-top: 0;
      padding: 15px;
    }
  }
</style>