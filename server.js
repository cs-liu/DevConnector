/**
 * @express: 导入 Express 框架，用于构建 Web 服务器。
 * @cors: 引入跨域资源共享 (CORS) 中间件。CORS 允许浏览器从不同的源访问资源，
 * 这对于 API 尤其重要，因为前端应用和后端 API 通常位于不同的域名或端口下。
 * @connectDB: 从 ./config/db 中导入数据库连接函数，用于连接 MongoDB 数据库。
 */
const express = require("express");
const cors = require("cors"); // 引入 CORS 中间件
const connectDB = require("./config/db");

const app = express();

//Connect database
connectDB();

//Init Middware
//express.json() 解析 JSON 格式的请求体。通过此中间件，服务器可以接收和处理客户端发送的 JSON 数据。
app.use(express.json({ extend: false }));
app.use(cors()); // 启用 CORS,解决跨域问题

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //此处使用的时反引号，不是单引号……
