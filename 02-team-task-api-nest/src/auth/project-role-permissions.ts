import { ProjectPermission } from './project-permission';
import { Role } from './role';

export const PROJECT_ROLE_PERMISSIONS: Record<
  Role,
  readonly ProjectPermission[]
> = {
  [Role.OWNER]: [ProjectPermission.CREATE_TASK, ProjectPermission.UPDATE_TASK],

  [Role.ADMIN]: [ProjectPermission.CREATE_TASK, ProjectPermission.UPDATE_TASK],

  [Role.MEMBER]: [ProjectPermission.CREATE_TASK],
};
