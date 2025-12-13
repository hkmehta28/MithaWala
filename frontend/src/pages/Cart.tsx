
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalINR = Math.floor(total * 20); // Consistent conversion

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any sweets yet.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-md font-bold uppercase hover:bg-red-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-primary pb-2 inline-block">Shopping Cart</h1>

      <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-secondary/20 text-gray-700 uppercase text-sm">
                <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4">Subtotal</th>
                <th className="p-4 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {cart.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{item.name}</td>
                    <td className="p-4 text-gray-600">₹{Math.floor(item.price * 20)}</td>
                    <td className="p-4 text-center font-bold">{item.quantity}</td>
                    <td className="p-4 font-bold text-primary">₹{Math.floor(item.price * item.quantity * 20)}</td>
                    <td className="p-4 text-center">
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-xl"
                        title="Remove Item"
                    >
                        &times;
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <button 
            onClick={clearCart} 
            className="text-gray-500 hover:text-red-500 underline text-sm"
        >
            Clear Cart
        </button>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 w-full md:w-80">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Order Summary</h3>
            <div className="flex justify-between mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalINR}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-xl text-primary mb-6">
                <span>Total</span>
                <span>₹{totalINR}</span>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded font-bold uppercase hover:bg-red-700 transition">
                Proceed to Checkout
            </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
