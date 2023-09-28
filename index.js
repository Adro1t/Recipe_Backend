const express = require("express");
require("dotenv").config();

const db = require("./db/connection");

const categoryRoute = require("./routes/categoryRoute");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from ess server");
});

// route
app.use("/api", categoryRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
