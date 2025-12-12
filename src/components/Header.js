import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/searchContext";
import FavoritesPage from "../pages/FavoritesPage";
import { useFavorites } from "../context/FavoritesContext";

export default function Header(){
 const {searchTerm, setSearchTerm} = useContext(SearchContext);
 const navigate = useNavigate();
const {favorites} = useFavorites();

 const handleSearch = () => {
     if(!searchTerm.trim())return;

    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    // navigate("/search");
    setSearchTerm("");
};

 return(
     <header style={{
        display: "flex",
            alignItems:"center",
            justifyContent:"space-between",
            padding: "1rem 2rem",
            backgroundColor: "#fff",
            boxShadow:"0 2px 10px rgba(0,0,0,0.4)",
            position: "sticky",
            top: 0,
            zIndex: 10,
     }}>
        <h1 style={{ fontSize: "1.8rem",
            fontWeight:"bold",
            color:"#000",
            letterSpacing:"1px",}}>Jor&AryShop</h1>
         <div style={{ display: "flex",
                    alignItems:"center",
                     background: "#f3f3f3",
                    borderRadius: "25px",
                    padding: "0.5rem 1rem",
                    flex: 1,
                    maxWidth: "400px",
                    margin: "0 2rem"}}>
         {/* Input */}
         <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) =>
                setSearchTerm(e.target.value)}
                style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    flex: 1,
                }}/>
                    <svg  onClick={handleSearch}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="26" 
                        height="26"  
                        fill="#333" 
                        cursor="pointer"
                        viewBox="0 0 24 24" > 
                        {/* <!--Boxicons v3.0.3 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
                        <path d="m18,10c0-4.41-3.59-8-8-8S2,5.59,2,10s3.59,8,8,8c1.85,0,3.54-.63,4.9-1.69l5.1,5.1,1.41-1.41-5.1-5.1c1.05-1.36,1.69-3.05,1.69-4.9Zm-14,0c0-3.31,2.69-6,6-6s6,2.69,6,6-2.69,6-6,6-6-2.69-6-6Z"></path>
                </svg>
                </div>
                <div onClick={() => navigate("/favoritos")}
                    style={{
                        fontSize: 30,
                        cursor: "pointer"
                    }}>
                ♥️
                {favorites.length > 0 && (
                    <span style={{
                        position: "absolute",
                        top: "19px",
                        right: "15px",
                        background: "black",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "50%",
                        padding: "2px 6px",
                    }}>{favorites.length}</span>
                )}
              </div>
     </header>
 )
}



