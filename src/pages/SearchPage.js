import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { SearchContext } from "../context/searchContext";
import { useCart } from "../context/CartContext";

export default function SearchPage(){
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const {addToCart} = useCart();
    const location = useLocation();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("q") || searchParams.get("query") || "";

    useEffect(() => {
        if(!searchTerm.trim()){
            setResults([]);
            setLoading(false);
            return;
        }
        setLoading(true);

        fetch(`http://localhost:4000/api/products/search?q=${encodeURIComponent(searchTerm)}`)
            .then(res=>res.json())
            .then(data => {
                // console.log("Search results:", data);
        
        setResults(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Error al buscar:",err);
                setResults([]);
            })
            .finally(() => setLoading(false));
        },[searchTerm]);
        
    return(
        <div style={{padding: "20px", paddingBottom: "90px"}}>
            <h2 style={{fontSize: 22, marginBottom: 20}}><strong>Resultados para: <span style={{color:"#ff0059"}}>{searchTerm}</span></strong></h2>
            
            {!loading && searchTerm.trim() !== "" && Array.isArray(results) && results.length === 0 && (
                <p style={{marginTop: 20, fontSize: 18, textAlign: "center", opacity: 0.7}}>No se encontaron productos.</p>
            )}

        <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
        }}>
            {results.map((p) => (
                <div
                    key={p.id}
                    style={{
                        padding: "1rem",
                        background: "white",
                        borderRadius: "15px",
                        textAlign:"center",
                        border: "1px solid #eee",
                        cursor: "pointer",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease"
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateY(-5px)")}
                    onMouseLeave={(e) => 
                        (e.currentTarget.style.transform = "translateY(0)")}
                        >
                        <img
                            src={p.image}
                            alt={p.title}
                            style={{
                                width: "100%",
                                height: 230,
                                objectFit: "cover",
                                borderRadius: 10,
                            }}
                        />
                        <h3 style={{fontSize: "1.1rem", margin: "10px 0", fontWeight: 600}}>{p.title}</h3>
                        <p style={{
                            color: "#666",marginBottom: 10, fontWeight: "bold"
                        }}>${p.price}</p>
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

        {selectedProduct && (
            <ProductCard
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addToCart}
                />
        )}
        </div>
    );
}


// const SearchPage = () => {
//     const query = new URLSearchParams(useLocation().search).get("query") || "";
//     const [results, setResults] = useState();

//     useEffect(() => {
//         if(query.trim() === "") {
//             setResults([]);
//             return;
//         }

//         fetch(`http://localhost:4000/api/products/search/${query}`)
//             .then(res=>res.json())
//             .then(data => setResults(data));
//     }, [query]);

//     return(
//         <div style={{padding: "80px 16px 120px"}}>
//             <h2>Resultados de: "{query}"</h2>
//             {results.length === 0 && <p>No se encontraron productos.</p>}
//             <div style={{
//                 display:"grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 12
//             }}>
//             {results.map((p) => (
//                 <ProductCard key={p._id} product={p}/>
//             ))}
//         </div>
//         </div>
//     );
// };

// export default SearchPage;