export interface Task {
    id: string;
    title: string;
    completed: boolean;
}
export interface CreateTaskInput {
    title: string;
}
export interface UpdateTaskInput {
    title?: string;
    completed?: boolean;
}
//# sourceMappingURL=task.types.d.ts.map