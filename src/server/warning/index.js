import ajax from '../getData'
let httpApi = ajax.httpApi;

// 卡片
export const getCarData = (params) => {
  return httpApi('/api/abnormal/abnormalTypeGroup', params, 'post');
}
/*资产填报预警 - 填报数据完备度卡片 */
export const completeness = (params) => {
  return httpApi('/api/abnormal/completeness', params, 'post')
}
// 地图
export const mapDatas = (params) => {
  return httpApi('/api/abnormal/cityGroup', params, 'post');
}


// 柱状图1
export const barFirst = (params) => {
  return httpApi('/api/abnormal/orgSpeciesGroup', params, 'post');
}
// 柱状图2
export const barSecond = (params) => {
  return httpApi('/api/abnormal/areanameGroup', params, 'post');
}
// 柱状图2
export const barThrid = (params) => {
  return httpApi('/api/abnormal/orgGroup', params, 'post');
}


/*资产填报预警 - 完备度图表接口 */
export const typeEmpty = (params) => {
  return httpApi('/api/abnormal/typeEmpty', params, 'post')
}
/*资产填报预警 - 资产填报预警地区分布分析 - 异常数据占比 1类型异常 2：值异常接口 */
export const typeGroup = (params) => {
  return httpApi('/api/abnormal/typeGroup', params, 'post')
}
/*资产填报预警 - 资产填报预警地区分布分析 - 填报异常数据覆盖率 */
export const cityGroup = (params) => {
  return httpApi('/api/abnormal/cityGroup', params, 'post')
}

// 折现
export const createDateGroup = (params) => {
  return httpApi('/api/abnormal/createDateGroup', params, 'post')
}
/*资产填报预警 - 完备度一级详情页 */
export const completenessTable = (params) => {
  return httpApi('/api/abnormal/completenessTable', params, 'post')
}
/* 数据完备度总数 - 地区 */
export const completenessByCity = (params) => {
  return httpApi('/api/abnormal/completenessByCity', params, 'post')
}
