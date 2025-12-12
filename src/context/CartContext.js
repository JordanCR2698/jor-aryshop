import React, {createContext, useState, useContext, useEffect} from "react";

const CartContext = createContext();
export const useCart = () => 
    useContext(CartContext);

const makeKey = (id, size, color) => `${id}::${size ?? ""}::${color ?? ""}`;

export const CartProvider=({children})=> {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(()=>{
          localStorage.setItem("cart",JSON.stringify(cart));
    }, [cart]);    

    const addToCart = (product) => {
        setCart((prev)=>{
            const existing = prev.find((p) =>
                p.id === product.id && p.selectedSize === product.selectedSize && p.selectedColor === product.selectedColor
            );

            if(existing){
                return prev.map((p) => 
                        p.id === existing.id && 
                        p.selectedSize === existing.selectedSize &&
                        p.selectedColor === existing.selectedColor
                            ? {...p, quantity: p.quantity + product.quantity}
                            : p
                        );
                    }
                        return [...prev,{ ...product, selected:false}];
            });
        }

    const removeFromCart = (id,size = null, color=null) => {
        const key = `${id}::${size ?? ""}::${color ?? ""}`;
        setCart((prev) => prev.filter((p)=> `${p.id}::${p.selectedSize ?? ""}::${p.selectedColor ?? ""}`!==key)
        );
    };

    const updateQuantity = (id, quantity, size = null, color = null) => {
        const key = `${id}::${size ?? ""}::${color ?? ""}`;
        setCart((prev) => prev.map((p) => `${p.id}::${p.selectedSize ?? ""}::${p.selectedColor ?? ""}`===key
        ? {...p, quantity: Math.max(1,quantity)} : p
        )
        );
    };

    const clearSelectedItems = (itemsToDelete = []) => {
        const deleteKeys = new Set(itemsToDelete.map((it) =>
        makeKey(it.id, it.size ?? null, it.color ?? null))
        );
        setCart((prev) => prev.filter((p) =>
            !deleteKeys.has(makeKey(p.id, p.selectedSize, p.selectedColor))));
    };
        
    const clearCart = () => setCart([]);

    const total = cart.reduce((acc,i) => 
        acc + (i.price ?? 0) * (i.quantity ?? 1), 0);

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, total, updateQuantity, clearSelectedItems, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};