// 完备度二级 查看详情页
<template>
  <div class="page" v-breadcrumb='breadcrumb'>
    <Title :title='$route.query.title'></Title>
    <div class="page-cont">
      <nomal-table :table-json="tableJson" :url="url" axiosType="post" v-if='isShow'>
        <table-search :searchs="searchs"></table-search>
      </nomal-table>
    </div>
  </div>
</template>

<script type='text/javascript'>
  import Title from '@/components/title/index.vue';
  import NomalTable from "@/components/table/NomalTable";
  import TableSearch from "@/components/table/TableSearch";
  import {
    SERVER_BASE_URL
  } from '@/http/config.js';
  import {
    cityId
  } from "@/components/charts/map/association";
  import {
    itemId,
    subItemid
  } from "./assetTotal.js";
  let options = [{
    name: '全部',
    value: '0'
  }];
  for (let name in cityId) {
    options.push({
      name,
      value: cityId[name]
    })
  }
  let itemOptions = [{
    name: "全部",
    value: '0'
  }];
  for (let name in itemId) {
    itemOptions.push({
      name,
      value: itemId[name]
    })
  }
  let subOptions = [{
    name: "全部",
    value: '0'
  }];
  for (let name in subItemid) {
    subOptions.push({
      name,
      value: subItemid[name]
    })
  }
  export default {
    name: "assetTotal",
    data() {
      let {
        query,
        fullPath
      } = this.$route
      let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
      let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
      let parent = [{
        name: '全省总体分析',
        url: '/home/index/assetWarning'
      }, {
        name: '省直部门分析',
        url: '/home/index/warningDepartment'
      }, {
        name: '市州部门分析',
        url: '/home/index/warningCityState'
      }][typeThree];
      return {
        breadcrumb: [{
            icon: 'dingwei',
            name: '资产填报预警'
          },
          parent,
          {
              name: this.$route.query.title,
              url:{name:this.$route.query.backPathName,query:this.$route.query}
          },{
          name:'明细'
          }
        ],
        isShow:false,
        searchs: {
          list: [/* {
              type: "input-select", //选择器
              label: "选择地区",
              name: "areaids",
              value: "",
              options
            }, */
            {
              type: "input-select", //选择器项目类型1云资源2数据3机房4软件5硬件6业务系统
              label: "项目类型",
              name: "types",
              value: "",
              options: subOptions,
            },
            /* {
              type: "input-text", //选择器
              label: "部门名称",
              name: "orgNm",
              value: "",
              "placeholder": "输入部门名称",
            }, */
            {
              "type": "input-text", //输入文本
              label: "项目名称",
              "name": "name",
              "value": "",
              "placeholder": "输入查询项目名称",
            },
          ]
        },
        tableJson: {
          column: [{
              type: "text",
              align: "center",
              label: "项目类型",
              prop: "type",
              width: "",
              formatter(row, column, columnIndex, rowIndex) {
                return {
                  '3': '硬件',
                  '2': '机房',
                  '6': '云资源',
                  '7': '云资源',
                  '8': '云资源',
                  '9': '云资源',
                  '5': "数据资产",
                  '4': "软件",
                  '1': "业务系统"
                }[row.type]
                // return ['云资源','数据','机房','软件','硬件','业务系统'][row.type -1]
              }
            },
            {
              type: "text",
              align: "center",
              label: "项目名称",
              prop: "name",
              width: "",
            },
            {
              type: "text",
              align: "center",
              label: "应填报总数",
              prop: "total",
              width: "",
            },
            {
              type: "text",
              align: "center",
              label: "实填报总数",
              prop: "",
              width: "",
              formatter(row, column, columnIndex, rowIndex) {
                return (row.total - row.empty)
                // return ['类型异常','值异常'][row.abnormal_type - 1]
              }
            },
            {
              type: "text",
              align: "center",
              label: "缺少数据总数",
              prop: "empty",
              width: ""
            },
            {
              type: "text",
              align: "center",
              label: "完备度 (%)",
              prop: "empty",
              width: "",
              formatter(row, column, columnIndex, rowIndex) {
                return ((row.total - row.empty) / row.total * 100).toFixed(2)
                // 完备度 = 实填报总数/应填报总数 * 100%
              }
            },
            {
              type: "text",
              align: "center",
              label: "部门名称",
              prop: "org_nm",
              width: ""
            },
            {
              type: "text",
              align: "center",
              label: "所属地区",
              prop: "areaname",
              width: ""
            },
            {
              type: "handle",
              align: "center",
              label: "操作",
              width: "",
              list: [
                {
                  label: "查看详情",
                  onClick(_this, self,row) {
                    self.nomal = !self.nomal;
                    _this.isShow = !_this.isShow;
                    _this.$router.push({
                      name:'completeDetail',
                      query:{
                        backQuery:JSON.stringify(_this.$route.query),
                        id:row.id,
                        tableTitle: row.name,
                        type:row.type,
                      }
                    })
                  }
                }
              ]
            }
          ]
        }
      };
    },
    components: {
      NomalTable,
      TableSearch,
      Title,
    },
    created() {
      this.init();
    },
    computed: {
      url() {
        return `${SERVER_BASE_URL}/api/abnormal/completenessList`;
      }
    },
    methods: {
      init() {
        this.isShow = false;
        this.$nextTick(() => this.isShow = true);
      },
      getCity() {
        this.$api.getCity().then(res => {
          this.searchs.list[0].options = [];
          res.data.forEach((v, i) => {
            this.searchs.list[0].options.push({
              name: v.areaname,
              value: v.id
            })
          });
        })
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .page {
    &>div.page-cont {
      @extend %TitleBorder;
      border-top: 0;
      padding: 20px;
    }
  }
</style>
