const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Follow {
  static followCollection() {
    return database.collection("follows");
  }

  static async createFollow(data) {
    const agg = [
      {
        $match: {
          followingId: new ObjectId(String(data.followingId)),
          followerId: new ObjectId(String(data.followerId)),
        },
      },
    ];
    const cursor = this.followCollection().aggregate(agg);
    const result = await cursor.toArray();
    if (result.length > 0) {
      throw new Error("You cannot follow the same user twice");
    } else {
      data.followingId = new ObjectId(String(data.followingId));
      data.followerId = new ObjectId(String(data.followerId));
      const newfollow = await this.followCollection().insertOne(data);
      return newfollow;
    }
  }
}

module.exports = Follow;