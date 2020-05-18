const axios = require("./api");

class DB {
  constructor() {
    this.clients = [];
    this.policies = [];
  }
  async getData() {
    const apiClients = await axios.get(
      "http://www.mocky.io/v2/5808862710000087232b75ac"
    );
    const apiPolicies = await axios.get(
      "http://www.mocky.io/v2/580891a4100000e8242b75c5"
    );
    this.clients = apiClients.clients;
    this.policies = apiPolicies.policies;
  }
  signupClient(user) {
    this.clients.push(user);
  }
  editClient(edituser, id) {
    this.clients = this.clients.filter((user) => user.id !== id);
    this.clients.push(edituser);
  }
  removeClient(id) {
    this.clients = this.clients.filter((user) => user.id !== id);
  }
  getClientByEmail(email) {
    return this.clients.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
  getClientByName(name) {
    return this.clients.find((user) => user.name.toLowerCase() === name.toLowerCase());
  }
  getClientById(id) {
    return this.clients.find((user) => user.id === id);
  }
}

module.exports = new DB();
