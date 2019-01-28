import { SERVER_BASE_URL } from '@/http/conf.js';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
/* 数据库类 - 数据表详情 */

let dataArea = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "schema库名",
            prop: "schemaName",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "schema库描述",
            prop: "schemaDesc",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "表数量",
            prop: "dataNum",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "存储空间(MB)",
            prop: "tableSize",
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
                            schemaName: row.schemaName,
                            depart: _this.$route.query.depart || ''

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
                name: 'schema库名',
                value: 'schema库名' // schemaName
            }, {
                name: 'schema库描述',
                value: 'schema库描述' //schemaDesc
            }]
        }, {
            type: 'input-text',
            label: '',
            name: 'conditionSo',
            value: '',
            "placeholder": "请输入",
        }]
    },// 搜索类型数据
    url: `${SERVER_BASE_URL}/new_interface/query_databaseClass`
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
        },/*  {
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
        },  */{
            type: "text",
            align: "",
            label: "路径地址",
            prop: "fileAddress",
            width: "",
        }, {
            type: "handle",
            align: "center",
            label: "操作",
            width: "100",
            list: [{
                label: "复制路径",
                onClick(_this, self, row) {
                    _this.$copyText(row.fileAddress).then(res => {
                        _this.$message({
                            message: '复制成功',
                            type: 'success'
                          });
                    }, err => {
                        _this.$message({
                            message: '该浏览器不支持',
                            type: 'warning'
                          });
                    })
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
    url: `${SERVER_BASE_URL}/new_interface/query_file`
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
        //     type: "text",
        //     align: "",
        //     label: "数据量(行)",
        //     prop: "dataNum",
        //     width: "",
        // }, {
            type: "text",
            align: "",
            label: "存储空间(MB)",
            prop: "storageSpace",
            width: "",
        },]
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
    url: `${SERVER_BASE_URL}/new_interface/query_table`
}
/* 配置管理 */
let configManagement = {
    tableJson: {
        column: [{
            type: "text",
            align: "",
            label: "任务",
            prop: "detartTask",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "对象名称",
						prop: "detartObject", 
            width: "",
        }, {
            type: "text",
            align: "",
            label: "用户",
            prop: "detartUser",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "开始时间",
						prop: "detartAirtime",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "结束时间",
						prop: "detartEndtime",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "状态",
						prop: "superStatus",
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
			label: "源IP",
			prop: "staIP",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "时间",
			prop: "staTime",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "动作",
			prop: "staMethod",
            width: "",
        }, {
            type: "text",
            align: "",
			label: "数据资源名称",
			prop: "staDataName",
            width: "",
        }, {
            type: "text",
            align: "",
			label: "数据资源地址",
			prop: "staDataList",
            width: "",
		}, {
			type: "text",
			align: "",
			label: "用户名",
			prop: "staUser",
			width: "",
		}, {
			type: "text",
			align: "",
			label: "状态",
			prop: "staStatus",
			width: "",
		}, {
			type: "text",
			align: "",
			label: "数据大小",
			prop: "staDataSize",
			width: "",
		}, {
			type: "text",
			align: "",
			label: "客户端",
			prop: "staClient",
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
            prop: "departName",
            width: "",
        }, {
            type: "text",
            align: "",
            label: "单位域名",
            prop: "departDomain",
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