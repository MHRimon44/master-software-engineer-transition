const tasks = [];
export function getTasks() {
    return tasks;
}
export function createTask(input) {
    const task = {
        id: Date.now().toString(),
        title: input.title,
        completed: false,
    };
    tasks.push(task);
    return task;
}
export function getTaskById(id) {
    return tasks.find((task) => task.id === id);
}
export function updateTask(id, input) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return undefined;
    }
    if (input.title !== undefined) {
        task.title = input.title;
    }
    if (input.completed !== undefined) {
        task.completed = input.completed;
    }
    return task;
}
export function deleteTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
        return false;
    }
    tasks.splice(index, 1);
    return true;
}
//# sourceMappingURL=task.service.js.map