import { SetMetadata } from '@nestjs/common';

import { ProjectPermission } from './project-permission';

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (...permissions: ProjectPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
