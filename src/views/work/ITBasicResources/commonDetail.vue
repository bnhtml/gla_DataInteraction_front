<template>
  <div class="page" v-breadcrumb='breadcrumb'>
    <div class="IT-title">
      <div class="pos-relative">
        <Title :title='$route.query.lastTitleName||tableTitle+"明细"'></Title>
        <ul v-if='isTabShow' class="tabTitleBtn">
          <li v-for='(v,i) in tabTitleInfo' :key='i' @click="changeTab(v,i)" :class="i==tabIndex?'active':''">{{v}}</li>
        </ul>
      </div>
      <!-- IT -->
      <card v-if='!isTabShow' class="table-cont">
        <nomal-table v-if="isShow" :table-json="tableJson" :noid="true" :nohead="true" :data="data">
        </nomal-table>
      </card>
      <!-- 业务系统分析 -->
      <card v-if='isTabShow' class="table-cont">
        <nomal-table v-if="isShow&&tabIndex==0" :table-json="tableJson" :noid="true" :nohead="true" :data="data">
        </nomal-table>
        <nomal-table v-if="isShow&&tabIndex==1" :table-json="listBuggetTableJson" :data='listBuggeData'>
          <!-- :url='businessTabUrl' -->
        </nomal-table>
      </card>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/title/index';
  import NomalTable from "@/components/table/NomalTable";
  import {
    SERVER_BASE_URL
  } from '@/http/config.js';
  import {
    pcRoomJson,
    pcRoomFormat
  } from './defaultJson';
  import {
    serversJson,
    serversFormat
  } from './serversDefaultJson';
  import {
    businessJson,
    businessFormat
  } from '../business/detail/businessDetail.js';
  import {
    dataAssetsJson,
    ECSJson,
    RDSJson,
    SLBJson,
    OSSJson,
    rjJson,
    yjJson,
    dataAssetsFormat,
    ECSFormat,
    RDSFormat,
    SLBFormat,
    OSSFormat,
  } from '@/views/work/special/detail/specialDetail.js';
  let jsons = {
    jifang: {
      json: pcRoomJson,
      format: pcRoomFormat
    },
    servers: {
      json: serversJson,
      format: serversFormat
    },
    business: {
      json: businessJson,
      format: businessFormat
    },
    ECS: {
      json: ECSJson,
      format: ECSFormat
    },
    RDS: {
      json: RDSJson,
      format: RDSFormat
    },
    SLB: {
      json: SLBJson,
      format: SLBFormat
    },
    OSS: {
      json: OSSJson,
      format: OSSFormat
    },
  }
  export default {
    name: "pcRoomMore",
    data() {
      let url = {
        'jifang': this.$api.ITBasic['jifangDefault'],
        'servers': this.$api.ITBasic['serversdetails'],
        'business': this.$api.systemQuery,
        'ECS': this.$api.getCloudResourcesDetail,
        'RDS': this.$api.getCloudResourcesDetail,
        'SLB': this.$api.getCloudResourcesDetail,
        'OSS': this.$api.getCloudResourcesDetail
      }[this.$route.params.url];
      let json = jsons[this.$route.params.url]
      let {
        query,
        params,
        name,
        fullPath
      } = this.$route;
      function getMapQuery() {
        if (typeof query.mapQuery == 'string') {
          query.mapQuery = query.mapQuery
        } else if (typeof query.mapQuery == 'object') {
          query.mapQuery = JSON.stringify(query.mapQuery)
        }
        return query.mapQuery
      }
      let businessTypeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : (query.radioBtn || query.areaids) == 1 ? 1 : 0
      let businessParent = [{
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
      ][businessTypeThree];
      // let leftname = ['全省总体', '省直部门', '市州部门'][businessTypeThree];
      let businessParent_1 = {
        'businessTotal': {
          name: query.title,
          url: {
            name: 'businessTotal',
            query: query
          }
        },
        'businessMoney': {
          name: query.title,
          url: {
            name: 'businessMoney',
            query: query
          }
        },
        'provinceDetail': {
          name: query.title,
          url: {
            name: 'provinceDetail',
            query: query
          }
        },
        'businessTable': {
          name: query.title,
          url: {
            name: 'businessTable',
            query: query
          }
        }
      }[query.backPathName];

      let ITParent_1 = {
        name: query.title,
        url: {
          name: query.backPathName,
          query: {
            type: query.typeNum,
            radioBtn: query.radioBtn,
            isCityState: query.isCityState,
            mapQuery: getMapQuery(),
          }
        }
      }
      let ITParcent = [{
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
      ][businessTypeThree];
      return {
        json,
        url,
        query: this.$route.query,
        isShow: false,
        data: [],
        tableJson: {
          column: [
            //行
            {
              type: "text",
              align: "right",
              label: "详情",
              prop: "name",
              width: "210",
              'class-name': 'table-left-label',
              formatter(row, column, columnIndex, rowIndex) {
                return row.name ? row.name + '：' : row.name
              }
            },
            {
              type: "text",
              align: "left",
              label: "详情明细",
              prop: "value",
              width: "",
            },
            {
              type: "text",
              align: "right",
              label: "详情",
              prop: "name1",
              width: "210",
              'class-name': 'table-left-label',
              formatter(row, column, columnIndex, rowIndex) {
                return row.name1 ? row.name1 + '：' : row.name1
              }
            },
            {
              type: "text",
              align: "left",
              label: "详情明细",
              prop: "value1",
              width: "",
              'class-name': 'table-right-value-inside',
            }
          ]
        },
        listBuggetTableJson: {
          column: [{
            type: "text",
            align: "left",
            label: "项目名称",
            prop: "proj_nm",
            formatter(row, column, columnIndex, rowIndex) {
              return row.proj_nm || '无数据'
            }
          }, {
            type: "text",
            align: "left",
            label: "批复时间及文号",
            prop: "appor_date",
            formatter(row, column, columnIndex, rowIndex) {
              return row.appor_date || '无数据'
            }
          }, {
            type: "text",
            align: "left",
            label: "项目预算（万元）",
            prop: "appor_total_exp",
            formatter(row, column, columnIndex, rowIndex) {
              return row.appor_total_exp || '无数据'
            }
          }, ]
        },
        listBuggeData: [],
        tabTitleInfo: ['基本信息', '系统预算'],
        tabIndex: 0,
        SERVER_BASE_URL: SERVER_BASE_URL,
        businessBreadcrumb: [{
          icon: 'dingwei',
          name: '业务系统分析'
        }, businessParent, businessParent_1, {
          name: '明细'
        }],
        ITbreadcrumb: [{
          icon: 'dingwei',
          name: 'IT基础资源分析'
        }, ITParcent, ITParent_1, {
          name: '明细'
        }],
        tableTitle: '',
      };
    },
    components: {
      NomalTable,
      Title
    },
    computed: {
      isTabShow() {
        if (this.$route.name == 'businessdefault') {
          return true
        } else {
          return false
        }
      },
      businessTabUrl() {
        return this.SERVER_BASE_URL + "/api/system/listBugget"
      },
      breadcrumb() {
        if (this.$route.name == 'businessdefault') {
          return this.businessBreadcrumb
        } else {
          return this.ITbreadcrumb;
        }
      }
    },
    created() {},
    mounted() {
      if (this.tabIndex == 0) {}
      this.getListBugget();
      this.abnormalShow();
    },
    methods: {
      getData() {
        this.url(this.query).then((res = {}) => {
          let column = [];
          let i = 0;
          let obj = {};
          if (res.data.length == 0) {
            this.data = column;
            this.isShow = true;
            return;
          }
          let keys = Object.keys(this.json.json);
          for (let resname in this.json.json) {
            let name = ['name', 'name1'][i % 2];
            let value = ['value', 'value1'][i % 2];
            obj[name] = this.json.json[resname];
            let data0 = res.data[0] || res.data;
            let val = ''
            /* 合规 */
            if (this.filedName && this.filedName.length) {
              for (let fKey in this.filedName) {
                /* 匹配异常字段 */
                if (resname == this.filedName[fKey]) {
                  val = `<span class='color-red border-red'>${data0[resname]}</span>`;
                  if (this.json.format[resname]) {
                    val = `<span class='color-red border-red'>${this.json.format[resname](data0[resname])}</span>`;
                  }
                  break;
                } else {
                  /* 合规字段 (并且值不为空)*/
                  val = data0[resname];
                  if (this.json.format[resname]) {
                    val = this.json.format[resname](data0[resname]);
                  }
                }
              }
            } else {
              /* 非合规 */
              val = data0[resname];
              if (this.json.format[resname]) {
                val = this.json.format[resname](data0[resname]);
              }
            }
            obj[value] = val;
            if (i % 2 === 1) {
              column.push(obj);
              obj = {};
            }
            if (i === keys.length - 1 && i % 2 === 0) {
              column.push({ ...obj,
                name1: '',
                value1: ''
              });
            }
            i++;
          }
          this.data = column;
          this.tableTitle = this.data[5].value1;
          this.isShow = true;
        })
      },
      abnormalShow() {
        // if (this.$route.query.typeTitle == "compliancexx") {
        this.$api.errFileds({
          foreignkey: this.$route.query.id,
        }).then(res => {
          this.filedName = res.filedName;
          this.getData();
        })
        // } else {
        //   this.getData()
        // }
      },
      getListBugget() {
        this.$api.listBugget(this.query).then(res => {
          this.listBuggeData = res.data;
        })
      },
      changeTab(v, i) {
        this.isShow = false
        this.tabIndex = i;
        this.$nextTick(() => {
          this.isShow = true
        })
      }
    }
  };
</script>

<style scoped lang='scss'>
  .tabTitleBtn {
    position: absolute;
    background-color: #051646;
    right: 14px;
    border-radius: 20px;
    top: 10px;
    border: solid 1px #5d8cb1;
    li {
      display: inline-block;
      padding: 4px 24px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
    .active {
      border-radius: 16px;
      color: #fff;
      background-color: #01b6a7;
    }
  }
  .page {
    border: 1px solid #1A5182;
    .my-title {
      border: none;
      border-bottom: 1px solid #1A5182;
    }
  }
  
</style>
