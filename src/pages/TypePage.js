import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function TypePage(){
    const {state} = useLocation();
    const clothing_type_slug = state?.clothing_type_slug || null;
    const {addToCart} = useCart();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
    //     if(!clothing_type_slug) return;

    //     fetch(`/api/products?type=${encodeURIComponent(clothing_type_slug)}`)
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    //         .catch(err => console.error(err));
    // }, [clothing_type_slug]);
        axios 
            .get("http://localhost:4000/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    },[]);

    if(!clothing_type_slug) return <p style={{padding: 60, textAlign:"center", fontSize:"20px"}}>No se ha seleccionado tipo de ropa</p>;

    const filteredProducts = products.filter((p) => p.clothing_type_slug === clothing_type_slug);

    return(
        <div style={{padding: "20px", paddingBottom: "90px"}}>
            <h2 style={{fontSize: 32,
                    fontWeight: "bold",
                    marginBottom: 25,
                    textAlign: "center",
                    color: "#222",}}>
                {clothing_type_slug.replace(/_/g," ").replace(/^\w/, c => c.toUpperCase())}
            </h2>

        {filteredProducts.length === 0 ? (
            <h2 style={{fontSize: 26, fontWeight: "600", color: "#ff3d7f"}}>No hay productos disponibles para este tipo de ropa</h2>
        ) : (
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap:"12px"
            }}>
                {filteredProducts.map((product) => (
                    <div key={product.id} style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                    }} onClick = {() => setSelectedProduct(product)}>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "cover"
                            }}
                        />
                        <div style={{padding: "8px"}}>
                            <p style={{fontSize: "0.9rem", fontWeight: "500"}}>{product.title}</p>
                            <p style={{color: "red", fontSize: "1rem"}}>${product.price}</p>
                        </div>
                    </div>
                ))}    
            </div>
            )}
             {selectedProduct && (<ProductCard
                    product={selectedProduct}
                    onClose={()=> setSelectedProduct(null)}
                    onAddToCart = {addToCart}
                    />
                    )}
        </div>
    );
}