import axios from 'axios';
import { SERVER_BASE_URL } from '../http/conf';
const baseUrl = SERVER_BASE_URL; 
const MockUrl = 'http://39.107.233.177:36743';

// var fd = new FormData();
// fd.append('file', params);

let axiosCase = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
axiosCase.defaults.timeout = 6000;
axiosCase.defaults.retry = 3;
axiosCase.defaults.retryDelay = 3000;
axiosCase.interceptors.request.use(config => {
    //显示loading
    return config
}, error => {
    return Promise.reject(error)
})
axiosCase.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    if (!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function () {
        return axios(config);
    });
});
function fetch(host){
    return (url, params, type) => {
        if (url.indexOf('http') === -1) { url = host + url } else { url = url; }
        return new Promise(function (resolve, reject) {
            axiosCase[type.toLowerCase()](url, params).then(
                (res) => {
                    if (res.status == 200||res.state == 200) {
                        if(res.data.code === 200){
                            resolve(res.data.result);
                        }else{
                            reject(res.data.msg);
                        }
                    } else {
                        reject(err)
                        // 可根据后台errCode进行具体提示  后续和后台对接
                    }
                }
            ).catch(
                (err) => {
                    // console.log(err.status)
                    reject(err.status);
                }
            )
        })
    }
}
const httpApi = fetch(baseUrl);
const httpMock = fetch(MockUrl)
export {
    httpApi,
    httpMock,
    MockUrl
}