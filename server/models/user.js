const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class User {
  static userCollection() {
    return database.collection("users");
  }

  static async findById(id) {
    const user = await this.userCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    return user;
  }

  static async createOne(payload) {
    const newUser = await this.userCollection().insertOne(payload);
    return newUser;
  }

  static async findByUsername(username) {
    const user = await this.userCollection().findOne({
      username: username,
    });
    return user;
  }

  static async findByEmail(email) {
    const user = await this.userCollection().findOne({
      email: email
    });
    return user;
  }

  static async getDetail(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id))
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followings.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $project: {
          password: 0,
          "followingDetail.password": 0,
          "followerDetail.password": 0,
        },
      },
    ];

    const cursor = this.userCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }

  static async getByUsername(username) {
    const agg = [
      {
        $match: {
          username: {$regex: new RegExp(username, 'i')}
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followings.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $project: {
          password: 0,
          "followingDetail.password": 0,
          "followerDetail.password": 0,
        },
      },
    ];

    const cursor = this.userCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }

  static async profileUser(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "authorId",
          as: "userPost"
        }
      }
    ];
    const cursor = this.userCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
}

module.exports = User;
