import { cityId } from "@/components/charts/map/association"
import api from "../../../server/getData";
// import { debug } from "util";
// let options = [];
// api.getCity().then(res => {
//   res.data.forEach((v, i) => {
//     options.push({
//       name: v.areaname,
//       value: v.id
//     })
//   });
// })
let serviceall = ['ecs', 'oss', 'rds', 'slb'];
let options = [{
  name: "全部",
  value: "0"
}];
for(let name in cityId){
  options.push({name, value: cityId[name]});
}
function onClick(tablePage, self, row){
  // radioBtn   与 areaids 的问题
  // typeNum   为了区分type，此时typeNum作为返回的type字段来接收值
  tablePage.$router.push({ name: 'jifangdefault', params: { url: 'jifang' }, query: { id: row.id, ...self.$route.query, typeNum: self.$route.query.type,}});
}
export let searchsList = [
  // 部门名称 0
  {
    type: "input-text", //输入文本
    label: "部门名称",
    name: "areaName",
    value: "",
    placeholder: "请输入"
  },
  // 所属地区 1
  {
    type: "input-select", //选择器
    label: "所属地区",
    name: "areaids",
    value: "",
    options
  },
  {
    type: "input-select", //输入日期
    label: "费用类型",
    name: "mondytype",
    value: "0",
    change: (self, value) => {
      let params = { pagename: 'touruXiazuan1' };
      let query = self.$route.query;
      self.$router.replace({ name: 'tablepage', params, query });
    },
    options: [
      {
        name: '建设费用',
        value: '0'
      },
      {
        name: '运维费用',
        value: '1'
      }
    ]
  },
  {
    type: "input-select", //输入日期
    label: "费用类型",
    name: "mondytype",
    value: "1",
    change: (self, value) => {
      let params = { pagename: 'touruXiazuan' };
      let query = self.$route.query;
      self.$router.replace({ name: 'tablepage', params, query });
    },
    options: [
      {
        name: '建设费用',
        value: '0'
      },
      {
        name: '运维费用',
        value: '1'
      }
    ]
  },
  {
    type: "input-date", //输入日期
    // datetype: 'daterange',  //日，date, 周，week,月，month,年 year,起始日期 daterange
    label: "创建时间",
    name: "startDate",
    value: "",
    valueFormat: "yyyy-MM-dd"
  },
  {
    type: "input-date", //输入日期
    // datetype: 'year',  //周，week,月，month,年 year
    label: "运维年份",
    name: "startYear",
    value: "",
    valueFormat: "yyyy"   //'yyyy-MM-dd HH:mm:ss' H24小时 h12小时
  },
  {
    type: "input-text", //输入文本
    label: "机房名称",
    name: "jfName",
    value: "",
    placeholder: "请输入"

  }
]
export let fullXiazuanSearch = [
  // 资源ID 0
  {
    type: "input-text", //输入文本
    label: "资源ID",
    name: "resourceid",
    value: "",
    placeholder: "请输入"
  },
  // 资源类型 0
  {
    type: "input-select",
    label: "资源类型",
    name: "serviceType",
    value: "6",
    placeholder: "请选择",
    options: [
      {
        name: 'esc',
        value: '6'
      },
      {
        name: 'oss',
        value: '7'
      },
      {
        name: 'rds',
        value: '8'
      },
      {
        name: 'slb',
        value: '9'
      }
    ]
  }]
export let areaJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设费用 (万元)",
    prop: "constructionCost",
    width: "",
    formatter(row) {
      if (row.constructionCost == row.constructionCostComparison) {
        return row.constructionCost
      } else {
        return '<span class="color-red">' + row.constructionCost + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "运维费用 (万元)",
    prop: "operationCost",
    width: "150",
    formatter(row) {
      if (row.operationCost == row.operationCostComparison) {
        return row.operationCost
      } else {
        return '<span class="color-red">' + row.operationCost + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "机房面积（㎡）",
    prop: "jfSize",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        type: "edit",
        // url: "areaXiazuan", //优先执行url
        onClick(tablePage, self, e) {
          self.nomal = !self.nomal;
          tablePage.isShow = !tablePage.isShow;
          tablePage.$router.push({ name: 'tablepage', params: { pagename: 'areaXiazuan' }, query: { departName: e.name, sysOrgCode: e.sysOrgCode, ...self.$route.query, pageNumber: 1 } })

        }
      }
    ]
  }
]
export let areaJsonListXz = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "机房名称",
    prop: "jfNm",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设费用 (万元)",
    prop: "constructionCost",
    width: "",
    formatter(row) {
      if (row.constructionCost == row.constructionCostComparison) {
        return row.constructionCost
      } else {
        return '<span class="color-red">' + row.constructionCost + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "运维费用 (万元)",
    prop: "operationCost",
    width: "150",
    formatter(row) {
      if (row.operationCost == row.operationCostComparison) {
        return row.operationCost
      } else {
        return '<span class="color-red">' + row.operationCostComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "机房面积（㎡）",
    prop: "jfSize",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
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
        // type: "edit",
        // url: "jifangdefault/jifang", //优先执行url
        onClick
      }
    ]
  }
]
// 机房投入资金
export let touruJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设总费用（万元）",
    prop: "constructionCost",
    width: "", // ccsbTrje    Comparison
    formatter(row){
      if(row.constructionCost==row.constructionCostComparison){
        return row.constructionCost
      }else {
        return '<span class="color-red">'+row.constructionCost+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "运维费用 (万元)",
    prop: "operationCost",
    width: "150",
    formatter(row){
      if(row.operationCost==row.operationCostComparison){
        return row.operationCost
      }else {
        return '<span class="color-red">'+row.operationCost+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "网络设备投入金额",
    prop: "wlsbTrje",
    width: "",
    formatter(row){
      if(row.wlsbTrje==row.wlsbTrjeComparison){
        return row.wlsbTrje
      }else {
        return '<span class="color-red">'+row.wlsbTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "服务器投入金额",
    prop: "fwqTrje",
    width: "",
    formatter(row){
      if(row.fwqTrje==row.fwqTrjeComparison){
        return row.fwqTrje
      }else {
        return '<span class="color-red">'+row.fwqTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "安全设备投入金额",
    prop: "aqsbTrje",
    width: "",
    formatter(row){
      if(row.aqsbTrje==row.aqsbTrjeComparison){
        return row.aqsbTrje
      }else {
        return '<span class="color-red">'+row.aqsbTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "存储设备投入金额",
    prop: "ccsbTrje",
    width: "",
    formatter(row){
      if(row.ccsbTrje==row.ccsbTrjeComparison){
        return row.ccsbTrje
      }else {
        return '<span class="color-red">'+row.ccsbTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "专用设备投入金额",
    prop: "zysbTrje",
    width: "",
    formatter(row){
      if(row.zysbTrje==row.zysbTrjeComparison){
        return row.zysbTrje
      }else {
        return '<span class="color-red">'+row.zysbTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "机柜投入金额",
    prop: "jgTrje",
    width: "",
    formatter(row){
      if(row.jgTrje==row.jgTrjeComparison){
        return row.jgTrje
      }else {
        return '<span class="color-red">'+row.jgTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "空调投入金额",
    prop: "ktTrje",
    width: "",
    formatter(row){
      if(row.ktTrje==row.ktTrjeComparison){
        return row.ktTrje
      }else {
        return '<span class="color-red">'+row.ktTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "UPS投入金额",
    prop: "uspTrje",
    width: "",
    formatter(row){
      if(row.uspTrje==row.uspTrjeComparison){
        return row.uspTrje
      }else {
        return '<span class="color-red">'+row.uspTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "软件总投入金额",
    prop: "rjzTrje",
    width: "",
    formatter(row){
      if(row.rjzTrje==row.rjzTrjeComparison){
        return row.rjzTrje
      }else {
        return '<span class="color-red">'+row.rjzTrje+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        // type: "edit",
        // url: "touruXiazuan", //优先执行url
        onClick(tablePage, self, row) {
          tablePage.$router.push({ name: 'tablepage', params: { pagename: 'touruXiazuan' }, query: { departName:row.name,sysOrgCode: row.sysOrgCode, ...self.$route.query, pageNumber: 1 } })

        }
      }
    ]
  },
]
export let touruJsonListXz = [
  {
    type: "text",
    align: "center",
    label: "机房名称",
    prop: "jfNm",
    width: ""
  },
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设总费用（万元）",
    prop: "constructionCost",
    width: "",
    formatter(row){
      if(row.constructionCost==row.constructionCostComparison){
        return row.constructionCost
      }else {
        return '<span class="color-red">' + row.constructionCost+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "网络设备投入金额",
    prop: "wlsbTrje",
    width: "",
    formatter(row){
      if(row.wlsbTrje==row.wlsbTrjeComparison){
        return row.wlsbTrje
      }else {
        return '<span class="color-red">' + row.wlsbTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "服务器投入金额",
    prop: "fwqTrje",
    width: "",
    formatter(row){
      if(row.fwqTrje==row.fwqTrjeComparison){
        return row.fwqTrje
      }else {
        return '<span class="color-red">' + row.fwqTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "安全设备投入金额",
    prop: "aqsbTrje",
    width: "",
    formatter(row){
      if(row.aqsbTrje==row.aqsbTrjeComparison){
        return row.aqsbTrje
      }else {
        return '<span class="color-red">' + row.aqsbTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "存储设备投入金额",
    prop: "ccsbTrje",
    width: "",
    formatter(row){
      if(row.ccsbTrje==row.ccsbTrjeComparison){
        return row.ccsbTrje
      }else {
        return '<span class="color-red">' + row.ccsbTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "专用设备投入金额",
    prop: "zysbTrje",
    width: "",
    formatter(row){
      if(row.zysbTrje==row.zysbTrjeComparison){
        return row.zysbTrje
      }else {
        return '<span class="color-red">' + row.zysbTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "机柜投入金额",
    prop: "jgTrje",
    width: "",
    formatter(row){
      if(row.jgTrje==row.jgTrjeComparison){
        return row.jgTrje
      }else {
        return '<span class="color-red">' + row.jgTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "空调投入金额",
    prop: "ktTrje",
    width: "",
    formatter(row){
      if(row.ktTrje==row.ktTrjeComparison){
        return row.ktTrje
      }else {
        return '<span class="color-red">' + row.ktTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "UPS投入金额",
    prop: "uspTrje",
    width: "",
    formatter(row){
      if(row.uspTrje==row.uspTrjeComparison){
        return row.uspTrje
      }else {
        return '<span class="color-red">' + row.uspTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "软件总投入金额",
    prop: "rjzTrje",
    width: "",
    formatter(row){
      if(row.rjzTrje==row.rjzTrjeComparison){
        return row.rjzTrje
      }else {
        return '<span class="color-red">' + row.rjzTrjeComparison+'</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
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
        // type: "edit",
        // url: "jifangdefault/jifang", //优先执行url
        onClick
      }
    ]
  },
]
export let touruJsonListXz1 = [
  {
    type: "text",
    align: "center",
    label: "机房名称",
    prop: "jfNm",
    width: ""
  },
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "运维费用 (万元)",
    prop: "operationCost",
    width: "150",
    formatter(row) {
      if (row.operationCost == row.operationCostComparison) {
        return row.operationCost
      } else {
        return '<span class="color-red">' + row.operationCostComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "网络设备投入金额",
    prop: "wlsbTrje",
    width: "",
    formatter(row) {
      if (row.wlsbTrje == row.wlsbTrjeComparison) {
        return row.wlsbTrje
      } else {
        return '<span class="color-red">' + row.wlsbTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "服务器投入金额",
    prop: "fwqTrje",
    width: "",
    formatter(row) {
      if (row.fwqTrje == row.fwqTrjeComparison) {
        return row.fwqTrje
      } else {
        return '<span class="color-red">' + row.fwqTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "安全设备投入金额",
    prop: "aqsbTrje",
    width: "",
    formatter(row) {
      if (row.aqsbTrje == row.aqsbTrjeComparison) {
        return row.aqsbTrje
      } else {
        return '<span class="color-red">' + row.aqsbTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "存储设备投入金额",
    prop: "ccsbTrje",
    width: "",
    formatter(row) {
      if (row.ccsbTrje == row.ccsbTrjeComparison) {
        return row.ccsbTrje
      } else {
        return '<span class="color-red">' + row.ccsbTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "专用设备投入金额",
    prop: "zysbTrje",
    width: "",
    formatter(row) {
      if (row.zysbTrje == row.zysbTrjeComparison) {
        return row.zysbTrje
      } else {
        return '<span class="color-red">' + row.zysbTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "机柜投入金额",
    prop: "jgTrje",
    width: "",
    formatter(row) {
      if (row.jgTrje == row.jgTrjeComparison) {
        return row.jgTrje
      } else {
        return '<span class="color-red">' + row.jgTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "空调投入金额",
    prop: "ktTrje",
    width: "",
    formatter(row) {
      if (row.ktTrje == row.ktTrjeComparison) {
        return row.ktTrje
      } else {
        return '<span class="color-red">' + row.ktTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "UPS投入金额",
    prop: "uspTrje",
    width: "",
    formatter(row) {
      if (row.uspTrje == row.uspTrjeComparison) {
        return row.uspTrje
      } else {
        return '<span class="color-red">' + row.uspTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "软件总投入金额",
    prop: "rjzTrje",
    width: "",
    formatter(row) {
      if (row.rjzTrje == row.rjzTrjeComparison) {
        return row.rjzTrje
      } else {
        return '<span class="color-red">' + row.rjzTrjeComparison + '</span>'
      }
    }
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
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
        // type: "edit",
        // url: "jifangdefault/jifang", //优先执行url
        onClick
      }
    ]
  },
]



// 机房数量投入资金
export let touruSizeJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "网络设备投入数量",
    prop: "wlSbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "服务器投入数量",
    prop: "fwqCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "安全设备投入数量",
    prop: "aqSbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "存储设备投入数量",
    prop: "ccSbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "专用设备投入数量",
    prop: "ccSbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "机柜投入数量",
    prop: "jfCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "空调投入数量",
    prop: "ktCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "USP投入数量",
    prop: "upsCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        // type: "edit",
        // url: "touruXiazuan", //优先执行url
        onClick(tablePage, self, row) {         
          tablePage.$router.push({ name: 'tablepage', params: { pagename: 'touruSizeXiazuan' }, query: { departName:row.name,sysOrgCode: row.sysOrgCode, ...self.$route.query, pageNumber: 1 } })

        }
      }
    ]
  },
]
export let touruSizeJsonListXz = [
  {
    type: "text",
    align: "center",
    label: "机房名称",
    prop: "jfNm",
    width: ""
  },
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "网络设备投入数量",
    prop: "wlSbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "服务器投入数量",
    prop: "fwqCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "安全设备投入数量",
    prop: "aqSbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "存储设备投入数量",
    prop: "ccSbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "专用设备投入数量",
    prop: "zySbcount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "机柜投入数量",
    prop: "jfCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "空调投入数量",
    prop: "ktCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "USP投入数量",
    prop: "upsCount",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
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
        // type: "edit",
        // url: "jifangdefault/jifang", //优先执行url
        onClick
      }
    ]
  },
]
// it资源
// 使用情况
export let usefullJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "CPU资源总量（核）",
    prop: "cpu",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "内存资源量（G）",
    prop: "ram",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "硬盘资源量（T）",
    prop: "rom",
    width: ""
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        // type: "edit",
        // url: "usefullXiazuan", //优先执行url
        onClick(_this, self,e) {
          self.nomal = !self.nomal;
          _this.isShow = !_this.isShow;
          _this.$router.push({ name: 'tablepage', params: { pagename: 'usefullXiazuan' }, query: { departName:e.name,sysOrgCode: e.sysOrgCode, ...self.$route.query, pageNumber: 1 } })
        }
      }
    ]
  }
]
// 使用情况下钻
export let usefullJsonListXz = [
  //行
  {
    type: "text",
    align: "center",
    label: "资源ID",
    prop: "eqpName",
    width: ""
  },
  // {
  //   type: "text",
  //   align: "center",
  //   label: "资源ID",
  //   prop: "id",
  //   width: ""
  // },
  {
    type: "text",
    align: "center",
    label: "资源状态",
    prop: "resourceStatus",
    width: "",
    formatter(row) {
      return ['已使用','未使用'][row.resourceStatus-1] || '未反馈'
    }
  },
  {
    type: "text",
    align: "center",
    label: "资源类型",
    prop: "serviceType",
    width: "",
    formatter(row) {
      return serviceall[row.serviceType - 6]
    }
  },
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  }, 
  {
    type: "text",
    align: "center",
    label: "CPU资源（核）",
    prop: "cpu",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "内存资源量（G）",
    prop: "ram",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "硬盘资源量（T）",
    prop: "rom",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "网络资源",
    prop: "comcon",
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
        onClick(tablePage, self, e) {
          self.nomal = !self.nomal;
          tablePage.isShow = !tablePage.isShow;
          tablePage.$router.push({ name: 'jifangdefault', params: { url: serviceall[e.serviceType - 6].toUpperCase() }, query: { lastTitleName:'【'+e.eqpName+'】'+'明细',id: e.id, ...self.$route.query, type: e.serviceType, typeNum: self.$route.query.type, radioBtn: self.$route.query.areaids  } });
          
        }
      }
    ]
  }
]
// 投入分析
export let putIntoJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "云资源租赁费用（万元）",
    prop: "buyTrje",
    width: "",
    formatter(row){
      if(row.buyTrje==row.buytrjeComparison){
        return row.buyTrje
      }else{
        return '<span class="color-red">'+row.buyTrje+'</span>'
      }
    }
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        // type: "edit",
        // url: "putIntoXiazuan", //优先执行url
        onClick(_this, self, e) {
          self.nomal = !self.nomal;
          _this.isShow = !_this.isShow;
          _this.$router.push({ name: 'tablepage', params: { pagename: 'putIntoXiazuan' }, query: { departName:e.name,sysOrgCode: e.sysOrgCode, ...self.$route.query, pageNumber: 1 } })
        }
      }
    ]
  }
]
// 投入分析下钻
export let putIntoJsonListXz = [
  //行
  {
    type: "text",
    align: "center",
    label: "资源ID",
    prop: "eqpName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "资源类型",
    prop: "serviceType",
    width: "",
    formatter(row) {
      return serviceall[row.serviceType - 6]
    }
  },
  {
    type: "text",
    align: "center",
    label: "云资源租赁费用",
    prop: "buyTrje",
    width: "",
    formatter(row){
      if(row.buyTrje==row.buytrjeComparison){
        return row.buyTrje
      }else{
        return '<span class="color-red">' + row.buytrjeComparison+'</span>'
      }
    }
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "查看详情",
        // type: "edit",
        // url: "putIntoXiazuan", //优先执行url
        onClick(_this, self, e) {
          //czz ???
          // self.nomal = !self.nomal;
          // _this.isShow = !_this.isShow;
          _this.$router.push({ name: 'jifangdefault', params: { url: serviceall[e.serviceType - 6].toUpperCase() }, query: { lastTitleName:'【'+e.eqpName+'】'+'明细',id: e.id, ...self.$route.query, type: e.serviceType, typeNum: _this.$route.query.type, radioBtn: self.$route.query.areaids} });
        }
      }
    ]
  }
]
// 立项依据
export let lixiangJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设费用",
    prop: "constrctionCost",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "国家派发资金",
    prop: "guojia",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "省级派发资金",
    prop: "shengji",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "自建投入资金",
    prop: "zj",
    width: ""
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        // type: "edit",
        // url: "lixiangXiazuan", //优先执行url
        onClick(_this, self,e) {
          self.nomal = !self.nomal;
          _this.isShow = !_this.isShow;
          _this.$router.push({ name: 'tablepage', params: { pagename: 'lixiangXiazuan' }, query: { sysOrgCode: e.sysOrgCode, ...self.$route.query, pageNumber: 1}})
        }
      }
    ]
  }
]
// 立项依据下钻
export let lixiangJsonListXz = [
  //行
  {
    type: "text",
    align: "center",
    label: "资源ID",
    prop: "id",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设费用",
    prop: "constrctionCost",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "立项依据",
    prop: "sysStatus",
    width: "",
    formatter(row, column, columnIndex, rowIndex) {
      return ['拟建', '在建', '已建', '国家派发', '升级派发', '上级派发'][row.sysStatus - 1]
    }
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "查看详情",
        // type: "edit",
        // url: "putIntoXiazuan", //优先执行url
        onClick(_this, self,e) {
          // czz ???
          self.nomal = !self.nomal;
          _this.isShow = !_this.isShow;
          _this.$router.push({ name: 'jifangdefault', params: { url: 'jifang' }, query: { id: e.id, ...self.$route.query, typeNum: _this.$route.query.type, radioBtn: self.$route.query.areaids }})

        }
      }
    ]
  }
]
// 资金来源
export let laiyuanJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "资源类型",
    prop: "resourceStatus",
    width: "",
    formatter(row, column, columnIndex, rowIndex) {
      return ['已使用', '可用'][row.resourceStatus - 1]
    }
  },
  {
    type: "text",
    align: "center",
    label: "建设总费用",
    prop: "constrctionCost",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "财政拨款",
    prop: "zcxm",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "自筹",
    prop: "czbk",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "BT项目",
    prop: "btxm",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "其他",
    prop: "qtxm",
    width: ""
  }, 
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        // type: "edit",
        // url: "laiyuanXiazuan", //优先执行url
        onClick(_this, self,e) {
        // czz
          self.nomal = !self.nomal;
          _this.isShow = !_this.isShow;
          _this.$router.push({ name: 'tablepage', params: { pagename: 'laiyuanXiazuan' }, query: { sysOrgCode: e.sysOrgCode, ...self.$route.query, pageNumber: 1}});

        }
      }
    ]
  }
]
// 资金来源下钻
export let laiyuanJsonListXz = [
  //行
  {
    type: "text",
    align: "center",
    label: "资源ID",
    prop: "id",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "name",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "资源类型",
    prop: "resourceStatus-",
    width: "",
    formatter(row, column, columnIndex, rowIndex) {
      return ['硬盘资源', 'CPU资源', '网络资源'][row.resourceStatus- - 1]
    }
  },
  {
    type: "text",
    align: "center",
    label: "资金来源",
    prop: "funingSource",
    width: "",
    formatter(row, column, columnIndex, rowIndex) {
      return ['财政拨款', '自筹', 'BT项目', '其他'][row.funingSource - 1]
    }
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "查看详情",
        // type: "edit",
        // url: "putIntoXiazuan", //优先执行url
        onClick
      }
    ]
  }
]
export let resouceJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "部门名称",
    prop: "deptName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设费用(万元)",
    prop: "constrctionCost",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "运维费用(万元)",
    prop: "operactionCost",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "CPU资源",
    prop: "cpu",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "硬盘资源",
    prop: "rom",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "内存资源",
    prop: "comcon",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "所属地区",
    prop: "areaName",
    width: ""
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "数据钻取",
        // type: "edit",
        url: "resouceXiazuan", //优先执行url
        onClick(tablePage, self) {
          self.nomal = !self.nomal;
          tablePage.isShow = !tablePage.isShow;

        }
      }
    ]
  }
]
export let resouceXiazuanJsonList = [
  //行
  {
    type: "text",
    align: "center",
    label: "资源名称",
    prop: "hardName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "建设费用 (万元)",
    prop: "buyTrje",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "运维费用 (万元)",
    prop: "operationTrje",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "资金来源",
    prop: "funingSource",
    width: "",
    formatter(row, column, columnIndex, rowIndex) {
      return ['财政拨款', '自筹', 'BT项目', '其他'][row.funingSource - 1]
    }
  },
  {
    type: "text",
    align: "center",
    label: "所属单位",
    prop: "deptName",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "资源类型",
    prop: "type",
    width: ""
  },
  {
    type: "text",
    align: "center",
    label: "立项依据",
    prop: "sysStatus",
    width: "",
    formatter(row, column, columnIndex, rowIndex) {
      return ['拟建', '在建', '已建', '国家派发', '升级派发', '上级派发'][row.sysStatus - 1]
    }
  },
  {
    type: "handle",
    align: "center",
    label: "操作",
    width: "",
    list: [
      {
        label: "查看详情",
        // type: "edit",
        url: 'jifangdefault/money', //优先执行url
        onClick(tablePage, self) {
          self.nomal = !self.nomal;
          tablePage.isShow = !tablePage.isShow;

        }
      }
    ]
  }
]