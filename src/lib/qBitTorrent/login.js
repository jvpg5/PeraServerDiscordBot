require("dotenv").config();

async function login() {
  const url = process.env.QBITTORRENT_HOST;
  const username = process.env.QBITTORRENT_USERNAME;
  const password = process.env.QBITTORRENT_PASSWORD;

  let details = {
    username: username,
    password: password,
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
    },
    body: formBody,
  };
  const cookies = await fetch(`${url}/api/v2/auth/login`, config).then(
    (response) => {
      return response.headers.get("set-cookie");
    }
  );
  //console.log(SID);
  return cookies;
}

//login()
module.exports = login;
