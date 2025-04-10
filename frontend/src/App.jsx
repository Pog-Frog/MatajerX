import { Route, Routes } from 'react-router'
import Cart from "./pages/Cart";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPage from "./pages/Admin"
import { ToastContainer } from "react-toastify";

function App() {

  const [products, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const handleChangeCount = (id, newCount) => {
    setCartProducts(cartProducts.map((item) => item.id === id ? { ...item, count: newCount } : item))
  }

  const handleResetCount = () => {
    setCartProducts([])
  }

  const isInCart = (item) => {
    return cartProducts.some((prod) => prod.id === item.id);
  }

  const addProductToCart = (item) => {
    if (!isInCart(item)) {
      setCartProducts([...cartProducts, { ...item, count: 1 }]);
    }
  }

  const removeProductFromCart = (itemID) => {
    setCartProducts(cartProducts.filter((prod) => prod.id !== itemID));
  }

  const totalItems = cartProducts.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cartProducts.reduce((sum, item) => sum + (item.price * item.count), 0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios("http://localhost:3000/menu?delay=3000");
      console.log(response);
      setItems(response.data.map((prod) => ({ ...prod, count: 0 })));
    }

    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:3000/categories?delay=3000");
      console.log(response);
      setCategories(response.data);
    }

    fetchProducts();
    fetchCategories();

  }, [])

  return (
    <>
      <Routes>
        <Route element={<Layout totalItems={totalItems} />}>
          <Route path="/cart" element={<Cart products={cartProducts} handleChangeCount={handleChangeCount} handleResetCount={handleResetCount} removeProductFromCart={removeProductFromCart} totalItems={totalItems} totalPrice={totalPrice} />} />
          <Route path="/" element={<Home products={products} categories={categories} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} isInCart={isInCart} /> } />
          <Route path="/admin" element={<AdminPage products={products} categories={categories} setProducts={setItems} setCategories={setCategories} />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover theme="light" />
    </>
  )
}

export default App
