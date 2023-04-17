const axios = require('axios')
const cheerio = require('cheerio')
const database = require('./database')

const HDFans = ($) => {
    let torrents = $('.torrents').children('tbody').children('tr')
    for (let i = 0; i < torrents.length; i++) {
        if (i > 0) {
            const torrent = $(torrents[i]).children('.rowfollow');
            let torrentInfo = $(torrent[1]).children('.torrentname').children('tbody').children('tr').children('td')
            console.log('torrentInfo--',torrentInfo)
        }
    }

    return []
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