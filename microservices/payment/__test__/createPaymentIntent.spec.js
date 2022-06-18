const supertest = require("supertest");
const app = require("../index");
const client = supertest(app);

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
    expect(response.body.clientSecret).toContain("pi_3LC");
  });
});
