/* 
    * name            input-text的key为name 
    * jfName          input-text   填报 - 机房
    * types           input-select 完备度 types 
    * searchTypes     input-select  合规度、完备度
    * 
    * sysStatus input-select 建设  拟建在建已建未反馈
 */
/* 已填报 - 信息业务 */
export let alreadyxxSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "系统名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    ]
}
/* 已填报 - 机房 */
export let alreadyjfSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "机房名称",
        "name": "jfName",
        "value": "",
        "placeholder": "请输入机房名称",
    },
    ]
}
/* 已填报 - 硬件 */
export let alreadyyjSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "设备名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入设备名称",
    },
    ]
}

/* 已填报 - 软件 */
export let alreadyrjSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "软件名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入软件名称",
    },
    ]
}
/* 已填报 - 数据资产 */
export let alreadysjzcSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "数据资产名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入数据资产名称",
    },
    ]
}

/* 已填报 - 云资源 */
export let alreadyyzySearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "数据资产名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入云资源ID",
    },
    {
        type: "input-select", //选择器
        // label: "所属地区",
        name: "types",
        value: "",
        options: [{
            name: "ECS",
            value: "6"
        },
        {
            name: "OSS",
            value: "7"
        },
        {
            name: "RDS",
            value: "8"
        },
        {
            name: "SLB",
            value: "9"
        },
        ]
    },
    ]
}



/* 完备度 - 信息业务 */
export let completenessxxSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "系统名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    ]
}
/* 完备度 - 机房 */
export let completenessjfSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "机房名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入机房名称",
    },
    ]
}
/* 完备度 - 硬件 */
export let completenessyjSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "设备名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入设备名称",
    },
    ]
}

/* 完备度 - 软件 */
export let completenessrjSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "软件名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入软件名称",
    },
    ]
}
/* 完备度 - 数据资产 */
export let completenesssjzcSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "数据资产名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入数据资产名称",
    },
    ]
}

/* 完备度 - 云资源 */
export let completenessyzySearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "数据资产名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入云资源ID名称",
    },
    {
        type: "input-select", //选择器
        // label: "所属地区",
        name: "searchTypes",
        value: "",
        options: [{
            name: "ECS",
            value: "6"
        },
        {
            name: "OSS",
            value: "7"
        },
        {
            name: "RDS",
            value: "8"
        },
        {
            name: "SLB",
            value: "9"
        },
        ]
    },
    ]
}

//name
/* 合规度 - 信息业务 */
export let compliancexxSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "系统名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    ]
}
/* 合规度 - 机房 */
export let compliancejfSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "机房名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入机房名称",
    },
    ]
}
/* 合规度 - 硬件 */
export let complianceyjSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "设备名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入设备名称",
    },
    ]
}

/* 合规度 - 软件 */
export let compliancerjSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "软件名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入软件名称",
    },
    ]
}
/* 合规度 - 数据资产 */
export let compliancesjzcSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "数据资产名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入数据资产名称",
    },
    ]
}

/* 合规度 - 云资源 */
export let complianceyzySearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "数据资产名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入云资源ID名称",
    },
    {
        type: "input-select", //选择器
        // label: "所属地区",
        name: "searchTypes",
        value: "",
        options: [{
            name: "ECS",
            value: "6"
        },
        {
            name: "OSS",
            value: "7"
        },
        {
            name: "RDS",
            value: "8"
        },
        {
            name: "SLB",
            value: "9"
        },
        ]
    },
    ]
}

/* 业务系统- 建设 */
export let buildSearch = {
    list: [{
        "type": "input-text", //输入文本
        // "label": "数据资产名称",
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    {
        type: "input-select", //选择器
        // label: "所属地区",
        name: "sysStatus",
        value: "",
        options: [{
            name: "已建",
            value: "3,4,5,6"
        },
        {
            name: "在建",
            value: "2"
        },
        {
            name: "拟建",
            value: "1"
        },
        {
            name: "未反馈",
            value: "0"
        },
        ]
    },
    ]
}
/* 业务系统- 迁云 */
export let migratedCloudsSearch = {
    list: [{
        "type": "input-text", //输入文本
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    {
        type: "input-select", 
        name: "sfQyun",
        value: "",
        options: [{
            name: "已迁云",
            value: "1"
        },
        {
            name: "计划迁云",
            value: "2"
        },
        {
            name: "不迁云",
            value: "3"
        },
        {
            name: "未反馈",
            value: "0"
        },
        ]
    },
    ]
}
/* 业务系统- 接入共享平台分析 */
export let shareSearch = {
    list: [{
        "type": "input-text", //输入文本
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    {
        type: "input-select", 
        name: "exchange",
        value: "",
        options: [{
            name: "已接入共享平台",
            value: "1"
        },
        {
            name: "计划接入共享平台",
            value: "3"
        },
        {
            name: "不接入共享平台",
            value: "2"
        },
        {
            name: "未反馈",
            value: "0"
        },
        ]
    },
    ]
}
/* 业务系统- 接入网上办事大厅 */
export let officehallSearch = {
    list: [{
        "type": "input-text", //输入文本
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    {
        type: "input-select", 
        name: "sfJrswsbsdt",
        value: "",
        options: [{
            name: "已接入网上办事大厅",
            value: "1"
        },
        {
            name: "计划接入网上办事大厅",
            value: "2"
        },
        {
            name: "不接入网上办事大厅",
            value: "3"
        },
        {
            name: "未反馈",
            value: "0"
        },
        ]
    },
    ]
}
/* 业务系统- 专网 */
export let specialnetworkSearch = {
    list: [{
        "type": "input-text", //输入文本
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
    {
        type: "input-select", 
        name: "bearerNetwork",
        value: "",
        options: [{
            name: "专网环境运行系统",
            value: "3"
        },
        {
            name: "非专网环境运行系统",
            value: "1,2"
        },
        {
            name: "未反馈",
            value: "0"
        }]
    }]
}

/* 业务系统- 资金来源分析 */
export let sourceanalysisSearch = {
    list: [{
        "type": "input-text", //输入文本
        "name": "name",
        "value": "",
        "placeholder": "请输入系统名称",
    },
   /*  {
        type: "input-date", //输入日期
        datetype: 'year',  //周，week,月，month,年 year
        // label: "运维年份",
        // name: "year",
        value: new Date(),
        valueFormat: "yyyy"   //'yyyy-MM-dd HH:mm:ss' H24小时 h12小时
      } */]
}