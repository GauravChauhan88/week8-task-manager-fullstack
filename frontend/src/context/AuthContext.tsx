import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    loading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const savedToken = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (savedToken) setToken(savedToken);
            if (savedUser) setUser(savedUser ? JSON.parse(savedUser) : null);
        } catch (err) {
            console.error("Failed to parse auth session", err);
            localStorage.clear();
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (newToken: string, userDetails: User) => {
        setToken(newToken);
        setUser(userDetails);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userDetails));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default AuthContext;