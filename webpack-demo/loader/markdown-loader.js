
/**
 * 转换函数
 * 
 * @param {*} source 
 * @returns 
 */
const markToHtml = (source) => {
    // to do ...
    let html = '<h1>About</h1><p>this is a markdown file.</p>'
    return html
}

/**
 * 自定义 markdown loader
 * 
 * @param {*} source 文件来源
 */
const markdownLoader = (source) => {
    // 1. 将 markdown 转换为 html 字符串
    const html = markToHtml(source)
    // 2. 将 html 字符串拼接为一段导出字符串的 JS 代码
    const code = `module.exports = '<span class="hljs-subst">${JSON.stringify(html)}</span>'`
    // const code = `export default '<span class="hljs-subst">${JSON.stringify(html)}</span>'`
    return code // commonjs OR ES Module
}

module.exports = markdownLoader
