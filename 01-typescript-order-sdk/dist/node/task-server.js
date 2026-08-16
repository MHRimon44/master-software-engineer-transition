import { createServer } from "node:http";
const tasks = [{ id: 1, title: "Learn Node HTTP", completed: false }];
const server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    console.log(req.method, req.url);
    if (req.method === "GET" && req.url === "/health") {
        res.statusCode = 200;
        res.end(JSON.stringify({ status: "ok" }));
        return;
    }
    if (req.method === "GET" && req.url === "/tasks") {
        res.statusCode = 200;
        res.end(JSON.stringify(tasks));
        return;
    }
    if (req.method === "POST" && req.url === "/tasks") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                if (typeof data.title !== "string" || data.title.trim() === "") {
                    res.statusCode = 400;
                    res.end(JSON.stringify({
                        message: "Title is required",
                    }));
                    return;
                }
                const task = {
                    id: tasks.length + 1,
                    title: data.title,
                    completed: false,
                };
                tasks.push(task);
                res.statusCode = 201;
                res.end(JSON.stringify(task));
            }
            catch {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    message: "Invalid JSON",
                }));
            }
        });
        return;
    }
    if (req.method === "GET" && req.url?.startsWith("/tasks/")) {
        const id = Number(req.url.split("/")[2]);
        if (Number.isNaN(id)) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                message: "Invalid task id",
            }));
            return;
        }
        const task = tasks.find((task) => task.id === id);
        if (!task) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                message: "Task not found",
            }));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(task));
        return;
    }
    if (req.method === "DELETE" && req.url?.startsWith("/tasks/")) {
        const id = Number(req.url.split("/")[2]);
        if (Number.isNaN(id)) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                message: "Invalid task id",
            }));
            return;
        }
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                message: "Task not found",
            }));
            return;
        }
        tasks.splice(taskIndex, 1);
        res.statusCode = 204;
        res.end();
        return;
    }
    if (req.url === "/health" ||
        req.url === "/tasks" ||
        req.url?.startsWith("/tasks/")) {
        res.statusCode = 405;
        res.setHeader("Allow", "GET, POST, DELETE");
        res.end(JSON.stringify({
            message: "Method Not Allowed",
        }));
        return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({
        error: "Not Found",
    }));
});
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=task-server.js.map