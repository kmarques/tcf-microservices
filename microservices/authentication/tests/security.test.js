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

describe("Security", () => {
  it("creates a user and returns it in the body of the response", async () => {
    // Given
    const givenUser = {
      lastname: "hey",
      firstname: "hey",
      email: "hey@hey.com",
      password: "hey",
    };
    // When
    const response = await client.post("/register").send(givenUser);
    // Then
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.lastname).toBe(givenUser.lastname);
    expect(response.body.firstname).toBe(givenUser.firstname);
    expect(response.body.email).toBe(givenUser.email);
  });

  it("returns a bearer token if the user exists", async () => {
    // Given
    const givenUser = {
      email: "bi@bi.com",
      password: "bi",
    };
    // When
    const response = await client.post("/login").send(givenUser);
    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("returns status code 200 and the user email if the bearer token is valid", async () => {
    // Given
    const givenUser = {
      email: "bi@bi.com",
      password: "bi",
    };
    const givenBearer = await (
      await client.post("/login").send(givenUser)
    ).body.token;
    // When
    const response = await client
      .post("/verify-token")
      .set("Authorization", `Bearer ${givenBearer}`);
    // Then
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(givenUser.email);
  });
});
