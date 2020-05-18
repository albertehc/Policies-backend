const { check } = require("express-validator");

module.exports = () => {
  return [
    check("name", "name is required").not().isEmpty(),
    check("role", "role is required").not().isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("password", "Password too short (min 8)").isLength({
      min: 8,
      max: 24,
    }),
  ];
};
