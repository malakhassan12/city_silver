import {
  applyDecorators,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { UserRoles } from '../types/enum/role.enum.js';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
  );
}