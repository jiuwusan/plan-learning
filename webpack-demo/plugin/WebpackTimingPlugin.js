
/**
 * 自定义 版本控制 插件
 */
class WebpackTimingPlugin {
    constructor() {}
    apply(compiler) {
        compiler.hooks.emit.tap('BuildVersionPlugin', compilation => {
            
        })
    }
}

module.exports = WebpackTimingPlugin