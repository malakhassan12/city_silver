import { UserRoles } from '../types/enum/role.enum.js';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRoles[]) =>
  SetMetadata(ROLES_KEY, roles);