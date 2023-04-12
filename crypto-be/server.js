require("dotenv").config();
const { logger, errLogger } = require("./middlewares/logEvents");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;

// connect to mongodb
connectDB();

// middlewares
app.use(logger);

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 - not found." });
  } else {
    res.type("txt").send("404 - not found.");
  }
});

// errLogger middleware
app.use(errLogger);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
