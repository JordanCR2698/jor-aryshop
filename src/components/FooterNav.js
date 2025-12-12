import React from "react";
import {Link, useLocation} from "react-router-dom";
import { useCart} from "../context/CartContext";

export default function FooterNav(){
    const location = useLocation();
    const {cart} = useCart();
    const totalItems = cart.reduce((sum, item)=>sum + item.quantity, 0);
    const isActive = (path) => location.pathname === path;

    return(
        <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "#ffffff",
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-around",
            padding: "10px 0",
            zIndex: 999,
        }}>
            {/* HOME */}
            <Link to="/" style={{
                textDecoration: "none",
                color: isActive("/") ? "#ff007f" : "#555"
            }}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",textAlign: "center",alignItems:"center"}}>
                    <svg  
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24"  
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.15-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Zm9-8.59 6 6V20H6v-9.59z"></path>
                    </svg>
                    <span>Home</span>
                </div>
            </Link>
            {/* Categoria */}
            <Link to="/categories" style={{
                textDecoration: "none",
                color: isActive("/categories") ? "#ff007f" : "#555"
            }}>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",textAlign: "center",alignItems:"center"}}>
                <svg  
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24"  
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round" >

<path class="b" d="m9.5,3h-5c-.83,0-1.5.67-1.5,1.5v5c0,.83.67,1.5,1.5,1.5h5c.83,0,1.5-.67,1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5Zm-.5,6h-4v-4h4v4Z"></path><path class="b" d="m19.5,3h-5c-.83,0-1.5.67-1.5,1.5v5c0,.83.67,1.5,1.5,1.5h5c.83,0,1.5-.67,1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5Zm-.5,6h-4v-4h4v4Z"></path><path class="b" d="m9.5,13h-5c-.83,0-1.5.67-1.5,1.5v5c0,.83.67,1.5,1.5,1.5h5c.83,0,1.5-.67,1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5Zm-.5,6h-4v-4h4v4Z"></path><path class="b" d="m20,16c0-1.93-1.57-3.5-3.5-3.5s-3.5,1.57-3.5,3.5,1.57,3.5,3.5,3.5c.47,0,.91-.1,1.32-.26l1.72,1.72,1.41-1.41-1.57-1.57c.39-.56.61-1.24.61-1.97Zm-5,0c0-.83.67-1.5,1.5-1.5s1.5.67,1.5,1.5-.67,1.5-1.5,1.5-1.5-.67-1.5-1.5Z"></path>
</svg>
                    <span>Categoría</span>
                </div>
            </Link>

              {/* Icono carrito */}
              <Link to="/cart" style={{
                textDecoration: "none",
                color: isActive("/cart") ? "#ff007f" : "#555",
                // position:"relative"
            }}>
                <div style={{display:"flex",flexDirection:"column",textAlign: "center",alignItems:"center",position:"relative"}}>
                <svg  
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24"  
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round" >
<path d="M10.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M17.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M8.82 15.77c.31.75 1.04 1.23 1.85 1.23h6.18c.79 0 1.51-.47 1.83-1.2l3.24-7.4c.14-.31.11-.67-.08-.95S21.34 7 21 7H7.33L5.92 3.62C5.76 3.25 5.4 3 5 3H2v2h2.33zM19.47 9l-2.62 6h-6.18l-2.5-6z"></path>
</svg>
                {totalItems> 0 && (
                    <span style={{
                        position: "absolute",
                        top:"-5px",
                        right: "-5px",
                        background: "#ff007f",
                        color: "white",
                        fontSize: "12px",
                        padding: "1px 6px",
                        borderRadius: "50%",
                        fontWeight: "bold",
                    }}>{totalItems}</span>
                )}
                <span>Carrito</span>
                </div>
                </Link>
                {/* PERFIL */}
                <Link to="/" style={{
                    textDecoration: "none",
                    color: isActive("/profile") ? "#ff007f" : "#555",
                    position:"relative"
                }}>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",textAlign: "center",alignItems:"center"}}>
                        <svg height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <circle cx="12" cy="7" r="4"/>
                        <path d="M5.5 21a9 9 0 0 1 13 0"/>
                        </svg>
                        <span>Yo</span>
                    </div>
                </Link>
        </div>
    );
}
