import ajax from '../getData'
let httpApi = ajax.httpApi;
let httpMock = ajax.httpMock;
export const ITPcroomDataArea = (params) => {
  return httpApi('/api/ITBasic/getItBasicResourceAnalysis', params, 'post');
}
export const ITPcroomDataSize = (params) => {
  return httpApi('/api/ITBasic/getResourceAllCountInCityAnalyzePage', params, 'post');
}
// 地区总量分析
export const sizeByDeptArea = (params) => {
  return httpApi('/api/ITBasic/getComRoomSizeByDeptByArea', params, 'post');
}
// 地区总量排行
export const topByDeptArea = (params) => {
  return httpApi('/api/ITBasic/getComRoomTopByArea', params, 'post');
}
// 部门总量分析
export const sizeByBumenArea = (params) => {
  return httpApi('/api/ITBasic/getComRoomSizeByDept', params, 'post');
}
// 部门总量排行
export const topByBumenArea = (params) => {
  return httpApi('/api/ITBasic/getComRoomTop', params, 'post');
}
// 机房投入资金分析
export const jifangtouru = (params) => {
  return httpApi('/api/cost/getComRoomAllMoneyAnalyze', params, 'post');
}
// 机房建设资金走势图 /api/cost/getCmpRoomMoneyTrend
export const jianshezijin = (params) => {
  return httpApi('/api/cost/getCmpRoomMoneyTrend', params, 'post');
}
// IT基础-计算资源总数量-各地区服务器资源使用情况数量
export const ziyuanshiyongBydiqu = (params) => {
  return httpApi('/api/ITBasic/getResourceUsefullByCity', params, 'post');
}
export const ziyuanshiyongBybumen = (params) => {
  return httpApi('/api/ITBasic/getResourceUsefullByDept', params, 'post');
}
// 各地区服务器资源投入情况分析
export const ziyuantouruBydiqu = (params) => {
  return httpApi('/api/ITBasic/getResourceMoneyByCity', params, 'post');
}
export const ziyuantouruBybumen = (params) => {
  return httpApi('/api/ITBasic/getResourceMoneyByDept', params, 'post');
}
// 资金来源分析
export const zijinlaiyuanfenixi = (params) => {
  return httpApi('/api/ITBasic/getAllMoneyByResourceTypeAndFunSource', params, 'post');
}
export const lixiangyijufenxi = (params) => {
  return httpApi('/api/ITBasic/getResourceBySysStatusAndResType', params, 'post');
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
//柱状图一级
export const barFirst = (params) => {
  return httpApi('/api/ITBasic/getBarGraphWithDeptSpecies', params, 'post');
}
//柱状图三级 省二层市三层
export const barThrid = (params) => {
  return httpApi('/api/ITBasic/getBarGraphWithDeptSpeciesByName', params, 'post');
}
//柱状图二级 
export const barSecond = (params) => {
  return httpApi('/api/ITBasic/getBarGraphWithSpecificDeptSpecies', params, 'post');
}

// 地图

export const mapDatas = (params) => {
  return httpApi('/api/ComputerRoom/getGroupByCityConstructionMoney', params, 'post');
}

// 机房详情
export const jifangDefault = (params) => {
  // return httpApi('/api/ComputerRoom/putIntoAndConstructMoney', params, 'post');
   return httpApi('/api/ComputerRoom/getComputerRoomDetailsById', params, 'post');
}
// 服务器详情
export const serversdetails = (params) => {
  return httpApi('/api/serversresource/serversdetails', params, 'post');
}