const express = require("express");
require("dotenv").config();
const app = express();
const DP_CONNECT = require("./dp/connect");
const tasksRoutes = require("./routes/tasks");
const cors = require("cors");
const path = require("path");

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRoutes);

app.use(express.static(path.join(__dirname, "client", "dist")));





// global middleware for not found router
app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: "ERROR", message: "This resource is not available" });
});
// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || "ERROR",
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

const main = async () => {
  try {
    await DP_CONNECT(process.env.MONGO_URL).then(() =>
      console.log("CONNECTED IN DP")
    );
    app.listen(process.env.PORT, () => {
      console.log(`listing on port:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
