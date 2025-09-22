const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectDb = require("./confiq/ConnectDb");
const path = require("path");

const Auth = require("./Route/Auth/Auth.Route");
const post = require("./Route/post.route");
const common = require("./Route/User/genneral.route");
const googleRouter = require("./controllerRoute/Auth/passport");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/api/auth", Auth);

//error  middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 400;
  const message = error.message || error.message || "error occur";
  next();
  res.status(statusCode).json({
    message,
    statusCode,
    success: false,
    error: true,
  });
});
require("./confiq/passport")(app);

ConnectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
