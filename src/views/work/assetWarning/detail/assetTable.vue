// 完备度 一级 数据钻取页
<template>
  <div class="page" v-breadcrumb='breadcrumb'>
    <Title :title='$route.query.title'></Title>
    <div class="page-cont">
      <nomal-table :table-json="tableJson" :url="url" axiosType="post">
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
    },
    {
      name: "云资源",
      value: [6, 7, 8, 9]
    },
    {
      name: '机房',
      value: 2
    },
    {
      name: '数据资产',
      value: 5
    },
    {
      name: '硬件',
      value: 3
    },
    {
      name: '软件',
      value: 4
    },
    {
      name: '业务系统',
      value: 1
    }
  ];
  export default {
    name: "assetTotal",
    data() {
      let {
        query,
        fullPath
      } = this.$route
      let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
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
      let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
      return {
        breadcrumb: [{
            icon: 'dingwei',
            name: '资产填报预警'
          },
          parent,
          {
            name: this.$route.query.title,
            url: {
              name: this.$route.query.backPathName,
              query: this.$route.query
            }
          },
          {
            name: '明细'
          }
        ],
        searchs: {
          list: [{
              type: "input-select", //选择器
              label: "选择地区",
              name: "areaids",
              value: "",
              options
            },
            // {
            //   type: "input-select", //选择器项目类型1云资源2数据3机房4软件5硬件6业务系统
            //   label: "项目类型",
            //   name: "types",
            //   value: "",
            //   options: subOptions,
            // },
            {
              type: "input-text", //选择器
              label: "部门名称",
              name: "orgNm",
              value: "",
              "placeholder": "输入部门名称",
            },
            //   {
            //     "type": "input-text",  //输入文本
            //     label: "部门名称",
            //     "name": "name",
            //     "value": "",
            //     "placeholder": "输入查询项目名称",
            // },
          ]
        },
        tableJson: {
          excelButton: [{
            type: 'export',
            url: `${SERVER_BASE_URL}/api/abnormal/completenessTableExport`,
            fileName: this.$route.query.title,
          }],
          column: [{
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
              type: "handle",
              align: "center",
              label: "操作",
              width: "",
              list: [{
                label: "数据钻取",
                // type: "edit",
                // url: "", //优先执行url
                onClick(tablePage, self, row) {
                  let {
                    sys_org_code
                  } = row;
                  self.$router.push({
                    name: 'completexz',
                    query: {
                      sysOrgCode: sys_org_code,
                      ...self.$route.query
                    } // query是对象
                  })
                  // self.nomal = !self.nomal;
                  // tablePage.isShow = !tablePage.isShow;
                }
                // onClick(tablePage, self) {
                //   self.$Modal.confirm({
                //     title: '异常数据校验',
                //     content: `<div class="labelone"><div class="lefttext">维护部门：</div>贵州省工商局</div>
                //               <div class="labelone"><div class="lefttext">备注：</div><textarea class="textarea"></textarea></div>`,
                //     width: 600,
                //     okText: '发送',
                //     cancelText: '取消',
                //   })
                // }
              }]
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
      this.getCity({pid: this.$route.query.areaids});
    },
    computed: {
      url() {
        return `${SERVER_BASE_URL}/api/abnormal/completenessTable`;
      }
    },
    methods: {
      getCity(e) {
        let pidArr = [1,2,3,4,5,6,7,8,9,10,11];
        // 单独的某个地区  不显示地区查询
        if(typeof e.pid =='string' ) e.pid= Number(e.pid)
        if(e.pid&&pidArr.indexOf(e.pid)!=-1){
          this.searchs.list = this.searchs.list.filter(o => o.name != 'areaids');
          return;
        }else{
          this.$api.getCity(e).then(res => {
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
  .page {
    &>div.page-cont {
      @extend %TitleBorder;
      border-top: 0;
      padding: 20px;
    }
  }
</style>
