import request from './request'

import { ApiGenerator } from 'fe-core'

const { genApi } = new ApiGenerator(request, '/apiv1', (config) => {
    console.log('config-----', config);
    return config
}, (res) => {
    console.log('code-----', res.data.code);
    // if (res.data.code !== 0) throw new Error(res.data.msg)
    return res.data.data
});


/**
 * Api 字典
 */
const questionApi = genApi({
    // 获取列表
    queryList: '/question/queryList',
    // 保存
    saveOrUpdate: 'POST /question/saveOrUpdate',
    // 检验
    exam: {
        withoutAuth: false,
        method: 'POST',
        url: '/question/exam'
    }
})

const API = {
    questionApi
}

export default API