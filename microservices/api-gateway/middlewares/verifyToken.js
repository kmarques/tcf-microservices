const fetch = require("node-fetch");

const cache = {};

module.exports = async function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.sendStatus(401);
  }
  if (false && cache[token]) {
    console.log(
      "verifyToken",
      cache[token].exp > Date.now(),
      cache[token].exp,
      Date.now()
    );
    if (cache[token].exp > Date.now()) {
      req.user = cache[token];
      return next();
    } else {
      delete cache[token];
      return res.sendStatus(401);
    }
  }
  const response = await fetch(
    process.env.AUTHENTICATION_URL + "/verify-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  if (response.status === 200) {
    req.user = await response.json();
    cache[token] = req.user;
    return next();
  }
  return res.sendStatus(401);
};
