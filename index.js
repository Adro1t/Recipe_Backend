const express = require("express");
require("dotenv").config();

const db = require("./db/connection");
const bodyParser = require("body-parser");

const morgan = require("morgan");

const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from ess server");
});

//middleware
app.use(bodyParser.json());
app.use(morgan("dev"));

// route
app.use("/category", categoryRoute);
app.use("/user", userRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
