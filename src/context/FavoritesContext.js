import {createContext, useContext, useEffect, useState} from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({children}) => {
    const STORAGE_KEY = "jor_ary_favorites_v1";
    const [favorites, setFavorites] = useState([]);
    
    useState(()=> {
        const favs = localStorage.getItem("favorites");

        if(favs){
            try{
                const parsed = JSON.parse(favs);
                setFavorites(parsed);
                console.log("Favoritos cargados:",parsed);
        }catch(err){
            console.error("Error al parsear favoritos:", err);
        }   
        }else{
            console.log("No habia favorito en localStorage");
        }
    }, []);
   
// Guardar en localstorage
useEffect(()=>{
    localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log("Favoritos guardados:", favorites);
}, [favorites]);

const getKey = (p) => {
    if(!p) return null;
    if(typeof p === "object") return String(p.id ?? p.slug ?? p.title ?? "");
    return String(p);
};

const isFavorite = (product) => {
    const key = getKey(product);
    return favorites.some((f) => getKey(f) === key);
};
// Agregar o quitar
// const toggleFavorite = (product) => {
//     setFavorites((prev) => {
//         const exists = prev.find((p) => p._id === product._id);

//         if(exists) {
//             return prev.filter((p)=> p._id !== product._id);
//         }else{
//             return [...prev, product];
//         }
//     });
// };
// const getKey = (product) => product.id ?? product.slug;

const toggleFavorite = (product) => {
    const key = getKey(product);
    if(!key) return;

    setFavorites((prev)=>{

        const exists = prev.some((f)=> 
        getKey(f) === key);

        if(exists) {
            return prev.filter((f) =>
            getKey(f) !== key);
        }
        const toStore = typeof product === "object" ? product : {id: product};
        return [...prev, toStore];
    });
};

    const clearFavorites = () => setFavorites([]);

return (
    <FavoritesContext.Provider
        value={{ favorites, toggleFavorite , isFavorite, clearFavorites}}>
            {children}
        </FavoritesContext.Provider>
);
};

export const useFavorites = () => useContext(FavoritesContext);