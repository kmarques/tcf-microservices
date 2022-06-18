const supertest = require("supertest");
const sequelize = require("../models/index").sequelize;
const app = require("../index");
const client = supertest(app);

beforeEach(async () => {
  sequelize.constructor._cls = new Map();
  sequelize.constructor._cls.set("transaction", await sequelize.transaction());
});

afterEach(async () => {
  await sequelize.constructor._cls.get("transaction").rollback();
  sequelize.constructor._cls.delete("transaction");
});

afterAll(async () => {
  await sequelize.close();
});

describe("Create payment intent", () => {
  it("POST /payment", async () => {
    const body = {
      orderId: 1,
      total: 10000,
    };

    const response = await client.post("/payment").send(body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("clientSecret");
    expect(response.body).toHaveProperty("totalPrice");
    expect(response.body.totalPrice).toBe(body.total);
    expect(response.body.clientSecret).toContain("pi_3LC2");
  });
});
