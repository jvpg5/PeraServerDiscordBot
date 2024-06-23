const url = 'https://api.ipify.org';
const options = {
  method: "GET",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
}

async function RetornaIp () {
  let ip;
  await fetch(url, options)
    .then((response) => response.text())
    .then((data)=> {
      ip = data;
      //console.log(ip);
    })
  return ip;
}

module.exports = RetornaIp;