export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  googleId: string | null;
  phoneNumber: string | null;
  isActive: boolean;
}