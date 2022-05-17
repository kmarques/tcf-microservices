const supertest = require("supertest");
const sequelize = require("../models/index").sequelize;
const userFixture = require("../fixtures/user.js");

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
      lastname: "testing",
      firstname: "testing",
      email: `${Date.now()}@testing.com`,
      password: "testing",
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
    const { user } = await userFixture();
    const givenUser = {
      email: user.email,
      password: "testing",
    };
    // When
    const response = await client.post("/login").send(givenUser);
    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("returns status code 200 and the user email if the bearer token is valid", async () => {
    // Given
    const { user } = await userFixture();
    const givenUser = {
      email: user.email,
      password: "testing",
    };
    const givenConnection = await client.post("/login").send(givenUser);
    console.log(givenConnection.body);
    console.log("GivenConnection", givenConnection.body);
    // When
    const response = await client
      .post("/verify-token")
      .set("Authorization", `Bearer ${givenConnection.body.token}`);
    // Then
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(givenUser.email);
  });
});
