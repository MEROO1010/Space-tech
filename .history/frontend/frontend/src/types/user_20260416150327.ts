// frontend/src/types/user.ts
export interface User {
  id: number;
  email: string;
  name: string;
  date_joined?: string;
  token?: string;
}