import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await client.post('/auth/login', { email, password });
      
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      
      if (payload.role !== 'ADMIN') {
        setError('Access Denied: Not an Admin account');
        return;
      }

      login(res.data.token, { id: payload.userId, role: payload.role, email: email });
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans animate-fade-in">
        <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-2xl relative overflow-hidden border-t-8 border-primary">
            <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
                Admin Portal
            </h2>
            <p className="text-center text-gray-500 mb-8">
                Authorized Personnel Only
            </p>
            
            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-gray-700 font-medium mb-1 ml-1 text-sm">Email Address</label>
                <input
                type="email"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="admin@mithawla.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1 ml-1 text-sm">Password</label>
                <input
                type="password"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-black transition transform duration-200"
            >
                Access Dashboard
            </button>
            </form>
            
            <div className="mt-6 text-center">
                 <a href="/login" className="text-sm text-gray-400 hover:text-gray-600">
                    ← Back to Customer Store
                </a>
            </div>
        </div>
    </div>
  );
};

export default AdminLogin;
