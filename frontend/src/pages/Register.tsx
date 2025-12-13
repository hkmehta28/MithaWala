import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
        <div className="glass-card w-full max-w-md p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-primary"></div>
            <h2 className="text-4xl font-extrabold mb-2 text-center text-gray-800">Join the Club</h2>
            <p className="text-center text-gray-500 mb-8">Start your sweet journey today</p>
            
            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-gray-700 font-medium mb-1 ml-1 text-sm">Full Name</label>
                <input
                type="text"
                className="w-full bg-white/50 border border-white/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition shadow-sm"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
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
                className="w-full bg-gradient-to-r from-secondary to-primary text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-secondary/30 hover:scale-[1.02] transition transform duration-200"
            >
                Create Account
            </button>
            </form>
            
            <p className="mt-6 text-center text-gray-600 text-sm">
                Already have an account? <a href="/login" className="text-primary font-bold hover:underline">Login here</a>
            </p>
        </div>
    </div>
  );
};

export default Register;
