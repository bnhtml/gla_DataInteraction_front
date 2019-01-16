import ajax from '../getData'
let httpApi = ajax.httpApi;

/*-------------------  全省各地区全国统建系统分析 --------------------- */
/*业务系统  各地区全国统建系统数量 */
export const getSfQgtzCityGroup = (params) => {
    return httpApi('/api/system/sfQgtzCityGroup', params, 'post');
}
/*业务系统  贵州省各地区全国统建系数量 */
export const sfQgtzCityOrder = (params) => {
    return httpApi('/api/system/sfQgtzCityOrder', params, 'post');
}
/*********业务系统建设状态分析   数据安全要求 ********/
export const getSjaqYqGroup = (params) => {
    return httpApi('/api/system/sjaqYqGroup', params, 'post');
}

/*----------------------------------  省直部门全国建系统分析 -------------------- */
/*业务系统  各部门全国统建系统数量 */
export const getSfQgtzOrgNmGroup = (params) => {
    return httpApi('/api/system/sfQgtzOrgNmGroup', params, 'post');
}
/*业务系统  贵州省各部门全国统建系数量 */
export const getSfQgtzOrgNmOrder = (params) => {
    return httpApi('/api/system/sfQgtzOrgNmOrder', params, 'post');
}

/*----------------------------------  页面下面其他的部分 -------------------- */
/*业务系统  信息系统部署方式统计 全省地区接口 */
export const getOptModeCityGroup = (params) => {
    return httpApi('/api/system/optModeCityGroup', params, 'post');
}
/*业务系统  信息系统部署方式统计 省直部门接口 */
export const getOptModeOrgGroup = (params) => {
    return httpApi('/api/system/optModeOrgGroup', params, 'post');
}
/*业务系统  业务系统建设状态分布 */
export const getSysStatusGroup = (params) => {
    return httpApi('/api/system/sysStatusGroup', params, 'post');
}

/*业务系统  业务系统分布情况 */
export const getSysFbGroup = (params) => {
    return httpApi('/api/system/sysFbGroup', params, 'post');
}
/*业务系统  业务系统承载网络分析 -各市区部署网络 */
export const getBearerNetworkCityGroup = (params) => {
    return httpApi('/api/system/bearerNetworkCityGroup', params, 'post');
}
/*业务系统  业务系统承载网络分析 -各部门部署网络 */
export const getBearerNetworkOrgGroup = (params) => {
    return httpApi('/api/system/bearerNetworkOrgGroup', params, 'post');
}

/*业务系统  全省各地区系统建设费用排名 */
export const cityTrjeOrder = (params) => {
    return httpApi('/api/system/cityTrjeOrder', params, 'post');
}

