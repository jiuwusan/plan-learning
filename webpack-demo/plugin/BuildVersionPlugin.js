/**
 * 自定义 版本控制 插件
 */
class BuildVersionPlugin {
    constructor() {

    }
    apply(compiler) {
        compiler.hooks.emit.tap('BuildVersionPlugin', compilation => {
            // compilation 为此次打包上下文
            for (const name in compilation.assets) {
                if (Object.hasOwnProperty.call(compilation.assets, name)) {
                    // console.log(name, compilation.assets[name].source())
                    console.log('BuildVersionPlugin--',name)
                    // 通过 source，size 对内容进行操作
                    // compilation.assets[name].source() // 内容
                    // compilation.assets[name].size() // 内容长度
                }
            }
        })
    }
}

module.exports = BuildVersionPlugin