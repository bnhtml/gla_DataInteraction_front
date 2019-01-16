<template>
  <div class="page" v-breadcrumb="breadcrumb">
    <div class="IT-title">
      <Title :title='NewtableTitle+"明细"'></Title>
      <card class="card-boder">
        <nomal-table :fileTitle="NewtableTitle" :table-json="tableJson" axiosType="post" :url="url" v-if="reload">
          <table-search :searchs="searchs"></table-search>
        </nomal-table>
      </card>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/title/index';
  import NomalTable from "@/components/table/NomalTable";
  import TableSearch from "@/components/table/TableSearch";
  import {
    searchsList,
    fullXiazuanSearch,
    areaJsonList,
    areaJsonListXz,
    touruJsonList,
    touruJsonListXz,
    touruJsonListXz1,
    resouceJsonList,
    resouceXiazuanJsonList,
    usefullJsonList,
    usefullJsonListXz,
    putIntoJsonList,
    putIntoJsonListXz,
    lixiangJsonList,
    lixiangJsonListXz,
    laiyuanJsonList,
    laiyuanJsonListXz,
    touruSizeJsonList,
    touruSizeJsonListXz
  } from "./tablepageData"
  import {
    SERVER_BASE_URL
  } from '@/http/config.js';
  import {
    dataFilter
  } from '@/utils';
  // debugger
  let pagesOption = {
    areaPage: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        // excelButton: [
        //   {type: 'export',name: '数据表格'}
        // ],
        column: areaJsonList
      },
      url: `${SERVER_BASE_URL}/api/ComputerRoom/getComRoomSizeListMore`
    },
    areaXiazuan: {
      searchs: {
        list: [6].map(o => searchsList[o])
      },
      tableJson: {
        excelButton: [{
          type: 'export',
          url: `${SERVER_BASE_URL}/api/ComputerRoom/getComRoomSizeListMoreExport`
        }],
        column: areaJsonListXz
      },
      url: `${SERVER_BASE_URL}/api/ComputerRoom/getComRoomSizeListMore`
      // url: `${SERVER_BASE_URL}/api/ComputerRoom/getComRoomSizeListBySecondLevel`
    },
    touruPage: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        column: touruJsonList
      },
      url: `${SERVER_BASE_URL}/api/ComputerRoom/putIntoAndConstructMoney`
    },
    touruXiazuan: {
      searchs: {
        list: [6, 4].map(o => searchsList[o])
      },
      tableJson: {
        excelButton: [{
          type: 'export',
          url: `${SERVER_BASE_URL}/api/ComputerRoom/putIntoAndConstructMoneyExport`
        }],
        column: touruJsonListXz
      },
      url: `${SERVER_BASE_URL}/api/ComputerRoom/putIntoAndConstructMoney`
    },
    touruXiazuan1: {
      searchs: {
        list: [6, 3, 5].map(o => searchsList[o])
      },
      tableJson: {
        column: touruJsonListXz1
      },
      url: `${SERVER_BASE_URL}/api/ComputerRoom/putIntoAndConstructMoney`
    },
    touruSizePage: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        column: touruSizeJsonList
      },
      url: `${SERVER_BASE_URL}/api/ComputerRoom/putIntoAndConstructMoney`
    },
    touruSizeXiazuan: {
      searchs: {
        list: [6].map(o => searchsList[o])
      },
      tableJson: {
        excelButton: [{
          type: 'export',
          url: `${SERVER_BASE_URL}/api/ComputerRoom/putIntoAndConstructMoneyExport`
        }],
        column: touruSizeJsonListXz
      },
      url: `${SERVER_BASE_URL}/api/ComputerRoom/putIntoAndConstructMoney`
    },
    usefull: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        excelButton: [{
          type: 'export',
          url: `${SERVER_BASE_URL}/api/hardware/getServersResourceUsefullFirstLevelExport`
        }],
        column: usefullJsonList
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourceUsefullFirstLevel`
    },
    usefullXiazuan: {
      searchs: {
        list: fullXiazuanSearch
      },
      tableJson: {
        excelButton: [{
          type: 'export',
          url: `${SERVER_BASE_URL}/api/hardware/getServersResourceUsefullSecondLevelExport`
        }],
        column: usefullJsonListXz
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourceUsefullSecondLevel`
    },
    putInto: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        excelButton: [{
          type: 'export',
          url: `${SERVER_BASE_URL}/api/hardware/getServersResourcePutIntoFirstLevelExport`
        }],
        column: putIntoJsonList
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourcePutIntoFirstLevel`
    },
    putIntoXiazuan: {
      searchs: {
        list: fullXiazuanSearch
      },
      tableJson: {
        excelButton: [{
          type: 'export',
          url: `${SERVER_BASE_URL}/api/hardware/getServersResourcePutIntoSecondLevelExport`
        }],
        column: putIntoJsonListXz
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourcePutIntoSecondLevel`
    },
    lixiang: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        column: lixiangJsonList
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourcePolicySourceFirstLevel`
    },
    lixiangXiazuan: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        column: lixiangJsonListXz
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourcePolicySourceSecondLevel`
    },
    laiyuan: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        column: laiyuanJsonList
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourceCaptailSourceFirstLevel`
    },
    laiyuanXiazuan: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        column: laiyuanJsonListXz
      },
      url: `${SERVER_BASE_URL}/api/hardware/getServersResourceCaptailSourceSecondLevel`
    },
    resourcePage: {
      searchs: {
        list: [0, 1].map(o => searchsList[o])
      },
      tableJson: {
        column: resouceJsonList
      },
      url: `${SERVER_BASE_URL}/api/ITBasic/getResourceWithTable`
    },
    resourceXiazuan: {
      searchs: {
        list: [0, 1].map(o => resouceXiazuanJsonList[o])
      },
      tableJson: {
        column: resouceXiazuanJsonList
      },
      url: `${SERVER_BASE_URL}/api/ITBasic/getResourceWithTableByDept`
    }
  }
  export default {
    name: "pcRoomMore",
    data() {
      let {
        pagename
      } = this.$route.params;
      let {
        query,
        params,
        name,
        fullPath
      } = this.$route;
      let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0;
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
      // debugger
      let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
      function getMapQuery() {
        if (typeof query.mapQuery == 'string') {
          query.mapQuery = query.mapQuery
        } else if (typeof query.mapQuery == 'object') {
          query.mapQuery = JSON.stringify(query.mapQuery)
        }
        return query.mapQuery
      }
      let parent0 = {
        name: query.title,
        url: {
          name: query.backPathName,
          query: {
            type: query.type,
            radioBtn: query.radioBtn,
            isCityState: query.isCityState,
            mapQuery: getMapQuery(),
          }
        }
      }
      return {
        tableTitle: '',
        query,
        breadcrumb: [{
            icon: 'dingwei',
            name: 'IT基础资源分析'
          },
          parent,
          parent0,
          {
            name: '明细'
          }
        ],
        ...dataFilter(pagesOption[pagename]),
        reload: true
      }
    },
    components: {
      Title,
      NomalTable,
      TableSearch
    },
    beforeRouteUpdate(to, from, next) {
      const newpage = to.params.pagename;
      const oldpage = from.params.pagename;
      if (oldpage !== newpage) {
        this.init(newpage);
      }
      next();
    },
    watch: {
      pagename: function() {
        this.init()
      }
    },
    created() {
      this.getCity();
    },
    computed: {
      NewtableTitle() {
        // return this.tableTitle||this.$route.query.tableTitle;
        return this.$route.query.departName ? this.$route.query.departName + this.$route.query.tableTitle.substring(4) : this.$route.query.tableTitle;
      }
    },
    methods: {
      init(pagename) {
        console.log('///')
        this.reload = false;
        let {
          searchs,
          tableJson,
          url
        } = { ...pagesOption[pagename]
        };
        this.searchs = searchs;
        this.tableJson = tableJson;
        this.url = url;
        this.getCity();
        this.$nextTick(() => {
          this.reload = true;
        })
      },
      getCity() {
        let pid = this.$route.query.areaids;
        let pidArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        if (typeof pid == 'string') pid = Number(pid)
        // 单独的某个地区  不显示地区查询
        if (this.searchs.list.length && pidArr.indexOf(pid) != -1) {
          this.searchs.list = this.searchs.list.filter(o => o.name != 'areaids');
          return;
        }
        if (this.searchs.list.length > 1 && this.searchs.list[1].name === 'areaids') {
          this.$api.getCity({
            pid: this.$route.query.radioBtn
          }).then(res => {
            this.searchs.list[1].options = [];
            res.data.forEach((v, i) => {
              this.searchs.list[1].options.push({
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

<style scoped lang='scss'>
  .page {
    border: 1px solid #1A5182;
    .my-title {
      border: none;
      border-bottom: 1px solid #1A5182;
    }
  }
</style>
