import axios from 'axios'

/**
 * Api 构造器
 */
export default class ApiGenerator {
    /**
     * 
     * @param {*} baseURL 根路径
     * @param {*} dicts 字典，一个数组
     * @param {*} transformRequest 修改请求数据 (config)=>{}
     * @param {*} transformResponse 修改响应数据 (res)=>{}
     */
    constructor(baseURL, transformRequest, transformResponse) {
        this.instance = axios.create({
            baseURL,
            timeout: 1000
        });
        this.instance.interceptors.request.use(transformRequest);
        this.instance.interceptors.response.use(transformResponse);
    }

    /**
     * 处理参数
     * @param {*} api 
     * @returns 
     */
    analytical = (api) => {
        let option;
        switch (Object.prototype.toString.call(api)) {
            case '[object Object]':
                option = api;
                break;
            case '[object String]':
                let apiArr = api.replace(/\ +/g, ' ').split(' ');
                switch (apiArr.length) {
                    case 1:
                        option = { method: 'get', url: apiArr[0] }
                        break;
                    case 2:
                        option = { method: apiArr[0], url: apiArr[1] }
                        break;
                }
                break;
        }

        if (!option)
            throw new Error(`${api} --> 参数异常`)
        
        option.method = option.method.toLowerCase();

        return (data = {}, params = {}) => {

            if (option.method === 'get') {
                params = data;
                data = {};
            }

            params = params || {};

            return this.instance.request({
                ...option,
                data,
                params
            })
        }
    }

    genApi = (apis) => {
        const API = {};

        if (Object.prototype.toString.call(apis) === '[object Object]')
            //开始构建
            for (const key in apis) {
                if (Object.hasOwnProperty.call(apis, key)) {
                    API[key] = this.analytical(apis[key])
                }
            }

        return API
    }
}