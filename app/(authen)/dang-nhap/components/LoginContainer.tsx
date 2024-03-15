'use client';

import { useState } from 'react';
import LoginFormStep2 from './LogonFormStep2';
import LoginForm from './LoginForm';

const LoginContainer = () => {
    const [username, setUsername] = useState('');

    const handleLogin = (password: string) => {
        const params = {
            username,
            password,
        };
        // TODO: gắn api ở đây
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
