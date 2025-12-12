import {useState, useEffect} from "react";
import axios from "axios";

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")//eliminar acentos
        .replace(/[^a-z0-9]+/g,"_")//convertir espacios y simbolos en _
        .replace(/^-+|-+$/g, "");//quitar guiones del inicio y final
};

export default function AdminForm(){
    const [product, setProduct]= useState({
        title: "",
        price: "",
        image: "",
        category: "",
        description:"",
        is_active:"",
        original_price:"",
        sizes:"",
        colors:"",
        clothing_type:"",
        clothing_type_slug:"",
    });

    const [products, setProducts]=useState([]);
    const [editingId, setEditingId]=useState(null);

    // Obtener productos
    const fetchProducts=async ()=>{
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(res.data);
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    useEffect(() => {
        if(product.clothing_type){
            setProduct((prev) => ({
                ...prev,
                clothing_type_slug: slugify(prev.clothing_type),
            }));
        }
    }, [product.clothing_type]);

    const payload = {
        ...product,
        sizes: product.sizes, //Se envian como string: "S,M,L"
        colors: product.colors, 
    }

    // Manejar cambios del formulario
    const handleChange = (e)=>{
        setProduct({...product, [e.target.name]: e.target.value});
    };

    // Crear o actualizar producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(editingId){
                await axios.put(`http://localhost:4000/api/products/${editingId}`,product);
                alert("Producto actualizado correctamente");
            }else{
                await axios.post("http://localhost:4000/api/products",product);
                alert("Producto agregado correctamente");
            }
            setProduct({title:"", price:"", image:"", category:"", description:"", is_active:"", original_price:"",sizes:"",colors:""});
            setEditingId(null);
            fetchProducts();
        }catch(err){
            console.error(err);
            alert("Error al guardar el producto");
        }
    };

    // Eliminar producto
    const handleDelete = async (id) => {
        if (window.confirm("Seguro que desea eliminar este producto?")){
           try{
               const response =  await axios.delete(`http://localhost:4000/api/products/${id}`);
                    alert(response.data.message);
                    fetchProducts();
            }catch(error){
                console.error("Error al eliminar producto:", error);
                alert("Error al conectar con el servidor");
            }
        }
    };

    // Cargar datos al editar
    const handleEdit = (prod) => {
        setProduct(prod);
        setEditingId(prod.id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-6 pb-20">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">    
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">Panel de Administrador
        <span className="text-gray-700"> Jor&AryShop</span></h1>
        
        <div className="bg-purple-50 rounded-xl p-6 shadow-inner mb-10">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 text-center">{editingId ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
        
        <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
            name="title"
            placeholder="Título"
            value={product.title}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
            required
        />
        <input
            name="price"
            placeholder="Precio"
            type="number"
            value={product.price}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
            required
        />
        <input
            name="original_price"
            placeholder="Precio original"
            type="number"
            value={product.original_price}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
            required
        />
        <input
            name="sizes"
            placeholder="Tallas (ej: S, M, L, XL)"
            value={product.sizes}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
        />
         <input
            name="colors"
            placeholder="Colores (ej: Blanco, Negro, Rojo)"
            value={product.colors}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
        />
        <input
            name="image"
            placeholder="URL de la imagen (ej: /images/ropa.jpg)"
            value={product.image}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
            required
        />
        <input
            name="category"
            placeholder="Categoría"
            value={product.category}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
            required
        />
        <input
            name="is_active"
            placeholder="Producto Activo"
            value={product.is_active}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
            required
        />
         <input
            name="clothing_type"
            placeholder="Tipo de ropa(ej: Vestidos, Pantalones...)"
            value={product.clothing_type}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
        />
        {product.clothing_type && (
            <p className="text-sm text-gray-600 mt-[-10px] ml-1">
                <strong>Slug generado:</strong>
                {product.clothing_type_slug}
            </p>
        )}
        <textarea
            name="description"
            placeholder="Descripción del producto"
            value={product.description}
            onChange={handleChange}
            className="p-3 border rounded-lg col-span-2 h-24 resize-none focus:ring-2 focus:ring-purple-400 outline-none" 
        />
        <button
            type="submit"
            className="col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all"
            >{editingId ? "Actualizar Producto" : "Agregar Producto"}</button>
        </form>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Productos en Inventario</h2>
        <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="w-full text-center border border-gray-300 bg-white">
                <thead className="bg-purple-200 text-gray-700">
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Imagen</th>
                        <th className="p-3 border">Título</th>
                        <th className="p-3 border">Categoría</th>
                        <th className="p-3 border">Precio</th>
                        <th className="p-3 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p)=>(
                        <tr key={p.id} className="hover:bg-purple-50 transition">
                            <td className="p-3 border">{p.id}</td>
                            <td className="p-3 border">
                                <img src={p.image} alt={p.title} className="p-1 font-medium rounded-lg border"/>
                            </td>
                            <td className="p-3 border font-medium text-gray-700">{p.title}</td>
                            <td className="p-3 border">{p.category}</td>
                            <td className="p-3 border font-semibold text-pourple-600">{p.price}</td>
                            <td className="p-3 border">
                                <div className="flex flex-col items-center gap-2">
                                <button 
                                    onClick={()=>handleEdit(p)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                                >Editar</button>
                                 <button 
                                    onClick={()=>handleDelete(p.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                                >Eliminar</button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        </div>
        </div>
        
    );
}