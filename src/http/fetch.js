
'user strict';
import appBase from '../../static/common/app_base.js';
import router from '../router/index';
// import {SERVER_BASE_URL} from '../http/config';
let SERVER_BASE_URL = '';
let createXMLHttp = function () {
    // 创建一个新变量并赋值false，使用false作为判断条件说明还没有创建XMLHTTPRequest对象
    var flag = true
    var xmlhttp = null
    try {
        xmlhttp = new XMLHttpRequest()// 尝试创建 XMLHttpRequest 对象，除 IE 外的浏览器都支持这个方法。
    } catch (e) {
        try {
            xmlhttp = window.ActiveXobject('Msxml12.XMLHTTP')// 使用较新版本的 IE 创建 IE 兼容的对象（Msxml2.XMLHTTP）
        } catch (e1) {
            try {
                xmlhttp = window.ActiveXobject('Microsoft.XMLHTTP')// 使用较老版本的 IE 创建 IE 兼容的对象（Microsoft.XMLHTTP）。
            } catch (e2) {
                flag = false
            }
        }
    }

    // 判断是否成功的例子：
    if (!flag) {
        console.log('创建XMLHTTPRequest 对象失败')
        return null
    } else {
        return xmlhttp
    }
}

let submitForm = function (url, type, bodyContent,dataType) {
    return new Promise((resolve, reject) => {
        let requestObj = createXMLHttp()
        requestObj.open(type, url, true)
        requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')//application/x-www-form-urlencoded  application/json
        if (url.indexOf('/api/auth/refreshToken') > -1) {
            let token = JSON.parse(appBase.getLocalItem("token"));
            requestObj.setRequestHeader('X-Authorization', token.refreshToken)//refreshToken
        } else if (url.indexOf('/api/') > -1) {
            let token = JSON.parse(appBase.getLocalItem("token"));
            if (token) {
                requestObj.setRequestHeader('X-Authorization', token.token)//refreshToken
            }
        }
        if(dataType === 'byte'){
            requestObj.responseType = "blob";
        }
        requestObj.send(bodyContent)

        requestObj.onreadystatechange = function handler() {
            if (this.readyState !== 4) { return }
            let obj = requestObj.response;
            //如果是数据流直接返回
            if(dataType === 'byte'){
                resolve(obj);
                return;
            }
            //如果是JSON格式，先强转在返回
            if (obj && typeof obj !== 'object' && dataType === 'json') {
                obj = JSON.parse(obj);
            }
            if (this.status === 200) {
                if (obj.status === 200) {
                    resolve(obj.result)
                } else {
                    reject(obj.msg)
                }
            } else if (this.status === 401 && window.apiFirst) {
                window.apiFirst = false;
                actionRequiresAuth();
            } else if (this.status === 403) {
                alert(obj.msg);
                failJump();
            } else if (this.status === 417) {
                alert(obj.msg);
                failJump();
            } else {
                window.localStorage.setItem('network', '网络错误')
                reject(this.statusText)
            }
        }
    })
}

export default async (url = '', data = {}, type = 'POST', dataType = "json") => {
    // botyT=form|json
    // bodyT = bodyT.toUpperCase()
    type = type.toUpperCase();
    // 处理从一张图跳到具体统计页面的参数
    let hash = location.hash;
    let nowClickPage = window.sessionStorage.getItem('openUrl');
    if (nowClickPage){
        let { sysOrgCode = []} = JSON.parse(window.localStorage.getItem('checked') || '{}');
        if (sysOrgCode.length === 0 && window.localStorage.getItem('allOrg')){
            sysOrgCode = JSON.parse(window.localStorage.getItem('allOrg'));
        }
        window.sysOrgCode = sysOrgCode;
        data = Object.assign({ sysOrgCode: sysOrgCode.toString() }, data);
    }
    // 1:修正url
    if (url.indexOf('?') < 0) { url += '?' }
    let endChar = url.substring(url.length - 1)
    if (endChar !== '&' && endChar !== '?') { url += '&' }
    url = url + '_t=' + (new Date()).getTime()
    // 2：修改请求参数
    let dataStr = '' // 数据拼接字符串
    let dataSp = ''
    for (let key in data) {
        dataStr += dataSp + key + '=' + encodeURIComponent(data[key])
        dataSp = '&'
    }
    let bodyContent = ''
    if (dataStr !== '') {
        if (type === 'GET') {
            url = url + '&' + dataStr
        } else if (type === 'POST') {
            bodyContent = dataStr
            // if (bodyT === 'JSON') {
            //     bodyContent = JSON.stringify(data)
            // }
        }
    }
    return await submitForm(url, type, bodyContent,dataType)
}

let refreshToken = function (success, fail) {
    console.log('IS')
    let url = '/api/auth/refreshToken';
    let _lmsBaseUrl = SERVER_BASE_URL
    if (url.indexOf('http') === -1) { url = _lmsBaseUrl + url }
    let rt = submitForm(url, 'GET', "", 'json');
    function handleSuccess(res) {
        appBase.setLocalItem("token", JSON.stringify(res.token));
        success();
    }
    function handleError(res) {
        console.log(res);
        console.log('失败，是不是令牌过期了')
        console.log(this);
        console.log(router)
        router.push('/login')
        fail();
    }
    rt.then(handleSuccess, handleError)
};

function succJump() {
    location.reload();
    console.log("token刷新成功了，继续使用");
}
function failJump() {
    // token不存在时
    console.log("token刷新失败了，请先登录");
    // if (window.location.hash === '#login')return;

    let url = "";
    let hostname = window.location.hostname;
    let port = window.location.port;
    let pathname = window.location.pathname;
    if (pathname && pathname != '/') {
        url = "http://" + hostname + ":" + port + "" + pathname + "#/login";
    } else {
        url = "http://" + hostname + ":" + port + "/#/login";
    }

    window.location.href = url;
}

export function actionRequiresAuth() {
    let token = appBase.getLocalItem("token");
    if (token != null && token != undefined) {
        token = JSON.parse(token);
        let expirationTime = token.expirationTime;
        //let refExpirationTime = expirationTime + 1800;//
        let refExpirationTime = token.refreshExpTime;
        let issuedAt = token.issuedAt;
        // Number(expirationTime) - Number(issuedAt) > 1 * 60 
        const dateTime = new Date().getTime();
        let timestamp = Math.floor(dateTime / 1000);
        console.log(timestamp, expirationTime, refExpirationTime);
        if (expirationTime - timestamp <= 0 && refExpirationTime - timestamp > 0) {
            function success() {
                succJump();
            }
            function fail() {
                appBase.clearLocalItem();
                failJump();
            }
            refreshToken(success, fail);
        } else if (expirationTime - timestamp <= 0 && refExpirationTime - timestamp <= 0) {
            console.log('aaa')
            failJump();
        } else {
            succJump();
        }
    } else {
        failJump();
    }
}