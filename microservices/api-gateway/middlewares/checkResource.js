const getResource = require("../utils/getResource");

module.exports = async function (req, res, next) {
  // /products/1/stock
  let resources = req.url.match(/\/[a-z]+\/[0-9]+/g);
  if (resources) {
    resources = await Promise.all(
      resources.map((resource) => getResource(resource))
    );
    if (resources.some((resource) => resource === null)) {
      res.sendStatus(404);
    } else {
      // Resource OK
      next();
    }
  } else {
    res.sendStatus(500);
    console.error("Url not matching regex: [a-z]+/[0-9]+", req.url);
  }
};
