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

describe("User", () => {
  it("should return all the users", async () => {
    // Given
    // When
    const response = await client.get("/users");
    // Then
    expect(response.status).toBe(200);
    expect(response.body).instanceOf(Array);
  })
});
