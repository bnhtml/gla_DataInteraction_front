// 业务系统分布情况
export let protConditionSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
// 业务系统分布情况
export let protConditionSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    },  {
        type: "input-select", //选择器
        label: "系统分布",
        name: "sysFb",
        value: "",
        options:[{name:'未反馈',value:0},{name:'省级部署',value:1},{name:'市州部署',value:2},{name:'省级部署，市州部署',value:3},{name:'区(县)部署',value:4},{name:'省级部署，区(县)部署',value:5},{name:'市州部署，区(县)部署',value:6},{name:'省级部署，市州部署，区(县)部署',value:7},]
    }, /* {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
//  按系统分布情况分析 
export let jbieSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
export let jbieSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    }, /* {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
// 业务系统建设状态分析 
export let sysStatusSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, 
    ]
};
// 业务系统建设状态分析  
export let sysStatusSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    }, {
        type: "input-select", //选择器
        label: "系统建设状态",
        name: "sysStatus",
        value: "",
        options: [{name:'未反馈',value:0},{name:'拟建',value:1},{name:'在建',value:2},{name:'已建',value:3},{name:'国家派发',value:4},{name:'省级派发',value:5},{name:'上级派发',value:6},]
    },/* {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
// 业务系统承载网络分析 一级
export let bearerNetworkSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
// 业务系统承载网络分析 二级
export let bearerNetworkSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    },{
        type: "input-select", //选择器
        label: "承载网络",
        name: "bearerNetwork",
        value: "",
        options: [{name:'未反馈',value:0},{name:'政务外网',value:1},{name:'互联网',value:2},{name:'其他专网',value:3}]
    },  /* {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
// 信息系统部署方式统计
export let optModeSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
// 信息系统部署方式统计
export let optModeSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    },{
        type: "input-select", //选择器
        label: "部署方式",
        name: "optMode",
        value: "",
        options: [{name:'未反馈',value:0},{name:'公有云平台',value:1},{name:'私有云平台',value:2},{name:'公有云平台、私有云平台',value:3},{name:'传统方式',value:4},{name:'公有云平台、传统方式',value:5},{name:'私有云平台、传统方式',value:6},{name:'公有云平台、私有云平台、传统方式',value:7},]
    },  /*123 {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
//统建系统分析
export let sfQgtzSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
export let sfQgtzSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    },{
        type: "input-select", //选择器
        label: "是否全国统建系统",
        name: "sfQgtz",
        value: "",
        options: [{name:'未反馈',value:0},{name:'是',value:1},{name:'否',value:2},{name:'试用中',value:3}]
    }, /* {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
// 资金投入
export let sfUseSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    // {
    //     type: "input-select", //选择器
    //     label: "费用类型",
    //     name: "areaids",
    //     value: "请选择",
    //     options: [{
    //         name: "财政拨款",
    //         value: "1"
    //     },
    //     {
    //         name: "自筹",
    //         value: "2"
    //     },
    //     {
    //         name: "BT项目",
    //         value: "3"
    //     },
    //     {
    //         name: "其他",
    //         value: "4"
    //     }
    //     ]
    // },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: [{
            name: "毕节市",
            value: "option2"
        },
        {
            name: "铜仁市",
            value: "铜仁市"
        }
        ]
    },
    ]
};
export let sfUseSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    }, /* {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
export let systemQuerySearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "org_nm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
//迁云状况分析
export let sfQyunSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    { 
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
//  业务系统迁云情况分析 
export let sfQyunSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    {
        type: "input-select", //选择器
        label: "迁云情况",
        name: "sfQyun",
        value: "",
        options: [{name:'未反馈',value:0},{name:'已迁云',value:1},{name:'计划迁云',value:2},{name:'不迁云',value:3}]
    }, /*  {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
// 业务系统安全情况分析
export let systemSafetySearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    
    {
        type: "input-select", //选择器
        label: "安全等级定级",
        name: "safeLev",
        value: "",
        options: [{name:'未反馈',value:0},{name:'一级',value:1},{name:'二级',value:2},{name:'三级',value:3},{name:'四级',value:4},{name:'五级',value:5},{name:'未定级',value:6},]
    }, {
        type: "input-select", //选择器
        label: "信息系统分级保护定级",
        name: "protCondition",
        value: "",
        options: [{name:'未反馈',value:0},{name:'未定秘',value:1},{name:'秘密',value:2},{name:'机密',value:3},{name:'绝密',value:4},]
    }, {
        type: "input-select", //选择器
        label: "数据安全要求",
        name: "sjaqYq",
        value: "",
        options: [{name:'未反馈',value:0},{name:'涉密',value:1},{name:'敏感',value:2},{name:'不宜公开',value:3},{name:'依申请公开',value:4},{name:'可公开',value:5},]
    }, {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
// 信息系统资金来源分析
export let sourceSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
     {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, 
    ]
};
export let sourceSearchSon = {
    list: [{
        "type": "input-text", //输入文本
        "label": "系统名称",
        "name": "sysNm",
        "value": "",
        "placeholder": "请输入系统名称",
    },/* {
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },
    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    }, */
    ]
};
// constructionCostSearch
//资金投入走势图
export let constructionCostSearch = {
    list: [{
        "type": "input-text", //输入文本
        "label": "部门名称",
        "name": "orgNm",
        "value": "",
        "placeholder": "请输入部门名称",
    },

    {
        type: "input-select", //选择器
        label: "所属地区",
        name: "areaids",
        value: "",
        options: []
    },
    ]
};
export let constructionCostSearchSon = {
    list: [
        {
            "type": "input-text", //输入文本
            "label": "系统名称",
            "name": "sysNm",
            "value": "",
            "placeholder": "请输入系统名称",
        },/*  {
            "type": "input-text", //输入文本
            "label": "部门名称",
            "name": "orgNm",
            "value": "",
            "placeholder": "请输入部门名称",
        },
        {
            type: "input-select", //选择器
            label: "所属地区",
            name: "areaids",
            value: "",
            options: []
        }, */
    ]
};
// setProTableSon
export let setProSearchSon = {
    list: [
        {
            "type": "input-text", //输入文本
            "label": "系统名称",
            "name": "sysNm",
            "value": "",
            "placeholder": "请输入系统名称",
        }, /* {
            "type": "input-text", //输入文本
            "label": "部门名称",
            "name": "orgNm",
            "value": "",
            "placeholder": "请输入部门名称",
        },
        {
            type: "input-select", //选择器
            label: "所属地区",
            name: "areaids",
            value: "",
            options: []
        }, */
    ]
};

export let leaderCockpitSearchSon = {
    list: [
        {
            "type": "input-text", //输入文本
            "label": "信息系统名称",
            "name": "sysNm",
            "value": "",
            "placeholder": "请输入系统名称",
        }, {
            "type": "input-text", //输入文本
            "label": "部门单位名称",
            "name": "orgNm",
            "value": "",
            "placeholder": "请输入部门单位名称",
        },
    ]
};
export let costStatusSearch = {
    list: [
        {
            "type": "input-text", //输入文本
            "label": "部门名称",
            "name": "org_nm",
            "value": "",
            "placeholder": "请输入部门名称",
        },
        // {
        //     type: "input-select", //选择器
        //     label: "费用类型",
        //     name: "sourceType",
        //     value: "1",
        //     options: [{
        //         name: "建设",
        //         value: "1"
        //     },
        //     {
        //         name: "运维",
        //         value: "2"
        //     }
        //     ]
        // },
        {
            type: "input-select", //选择器
            label: "所属地区",
            name: "areaids",
            value: "",
            options: []
        },
    ]
};

export let costStatusSearchSon = {
    list: [
        {
            "type": "input-text", //输入文本
            "label": "部门名称",
            "name": "orgNm",
            "value": "",
            "placeholder": "请输入部门名称",
        }, 
    ]
};
// 
export let sfUseGroupSearchSon = {
    list: [
        {
            "type": "input-text", //输入文本
            "label": "系统名称",
            "name": "sysNm",
            "value": "",
            "placeholder": "请输入系统名称",
        }, 
        // {
        //     "type": "input-text", //输入文本
        //     "label": "部门名称",
        //     "name": "orgNm",
        //     "value": "",
        //     "placeholder": "请输入部门名称",
        // }, 
        // {
        //     type: "input-select", //选择器
        //     label: "所属地区",
        //     name: "areaids",
        //     value: "",
        //     options: []
        // },
    ]
};
export let systemQuantitSearch = {
    list: [
        {
            "type": "input-text", //输入文本
            "label": "系统名称",
            "name": "sysNm",
            "value": "",
            "placeholder": "请输入系统名称",
        }, 
        {
            type: "input-select", //选择器
            label: "迁云情况",
            name: "sfQyun",
            value: "",
            options: [{name:'未反馈',value:0},{name:'已迁云',value:1},{name:'计划迁云',value:2},{name:'不迁云',value:3}]
        }, 
        {
            type: "input-select", //选择器
            label: "系统建设状态",
            name: "sysStatus",
            value: "",
            options: [{name:'未反馈',value:0},{name:'拟建',value:1},{name:'在建',value:2},{name:'已建',value:3},{name:'国家派发',value:4},{name:'省级派发',value:5},{name:'上级派发',value:6},]
        },
        {
            type: "input-select", //选择器
            label: "承载网络",
            name: "bearerNetwork",
            value: "",
            options: [{name:'未反馈',value:0},{name:'政务外网',value:1},{name:'互联网',value:2},{name:'其他专网',value:3}]
        }, 
        {
            type: "input-select", //选择器
            label: "安全等级定级",
            name: "safeLev",
            value: "",
            options: [{name:'未反馈',value:0},{name:'一级',value:1},{name:'二级',value:2},{name:'三级',value:3},{name:'四级',value:4},{name:'五级',value:5},{name:'未定级',value:6},]
        }, {
            type: "input-select", //选择器
            label: "信息系统分级保护定级",
            name: "protCondition",
            value: "",
            options: [{name:'未反馈',value:0},{name:'未定秘',value:1},{name:'秘密',value:2},{name:'机密',value:3},{name:'绝密',value:4},]
        }, {
            type: "input-select", //选择器
            label: "数据安全要求",
            name: "sjaqYq",
            value: "",
            options: [{name:'未反馈',value:0},{name:'涉密',value:1},{name:'敏感',value:2},{name:'不宜公开',value:3},{name:'依申请公开',value:4},{name:'可公开',value:5},]
        }, 
    ]
};
// 