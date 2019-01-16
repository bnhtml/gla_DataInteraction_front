import ajax from '../getData'
let httpApi = ajax.httpApi;

let httpApi1 = ajax.httpMock;
// 选择层级单位

export const getOrgList = (params) => {
  return httpApi('/api/org/list', params, 'post');
}
// 获取行政区划
export const getArea = (params) => {
  return httpApi('/api/org/getArea', params, 'post');
}
// 查询某个区域下的部门
export const getListByArea = (params) => {
  return httpApi('/api/organizationView/getListByArea', params, 'post');
}

// 专题首页 - IT基础资源接口统计
export const getItResourcesData = (params) => {
  return httpApi('/api/itResources/getItResourcesData', params, 'post');
}
// 专题首页 - 获取数据资产填报情况
export const getDataAssetsReporting = (params) => {
  return httpApi('/api/abnormal/getDataAssetsReporting', params, 'post');
}
// 专题首页 - 资金投入分析
export const getCapitalInvestmentData = (params) => {
  return httpApi('/api/capitalInvestment/getCapitalInvestmentData', params, 'post');
}
// 专题首页 - 资金来源分析
export const getSourceFundsData = (params) => {
  return httpApi('/api/sourceFunds/getSourceFundsData', params, 'post');
}
// 专题首页 - 专网系统分析
export const sfSpecialNet = (params) => {
  return httpApi('/api/system/sfSpecialNet', params, 'post');
}
// 专题首页 - 接入网上办事大厅
export const sfJrswsbsdtGroup = (params) => {
  return httpApi('/api/system/sfJrswsbsdtGroup', params, 'post');
}
// 专题首页 - 接入共享交换平台
export const exchangeGroup = (params) => {
  return httpApi('/api/system/exchangeGroup', params, 'post');
}
// 专题首页 - 系统建设情况分析
export const sysStatus = (params) => {
  return httpApi('/api/system/sysStatus', params, 'post');
}
// 获取全部单位信息
export const getOrgs = (params) => {
  return httpApi('/api/org/getOrgs', params, 'post');
}

// 专题首页 - 云资源
export const getCloudResourceInformation = (params) => {
  return httpApi('/api/cloudResource/getCloudResourceInformation', params, 'post');
}