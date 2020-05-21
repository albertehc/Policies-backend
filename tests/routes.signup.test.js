const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { user } = require("./client.js");

describe("Signup Route", () => {

  it("Signup - 200", async () => {
    const res = await request.post("/api/signup").send(user);
    expect(res.statusCode).toBe(200);
  });

  it("Signup - 400 - Bad validation", async () => {
    const res = await request
      .post("/api/signup")
      .send({ ...user, email: "test@test" });
    expect(res.statusCode).toBe(400);
  });

  it("Signup - 400 - Email used", async () => {
    await request.post("/api/signup").send(user);
    const res = await request.post("/api/signup").send(user);
    expect(res.statusCode).toBe(400);
  });
});
