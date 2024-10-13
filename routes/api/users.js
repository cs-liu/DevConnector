/**
 * express: 用于创建API路由。
 * gravatar: 用于根据邮箱自动生成用户头像URL，Gravatar是一个基于电子邮件地址生成头像的服务。
 * bcryptjs: 一个常用的哈希加密库，用来加密和验证密码。
 * jsonwebtoken: 用于生成JWT令牌，用来进行用户身份验证。
 * config: 读取应用程序配置文件中的JWT密钥（jwtSecret）。
 * express-validator: 用于对用户输入进行验证，确保请求体中的数据符合要求。
 * User: Mongoose的用户模型，负责与MongoDB数据库交互。
 */

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//@route   GET api/users
//@desc    Register user
//@access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", //rating
        d: "retro", //default,give a default photo
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password
      //bcrypt.genSalt(10)用于生成加密盐值。
      //盐的作用是增加哈希的随机性，即使两个用户使用相同的密码，生成的哈希值也不同，增加破解难度。
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt); //加密用户密码

      //save to the database
      await user.save();

      //Return jsonwebtoken

      //获取包含用户id的有效负载
      const playload = {
        user: {
          id: user.id,
        },
      };

      /**
       * JWT令牌是如何使用的？
       * JWT令牌包含用户的信息，通常在请求头中作为Bearer令牌发送给服务器，
       * 用于验证用户身份。服务器可以通过解析JWT令牌来验证请求是否合法，进而提供相应的服务。
       */
      //签署令牌
      jwt.sign(
        playload, //传入有效负载
        config.get("jwtSecret"), //传入secret
        { expiresIn: 360000 }, //设置过期时间
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //没有error，就将token传入客户端
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
