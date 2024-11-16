'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    const response = await fetch('/api/shop/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password, shopName, location }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Signup Successful');
      window.location.href = '/shop/medicines';
    } else {
      setError(data.message);
    }
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude},${longitude}`);
      },
      () => setError('Failed to fetch location')
    );
  };

  return (
    <div className='container mx-auto py-10 px-10'>
      <div className='flex flex-col items-center gap-5'>
      <input
        type="text"
        placeholder="Username"
        value={userId}
        className='px-3 rounded-md w-1/5 h-8 text-black'
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className='px-3 rounded-md w-1/5 h-8 text-black'
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Shop Name"
        value={shopName}
        className='px-3 rounded-md w-1/5 h-8 text-black'
        onChange={(e) => setShopName(e.target.value)}
      />
      <button className='bg-blue-600 mx-2 px-5 py-1 rounded-xl w-1/6' onClick={handleLocation}>Use My Location</button>
      {location && <p>Location: {location}</p>}
      <button className='bg-green-600 mx-2 px-5 py-1 rounded-xl w-1/6' onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
