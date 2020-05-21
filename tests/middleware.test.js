const clientMiddleware = require("./../middleware/clients");
const adminMiddleware = require("./../middleware/admin");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Middleware test", () => {
  let res, next;
  beforeEach(() => {
    res = mockResponse();
    next = jest.fn();
  });
  describe("Client middleware", () => {
    it("Check user role incorrect on client middleware", async () => {
      const req = { body: { token: { role: "baduser" } } };
      await clientMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("Check user role user correct on client middleware", async () => {
      const req = { body: { token: { role: "user" } } };
      await clientMiddleware(req, res, next);
      expect(next).toBeCalled();
    });

    it("Check user role admin correct on client middleware", async () => {
      const req = { body: { token: { role: "admin" } } };
      await clientMiddleware(req, res, next);
      expect(next).toBeCalled();
    });
  });

  describe("Admin middleware", () => {
    it("Check user role incorrect on admin middleware", async () => {
      const req = { body: { token: { role: "user" } } };
      await adminMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("Check user role correct on admin middleware", async () => {
      const req = { body: { token: { role: "admin" } } };
      await adminMiddleware(req, res, next);
      expect(next).toBeCalled();
    });
  });
});
