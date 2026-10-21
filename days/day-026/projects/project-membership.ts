import { Role } from '../auth/role';

export interface ProjectMembership {
  projectId: number;
  userId: string;
  role: Role;
}
