import React, {useEffect, useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Home(){
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {addToCart} = useCart();
    const navigate = useNavigate();

    const clothingTypes = [
            {name:"Pullovers Oversizes", image:"/images/ropaHombre.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Pantalones Mezclillas", image:"/images/ropaHombre.jpg",clothing_type_slug:"carteras"},
            {name:"Zapatillas Deportivas", image:"/images/zapatillas.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Vestidos Largos", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Shores Mezclillas", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Juegos de Hombres", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Ropa Casual", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Ropa Deportiva", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
        ];
    const circleTypes = [
            {name:"Blusas", image:"/images/ropaHombre.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Pantalones", image:"/images/ropaHombre.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Zapatillas de Hombre", image:"/images/zapatillas.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Vestidos Cortos", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Shores de Nilon", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Juegos de falda", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Pijamas", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Carteras Negras", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Ropa Interior", image:"/images/ropaHombre.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Sandalias", image:"/images/ropaHombre.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Zapatillas de Mujer", image:"/images/zapatillas.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Vestidos Abiertos en la espalda", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Shores de Hombres", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Juegos de 3 Piezas", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Gorras Planas", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Gorras Enterizas", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Zapatillas de Mujer", image:"/images/zapatillas.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Vestidos Abiertos en la espalda", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Shores de Hombres", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Juegos de 3 Piezas", image:"/images/ropaMujer.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Gorras Planas", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
            {name:"Gorras Enterizas", image:"/images/relojes.jpg",clothing_type_slug:"pullovers_oversizes"},
        ];
   const rows =[
       circleTypes.slice(0, 7),
       circleTypes.slice(7, 14),
       circleTypes.slice(14, 21),
   ]
    // const {cart} = useCart();
    // const totalItems = cart.reduce((sum, i)=> sum + i.quantity, 0);
    
    const banners = [
        "/images/banners/banner.jpg",
        "/images/banners/banner1.jpg",
        "/images/banners/banner2.jpg",
        "/images/banners/banner3.jpg", 
    ];

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);
    const resetTimeout = () => {
        if (timeoutRef.current)
        clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() =>{
            setIndex((prev) => (prev + 1) % banners.length);
        },4000);
        return() => resetTimeout();
    }, [index]);

    const next = () => setIndex((prev) => (prev + 1) % banners.length);
    const prev = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

    // Obtener productos random
    useEffect(() =>{
        fetch("http://localhost:4000/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.sort(() => Math.random() - 0.5).slice(0, 1000));//1000 productos random
            })
            .catch((err) =>
                console.log("Error cargando productos", err));
            }, []);

    return(
        <div style={{
            paddingBottom:"100px",
            background: "#fff",
            fontFamily: "Poppins, sans-serif"
        }}>
            {/* Header */}
            {/* <header style={styles.header}>
                <h1 style={styles.logo}>Jor&AryShop</h1>

            <div style={styles.icons}> */}
                {/* Icono de perfil */}
                {/* <Link to="/profile" style={styles.iconLink}>
                <svg  xmlns="http://www.w3.org/2000/svg" 
                    width="26" 
                    height="26"  
                    fill="#333" 
                    cursor="pointer"
                    viewBox="0 0 24 24" > */}
                    {/* <!--Boxicons v3.0.3 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
                    {/* <path d="M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2"></path><path d="M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82"></path>
                </svg>
                </Link> */}
              {/* Icono favoritos */}
              {/* <div onClick={() => navigate("/favoritos")}
                    style={{
                        fontSize: 30,
                        cursor: "pointer"
                    }}>
                ♥️
              </div>
            </div>
            </header> */}

            {/* Banner principal */}
            <div style={{
                position: "relative",
                width: "100%",
                height: "45vh",
                overflow: "hidden",
            }}>
                <div style={{
                    display:"flex",
                    width: `${banners.length * 100}%`,
                    transform: `translateX(-${index * 25}%)`,
                    transition: "transform 0.7s ease-in-out",
                }}>
                    {banners.map((src,i) =>(
                         <img
                            key={i}
                            src={src}
                            alt="Banner"
                            style={{
                             width:"100%",
                             height: "100%",
                             objectFit:"cover",
                         }}
                     />
                    ))}
                </div>
                {/* Botones */}
                <button
                    onClick={prev}
                    style={{
                        position:"absolute", left:10, top:"50%",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        fontSize: 18
                    }}>
                        ◄
                </button>
                <button
                    onClick={next}
                    style={{
                        position:"absolute", right:10, top:"50%",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.4)",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        fontSize: 18
                    }}>
                        ►
                </button>
            </div>

         {/* Tipos de ropa(Carrusel horizontal) */}
         {/* <h3 style={{margin: "15px", fontSize: "20px"}}>Explora por tipo</h3> */}
         <div style={{
             display: "flex",
             overflowX: "scroll",
             gap:"12px",
             padding: "10px 12px",
             scrollbarWidth: "none"
         }}>
            {clothingTypes.map((item) => (
                 <div key = {item.name}
                 style={{
                     minWidth: "140px",
                     position: "relative",
                     borderRadius: "10px",
                     overflow: "hidden",
                     cursor: "pointer",
                 }} 
                    onClick={() => navigate("/typePage",{state: { clothing_type_slug: item.clothing_type_slug },})}
                    >
                     <img
                        src={item.image}
                        alt={item.name}
                        style={{
                            width: "140px",
                            height: "160px",
                            objectFit: "cover"
                        }}
                     />
                     <div style={{
                         position: "absolute",
                         bottom: 0,
                         width: "100%",
                         background: "rgba(0,0,0,0.45)",
                         color: "#fff",
                         padding: "6px 5px",
                         textAlign: "center",
                         fontSize: "14px",
                     }}>
                         {item.name}
                     </div>
                 </div>
             ))}
         </div>
         {/* Lista circular */}
         <div style={{
                marginTop: 20,
                // paddingLeft: "20px",
         }}>
             <div style={{
                 overflowX: "auto",
                 whiteSpace: "nowrap",
                 paddingBottom: 10,
                 paddingLeft: 10,
                 scrollbarWidth: "none",
                 cursor: "pointer"
             }}>
                 <div style={{
                     display:"inline-flex", 
                     flexDirection: "column",
                     gap:10,  
                 }}>
                 {rows.map((row,idx) => (
                 <div key = {idx}
                      style={{
                          display: "flex",
                          overflowX: "auto",
                          gap: 10,
                      }}>
                      {row.map((item, i) => (
                          <div key={i}
                                style={{
                                    textAlign: "center",
                                    textDecoration: "none",
                                    color: "#000",
                                    width: 110,
                                    flexShrink: 0,
                                }}
                                onClick={() => navigate("/typePage", {state: {clothing_type_slug: item.clothing_type_slug},})}>
                            <img
                                src={item.image}
                                style={{
                                    width: 90,
                                    height: 90,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "2px solid #ddd",
                                    margin: "0 auto",
                                    display: "block"
                        }}
                     />
                     <p style={{
                         fontSize:14, 
                         marginTop:6,
                         lineHeight: "16px",
                         height: 32,
                         overflow: "hidden",
                         display: "flex",
                         textAlign: "center",
                         justifyContent: "center",
                         alignItems: "center",
                         whiteSpace: "normal"
                         }}>{item.name}</p>
                          </div>
                      ))}
                 </div>
                ))}
               </div>
             </div>
         </div>
         {/* Para ti */}
         <h3 style={{margin:"15px", fontSize:"20px"}}>♦Para ti♦</h3>
         <div style={{
             display: "grid",
             gridTemplateColumns: "repeat(2,1fr)",
             gap:"10px",
             padding: "10px",
         }}>
             {products.map((p) => (
                 <div key={p.id}
                    style={{
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                    onClick={() => setSelectedProduct(p)}
                    >
                        <img
                            src={p.image}
                            style={{
                                width: "100%",
                                height: "160px",
                                objectFit: "cover"
                            }}
                        />
                        <div style={{padding: "8px"}}>
                            <p style={{fontSize:"14px", fontWeight: 500}}>{p.title}</p>
                            <p style={{fontSize:"16px", fontWeight:"bold", color:"#ff007f"}}>${p.price}</p>
                        </div>
                 </div>
             ))}
         </div>
         {selectedProduct && (<ProductCard
                    product={selectedProduct}
                    onClose={()=> setSelectedProduct(null)}
                    onAddToCart = {addToCart}
                    />
                    )}
        </div>
    );
}

// const styles ={
//     page:{
//         fontFamily:"Poppins, sans-serif", 
//         background:"#fff",
//         paddingBottom: "90px"
//     },
//     header:{
//         display: "flex",
//         alignItems:"center",
//         justifyContent:"space-between",
//         padding: "1rem 2rem",
//         backgroundColor: "#fff",
//         boxShadow:"0 2px 10px rgba(0,0,0,0.4)",
//         position: "sticky",
//         top: 0,
//         zIndex: 10,
//     },
//     logo:{
//         fontSize: "1.8rem",
//         fontWeight:"bold",
//         color:"#000",
//         letterSpacing:"1px",
//     },
    // searchContainer:{
    //     display: "flex",
    //     alignItems:"center",
    //     background: "#f3f3f3",
    //     borderRadius: "25px",
    //     padding: "0.5rem 1rem",
    //     flex: 1,
    //     maxWidth: "400px",
    //     margin: "0 2rem"
    // },
    // searchInput:{
    //     border: "none",
    //     outline: "none",
    //     background: "transparent",
    //     flex: 1,
    // },
//     icons:{
//         display: "flex",
//         gap: "1rem",
//     },
//     iconLink:{
//         display: "flex",
//         alignItems: "center",
//     },
//     banner:{
//         height: "70vh",
//         backgroundImage:
//             "url('/images/banner3.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         display:"flex",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         color:"#fff",
//         textShadow: "0 8px 8px rgba(0,0,0,0.9)",
//     },
//     bannerText: {
//         background: "rgba(0,0,0,0.7)",
//         padding: "2rem",
//         borderRadius: "15px",
//     },
//     button:{
//         backgroundColor: "#000",
//         color: "#fff",
//         border: "none",
//         padding: "0.8rem 2rem",
//         borderRadius: "25px",
//         cursor: "pointer",
//         marginTop: "2rem",
//     },
//     categories:{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit,minmax(200px, 1fr))",
//         gap: "1.5rem",
//         padding: "2rem",
//     },
//     categoryCard: {
//         textAlign: "center",
//         borderRadius: "15px",
//         overflow: "hidden",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//         transition: "transform 0.3s ease",
//         cursor: "pointer",
//     },
//     categoryImageWrapper:{
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: "15px",
//     },
//     categoryImage: {
//         width: "100%",
//         height: "90%",
//         objectFit: "cover",
//         transition: "transform 0.4s ease",
//     },
//     categoryOverlay:{
//         position: "absolute",
//         bottom: 0,
//         width: "100%",
//         background: "rgba(0,0,0,0.4)",
//         color:"#fff",
//         padding: "1rem",
//         textAlign: "center",
//     },
//     categoryOverlayTitle:{
//         fontSize: "1.3rem",
//         fontWeight: "600",
//         textTransform: "uppercase",
//         margin: 0,
//         letterSpacing: "1px"
//     }
// };