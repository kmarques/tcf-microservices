const supertest = require("supertest");
const sequelize = require("../models/index").sequelize;
const iamFixture = require("../fixtures/iam");

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

describe("Check", () => {
  it("should check acl for a specific user", async () => {
    // Given
    const { iam } = await iamFixture();
    const givenBody = {
      method: "POST",
      originUrl: "/bil/2",
    };
    // When
    const response = await client
      .post("/")
      .set("X-User-Id", iam.userId)
      .set("X-User-Role", "admin")
      .send(givenBody);
    // Then
    console.log("BODY :", response.body);
    expect(response.status).toBe(403);
  });
});
