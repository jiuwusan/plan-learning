import ApiGenerator from './ApiGenerator'

const { genApi } = new ApiGenerator('http://localhost:8090', (config) => config, (res) => {
    if (res.data.code !== 0) throw new Error(res.data.msg)
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

const API ={
    questionApi
}


export default API