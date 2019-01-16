
import { SERVER_BASE_URL } from '@/http/conf.js'; // url 配置
import { httpApi, httpMock, MockUrl} from '../http/axios.js'; // 请求

export const routerInfo = (params) => {
    return httpApi('/api/webmapmodules/indexMenu', params, 'post')
}

let list = {
    httpApi,
    httpMock
}
export default list;