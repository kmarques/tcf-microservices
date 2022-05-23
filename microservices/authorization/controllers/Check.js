const { IAM, Role } = require("../models");
const { Op } = require("sequelize");
const { READ, WRITE } = require("../utils/constants").iamRights;

module.exports = {
  check: async (req, res) => {
    if (req.headers["x-user-role"]) {
      const userRole = await Role.findOne({
        where: { userId: req.headers["x-user-id"] },
      });
      if (!userRole || userRole.role !== req.headers["x-user-role"]) {
        return res.sendStatus(403);
      } else {
        if (req.body.checkACL === false) {
          return res.sendStatus(200);
        }
      }
    }
    const resources = req.body.originUrl.match(/\/[a-z]+\/[0-9]+/g);
    if (resources) {
      const userIAM = await IAM.findAll({
        where: {
          userId: req.headers["x-user-id"],
          [Op.or]: resources.map((resource) => {
            const [, name, id] = resource.split("/");
            return { resourceType: name, resourceId: id };
          }),
        },
      });

      for (const key in resources) {
        const resource = resources[key];
        const [, name, id] = resource.split("/");
        const iam = userIAM.find(
          (iam) =>
            console.log(
              iam,
              name,
              id,
              iam.resourceType === name && iam.resourceId === id
            ) ||
            (iam.resourceType === name && iam.resourceId === id)
        );
        console.log(userIAM);
        if (!iam) {
          return res.sendStatus(403);
        }
        if (key !== resources.length - 1) {
          if (iam.acl & (READ !== READ)) {
            return res.sendStatus(403);
          }
        } else {
          const method = req.body.method;
          const neededACL = method === "GET" ? READ : WRITE;
          if (iam.acl & (neededACL !== neededACL)) {
            return res.sendStatus(403);
          }
        }
      }
    }
    res.sendStatus(200);
  },
};
