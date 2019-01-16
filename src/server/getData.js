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