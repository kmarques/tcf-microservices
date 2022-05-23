const fetch = require("node-fetch");
const Discovery = require("./Discovery");

module.exports = async (url) => {
  // /products/1
  const [, resourceType, resourceId] = url.split("/");
  const urlTo = Discovery.getRoute(
    "/" + resourceType + "/:id"
  ).forwardUrl.replace(":id", resourceId);
  console.log("Forwarding request to", urlTo);
  const response = await fetch(urlTo);
  if (response.status === 404) {
    // Resource not found
    return null;
  } else {
    return await response.json();
  }
};
