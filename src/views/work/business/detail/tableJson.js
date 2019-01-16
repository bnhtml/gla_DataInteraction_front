import router from '../../../../router'
import { Collapse } from 'element-ui';

export let protConditionTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "省级部署系统数量",
            prop: "sjbs",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "市州部署系统数量",
            prop: "szbs",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "省、市部署系统数量",
            prop: "sjbsSzbs",
            width: "",
        },
        {
            type: "text",
            align: "center",
            label: "区县部署系统数量",
            prop: "xjbs",
            width: ""
        },
         {
            type: "text",
            align: "center",
            label: "省、县部署系统数量",
            prop: "sjbsXjbs",
            width: "",
        },
        {
            type: "text",
            align: "center",
            label: "市、县部署系统数量",
            prop: "szbsXjbs",
            width: "",
        },
        {
            type: "text",
            align: "center",
            label: "省、市、县部署系统数量",
            prop: "sjbsSzbsXjbs",
            width: "",
            
        }, 
        {
            type: "text",
            align: "center",
            label: "未反馈",
            prop: "unknownFb",
            width: ""
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: "protConditionTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let protConditionTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "系统分布情况",
            prop: "sysFb",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['省级部署', '市州部署', '省级部署，市州部署', '区(县)部署', '省级部署，区(县)部署', '市州部署，区(县)部署', '省级部署，市州部署，区(县)部署'][row.sysFb - 1] || '未反馈'
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
                    onClick(_this, self,e) {
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let jbieTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "省级部署投入资金(万元)",
            prop: "sjbs_trje",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.sjbs_trje==row.sjbs_trjeComparison){
                    return row.sjbs_trje || 0
                }else{
                    return '<span class="color-red">'+row.sjbs_trje+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "市州部署投入资金(万元)",
            prop: "szbs_trje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.szbs_trje==row.szbs_trjeComparison){
                    return row.szbs_trje || 0
                }else{
                    return '<span class="color-red">'+row.szbs_trje+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "区(县)部署投入资金(万元)",
            prop: "qxbs_trje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.qxbs_trje==row.qxbs_trjeComparison){
                    return row.qxbs_trje || 0
                }else{
                    return '<span class="color-red">'+row.qxbs_trje+'</span>'
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: "jbieTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let jbieTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "省级部署投入资金(万元)",
            prop: "sjbsTrje",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.sjbsTrje==row.sjbsTrjeComparison){
                    return row.sjbsTrje || 0
                }else{
                    return '<span class="color-red">' + row.sjbsTrjeComparison+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "市州部署投入资金(万元)",
            prop: "szbsTrje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.szbsTrje==row.szbsTrjeComparison){
                    return row.szbsTrje || 0
                }else{
                    return '<span class="color-red">' + row.szbsTrjeComparison+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "区(县)部署投入资金(万元)",
            prop: "qxbsTrje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.qxbsTrje==row.qxbsTrjeComparison){
                    return row.qxbsTrje || 0
                }else{
                    return '<span class="color-red">' + row.qxbsTrjeComparison+'</span>'
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
                    onClick(_this, self,e) {
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sysStatusTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "拟建系统数量",
            prop: "nijian",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "已建系统数量",
            prop: "yijian",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "在建系统数量",
            prop: "zaijian",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "国家派发系统数量",
            prop: "guojiapaifa",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "省级派发系统数量",
            prop: "shengjipaifa",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "上级派发系统数量",
            prop: "shangjipaifa",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "未反馈",
            prop: "unknownSysStatus",
            width: "65"
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: "sysStatusTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sysStatusTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "系统建设状态",
            prop: "sysStatus",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'][row.sysStatus - 1] || '未反馈'
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
                    onClick(_this, self,e) {
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let bearerNetworkTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "互联网系统数量",
            prop: "hlw",
            width: ""
        },

        {
            type: "text",
            align: "center",
            label: "政务外网系统数量",
            prop: "zwww",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "专网系统数量",
            prop: "qtzw",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "未反馈",
            prop: "unknownNet",
            width: ""
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
                        _this.$router.push({
                            name: 'tableDetail',
                            query: {
                                typeUrl: "bearerNetworkTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let bearerNetworkTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: "",
            
            
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: "",
        },
        {
            type: "text",
            align: "center",
            label: "承载网络",
            prop: "bearerNetwork",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['政务外网', '互联网', '其他专网'][row.bearerNetwork - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "域名或IP地址",
            prop: "bearerNetwork",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return [row.outIpAddress, row.wwwIpAddress, row.lanIpAddress][row.bearerNetwork - 1] || '未反馈'
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
                    onClick(_this, self,e) {
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let optModeTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "公有云平台部署系统数量",
            prop: "publiccloud",
            width: "150"
        },
        {
            type: "text",
            align: "center",
            label: "私有云平台部署系统数量",
            prop: "privatecloud",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "传统方式部署系统数量",
            prop: "nocloud",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "公有云平台、私有云平台部署系统数量",
            prop: "publiccloudPrivatecloud",
            width: "",
        }, {
            type: "text",
            align: "center",
            label: "公有云平台、传统方式部署系统数量",
            prop: "publiccloudNocloud",
            width: "",
        },
        {
            type: "text",
            align: "center",
            label: "私有云平台、传统方式部署系统数量",
            prop: "privatecloudNocloud",
            width: "",
        },{
            type: "text",
            align: "center",
            label: "公有云平台、私有云平台、传统方式部署系统数量",
            prop: "publiccloudPrivatecloudNocloud",
            width: "",
        }, 
        {
            type: "text",
            align: "center",
            label: "未反馈",
            prop: "unknownCloud",
            width: ""
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
                        _this.$router.push({
                            name: 'tableDetail',
                            query: {
                                typeUrl: "optModeTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let optModeTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部署方式",
            prop: "optMode",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['公有云平台', '私有云平台', '公有云平台、私有云平台', '传统方式','公有云平台、传统方式','私有云平台、传统方式','公有云平台、私有云平台、传统方式'][row.optMode - 1] || '未反馈'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sfQgtzTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "全国统建系统数量",
            prop: "qgtj",
            width: "150"
        },
        {
            type: "text",
            align: "center",
            label: "非全国统建系统数量",
            prop: "noqgtj",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "未反馈",
            prop: "unknownQgtj",
            width: ""
        },
        {
            type: "handle",
            align: "center",
            label: "操作",
            width: "",
            list: [
                {
                    label: "数据钻取",
                    onClick: (_this, self, e) => {
                        _this.$router.push({
                            name: 'tableDetail',
                            query: {
                                typeUrl: "sfQgtzTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sfQgtzTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: "150"
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },

        {
            type: "text",
            align: "center",
            label: "是否全国统建系统",
            prop: "sfQgtz",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['是', '否', '试用中'][row.sfQgtz - 1] || '未反馈'
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
                    onClick(_this, self,e) {
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sfUseTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "建设费用(万元)",
            prop: "constructionCost",
            width: "",
            formatter(row){
                if(row.constructionCost == row.constructionCostComparison){
                    return row.constructionCost
                }else{
                    return '<span class="color-red">'+row.constructionCost+'</span>'
                }
            }
            
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "operationCost",
            width: "",
            formatter(row){
                if(row.operationCost == row.operationCostComparison){
                    return row.operationCost
                }else{
                    return '<span class="color-red">'+row.operationCost+'</span>'
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: "sfUseTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sfUseTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "建设费用(万元)",
            prop: "qxbsTrje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.sjbsTrje==row.sjbsTrjeComparison&&row.szbsTrje==row.szbsTrjeComparison&&row.qxbsTrje==row.qxbsTrjeComparison){
                    return (row.sjbsTrje + row.szbsTrje + row.qxbsTrje) || 0
                }else{
                    return '<span class="color-red">'+((row.sjbsTrje + row.szbsTrje + row.qxbsTrje) || 0)+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "totalMtExp",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.totalMtExp==row.totalMtExpComparison){
                    return row.totalMtExp || 0
                }else{
                    return '<span class="color-red">' + row.totalMtExpComparison+'</span>'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let systemQueryJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "全国统建系统数量",
            prop: "qgtj",
            width: "150"
        },
        {
            type: "text",
            align: "center",
            label: "非全国统建系统数量",
            prop: "noqgtj",
            width: ""
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
                        console.log(_this,'注意这个地方好好检查')
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                // sysOrgCode: e.sys_org_code,
                                // typeUrl: "sfUseTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sfQyunTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "已迁云系统数量",
            prop: "qyun",
            width: "150"
        },
        {
            type: "text",
            align: "center",
            label: "计划迁云系统数量",
            prop: "jhqyun",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "不迁云系统数量",
            prop: "noqyun",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "未反馈",
            prop: "unknownQyun",
            width: ""
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: "sfQyunTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sfQyunTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "迁云情况",
            prop: "sfQyun",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] || '未反馈'
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
                    onClick(_this, self,e) {
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let systemSafetyJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "安全等级定级",
            prop: "safeLev",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['一级', '二级', '三级', '四级', '五级', '未定级'][row.safeLev - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "信息系统分级保护定级",
            prop: "protCondition",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['未定秘', '秘密', '机密', '绝密'][row.protCondition - 1] ||  '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "数据安全要求",
            prop: "sjaqYq",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['涉密', '敏感', '不宜公开', '依申请公开', '可公开'][row.sjaqYq - 1] || '未反馈'
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
                    onClick(_this, self,e) {
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                        // self.nomal = !self.nomal;
                        // tablePage.isShow = !tablePage.isShow;
                    }
                }
            ]
        }
    ]
};

export let sourceTableJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "财政拨款(万元)",
            prop: "czbk",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.czbk==row.czbkComparison){
                    return row.czbk || 0
                }else{
                    return '<span class="color-red">'+row.czbk+'</span>'
                }  
            }
        },
        {
            type: "text",
            align: "center",
            label: "自筹(万元)",
            prop: "zc",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.zc==row.zcComparison){
                    return row.zc || 0
                }else{
                    return '<span class="color-red">'+row.zc+'</span>'
                }  
            }
        },
        {
            type: "text",
            align: "center",
            label: "BT项目(万元)",
            prop: "btxm",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.btxm==row.btxmComparison){
                    return row.btxm || 0
                }else{
                    return '<span class="color-red">'+row.btxm+'</span>'
                }  
            }
        },
        {
            type: "text",
            align: "center",
            label: "其他金额(万元)",
            prop: "qt",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.qt==row.qtComparison){
                    return row.qt || 0
                }else{
                    return '<span class="color-red">'+row.qt+'</span>'
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: "sourceTableSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let sourceTableJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        // {
        //     type: "text",
        //     align: "center",
        //     label: "资金来源",
        //     prop: "funingSource",
        //     width: "",
        //     formatter(row, column, columnIndex, rowIndex) {
        //         return ["财政拨款", '自筹', 'BT项目', '其他'][(row.funingSource || row.mtcFeeSource) - 1]||  '未反馈'
        //     }
        // },
        {
            type: "text",
            align: "center",
            label: "建设费用(万元)",
            prop: "zc",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.sjbsTrje==row.sjbsTrjeComparison&&row.szbsTrje==row.szbsTrjeComparison&&row.qxbsTrje==row.qxbsTrjeComparison){
                    return (row.sjbsTrje + row.szbsTrje + row.qxbsTrje) || 0
                }else{
                    return '<span class="color-red">'+((row.sjbsTrje + row.szbsTrje + row.qxbsTrje) || 0)+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设费用来源",
            prop: "funingSource",
            width: "",
            formatter(row){
                return ['财政拨款','自筹','BT项目','其他'][row.funingSource-1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "totalMtExp",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.totalMtExp==row.totalMtExpComparison){
                    return row.totalMtExp || 0
                }else{
                    return '<span class="color-red">' + row.totalMtExpComparison+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用来源",
            prop: "mtcFeeSource",
            width: "",
            formatter(row){
                return ['财政拨款','自筹','BT项目','其他'][row.mtcFeeSource-1]|| '未反馈'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
//(运维还是建设)
// constructionCostJson
export let constructionCostJson = {
    column: [

        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "constructionCost",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.constructionCost==row.constructionCostComparison){
                    return row.constructionCost || 0
                }else{
                    return '<span class="color-red">'+row.constructionCost+'</span>'
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: "constructionCostSon",
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
// constructionCostSon
export let constructionCostJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "totalMtExp",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.totalMtExp==row.totalMtExpComparison){
                    return row.totalMtExp || 0
                }else{
                    return '<span class="color-red">' + row.totalMtExpComparison+'</span>'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
// sysStatusJsonSon
export let setProJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "建设费用(万元)",
            prop: "sjbsTrje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.sjbsTrje==row.sjbsTrjeComparison&&row.szbsTrje==row.szbsTrjeComparison&&row.qxbsTrje==row.qxbsTrjeComparison){
                    return (row.sjbsTrje + row.szbsTrje + row.qxbsTrje) || 0
                }else{
                    return '<span class="color-red">'+((row.sjbsTrje + row.szbsTrje + row.qxbsTrje) || 0)+'</span>'
                }
            }
        },
        {
            type: "text",
            align: "center",
            label: "立项依据",
            prop: "sysStatus",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'][row.sysStatus - 1] || '未反馈'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};

export let leaderCockpitJsonSon = {
    column: [

        {
            type: "text",
            align: "center",
            label: "部门单位名称",
            prop: "orgNm",
            width: ""
        },
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
            formatter(row, column, columnIndex, rowIndex) {
                return ['是', '否'][row.exchange - 1] ||  '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "接入省网上办事大厅情况",
            prop: "sfJrswsbsdt",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['是', '否', '使用中'][row.sfJrswsbsdt - 1] ||  '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "迁云情况",
            prop: "sfQyun",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] ||  '未反馈'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};

export let costStatusJson = {
    column: [

        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "org_nm",
            width: ""
        },

        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "非组织",
            prop: "feizuzhi",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return row.feizuzhi || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "组织",
            prop: "zuzhi",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return row.zuzhi || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "内部公众",
            prop: "neibu",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return row.neibu || 0
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
                        _this.$router.push({
                            name: "tableDetail",
                            query: {
                                typeUrl: 'costStatusSon',
                                orgName:e.org_nm,
                                afterTitle:_this.$route.query.tableTitle,
                                backTypeUrl:_this.$route.query.typeUrl,
                                sysOrgCode: e.sys_org_code,
                                title:_this.$route.query.title,
                                backPathName:_this.$route.query.backPathName,
                                type:_this.$route.query.type,
                                radioBtn:_this.$route.query.radioBtn,
                                isCityState:_this.$route.query.isCityState,
                                mapQuery:_this.$route.query.mapQuery,
                                areaids:_this.$route.query.areaids,
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let costStatusJsonSon = {
    column: [

        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },

        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "立项依据",
            prop: "sysStatus",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'][row.sysStatus - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设费用(万元)",
            prop: "sjbsTrje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return row.sjbsTrje + row.szbsTrje + row.qxbsTrje || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "totalMtExp",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return row.totalMtExp || 0
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};

export let sfUseGroupTableSon = {
    column: [

        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },

        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "立项依据",
            prop: "sysStatus",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'][row.sysStatus - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设费用(万元)",
            prop: "sjbsTrje",
            width: "",//totalMtExp Comparison
            formatter(row, column, columnIndex, rowIndex) {
                if(row.sjbsTrje==row.sjbsTrjeComparison&&row.szbsTrje==row.szbsTrjeComparison&&row.qxbsTrje&&row.qxbsTrjeComparison){
                    return row.sjbsTrje + row.szbsTrje + row.qxbsTrje || 0
                }else{
                    return '<span class="color-red">'+(row.sjbsTrje + row.szbsTrje + row.qxbsTrje)+'</span>'
                }
                
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "totalMtExp",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                if(row.totalMtExp==row.totalMtExpComparison){
                    return row.totalMtExp || 0
                }else{
                    return '<span class="color-red">' + (row.totalMtExpComparison)+'</span>'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};

export let sfUseGroupJsonSon = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },

        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "是否在用",
            prop: "sfUse",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['是', '否', '试用中'][row.sfUse - 1] ||  '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "建设费用(万元)",
            prop: "sjbsTrje",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return row.sjbsTrje + row.szbsTrje + row.qxbsTrje || 0
            }
        },
        {
            type: "text",
            align: "center",
            label: "运维费用(万元)",
            prop: "totalMtExp",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return row.totalMtExp || 0
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};
export let systemQuantitJson = {
    column: [
        {
            type: "text",
            align: "center",
            label: "系统名称",
            prop: "sysNm",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "部门名称",
            prop: "orgNm",
            width: ""
        },

        {
            type: "text",
            align: "center",
            label: "所属地区",
            prop: "areaname",
            width: ""
        },
        {
            type: "text",
            align: "center",
            label: "迁云情况",
            prop: "sfQyun",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['已迁云', '计划迁云', '不迁云'][row.sfQyun - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "系统建设状态",
            prop: "sysStatus",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['拟建', '在建', '已建', '国家派发', '省级派发', '上级派发'][row.sysStatus - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "承载网络",
            prop: "bearerNetwork",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['政务外网', '互联网', '其他专网'][row.bearerNetwork - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "安全等级定级",
            prop: "safeLev",
            width: "150",
            formatter(row, column, columnIndex, rowIndex) {
                return ['一级', '二级', '三级', '四级', '五级', '未定级'][row.safeLev - 1] || '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "信息系统分级保护定级",
            prop: "protCondition",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['未定秘', '秘密', '机密', '绝密'][row.protCondition - 1] ||  '未反馈'
            }
        },
        {
            type: "text",
            align: "center",
            label: "数据安全要求",
            prop: "sjaqYq",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
                return ['涉密', '敏感', '不宜公开', '依申请公开', '可公开'][row.sjaqYq - 1] || '未反馈'
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
                        _this.$router.push({
                            name: 'businessdefault',
                            query: {
                                lastTitleName:e.sysNm,
                                id: e.id,
                                type:_this.$route.query.type,
                                ..._this.$route.query
                            },
                            params:{
                                url:'business'
                            }
                        })
                    }
                }
            ]
        }
    ]
};