const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  /*
  user: 这是一个 ObjectId 类型的字段，表示 MongoDB 的 _id。该字段是引用类型（ref: "user"），
  与 User 模型关联（代表用户的个人资料与用户的关系），用于在数据库中创建外键引用。

  experience, education 是嵌套数组，每个元素代表一段工作经历或教育经历
  social 是一个包含社交媒体链接的嵌套对象，用户可以存储自己在各个平台的个人主页链接

  嵌套对象和嵌套数组的区别
  嵌套对象是一个包含多个字段的单个对象，而嵌套数组是包含多个相同结构对象的数组。
  嵌套对象适合表示单一的复杂字段，嵌套数组则适合表示多个类似的条目，比如用户的多个工作经历或教育背景。
  如果字段只包含一个复杂的值，如一个地址或一组联系信息，使用嵌套对象。
  如果字段包含多个相同类型的条目，如多段工作经历或多条技能记录，使用嵌套数组。
  */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
