const cheerio = require("cheerio")
const axios = require("axios")

const torrentSite = "https://www.limetorrents.lol/search/all/";

function transformMovieName(movieName){
    const str = movieName.replace(/\s+/g, '-');
    return str;
}
 
async function scrapeList(movieName) {
    const url = torrentSite + transformMovieName(movieName) + "/seeds/1/"
    const lista = [];
    const axiosResponse = await axios.request({
        method: "GET",
        url: url,
        headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    });

    const $ = cheerio.load(axiosResponse.data);
    //console.log($);
    
    const tableList = $(".table2").find("tbody");
    $(".table2").find("tbody tr").each((index, element) => {
        //console.log(element);
        if(index == 0) return;
        const href = $(element).find(".tdleft .tt-name").find("a").eq(1).attr("href");
        const title = $(element).find(".tdleft .tt-name").find("a").eq(1).text();
        const size = $(element).find(".tdnormal").eq(1).text();
        const seed = $(element).find(".tdseed").text();
        //console.log(size);
        const itemLista = {
            title: title, href: href, size: size, seed: seed
        }

        lista.push(itemLista);
    });
    
    
    return lista;
}

module.exports = scrapeList;