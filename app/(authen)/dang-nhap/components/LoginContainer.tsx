'use client';

import { useState } from 'react';
import LoginFormStep2 from './LogonFormStep2';
import LoginForm from './LoginForm';
import { signIn } from 'next-auth/react';
import ApiService from '@/app/services/ApiService';

const LoginContainer = () => {
    const [username, setUsername] = useState('fakesmil1309@gmail.com');

    const handleLogin = async (password: string) => {
        const params = {
            userName : username || 'fakesmil1309@gmail.com',
            password: password || 'Khanh1309',
        };
        signIn('credentials', {
            username: params.userName,
            password: params.password,
            redirect: false,
            // callbackUrl: 'http://upwork.local:9999/',
        });
        
        // const res = await ApiService.post(`/login`, params)
        // TODO: gắn api ở đây
        // console.log('res', res);
        
    };
    return (
        <div>
            {username !== '' ? (
                <LoginFormStep2 username={username} handleLogin={handleLogin} />
            ) : (
                <LoginForm setUsername={setUsername} />
            )}
        </div>
    );
};

export default LoginContainer;
