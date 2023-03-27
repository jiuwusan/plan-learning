const router =  require('koa-router')();
const user = require('../contoller/user');
const question = require('../contoller/question');

router.use('/user', user.routes(), user.allowedMethods());
router.use('/question', question.routes(), question.allowedMethods());

module.exports = router;