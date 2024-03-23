'use client';

import { FC, createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ClientInfo } from '@/app/types/authentication.types';
import BaseService from '@/app/services/BaseService';
import { loginServices } from '@/app/services/authentication.services';
import { usePathname, useRouter } from 'next/navigation';

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
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        async function loadUserFromToken() {
            const token = Cookies.get('token');
            const accountType = Cookies.get('account_type');
            if (token) {
                BaseService.defaults.headers.Authorization = `Bearer ${token}`;
                if (accountType === 'client') {
                    const { data } = await loginServices.getUserInfo();
                    if (data) {
                        setUser(data);
                    }
                }
                if (accountType === 'freelancer') {
                    const { data } = await loginServices.getFreelancerInfo();
                    if (data) {
                        setUser(data);
                    }
                }
            } else {
                router.push('/');
            }
            setLoading(false);
        }
        loadUserFromToken();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        const { data: authenData } = await loginServices.login({
            email,
            password,
        });
        if (authenData && authenData.access_token) {
            BaseService.defaults.headers.Authorization = `Bearer ${authenData.access_token}`;
            Cookies.set('token', authenData.access_token, {
                expires: authenData.expires_in || 60,
            });
            Cookies.set('account_type', authenData.user_type, {
                expires: authenData.expires_in || 60,
            });
            if (authenData.user_type === 'client') {
                const { data } = await loginServices.getUserInfo();
                setUser(data);
                router.push('/client/dashboard');
            }else if(authenData.user_type === 'freelancer'){
                const { data } = await loginServices.getFreelancerInfo();
                setUser(data);
                router.push('/freelancer/dashboard');
            }
            setLoading(false);
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
