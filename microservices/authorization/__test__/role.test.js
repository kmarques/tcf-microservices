const supertest = require("supertest");
const sequelize = require("../models/index").sequelize;

const client = supertest(require("../app.js"));

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

describe("Role", () => {
  it("should create role for a specific user", async() => {
    // Given
    const givenUserId = 5;
    const givenRole = {
      role: "admin"
    };
    // When
    const response = await client
      .post("/role")
      .set("X-User-Id", givenUserId)
      .send(givenRole);
    // Then
    expect(response.status).toBe(201);
    expect(response.body.userId).toBe(givenUserId);
  });
});
