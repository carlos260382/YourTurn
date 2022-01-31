import React from "react";
import { NavLink } from "react-router-dom";


function turnCreated() {
 //lo renderizo  
 //form es la etiqueta que me deja crear el formulario
 //label es la casilla que me deja ir creando los ingresos
 //dentro del label, en un input, pongo lo que necesito     
        return (
            <div>
                <h1>Detalle del Turno:</h1>
                <NavLink to = "/Endpage">
                <button>Hasta Pronto</button>
                </NavLink>
            </div>
            
        )
}

export default turnCreated