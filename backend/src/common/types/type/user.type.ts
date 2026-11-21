export type UserType = {
  sub: string;
  role: string;
  sid: string;
  tokenType: 'ACCESS' | 'REFRESH';
};
