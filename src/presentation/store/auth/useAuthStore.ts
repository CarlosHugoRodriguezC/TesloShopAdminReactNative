import {create} from 'zustand';
import type {User} from '../../../domain/entities/user';
import type {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {authCheckStatus, authLogin} from '../../../actions/auth/auth';
import {StorageAdapter} from '../../../config/adapters/storge-adapter';

interface AuthState {
  token?: string;
  user?: User;
  status: AuthStatus;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  token: undefined,
  user: undefined,
  status: 'checking',

  /// Actions
  login: async (email, password) => {
    const resp = await authLogin(email, password);

    if (!resp) {
      set({status: 'unauthenticated'});
      return false;
    }
    console.log('resp', resp);

    await StorageAdapter.setItem('token', resp.token);

    set({token: resp.token, user: resp.user, status: 'authenticated'});
    return true;
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();

    if (!resp) {
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }

    set({token: resp.token, user: resp.user, status: 'authenticated'});

    await StorageAdapter.setItem('token', resp.token);

    return;
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({status: 'unauthenticated', token: undefined, user: undefined});
  },
}));
