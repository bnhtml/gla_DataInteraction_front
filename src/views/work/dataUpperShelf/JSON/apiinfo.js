
export let params = {
  column: [{
    type: "text",
    align: "",
    label: "字段名称",
    prop: "interfaceName",
    width: "",
  },
  {
    type: "text",
    align: "",
    label: "字段类型",
    prop: "resourceId",
    width: "",
  },
  {
    type: "text",
    align: "",
    label: "字段描述",
    prop: "resourceName",
    width: "",
  },
  ]
}
export let usage = {
  column: [{
    type: "text",
    align: "",
    label: "资源申请单号",
    prop: "interfaceName",
    width: "",
  },
  {
    type: "text",
    align: "",
    label: "申请部门",
    prop: "resourceId",
    width: "",
  },
  {
    type: "text",
    align: "",
    label: "服务接口使用期限(天)",
    prop: "resourceName",
    width: "",
  },
  {
    type: "text",
    align: "",
    label: "使用时间范围",
    prop: "resourceDescribe",
    width: "",
  },
  {
    type: "text",
    align: "",
    label: "状态",
    prop: "interfaceAddress",
    width: ""
  },
  {
    type: "handle",
    align: "center",
    label: "APIkey",
    width: "80",
    list: [{
      label: "查看",
      onClick(_this, self, row) {
        console.log('查看详情')

        self.nomal = !self.nomal;
        _this.$confirm('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36', "APIkey", {
          confirmButtonText: '确定',
          showCancelButton: false,
          showConfirmButton: true,
          showClose: false,
        })
      }
    }]
  }
  ]
}