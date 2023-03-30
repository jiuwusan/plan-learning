import ApiGenerator from './ApiGenerator'

const { genApi } = new ApiGenerator('/apiv1', (config) => config, (res) => res);

/**
 * Api 字典
 */
const questionApi = {
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
}

export default {
    questionApi: genApi(questionApi)
}