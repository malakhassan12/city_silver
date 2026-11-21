import { UserResponseDto } from '../../user/dto/user-response.dto.js';
import { User } from '../../user/entity/user.entity.js';

export function toUserResponse(user: User): UserResponseDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    email: user.email,
    googleId: user.googleId,
    phoneNumber: user.phoneNumber,
    isActive: user.isActive,
  };
}
