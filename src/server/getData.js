
import { SERVER_BASE_URL } from '@/http/config.js'; // url 配置
import { httpApi, httpMock, MockUrl} from '../http/axios.js'; // 请求

export const routerInfo = (params) => {
    return httpApi('/api/webmapmodules/indexMenu', params, 'post')
}

// 首页是否登录验证接口
export const isLogin = (params) => {
    return httpApi('/api/staff/isLogin', params, 'post')
}

/*贵州省系统建设费用 接口 */
export const getSystemConstructionCost = (params) => {
    return httpMock('/api/getSystemConstructionCost', params, 'post')
}

/*迁云状态占比 接口 */
export const getCloudGroundRatio = (params) => {
    return httpMock('/api/getCloudGroundRatio', params, 'post')
}
/*僵尸系统占比 接口 */
export const getZombieSystemRatio = (params) => {
    return httpMock('/api/getZombieSystemRatio', params, 'post')
}
/*贵州省资金投入走势图 接口 */
export const getInvestmentTrendChart = (params) => {
    return httpMock('/api/getInvestmentTrendChart', params, 'post')
}
/* 折线*/
export const getLineData = (params) => {
    return httpMock('/api/getLineData', params, 'post')
}
/*多柱状图测试 接口 */
export const getMoreBar = (params) => {
    return httpMock('/api/getMoreBar', params, 'post')
}

/*业务 建设状况 接口 */
export const yewuzhuangkuang = (params) => {
    return httpMock('/api/yewuzhuangkuang', params, 'post')
}



/*资产填报预警 - 资产填报预警地区分布分析 - 头部的预警指数及异常度 接口 */
export const getWarningIndex = (params) => {
    return httpMock('/api/assetWarning/getWarningIndex', params, 'post')
}
/*资产填报预警 - 资产填报预警地区分布分析 - 头部的卡片数据 接口 */
export const getWarning = (params) => {
    return httpMock('/api/assetWarning/getWarning', params, 'post')
}

// /*资产填报预警 - 资产填报预警地区分布分析 - 异常数据占比 接口 */
export const getAbnormalData = (params) => {
    return httpMock('/api/assetWarning/getAbnormalData', params, 'post')
}
// /*资产填报预警 - 资产填报预警地区分布分析 - 数据类型 接口 */
export const getTypeAbnormalData = (params) => {
    return httpMock('/api/assetWarning/getTypeAbnormalData', params, 'post')
}
// /*资产填报预警 - 资产填报预警地区分布分析 - 填报数据值异常资产分布 接口 */
export const getValueAbnormalData = (params) => {
    return httpMock('/api/assetWarning/getValueAbnormalData', params, 'post')
}
/*资产填报预警 - 资产填报预警地区分布分析 - 填报数据格式异常资产分布 接口 */
export const getFormatAbnormalData = (params) => {
    return httpMock('/api/assetWarning/getFormatAbnormalData', params, 'post')
}
/*资产填报预警 - 资产填报预警省直部门分析 - 省工商-资产填报异常总体情况中右侧的多个折线 接口 */
export const getAssetMoreLine = (params) => {
    return httpMock('/api/assetWarning/getAssetMoreLine', params, 'post')
}
/*资产填报预警 - 资产填报预警省直部门分析 - 省工商-资产填报异常总体情况中左侧的卡片数据 接口 */
export const getAssetCard = (params) => {
    return httpMock('/api/assetWarning/getAssetCard', params, 'post')
}
/*资产填报预警 - 资产填报预警省直部门分析 - 头部卡片数据 接口 */
export const getDeptCard = (params) => {
    return httpMock('/api/assetWarning/getDeptCard', params, 'post')
}

/*机房 资源来源 接口 */
export const getPcroomMoneyFrom = (params) => {
    return httpMock('/api/leaderCockpit/getInvestmentTrendChart', params, 'post')
}






/* 领导驾驶舱 - top 资源剩余  */
export const getResourceSurplus = (params) => {
    return httpApi('/api/leaderCockpit/getResourceSurplusUseLeft', params, 'post')
}
/* 领导驾驶舱 - 资产填报预警指数 */
export const getEarlyWarning = (params) => {
    return httpApi('/api/abnormal/abnormalTypeGroup', params, 'post')
}


/* 领导驾驶舱 - 中部各个系统总量  */
export const sfUseGroup = (params) => {
    return httpApi('/api/system/sfUseGroup', params, 'post')
}
/* 领导驾驶舱 - 省级共享交换平台接入情况: */
export const exchangeGroup = (params) => {
    return httpApi('/api/system/exchangeGroup', params, 'post');
}
/* 领导驾驶舱 - 省网上办事大厅接入情况： */
export const sfJrswsbsdtGroup = (params) => {
    return httpApi('/api/system/sfJrswsbsdtGroup', params, 'post');
}
/* getResourceSurplusUseLeft */




/* IT - 服务器资源投入分析 */
export const ITBasicResources = (params) => {
    return httpMock('/api/ITBasic/resources', params, 'post');
}

export const ITPcroomData = (params) => {
    return httpApi('/api/ITBasic/getItBasicResourceAnalysis', params, 'post');
}
export const ITPcroomDataSize = (params) => {
    return httpApi('/api/ITBasic/getResourceAllCountInCityAnalyzePage', params, 'post');
}
// 各部门机房面积排行
export const ITPcroomAreaSort = (params) => {
    return httpApi('/api/ITBasic/getComRoomTop', params, 'post');
}
// 立项依据/api/ITBasic/getResourceBySysStatusAndResType
export const ITlixiangyiju = (params) => {
    return httpApi('/api/ITBasic/getResourceBySysStatusAndResType', params, 'post');
}
// IT 领导驾驶舱 - 资金来源 /api/ITBasic/getAllMoneyByResourceTypeAndFunSource
export const ITzijinlaiyuan = (params) => {
    return httpApi('/api/ITBasic/getAllMoneyByResourceTypeAndFunSource', params, 'post');
}
// IT 省直部门  IOCN
export const orgSpeciesList = (params) => {
    return httpApi('/api/organizationView/orgSpeciesList', params, 'post');
}
// IT ICON
export const areaOrgSpeciesList = (params) => {
    return httpApi('/api/organizationView/areaOrgSpeciesList', params, 'post');
}


// IT ICON 省直部门下级
export const organizationViewList = (params) => {
    return httpApi('/api/organizationView/list', params, 'post');
}

export const roomHardCount = (params) => {
    return httpApi('/api/computerroom/roomHardCount', params, 'post');
}
/* ---------------------------------业务系统分析--------------------------- */
/* 业务 - 简称列表页柱状图 */
export const sfUseOrgSpeciesGroup = (params) => {
    return httpApi('/api/system/sfUseOrgSpeciesGroup', params, 'post');
}
/* 业务 - bar图中间层 */
export const sfUseAreanameGroup = (params) => {
    return httpApi('/api/system/sfUseAreanameGroup', params, 'post');
}
/* 业务 - 最后一层列表页柱状图 */
export const sfUseOrgGroup = (params) => {
    return httpApi('/api/system/sfUseOrgGroup', params, 'post');
}
/* 业务  - 地图 */
export const areaGroup = (params) => {
    return httpApi('/api/system/areaGroup', params, 'post');
}
/* 业务 - provinceDetail -  按照安全等级情况分组(安全等级定级情况)*/
export const safeLevGroup = (params) => {
    return httpApi('/api/system/safeLevGroup', params, 'post');
}
/* 业务 - provinceDetail -  按照数据安全要求分组(数据安全要求)*/
export const sjaqYqGroup = (params) => {
    return httpApi('/api/system/sjaqYqGroup', params, 'post');
}
/* 业务 - provinceDetail -  按照信息系统分级保护定级情况分组*/
export const protConditionGroup = (params) => {
    return httpApi('/api/system/protConditionGroup', params, 'post');
}
/* 业务 - provinceDetail - 资金投入组走势图 */
export const costSystem = (params) => {
    return httpApi('/api/cost/system', params, 'post');
}
/* 业务 - provinceDetail(businessMoney) - 投入资金来源分析  */
export const funingSourceTrje = (params) => {
    return httpApi('/api/system/funingSourceTrje', params, 'post');
}
/* 业务 - provinceDetail -  各部门部署网络(业务系统承载网络分析) */
export const bearerNetworkOrgGroup = (params) => {
    return httpApi('/api/system/bearerNetworkOrgGroup', params, 'post');
}
/* 业务 - provinceDetail -  按系统建设状态分组(业务系统建设状态分析) */
export const sysStatusGroup = (params) => {
    return httpApi('/api/system/sysStatusGroup', params, 'post');
}
/* 业务（领导驾驶舱） - provinceDetail - 业务系统迁云情况：*/
export const sfQyunGroup = (params) => {
    return httpApi('/api/system/sfQyunGroup', params, 'post');
}
/* bearerNetwork 3 */
/* 业务 - provinceDetail - 政务专网系统明细*/
export const systemList = (params) => {
    return httpApi('/api/system/list', params, 'post');
}
// export consst 
/* 业务Table 系统分布情况 System distribution */
export const protConditionTable = '/api/system/protConditionTable';
/* 业务Table 业务系统分布资金情况 Distributed funds */
export const jbieTable = '/api/system/jbieTable';
/* 业务Table 业务系统建设状态分析  */
export const sysStatusTable = '/api/system/sysStatusTable';
/* 业务Table 业务系统承载网络分析 Load bearing */
export const bearerNetworkTable = '/api/system/bearerNetworkTable';
/* 业务Table 信息系统部署方式统计 deploy */
export const optModeTable = '/api/system/optModeTable';
/* 业务Table 全国统建系统分析  */
export const sfQgtzTable = '/api/system/sfQgtzTable';
/* 业务Table 系统分布在用/拟建/僵尸系统/建设/运维费用情况  */
export const sfUseTable = '/api/system/sfUseTable';

/* 业务Table 迁云状况分析  */
export const sfQyunTable = '/api/system/sfQyunTable';
/* 业务Table 信息资金来源分析  */
export const sourceTable = '/api/system/sourceTable';
/* 业务Table 资金走势图 - 运维  */
export const constructionCost = '/api/cost/constructionCost';
/* 业务Table 业务系统建设状态资金分析/用户范围投入金额分析 */
export const costStatusTable = '/api/system/mxgzSyfwTable';
/* 业务 新增  /api/system/list */
export const systemQuantit = '/api/system/list';
/* 业务Table 查看详情  */
export const systemQuery = (params) => {
    return httpApi('/api/system/query', params, 'post');
}
/* 业务 - businessMoney - 各城市资费情况 (全省各部门资金投入)*/
export const cityTrjeGroup = (params) => {
    return httpApi('/api/system/cityTrjeGroup', params, 'post');
}
/* 业务 - businessMoney - 各单位资费情况(全省各地区资金投入) */
export const orgTrjeGroup = (params) => {
    return httpApi('/api/system/orgTrjeGroup', params, 'post');
}
/* 业务 - businessMoney - 按系统分布情况分析 */
export const systemTrje = (params) => {
    return httpApi('/api/system/trje', params, 'post');
}
/* 业务 - businessMoney - 用户范围投入金额分析 1:内部公众,2:组织公众,4:非组织公众*/
export const mxgzSyfwGroup = (params) => {
    return httpApi('/api/system/mxgzSyfwGroup', params, 'post');
}
/*业务系统  全省各地区系统运维费用排名 */
export const orgTrjeOrder = (params) => {
    return httpApi('/api/system/orgTrjeOrder', params, 'post');
}
/*业务系统  贵州省各地区全国统建系数量 */
export const sfQgtzCityOrder = (params) => {
    return httpApi('/api/system/sfQgtzCityOrder', params, 'post');
}
/*  */
/*业务系统Tablesearch  城市 */
export const getCity = (params) => {
    return httpApi('/api/organizationView/getCity', params, 'post');
}
/* 
api/system/listBugget */
export const listBugget = (params) => {
    return httpApi('/api/system/listBugget', params, 'post');
}
//文件下载
const getImgSrc = (fileName, downloadName) => {
    return SERVER_BASE_URL + '/service-api/download?fileName=' + fileName + '&downloadName=' + downloadName;
}
/* IT - index - circle - 机房 */
export const getItBasicResourceAnalysis = (params) => {
    return httpApi('/api/ITBasic/getItBasicResourceAnalysis', params, 'post');
}
/* IT - index - circle - 网络资源 /*/
export const getResourceAllCountInCityAnalyzePage = (params) => {
    return httpApi('/api/ITBasic/getResourceAllCountInCityAnalyzePage', params, 'post');
}
/* IT- index - 省直部门 - 柱状图 */
export const getBarGraphWithDeptSpecies = (params) => {
    return httpApi('/api/ITBasic/getBarGraphWithDeptSpecies', params, 'post');
}
/* 数据完备度总数 - 地区 */
export const completenessByCity = (params) => {
    return httpApi('/api/abnormal/completenessByCity', params, 'post')
}
/* 预警 - 部门完备度   */
export const completenessByType = (params) => {
    return httpApi('/api/abnormal/completenessByType', params, 'post')
}
/* ------------------------------------专题------------------------------------ */
/* 专题 - 选择层级单位 */
export const orgList = (params) => {
    return httpApi('api/org/list', params, 'post');
}
/* 专题 - 一级  - IT IT基础资源接口统计*/
export const getItResourcesData = (params) => {
    return httpApi('/api/itResources/getItResourcesData', params, 'post');
}
/* 专题 - 业务系统 - 专网系统分析 */
export const sfSpecialNet = (params) => {
    return httpApi('/api/system/sfSpecialNet', params, 'post');
}
/* 专题 - 导出execl*/
export const exportExcel = (params) => {
    // return SERVER_BASE_URL + '/service-api/excel/exportExcel?fileName=' + fileName + '&orgCode=' + orgCode;
    return httpApi('/api/excel/exportExcel', params, 'post', 'byte');
}
/* 专题 - 业务系统 - 接入共享交换平台  ===》 领导驾驶舱 - 省级共享交换平台接入情况: */

/* 专题 - 业务系统 - 接入网上办事大厅  ===》 领导驾驶舱 - 省网上办事大厅接入情况：*/

/* 专题 - 业务系统 - 系统建设情况分析 */
export const sysStatus = (params) => {
    return httpApi('/api/system/sysStatus', params, 'post');
}
/* 专题 - 业务系统 - 系统建设情况分析 ===> 业务（领导驾驶舱） - provinceDetail - 业务系统迁云情况： */

/* 专题 - 数据资产填报预警 - 获取数据资产填报情况 */
export const getDataAssetsReporting = (params) => {
    return httpApi('/api/abnormal/getDataAssetsReporting', params, 'post');
}

/* 专题 - 资金 - 资金投入分析 */
export const getCapitalInvestmentData = (params) => {
    return httpApi('/api/capitalInvestment/getCapitalInvestmentData', params, 'post');
}
/* 专题 - 资金 - 资金来源分析 */
export const getSourceFundsData = (params) => {
    return httpApi('/api/sourceFunds/getSourceFundsData', params, 'post');
}

/* 专题 - 三级 - 填报部门 - 信息系统详情 ===》 业务Table 查看详情*/

/* 专题 - 三级 - 填报部门 - 数据资产详情 */
export const dataAssetQuery = (params) => {
    return httpApi('/api/dataAsset/query', params, 'post');
}
/* 专题 - 三级 - 填报部门 - 硬件详情 */
export const equipmentQuery = (params) => {
    return httpApi('/api/equipment/query', params, 'post');
}
/* 专题 - 三级 - 填报部门 - 软件详情 */
export const softwaresQuery = (params) => {
    return httpApi('/api/softwares/query', params, 'post');
}
/* 专题 - 三级 - 填报部门 - 填报情况云资源详情明细 */
export const getCloudResourcesList = (params) => {
    return httpApi('/api/fillReportSituation/getCloudResourcesList', params, 'post');
}
/* 专题 - 三级 - 填报部门 - 数据资产列表页 */
export const dataAssetList = (params) => {
    return httpApi('/api/dataAsset/list', params, 'post');
}
/* 专题 - 三级 - 填报部门 - 硬件列表页 */
export const equipmentList = (params) => {
    return httpApi('/api/equipment/list', params, 'post');
}
/* 专题 - 三级 - 填报部门 - 软件列表页 */
export const softwaresList = (params) => {
    return httpApi('/api/softwares/list', params, 'post');
}
/* 专题 - 三级 - 合规度 - tab页Table */
export const complianceGetComplianceAllList = (params) => {
    return httpApi('/api/compliance/getComplianceAllList', params, 'post');
}
//
/* 专题 - 三级 - 合规度 - 数据异常度详情页 */
export const errFileds = (params) => {
    return httpApi('/api/abnormal/errFileds', params, 'post');
}
/* 专题 - 三级 - 完备度 - 合规度信息系统-机房-硬件-软件-数据资产-列表接口-zdc */
export const getComplianceAllList = (params) => {
    return httpApi('/api/compliance/getComplianceAllList', params, 'post');
}
/* 专题 - 三级 - 完备度 - 完备度云资源详情明细-zdc */
export const completenessGetCloudResourcesList = (params) => {
    return httpApi('/api/completeness/getCloudResourcesList', params, 'post');
}
/* 专题 - 三级 - xx部门-数据资产填报完备度明细 */
export const getTabData = (params) => {
    return httpApi('/api/tab/getTabData', params, 'post');
}
/* 专题 - 三级 - xx部门-数据资产填报完备度明细(资金来源云资源)) */
export const getTabDatas = (params) => {
    return httpApi('/api/tab/getTabDatas', params, 'post');
}
/* 专题  - 二级 - 业务系统建设情况分析 */
export const sysStatusByOrg = (params) => {
    return httpApi('/api/system/sysStatusByOrg', params, 'post');
}
/* 专题  - 二级 - 填报部门 */
export const entryCountByOrg = (params) => {
    return httpApi('/api/abnormal/entryCountByOrg', params, 'post');
}
/* 专题  - 二级 - 数据合规度 */
export const getComplianceList = (params) => {
    return httpApi('/api/compliance/getComplianceList', params, 'post');
}
/* 专题  - 二级 - 数据完备度 */
export const completenessByOrg = (params) => {
    return httpApi('/api/abnormal/completenessByOrg', params, 'post');
}
/* 所有ECS-OSS-RDS-SLB云资源详情页面-zdc */
export const getCloudResourcesDetail = (params) => {
    return httpApi('/api/cloudResources/getCloudResourcesDetail', params, 'post');
}

/* 专题 - 业务系统 - 迁云情况 */
export const migrationCloud = (params) => {
    return httpApi('/api/system/migrationCloud', params, 'post');
}

/* 专题 - 业务系统 - 接入共享交换平台 */
export const accessSharingPlatform = (params) => {
    return httpApi('/api/system/accessSharingPlatform', params, 'post');
}

/* 专题 - 业务系统 - 接入网上办事大厅 */
export const accessOnlineServiceHall = (params) => {
    return httpApi('/api/system/accessOnlineServiceHall', params, 'post');
}
/* 专题 - 业务系统 - 迁云情况 、接入共享交换平台、接入网上办事大厅- 二级 */
export const monographicList = (params) => {
    return httpApi('/api/system/monographicList', params, 'post');
}
/* 专题 - 业务系统 - 专网分析 */
export const runenvironment = (params) => {
    return httpApi('/api/system/runenvironment', params, 'post');
}
/* 专题 - 业务系统 - 专网分析- 二级 */
export const runenvironmentThirdPage = (params) => {
    return httpApi('/api/system/runenvironmentThirdPage', params, 'post');
}
/* 专题 - 资金 - 资金来源分析 资金来源使用情况图表接口-zdc */
export const getSourceFundsListData = (params) => {
    return httpApi('/api/sourceFunds/getSourceFundsListData', params, 'post');
}
/* 专题 - 资金 - 资金来源分析 - 二级 资金来源明细云资源接口-zdc */
export const getCloudSourceFundsListData = (params) => {
    return httpApi('/api/sourceFunds/getCloudSourceFundsListData', params, 'post');
}
/* 专题 - 资金 - 资金来源分析 - 二级 资金来源明细信息系统-机房-硬件-软件接口-zdc */
export const getSourceFundsListDataDetail = (params) => {
    return httpApi('/api/sourceFunds/getSourceFundsListDataDetail', params, 'post');
}



/* 专题 - 服务器   */
export const serverresourcedetails = (params) => {
    return httpApi('/api/servers/serverresourcedetails', params, 'post');
}
/* 专题 - 服务器 - 机房建设 */
export const constructionConditionMapSencodePage = (params) => {
    return httpApi('/api/computerroom/constructionConditionMapSencodePage', params, 'post');
}
/* 专题 - 服务器 - 机房 设备 */
export const equipmentMapSecondPage = (params) => {
    return httpApi('/api/computerroom/equipmentMapSecondPage', params, 'post');
}
/* 专题 - 资金 - 使用 bar图  和table*/
export const getDetailsFundUseList = (params) => {
    return httpApi('/api/capitalInvestment/getDetailsFundUseList', params, 'post');
}
/* 专题 - 资金 - 使用 饼图*/
export const getAnalysisFundUtilization = (params) => {
    return httpApi('/api/capitalInvestment/getAnalysisFundUtilization', params, 'post');
}

/* 专题 - 云资源  */
export const getCloudResourceList = (params) => {
    return httpApi('/api/cloudResource/getCloudResourceList', params, 'post');
}

/* 专题 - 云资源 二级 */
export const getCloudResourceDetailedList = (params) => {
    return httpApi('/api/couldResource/getCloudResourceDetailedList', params, 'post');
}




/* ------------------------------------后台管理 ------------------------------------------- */

/* 登录 */
export const login = (reqParams) => {
    return httpApi('/api/auth/login', reqParams, 'POST')
}
//获取角色列表
const getRoleList = (reqParams) => {
    return httpApi('/api/role/list', reqParams, 'POST')
}

//删除角色
const delRoleList = (reqParams) => {
    return httpApi('/api/role/deleteArray', reqParams, 'POST')
}
//分配权限时获取菜单树
const getMenuListAlls = () => {
    return httpApi('/api/webmapmodules/listAlls', 'POST')
}
//给角色分配权限
const bindPermissionForRole = (reqParams) => {
    return httpApi('/api/role/bindPermissionForRole', reqParams, 'POST')
}
//获取该角色所有的权限
const getBindRole = (reqParams) => {
    return httpApi('/api/webmapmodules/findPermissionByRoleId/' + reqParams, 'POST')
}
//添加角色
const addRole = (reqParams) => {
    return httpApi('/api/role/save', reqParams, 'POST')
}
//查看角色编码是否存在
const roleCodeexist = (reqParams) => {
    return httpApi('/api/role/roleCodeexist', reqParams, 'POST')
}
//修改角色
const updateRole = (reqParams) => {
    return httpApi('/api/role/update', reqParams, 'POST')
}

/* menu */
// 通过id查找菜单
const getMenu = (reqParams) => {
    return httpApi('/api/webmapmodules/object', reqParams, 'POST')
}
//获取选中的系统下是否有菜单
const getMenuListByappids = (reqParams) => {
    return httpApi('/api/webmapmodules/getMenuListByappids', reqParams, 'POST')
}
//获取菜单树
const getMenuListAll = () => {
    return httpApi('/api/webmapmodules/listAll', 'POST')
}

//删除菜单
const delMenu = (reqParams) => {
    return httpApi('/api/webmapmodules/delete', reqParams, 'POST')
}

//查询菜单
const getMenuListnormal = (reqParams) => {
    return httpApi('/api/webmapmodules/list1', reqParams, 'POST')
}
//添加菜单
const addMenu = (reqParams) => {
    return httpApi('/api/webmapmodules/save', reqParams, 'POST')
}
//修改菜单
const updateMenu = (reqParams) => {
    return httpApi('/api/webmapmodules/update', reqParams, 'POST')
}
//获取菜单列表--递归
const getMenuList = (reqParams) => {
    return httpApi('/api/webmapmodules/list1', reqParams, 'POST')
}
//获取应用列表
const getAppList = (reqParams) => {
    return httpApi('/api/appmeta/list', reqParams, 'POST')
}
/* user */
//获取用户列表
const getUserList = (reqParams) => {
    return httpApi('/api/staff/list', reqParams, 'POST')
}
//查看用户名是否存在
const NameExist = (reqParams) => {
    return httpApi('/api/staff/findUserNameexist', reqParams, 'POST')
}
//删除用户
const delUser = (reqParams) => {
    return httpApi('/api/staff/deleteArray', reqParams, 'POST')
}
//添加用户
const addUser = (reqParams) => {
    return httpApi('/api/staff/add', reqParams, 'POST')
}

//查询角色与菜单关联关系
const getRoleMenuList = (reqParams) => {
    return httpApi('/api/roleaccesses/list', reqParams, 'POST')
}
//查寻用户所有的角色
const getUserRole = (reqParams) => {
    return httpApi('/api/role/selectMeByStaffId/' + reqParams, 'POST');
}
//修改用户
const updateUser = (reqParams) => {
    return httpApi('/api/staff/update', reqParams, 'POST');
}
/* 左侧菜单 */
const asideData = (reqParams) => {
    return httpApi('/api/webmapmodules/indexMenu', reqParams, 'POST');
}
//获取组织tree
const getMechanismIdTree = () => {
    //api问题暂时加id=0
    return httpApi('/api/dept/selectdeptBydepyParentId', 'POST')
}
//获取组织列表
const getmechanismList = (reqParams) => {
    return httpApi('/api/dept/list', reqParams, 'POST')
}
//获取组织下的所有人员
const getUserByMechanismId = (reqParams) => {
    return httpApi('/api/staff/selectMebyDeptId/' + reqParams, 'POST')
}
//添加组织
const addDept = (reqParams) => {
    return httpApi('/api/dept/save', reqParams, 'POST')
}
//修改组织
const updateDept = (reqParams) => {
    return httpApi('/api/dept/update', reqParams, 'POST')
}
//删除组织列表
const delMechanism = (reqParams) => {
    return httpApi('/api/dept/deleteArray', reqParams, 'POST')
}
//获取行政区域
const getStrictsToTree = () => {
    return httpApi('/api/district/findStrictsToTree', 'POST')
}
const getJurisdictionList = (reqParams) => {
    return httpApi('/api/jurisdiction/selectJurisdictionList', reqParams, 'POST')
}
/* 角色 - 根据角色ID 来获得所有子角色的ID集合 */
const roleId = (reqParams) => {
    return httpApi('/api/role/roleId', reqParams, 'POST')
}
/* 组织机构 - 判断上级部门是否可选 */
const deptId = (reqParams) => {
    return httpApi('/api/dept/deptId', reqParams, 'POST')
}
/* 个人中心 */
const messageReminding = (reqParams) => {
    return httpMock('/api/userInfo/messageReminding', reqParams, 'GET');
}

// 关联图谱
const relation = (reqParams) => {
    return httpApi('/api/abnormal/ctype', reqParams, 'POST');
}
let list = {
    httpApi,
    httpMock,
    routerInfo,
    getSystemConstructionCost,
    getCloudGroundRatio,
    getZombieSystemRatio,
    getInvestmentTrendChart,
    getLineData,
    getMoreBar,
    isLogin,
    getWarningIndex,
    getWarning,
    getAbnormalData,
    getTypeAbnormalData,
    getValueAbnormalData,
    getFormatAbnormalData,
    getAssetMoreLine,
    getAssetCard,
    getDeptCard,

    getResourceSurplus,
    getEarlyWarning,
    sfUseGroup,
    exchangeGroup,
    sfJrswsbsdtGroup,


    getPcroomMoneyFrom,
    ITBasicResources,
    ITPcroomData,
    ITPcroomDataSize,
    ITPcroomAreaSort,
    ITlixiangyiju,
    ITzijinlaiyuan,
    yewuzhuangkuang,


    /* 业务 */
    orgSpeciesList,
    getImgSrc,
    areaOrgSpeciesList,
    organizationViewList,
    sfUseOrgSpeciesGroup,
    sfUseAreanameGroup,
    sfUseOrgGroup,
    areaGroup,
    safeLevGroup,
    sjaqYqGroup,
    protConditionGroup,
    costSystem,
    funingSourceTrje,
    bearerNetworkOrgGroup,
    sysStatusGroup,
    sfQyunGroup,
    systemList,
    systemQuery,
    roomHardCount,

    cityTrjeGroup,
    orgTrjeGroup,
    systemTrje,
    mxgzSyfwGroup,
    orgTrjeOrder,
    sfQgtzCityOrder,
    getCity,
    listBugget,

    /* IT */
    getItBasicResourceAnalysis,
    getResourceAllCountInCityAnalyzePage,
    getBarGraphWithDeptSpecies,
    ITPcroomDataSize,
    /* 预警 */
    completenessByCity,
    completenessByType,
    /* 专题 */
    orgList,
    getItResourcesData,
    sfSpecialNet,
    sysStatus,
    getDataAssetsReporting,
    getCapitalInvestmentData,
    getSourceFundsData,
    dataAssetQuery,
    equipmentQuery,
    softwaresQuery,
    exportExcel,

    dataAssetList,
    equipmentList,
    softwaresList,
    complianceGetComplianceAllList,
    errFileds,
    getComplianceAllList,
    completenessGetCloudResourcesList,
    getTabData,
    getTabDatas,

    sysStatusByOrg,
    entryCountByOrg,
    getComplianceList,
    completenessByOrg,
    softwaresQuery,
    getCloudResourcesDetail,

    migrationCloud,
    accessSharingPlatform,
    accessOnlineServiceHall,
    monographicList,
    runenvironment,
    runenvironmentThirdPage,
    getSourceFundsListData,
    getCloudSourceFundsListData,
    getSourceFundsListDataDetail,
    //专题 - 机房服务器
    serverresourcedetails,
    // 专题 - 机房建设 、机房设备
    constructionConditionMapSencodePage,
    equipmentMapSecondPage,

    getDetailsFundUseList,
    getAnalysisFundUtilization,
    getCloudResourceList,
    /* 后台 */
    login,
    getRoleList,
    delRoleList,
    getMenuListAlls,
    bindPermissionForRole,
    getBindRole,
    addRole,
    roleCodeexist,
    updateRole,
    getMenu,
    getMenuListByappids,
    getMenuListAll,
    delMenu,
    getMenuListnormal,
    addMenu,
    updateMenu,
    getMenuList,
    getAppList,
    getUserList,
    NameExist,
    delUser,
    addUser,
    getRoleMenuList,
    getUserRole,
    updateUser,
    asideData,
    getMechanismIdTree,
    getmechanismList,
    getUserByMechanismId,
    addDept,
    updateDept,
    delMechanism,
    getStrictsToTree,
    getJurisdictionList,
    roleId,
    deptId,
    /* 演示接口假数据 */
    messageReminding,
    relation
}
export default list;