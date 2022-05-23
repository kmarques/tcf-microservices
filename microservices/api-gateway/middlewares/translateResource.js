const Discovery = require("../utils/Discovery");
const getResource = require("../utils/getResource");

const translate = async function (obj) {
  const newObj = {};
  for (let key of Object.keys(obj)) {
    if (obj[key] instanceof Object) {
      newObj[key] = await translate(obj[key]);
      if (Array.isArray(obj[key])) {
        newObj[key] = Object.values(newObj[key]);
      }
    } else {
      const translatedUrl = Discovery.getRouteByTranslateKey(key);
      if (translatedUrl) {
        newObj[key] = await getResource(translatedUrl.replace(":id", obj[key]));
        console.log(key, newObj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

module.exports = async function (req, _, next) {
  console.log(req.body);
  req.body = await translate(req.body);
  console.log(req.body);
  next();
};
