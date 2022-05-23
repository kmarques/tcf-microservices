const getResource = require("../utils/getResource");

module.exports = async function (req, res, next) {
  // ["/orders/9"]
  const resourcesUrl = req.url.match(/\/[a-z]+\/[0-9]+/g);
  if (resourcesUrl) {
    // [{id: 9, total: 10}]
    const resourcesObj = await Promise.all(
      resourcesUrl.map((resource) => getResource(resource))
    );
    console.log(resourcesUrl, resourcesObj);
    if (resourcesObj.some((resource) => resource === null)) {
      res.sendStatus(404);
    } else {
      // Resource OK
      const objs = resourcesUrl.reduce((obj, resource, index) => {
        const [, resourceType] = resource.split("/");
        obj[resourceType.replace(/s$/, "")] = resourcesObj[index];
        return obj;
      }, {});
      req.body = { ...req.body, ...objs };
      console.log(req.body);
      next();
    }
  } else {
    res.sendStatus(500);
    console.error("Url not matching regex: [a-z]+/[0-9]+", req.url);
  }
};
