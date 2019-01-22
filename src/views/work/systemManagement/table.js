/* 数据库类 - 数据表详情 */

let dataArea = {
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
            prop: "dataAreaDec",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "数据量(行)",
            prop: "num",
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
            "value": "",
            "placeholder": "请选择",
            options: [{
                value: '数据库名',
                label: '数据库名'
            }, {
                value: '数据库描述',
                label: '数据库描述'
            }]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    data:[{
        tableName:'表名',
        dataAreaDec:'描述',
        num:'0',
        resourceDescribe:'34',
        storageSpace:'457',
    },{
        tableName:'表名',
        dataAreaDec:'描述',
        num:'0',
        resourceDescribe:'34',
        storageSpace:'457',
    },]
}
/* 文件类 */
let dataAreaFile = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "文件名",
            prop: "filename",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "文件大小(MB)",
            prop: "size",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "修改时间",
            prop: "time",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "路径地址",
            prop: "address",
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
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    data:[{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
    },{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
    },]
}
/* 数据表详情 */
let dataSheetDetails = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "数据表名",
            prop: "filename",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "数据表描述",
            prop: "size",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "数据量(行)",
            prop: "time",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "存储空间(MB)",
            prop: "address",
            width: "",
        }]
    },
    searchs: {
        list:[{
            "type": "input-select", //输入文本
            label: "",
            "name": "conditionPa",
            "value": "",
            "placeholder": "请选择",
            options: [{
                value: '数据表名',
                label: '数据表名'
            }, {
                value: '数据表描述',
                label: '数据表描述'
            }]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    data:[{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
    },{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
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
        list:[]
    },// 搜索类型数据
    data:[{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
    },{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
    },]
}
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
        list:[]
    },// 搜索类型数据
    data:[{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
    },{
        filename:'文件名',
        resourceId:'size',
        time:'0',
        address:'描述描述',
    },]
}
export {
    dataArea,
    dataAreaFile,
    dataSheetDetails,
    configManagement,
    stateManagement,
}