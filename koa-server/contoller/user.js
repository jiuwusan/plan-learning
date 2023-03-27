const router = require('koa-router')();

/**
 * 定义登录接口
 * 
 * @param {*} ctx 
 */
const login = async (ctx) => {
    let reqBody = ctx.request.body;

    ctx.body = {
        code: 0,
        msg: '成功'
    };
}

/**
 * 定义登录接口
 * 
 * @param {*} ctx 
 */
const queryUserInfo = async (ctx) => {
    let result = await ctx.execSql(`select * from question`);
    ctx.body = {
        code: 0,
        msg: '成功',
        data: result
    };
}

router.post('/login', login);

router.get('/queryUserInfo', queryUserInfo);

module.exports = router