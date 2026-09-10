export interface ProjectTask {
  id: number;
  projectId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}
