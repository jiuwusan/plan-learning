const router = require('koa-router')();

/**
 * 查询列表
 * 
 * @param {*} ctx 
 */
const queryList = async (ctx) => {
    let result = await ctx.execSql(`select * from question`);

    ctx.body = {
        code: 0,
        msg: '成功',
        data: result
    };
}


/**
 * 定义登录接口
 * 
 * @param {*} ctx 
 */
const saveOrUpdate = async (ctx) => {
    let formData = ctx.request.body;

    ctx.body = {
        code: 0,
        msg: '成功',
        data: formData
    };
}

router.get('/queryList', queryList);

router.post('/saveOrUpdate', saveOrUpdate);

module.exports = router