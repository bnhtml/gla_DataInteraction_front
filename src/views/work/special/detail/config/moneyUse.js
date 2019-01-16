import {
  SERVER_BASE_URL
} from '@/http/config.js';
let MOCK_URL = 'http://39.107.233.177:36743'
export let tableJson = {
  column: [
    {
      type: "text",
      align: "center",
      label: "部门名称",
      prop: "orgName",
      width: ""
    },
    {
      type: "handle",
      align: "center",
      label: "系统建设费用",
      prop: "systemConstructionCost",
      width: "",
      list: [
        {
          formatter(row, column, columnIndex, rowIndex) {
            return row.systemConstructionCost
          },
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTablexz",
              query: {
                sysOrgCode: e.sysOrgCode,
                type: "usedetailxx",
                year: _this.query.year,
                bmName: e.orgName,
                types: '5',
                backQuery:JSON.stringify(_this.$route.query)
              }
            })
          }
        }
      ]
    },
    {
      type: "handle",
      align: "center",
      label: "基础资源建设费用（机房）",
      prop: "basicResourceRoomConstructionCost",
      width: "",
      list: [
        {
          formatter(row, column, columnIndex, rowIndex) {
            if(row.basicResourceRoomConstructionCost ==row.basicResourceHardwareConstructionCostComparison){
              return row.basicResourceRoomConstructionCost
            }else{
              return '<span class="color-red">'+row.basicResourceRoomConstructionCost+'</span>'
            }
          },
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTablexz",
              query: {
                sysOrgCode: e.sysOrgCode,
                type: "usedetailjf",
                year: _this.query.year,
                bmName: e.orgName,
                types: '2',
                backQuery:JSON.stringify(_this.$route.query)
              }
            })
          }
        }
      ]
    },
    {
      type: "handle",
      align: "center",
      label: "基础资源建设费用（硬件）",
      prop: "basicResourceHardwareConstructionCost",
      width: "",
      list: [
        {
          formatter(row, column, columnIndex, rowIndex) {
            if(row.basicResourceHardwareConstructionCost ==row.basicResourceHardwareConstructionCostComparison){
              return row.basicResourceHardwareConstructionCost
            }else{
              return '<span class="color-red">'+row.basicResourceHardwareConstructionCost+'</span>'
            }
          },
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTablexz",
              query: {
                sysOrgCode: e.sysOrgCode,
                type: "usedetailyj",
                year: _this.query.year,
                bmName: e.orgName,
                types: '1',
                backQuery:JSON.stringify(_this.$route.query)
              }
            })
          }
        }
      ]
    },
    {
      type: "handle",
      align: "center",
      label: "基础资源运维费用（机房）",
      prop: "basicResourceRoomOperationCost",
      width: "",
      list: [
        {
          formatter(row, column, columnIndex, rowIndex) {
            if(row.basicResourceRoomOperationCost ==row.basicResourceRoomOperationCostComparison){
              return row.basicResourceRoomOperationCost
            }else{
              return '<span class="color-red">'+row.basicResourceRoomOperationCost+'</span>'
            }
          },
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTablexz",
              query: {
                sysOrgCode: e.sysOrgCode,
                type: "usedetailjf",
                year: _this.query.year,
                bmName: e.orgName,
                types: '2',
                backQuery:JSON.stringify(_this.$route.query)
              }
            })
          }
        }
      ]
    },
    {
      type: "handle",
      align: "center",
      label: "基础资源运维费用（硬件）",
      prop: "basicResourceHardwareOperationCost",
      width: "",
      list: [
        {
          formatter(row, column, columnIndex, rowIndex) {
            if(row.basicResourceHardwareOperationCost ==row.basicResourceHardwareOperationCostComparison){
              return row.basicResourceHardwareOperationCost
            }else{
              return '<span class="color-red">'+row.basicResourceHardwareOperationCost+'</span>'
            }
          },
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTablexz",
              query: {
                sysOrgCode: e.sysOrgCode,
                type: "usedetailyj",
                year: _this.query.year,
                bmName: e.orgName,
                types: '1',
                backQuery:JSON.stringify(_this.$route.query)
              }
            })
          }
        }
      ]
    },
    {
      type: "handle",
      align: "center",
      label: "云资源租赁费用",
      prop: "cloudResourcesRentalCost",
      width: "",
      list: [
        {
          formatter(row, column, columnIndex, rowIndex) {
            if(row.cloudResourcesRentalCost ==row.cloudResourcesRentalCostComparison){
              return row.cloudResourcesRentalCost
            }else{
              return '<span class="color-red">'+row.cloudResourcesRentalCost+'</span>'
            }
          },
          onClick(_this, self, e) {
            self.nomal = !self.nomal;
            _this.isShow = !_this.isShow;
            _this.$router.push({
              name: "specialTablexz",
              query: {
                sysOrgCode: e.sysOrgCode,
                type: "usedetailyzy",
                year: _this.query.year,
                bmName: e.orgName,
                types: '',
                backQuery:JSON.stringify(_this.$route.query)
              }
            })
          }
        }
      ]
    },
    {
      type: "text",
      align: "center",
      label: "合计",
      prop: "total",
      width: ""
    }

  ]
}


export default {
  tableJson,
  url: `${SERVER_BASE_URL}/api/capitalInvestment/getDetailsFundUseList`,
}