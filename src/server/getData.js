import { SERVER_BASE_URL } from '@/http/conf.js'; // url 配置
// import { httpApi, httpMock, MockUrl } from '../http/axios.js'; // 请求

import fetch from '../http/fetch.js'; // 请求

const MockUrl = 'http://39.107.233.177:36743'; // MockUrl

const httpApi = (url, reqParams, type, dataType) => {
    let _lmsBaseUrl = SERVER_BASE_URL
    if (url.indexOf('http') === -1) { url = _lmsBaseUrl + url }
    return fetch(url, reqParams, type, dataType)
}
const httpMock = (url, reqParams, type) => {
    let _lmsBaseUrl = MockUrl
    if (url.indexOf('http') === -1) { url = _lmsBaseUrl + url }
    return fetch(url, reqParams, type)
}
// 获取服务目录 一级
export const get_firstdir = (params) => {
    return httpApi('/new_interface/get_firstdir', params, 'post')
}
// 获取服务目录 二级
export const get_seconddir = (params) => {
    return httpApi('/new_interface/get_seconddir', params, 'post')
}
// 获取服务目录 三级
export const get_thirddir = (params) => {
    return httpApi('/new_interface/get_thirddir', params, 'post')
}
// 提交（封装接口）
export const submit_interface = (params) => {
    return httpApi('/new_interface/make_interface', params, 'post')
}

// 获取部门区域信息
export const getdep_region = (params) => {
    return httpApi('/new_interface/getdep_region', params, 'post')
}
// 获取部门信息
export const get_depart = (params) => {
    return httpApi('/new_interface/get_depart', params, 'post')
}
// 组织机构搜索功能
export const sear_depcode = (params) => {
    return httpApi('/new_interface/sear_depcode', params, 'post')
}

/* 数据上架 已发布数据接口 查询 */
export const getDone_interface = (params) => {
    return httpApi('/new_interface/getDone_interface', params, 'post')
}
/* 数据上架 已发布数据接口 查看数据上架已封装数据接口单条数据详情 */
export const query_resources = (params) => {
    return httpApi('/new_interface/query_resources', params, 'post')
}
/* 数据上架 未发布数据接口 查询未发布接口 */
export const getUnpublished_interface = (params) => {
    return httpApi('/new_interface/getUnpublished_interface', params, 'post')
}
/* 数据上架 未发布数据接口 提交（封装接口） */
export const make_interface = (params) => {
    return httpApi('/new_interface/getUnpublished_intemake_interfacerface', params, 'post')
}
/* 数据上架 未发布数据接口 提交（封接口文件模板下载装接口） */
export const template_download = (params) => {
    return httpApi('/new_interface/template_download', params, 'post')
}
// 三级目录（用系统管理-接口路径管理中的接口）
/* 数据上架 未发布数据接口 上传接口文件 */
export const upload_interFile = (params) => {
    return httpApi('/new_interface/upload_interFile', params, 'post')
}
// 提交（见封装接口下的“提交”）
/* 数据上架 未发布数据接口 sql语句测试 */
export const sql_test = (params) => {
    return httpApi('/new_interface/sql_test', params, 'post')
}
/* 数据上架 未发布数据接口 生成sql语句 */
export const make_sql = (params) => {
    return httpApi('/new_interface/make_sql', params, 'post')
}
/* 数据上架 未发布数据接口 获取数据源 字段信息 */
export const get_fieldMsg = (params) => {
    return httpApi('/new_interface/get_fieldMsg', params, 'post')
}
/* 数据上架 未发布数据接口 获取数据源 表信息 */
export const get_tabMsg = (params) => {
    return httpApi('/new_interface/get_tabMsg', params, 'post')
}