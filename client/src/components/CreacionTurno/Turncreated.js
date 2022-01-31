import React from "react";
import { NavLink } from "react-router-dom";
import styles from '../Style/style.module.css';


function turnCreated() {
    
        return (
            <div className = {styles.container}>
                
                <h1 className = {styles.title}>Detalle del Turno:</h1>
                <NavLink to = "/Endpage"  >
                <button  className = {styles.btnTurn}>Hasta Pronto</button>
                </NavLink>
            </div>
            
        )
}

export default turnCreated