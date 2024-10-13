/**
 * 概述：这段代码定义了一个 Post 模型，表示社交媒体或论坛中的一篇帖子（Post）。
 * 该模型包括帖子内容、作者信息、评论和点赞等功能。
 *
 * likes: 这是一个数组，用于记录点赞的用户。
 * 每个元素是一个对象，其中包含一个 user 字段，表示哪个用户点赞了帖子。
 * user 字段是 ObjectId 类型，引用 users 模型。
 * likes 是一个嵌套数组，表示多个用户可以点赞同一个帖子。
 *
 * comments: 这是一个数组，表示帖子下的评论，每个评论都是一个对象。每个评论对象包含以下字段：
 * user: 评论的用户，类型是 ObjectId，引用 users 模型，表示评论的作者。
 * text: 评论的文本内容，类型为 String，且是必填字段（required: true）。
 * name 和 avatar: 这些字段用于显示评论者的姓名和头像。
 * date: 代表评论的创建时间，类型为 Date，默认值为 Date.now，即评论创建时的时间。
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
