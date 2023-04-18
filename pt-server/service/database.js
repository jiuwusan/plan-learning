const path = require('path');
const fs = require('fs');

let DATAJSON

const genPath = (p) => {
    let root = (__dirname + '').replace(/(\\|\/)service/, '')
    return path.join(root, p);
}

const database = () => {
    if (!DATAJSON) {
        try {
            let databasePath = genPath('/database/data.json');
            let dataStr = fs.readFileSync(databasePath, 'utf8');
            DATAJSON = JSON.parse(dataStr);
        } catch (error) {
            console.log('数据库读取失败');
        }
    }
    return DATAJSON || {}
}

/**
 * 获取网站列表
 * @returns 
 */
const website = () => {
    return database().website || []
}

module.exports = {
    database,
    website
}