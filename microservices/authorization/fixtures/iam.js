require("dotenv").config();

const { IAM } = require("../models");
module.exports = async () => {
  return {
    iam: await IAM.create({
      userId: 28,
      resourceType: "bil",
      resourceId: 2,
      acl: 2,
    }),
  };
};
