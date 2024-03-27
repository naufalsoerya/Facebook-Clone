const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Post {
  static postCollection() {
    return database.collection("posts");
  }

  static async findAll() {
    const agg = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        }
      }
    ];

    const cursor = this.postCollection().aggregate(agg);
    const result = await cursor.toArray();

    return result;
  }

  static async findById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id))
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        }
      }
    ];
    const cursor = this.postCollection().aggregate(agg);
    const result = await cursor.toArray();

    return result;
  }

  static async createOne(payload) {
    const newPost = await this.postCollection().insertOne(payload);
    return newPost;
  }

  static async updateOne(id, update, username) {
    if (update.likes) {
      const agg = [
        {
          $match: {
            _id: new ObjectId(String(id)),
          },
        },
      ];
      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      result[0].likes.forEach((item) => {
        if (item.username === username) throw new Error("You can't like twice");
      });
    }

    const post = await this.postCollection().updateOne(
      { _id: new ObjectId(String(id)) },
      { $push: update }
    );
    
    if (!post) throw new Error("Post not found");
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
    ];
    const cursor = this.postCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
}

module.exports = Post;
