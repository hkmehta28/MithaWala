import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { fallbackSweets } from '../fallbackData';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

const Home: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { isAuthenticated } = useAuth();

  const fetchSweets = async () => {
    try {
      const res = await client.get('/sweets');
      // Emergency fix: If API returns very few items (like just 1), merge or use fallback
      if (res.data && res.data.length >= 5) {
          setSweets(res.data);
      } else {
          console.warn('API returned too few items, using full fallback data');
          setSweets(fallbackSweets);
      }
    } catch (err) {
      console.error('API Error, using fallback', err);
      setSweets(fallbackSweets);
    }
  };

  useEffect(() => {
    fetchSweets(); // Fetch regardless of auth for public view
  }, []);

  const { cart, addToCart, decreaseQuantity } = useCart();

  const handlePurchase = (sweet: Sweet) => {
    // Check if sweet is sold out
    if (sweet.quantity === 0) return;
    
    addToCart({
      id: sweet.id,
      name: sweet.name,
      price: sweet.price,
      quantity: 1
    });
    // Alert removed
  };

  // Specific categories as per user request
  const categories = ['Sugar Free', 'Packed Sweets', 'Special'];

  const { searchQuery } = useSearch();

  // ...

  const filteredSweets = sweets.filter(s => {
      const matchesCategory = selectedCategory === 'All' || s.category.includes(selectedCategory) || s.category === selectedCategory;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
        <h1 className="text-3xl font-medium text-center mb-8 text-gray-800">Sweets</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filter */}
            <aside className="w-full md:w-64 flex-shrink-0">


                <div className="bg-yellow-50/50 rounded-md border border-yellow-100 overflow-hidden">
                    <div className="p-4 bg-secondary/20 flex justify-between items-center cursor-pointer" onClick={() => setSelectedCategory('All')}>
                        <h3 className="font-bold text-sm uppercase">Category</h3>
                        <span>{selectedCategory === 'All' ? '-' : '+'}</span>
                    </div>
                    <ul className="p-4 space-y-3 text-sm text-gray-700">
                        <li 
                            className={`hover:text-primary cursor-pointer flex justify-between ${selectedCategory === 'All' ? 'text-primary font-bold' : ''}`}
                            onClick={() => setSelectedCategory('All')}
                        >
                            <span>All Sweets</span>
                            <span className="text-gray-400">({sweets.length})</span>
                        </li>
                        {categories.map((cat, idx) => {
                            const count = sweets.filter(s => s.category.includes(cat) || s.category === cat).length;
                            return (
                                <li 
                                    key={idx} 
                                    className={`hover:text-primary cursor-pointer flex justify-between ${selectedCategory === cat ? 'text-primary font-bold' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    <span>{cat}</span>
                                    <span className="text-gray-400">({count})</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                <div className="mt-4 bg-yellow-50/50 rounded-md border border-yellow-100 p-4">
                     <h3 className="font-bold text-sm uppercase mb-4">Price</h3>
                     <div className="h-1 bg-gray-300 rounded relative">
                         <div className="absolute left-0 w-1/2 h-full bg-primary"></div>
                         <div className="absolute left-1/2 w-4 h-4 bg-primary rounded-full -top-1.5 shadow"></div>
                     </div>
                     <div className="flex justify-between text-xs mt-2 font-medium">
                         <span>₹45.00</span>
                         <span>₹1,150.00</span>
                     </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
                 {filteredSweets.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-xl text-gray-500 mb-4">No sweets found.</p>
                        <p className="text-sm text-gray-400">Try selecting "All Sweets" or check back later.</p>
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSweets.map(sweet => (
                            <div key={sweet.id} className="bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col text-center group">
                                <div className="relative h-48 bg-gray-50 mb-4 overflow-hidden">
                                     <div className="w-full h-full flex items-center justify-center bg-gray-100 text-6xl group-hover:scale-110 transition-transform duration-500">
                                         {sweet.image ? (
                                             <img src={sweet.image} alt={sweet.name} className="w-full h-full object-cover" />
                                         ) : (
                                            sweet.category === 'Sugar Free' ? '🍃' : 
                                            sweet.category === 'Special' ? '✨' :
                                            sweet.name.includes('Ladoo') ? '🟠' : 
                                            sweet.name.includes('Barfi') ? '🧊' :
                                            sweet.name.includes('Baklava') ? '🧇' :
                                            sweet.name.includes('Box') ? '🎁' :
                                            sweet.name.includes('Milk') ? '🍰' : '🍬'
                                         )}
                                     </div>
                                     <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                         ♡
                                     </button>
                                     {sweet.quantity === 0 && (
                                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide">
                                            Sold Out
                                        </div>
                                     )}
                                </div>
                                
                                <h3 className="text-sm font-medium text-gray-800 mb-1 hover:text-primary cursor-pointer line-clamp-2 h-10">
                                    {sweet.name}
                                </h3>
                                
                                    <div className="mt-auto">
                                        <p className="text-lg font-bold text-gray-900 mb-4">
                                            ₹{sweet.price} <span className="text-sm font-normal text-gray-500">
                                                {sweet.name.toLowerCase().includes('jelly bean') ? '/ 100gms' : '/ piece'}
                                            </span>
                                        </p>
                                        
                                        {(() => {
                                            const cartItem = cart.find(c => c.id === sweet.id);
                                            const qty = cartItem ? cartItem.quantity : 0;

                                            if (qty > 0) {
                                                return (
                                                    <div className="flex items-center justify-between bg-white border-2 border-primary rounded-md overflow-hidden">
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); decreaseQuantity(sweet.id); }}
                                                            className="px-4 py-2 bg-red-50 text-primary font-bold hover:bg-red-100 transition"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="font-bold text-gray-800">{qty}</span>
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); addToCart({ id: sweet.id, name: sweet.name, price: sweet.price, quantity: 1 }); }}
                                                            className="px-4 py-2 bg-red-50 text-primary font-bold hover:bg-red-100 transition"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <button
                                                        onClick={() => handlePurchase(sweet)}
                                                        disabled={sweet.quantity === 0}
                                                        className={`w-full py-2 font-bold text-sm uppercase tracking-wide transition-colors ${
                                                            sweet.quantity > 0 
                                                            ? 'bg-primary text-white hover:bg-red-700' 
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {sweet.quantity > 0 ? 'Purchase' : 'Out of Stock'}
                                                    </button>
                                                );
                                            }
                                        })()}
                                    </div>
                            </div>
                        ))}
                    </div>
                 )}
            </div>
        </div>
    </div>
  );
};

export default Home;
