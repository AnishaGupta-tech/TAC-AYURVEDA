import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../components/AuthGate';
import { supabase } from '../lib/supabaseClient';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load the signed-in user's cart from Supabase (joined with products for display data)
  const loadCart = useCallback(async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cart_items')
      .select('id, quantity, product_id, products (id, name, price, image, category)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error loading cart:', error);
      setLoading(false);
      return;
    }

    const items = (data || [])
      .filter((row) => row.products)
      .map((row) => ({
        id: row.products.id,
        cartItemId: row.id,
        name: row.products.name,
        price: row.products.price,
        image: row.products.image,
        category: row.products.category,
        quantity: row.quantity,
      }));
    setCartItems(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      loadCart(user.id);
    } else {
      // Signed out: clear in-memory cart. DB rows persist for next login.
      setCartItems([]);
    }
  }, [user, loadCart]);

  const addToCart = async (product) => {
    if (!user) return; // adding requires being signed in (enforced upstream too)

    const existing = cartItems.find((item) => item.id === product.id);
    // Optimistic local update
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    const newQuantity = (existing?.quantity || 0) + 1;
    const { error } = await supabase
      .from('cart_items')
      .upsert(
        { user_id: user.id, product_id: product.id, quantity: newQuantity },
        { onConflict: 'user_id,product_id' }
      );
    if (error) {
      console.error('Error saving cart item:', error);
      loadCart(user.id); // reconcile with server state on failure
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);
    if (error) {
      console.error('Error removing cart item:', error);
      loadCart(user.id);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId);
    if (error) {
      console.error('Error updating cart item:', error);
      loadCart(user.id);
    }
  };

  // Clears cart locally and in the DB (used after checkout, or manual clear)
  const clearCart = async () => {
    setCartItems([]);
    if (!user) return;
    const { error } = await supabase.from('cart_items').delete().eq('user_id', user.id);
    if (error) console.error('Error clearing cart:', error);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
