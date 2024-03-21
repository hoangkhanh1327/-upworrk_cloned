'use client';

import { FC, createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ClientInfo } from '@/app/types/authentication.types';
import BaseService from '@/app/services/BaseService';
import { loginServices } from '@/app/services/authentication.services';
import { useRouter } from 'next/navigation';

interface IAuthContext {
    isAuthenticated: boolean;
    user: ClientInfo | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    loading: boolean;
}

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: false,
    loading: false,
    user: null,
    login: (email, password) => {},
    logout: () => {},
});

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const [user, setUser] = useState<ClientInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [accountType, setAccountType] = useState<'client' | 'freelancer' | null>('client')
    const router = useRouter();

    useEffect(() => {
        async function loadUserFromToken() {
            const token = Cookies.get('token');
            if (token) {
                BaseService.defaults.headers.Authorization = `Bearer ${token}`;
                const { data } = await loginServices.getUserInfo();
                if (data) {
                    setUser(data);
                }
            }
            setLoading(false);
        }
        loadUserFromToken();
    }, []);

    useEffect(() => {
        if (accountType) {
            if (accountType === 'client') {
                router.push(`/client/dashboard`);
            }
            if (accountType === 'freelancer') {
                router.push(`/freelancer/dashboard`);
            }
        } else {
            router.replace('/');
        }
    }, [accountType, router]);

    const login = async (email: string, password: string) => {
        const { data: authenData } = await loginServices.login({
            email,
            password,
        });
        if (authenData && authenData.access_token) {
            BaseService.defaults.headers.Authorization = `Bearer ${authenData.access_token}`;
            Cookies.set('token', authenData.access_token, {
                expires: authenData.expires_in || 60,
            });
            const { data } = await loginServices.getUserInfo();
            setUser(data);
            setAccountType(authenData.user_type)
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        delete BaseService.defaults.headers.Authorization;
        window.location.pathname = '/dang-nhap';
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
