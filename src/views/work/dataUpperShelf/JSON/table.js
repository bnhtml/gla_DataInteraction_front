let published = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "数据接口名称",
            prop: "interfaceName",
            width: "",
        },
        {
            type: "text",
            align: "",
            label: "资源ID",
            prop: "resourceId",
            width: "",
        },
        {
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
        },
        {
            type: "text",
            align: "",
            label: "资源接口地址",
            prop: "interfaceAddress",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "被调用次数",
            prop: "callTimes",
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
            "value": "数据接口名称",
            "placeholder": "请选择",
            options: [{
                value: '数据接口名称',
                label: '数据接口名称'
            }, {
                value: '数据接口地址',
                label: '数据接口地址'
            }, {
                value: '资源名称',
                label: '资源名称'
            }, {
                value: '资源ID',
                label: '资源ID'
            },]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },
    data: [{
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        resourceName: '资源数据名称',
        resourceDescribe: '资源数据名称',
        interfaceAddress: '资源数据名称',
        callTimes: '2',
    },]
}
let unpublished = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "资源ID",
            prop: "resourceId",
            width: "",
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
            label: "状态",
            prop: "applyStatus",
            width: "100",
            formatter(row) {
                return ['已封装', '未封装'][row.applyStatus]
            }
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
            label: "申请单号",
            prop: "applyNum",
            width: "",
            'show-overflow-tooltip': true
        },
        {
            type: "text",
            align: "",
            label: "申请日期",
            prop: "applyDay",
            width: "",
            'show-overflow-tooltip': true

        },


        {
            type: "handle",
            align: "",
            label: "操作",
            width: "300",
            list: [{
                formatter(row, column, columnIndex, rowIndex) {
                    return ['封装接口', "修改接口"][row.applyStatus]
                },
                onClick(_this, self, row) {
                    let name = 'interfaceUpdate'
                    if (row.applyStatus == 0) {
                        name = 'interfacePackage'

                        console.log('封装接口')

                    } else {
                        console.log('修改接口')
                    }
                    _this.$router.push({
                        name,
                        query: {
                            backQuery: JSON.stringify(_this.$route.query),
                            id: row.id,
                            tableTitle: row.name,
                            type: row.type,
                        }
                    })

                }
            }, {
                formatter(row, column, columnIndex, rowIndex) {
                    return ['', "接口文档"][row.applyStatus]
                },
                onClick(_this, self, row) {
                    if (row.applyStatus == 1) {
                        self.$parent.fileUpload();
                    }

                }
            }, {
                formatter(row, column, columnIndex, rowIndex) {
                    return ['', "发布"][row.applyStatus]
                },
                onClick(_this, self, row) {
                    if (row.applyStatus == 1) {
                        _this.$confirm('数据资源发布后，将会再对外公布，请确认是否发布数据接口。', "数据接口发布", {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            showCancelButton: true,
                            showConfirmButton: true,
                            showClose: false,
                            type: 'warning'
                        }).then(() => {
                            _this.$message({
                                type: 'success',
                                message: '发布成功!'
                            });
                        }).catch(() => {
                            _this.$message({
                                type: 'info',
                                message: '已取消发布'
                            });
                        });
                    }

                }
            }, {
                formatter(row, column, columnIndex, rowIndex) {
                    return ['', "测试apikey"][row.applyStatus]
                },
                onClick(_this, self, row) {

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
                name: "apiName",
                value: "",
                placeholder: "请选择",
                options: [
                    {
                        value: "全部",
                        label: "全部"
                    },
                    {
                        value: "已封装",
                        label: "已封装"
                    },
                    {
                        value: "未封装",
                        label: "未封装"
                    }
                ]
            },
            {
                type: "input-select", //输入文本
                label: "",
                name: "apiName",
                value: "",
                placeholder: "请选择",
                options: [
                    {
                        value: "数据接口名称",
                        label: "数据接口名称"
                    },
                    {
                        value: "数据接口地址",
                        label: "数据接口地址"
                    },
                    {
                        value: "资源名称",
                        label: "资源名称"
                    },
                    {
                        value: "资源ID",
                        label: "资源ID"
                    }
                ]
            },
            {
                type: "input-text",
                label: "",
                name: "name",
                value: "",
                placeholder: "请输入"
            }
        ]
    },
    data: [{
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        applyStatus: '0',
        resourceDescribe: '描述描述',
        applyNum: '中软申请流程的单据号',
        applyDay: '2019-01-10 13:56:23',
    }, {
        interfaceName: '数据接口名称',
        resourceId: 'WERMKL345III0',
        applyStatus: '1',
        resourceDescribe: '描述描述',
        applyNum: '中软申请流程的单据号',
        applyDay: '2019-01-10 13:56:23',
    },]
}
export {
    published,
    unpublished,
}