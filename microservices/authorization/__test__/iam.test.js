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

describe("IAM", () => {
  it("should create IAM for a specific user", async() => {
    // Given
    const givenUserId = 2;
    const givenIAM = {
      resourceType: "baw",
      resourceId: 2,
      acl: 2,
    };
    // When
    const response = await client
      .post("/iam")
      .set("X-User-Id", givenUserId)
      .send(givenIAM);
    // Then
    expect(response.status).toBe(201);
    expect(response.body.userId).toBe(givenUserId);
  });
});
