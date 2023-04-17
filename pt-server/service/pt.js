const axios = require('axios')
const cheerio = require('cheerio')
const database = require('./database')

const HDFans = ($) => {
    let torrents = [];
    let trs = $('.torrents').children('tbody').children('tr')
    for (let i = 0; i < trs.length; i++) {
        if (i > 0) {
            let torrent = {};
            const tds = $(trs[i]).children('.rowfollow');
            let torrentInfo = $(tds[1]).children('.torrentname').children('tbody').children('tr').children('td')
            // 英文标题
            torrent.title = $(torrentInfo[0]).children('a').attr('title')
            // 是否免费
            torrent.free2x = $(torrentInfo[0]).find('.pro_free2up').length > 0;
            torrent.free = $(torrentInfo[0]).find('.pro_free').length > 0
            if (torrent.free) {
                // 免费剩余时间
                torrent.expires = $(torrentInfo[0]).find('.pro_free').next().children('span').attr('title')
            }
            // label
            torrent.label = []
            $(torrentInfo[0]).find('br').nextAll('span').each((i, elem) => {
                torrent.label.push($(elem).text())
            })
            // 中文名称
            let lastText = $(torrentInfo[0]).children().last().text()
            torrent.chinese = $(torrentInfo[0]).text();
            torrent.chinese = torrent.chinese.substring(torrent.chinese.indexOf(lastText) + lastText.length)
            // 下载链接
            torrent.download = $(torrentInfo[2]).children('a').attr('href')
            // 来源
            torrent.source = 'HDFans'
            // id
            torrent.uid = torrent.download.split('?id=')[1]
            torrents.push(torrent);
        }
    }

    return torrents
}

const processing = {
    HDFans
}

const queryTorrents = async () => {
    let websites = database.website();
    let torrents = [];
    for (const name in websites) {
        if (Object.hasOwnProperty.call(websites, name)) {
            const item = websites[name];
            const result = await axios.get('https://hdfans.org/torrents.php', {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36',
                    'cookie': item.cookie
                }
            })
            const $ = await cheerio.load(result.data);
            torrents.push.apply(torrents, processing[name]($));
        }
    }

    return torrents
}


// 轮询
const polling = () => {
    console.log('开始轮询');
}

module.exports = {
    polling,
    queryTorrents
}