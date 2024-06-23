require("dotenv").config();
const login = require("./login.js");

async function addTorrent(cookies, magnet) {
  const url = process.env.QBITTORRENT_HOST;

  let details = {
    urls: magnet,
    savepath: `${process.env.MOVIE_PATH}`,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const config = {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": `${url}`,
      "Cookie": cookies,
    },
    body: formBody,
  };
  
  const response = await fetch(`${url}/api/v2/torrents/add`, config);

  return response;
}

// const testfunc = async () => {

// let magnet = 'magnet:?xt=urn:btih:7CB4EEF7BEC029B0274516B893D4670519967D79&amp;dn=A+Clockwork+Orange+%281971%29+1080p+BRRip+-+aaryan&amp;tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&amp;tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&amp;tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451&amp;tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&amp;tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.open-internet.nl%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Fopen.demonii.si%3A1337%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Fdenis.stalker.upeer.me%3A6969%2Fannounce&amp;tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce'
// let cookies = await login();

// addTorrent(cookies, magnet);

// }

// testfunc()

module.exports = addTorrent;