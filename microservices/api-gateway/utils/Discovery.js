const fs = require("fs/promises");
const { forwardRequest, ...middlewares } = require("../middlewares");

module.exports = async (app) => {
  const router = require("express").Router();
  const files = await fs.readdir(__dirname + "/../services");
  for (const file of files) {
    const service = require(`../services/${file}`);
    let {
      baseUrl,
      keepBaseUrl,
      endpoint,
      routes,
      middlewares: serviceMiddlewares,
    } = service;
    endpoint = process.env[endpoint] ?? endpoint;
    for (const route of routes) {
      const { method, path, middlewares: routeMiddlewares } = route;
      const forwardUrl = endpoint + (keepBaseUrl ? baseUrl : "") + path;
      let effectiveMiddlewares = routeMiddlewares ?? serviceMiddlewares ?? [];
      console.log(
        keepBaseUrl,
        `Forwarding ${method} ${baseUrl}${path} to ${method} ${forwardUrl} with middlewares [${effectiveMiddlewares}]`
      );
      effectiveMiddlewares = effectiveMiddlewares.map(
        (mid) => middlewares[mid]
      );
      router[method.toLowerCase()](
        baseUrl + path,
        ...effectiveMiddlewares,
        forwardRequest(forwardUrl)
      );
    }
  }
  app.use(router);
};
