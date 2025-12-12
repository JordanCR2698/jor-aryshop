import React, { useEffect, useState, useRef } from "react";
import {useCart} from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";


export default function CartPage (){
    const {cart,total,removeFromCart,updateQuantity,addToCart, clearSelectedItems} = useCart();
    const [selectedKeys, setSelectedKeys] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const selectAllRef = useRef(null);
    const getItemKey = (item) => `${item.id}::${item.selectedSize ?? ""}::${item.selectedColor ?? ""}`;
    const allKeys = cart.map(getItemKey);
    const allSelected = cart.length>0 && selectedKeys.length === cart.length;
    const someSelected = selectedKeys.length > 0 && selectedKeys.length < cart.length;
    const navigate = useNavigate();
    const [recommendedProducts, setRecomendedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toast, setToast] = useState(null);

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

    useEffect(()=>{
        if(!selectAllRef.current) return;
        selectAllRef.current.indeterminate = someSelected;
    },[someSelected]);
    
    const toggleSelect = (key) => {
        setSelectedKeys((prev)=>
            prev.includes(key) ? prev.filter((k)=>k !== key) : [...prev,key]
        );
    };

    const toggleSelectAll = () => {
        setSelectedKeys((prev)=>{
            if (prev.length === allKeys.length && allKeys.length > 0){
                return[];
            }
                return allKeys;
        });
    };

    const showMessage = (text, type = "info") => {
        setToast({text,type});
        setTimeout(() => setToast(null), 3000);
    };

     // Cargar carrito desde localStorage al iniciar
     if(!cart || cart.length === 0){
        return(
            <div style = {{padding:30, textAlign:"center"}}>
                <h2 style={{fontSize: 26, fontWeight: "700", color: "#ff3d7f"}}>Tu carrito está vacío</h2>
                <p style ={{opacity:0.7}}>Agregar productos para comenzar</p>
            </div>
        );
    }

   const sendWhatsappOrder = () => {
        if(selectedKeys.length === 0){
            showMessage("Seleccione al menos un producto para continuar", "warning");
            return;
        }

        const productosSeleccionados = cart.filter(allKeys =>
            selectedKeys.includes(allKeys.id));
        
        if(productosSeleccionados.lenght === 0){
            showMessage("Seleccione los productos que desea comprar");
            return;
        }    

        let mensaje = "Hola!! Me gustaría realizar el siguiente pedido:\n\n";

        productosSeleccionados.forEach((allKeys,index)=>{
            mensaje += `${index+1}. ${allKeys.name}\n`;
            mensaje += `   Talla: ${allKeys.size}\n`;
            mensaje += `   Color: ${allKeys.color}\n`;
            mensaje += `   Cantidad: ${allKeys.quantity}\n`;
            mensaje += `   Precio: $${allKeys.price}\n\n`;
        });

        const mensajeCodificado = encodeURIComponent(mensaje);
        const telefono = "5355472241"

        window.open(`https://wa.me/${telefono}?text=${mensajeCodificado}`, "_blank");


    //    const message = cart.map((item)=>
    //        `${item.title} - Talla: ${item.selectedSize ?? "N/A"}, Color: ${item.selectedColor ?? "N/A"}, Cantidad: ${item.quantity}, Precio: $${item.price}`
    //    )
    //    .join("\n");
    //    const phone = '5355472241'
    //    const totalMsg = `%0A%0A Total: $$ {total}`;
    //        const finalMessage = `Hola! Quiero hacer este pedido:%0A%0A {message}${totalMsg}`;
    //        const url = `https://wa.me/${phone}?text=${finalMessage}`;
    //        window.open(url, '_blank');
    };

    const selectedTotal = cart
            .filter(item =>
                    selectedKeys.includes(
                        `${item.id}::${item.selectedSize ?? ""}::${item.selectedColor ?? ""}`
                    ))
            .reduce((acc,item) => acc + item.price * item.quantity, 0);

    return(
        <div style = {{padding: 20, paddingBottom:"90px", background: "#f6f7fb", minHeight: "100vh"}}>
            {toast && (
                <div 
                    style={{
                        position: "fixed",
                        top: 20,
                        right: 20,
                        padding: "14px 20px",
                        borderRadius: 10,
                        background:
                            toast.type === "warning" ? "#ff9800" :
                            toast.type === "success" ? "#4CAF50" :
                            "#333",
                        color: "white",
                        fontWeight: "600",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        zIndex: 9999
                    }}
                    > {toast.text}
                    </div>
            )}
            <h2
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    marginBottom: 25,
                    textAlign: "center",
                    color: "#222",
                }}
            >Tu Carrito</h2>

            <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 15,
                background: "#fff",
                padding: 12,
                borderRadius: 10,
                boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
                width:"50%",
                maxWidth: 920,
            }}>
                <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    userSelect: "none"
                }}>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        ref={selectAllRef}
                        onChange={toggleSelectAll}
                        aria-label="Seleccionar todos"
                        style={{width:18, height:18, cursor:"pointer"}}
                        />
                    <span style={{fontWeight:600}}>Seleccionar todos</span>
                </label>
                <div style={{marginLeft:"auto", color:"#666"}}>
                    {selectedKeys.length} seleccionados
                </div>

            </div>

            {cart.map((item)=> {
                const key = getItemKey(item);
                const checked = selectedKeys.includes(key);
                return (
                    <div
                     key={key}
                     style={{
                         display: "flex",
                         alignItems: "center",
                         marginBottom: 20,
                         padding: 15,
                         background: "white",
                         borderRadius: 12,
                         boxShadow: "0 4px 10px rgba(0,0,0,0.45)",
                     }}
                   >
                       <input
                            type = "checkbox"
                            checked={checked}
                            onChange={(e)=> {
                                e.stopPropagation();
                                toggleSelect(key);
                            }}
                            style={{marginRight:10, width:18,height:18}}
                       />
                     <img src={item.image}
                            alt={item.title}
                            style={{
                                width: 90,
                                height: 90,
                                objectFit: "cover",
                                borderRadius: 10,
                                marginRight: 20,
                                marginLeft: 10,
                                cursor: "pointer",
                            }}   
                        />   
                        <div style={{flex: 1}}>
                            <h3 style={{fontSize: 18, marginBottom: 5}}>{item.title}</h3>
                            <p style={{ margin: 0, color: "#444"}}>Precio: <strong>${item.price}</strong></p>
                            {item.selectedSize && <p style={{margin: 0,color:"#444"}}>Talla: <strong>{item.selectedSize}</strong></p>}
                            {item.selectedColor && <p style={{ margin: 0, color: "#444"}}>Color: <strong>{item.selectedColor}</strong></p>}
                        
                        {/* Selector de cantidad */}
                        <div style={{marginTop:10, display:"flex", alignItems:"center"}}>
                            <button onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.quantity -1,
                                    item.selectedSize,
                                    item.selectedColor
                                )
                            }
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                border: "none",
                                background: "#ddd",
                                cursor: "pointer",
                                fontSize: 18,
                            }}><strong>-</strong></button>

                            <span style={{margin:"0 12px", fontSize: 18}}>{item.quantity}</span>

                            <button onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity + 1,
                                        item.selectedSize,
                                        item.selectedColor
                                    )}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        border: "none",
                                        background: "#4CAF50",
                                        color: "white",
                                        cursor: "pointer",
                                        fontSize: 18,
                                    }}><strong>+</strong></button>
                        </div>
                        </div>
                           <button onClick={()=>removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                    style={{
                                        background: "#ff4d4d",
                                        color: "white",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: 8,
                                        cursor: "pointer",
                                        fontSize: 16,
                                        marginLeft: 10,                                 
                                    }}
                        >Eliminar</button>             
                     </div>
                 )
                }
            )}


            <h3 style={{
                textAlign: "right",
                fontSize: 24,
                marginTop: 30,
                color: "#333",
            }}>Total: <strong>${selectedTotal}</strong></h3>

            <button 
                onClick={sendWhatsappOrder}
                style={{
                    marginTop: 20,
                    marginBlockEnd:10,
                    width: "100%",
                    padding: 16,
                    background: "#25D366",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 20,
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.95)"
                }}
            >Enviar pedido por WhatsApp</button>

            <div data-aos="fade-up" style={{marginTop:"40px"}}>
                <h2 style={{
                    marginBottom: "20px",
                    fontSize: "20px",
                    fontWeight: "700",
                    paddingLeft: "10px"
                    }}>Te gustaria llenar el carrito con...</h2>
            
                <div 
                    style={{
                    // display: "flex",
                    // overflowX:"auto",
                    // whiteSpace: "nowrap",
                    // gap: "14px",
                    // padding: "10px",
                    // scrollSnapType: "x mandatory",
                    // scrollbarWidth: "none",
                    // WebkitOverflowScrolling: "touch"
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
                    onClose={() => setSelectedProduct(null)}
                    />
            )}
        </div>
        
        
    );
    };


