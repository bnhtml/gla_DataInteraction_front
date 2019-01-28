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
/* 数据上架 已发布数据接口 API基本信息 查看数据上架已封装数据接口单条数据详情 */
export const query_resources = (params) => {
    return httpApi('/new_interface/query_resources', params, 'post')
}
/* 数据上架 已发布数据接口 API参数 */
export const api_desc = (params) => {
    return httpApi('/new_interface/api_desc', params, 'post')
}
/* 数据上架 已发布数据接口 API使用情况 */
export const api_status = (params) => {
    return httpApi('/new_interface/api_status', params, 'post')
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
/* 数据上架 更新数据源 */
export const update_tabMsg = (params) => {
    return httpApi('/new_interface/metadata_synchro', params, 'post')
}
/* 数据上架 查看接口说明文档（点击后直接打开文档） */
export const get_interfaceFile = (params) => {
    return httpApi('/new_interface/get_interfaceFile', params, 'post')
}

/* 系统管理  数据区管理 数据库类查询 */
export const query_databaseClass = (params) => {
    return httpApi('/new_interface/query_databaseClass', params, 'post')
}
/* 系统管理  数据区管理 数据表查询 */
export const query_table = (params) => {
    return httpApi('/new_interface/query_table', params, 'post')
}
/* 系统管理  数据区管理 查询文件 */
export const query_file = (params) => {
    return httpApi('/new_interface/query_file', params, 'post')
}

// 接口发布

export const interface_commit = (params) => {
    return httpApi('/new_interface/interface_commit', params, 'post')
}
// 测试apikey
export const testApikey = (params) => {
    return httpApi('/new_interface/testApikey', params, 'post')
}

// 删除接口文档  del_interfaceFile
export const del_interfaceFile = (params) => {
    return httpApi('/new_interface/del_interfaceFile', params, 'post')
}