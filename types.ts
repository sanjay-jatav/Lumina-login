export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  error: string | null;
}