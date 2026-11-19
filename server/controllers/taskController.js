import mongoose from "mongoose";
import Task from "../models/Task.js";

export async function getTasks(_request, response, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    response.json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function getTask(request, response, next) {
  try {
    const task = await Task.findById(request.params.id);
    if (!task) return response.status(404).json({ message: "Task not found." });
    return response.json(task);
  } catch (error) {
    next(error);
  }
}

export async function createTask(request, response, next) {
  try {
    const task = await Task.create(request.body);
    response.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(request, response, next) {
  try {
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return response.status(404).json({ message: "Task not found." });
    return response.json(task);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(request, response, next) {
  try {
    const task = await Task.findByIdAndDelete(request.params.id);
    if (!task) return response.status(404).json({ message: "Task not found." });
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
}

export function validateTaskId(request, response, next) {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ message: "Invalid task ID." });
  }
  return next();
}
