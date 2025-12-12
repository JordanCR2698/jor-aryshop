import React, {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import axios from "axios";

export default function ProductCard({product, onClose, onAddToCart}){
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(""); 
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const {id} = useParams();
    const {addToCart} = useCart();
    const location = useLocation();
    const {favorites, toggleFavorite} = useFavorites();

    const getKey = (product) => product.id ?? product.slug;
    const isFavorite = favorites.some((f) => f.id === product.id);

     useEffect(()=>{
        const toArray = (v) => {
            if (!v) return [];
            if(Array.isArray(v)) return v;
            if(typeof v === "string") return
            v.split(",").map((s) =>
            s.trim()).filter(Boolean);
            return[String(v)];
        };
        setSizes(toArray(product?.sizes ?? product?.availableColors));
        setColors(toArray(product?.colors ?? product?.availableColors));

        setSelectedSize("");
        setSelectedColor("");
    }, [product]);

        if(!product?.id) return null;
    
        const handleAdd = () => {
            if(sizes.length > 0 && ! selectedSize){
                alert("Selecciona una talla");
                return;
            }
            if(colors.length > 0 && ! selectedColor){
                alert("Selecciona un color");
                return;
            }
    
            const itemToAdd = {
                id: product.id,
                title: product.title ?? product.name,
                price: product.price,
                image: product.image,
                selectedSize: selectedSize || null,
                selectedColor: selectedColor || null,
                quantity: 1,
            };
    
            addToCart(itemToAdd);
    
            onClose?.();
        };

    return(
        <div className="fixed inset-0 pb-20 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[80%] md:w-[480] relative">
                <button onClick={onClose} className="absolute top-3 right-2 text-gray-500">X</button>
                
                <img src={product.image} alt={product.title} 
                // className="w-full h-64 object-cover rounded-lg mb-4"
                style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                    borderRadius: "10px",
                }}
               />
                <div
                    onClick={()=> toggleFavorite(product)}
                    style={{
                        position: "absolute",
                        top: 19,
                        left: 27,
                        fontSize:32,
                        cursor: "pointer",
                    }}>{isFavorite ? "❤️" : "🖤"}</div>
                <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-bold text-blue-600 mb-4">${product.price}cup</p>

                {sizes.length > 0 && (
                    <>
                <label className="block mt-4 mb-1 font-medium">Selecciona una talla:</label>
                <select value={selectedSize} onChange={(e) =>
                    setSelectedSize(e.target.value)}
                    className="w-full border rounded-lg p-2">
                        <option value="">--Elige una talla--</option>
                             {sizes.map((s)=>(
                                 <option key={s} value={s}>{s}</option>
                             ))}
                    </select>
                    </>
                )}
                    
                    {colors.length >0 && (
                        <>
                    <label className="block mt-4 mb-1 font-medium">Selecciona un color</label>
                    <select value={selectedColor} onChange={(e) =>
                    setSelectedColor(e.target.value)} className="w-full border rounded-lg p-2">
                        <option value="">--Elige un color--</option>
                        {colors.map((c)=>(
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    </>
                    )}

                    
                    
                     <button onClick={handleAdd}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Agregar al carrito</button>       

            </div>
        </div>
    );
}
