const signToken = require("./../helpers/signToken");

module.exports = (res, token, data) => {
  if (!data) data = token;
  res
    .cookie(process.env.WEBSITENAME || "Test", signToken(token), {
      maxAge: parseInt(process.env.COOKIEEXPIRATION || 432000000),
      httpOnly: true,
      secure: false,
      sameSite: true,
    })
    .status(200)
    .json(data);
};
