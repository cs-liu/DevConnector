//导入了 mongoose 模块，用来连接和操作 MongoDB 数据库
const moogoose = require("mongoose");

/*
UserSchema 是通过 mongoose.Schema 定义的用户数据结构（模式）。
这个模式定义了用户文档应包含的字段以及它们的属性。
@avatar 存储用户头像的URL（可选字段）
 */
const UserSchema = new moogoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //唯一性，unique并不是一个验证器，它是数据库层面的约束
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/*
这一行将 UserSchema 模式编译为一个模型（User），并导出它。
mongoose.model 用来将定义的模式转化为可以用于数据库交互的模型。第一个参数 'user' 是模型的名称，
它对应 MongoDB 数据库中的集合名称（默认是复数形式：users），第二个参数 UserSchema 是模式。
 */
module.exports = User = moogoose.model("user", UserSchema);
