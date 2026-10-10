import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { authService, type AuthUser } from '../services/authService';

// ============================================================
// TYPES
// ============================================================
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;       // true while verifying token on mount
  initialized: boolean;   // true after first-load check completes
}

type AuthAction =
  | { type: 'AUTH_INIT_START' }
  | { type: 'AUTH_INIT_DONE'; payload: { user: AuthUser | null; token: string | null } }
  | { type: 'AUTH_SUCCESS'; payload: { user: AuthUser; token: string } }
  | { type: 'AUTH_LOGOUT' };

interface AuthContextValue {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    guestData?: { userStats?: unknown; problemProgress?: unknown }
  ) => Promise<void>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

// ============================================================
// REDUCER
// ============================================================
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_INIT_START':
      return { ...state, loading: true, initialized: false };
    case 'AUTH_INIT_DONE':
      return {
        ...state,
        loading: false,
        initialized: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        initialized: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'AUTH_LOGOUT':
      return { user: null, token: null, loading: false, initialized: true };
    default:
      return state;
  }
}

const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: true,
  initialized: false,
};

// ============================================================
// CONTEXT
// ============================================================
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // On mount: verify any stored token
  useEffect(() => {
    dispatch({ type: 'AUTH_INIT_START' });
    const storedToken = authService.getToken();
    if (!storedToken) {
      dispatch({ type: 'AUTH_INIT_DONE', payload: { user: null, token: null } });
      return;
    }
    authService.me().then((user) => {
      if (user) {
        dispatch({ type: 'AUTH_INIT_DONE', payload: { user, token: storedToken } });
      } else {
        // Token expired or invalid
        authService.clearToken();
        dispatch({ type: 'AUTH_INIT_DONE', payload: { user: null, token: null } });
      }
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await authService.login(email, password);
    authService.saveToken(token);
    dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      guestData?: { userStats?: unknown; problemProgress?: unknown }
    ) => {
      const { user, token } = await authService.register(name, email, password, guestData);
      authService.saveToken(token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
    },
    []
  );

  const logout = useCallback(() => {
    authService.clearToken();
    dispatch({ type: 'AUTH_LOGOUT' });
  }, []);

  const updateUser = useCallback((user: AuthUser) => {
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: { user, token: authService.getToken() || '' },
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
