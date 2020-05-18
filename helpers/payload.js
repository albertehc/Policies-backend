module.exports = (token) => {
  const payload = {
    id: token.id,
    name: token.name,
    email: token.email,
    role: token.role,
  };
  return payload
}