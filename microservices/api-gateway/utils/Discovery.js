const fs = require("fs/promises");
const routesParsed = {};
let translationsParsed = {};

module.exports = {
  config: async (app) => {
    const { forwardRequest, ...middlewares } = require("../middlewares");
    const router = require("express").Router();
    const files = await fs.readdir(__dirname + "/../services");
    for (const file of files) {
      const service = require(`../services/${file}`);
      let {
        baseUrl,
        keepBaseUrl = false,
        endpoint,
        routes,
        middlewares: serviceMiddlewares,
        translations,
      } = service;
      endpoint = process.env[endpoint] ?? endpoint;
      for (const route of routes) {
        const { method, path, middlewares: routeMiddlewares, basePath } = route;
        const forwardUrl = endpoint + (keepBaseUrl ? baseUrl : "") + path;
        let effectiveMiddlewares = routeMiddlewares ?? serviceMiddlewares ?? [];
        console.log(
          `Forwarding ${method} ${
            basePath || baseUrl + path
          } to ${method} ${forwardUrl} with middlewares [${effectiveMiddlewares}] keeping baseUrl: ${keepBaseUrl}`
        );
        effectiveMiddlewares = effectiveMiddlewares.map(
          (mid) => middlewares[mid]
        );
        router[method.toLowerCase()](
          basePath || baseUrl + path,
          ...effectiveMiddlewares,
          forwardRequest(forwardUrl)
        );
        routesParsed[baseUrl + path] = {
          method,
          forwardUrl,
        };
      }
      translationsParsed = { ...translationsParsed, ...translations };
    }
    app.use(router);
  },
  getRoute: (url) => {
    console.log("**** getRoute", url, Object.keys(routesParsed));
    return routesParsed[url];
  },
  getRouteByTranslateKey: (key) => {
    return translationsParsed[key];
  },
};
