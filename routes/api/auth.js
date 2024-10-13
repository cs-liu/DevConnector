/**
 *
 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//@route   GET api/auth
//@desc    Test route
//@access  Public
router.get("/", auth, async (req, res) => {
  try {
    //select("-password")是为了安全性。我们不希望将用户的密码暴露给前端，
    //即使是加密过的密码也不应该返回给客户端。因此，select("-password")排除了密码字段。
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   POST api/auth
//@desc    Authenticate user & get token
//@access  Public
router.post(
  "/",
  [
    //express-validator 验证器：它通过 check() 函数对请求体中的邮箱和密码进行验证
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //Return jsonwebtoken

      //获取包含用户id的有效负载
      const playload = {
        user: {
          id: user.id,
        },
      };

      //签署令牌
      /*
      JWT令牌是使用jwt.sign()方法生成的，其中包括用户的唯一ID作为负载，
      并且使用服务器端的jwtSecret进行签名。
      JWT是无状态的，可以通过客户端传递并验证，无需每次请求都查询数据库。
      */
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
