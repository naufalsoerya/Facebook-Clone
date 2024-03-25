const { objectId } = require("mongodb");
const { database } = require("../config/mongo");

class User {
  static userCollection() {
    return database.collection("users");
  }

  static async findAll() {
    const users = await this.userCollection().find().toArray();
    return users;
  }

  static async findById(id) {
    const user = await this.userCollection().findOne({
      _id: new objectId(String(id)),
    });
    return user;
  }

  static async createOne(payload) {
    const newUser = await this.userCollection().insertOne(payload);
    return newUser;
  }

  static async findOne({username, password}) {
    const user = await this.userCollection().findOne({
      username,
      password
    });
    return user;
  }
}

module.exports = User;
