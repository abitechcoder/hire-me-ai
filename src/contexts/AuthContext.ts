import { createContext } from 'react';

export interface AppwriteUser {
    $id: string;
    name: string;
    email: string;
    labels: string[];
}

export interface AuthContextType {
    authStatus: boolean;
    setAuthStatus: (status: boolean) => void;
    user: AppwriteUser | null;
    setUser: (user: AppwriteUser | null) => void;
    userLabel: string | null;
}

const AuthContext = createContext<AuthContextType>({
    authStatus: false,
    setAuthStatus: () => { },
    user: null,
    setUser: () => { },
    userLabel: null,
});

export const AuthProvider = AuthContext.Provider;

export default AuthContext;