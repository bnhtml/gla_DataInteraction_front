import {
  SERVER_BASE_URL
} from '@/http/config.js';

let MOCK_URL = 'http://39.107.233.177:36743'
export let searchs = {
  list: [{
    "type": "input-text", //输入文本
    // "label": "系统名称",
    "name": "resourceCode",
    "value": "",
    "placeholder": "请输入固定资产编号",
  },
  ]
}
export let tableJson = {
  column: [
    {
      type: "text",
      align: "center",
      label: "固定资产编号",
      prop: "fixed_asset_number",
      width: ""
    },
    {
      type: "text",
      align: "center",
      label: "设备MAC地址",
      prop: "mac",
      width: ""
    },
    {
      type: "text",
      align: "center",
      label: "内存（GB)",
      prop: "rom",
      width: ""
    },
    {
      type: "text",
      align: "center",
      label: "硬盘",
      prop: "ram",
      width: ""
    },
    {
      type: "text",
      align: "center",
      label: "所属部门单位名称",
      prop: "orgname",
      width: ""
    },
    {
      type: "text",
      align: "center",
      label: "所属地区",
      prop: "orgarea",
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
                typeTitle: 'servers'
              },
              params: {
                url: "servers"
              }
            })
          }
        }
      ]
    }

  ]
}

/* 服务器 分析 */
export let serverResources = {
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
      label: "服务器数量",
      prop: "servers",
      width: "",
      sortable: true

    },
    {
      type: "text",
      align: "center",
      label: "内存资源(GB)",
      prop: "ram",
      width: "",
      sortable: true

    },
    {
      type: "text",
      align: "center",
      label: "硬盘资源(TB)",
      prop: "rom",
      width: "",
      sortable: true

    },
    {
      type: "handle",
      align: "center",
      label: "操作",
      width: "",
      list: [
        {
          label: "数据钻取",
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTablexz",
              query: {
                sysOrgCode: e.sysOrgCode||'',
                orgType: _this.$route.query.orgType || 1,
                type: "fundUse",
                column: 0,
                types: 1,
                deName: e.name
              }
            })
          }
        }
      ]
    }
  ]
}

export default {
  tableJson, // 业务 - 建设 
  searchs,
  url: `${SERVER_BASE_URL}/api/servers/serverresourceThirdPage`,
}