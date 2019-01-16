import {
  SERVER_BASE_URL
} from '@/http/config.js';

let MOCK_URL = 'http://39.107.233.177:36743'
let json = [{
  column: [
    {
      type: "text",
      align: "center",
      label: "部门名称",
      prop: "name",
      width: "",

    },
    {
      type: "text",
      align: "center",
      label: "机房名称",
      prop: "roomname",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "机房面积（㎡）",
      prop: "roomsize",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "硬件数量（台）",
      prop: "equcount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "硬件总投入金额(万元)",
      prop: "hardMoney",
      width: "",
      formatter(row) {
        if (row.hardMoney == row.hardMoneyComparison) {
          return row.hardMoney
        } else {
          return '<span class="color-red">' + row.hardMoneyComparison + '</span>'
        }
      }

    },
    {
      type: "text",
      align: "center",
      label: "软件总投入金额(万元)",
      prop: "softMoney",
      width: "",
      formatter(row) {
        if (row.softMoney == row.softMoneyComparison) {
          return row.softMoney
        } else {
          return '<span class="color-red">' + row.softMoneyComparison + '</span>'
        }
      }

    },
    {
      type: "text",
      align: "center",
      label: "总投入金额（万元）",
      prop: "putintoMoney",
      width: "",
      formatter(row) {
        if (row.putintoMoney == row.putintoMoneyComparison) {
          return row.putintoMoney
        } else {
          return '<span class="color-red">' + row.putintoMoneyComparison + '</span>'
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
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTableDetail",
              query: {
                id: e.id,
                deName: e.roomname,
                typeTitle: 'pcRoom',
                backQuery: JSON.stringify(_this.$route.query)
              },
              params: {
                url: "pcRoom"
              }
            })
          }
        }
      ]
    }
  ]
}, {
  column: [
    {
      type: "text",
      align: "center",
      label: "部门名称",
      prop: "name",
      width: "",

    },
    {
      type: "text",
      align: "center",
      label: "机房名称",
      prop: "jfname",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "网络设备数量",
      prop: "netcount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "服务器数量",
      prop: "serverscount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "安全设备数量",
      prop: "safeeqipmentcount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "存储设备数量",
      prop: "romeqipmentcount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "专用设备数量",
      prop: "specificequpmentcount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "机柜数量",
      prop: "cabinetcount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "空调数量",
      prop: "aircondionercount",
      width: ""

    },
    {
      type: "text",
      align: "center",
      label: "UPS数量",
      prop: "upscount",
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
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTableDetail",
              query: {
                id: e.id,
                deName: e.orgname,
                typeTitle: 'pcRoom'
              },
              params: {
                url: "pcRoom"
              }
            })
          }
        }
      ]
    }
  ]
}]
export default [{
  tableJson: json[0], // 机房建设情况
  url: `${SERVER_BASE_URL}/api/computerroom/constructionConditionTableSencodePage`,
  api: 'constructionConditionMapSencodePage'
}, {
  tableJson: json[1], // 机房设备分析
  url: `${SERVER_BASE_URL}/api/computerroom/equipmentTableSecondPage`,
  api: 'equipmentMapSecondPage'
},]