const router = require('koa-router')();
const pt = require('../service/pt')

const search = async (ctx) => {
    ctx.body = {
        code: 0,
        msg: '成功',
        data: await pt.queryTorrents()
    }
}

router.get('/search', search);

module.exports = router