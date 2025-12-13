import React, { useEffect, useState } from 'react';
import client from '../api/client';

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

  import { useAuth } from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';

  const Admin: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [form, setForm] = useState<any>({ name: '', category: '', price: '', quantity: '', image: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated && user && user.role !== 'ADMIN') {
        alert("Access Denied: You are not an Admin.");
        navigate('/');
    }
  }, [user, isAuthenticated, navigate]);

  const fetchSweets = async () => {
    try {
      const res = await client.get('/sweets');
      console.log('Fetched sweets:', res.data);
      setSweets(res.data);
    } catch (err: any) {
      console.error(err);
      alert('Failed to fetch sweets: ' + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
        image: form.image
      };

      if (editingId) {
        await client.put(`/sweets/${editingId}`, data);
      } else {
        await client.post('/sweets', data);
      }
      setForm({ name: '', category: '', price: '', quantity: '', image: '' });
      setEditingId(null);
      fetchSweets();
    } catch (err: any) {
        console.error(err);
        alert('Operation failed: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await client.delete(`/sweets/${id}`);
        fetchSweets();
      } catch (err: any) {
        console.error(err);
        alert('Delete failed: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleEdit = (sweet: Sweet) => {
    setEditingId(sweet.id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      image: sweet.image || ''
    });
  };

  const handleRestock = async (id: number) => {
    const qty = prompt('Enter quantity to add:', '10');
    if (qty) {
        try {
            await client.post(`/sweets/${id}/restock`, { quantity: parseInt(qty) });
            fetchSweets();
        } catch (err) {
            alert('Restock failed');
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans animate-fade-in">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
                <span className="text-primary">MithaWala</span> Admin
            </h1>
            <button 
                onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }} 
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition"
            >
                Logout
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-gray-800">Manage Inventory</h2>
            <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">{sweets.length} Items</span>
        </div>
      
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-10">
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-l-4 border-primary pl-3 flex items-center gap-2">
                {editingId ? 'Edit Sweet' : 'Add New Sweet'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Name</label>
                <input
                    placeholder="e.g. Kaju Katli"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    required
                />
            </div>
            <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Category</label>
                <select
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value})}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Sugar Free">Sugar Free</option>
                    <option value="Packed Sweets">Packed Sweets</option>
                    <option value="Special">Special</option>
                    <option value="Traditional">Traditional</option>
                </select>
            </div>
            <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Price (₹)</label>
                <input
                    type="number" step="1"
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    value={form.price}
                    onChange={e => setForm({...form, price: e.target.value})}
                    required
                />
            </div>
            <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Stock</label>
                <input
                    type="number"
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                    required
                />
            </div>
            <div className="md:col-span-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Image (URL or Upload)</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Image URL..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        value={form.image || ''}
                        onChange={e => setForm({...form, image: e.target.value})}
                    />
                    <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-md transition flex items-center justify-center min-w-[50px]" title="Upload Image">
                        📷
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setForm({...form, image: reader.result as string});
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                </div>
            </div>
            <div className="md:col-span-1 flex gap-2">
                <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-md font-bold shadow hover:bg-red-700 transition">
                    {editingId ? 'Save' : 'Add'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', category: '', price: '', quantity: '', image: '' }); }} className="bg-gray-200 text-gray-600 px-3 py-2 rounded-md hover:bg-gray-300 transition" title="Cancel Edit">
                        ✕
                    </button>
                )}
            </div>
            </form>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {sweets.map(sweet => (
                    <tr key={sweet.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{sweet.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">{sweet.category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-bold">₹{Math.floor(sweet.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full uppercase ${
                                sweet.quantity > 10 ? 'bg-green-100 text-green-800' : sweet.quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {sweet.quantity} Units
                            </span>
                            {sweet.quantity === 0 && <span className="ml-2 text-xs text-red-500 font-bold">OUT OF STOCK</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button onClick={() => handleRestock(sweet.id)} className="text-blue-600 hover:text-blue-900 font-bold hover:underline">Restock</button>
                        <button onClick={() => handleEdit(sweet)} className="text-indigo-600 hover:text-indigo-900 font-bold hover:underline">Edit</button>
                        <button onClick={() => handleDelete(sweet.id)} className="text-red-500 hover:text-red-700 font-bold hover:underline">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
