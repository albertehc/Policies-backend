const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { user } = require("./client.js");


describe("Auth Route", () => {
  let cookie;
  describe("Login", () => {
    it("Login - 200", async () => {
      const response = await request.post("/api/signup").send(user);
      cookie = response.header["set-cookie"];
      const res = await request.post("/api/auth").send(user);
      expect(res.statusCode).toBe(200);
    });
    it("Login - 401 - Email not valid", async () => {
      const res = await request
        .post("/api/auth")
        .send({ ...user, email: "test2@test.com" });
      expect(res.statusCode).toBe(401);
    });
    it("Login - 401 - Password not valid", async () => {
      const res = await request
        .post("/api/auth")
        .send({ ...user, password: "12345679" });
      expect(res.statusCode).toBe(401);
    });
  });
  describe("Me", () => {
    it("Me - 200", async () => {
      const res = await request
        .get("/api/auth")
        .set("Cookie", cookie)
      expect(res.statusCode).toBe(200);
    });
    it("Me - 401", async () => {
      const res = await request
        .get("/api/auth")
      expect(res.statusCode).toBe(401);
    });
  });
  describe("Edit", () => {
    it("Edit - 200", async () => {
      const res = await request
        .put("/api/auth")
        .set("Cookie", cookie)
        .send({ ...user, name: 'test2' });
      expect(res.statusCode).toBe(200);
    });

    it("Edit - 400 Wrong email format", async () => {
      const res = await request
        .put("/api/auth")
        .set("Cookie", cookie)
        .send({ ...user, email: "test@test" });
      expect(res.statusCode).toBe(400);
    });

    it("Edit - 401 Invalid token", async () => {
      const res = await request
        .put("/api/auth")
        .send(user);
      expect(res.statusCode).toBe(401);
    });
  });

  describe("Log out", () => {

    it("Log out - 401", async () => {
      const res = await request
        .post("/api/auth/logout")
        .send(user.password);
      expect(res.statusCode).toBe(401);
    });

    it("Log out - 200", async () => {
      const res = await request
        .post("/api/auth/logout")
        .set("Cookie", cookie)
        .send(user.password);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Delete", () => {
    it("Delete - 400", async () => {
      const res = await request
        .delete("/api/auth")
        .set("Cookie", cookie)
        .send(user.password);
      expect(res.statusCode).toBe(400);
    });

    it("Delete - 401 Invalid token", async () => {
      const res = await request
        .delete("/api/auth")
        .send(user);
      expect(res.statusCode).toBe(401);
    });

    it("Edit - 200", async () => {
      const res = await request
        .delete("/api/auth")
        .set("Cookie", cookie)
        .send(user);
      expect(res.statusCode).toBe(200);
    });
  });
});
