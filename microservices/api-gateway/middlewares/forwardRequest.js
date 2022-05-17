const fetch = require("node-fetch");
module.exports = function forwardRequest(url) {
  return async (req, res) => {
    const fetchOptions = {
      method: req.method,
      headers: {},
    };
    if (["PUT", "POST", "PATCH"].includes(req.method)) {
      fetchOptions.body = JSON.stringify(req.body);
      fetchOptions.headers["Content-Type"] = "application/json";
    }
    if (req.user) {
      fetchOptions.headers["X-User-Id"] = req.user.id;
    }
    if (req.headers["authorization"]) {
      fetchOptions.headers["Authorization"] = req.headers["authorization"];
    }
    const response = await fetch(url, fetchOptions);
    console.log(url, response.status, response.body.length);
    if ([200, 201, 400].includes(response.status))
      res.status(response.status).json(await response.json());
    else res.sendStatus(response.status);
  };
};
