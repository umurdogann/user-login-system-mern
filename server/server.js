const express = require("express");
const mongoose = require("mongoose");
const unless = require("express-unless");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const app = express();
const auth = require("./middlewares/auth");
app.use(cors());
app.use(express.json());

// MIDDLEWARES
auth.authentication.unless = unless;
app.use(auth.authentication.unless({
  path: [
    {url: "/api/user/register", method: ['POST']},
    {url: "/api/user/login", method: ['POST']},
  ]
}));

// DB CONNECTION


mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection is successful!");
  })
  .catch((error) => {
    console.log("Database connection failed: " + error);
  });

// ROUTES

app.use("/api/user", userRoute);

// SERVER LISTEN
app.listen(3001, ()=>{
    console.log("Server is online! Port: 3001")
});
