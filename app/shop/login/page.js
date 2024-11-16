'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch('/api/shop/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login Successful');
            window.location.href = '/shop/medicines';
        } else {
            setError(data.message);
        }
    };

    return (
        <div className='container mx-auto py-10 px-10'>
            <div className='flex flex-col items-center gap-5'>
                <input
                    type="text"
                    placeholder="Username"
                    className='px-3 rounded-md w-1/5 h-8 text-black'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className='px-3 rounded-md w-1/5 h-8 text-black'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-blue-600 mx-2 px-5 py-1 rounded-xl w-1/6' onClick={handleLogin}>Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>
                    Don't have an account?{' '}
                    <button className='hover:text-blue-300' onClick={() => (window.location.href = '/shop/signup')}>Sign Up</button>
                </p></div>
        </div>
    );
}
