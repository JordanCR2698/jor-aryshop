import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register(){
    const [form, setForm] = useState({name: "",email:"", password:""});
    const [message, setMessage] = useState("");
    const[messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>
        setForm({...form, [e.target.name]:e.target.value});
    const handleSubmit = async(e)=> {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:4000/api/users/register",form);
            setMessage("Usuario registrado correctamente");
            setMessageType("success");
            // Limpiar campos
            setForm({name:"",email:"",password:""});
            // Ocultar mensaje y redirigir a inicio
            setTimeout(()=>{
                setMessage("");
                navigate("/");
            },1000);
        }catch(error){
            console.error("Error al registrar el usuarrio:",error);
            setMessage("Error al registrar el usuario");
            setMessageType("error");
            //Ocultar mensaje despues de 5s
            setTimeout(()=> setMessage(""),1000);
        }
    };

    return(
        <div style={styles.container}>
            <h2>Registrar nuevo usuario</h2>

            {/* {message && (
                <div style={{
                    ...styles.message,
                    ...React(messageType === "succes" ? styles.success : styles.error),
                }}
                > {message}
                </div>
            )} */}

            <form onSubmit = {handleSubmit} style={styles.form}>
                <input style={styles.input} name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required/>
                <input style={styles.input} name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required/> 
                <input style={styles.input} name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required/>               
                <button style={styles.button} type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
         marginTop: "2rem"
        },
    form:{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        width: "300px",
        margin: "0 auto",
    },
    input:{
        borderRadius:"5px",
        width: "280px",
        height: "25px"
    },
    button:{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color:"white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    // message:{
    //     marginBottom:"1rem",
    //     padding: "10px",
    //     borderRadius: "8px",
    //     color: "white",
    //     fontWeight:"bold",
    //     transition: "opacity 0.3s ease",
    // },
    // success: {backgroundColor: "rgba(0,128,0,0.7)"},
    // error: {backgroundColor: "rgba(255,0,0,0.7)"},
};
