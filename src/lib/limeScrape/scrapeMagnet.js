const cheerio = require("cheerio")
const axios = require("axios")

const torrentSite = "https://www.limetorrents.lol";

async function scrapeMagnet(href) {
    const url = torrentSite + href;

    const axiosResponse = await axios.request({
        method: "GET",
        url: url,
        headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    });

    const $ = cheerio.load(axiosResponse.data);

    const magnet = $(".downloadarea").eq(1).find(".dltorrent a").attr("href");

    //console.log(magnet);
    return magnet;
}

//scrapeMagnet("/Fallen-Angels-(1995)-(1080p)-[BluRay]-[5%201]-[YTS-MX]-torrent-14567516.html")

module.exports = scrapeMagnet;