let published = {
    tableJson: {
        column: [

        {
            type: "text",
            align: "",
            label: "资源ID",
            prop: "resourceId",
            width: "100",
        },{
            type: "text",
            align: "",
            label: "数据接口名称",
            prop: "dataInterfaceName",
            width: "",
            'show-overflow-tooltip': true
        },
        {
            type: "text",
            align: "",
            label: "资源名称",
            prop: "resourceName",
            width: "",
            'show-overflow-tooltip': true
        },
        // {
        //     type: "text",
        //     align: "",
        //     label: "资源描述",
        //     prop: "dataInterfaceDesc",
        //     width: "",
        // },
        {
            type: "text",
            align: "",
            label: "数据接口地址",
            prop: "urlSuccess",
            width: "",
            'show-overflow-tooltip': true
        },
        {
            type: "text",
            align: "center",
            label: "被调用次数",
            prop: "useResourceTimes",
            width: "",

        },
        {
            type: "handle",
            align: "center",
            label: "操作",
            width: "80",
            list: [{
                label: "查看详情",
                onClick(_this, self, row) {
                    console.log('查看详情')

                    self.nomal = !self.nomal;
                    _this.isShow = !_this.isShow;
                    _this.$router.push({
                        name: 'info',
                        query: {
                            fromName: _this.$route.name,
                            user: _this.$route.query.user,
                            deptType: _this.$route.query.deptType,
                            resourceId: row.resourceId,
                            depart:_this.$route.query.depart,
                            dataInterfaceType:row.dataInterfaceType
                        }
                    })
                }
            }]
        }
        ]
    },
    searchs: {
        list: [{
            "type": "input-select", //输入文本
            label: "",
            "name": "conditionPa",
            "value": "dataInterfaceName",
            "placeholder": "请选择",
            options: [{
                value: 'dataInterfaceName',
                name: '数据接口名称'
            }, {
                value: 'urlSuccess',
                name: '数据接口地址'
            }, {
                value: 'resourceName',
                name: '资源名称'
            }, {
                value: 'resourceId',
                name: '资源ID'
            },]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },
    
}
let unpublished = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "资源ID",
            prop: "resourceId",
            width: "100",
        }, {
            type: "text",
            align: "",
            label: "资源名称",
            prop: "resourceName",
            width: "",
        },
        {
            type: "text",
            align: "",
            label: "资源描述",
            prop: "resourceDescribe",
            width: "",
            'show-overflow-tooltip': true
        },
        {
            type: "text",
            align: "",
            label: "数据接口名称",
            prop: "dataInterfaceName",
            width: "",
            'show-overflow-tooltip': true
        },
        {
            type: "text",
            align: "",
            label: "封装日期",
            prop: "createTime",
            width: "",
            'show-overflow-tooltip': true,
            formatter(row){
                console.log(row, '----')
                return row.createTime && row.createTime.replace('T', ' ') || ''
            }

        },

        {
            type: "text",
            align: "",
            label: "状态",
            prop: "dataInterfaceStatus",
            width: "100",
            formatter(row) {
                return ['未封装', '已封装'][row.dataInterfaceStatus]
            }
        },


        {
            type: "handle",
            align: "",
            label: "操作",
            width: "300",
            list: [{
                formatter(row, column, columnIndex, rowIndex) {
                    return ['封装接口', "修改接口"][row.dataInterfaceStatus]
                },
                onClick(_this, self, row) {
                    let name = 'interfaceUpdate';
                    let { resourceId, departName, resourceName, resourceDescribe, departDomain, dataInterfaceStatus} = row;
                    if (row.dataInterfaceStatus == 0) {
                        name = 'interfacePackage'

                        console.log('封装接口')

                    } else {
                        console.log('修改接口')
                    }
                    _this.$router.push({
                        name,
                        query: {
                            resourceId,
                            departName,
                            resourceName,
                            resourceDescribe,
                            departDomain,
                            dataInterfaceStatus,
                            user: _this.$route.query.user
                        }
                    })

                }
            }, {
                formatter(row, column, columnIndex, rowIndex) {
                    return ['', "接口文档"][row.dataInterfaceStatus]
                },
                onClick(_this, self, row) {
                    if (row.dataInterfaceStatus == 1) {
                        self.$parent.fileUpload();
                    }

                }
            }, {
                formatter(row, column, columnIndex, rowIndex) {
                    return ['', "发布"][row.dataInterfaceStatus]
                },
                onClick(_this, self, row) {
                    if (row.dataInterfaceStatus == 1) {
                        self.$parent.publish(row.resourceId);
                        // _this.$confirm('数据资源发布后，将会再对外公布，请确认是否发布数据接口。', "数据接口发布", {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        //     showCancelButton: true,
                        //     showConfirmButton: true,
                        //     showClose: false,
                        //     type: 'warning'
                        // }).then(() => {
                        //     _this.$message({
                        //         type: 'success',
                        //         message: '发布成功!'
                        //     });
                        // }).catch(() => {
                        //     _this.$message({
                        //         type: 'info',
                        //         message: '已取消发布'
                        //     });
                        // });
                    }

                }
            }, {
                formatter(row, column, columnIndex, rowIndex) {
                    return ['', "测试apikey"][row.dataInterfaceStatus]
                },
                onClick(_this, self, row) {
                    self.$parent.testApi({ resourceId: row.resourceId, depart: row.departName})
                }
            }]
        }
        ]

    },
    searchs: {
        list: [
            
            {
                type: "input-select", //输入文本
                label: "",
                name: "conditionPa",
                value: "",
                placeholder: "请选择",
                options: [
                    {
                        value: "资源名称",
                        name: "资源名称"
                    },
                    {
                        value: "资源ID",
                        name: "资源ID"
                    }
                ]
            },
            {
                type: "input-text",
                label: "",
                name: "conditionSo",
                value: "",
                placeholder: "请输入"
            },
            {
                type: "input-radio", //输入文本
                label: "",
                name: "isEncap",
                value: "",
                placeholder: "请选择",
                options: [
                    {
                        value: "待发布",
                        name: "待发布"
                    },
                    {
                        value: "未封装",
                        name: "未封装"
                    }
                ]
            },
        ]
    },
    data: [{
        dataInterfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        applyStatus: '0',
        dataInterfaceDesc: '描述描述',
        applyNum: '中软申请流程的单据号',
        applyDay: '2019-01-10 13:56:23',
    }, {
        dataInterfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        applyStatus: '1',
        dataInterfaceDesc: '描述描述',
        applyNum: '中软申请流程的单据号',
        applyDay: '2019-01-10 13:56:23',
    },]
}
let apiParams = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "字段名称",
            prop: "fieldName",
            width: "",
        },
        {
            type: "text",
            align: "",
            label: "字段类型",
            prop: "fieldType",
            width: "",
        },
        {
            type: "text",
            align: "",
            label: "字段描述",
            prop: "fieldDesc",
            width: "",
        }]
    },

}
let apiUsage ={
    tableJson:{
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
          }]
    }
}
export {
    published,
    unpublished,
    apiParams,
    apiUsage,
}