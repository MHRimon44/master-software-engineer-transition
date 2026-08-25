import type { CreateTaskInput, Task, UpdateTaskInput } from "./task.types.js";
export declare function getTasks(): Task[];
export declare function createTask(input: CreateTaskInput): Task;
export declare function getTaskById(id: string): Task | undefined;
export declare function updateTask(id: string, input: UpdateTaskInput): Task | undefined;
export declare function deleteTask(id: string): boolean;
//# sourceMappingURL=task.service.d.ts.map