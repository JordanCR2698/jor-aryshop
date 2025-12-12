import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const FavoritesPage = () => {
    const {cart} = useCart();
    const {favorites} = useFavorites();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [recommendedProducts, setRecomendedProducts] = useState([]);

    useEffect(()=>{
        if(!cart || cart.length === 0)return;
        
        fetch("http://localhost:4000/api/products")
            .then((res) => res.json())
            .then((allKeys) => {
                const related = [...allKeys].sort(() => Math.random() - 0.5);
            
            setRecomendedProducts(related);
            })
            .catch((err) =>
                console.log("Error cargando productos recomendados:", err)
     )
    },[cart]);

return (
    <div style={{paddingBottom: 90, textAlign:"center"}}>
        <h2 style={{fontSize: 22, fontWeight: "700", color: "#ff3d7f", padding: 20}}>Mis favoritos ♥️</h2>
        {favorites.length === 0 && (<p style={{opacity:0.7}}>No tienes productos en favoritos.</p>)}
    
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 15,
            padding: 20,
        }}>
            {favorites.map((p) => (
                <div
                    key={p.id}
                    onClick={() =>setSelectedProduct(p)}
                    style={{
                        background: "white",
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                    }}>
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{
                                width: "100%",
                                height: 150,
                                objectFit:"cover",
                                borderRadius: 8,
                            }}
                        />
                        <h4 style={{marginTop: 10, fontSize: 16}}>{p.title}</h4>
                        <p style={{color:"#ff0059", fontWeight:"bold", paddingBottom:"10px"}}>{p.price}</p>
                        <button style={{
                            backgroundColor: "#000",
                            color: "#fff",
                            cursor: "pointer",
                            padding: "0.6rem 1.5rem",
                            borderRadius: "25px",
                            border: "none",
                            fontWeight: "500",
                        }} onClick={()=> setSelectedProduct(p)}>Agregar al carrito</button>
                    </div>
        ))}
        </div>
        <div data-aos="fade-up" style={{marginTop:"40px"}}>
                <h2 style={{
                    marginBottom: "20px",
                    fontSize: "20px",
                    fontWeight: "700",
                    paddingLeft: "10px"
                    }}>También podría gustarte...</h2>
            
                <div 
                    style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: 15,
                    paddingLeft: "30px",
                }}>
                    {recommendedProducts.map((p)=>(
                        <div key={p.id}
                            onClick={()=>setSelectedProduct(p)}
                            style={{
                                minWidth: "150px",
                                maxWidth: "150px",
                                flex: "0 0 auto",
                                scrollSnapAlign: "center",
                                overflow:"hidden",
                                background:"white",
                                padding: 10,
                                borderRadius: "10px",
                                border: "1px solid #ddd",
                                cursor: "pointer",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.45)",
                            }}>
                            <img
                                src = {p.image}
                                alt={p.title}
                                style={{
                                    width:"100%",
                                    height: 150,
                                    objectFit: "cover",
                                    borderRadius: 8,
                                }}
                            />
                            <p style={{color: "#ff0059", fontWeight: "bold"}}>
                                ${p.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        {selectedProduct && (
            <ProductCard
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}/>
        )}
    </div>
);
};

export default FavoritesPage;