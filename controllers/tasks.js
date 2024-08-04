const Task = require("../models/Task");
const asyncHandler = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({}, { __v: false });
  res.status(200).json({ status: "Success", data: tasks });
});

const addTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ status: "Success", data: task });
});

const singleTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    const error = appError.create("Task not found", 404, "Fail");
    return next(error);
  }
  res.status(200).json({ status: "Success", data: task });
});

const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body);
  if (!task) {
    const error = appError.create("Task not found", 404, "Fail");
    return next(error);
  }
  res
    .status(200)
    .json({ status: "Success", msg: "updated successfully", old: task });
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.deleteOne({ _id: id });
  if (!task) {
    const error = appError.create("Task not found", 404, "Fail");
    return next(error);
  }
  res
    .status(200)
    .json({ status: "Success", data: task, msg: "deleted successfully" });
});

module.exports = { getTasks, addTask, singleTask, updateTask, deleteTask };
