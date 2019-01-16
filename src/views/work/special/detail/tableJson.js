/* 已填报部门 */
export let already = {
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
            label: "信息系统上报量",
            prop: "informationSystemCount",
            width: "",
            sortable: true,
            list: [
                {
                    formatter(row, column, columnIndex, rowIndex) {
                        return row.informationSystemCount || 0
                    },
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "alreadyxx",
                                types: 1,
                                bmName: e.orgName,
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
            label: "机房上报量",
            prop: "computerRoomCount",
            width: "150",
            sortable: true,
            list: [
                {
                    formatter(row, column, columnIndex, rowIndex) {
                        return row.computerRoomCount||0
                    },
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "alreadyjf",
                                types: 2,
                                bmName: e.orgName,
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
            label: "硬件上报量",
            prop: "equipmentCount",
            width: "",
            sortable: true,
            list: [
                {
                    formatter(row, column, columnIndex, rowIndex) {
                        return row.equipmentCount||0
                    },
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "alreadyyj",
                                types: 3,
                                bmName: e.orgName,
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
            label: "软件上报量",
            prop: "softCount",
            width: "",
            sortable: true,
            list: [
                {
                    formatter(row, column, columnIndex, rowIndex) {
                        return row.softCount ||0
                    },
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "alreadyrj",
                                types: 4,
                                bmName: e.orgName,
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
            label: "数据资产上报量",
            prop: "dataAssetCount",
            width: "",
            sortable: true,
            list: [
                {
                    formatter(row, column, columnIndex, rowIndex) {
                        return row.dataAssetCount||0
                    },
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "alreadysjzc",
                                types: 5,
                                bmName: e.orgName,
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
            label: "云资源上报量",
            prop: "cloudCount",
            width: "",
            sortable: true,
            list: [
                {
                    formatter(row, column, columnIndex, rowIndex) {
                        return row.cloudCount||0
                    },
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "alreadyyzy",
                                types: '6,7,8,9',
                                bmName: e.orgName,
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
            width: "100",
            sortable: true,
        },
    ]
};

/* 已填报  - 二级 - 信息系统*/
export let alreadyxx = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "建设状态",
            prop: "sysStatus",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'][row.sysStatus - 1]||'未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "覆盖范围",
            prop: "coverage",
            width: "",
            formatter(row) {
                return row.coverage || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "是否专网运行",
            prop: "bearerNetwork",  //runenvironment
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['否', '否', '是'][row.bearerNetwork - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "迁云状况",
            prop: "sfQyun",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1]||'未反馈'
            }
        },

        {
            type: "text",
            align: "center",
            label: "接入省级数据共享交换平台情况",
            prop: "exchange",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['是', '否'][row.exchange - 1]||'未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省网上办事大厅情况",
            prop: "sfJrswsbsdt",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['是', '否', '试用中'][row.sfJrswsbsdt - 1] || '未反馈'
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
                                deName: e.sysNm,
                                typeTitle: "alreadyxx",
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 已填报  - 二级 - 机房*/
export let alreadyjf = {
    column: [
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
            label: "机房面积",
            prop: "jfSize",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "硬件总投入金额(万元)",
            prop: "yjzTrje",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "软件总投入金额万元(万元)",
            prop: "rjzTrje",
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
                                deName: e.jfNm,
                                typeTitle: "alreadyxx",
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'pcRoom'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 已填报  - 二级 - 硬件*/
export let alreadyyj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "设备名称",
            prop: "eqpNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "设备类型",
            prop: "eqpType",
            width: "",
            formatter(row){
                return ['服务器','专用设备','ECS','UPS','其他','机柜','空调','安全设备','网络设备','路由器','交换机'][row.eqpType - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "设备型号",
            prop: "xjbs",
            width: "150",
            formatter(row){
                return row.xjbs||'未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "硬件采购价格(万元)",
            prop: "equPrice",
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
                                deName: e.eqpNm,
                                typeTitle: "alreadyxx",
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'yj'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 已填报  - 二级 - 软件*/
export let alreadyrj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "软件名称",
            prop: "softNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "采购价格(万元)",
            prop: "softPrice",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "采购时间",
            prop: "softPurDate",
            width: "",
            formatter(row){
                return row.softPurDate || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "软件类型",
            prop: "softType",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "软件用途描述",
            prop: "softFunc",
            width: "",
            formatter(row){
                return row.softFunc || '未反馈'
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
                                deName: e.softNm,
                                typeTitle: "alreadyxx",
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'rj'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 已填报  - 二级 - 数据资产*/
export let alreadysjzc = {
    column: [
        {
            type: "text",
            align: "center",
            label: "数据资产名称",
            prop: "dataAssetsNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "数据资产概述",
            prop: "summary",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "数据资产估值",
            prop: "dataAssetVal",
            width: "150",
            formatter(row){
                return row.dataAssetVal || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "数据资产格式类型",
            prop: "sourceType",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "数据资产类型",
            prop: "dataAssetClass",
            width: "",
            formatter(row) {
                return ['数据库', '电子文件', '电子表格'][row.dataAssetClass - 1]||'未反馈'
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
                                deName: e.dataAssetsNm,
                                typeTitle: "alreadyxx",
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'dataAssets'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 已填报  - 二级 - 云资源*/
export let alreadyyzy = {
    column: [
        {
            type: "text",
            align: "center",
            label: "资源ID",
            prop: "ecsResourseId",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "云资源类型",
            prop: "type",
            width: "",
            formatter(row) {
                return ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][row.type - 1]||'未反馈'
            }

        },
        {
            type: "text",
            align: "center",
            label: "配置",
            prop: "configure",
            width: "",
            formatter(row){
                return row.configure || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "资源状态",
            prop: "resourseStatus",
            width: "",
            formatter(row){
                return row.resourseStatus || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "年租费(万元)",
            prop: "annualRent",
            width: "",
            formatter(row){
                return row.annualRent || 0
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
                                type: e.type,
                                deName: e.ecsResourseId,
                                typeTitle: "alreadyxx",
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][e.type - 1]
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 完备度 */
export let completeness = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "应填数据量",
            prop: "total",
            width: "",
            sortable: true,
        },
        {
            type: "text",
            align: "center",
            label: "实填数据量",
            prop: "stuff",
            width: "150",
            sortable: true,
            // formatter(row, column, columnIndex, rowIndex) {
            //     return row.total - row.empty
            // }
        },
        {
            type: "text",
            align: "center",
            label: "缺失数据量",
            prop: "empty",
            width: "",
            sortable: true,
        },
        {
            type: "text",
            align: "center",
            label: "完备度",
            prop: "percent",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if (row.total == 0) {
                    return 0
                } else {
                    return ((row.total - row.empty) / row.total * 100).toFixed(2) + '%'
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
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "completenessxx",
                                types: 1,
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                            }
                        })
                    }
                }
            ]
        }
    ]
}
let completenessCloumn = [
    {
        type: "text",
        align: "center",
        label: "应填数据量",
        prop: "total",
        width: "",
        sortable:true,
    },
    {
        type: "text",
        align: "center",
        label: "实填数据量",
        prop: "stuff",
        width: "150",
        sortable:true,
        // formatter(row, column, columnIndex, rowIndex) {
        //     return row.total - row.empty
        // },
    },
    {
        type: "text",
        align: "center",
        label: "缺失数据量",
        prop: "empty",
        width: "",
        sortable:true,
    },
    {
        type: "text",
        align: "center",
        label: "完备度",
        prop: "abnormalDataVolume",
        width: "",
        formatter(row, column, columnIndex, rowIndex) {
            if (row.total == 0) {
                return '0%'
            } else {
                return ((row.total - row.empty) / row.total * 100).toFixed(2) + '%'
            }

        },
    },
]
/* 完备度  - 二级 - 信息系统*/
export let completenessxx = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "name",
            width: ""
        },
        ...completenessCloumn,
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
                                deName: e.name,
                                typeTitle: 'completenessxx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 完备度  - 二级 - 机房*/
export let completenessjf = {
    column: [
        {
            type: "text",
            align: "center",
            label: "机房名称",
            prop: "name",
            width: ""
        },
        ...completenessCloumn,
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
                                deName: e.name,
                                typeTitle: 'completenessxx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'pcRoom'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 完备度  - 二级 - 硬件*/
export let completenessyj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "设备名称",
            prop: "name",
            width: ""
        },
        ...completenessCloumn,
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
                                deName: e.name,
                                typeTitle: 'completenessxx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'yj'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 完备度  - 二级 - 软件*/
export let completenessrj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "软件名称",
            prop: "name",
            width: ""
        },
        ...completenessCloumn,

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
                                deName: e.name,
                                typeTitle: 'completenessxx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'rj'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 完备度  - 二级 - 数据资产*/
export let completenesssjzc = {
    column: [
        {
            type: "text",
            align: "center",
            label: "数据资产名称",
            prop: "name",
            width: ""
        },
        ...completenessCloumn,

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
                                deName: e.name,
                                typeTitle: 'completenessxx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'dataAssets'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 完备度  - 二级 - 云资源*/
export let completenessyzy = {
    column: [
        {
            type: "text",
            align: "center",
            label: "资源ID",
            prop: "name",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "云资源类型",
            prop: "type",
            width: "",
            formatter(row) {
                return ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][row.type - 1]||'未反馈'
            }
        },
        ...completenessCloumn,

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
                                type: e.type,
                                deName: e.name,
                                typeTitle: 'completenessxx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][e.type - 1]
                            }
                        })
                    }
                }
            ]
        }
    ]
}



/* 合规度 */
export let compliance = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "实填数据量",
            prop: "total",
            width: "",
            sortable: true,
        },
        {
            type: "text",
            align: "center",
            label: "合规数据量",
            prop: "diff",
            width: "150",
            sortable: true,
            // formatter(row, column, columnIndex, rowIndex) {
            //     return row.total - row.empty
            // }
        },
        {
            type: "text",
            align: "center",
            label: "异常数据量",
            prop: "empty",
            width: "",
            sortable: true,
        },
        {
            type: "text",
            align: "center",
            label: "数据合规度",
            prop: "percent",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if (row.total == 0) {
                    return '0%'
                } else {
                    return (100 - (row.empty / row.total * 100)).toFixed(2) + '%'
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
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: 'compliancexx',
                                column: 0,
                                types: 1,
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                        })
                    }
                }
            ]
        }
    ]
}
let complianceCloumn = [
    {
        type: "text",
        align: "center",
        label: "实填数据量",
        prop: "realDataVolume",
        width: "",
        sortable:true
    },
    {
        type: "text",
        align: "center",
        label: "合规数据量",
        prop: "diff",
        width: "150",
        sortable:true,
        // formatter(row, column, columnIndex, rowIndex) {
        //     return row.realDataVolume - row.abnormalDataVolume
        // },
    },
    {
        type: "text",
        align: "center",
        label: "异常数据量",
        prop: "abnormalDataVolume",
        width: "",
        sortable:true
    },
    {
        type: "text",
        align: "center",
        label: "数据合规度",
        prop: "abnormalDataVolume",
        width: "",
        formatter(row, column, columnIndex, rowIndex) {
            if (row.realDataVolume == 0) {
                return 0
            } else {
                return (100 - (row.abnormalDataVolume / row.realDataVolume * 100)).toFixed(2) + '%'
            }

        },
    },
]
/* 合规度  - 二级 - 信息系统*/
export let compliancexx = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "name",
            width: ""
        },
        ...complianceCloumn,
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
                                deName: e.name,
                                typeTitle: 'compliancexx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 合规度  - 二级 - 机房*/
export let compliancejf = {
    column: [
        {
            type: "text",
            align: "center",
            label: "机房名称",
            prop: "name",
            width: ""
        },
        ...complianceCloumn,
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
                                deName: e.name,
                                typeTitle: 'compliancexx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'pcRoom'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 合规度  - 二级 - 硬件*/
export let complianceyj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "设备名称",
            prop: "name",
            width: ""
        },
        ...complianceCloumn,
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
                                deName: e.name,
                                typeTitle: 'compliancexx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'yj'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 合规度  - 二级 - 软件*/
export let compliancerj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "软件名称",
            prop: "name",
            width: ""
        },
        ...complianceCloumn,

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
                                deName: e.name,
                                typeTitle: 'compliancexx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'rj'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 合规度  - 二级 - 数据资产*/
export let compliancesjzc = {
    column: [
        {
            type: "text",
            align: "center",
            label: "数据资产名称",
            prop: "name",
            width: ""
        },
        ...complianceCloumn,

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
                                deName: e.name,
                                typeTitle: 'compliancexx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: 'dataAssets'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 合规度  - 二级 - 云资源*/
export let complianceyzy = {
    column: [
        {
            type: "text",
            align: "center",
            label: "资源ID",
            prop: "name",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "云资源类型",
            prop: "types",
            width: "",
            formatter(row) {
                return ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][row.types - 1] || '未反馈'
            }
        },
        ...complianceCloumn,

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
                                type: e.types,
                                deName: e.name,
                                typeTitle: 'compliancexx',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][e.types - 1] || '未反馈'
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统 -  建设情况分析  */
export let build = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "已建系统",
            prop: "built",
            width: "",
            sortable: true,
            formatter(row){
                return row.built || 0
            }

        },
        {
            type: "text",
            align: "center",
            label: "在建系统",
            prop: "underConstruction",
            width: "150",
            sortable: true,
            formatter(row){
                return row.underConstruction || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "拟建系统",
            prop: "proposedConstruction",
            width: "",
            sortable: true,
            formatter(row){
                return row.proposedConstruction||0
            }
        },
        {
            type: "text",
            align: "center",
            label: "未反馈系统",
            prop: "unknown",
            width: "",
            sortable: true,
            formatter(row){
                return row.unknown||0
            }
        },
        {
            type: "text",
            align: "center",
            label: "合计",
            prop: "total",
            width: "",
            sortable: true,
            formatter(row){
                return row.total||0
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
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "buildxz",
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统 - 建设情况分析  - 二级   */
export let buildxz = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "建设状态",
            prop: "sysStatus",
            width: "",
            formatter(row) {
                return ['拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'][row.sysStatus - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "覆盖范围",
            prop: "coverage",
            width: "",
            formatter(row) {
                return row.coverage || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "是否专网运行",
            prop: "bearerNetwork",
            width: "",
            formatter(row) {
                return ['否', '否', '是'][row.bearerNetwork - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "迁云状况",
            prop: "sfQyun",
            width: "",
            formatter(row) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省级数据共享交换平台情况",
            prop: "exchange",
            width: "",
            formatter(row) {
                return ['是', '否'][row.exchange - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省网上办事大厅情况",
            prop: "sfJrswsbsdt",
            width: "",
            formatter(row) {
                return ['是', '否', '试用中'][row.sfJrswsbsdt - 1] || '未反馈'
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
                                deName: e.sysNm,
                                typeTitle:'buildxz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "business"
                            }
                        })
                    }
                }
            ]
        }
    ]
}


/* 业务系统  - 迁云情况 */
export let migratedClouds = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "已迁云系统",
            prop: "alreadyMigrationCloud",
            width: "",
            sortable: true,
            formatter(row) {
                return row.alreadyMigrationCloud || 0
            }

        },
        {
            type: "text",
            align: "center",
            label: "计划迁云系统",
            prop: "planMigrationCloud",
            width: "",
            sortable: true,
            formatter(row) {
                return row.planMigrationCloud || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "不迁云系统",
            prop: "notMigrationCloud",
            width: "",
            sortable: true,
            formatter(row) {
                return row.notMigrationCloud || 0
            }

        },
        {
            type: "text",
            align: "center",
            label: "未反馈系统",
            prop: "unknown",
            width: "",
            sortable: true,
            formatter(row) {
                return row.unknown || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "合计",
            prop: "total",
            width: "",
            sortable: true,
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
                                sysOrgCode: e.sysOrgCode,
                                type: 'migratedCloudsxz',
                                // types: 1,
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统  - 迁云情况 - 二级*/
export let migratedCloudsxz = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "迁云状况",
            prop: "sfQyun",
            width: "",
            formatter(row) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "已迁云时间或计划迁云时间",
            prop: "qyunTime",
            width: "",
            formatter(row) {
                return row.qyunTime || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "覆盖范围",
            prop: "coverage",
            width: "",
            formatter(row) {
                return row.coverage || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "是否专网运行",
            prop: "bearerNetwork",
            width: "",
            formatter(row) {
                return ['否', '否', '是'][row.bearerNetwork - 1] || '未反馈'
            }
        },

        {
            type: "text",
            align: "center",
            label: "接入省级数据共享交换平台情况",
            prop: "exchange",
            width: "",
            formatter(row) {
                return ['是', '否'][row.exchange - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省网上办事大厅情况",
            prop: "sfJrswsbsdt",
            width: "",
            formatter(row) {
                return ['是', '否', '试用中'][row.sfJrswsbsdt - 1] || '未反馈'
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
                                deName: e.sysNm,
                                typeTitle:'migratedCloudsxz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "business"
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统  - 接入共享平台 */
export let share = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "已接入系统",
            prop: "alreadyAccessSharingPlatform",
            width: "",
            sortable: true,
            formatter(row) {
                return row.alreadyAccessSharingPlatform || 0
            }

        },
        {
            type: "text",
            align: "center",
            label: "计划接入系统",
            prop: "",
            width: "150",
            sortable: true,
            formatter(row) {
                return 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "不接入系统",
            prop: "notAccessSharingPlatform",
            width: "",
            sortable: true,
            formatter(row) {
                return row.notAccessSharingPlatform || 0
            }

        },
        {
            type: "text",
            align: "center",
            label: "未反馈系统",
            prop: "unknown",
            width: "",
            sortable: true,
            formatter(row) {
                return row.unknown || 0
            }

        },
        {
            type: "text",
            align: "center",
            label: "合计",
            prop: "total",
            width: "",
            sortable: true,

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
                                sysOrgCode: e.sysOrgCode,
                                type: 'sharexz',
                                // types: 1,
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统  - 接入共享平台 - 二级*/
export let sharexz = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "接入省级数据共享交换平台情况",
            prop: "exchange",
            width: "",
            formatter(row) {
                return ['是', '否'][row.exchange - 1] || '未反馈'
            }
        },

        {
            type: "text",
            align: "center",
            label: "已完成或计划接入共享交互平台时间",
            prop: "exchangeTime",
            width: "",
            formatter(row) {
                return row.exchangeTime || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "覆盖范围",
            prop: "coverage",
            width: "",
            formatter(row) {
                return row.coverage || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "是否专网运行",
            prop: "bearerNetwork",
            width: "",
            formatter(row) {
                return ['否', '否', '是'][row.bearerNetwork - 1] || '未反馈'
            }
        },

        {
            type: "text",
            align: "center",
            label: "迁云状况",
            prop: "sfQyun",
            width: "",
            formatter(row) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省网上办事大厅情况",
            prop: "sfJrswsbsdt",
            width: "",
            formatter(row) {
                return ['是', '否', '试用中'][row.sfJrswsbsdt - 1] || '未反馈'
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
                                deName: e.sysNm,
                                typeTitle:'sharexz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "business"
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统  - 接入网上办事大厅 */
export let officehall = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "已接入系统",
            prop: "alreadyAccessOnlineServiceHall",
            width: "",
            sortable: true,
            formatter(row) {
                return row.alreadyAccessOnlineServiceHall || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "计划接入系统",
            prop: "planAccessOnlineServiceHall",
            width: "",
            sortable: true,
            formatter(row) {
                return row.planAccessOnlineServiceHall || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "不接入系统",
            prop: "notAccessOnlineServiceHall",
            width: "",
            sortable: true,
            formatter(row) {
                return row.notAccessOnlineServiceHall || 0
            }

        },
        {
            type: "text",
            align: "center",
            label: "未反馈系统",
            prop: "unknown",
            width: "",
            sortable: true,
            formatter(row) {
                return row.unknown || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "合计",
            prop: "total",
            width: "",
            sortable: true,

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
                                sysOrgCode: e.sysOrgCode,
                                type: 'officehallxz',
                                // types: 1,
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统  - 接入网上办事大厅 - 二级*/
export let officehallxz = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "接入省网上办事大厅情况",
            prop: "sfJrswsbsdt",
            width: "",
            formatter(row) {
                return ['是', '否', '试用中'][row.sfJrswsbsdt - 1] || '未反馈'
            }
        },


        {
            type: "text",
            align: "center",
            label: "已完成或计划接入网上办事大厅时间",
            prop: "sfJrswsbsdtTime",
            width: "",
            formatter(row) {
                return row.sfJrswsbsdtTime || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "覆盖范围",
            prop: "coverage",
            width: "",
            formatter(row) {
                return row.coverage || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "是否专网运行",
            prop: "bearerNetwork",
            width: "",
            formatter(row) {
                return ['否', '否', '是'][row.bearerNetwork - 1] || '未反馈'
            }
        },

        {
            type: "text",
            align: "center",
            label: "迁云状况",
            prop: "sfQyun",
            width: "",
            formatter(row) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省级数据共享交换平台情况",
            prop: "exchange",
            width: "",
            formatter(row) {
                return ['是', '否'][row.exchange - 1] || '未反馈'
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
                                deName: e.sysNm,
                                typeTitle:'officehallxz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "business"
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统  - 专网分析 */
export let specialnetwork = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "电子政务外网",
            prop: "governmentExtranetCount",
            width: "",
            sortable:true,
            formatter(row) {
                return row.governmentExtranetCount || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "互联网",
            prop: "internetCount",
            width: "",
            sortable:true,
            formatter(row) {
                return row.internetCount || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "其他专网",
            prop: "specialNetCount",
            width: "",
            sortable:true,
            formatter(row) {
                return row.specialNetCount || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "未反馈",
            prop: "unknown",
            width: "",
            sortable:true,
            formatter(row) {
                return row.unknown || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "合计",
            prop: "total",
            width: "",
            sortable:true,
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
                                sysOrgCode: e.sysOrgCode,
                                type: 'specialnetworkxz',
                                // types: 1,
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                        })
                    }
                }
            ]
        }
    ]
}
/* 业务系统  - 专网分析 - 二级*/
export let specialnetworkxz = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "是否专网运行",
            prop: "bearerNetwork",
            width: "",
            formatter(row) {
                return ['否', '否', '是'][row.bearerNetwork - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "网络名称",
            prop: "bearerNetwork",
            width: "",
            formatter(row) {
                return ['政务外网', '互联网', '其他专网'][row.bearerNetwork - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "覆盖范围",
            prop: "coverage",
            width: "",
            formatter(row) {
                return row.coverage || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省网上办事大厅情况",
            prop: "sfJrswsbsdt",
            width: "",
            formatter(row) {
                return ['是', '否', '试用中'][row.sfJrswsbsdt - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "迁云状况",
            prop: "sfQyun",
            width: "",
            formatter(row) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省级数据共享交换平台情况",
            prop: "exchange",
            width: "",
            formatter(row) {
                return ['是', '否'][row.exchange - 1] || '未反馈'
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
                                deName: e.sysNm,
                                typeTitle:'specialnetworkxz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "business"
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 资金  - 资金来源分析 */
export let sourceanalysis = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "财政拨款",
            prop: "financialAppropriation",
            width: "",
            sortable: true,
            formatter(row) {
                if (row.financialAppropriation == row.financialAppropriationComparison) {
                    return row.financialAppropriation || '0'
                } else {
                    return '<span class="color-red">' + row.financialAppropriation + '</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "自筹项目",
            prop: "raiseIndependentlyProject",
            width: "",
            sortable: true,
            formatter(row) {
                if (row.raiseIndependentlyProject == row.raiseIndependentlyProjectComparison) {
                    return row.raiseIndependentlyProject || '0'
                } else {
                    return '<span class="color-red">' + row.raiseIndependentlyProject + '</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "BT项目",
            prop: "btProject",
            width: "",
            sortable: true,
            formatter(row) {
                if (row.btProject == row.btProjectComparison) {
                    return row.btProject || '0'
                } else {
                    return '<span class="color-red">' + row.btProject + '</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "其他项目",
            prop: "otherProject",
            width: "",
            sortable: true,
            formatter(row) {
                if (row.otherProject == row.otherProjectComparison) {
                    return row.otherProject || '0'
                } else {
                    return '<span class="color-red">' + row.otherProject + '</span>'
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
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        window.sessionStorage.setItem('sourceanalysis', JSON.stringify({
                            i:0,
                            tabId:1
                          }))
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: 'sourceanalysisxx',
                                types: 5,
                                bmName: e.orgName,
                                year:'',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                        })
                    }
                }
            ]
        }
    ]
}
/* 资金  - 资金来源分析 - 二级 - 信息*/
export let sourceanalysisxx = {
    column: [
        {
            type: "text",
            align: "center",
            label: "信息系统名称",
            prop: "orgName",
            width: "",

        },
        {
            type: "text",
            align: "center",
            label: "建设费用",
            prop: "operationMaintenanceCost",
            width: "",
            formatter(row) {
                if(row.operationMaintenanceCost == row.operationMaintenanceCostComparison){
                    return row.operationMaintenanceCost || '0'
                }else{
                    return '<span class="color-red">' + row.operationMaintenanceCostComparison+'</span>'
                }
                
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设资金来源",
            prop: "sourceFundsConstructionCost",
            width: "",
            formatter(row) {
                return ['财政拨款','自筹','BT项目','其他'][row.sourceFundsConstructionCost-1] ||'未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用",
            prop: "constructionCost",
            width: "150",
            formatter(row) {
                if(row.constructionCost == row.constructionCostComparison){
                    return row.constructionCost || '0'
                }else{
                    return '<span class="color-red">' + row.constructionCostComparison +'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维资金来源",
            prop: "sourceFundsOperationCost",
            width: "",
            formatter(row) {
                return ['财政拨款','自筹','BT项目','其他'][row.sourceFundsOperationCost-1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人",
            prop: "linkman",
            width: "",
            formatter(row){
                return row.linkman || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人方式",
            prop: "linkType",
            width: "",
            formatter(row){
                return row.linkType || '未反馈'
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
                                deName: e.orgName,
                                typeTitle:'sourceanalysisxz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "business"
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 资金  - 资金来源分析 - 二级 - 机房*/
export let sourceanalysisjf = {
    column: [
        {
            type: "text",
            align: "center",
            label: "机房名称",
            prop: "orgName",
            width: "",

        },
        {
            type: "text",
            align: "center",
            label: "建设费用",
            prop: "operationMaintenanceCost",
            width: "",
            formatter(row) {
                if(row.operationMaintenanceCost==row.operationMaintenanceCostComparison){
                    return row.operationMaintenanceCost || '0'
                }else{
                    return '<span class="color-red">' + row.operationMaintenanceCostComparison +'</span>'
                } 
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设资金来源",
            prop: "operationSourceFunds",
            width: "",
            formatter(row) {
                return row.operationSourceFunds || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用",
            prop: "constructionCost",
            width: "150",
            formatter(row) {
                if(row.constructionCost==row.constructionCostComparison){
                    return row.constructionCost || '0'
                }else{
                    return '<span class="color-red">'+row.constructionCost +'</span>'
                }
                
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维资金来源",
            prop: "buildSourceFunds",
            width: "",
            formatter(row) {
                return row.buildSourceFunds || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人",
            prop: "linkman",
            width: "",
            formatter(row){
                return row.linkman || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人方式",
            prop: "linkType",
            width: "",
            formatter(row){
                return row.linkType || '未反馈'
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
                                deName: e.orgName,
                                typeTitle:'sourceanalysisxz',
                                backQuery:JSON.stringify(_this.$route.query)
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
}
/* 资金  - 资金来源分析 - 二级 - 硬件*/
export let sourceanalysisyj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "设备名称",
            prop: "orgName",
            width: "",

        },
        {
            type: "text",
            align: "center",
            label: "建设费用",
            prop: "operationMaintenanceCost",
            width: "",
            formatter(row) {
                if(row.operationMaintenanceCost==row.operationMaintenanceCostComparison){
                    return row.operationMaintenanceCost || '0'
                }else{
                    return '<span class="color-red">' + row.operationMaintenanceCostComparison +'</span>'
                } 
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设资金来源",
            prop: "operationSourceFunds",
            width: "",
            formatter(row) {
                return row.operationSourceFunds || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用",
            prop: "constructionCost",
            width: "150",
            formatter(row) {
                if(row.constructionCost==row.constructionCostComparison){
                    return row.constructionCost || '0'
                }else{
                    return '<span class="color-red">'+row.constructionCost +'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维资金来源",
            prop: "buildSourceFunds",
            width: "",
            formatter(row) {
                return row.buildSourceFunds || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人",
            prop: "linkman",
            width: "",
            formatter(row){
                return row.linkman || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人方式",
            prop: "linkType",
            width: "",
            formatter(row){
                return row.linkType || '未反馈'
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
                                deName: e.sysNm,
                                typeTitle:'sourceanalysisxz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "yj"
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 资金  - 资金来源分析 - 二级 - 软件*/
export let sourceanalysisrj = {
    column: [
        {
            type: "text",
            align: "center",
            label: "软件名称",
            prop: "orgName",
            width: "",

        },
        {
            type: "text",
            align: "center",
            label: "建设费用",
            prop: "operationMaintenanceCost",
            width: "",
            formatter(row) {
                if(row.operationMaintenanceCost == row.operationMaintenanceCostComparison){
                    return row.operationMaintenanceCost || '0'
                }else{
                    return '<span class="color-red">' + row.operationMaintenanceCostComparison+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设资金来源",
            prop: "operationSourceFunds",
            width: "",
            formatter(row) {
                return row.operationSourceFunds || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用",
            prop: "constructionCost",
            width: "150",
            formatter(row) {
                if(row.constructionCost==row.constructionCostComparison){
                    return row.constructionCost || '0'
                }else{
                    return '<span class="color-red">' + row.constructionCostComparison +'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维资金来源",
            prop: "buildSourceFunds",
            width: "",
            formatter(row) {
                return row.buildSourceFunds || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人",
            prop: "linkman",
            width: "",
            formatter(row){
                return row.linkman || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人方式",
            prop: "linkType",
            width: "",
            formatter(row){
                return row.linkType || '未反馈'
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
                                deName: e.orgName,
                                typeTitle:'sourceanalysisxz',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: "rj"
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 资金  - 资金来源分析 - 二级 - 云资源*/
export let sourceanalysisyzy = {
    column: [
        {
            type: "text",
            align: "center",
            label: "资源ID",
            prop: "resourceId",
            width: "",

        },
        {
            type: "text",
            align: "center",
            label: "云资源类型",
            prop: "cloudResourceTypes",
            width: "",
            formatter(row) {
                return ['-','-','-','-','-','ECS','OSS','RDS','SLB'][row.cloudResourceTypes-1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "租赁费用",
            prop: "rentalCost",
            width: "",
            formatter(row) {
                if(row.rentalCost == row.rentalCostComparison){
                    return row.rentalCost || 0
                }else{
                    return '<span class="color-red">' + row.rentalCostComparison+'</span>'
                }
                
            }
        },
        {
            type: "text",
            align: "center",
            label: "资金来源",
            prop: "sourceFunds",
            width: "",
            formatter(row) {
                return row.sourceFunds || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人",
            prop: "linkman",
            width: "",
            formatter(row) {
                return row.linkman ||'未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "联系人方式",
            prop: "linkType",
            width: "",
            formatter(row) {
                return row.linkType ||'未反馈'
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
                                type: e.cloudResourceTypes,
                                deName: e.resourceId,
                                typeTitle:'sourceanalysisyzy',
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][e.cloudResourceTypes - 1]
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 云资源 -  */
export let cloudResources = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgName",
            width: "",

        },
        {
            type: "text",
            align: "center",
            label: "CPU数量（核）",
            prop: "cpu",
            width: "",
            sortable: true,
            formatter(row) {
                return row.cpu || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "内存资源（GB）",
            prop: "ram",
            width: "",
            sortable: true,
            formatter(row) {
                return row.ram || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "硬盘资源（T）",
            prop: "rom",
            width: "",
            sortable: true,
            formatter(row) {
                return row.rom || 0
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
                    onClick(_this, self, e) {
                        self.nomal = !self.nomal;
                        _this.isShow = !_this.isShow;
                        _this.$router.push({
                            name: "specialTablexz",
                            query: {
                                sysOrgCode: e.sysOrgCode,
                                type: "cloudResourcesxz",
                                column: 0,
                                // types: 1, // 2018-12-13   发现types:1 为不应该向后台传入的值（beforeURL存在但是不像后台传参））
                                bmName: e.orgName,
                                backQuery:JSON.stringify(_this.$route.query)
                                
                            }
                        })
                    }
                }
            ]
        }
    ]
}
/* 云资源 - 二级 */
export let cloudResourcesxz = {
    column: [
        {
            type: "text",
            align: "center",
            label: "资源ID",
            prop: "resourceId",
            width: "",
            formatter(row){
                return row.resourceId || '未反馈'
            }

        },
        {
            type: "text",
            align: "center",
            label: "云资源类型",
            prop: "type",
            width: "",
            formatter(row) {
                return ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][row.type - 1]||'未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "CPU",
            prop: "cpu",
            width: "",
            formatter(row) {
                return row.cpu || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "内存资源",
            prop: "ram",
            width: "",
            formatter(row) {
                return row.ram || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "硬盘资源",
            prop: "rom",
            width: "",
            formatter(row) {
                return row.rom || 0
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
                                type: e.type,
                                deName: e.resourceId,
                                typeTitle: "cloudResourcesxz",
                                backQuery:JSON.stringify(_this.$route.query)
                            },
                            params: {
                                url: ['-', '-', '-', '-', '-', 'ECS', 'OSS', 'RDS', 'SLB'][e.type - 1]
                            }
                        })
                    }
                }
            ]
        }
    ]
}
