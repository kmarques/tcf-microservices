require("dotenv").config();

const { User } = require("../models");
module.exports = (async () => {
  return {
    user: await User.create({
      lastname: "testing",
      firstname: "testing",
      email: `${Date.now()}@testing.com`,
      password: "testing",
    }),
  };
});
