const express = require("express");
const {
  getTasks,
  addTask,
  singleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getTasks).post(addTask);

router.route("/:id").get(singleTask).put(updateTask).delete(deleteTask);

module.exports = router;
