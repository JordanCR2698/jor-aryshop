import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function Categories(){
    const categories=["Todo","Ropa de Mujer","Ropa de Hombre","Zapatos","Carteras","Relojes"];
    
    const location = useLocation();
    const initialCategory = location.state?.category||"Todo";
    const {cart} = useCart();
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {addToCart} = useCart();
    const totalItems = cart.reduce((sum, i)=> sum + i.quantity, 0);

    useEffect(()=>{
      fetch("http://localhost:4000/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err)=>
            console.error("Error:", err));
       }, []);

       const filteredProducts = products.filter((product)=>{
           if(selectedCategory==="Todo") return true;
           return product.category?.toLowerCase() === selectedCategory.toLowerCase();
       });

    return(
        <div style={styles.page}>
            {/* Barra superior de categorias */}
            <div style={styles.categoryBar}>
                {categories.map((cat)=>(
                    <button key={cat} onClick={()=> setSelectedCategory(cat)} 
                    style={{
                        ...styles.categoryButton,
                        ...(selectedCategory === cat ? styles.activeCategory:{}),
                    }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Lista de productos */}
            <div style={styles.productGrid}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key = {product.id} 
                        style={styles.productCard}
                        onMouseEnter={(e)=>
                        (e.currentTarget.style.transform = "translateY(-5px)")}
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateY(0)")}>
                        
                        <img src={product.image} alt={product.title} style={styles.productImage}/>
                        <h3 style={styles.productName}>{product.title}</h3>
                        <p style={styles.productPrice}>${product.price}</p>
                        <button style={styles.addToCart} onClick={()=> setSelectedProduct(product)}>Agregar al carrito</button>
                     </div>

                    ))
                ) : (
                    <p style={{textAlign:"center", marginTop:"30px"}}>
                        No hay productos en esta categoría
                    </p>
                )}
            </div>


                {/*Modal para detalles del producto  */}
                {selectedProduct && (<ProductCard
                    product={selectedProduct}
                    onClose={()=> setSelectedProduct(null)}
                    onAddToCart = {addToCart}
                    />
                    )}
        </div>
    );
}

const styles ={
    page:{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#fff",
        minHeight: "100vh",
        paddingBottom: "90px",
    },
    categoryBar:{
        display: "flex",
        overflowX: "auto",
        gap: "1rem",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eee",
        marginBottom: "2rem",
    },
    categoryButton:{
        background: "transparent",
        border: "1px solid #ddd",
        borderRadius: "20px",
        padding: "0.5rem 1.2rem",
        cursor: "pointer",
        fontWeight: "500",
        transition: "all 0.3s ease",
    },
    activeCategory: {
        backgroundColor: "#000",
        color: "#fff",
        borderColor: "#000",
    },
    productGrid:{
        padding:"1rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
    },
    productCard:{
        border: "1px solid #eee",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.9)",
        padding: "1rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    productImage:{
        width: "100%",
        height: "230px",
        objectFit: "cover",
        borderRadius: "10px",
    },
    productName: {
        fontSize: "1.1rem",
        fontWeight: "600",
        margin: "0.8rem 0 0.3rem",
    },
    productPrice: {
        color: "#666",
        marginBottom: "0.5rem",
    },
    addToCart:{
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        padding: "0.6rem 1.5rem",
        borderRadius: "25px",
        cursor: "pointer",
        transition: "bacground 0.3s ease",
    },
}