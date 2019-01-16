// 异常校验页
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
    itemId
  } from "./assetTotal.js";
  let options = [{
    name: '全部',
    value: ''
  }];
  for (let name in cityId) {
    options.push({
      name,
      value: cityId[name]
    })
  }
  let itemOptions = [{
    name: "全部",
    value: ''
  }];
  for (let name in itemId) {
    itemOptions.push({
      name,
      value: itemId[name]
    })
  }
  export default {
    name: "assetTotal",
    data() {
      let {
          query,
          fullPath
      } = this.$route
      let typeThree =(query.isCityState == 'true')||(query.isCityState == true)? 2 : query.radioBtn == 1 ? 1 : 0
      let parent = [{
              name: '全省总体分析',
              url: '/home/index/assetWarning'
          },{
              name: '省直部门分析',
              url: '/home/index/warningDepartment'
          }, {
              name: '市州部门分析',
              url: '/home/index/warningCityState'
          }
      ][typeThree];
      let leftname = ['全省总体','省直部门','市州部门'][typeThree];
      return {
        breadcrumb: [{
                icon: 'dingwei',
                name: '资产填报预警'
            },
            parent,
            {
                name: this.$route.query.title,
                url:{name:this.$route.query.backPathName,query:this.$route.query}
            },
            {
              name:'明细'
            }
        ],
        searchs: {
          list: [{
              type: "input-select", //选择器
              label: "选择地区",
              name: "areaids",
              value: '',
              options
            },
            {
              type: "input-select", //选择器项目类型1云资源2数据3机房4软件5硬件6业务系统
              label: "项目类型",
              name: "types",
              value: "",
              options: itemOptions,
            },
            {
              type: "input-text", //选择器
              label: "部门名称",
              name: "orgNm",
              value: "",
              "placeholder": "输入部门名称",
            },
            {
              "type": "input-text", //输入文本
              label: "系统名称",
              "name": "name",
              "value": "",
              "placeholder": "输入查询系统名称",
            },
          ]
        },
        tableJson: {
          excelButton: [{type: 'export', url: `${SERVER_BASE_URL}/api/abnormal/listExport`, fileName: this.$route.query.title,}],
          column: [
            //行
            {
              type: "text",
              align: "center",
              label: "项目类型",
              prop: "type",
              width: "",
              formatter(row, column, columnIndex, rowIndex) {
                return ['云资源', '数据', '机房', '软件', '硬件', '业务系统'][row.type - 1]||'未反馈'
              }
            },
            {
              type: "text",
              align: "center",
              label: "预警项目",
              prop: "name",
              width: "",
              formatter(row){
                return row.name|| '未反馈'
              }
            },
            {
              type: "text",
              align: "center",
              label: "预警字段",
              prop: "field",
              width: "150",
              formatter(row){
                return row.field || '未反馈'
              }
            },
            {
              type: "text",
              align: "center",
              label: "预警类型",
              // prop: "fill_type",
              prop: "abnormal_type", //异常类型1类型异常2值异常
              width: "",
              formatter(row, column, columnIndex, rowIndex) {
                return ['类型异常', '值异常'][row.abnormal_type - 1] || '未反馈'
              }
            },
            {
              type: "text",
              align: "center",
              label: "预警内容",
              prop: "value",
              width: "",
              formatter(row){
                return row.value|| '未反馈'
              }
            },
            {
              type: "text",
              align: "center",
              label: "标准样例",
              prop: "example",
              width: "",
              formatter(row){
                return row.example||'未反馈'
              }
            },
            {
              type: "text",
              align: "center",
              label: "部门名称",
              prop: "org_nm",
              width: "",
              formatter(row){
                return row.org_nm || '未反馈'
              } 
            },
            {
              type: "text",
              align: "center",
              label: "所属地区",
              prop: "areaname",
              width: "",
              formatter(row){
                return row.areaname || '未反馈'
              }
            },
            {
              type: "handle",
              align: "center",
              label: "操作",
              width: "",
              list: [{
                label: "异常校验",
                // type: "edit",
                // url: "jifangdefault/warning", //优先执行url
                onClick(tablePage, self) {
                  self.$Modal.confirm({
                    title: '异常数据校验',
                    content: `<div class="labelone"><div class="lefttext">维护部门：</div>贵州省工商局</div>
                                <div class="labelone"><div class="lefttext">备注：</div><textarea class="textarea"></textarea></div>`,
                    width: 600,
                    okText: '发送',
                    cancelText: '取消',
                    closable:true
                  })
                }
              }]
            }
          ]
        }
      };
    },
    components: {
      NomalTable,
      TableSearch,
      Title
    },
    created() {
      this.getCity()
    },
    computed: {
      url() {
        return `${SERVER_BASE_URL}/api/abnormal/list`;
      }
    },
    methods: {
      getCity() {
        this.$api.getCity({pid:this.$route.query.radioBtn}).then(res => {
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
