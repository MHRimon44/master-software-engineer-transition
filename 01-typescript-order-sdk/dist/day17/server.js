import express from "express";
import { errorHandler } from "./error-handler.js";
import { taskRouter } from "./task.routes.js";
const app = express();
app.use(express.json());
app.use("/tasks", taskRouter);
// Keep error handler after routes
app.use(errorHandler);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
//# sourceMappingURL=server.js.map