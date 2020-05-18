const axios = require("./api");

class Clients {
  constructor(data) {
    data = [];
  }
  async getData() {
    const api = await axios.get(
      "http://www.mocky.io/v2/5808862710000087232b75ac"
    );
    this.data = api.clients;
  }
  signup(user) {
    this.data.push(user);
  }
  edit(edituser,id) {
    this.data = this.data.filter((user) => user.id !== id);
    this.data.push(edituser);
  }
  remove(id) {
    this.data = this.data.filter((user) => user.id !== id);
  }
  getUserByEmail(email) {
    return this.data.find((user) => user.email === email);
  }
  getUserById(id) {
    
    return this.data.find((user) => {if (user.id === id) {console.log(user) }return user.id === id });
  }
}

module.exports = new Clients();
