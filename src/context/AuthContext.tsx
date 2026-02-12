import React, { createContext, useContext, useState } from 'react';

type UserType = 'user' | 'merchant' | null;

interface AuthContextType {
    /** The currently signed-in user object (null = signed out) */
    user: { id: string; name: string; phone: string } | null;
    /** Whether the user is in 'user' mode, 'merchant' mode, or not signed in */
    userType: UserType;
    /** True while a sign-in request is in-flight */
    isLoading: boolean;
    /** Mock sign-in: sets user state and routes via the layout */
    signIn: (phone: string, type: UserType) => void;
    /** Clears the user and resets to the auth flow */
    signOut: () => void;
    /** Toggles between 'user' and 'merchant' mode (demo feature) */
    toggleUserMode: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userType: null,
    isLoading: false,
    signIn: () => { },
    signOut: () => { },
    toggleUserMode: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [userType, setUserType] = useState<UserType>(null);
    const [isLoading, setIsLoading] = useState(false);

    const signIn = (phone: string, type: UserType) => {
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setUser({ id: 'u1', name: 'Sahil', phone });
            setUserType(type || 'user');
            setIsLoading(false);
        }, 800);
    };

    const signOut = () => {
        setUser(null);
        setUserType(null);
    };

    const toggleUserMode = () => {
        setUserType((prev) => (prev === 'user' ? 'merchant' : 'user'));
    };

    return (
        <AuthContext.Provider
            value={{ user, userType, isLoading, signIn, signOut, toggleUserMode }}
        >
            {children}
        </AuthContext.Provider>
    );
};
