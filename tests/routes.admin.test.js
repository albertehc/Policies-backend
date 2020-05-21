const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { user } = require("./client.js");
const signToken = require("./../helpers/signToken");
const DB = require("./../models/DB");

const setCookie = (role) => {
  const websiteName = process.env.WEBSITENAME || "Test";
  const payload = { ...user, role };
  return `${websiteName}=${signToken(payload)}`;
};

beforeAll(async (done) => {
  await DB.getData();
  await request.post("/api/signup").send(user);
  done();
});
describe("Policies Route", () => {
  describe("Id Route", () => {
    it("Id - 401 No cookie", async () => {
      const res = await request.get(
        "/api/policies/policy/29a92e14-e935-44db-8c42-1d31c76c01c8"
      );
      expect(res.statusCode).toBe(401);
    });

    it("Id - 403 Forbidden", async () => {
      const res = await request
        .get("/api/policies/policy/29a92e14-e935-44db-8c42-1d31c76c01c8")
        .set("Cookie", setCookie("user"));
      expect(res.statusCode).toBe(403);
    });

    it("Id - 404 - Id not found", async () => {
      const res = await request
        .get("/api/policies/policy/29a92e14-e935-44db-8c42-1d31c76c01c")
        .set("Cookie", setCookie("admin"));
      expect(res.statusCode).toBe(404);
    });

    it("Id - 200 as Admin", async () => {
      const res = await request
        .get("/api/policies/policy/29a92e14-e935-44db-8c42-1d31c76c01c8")
        .set("Cookie", setCookie("admin"));
      expect(res.statusCode).toBe(200);
    });
  });
  describe("Name Route", () => {
    it("Name - 401 No cookie", async () => {
      const res = await request.get("/api/policies/name/britney");
      expect(res.statusCode).toBe(401);
    });

    it("Name - 403 Forbidden", async () => {
      const res = await request
        .get("/api/policies/name/britney")
        .set("Cookie", setCookie("user"));
      expect(res.statusCode).toBe(403);
    });

    it("Name - 404 - Id not found", async () => {
      const res = await request
        .get("/api/policies/name/britneyy")
        .set("Cookie", setCookie("admin"));
      expect(res.statusCode).toBe(404);
    });

    it("Name - 200 as Admin", async () => {
      const res = await request
        .get("/api/policies/name/britney")
        .set("Cookie", setCookie("admin"));
      expect(res.statusCode).toBe(200);
    });
  });
});
