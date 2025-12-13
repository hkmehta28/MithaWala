import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await client.post('/auth/login', { email, password });
      // We need to decode token to get user info if backend doesn't return it
      // Let's assume for now backend returns just token. We decode role in AuthContext or here.
      // Actually backend login returns { token }.
      // We'll rely on AuthContext decoding or fetch profile. 
      // AuthContext logic handles decoding.
      
      // We might need to fetch user profile properly or encode it in token.
      // Backend service puts userId and role in token.
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      login(res.data.token, { id: payload.userId, role: payload.role, email: email });
      
      if (payload.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans animate-fade-in">
        <div className="glass-card w-full max-w-md p-10 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${email.includes('admin') ? 'from-gray-800 to-black' : 'from-primary to-secondary'}`}></div>
            <h2 className="text-4xl font-extrabold mb-2 text-center text-gray-800">
                {email.includes('admin') ? 'Admin Portal' : 'Welcome Back'}
            </h2>
            <p className="text-center text-gray-500 mb-8">
                {email.includes('admin') ? 'Manage your sweet empire' : 'Login to your sweet account'}
            </p>
            
            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-gray-700 font-medium mb-1 ml-1 text-sm">Email Address</label>
                <input
                type="email"
                className="w-full bg-white/50 border border-white/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition shadow-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1 ml-1 text-sm">Password</label>
                <input
                type="password"
                className="w-full bg-white/50 border border-white/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition shadow-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button
                type="submit"
                className={`w-full text-white py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition transform duration-200 ${
                    email.includes('admin') ? 'bg-gray-800 hover:bg-black' : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/30'
                }`}
            >
                {email.includes('admin') ? 'Access Dashboard' : 'Start Indulging'}
            </button>
            </form>
            
            <div className="mt-6 text-center space-y-2">
                <p className="text-gray-600 text-sm">
                    New here? <a href="/register" className="text-primary font-bold hover:underline">Create an account</a>
                </p>
                <div className="pt-4 border-t border-gray-200 w-full">
                    <a href="/admin/login" className="text-xs text-gray-400 hover:text-gray-800 font-semibold transition flex items-center justify-center gap-1">
                        🔒 Admin Login
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
