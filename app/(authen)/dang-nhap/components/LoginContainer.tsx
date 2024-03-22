'use client';

import { useState } from 'react';
import LoginFormStep2 from './LogonFormStep2';
import LoginForm from './LoginForm';
import { useAuth } from '@/app/providers/AuthProvider';

const LoginContainer = () => {
    const [username, setUsername] = useState('');
    const { login, loading } = useAuth();

    const handleLogin = async (password: string) => {
        login(username, password);
    };
    return (
        <div>
            {username !== '' ? (
                <LoginFormStep2
                    username={username}
                    handleLogin={handleLogin}
                    loading={loading}
                />
            ) : (
                <LoginForm setUsername={setUsername} />
            )}
        </div>
    );
};

export default LoginContainer;
