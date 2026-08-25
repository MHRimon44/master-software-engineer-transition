import { Router } from "express";
import { createTask, getTaskById, getTasks, updateTask, deleteTask, } from "./task.service.js";
import { AppError } from "./app-error.js";
export const taskRouter = Router();
taskRouter.get("/", (_req, res) => {
    const tasks = getTasks();
    return res.status(200).json(tasks);
});
taskRouter.post("/", (req, res) => {
    const { title } = req.body;
    if (typeof title !== "string" || title.trim().length === 0) {
        throw new AppError(400, "VALIDATION_ERROR", "Title is required");
    }
    const task = createTask({
        title: title.trim(),
    });
    return res.status(201).json(task);
});
taskRouter.get("/:id", (req, res) => {
    const task = getTaskById(req.params.id);
    if (!task) {
        throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
    }
    return res.status(200).json(task);
});
taskRouter.patch("/:id", (req, res) => {
    const { title, completed } = req.body;
    if (title !== undefined &&
        (typeof title !== "string" || title.trim().length === 0)) {
        throw new AppError(400, "VALIDATION_ERROR", "title must be a non-empty string");
    }
    if (completed !== undefined && typeof completed !== "boolean") {
        throw new AppError(400, "VALIDATION_ERROR", "completed must be a boolean");
    }
    if (title === undefined && completed === undefined) {
        throw new AppError(400, "VALIDATION_ERROR", "At least one field is required");
    }
    const input = {};
    if (title !== undefined) {
        input.title = title.trim();
    }
    if (completed !== undefined) {
        input.completed = completed;
    }
    const task = updateTask(req.params.id, input);
    if (!task) {
        throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
    }
    return res.status(200).json(task);
});
taskRouter.delete("/:id", (req, res) => {
    const deleted = deleteTask(req.params.id);
    if (!deleted) {
        throw new AppError(404, "TASK_NOT_FOUND", "Task not found");
    }
    return res.status(204).send();
});
//# sourceMappingURL=task.routes.js.map