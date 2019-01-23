/* 数据库类 - 数据表详情 */

let dataArea = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "schema库名",
            prop: "databaseName",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "schema库描述",
            prop: "databaseDescribe",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "数据量(行)",
            prop: "tableNum",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "存储空间(MB)",
            prop: "storageSpace",
            width: "",
        }, {
            type: "handle",
            align: "center",
            label: "操作",
            width: "100",
            list: [{
                label: "查看数据表",
                onClick(_this, self, row) {
                    console.log('查看数据表');
                    self.nomal = !self.nomal;
                    _this.isShow = !_this.isShow;
                    _this.$router.push({
                        name: 'dataSheetDetails',
                        query: {
                            backQuery: JSON.stringify(_this.$route.query),
                            // id: row.id,
                            // tableTitle: row.interfaceName,
                            // type: row.type,
                        }
                    })
                }
            }]
        }]
    },
    searchs: {
        list: [{
            "type": "input-select", //输入文本
            label: "",
            "name": "conditionPa",
            "value": "schema库名",
            "placeholder": "请选择",
            options: [{
                value: 'schema库名',
                label: 'schema库名'
            }, {
                value: 'schema库描述',
                label: 'schema库描述'
            }]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    data: [{
        tableName: '表名',
        dataAreaDec: '描述',
        num: '0',
        resourceDescribe: '34',
        storageSpace: '457',
    }, {
        tableName: '表名',
        dataAreaDec: '描述',
        num: '0',
        resourceDescribe: '34',
        storageSpace: '457',
    },]
}
/* 文件类 */
let dataAreaFile = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "文件名",
            prop: "fileName",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "文件大小(MB)",
            prop: "fileSize",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "修改时间",
            prop: "updateTime",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "路径地址",
            prop: "filePath",
            width: "",
        }, {
            type: "handle",
            align: "center",
            label: "操作",
            width: "100",
            list: [{
                label: "复制路径",
                onClick(_this, self, row) {
                    console.log('复制路径');
                    self.nomal = !self.nomal;
                    _this.isShow = !_this.isShow;
                }
            }]
        }]
    },
    searchs: {
        list: [{
            type: 'input-text',
            label: '文件名',
            name: 'fileName',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    data: [{
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    }, {
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    },]
}
/* 数据表详情 */
let dataSheetDetails = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "数据表名",
            prop: "tableName",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "数据表描述",
            prop: "tableDesc",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "数据量(行)",
            prop: "dataNum",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "存储空间(MB)",
            prop: "storageSpace",
            width: "",
        }, ]
    },
    searchs: {
        list: [{
            "type": "input-select", //输入文本
            label: "",
            "name": "conditionPa",
            "value": "schema表名",
            "placeholder": "请选择",
            options: [{
                value: 'schema表名',
                label: 'schema表名'
            }, {
                value: 'schema表描述',
                label: 'schema表描述'
            }]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    data: [{
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    }, {
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    },]
}
/* 配置管理 */
let configManagement = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "任务",
            prop: "filename",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "对象名称",
            prop: "size",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "用户",
            prop: "time",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "开始时间",
            prop: "address",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "结束时间",
            prop: "address",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "状态",
            prop: "address",
            width: "",
        }]
    },
    searchs: {
        list: []
    },// 搜索类型数据
    data: [{
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    }, {
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    },]
}
/* 状态管理 */
let stateManagement = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "任务",
            prop: "filename",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "对象名称",
            prop: "size",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "用户",
            prop: "time",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "开始时间",
            prop: "address",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "结束时间",
            prop: "address",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "状态",
            prop: "address",
            width: "",
        }]
    },
    searchs: {
        list: []
    },// 搜索类型数据
    data: [{
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    }, {
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    },]
}
/* 单位域名管理 */
let unitDomainNameManagement = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "单位名称",
            prop: "filename",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "单位域名",
            prop: "size",
            width: "",
        }, /* {
            type: "text",
            align: "",
            label: "最后修改时间",
            prop: "time",
            width: "",
        }, {
            type: "handle",
            align: "center",
            label: "操作",
            width: "100",
            list: [{
                label: "修改",
                onClick(_this, self, row) {
                    _this.$prompt('', '修改单位域名', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        showClose: false
                    }).then(({ value }) => {
                        _this.$message({
                            type: 'success',
                            message: '修改域名成功 '
                        });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '取消修改'
                        });
                    });
                }
            }]
        } */]
    },
    searchs: {
        list: [{
            "type": "input-select", //输入文本
            label: "",
            "name": "conditionPa",
            "value": "单位名称",
            "placeholder": "请选择",
            options: [{
                value: '单位名称',
                label: '单位名称'
            }, {
                value: '单位域名',
                label: '单位域名'
            }]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    data: [{
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    }, {
        filename: '文件名',
        resourceId: 'size',
        time: '0',
        address: '描述描述',
    },]
}
export {
    dataArea,
    dataAreaFile,
    dataSheetDetails,
    configManagement,
    stateManagement,
    unitDomainNameManagement,
}