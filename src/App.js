import React from "react";
import { useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import Header from "./components/Header";
import Categories from "./pages/Categories";
import Admin from "./pages/Admin";
import CartPage from "./pages/CartPage";
import FooterNav from "./components/FooterNav";
import AOS from 'aos';
import 'aos/dist/aos.css';
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import TypePage from "./pages/TypePage";

function App(){
  useEffect(() => {
    AOS.init({
      duration:600,
      easing: "ease-out",
    });
  }, []);

  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/typePage" element={<TypePage/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/favoritos" element={<FavoritesPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
      <FooterNav/>
    </BrowserRouter>
  );
}

export default App;
