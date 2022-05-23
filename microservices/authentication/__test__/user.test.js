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

describe("User", () => {
  it("should return all the users", async () => {
    // Given
    // When
    const response = await client.get("/users");
    // Then
    expect(response.status).toBe(200);
    expect(response.body).toBe([]);
  });

  it("creates a user", async () => {
    // Given
    const givenUser = {
      lastname: "testing",
      firstname: "testing",
      email: `${Date.now()}@testing.com`,
      password: "testing",
    };
    // When
    const response = await client.post("/users").send(givenUser);
    // Then
    expect(response.status).toBe(201);
    expect(response.body.email).toBe(givenUser.email);
  });

  it("updates a user", async () => {
    // Given
    const { user } = await userFixture();
    const givenUser = { email: user.email, password: "testing" };
    const givenUserUpdate = {
      lastname: "box",
      firstname: "box",
    };
    const givenConnection = await client.post("/login").send(givenUser);
    console.log("PATH :", `users/${user.id}`);
    // When
    const response = await client
      .put("/users/" + user.id)
      .set("Authorization", givenConnection.body.token)
      .send(givenUserUpdate);
    // Then
    expect(response.status).toBe(200);
    expect(response.body.lastname).toBe(givenUserUpdate.lastname);
    expect(response.body.firstname).toBe(givenUserUpdate.firstname);
  });
});
