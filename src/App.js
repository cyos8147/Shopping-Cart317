// App.js
import React, { useState } from 'react';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout'; // นำเข้า Checkout
import './App.css';

const App = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'ตุ๊กตาหมีขาว',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/A1.jpg',
    },
    {
      id: 2,
      name: 'ตุ๊กตาหมีน้ำตาล',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
    
        </ul>
      ),
      image: '/images/a2.webp',
    },
    {
      id: 3,
      name: 'ตุ๊กตาไดโนเสาร์เขียว',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a3.jpg',
    },
    {
      id: 4,
      name: 'ตุ๊กตาแพนด้า',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a4.webp',
    },
    {
      id: 5,
      name: 'ตุ๊กตาหนูน้อยหมวกขาว',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a5.png',
    },
    {
      id: 6,
      name: 'ตุ๊กตาหมีชมพู',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a6.jpg',
    },
    {
      id: 7,
      name: 'ตุ๊กตากระต่าย',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a7.jpg',
    },
    {
      id: 8,
      name: 'ตุ๊กตามังกรดำ',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a8.jpg',
    },
    {
      id: 9,
      name: 'ตุ๊กตาจระเข้',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a9.webp',
    },
    {
      id: 10,
      name: 'ตุ๊กตาไดโนเสาร์เขียว',
      price: 159,
      description: (
        <ul>
          <li>ขนนุ่มฟู ขนาดเล็ก</li>
          
        </ul>
      ),
      image: '/images/a10.webp',
    },
  ]);
  

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existItem = cartItems.find((item) => item.id === product.id);
    if (existItem) {
      setCartItems(cartItems.map((item) =>
        item.id === product.id ? { ...existItem, quantity: existItem.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const handleUpdateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(product);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart App</h1>

      {/* ส่วนแสดงรายการสินค้า */}
      <ProductList products={products} onAddToCart={handleAddToCart} />

      {/* ส่วนแสดงตะกร้าสินค้า */}
      <ShoppingCart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />

      {/* ส่วนแสดงผลรวมราคาและคูปอง */}
      <Checkout total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} />
    </div>
  );
};

export default App;
