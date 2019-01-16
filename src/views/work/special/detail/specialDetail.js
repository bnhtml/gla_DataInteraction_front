 /* 数据资产 */
 export let dataAssetsJson = {
    dataAssetsNm:'数据资产名称',
    provider:'数据资产提供方',
    dataAssetClass:'数据资产类型',
    sourceType:'数据资产格式类型',
    dGMode:'产生方式',
    owner:'原始所有者',
    ownership:'权属关系',
    mtcUnit:'发布日期',
    optMode:'原始用途',
    chargeDept:'数据资产估值',
    chargeLinkman:'其他类型数据资产格式描述',
    chargePhone:'数据资产管理责任人',
    rangeUse:'数据规模',
    apprDept:'数据资产概述',
    manageUnit:'数据资产来源描述',
}
export let dataAssetsFormat={
    ownership:v=>['使用权','管理权','使用权,管理权','其他','使用权,其他','管理权,其他','使用权,管理权,其他'][v-1]
}
// export let specialFormat = {
//   sys_status:v =>['拟建','在建','已建','国家派发','省级派发','上级派发'][v-1],
//   bearer_network:v=>['政务外网','互联网','其他专网'][v-1],
//   sf_use:v=>['是','否','试用中'][v-1],
//   opt_mode:v=>['公有云平台','私有云平台','-','传统方式'][v-1],
//   funingSource:v=>['财政拨款','自筹','BT项目','其他'][v-1],
//   safeLev:v=>['一级','二级','三级','四级','五级','未定级'][v-1],
//   protCondition:v=>['未定秘','秘密','机密','绝密'][v-1],
//   mtcFeeSource:v=>['财政拨款','自筹','BT项目','其他'][v-1],
//   sfQyun:v=>['已迁云','计划迁云','不迁云'][v-1],
//   exchange:v=>['是','否'][v-1],
//   sfIntegration:v=>['是','否'][v-1],
//   mxgzSyfw:v=>['内部公众','组织公众','非组织公众'][v-1],
//   sfJrswsbsdt:v=>['是','否','试用中'][v-1] ,
//   sysFb:v=>['省级部署' ,'市州部署' ,'区(县)部署'][v-1],
//   sjaqYq:v=>['涉密','敏感','不宜公开','依申请公开','可公开'][v-1],
//   nbSyfw:v=>['省级使用', '市级使用','', '县级使用'][v-1],
//   sfQgtz:v=>['是' ,'否' ,'试用中'][v-1],

// }
/* 云资源 - ECS */
export let ECSJson= {
    ecsResourseId:'资源ID',
    applyUserAccount:'申请人账号',
    applyName:'申请人姓名',
    userType:'用户类型',
    applyPhone:'申请人电话',
    applyOrganize:'申请人机构',
    applyNo:'申请单号',
    elasticityIp:'弹性IP',
    natIp:'NAT_IP',
    privateNetIp:'私网IP',
    createTime:'生产时间',
    networkZone:'网络区域',
    configure:'配置',
    unitNm:'部门单位名称',
    vpcId:'所属VPC ID',
    vpcName:'所属VPC Name',
    resourseStatus:'资源状态',
    ecsNzf:'年租费(万元)',
}
export let ECSFormat={

}
/* 云资源 - RDS */
export let RDSJson= {
    rdsResourseId:'资源ID',
    applyUserAccount:'申请人账号',
    userType:'用户类型',
    applyName:'申请人姓名',
    applyPhone:'申请人电话',
    applyOrganize:'申请人机构',
    applyNo:'申请单号',
    // chargeLinkman:'网络区域',
    configure:'配置',
    createTime:'生产时间',
    unitNm:'部门单位名称',
    vpcId:'所属VPC ID',
    vpcName:'所属VPC Name',
    resourseStatus:'资源状态',
    rdsNzf:'年租费(万元)',
}
export let RDSFormat={
    
}
/* 云资源 - SLB */
export let SLBJson= {
    slbResourseId:'资源ID',
    applyUserAccount:'申请人账号',
    userType:'用户类型',
    applyName:'申请人姓名',
    applyPhone:'申请人电话',
    applyOrganize:'申请人机构',
    applyNo:'申请单号',
    vip:'VIP',
    configure:'配置',
    createTime:'生产时间',
    unitNm:'部门单位名称',
    vpcId:'所属VPC ID',
    vpcName:'所属VPC Name',
    resourseStatus:'资源状态',
    slbNzf:'年租费(万元)',
}
export let SLBFormat={
    
}
/* 云资源  - OSS */
export let OSSJson= {
    ossResourseId:'资源ID',
    applyUserAccount:'申请人账号',
    userType:'用户类型',
    applyName:'申请人姓名',
    applyPhone:'申请人电话',
    applyOrganize:'申请人机构',
    applyNo:'申请单号',
    createTime:'生产时间',
    unitNm:'部门单位名称',
    useCunchu:'使用存储容量',
    downLiuliang:'下载流量',
    resourseStatus:'资源状态',
    ossNzf:'年租费(万元)',
}
export let OSSFormat={
    
}
/* 填报 - 软件 */
export let rjJson= {
    unitNm:'部门单位名称',
    softNm:'软件名称',
    verInfo:'软件版本',
    softPrice:'软件采购价格(万元)',
    purMeth:'采购方式',
    softType:'软件类型',
    licMode:'软件授权方式',
    tecSupporter:'软件本地技术支持服务商',
    verUpdateInfo:'软件版本情况',
    developer:'开发商',
    supplier:'供应商',
    softPurDate:'采购时间',
    useDate:'投入使用时间',
    locateSerUnit:'本地服务机构',
    icNo:'授权序列号',
    equCode:'软件部署对应硬件编号',
    fixedAssetNumber:'固定资产编号',
    softCount:'软件数量',
    softYf:'软件用途',
    jzYwfy:'截止2017年产生运维费(万元)',
    softFunc:'软件用途概述',
}
/* 填报  - 硬件 */
export let yjJson= {
    unitNm:'部门单位名称',
    eqpNm:'设备名称',
    brandModel:'设备品牌及型号',
    eqpType:'设备类型',
    ip:'局域网IP地址',
    equPrice:'硬件采购价格(万元)',
    os:'设备操作系统',
    mac:'设备MAC地址',
    fixedAssetNumber:'固定资产编号',
    eqpPurDate:'采购时间',
    useDate:'投入使用时间',
    sbXh:'设备型号',
    sbFb:'设备分布',
    jzYwfy:'截至2017年底产生的运维费用',
    supplierPeople:'供应商联系人',
    supplierPhone:'供应商联系方式',
    manufacturer:'生产厂商',
    supplier:'供应商',
}
export let yjFormat = {
    eqptype:v=>['服务器','专用设备','ECS','UPS','其他','机柜','空调','安全设备','网络设备','路由器','交换机'][v-1] || '未反馈',
  }