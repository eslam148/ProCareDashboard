import { UserDetails } from '../../Model/ResponseModel';

export interface AuthState {
  user: UserDetails | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
} 