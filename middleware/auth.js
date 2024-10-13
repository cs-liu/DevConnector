/**
 * 这段代码编写的是一个 Express.js 的中间件，用于验证 JSON Web Token (JWT)。
 * 它的主要功能是从请求头中获取 JWT 并验证它的有效性，确保用户的身份在访问某些受保护的资源时是合法的。
 * JWT 是一种常见的用于认证的机制，通常包含用户的身份信息，能够保证前后端的安全通信。
 */
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //request,response,callback
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //Verify token if there is one
  try {
    //使用 jsonwebtoken 库的 verify 函数验证 token 的有效性。
    //config.get('jwtSecret') 提供解密 token 所需的密钥。
    //如果 token 验证成功，它将返回解码后的数据，通常是用户信息。
    const decoded = jwt.verify(token, config.get("jwtSecret")); //解码

    //将解码后的用户信息存入 req.user，
    //这意味着在后续的中间件或路由处理程序中可以通过 req.user 获取用户信息。
    req.user = decoded.user;

    //如果 token 验证通过，调用 next() 函数，将控制权交给下一个中间件或路由处理程序，继续处理请求。
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
